// 참고 ; http://www.gisdeveloper.co.kr/?p=4705
const PIE_SIZE = 500;
const HALF_PIE_SIZE = PIE_SIZE / 2;

function getCoordinate(cX, cY, radius, degree) {
  degree = (degree * Math.PI) / 180 - (90 * Math.PI) / 180;
  return {
    x: cX + radius * Math.cos(degree),
    y: cY + radius * Math.sin(degree),
  };
}

function toPieChartItemPath(innerRadius, outerRadius, startDegree, endDegree) {
  const cx = HALF_PIE_SIZE;
  const cy = HALF_PIE_SIZE;

  const startInner = getCoordinate(cx, cy, innerRadius, startDegree);
  const endInner = getCoordinate(cx, cy, innerRadius, endDegree);
  const startOuter = getCoordinate(cx, cy, outerRadius, startDegree);
  const endOuter = getCoordinate(cx, cy, outerRadius, endDegree);
  const arcSweep = endDegree - startDegree <= 180 ? "0" : "1";

  const d = [
    ["M", startInner.x, startInner.y].join(" "),
    ["L", startOuter.x, startOuter.y].join(" "),
    [
      "A",
      outerRadius,
      outerRadius,
      0,
      arcSweep,
      1,
      endOuter.x,
      endOuter.y,
    ].join(" "),
    ["L", endInner.x, endInner.y].join(" "),
    [
      "A",
      innerRadius,
      innerRadius,
      0,
      arcSweep,
      0,
      startInner.x,
      startInner.y,
    ].join(" "),
    "z",
  ].join(" ");

  const textCoordinate = getCoordinate(
    cx,
    cy,
    (innerRadius + outerRadius) / 2,
    (startDegree + endDegree) / 2
  );

  return [d, textCoordinate];
}

function makePathTag(fill, d, className) {
  if (className) {
    return `<path fill=${fill} d="${d}" class="${className}"></path>`;
  }
  return `<path fill=${fill} d="${d}"></path>`;
}

function makeTextTag(text, percentage, coordinate, color) {
  return `
    <text text-anchor="middle" x="${coordinate.x}" y="${
    coordinate.y
  }" font-size="12" fill="${color}">${text}</text>
    <text text-anchor="middle" x="${coordinate.x}" y="${
    coordinate.y + 12
  }" font-size="12" fill="${color}">${percentage}%</text>
  `;
}

function iterData(
  data,
  startDegree,
  parentDegree,
  svg,
  innerRadius,
  outerRadius
) {
  let totalDegree = 0;
  data.forEach((d) => {
    if (d.percentage === 0) {
      return;
    }

    const degree = (parentDegree * d.percentage) / 100;
    const [pathD, textCoordinate] = toPieChartItemPath(
      innerRadius,
      outerRadius,
      startDegree + totalDegree + 0.3,
      startDegree + totalDegree + degree - 0.3
    );

    svg.innerHTML +=
      svg.innerHTML +
      makePathTag(d.color, pathD, d.data ? null : "pie_end") +
      makeTextTag(d.name, d.percentage, textCoordinate, d.textColor);

    if (d.data) {
      iterData(
        d.data,
        totalDegree,
        degree,
        svg,
        outerRadius + 10,
        outerRadius + 55,
        d.percentage
      );
    }

    totalDegree += degree;
  });
}

function makePieChart(data) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", PIE_SIZE);
  svg.setAttribute("height", PIE_SIZE);
  svg.setAttribute("background", "#fff");

  const circle = `<circle cx="${HALF_PIE_SIZE}" cy="${HALF_PIE_SIZE}" r="70" fill="#ddd"></circle>`;
  svg.innerHTML = circle;

  const innerRadius = 85;
  const outerRadius = 115;

  iterData(data, 0, 360, svg, innerRadius, outerRadius);

  return svg;
}

export default makePieChart;
