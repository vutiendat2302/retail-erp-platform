import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend
} from 'chart.js';
import { getEmployeeCountByBranch } from '../../services/employeeService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BranchEmployeeBarChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getEmployeeCountByBranch().then(res => {
      const raw = res.data;
      const labels = raw.map(b => b.branchName);
      const counts = raw.map(b => b.employeeCount);

      setData({
        labels,
        datasets: [
          {
            label: 'Số nhân viên',
            data: counts,
            backgroundColor: '#86BBD8',
            borderRadius: 4,
            barThickness: 24,
          },
        ],
      });
    });
  }, []);

  const options = {
    indexAxis: 'y', 
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: { display: false },
      title: {
        display: false,
        text: 'Số nhân viên theo chi nhánh',
        font: { size: 18 },
      },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.parsed.x} nhân viên`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: { display: true, text: 'Số nhân viên' },
        ticks: { precision: 0 },
      },
      y: {
        title: { display: false, text: 'Chi nhánh' },
      },
    },
  };

  return data ? (
    <div className="w-full h-[360px]">
      <Bar data={data} options={options} />
    </div>
  ) : (
    <p className="text-center text-gray-500 mt-8">Đang tải dữ liệu...</p>
  );
};

export default BranchEmployeeBarChart;
