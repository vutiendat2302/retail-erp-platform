import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getGenderStats } from '../../services/employeeService';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getGenderStats().then((res) => {
      const raw = res.data;
      const transformed = Object.entries(raw).map(([label, value]) => ({
        label: label === 'Nam' ? 'M' : 'F',
        value,
      }));
      setData(transformed);
    });
  }, []);

  if (data.length === 0) return <p className="text-center text-gray-500 mt-12">Đang tải dữ liệu...</p>;
  const total = data.reduce((sum, i) => sum + i.value, 0);

  const chartData = {
    labels: data.map(i => i.label === 'M' ? 'Nam' : 'Nữ'),
    datasets: [{
      data: data.map(i => i.value),
      backgroundColor: ['#DA6C6C', '#86BBD8'],
      borderColor: '#fff',
      borderWidth: 2,
    }],
  };

  const options = {
    plugins: {
      datalabels: {
        color: '#fff',
        formatter: (v) => `${((v / total) * 100).toFixed(1)}%`,
        font: { weight: 'bold' },
      },
      legend: {
        position: 'top',
        labels: {
          generateLabels: (chart) => {
            const idxNam = chart.data.labels.findIndex(l => l === 'Nam');
            const idxNu = chart.data.labels.findIndex(l => l === 'Nữ');
            return [
              {
                text: 'Nam',
                fillStyle: '#86BBD8', // xanh
                strokeStyle: '#fff',
                lineWidth: 0,
                index: idxNam,
              },
              {
                text: 'Nữ',
                fillStyle: '#DA6C6C', // đỏ
                strokeStyle: '#fff',
                lineWidth: 0,
                index: idxNu,
              }
            ];
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return <Pie data={chartData} options={options} height={320} />;
};

export default PieChart;
