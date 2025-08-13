import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getGenderStats } from '../../services/hrm-api/emmployeeService';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface GenderStat {
  label: 'M' | 'F';
  value: number;
}

const PieChart: React.FC = () => {
  const [data, setData] = useState<GenderStat[]>([]);

  useEffect(() => {
    getGenderStats().then((res) => {
      const raw = res.data as Record<string, number>;
      const transformed: GenderStat[] = Object.entries(raw).map(([label, value]) => ({
        label: label === 'Nam' ? 'M' : 'F',
        value,
      }));
      setData(transformed);
    });
  }, []);

  if (data.length === 0)
    return <p className="text-center text-gray-500 mt-12">Đang tải dữ liệu...</p>;

  const total = data.reduce((sum, i) => sum + i.value, 0);

  const chartData: ChartData<'pie', number[], string> = {
    labels: data.map(i => (i.label === 'M' ? 'Nam' : 'Nữ')),
    datasets: [
      {
        data: data.map(i => i.value),
        backgroundColor: ['#DA6C6C', '#86BBD8'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    plugins: {
      datalabels: {
        color: '#fff',
        formatter: (value: number) => `${((value / total) * 100).toFixed(1)}%`,
        font: { weight: 'bold' },
      },
      legend: {
        position: 'top',
        labels: {
          generateLabels: (chart) => {
            const labels = chart.data.labels as string[];
            const idxNam = labels.indexOf('Nam');
            const idxNu = labels.indexOf('Nữ');
            return [
              {
                text: 'Nam',
                fillStyle: '#86BBD8',
                strokeStyle: '#fff',
                lineWidth: 0,
                index: idxNam,
              },
              {
                text: 'Nữ',
                fillStyle: '#DA6C6C',
                strokeStyle: '#fff',
                lineWidth: 0,
                index: idxNu,
              },
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
