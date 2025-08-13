import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from 'chart.js';
import { getEmployeeCountByBranch } from '../../services/hrm-api/emmployeeService';

// Đăng ký các thành phần của chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Định nghĩa kiểu dữ liệu cho từng chi nhánh trả về từ API
interface BranchStats {
  branchName: string;
  employeeCount: number;
}

const BranchEmployeeBarChart: React.FC = () => {
  const [data, setData] = useState<ChartData<'bar'> | null>(null);

  useEffect(() => {
    getEmployeeCountByBranch().then((res) => {
      const raw: BranchStats[] = res.data;
      const labels = raw.map((b) => b.branchName);
      const counts = raw.map((b) => b.employeeCount);

      const chartData: ChartData<'bar'> = {
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
      };

      setData(chartData);
    });
  }, []);

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y', // Biểu đồ ngang
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: false,
        text: 'Số nhân viên theo chi nhánh',
        font: { size: 18 },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.x} nhân viên`,
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
        title: { display: false },
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
