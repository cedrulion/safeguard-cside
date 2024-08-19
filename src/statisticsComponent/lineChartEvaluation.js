import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const LineChartEvaluation = ({ statsPerMonth }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    // Create gradients for styling
    var gradientStroke1 = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke1.addColorStop(0, "#8155ff");

    var gradientStroke2 = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke2.addColorStop(0, "#4caf50"); // Green for positive evaluations

    var gradientStroke3 = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke3.addColorStop(0, "#f44336"); // Red for negative evaluations

    var gradientBkgrd = ctx.createLinearGradient(0, 100, 0, 400);
    gradientBkgrd.addColorStop(0, "rgb(233, 216, 255,0.8)");

    const data = {
      labels: ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: 'Total Received Inquiries',
          backgroundColor: gradientBkgrd,
          borderColor: gradientStroke1,
          data: [0, ...statsPerMonth.receivedInquiries],
          fill: true,
          pointBorderColor: "#8155ff",
          pointBackgroundColor: "#8155ff",
          pointBorderWidth: 0,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: gradientStroke1,
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 4,
          pointRadius: 1,
          borderWidth: 3,
          pointHitRadius: 16,
        },
        {
          label: 'Positive Evaluations',
          backgroundColor: 'rgba(76, 175, 80, 0.2)', // Light green
          borderColor: gradientStroke2,
          data: [0, ...statsPerMonth.positiveEvaluations],
          fill: true,
          pointBorderColor: "#4caf50",
          pointBackgroundColor: "#4caf50",
          pointBorderWidth: 0,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: gradientStroke2,
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 4,
          pointRadius: 1,
          borderWidth: 3,
          pointHitRadius: 16,
        },
        {
          label: 'Negative Evaluations',
          backgroundColor: 'rgba(244, 67, 54, 0.2)', // Light red
          borderColor: gradientStroke3,
          data: [0, ...statsPerMonth.negativeEvaluations],
          fill: true,
          pointBorderColor: "#f44336",
          pointBackgroundColor: "#f44336",
          pointBorderWidth: 0,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: gradientStroke3,
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 4,
          pointRadius: 1,
          borderWidth: 3,
          pointHitRadius: 16,
        }
      ]
    };

    const options = {
      plugins: {
        legend: {
          display: true,
        },
      },
      tooltips: {
        backgroundColor: '#fff',
        displayColors: false,
        titleFontColor: '#000',
        bodyFontColor: '#000',
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            display: true
          }
        }
      },
      elements: {
        line: {
          tension: 0.4, // Set tension to make the line curve
        },
      },
    };

    chartRef.current.chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });
  }, [statsPerMonth]);

  return (
    <div style={{ width: '100%', margin: 'auto' }}>
      <canvas ref={chartRef} height={50}></canvas>
    </div>
  );
};

export default LineChartEvaluation;
