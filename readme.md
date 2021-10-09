# Arc Pie Chart

![downloads](https://img.shields.io/npm/dt/arc-pie-chart)
![version](https://img.shields.io/npm/v/arc-pie-chart)
![dependencies](https://img.shields.io/badge/dependencies-none-success)
![typescript](https://img.shields.io/badge/typescript-4.0.5-blue?logo=typescript)

pie chart that can be divided into several steps with Typescript

<img width="397" alt="스크린샷 2020-10-20 오후 4 11 21" src="https://user-images.githubusercontent.com/26402298/99898445-f9338180-2ce4-11eb-8e00-fef17b87995f.png">

## Install

```
npm install arc-pie-chart
```

## Usage

It's just example

### parageters

- data : See the data format below.
- totalDepth: your data's depth. (example is 3)
- size: chart's px width
  - default is 500
  - you can change it by using css

### declaration

```javascript
import makePieChart from "arc-pie-chart";

const data = [...]

const chart = makePieChart(data, totalDepth, size); // svg tag <svg></svg>
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
      svg.current.appendChild(makePieChart(data, totalDepth, size));
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
    name: "INCOME",
    percentage: 55,
    color: "crimson",
    textColor: "black",
    data: [
      {
        name: "SALARY",
        percentage: 30,
        color: "crimson",
        textColor: "white",
      },
      {
        name: "BLOG",
        percentage: 30,
        color: "crimson",
        textColor: "white",
      },
      {
        name: "ETC",
        percentage: 40,
        color: "crimson",
        textColor: "white",
        data: [
          {
            name: "STOCK",
            percentage: 60,
            color: "crimson",
            textColor: "white",
          },
          {
            name: "GOLD",
            percentage: 40,
            color: "crimson",
            textColor: "white",
          },
        ],
      },
    ],
  },
  {
    name: "EXPENSE",
    percentage: 45,
    color: "#3BB6AE",
    textColor: "black",
    data: [
      {
        name: "EAT",
        percentage: 10,
        color: "#3BB6AE",
        textColor: "black",
      },
      {
        name: "LIFE",
        percentage: 20,
        color: "#3BB6AE",
        textColor: "black",
      },
      {
        name: "SHOPPING",
        percentage: 10,
        color: "#3BB6AE",
        textColor: "black",
      },
      {
        name: "BUS",
        percentage: 20,
        color: "#3BB6AE",
        textColor: "black",
      },
      {
        name: "HEALTH",
        percentage: 10,
        color: "#3BB6AE",
        textColor: "black",
      },
      {
        name: "CULTURE",
        percentage: 10,
        color: "#3BB6AE",
        textColor: "black",
      },
      {
        name: "ETC",
        percentage: 20,
        color: "#3BB6AE",
        textColor: "black",
      },
    ],
  },
];
```
