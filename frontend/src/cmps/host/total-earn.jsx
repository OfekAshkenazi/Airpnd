import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export function TotalEarn({ orders }) {

    let newOrders = [...orders]

    const data = newOrders.reduce((acc, order) => {
        const monthLabel = order.startDate.split('-')[1];
        if (acc[monthLabel]) {
            acc[monthLabel].x += order.totalPrice;
        } else {
            acc[monthLabel] = {
                y: monthLabel,
                x: order.totalPrice
            }
        }
        return acc;
    }, {})

    const dataArray = Object.values(data).sort((a, b) => parseInt(a.y) - parseInt(b.y));

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Revenue by month',
                font: {
                    size: 18,
                },
                align: "start",
            },
            legend: {
                display: false,
                labels: {
                    font: {
                        size: 18,
                        family: 'circularH',
                        sytle: 'bold'
                    }
                }
            },

        }
    }

    const labels = dataArray.map(data => data.y);

    const chartData = {
        labels,
        datasets: [
            {
                data: dataArray,
                backgroundColor: ['#6c26fc', '#1d28de', '#2d83f5', '#2497e9', '#1db9de', '#21ffd3']
            },

        ],
    }

    return <Bar options={options} data={chartData} />
}
