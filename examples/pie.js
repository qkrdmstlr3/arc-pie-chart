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
    <text class="pie-text" text-anchor="middle" x="${coordinate.x}" y="${
    coordinate.y
  }" font-size="12" fill="${color}">${text}</text>
    <text class="pie-text" text-anchor="middle" x="${coordinate.x}" y="${
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

const data = [
  {
    name: "수입",
    percentage: 55,
    color: "crimson",
    textColor: "white",
    data: [
      {
        name: "월급",
        percentage: 30,
        color: "crimson",
        textColor: "white",
      },
      {
        name: "용돈",
        percentage: 30,
        color: "crimson",
        textColor: "white",
      },
      {
        name: "기타수입",
        percentage: 40,
        color: "crimson",
        textColor: "white",
        data: [
          {
            name: "주식",
            percentage: 60,
            color: "crimson",
            textColor: "white",
          },
          {
            name: "빌린 돈",
            percentage: 40,
            color: "crimson",
            textColor: "white",
          },
        ],
      },
    ],
  },
  {
    name: "지출",
    percentage: 45,
    color: "#3BB6AE",
    textColor: "black",
    data: [
      {
        name: "식비",
        percentage: 10,
        color: "#3BB6AE",
        textColor: "black",
      },
      {
        name: "생활",
        percentage: 20,
        color: "#3BB6AE",
        textColor: "black",
      },
      {
        name: "쇼핑/뷰티",
        percentage: 10,
        color: "#3BB6AE",
        textColor: "black",
      },
      {
        name: "교통",
        percentage: 20,
        color: "#3BB6AE",
        textColor: "black",
      },
      {
        name: "의료/건강",
        percentage: 10,
        color: "#3BB6AE",
        textColor: "black",
      },
      {
        name: "문화/여가",
        percentage: 10,
        color: "#3BB6AE",
        textColor: "black",
      },
      {
        name: "미분류",
        percentage: 20,
        color: "#3BB6AE",
        textColor: "black",
      },
    ],
  },
];

const body = document.querySelector("body");
const pie = makePieChart(data);
body.appendChild(pie);
