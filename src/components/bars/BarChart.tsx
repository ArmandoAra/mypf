"use client"
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Esto es necesario para que funcione el plugin de apilado
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
    expenses: number[];
    incomes: number[];
}
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const BarChart: React.FC<BarChartProps> = ({ expenses, incomes }) => {
    const data = {
        labels,
        datasets: [
            {
                label: 'Expenses',
                data: expenses,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Incomes',
                data: incomes,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Monthly Expenses and Incomes',
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;
