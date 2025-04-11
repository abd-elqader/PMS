import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  labels: string[];
  chartData: number[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ labels, chartData }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: chartData,
        backgroundColor: ["#A6A9E0", "#DADA97", "#E59EC2"],
hoverBackgroundColor: ["#8489D6", "#C3C36E", "#D67AA8"],

      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Task Status Overview",
        font: {
          size: 20,
          weight: "bold",
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
