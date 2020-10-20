# Arc Pie Chart

![version](https://img.shields.io/npm/v/arc-pie-chart)
![dependencies](https://img.shields.io/badge/dependencies-none-success)

pie chart that can be divided into several steps

<img width="397" alt="스크린샷 2020-10-20 오후 4 11 21" src="https://user-images.githubusercontent.com/26402298/96552747-2ad4b980-12ef-11eb-83de-be1ada8ad7c1.png">

## Install

```
npm install arc-pie-chart
```

## Usage

It's just example

### declaration

```javascript
import makePieChart from "arc-pie-chart";

const data = [...]

const chart = makePieChart(data); // svg tag <svg></svg>
```

### React

```javascript
import React, { useEffect, useRef } from "react";
import makePieChart from "arc-pie-chart";
import { data } from "./data";

function App() {
  const svg = useRef(null);

  useEffect(() => {
    if (svg.current) {
      svg.current.appendChild(makePieChart(data));
    }
  });

  return <div ref={svg} />;
}

export default App;
```

### data format

- You can create multi-level pie charts by connecting data arrays.
- The sum of the percentages must be less than one hundred percent

```javascript
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
```
