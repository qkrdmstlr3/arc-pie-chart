# Arc Pie Chart

pie chart that can be divided into several steps

![pie-chart](https://user-images.githubusercontent.com/26402298/96361803-e23cc500-1163-11eb-8e4f-6008adf53a07.png)

## Install

```
npm install arc-pie-chart
```

## Usage

declaration

```javascript
import makePieChart from "arc-pie-chart";

const data = [...]

const chart = makePieChart(data); // svg tag <svg></svg>
```

data format

- You can create multi-level pie charts by connecting data arrays.

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
