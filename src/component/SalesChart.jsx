// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { Card, CardContent, Typography } from "@mui/material";

const SalesChart = () => {
  const chartRef = useRef(null); 

  useEffect(() => {
    if (chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy(); 
    }

    const ctx = chartRef.current.getContext('2d');

    const chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            label: 'Sales',
            data: [10, 20, 30, 40],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Sales Data',
          },
        },
      },
    });

    chartRef.current.chartInstance = chartInstance;

    return () => {
      chartInstance.destroy();
    };
  }, []);  

  return (
    <Card sx={{ mt: 2, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Grafik Penjualan
        </Typography>
        <canvas ref={chartRef}></canvas> 
      </CardContent>
    </Card>
  );
};

export default SalesChart;