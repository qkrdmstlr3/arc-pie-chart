var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/index.ts
var lib_exports = {};
__export(lib_exports, {
  default: () => lib_default
});
module.exports = __toCommonJS(lib_exports);
function getCoordinate({ cx, cy, radius, degree }) {
  degree = degree * Math.PI / 180 - 90 * Math.PI / 180;
  return {
    x: cx + radius * Math.cos(degree),
    y: cy + radius * Math.sin(degree)
  };
}
function toPieChartItemPath(innerDistanceFromCenter, outerDistanceFromCenter, startDegree, endDegree, halfWidth) {
  const cx = halfWidth;
  const cy = halfWidth;
  const startInner = getCoordinate({
    cx,
    cy,
    radius: innerDistanceFromCenter,
    degree: startDegree
  });
  const endInner = getCoordinate({
    cx,
    cy,
    radius: innerDistanceFromCenter,
    degree: endDegree
  });
  const startOuter = getCoordinate({
    cx,
    cy,
    radius: outerDistanceFromCenter,
    degree: startDegree
  });
  const endOuter = getCoordinate({
    cx,
    cy,
    radius: outerDistanceFromCenter,
    degree: endDegree
  });
  const arcSweep = endDegree - startDegree <= 180 ? "0" : "1";
  const d = [
    ["M", startInner.x, startInner.y].join(" "),
    ["L", startOuter.x, startOuter.y].join(" "),
    [
      "A",
      outerDistanceFromCenter,
      outerDistanceFromCenter,
      0,
      arcSweep,
      1,
      endOuter.x,
      endOuter.y
    ].join(" "),
    ["L", endInner.x, endInner.y].join(" "),
    [
      "A",
      innerDistanceFromCenter,
      innerDistanceFromCenter,
      0,
      arcSweep,
      0,
      startInner.x,
      startInner.y
    ].join(" "),
    "z"
  ].join(" ");
  const textCoordinate = getCoordinate({
    cx,
    cy,
    radius: (innerDistanceFromCenter + outerDistanceFromCenter) / 2,
    degree: (startDegree + endDegree) / 2
  });
  return { d, textCoordinate };
}
function makePathTag({ fill, d, className }) {
  if (className) {
    return `<path fill=${fill} d="${d}" class="${className}"></path>`;
  }
  return `<path fill=${fill} d="${d}"></path>`;
}
function makeTextTag({
  text,
  percentage,
  coordinate,
  color,
  fontSize = 12,
  className,
  gap = 12
}) {
  return `
    <text ${className ? `class="${className}"` : ""} text-anchor="middle" x="${coordinate.x}" y="${coordinate.y}" font-size="${fontSize}" fill="${color}">${text}</text>
    <text ${className ? `class="${className}"` : ""} text-anchor="middle" x="${coordinate.x}" y="${coordinate.y + gap}" font-size="${fontSize}" fill="${color}">${percentage}%</text>
  `;
}
function iterData({
  data,
  startDegree,
  parentDegree,
  svg,
  innerDistanceFromCenter,
  outerDistanceFromCenter,
  halfWidth,
  totalDepth
}) {
  let totalDegree = 0;
  data.forEach((datum) => {
    if (datum.percentage === 0) {
      return;
    }
    const degree = parentDegree * datum.percentage / 100;
    const { d: pathD, textCoordinate } = toPieChartItemPath(
      innerDistanceFromCenter,
      outerDistanceFromCenter,
      startDegree + totalDegree + 0.3,
      startDegree + totalDegree + degree - 0.3,
      halfWidth
    );
    svg.innerHTML += makePathTag({
      fill: datum.color,
      d: pathD,
      className: datum.data ? "" : "pie_end"
    }) + makeTextTag({
      text: datum.name,
      percentage: datum.percentage,
      coordinate: textCoordinate,
      color: datum.textColor
    });
    const pieAreaWidth = 13.5 * halfWidth / 25;
    const maxPieWidth = pieAreaWidth / totalDepth;
    const gapBetweenInnerOuterPie = Math.min(halfWidth / 25, maxPieWidth / 6.5);
    const pieWidth = Math.min(
      5.5 * halfWidth / 25,
      maxPieWidth * 5.5 / 6.5
    );
    if (datum.data) {
      iterData({
        data: datum.data,
        startDegree: startDegree + totalDegree + 0.3,
        parentDegree: degree,
        svg,
        innerDistanceFromCenter: outerDistanceFromCenter + gapBetweenInnerOuterPie,
        outerDistanceFromCenter: outerDistanceFromCenter + pieWidth,
        halfWidth,
        totalDepth
      });
    }
    totalDegree += degree;
  });
}
function handleHoverEvent({ event, svg, halfWidth }) {
  var _a, _b, _c, _d;
  const path = event.target.closest("path");
  if (path) {
    const name = ((_a = path.nextSibling) == null ? void 0 : _a.nextSibling).innerHTML;
    const percentage = Number(
      ((_d = (_c = (_b = path.nextSibling) == null ? void 0 : _b.nextSibling) == null ? void 0 : _c.nextSibling) == null ? void 0 : _d.nextSibling).innerHTML.replace("%", "")
    );
    const oldChild = svg.querySelectorAll(".center_text");
    oldChild.forEach((child) => svg.removeChild(child));
    svg.innerHTML += makeTextTag({
      text: name,
      percentage,
      coordinate: { x: halfWidth, y: halfWidth },
      color: "black",
      fontSize: 1.8 * halfWidth / 25,
      className: "center_text",
      gap: 24
    });
  }
}
function makePieChart(data, depth, width = 500) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const halfWidth = width / 2;
  svg.setAttribute("width", String(width));
  svg.setAttribute("height", String(width));
  const circleRadius = 7 * halfWidth / 25;
  const circle = `<circle cx="${halfWidth}" cy="${halfWidth}" r="${circleRadius}" fill="#ddd"></circle>`;
  svg.innerHTML = circle;
  const innerDistanceFromCenter = 8.5 * halfWidth / 25;
  const outerDistanceFromCenter = 11.5 * halfWidth / 25;
  iterData({
    data,
    startDegree: 0,
    parentDegree: 360,
    svg,
    innerDistanceFromCenter,
    outerDistanceFromCenter,
    halfWidth,
    totalDepth: depth - 1
  });
  svg.addEventListener(
    "mouseover",
    (event) => handleHoverEvent({ event, svg, halfWidth })
  );
  return svg;
}
var lib_default = makePieChart;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=index.js.map