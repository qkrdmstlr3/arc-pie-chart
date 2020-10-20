import React, { useEffect, useRef } from "react";
import "./App.css";
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
