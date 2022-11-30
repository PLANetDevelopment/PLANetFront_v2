import React, { useEffect } from "react";
import Chart from "chart.js/auto";

let LineChart;

Chart.defaults.font.size = 12;
Chart.defaults.font.family = "Pretendard";

export default function LineGraph({ dataset }) {
  useEffect(() => {
    buildChart();
  }, []);
  let pointColor = [
    "#069567",
    "#00C982",
    "#00C982",
    "#00C982",
    "#00C982",
    "#00C982",
  ];

  const getValues = Object.values(dataset);
  const getKeys = Object.keys(dataset);

  for (let i = 0; i < getKeys.length; i += 1) {
    getKeys[i] = getKeys[i] + "월";

    // getValues[i] <= 10 ? pointColor[i] = '#0E4F42' : pointColor[i] = '#00C982';

    if (getValues[i] <= 10) pointColor[i] = "#0E4F42";
    else if (getValues[i] <= 20 && getValues[i] > 10) pointColor[i] = "#08835E";
    else if (getValues[i] <= 30 && getValues[i] > 20) pointColor[i] = "#069567";
    else if (getValues[i] <= 40 && getValues[i] > 30) pointColor[i] = "#04A670";
    else pointColor[i] = "#00C982";
  }

  const buildChart = () => {
    var ctx = document.getElementById("LineChart").getContext("2d");

    if (typeof LineChart !== "undefined") LineChart.destroy();

    LineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: getKeys,
        datasets: [
          {
            data: getValues,
            fill: false,
            borderColor: "rgba(255, 255, 255, 0.1)",
            borderWidth: 0.8,
            pointBackgroundColor: pointColor, //포인트 채우기 컬러
            pointBorderColor: pointColor, //#00C982포인트 테두리 컬러
            pointHoverBorderColor: "#ffffff",
            pointHoverRadius: 8,
            pointBorderWidth: 1, //포인트 테두리 두께
            pointRadius: 7,
            tension: 0.1, //직선
          },
        ],
      },
      options: {
        indexAxis: "x",
        scales: {
          y: {
            display: false,
            beginAtZero: true,
          },
          xAxes: {
            fontColor: "rgba(255, 255, 255)",
            fontSize: 14,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            //제목 label 삭제
            display: false,
            labels: {
              font: {
                size: 14,
              },
            },
          },
          datalabels: {
            align: "end",
            anchor: "end",
            borderRadius: 4,
            backgroundColor: "transparent",
            color: "#ffffff",
            font: {
              weight: "bold",
            },
          },
        },
        animation: {
          duration: 600,
        },
      },
    });
  };

  return (
    <div
      style={{
        width: "90%",
        marginTop: "3%",
        margin: "0 auto",
        overflowY: "scroll",
      }}
    >
      <canvas
        id="LineChart"
        width="375px"
        height="210px"
        style={{ overflowY: "scroll" }}
      />
    </div>
  );
}

let LineChart2;

Chart.defaults.font.size = 12;
Chart.defaults.font.family = "Pretendard";

export function LineGraph2() {
  useEffect(() => {
    buildChart();
  }, []);

  const data2 = [36, 48, 15, 29, 37, 66];

  const buildChart = () => {
    var ctx = document.getElementById("LineChart2").getContext("2d");

    if (typeof LineChart2 !== "undefined") LineChart2.destroy();

    LineChart2 = new Chart(ctx, {
      type: "line",
      data: {
        // labels: ["7월", "8월", "9월", "10월", "11월", "12월"],
        labels: ["", "", "", "", "", ""],
        datasets: [
          {
            data: data2,
            fill: false,
            borderColor: "rgba(255, 255, 255, 0.1)",
            borderWidth: 0.8,
            pointBackgroundColor: [
              "#04A670",
              "#0E4F42",
              "#08835E",
              "#04A670",
              "#00C982",
              "#04A670",
            ], //포인트 채우기 컬러
            pointBorderColor: [
              "#04A670",
              "#0E4F42",
              "#08835E",
              "#04A670",
              "#00C982",
              "#04A670",
            ], //포인트 테두리 컬러
            pointBorderWidth: 1, //포인트 테두리 두께
            pointRadius: 7,
            pointHoverRadius: 7,
            tension: 0.1, //직선
          },
        ],
      },
      options: {
        indexAxis: "x",
        scales: {
          y: {
            display: false,
            beginAtZero: true,
          },
          xAxes: {
            fontColor: "rgba(255, 255, 255)",
            fontSize: 14,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            //제목 label 삭제
            display: false,
            labels: {
              font: {
                size: 14,
              },
            },
          },
        },
        animation: {
          duration: 600,
        },
      },
    });
  };

  return (
    <div style={{ width: "90%", marginTop: "3%", margin: "0 auto" }}>
      <canvas id="LineChart2" width="375px" height="210px" />
    </div>
  );
}
