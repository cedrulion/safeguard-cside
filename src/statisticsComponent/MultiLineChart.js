import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const MultiBarChart = ({ statspermonth, positiveStats, negativeStats }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy the previous chart instance if it exists
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    const data = {
      labels: ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: 'Total Stats',
          backgroundColor: "#8155ff",
          data: [0, ...statspermonth],
          borderRadius: 4,  // Slightly round the bars
        },
        {
          label: 'Positive Stats',
          backgroundColor: "#4caf50",
          data: [0, ...positiveStats],
          borderRadius: 4,
        },
        {
          label: 'Negative Stats',
          backgroundColor: "#ff5733",
          data: [0, ...negativeStats],
          borderRadius: 4,
        }
      ]
    };

    const options = {
      plugins: {
        legend: {
          display: true, // Display the legend to differentiate between the datasets
          position: 'top', // Place the legend at the top
        },
        tooltip: {
          backgroundColor: '#fff',
          titleColor: '#000',
          bodyColor: '#000',
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          stacked: false, // Disable stacking on the x-axis to show bars side by side
        },
        y: {
          grid: {
            display: true,
          },
          stacked: false, // Disable stacking on the y-axis to show bars side by side
        }
      }
    };

    // Create the bar chart
    chartRef.current.chart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });
  }, [statspermonth, positiveStats, negativeStats]);

  return (
    <div style={{ width: '100%', margin: 'auto' }}>
      <canvas ref={chartRef} height={150}></canvas>
    </div>
  );
};

export default MultiBarChart;
