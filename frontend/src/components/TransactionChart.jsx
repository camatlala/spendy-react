import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title
);

function TransactionChart({ transactions }) {
  const categoryTotals = {};
  const categoryColors = {};

  transactions.forEach((t) => {
    const category = t.category_name || t.category || 'Other';
    const amount = parseFloat(t.amount || 0);
    categoryTotals[category] = (categoryTotals[category] || 0) + amount;
    if (!categoryColors[category]) {
      categoryColors[category] = t.type === 'income' ? '#10b981' : '#ef4444'; // green or red
    }
  });

  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);
  const backgroundColors = labels.map((cat) => categoryColors[cat]);

  const pieData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
          font: {
            size: 14,
          },
          usePointStyle: true,
          boxWidth: 10,
        },
      },
      tooltip: {
        titleColor: 'white',
        bodyColor: 'white',
        backgroundColor: '#1f2937',
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
      },
    },
  };

  // Format dates as YYYY-MM-DD for x-axis
  const dates = [...new Set(transactions.map(t => new Date(t.date).toISOString().split('T')[0]))].sort();

  const incomeData = dates.map((date) =>
    transactions
      .filter((t) => t.type === 'income' && new Date(t.date).toISOString().split('T')[0] === date)
      .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0)
  );

  const expenseData = dates.map((date) =>
    transactions
      .filter((t) => t.type === 'expense' && new Date(t.date).toISOString().split('T')[0] === date)
      .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0)
  );

  const lineData = {
    labels: dates,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        fill: false,
        borderColor: '#10b981',
        tension: 0.3,
        pointBackgroundColor: '#10b981',
      },
      {
        label: 'Expense',
        data: expenseData,
        fill: false,
        borderColor: '#ef4444',
        tension: 0.3,
        pointBackgroundColor: '#ef4444',
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: '#374151',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: '#374151',
        },
      },
    },
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 justify-center items-start">
      {/* Pie Chart Section */}
      <div className="w-full max-w-[500px] h-[400px]">
        <Pie data={pieData} options={pieOptions} />
      </div>

      {/* Line Chart Section */}
      <div className="w-full max-w-[800px] h-[400px]">
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
}

export default TransactionChart;
