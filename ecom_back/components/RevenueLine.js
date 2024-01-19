import React from "react";
import { Bar, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const RevenueLine = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Revenue Data</h2>
      </div>
      <div className="w-full h-96">
        {" "}
        {/* Adjust the height as needed */}
        <Line
          data={{
            labels: ["Today", "Weekly", "Monthly", "Yearly"],
            datasets: [
              {
                label: "# Revenue",
                data: [
                  data?.todayRevenue,
                  data?.weekRevenue,
                  data?.monthRevenue,
                  data?.yearRevenue,
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.5)",
                  // "rgba(255, 159, 64, 0.2)",
                  // "rgba(255, 205, 86, 0.2)",
                  // "rgba(75, 192, 192, 0.2)",
                  // "rgba(54, 162, 235, 0.2)",
                  // "rgba(153, 102, 255, 0.2)",
                  "rgba(201, 203, 207, 0.5)",
                ],
                borderColor: [
                  "rgb(255, 99, 132)",
                  //   "rgb(255, 159, 64)",
                  //   "rgb(255, 205, 86)",
                  //   "rgb(75, 192, 192)",
                  //   "rgb(54, 162, 235)",
                  //   "rgb(153, 102, 255)",
                  "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false, // Disable aspect ratio for responsiveness
            plugins: {
              legend: {
                display: false, // Hide legend for simplicity
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default RevenueLine;
