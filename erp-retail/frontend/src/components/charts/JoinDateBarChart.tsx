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
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getJoinDates } from '../../services/hrm-api/emmployeeService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

// Kiểu cho dữ liệu trả về từ API
interface EmployeeJoinDate {
  joinDate: string; // ISO date string
}

const JoinDateBarChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData<'bar'> | null>(null);

  useEffect(() => {
    getJoinDates().then((res) => {
      const rawData = res.data as EmployeeJoinDate[];
      const counts: Record<string, number> = {};

      rawData.forEach((emp) => {
        const date = new Date(emp.joinDate);
        const key = `${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
        counts[key] = (counts[key] || 0) + 1;
      });

      const sortedLabels = Object.keys(counts).sort((a, b) => {
        const [ma, ya] = a.split('/').map(Number);
        const [mb, yb] = b.split('/').map(Number);
        return ya !== yb ? ya - yb : ma - mb;
      });

      const dataset = sortedLabels.map((label) => counts[label]);

      const data: ChartData<'bar'> = {
        labels: sortedLabels,
        datasets: [
          {
            label: 'Nhân viên bắt đầu làm',
            data: dataset,
            backgroundColor: '#86BBD8',
            borderRadius: 0,
          },
        ],
      };

      setChartData(data);
    });
  }, []);

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: false,
        text: 'Phân bố nhân viên theo tháng/năm bắt đầu làm',
        font: { size: 18 },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.y} nhân viên`,
        },
      },
      datalabels: {
        display: false,
        anchor: 'end',
        align: 'end',
        formatter: (val: number) => val,
        color: '#000',
        font: { weight: 'bold' },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Số nhân viên' },
        ticks: { precision: 0 },
      },
      x: {
        title: { display: true, text: 'Thời gian (tháng/năm)' },
      },
    },
  };

  return chartData ? (
    <div className="w-full h-[360px]">
      <Bar options={options} data={chartData} />
    </div>
  ) : (
    <p className="text-center text-gray-500 mt-8">Đang tải dữ liệu...</p>
  );
};

export default JoinDateBarChart;
