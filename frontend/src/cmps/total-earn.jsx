import { width } from '@mui/system';
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

export function TotalEarn() {

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: false,
                text: 'Chart.js Bar Chart',
            },
        },
    }

    let monyEarnd = [1130, 790, 1280, 1560, 630, 780, 1200, 1300, 550, 600, 530]

    function getMoneyEarend() {
        const chartData = monyEarnd.reduce((acc, money) => {
            acc += money
            return acc
        }, 0)
        return chartData
    }
    const money = getMoneyEarend()
    const totalPrice = (parseFloat(JSON.stringify(money).replace(/,/g, ''))).toLocaleString()


    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'December']
    const data = {
        labels,
        datasets: [
            {
                label: `Revenue ${totalPrice}`,
                data: monyEarnd,
                backgroundColor: '#2a5811',
            },
        ],
    }

    return <Bar options={options} data={data} />
}
