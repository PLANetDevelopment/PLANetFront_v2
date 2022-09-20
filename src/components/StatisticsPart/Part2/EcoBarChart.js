import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EcoExpendColor = [
  "#00C982",
  "#1466FE",
  "#083FA5",
  "#728EC6",
  "#C7D2E8"
];

const NEcoExpendColor = [
  "#8593B1",
  "#667492",
  "#475572",
  "#303B51",
  "#C7D2E8"
];

function EcoBarChart({ barData, name }) {

  console.log(barData)

  const completeSet = barData.map((obj) => {
    return {
      tag: obj[0],
      count: obj[1],
    };
  });
  const dataSet = completeSet.map((data, index) => {
    return {
      label: data.tag,
      borderWidth: 0, // 테두리 두께
      data: [data.count], // 수치
      backgroundColor:
        data.tag !== "더보기" ? (name === "eco" ? EcoExpendColor[index] : NEcoExpendColor[index]) : "#C7D2E8", // 각 막대 색
      borderRadius: 13,
      borderSkipped: barData.length >= 3 ? "middle" : "middle" + "start",
    };
  });

  const labelSet = ["", "", "", "", ""];

  const data = {
    labels: labelSet,
    datasets: dataSet
  };

  const config = {
    indexAxis: "y",
    plugins: {
      legend: false //데이터 라벨 없애기
    },
    scales: {
      yAxes: {
        //x축, y축 표시 없애기
        stacked: true,
        display: false
      },
      xAxes: {
        stacked: true,
        display: false
      }
    },
    animation: {
      duration: 0
    },
    responsive: true,
    maintainAspectRatio: false
  };

  if (name === "eco") {
    return (
      <div>
        <Bar data={data}
          options={config}
          width={300}
        />
      </div >
    )
  } else {
    return (
      <div>
        <Bar data={data}
          options={config}
          width={300}
        />
      </div >
    )
  }
}


export { EcoBarChart }

const message = {
  tagList: [["생필품", 33, 2], ["경조사/회비", 33, 2], ["마트", 33, 2]]
}