import { display } from '@mui/system';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { disable } from 'workbox-navigation-preload';

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
                display: true,
                text: 'Revenue last year $6,170',
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

        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 18
                    }
                }

            },
            y: {
                grid: {
                    display: false
                },
                display: false
            }
        }
    }

    let monyEarnd = [1130, 790, 1280, 1560, 630, 780]

    function getMoneyEarend() {
        const chartData = monyEarnd.reduce((acc, money) => {
            acc += money
            return acc
        }, 0)
        return chartData
    }

    const money = getMoneyEarend()
    const totalPrice = (parseFloat(JSON.stringify(money).replace(/,/g, ''))).toLocaleString()

    const labels = ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov']
    const data = {
        labels,
        datasets: [
            {
                // label: `Revenue lseconast year $${totalPrice}`,
                data: monyEarnd,
                backgroundColor: ['#6c26fc', '#1d28de', '#2d83f5', '#2497e9', '#1db9de', '#21ffd3']
            },
        ],
    }

    return <Bar options={options} data={data} />
}
