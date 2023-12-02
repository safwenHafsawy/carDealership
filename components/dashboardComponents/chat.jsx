"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ dashboardData }) => {
  const [filteredData, setFilteredData] = useState([]);

  const prepareData = (dashboardData) => {
    const values = [];

    dashboardData.forEach((record) => {
      const alreadyExists = values.find((obj) => obj.date === record.startDate);

      if (!alreadyExists) {
        values.push({ date: record.startDate, value: record.totalPrice });
      } else {
        alreadyExists.value += record.totalPrice;
      }
    });

    setFilteredData(values);
  };

  useEffect(() => {
    prepareData(dashboardData);
  }, []);

  const charData = {
    labels: filteredData.map((record) => record.date),
    datasets: [
      {
        label: "Revenue in $",
        data: filteredData.map((record) => record.value),
        backgroundColor: "#6f51e9",
        borderColor: "#262627",
        borderWidth: 2,
        hoverBackgroundColor: "#d2a380",
      },
    ],
  };
  const chatOptions = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenue Per Day",
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return filteredData.length > 0 ? (
    <Bar options={chatOptions} data={charData} />
  ) : null;
};

/**
 * Helper Functions
 */

export default BarChart;
