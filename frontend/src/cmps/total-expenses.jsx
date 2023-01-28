import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

// import faker from 'faker';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export function TotalExpenses() {

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
      },
    },
  }
  let monyExpenses = [540, 210, 130, 400, 100, 200, 400, 300, 250, 300, 230]
  function getMoneyExpenses() {
    const chartData = monyExpenses.reduce((acc, money) => {
      acc += money
      return acc
    }, 0)
    return chartData
  }

  const money = getMoneyExpenses()

  const totalPrice = (parseFloat(JSON.stringify(money).replace(/,/g, ''))).toLocaleString()

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'December'];




  const data = {
    labels,
    datasets: [
      {
        label: `Total expenses ${totalPrice}`,
        data: [540, 210, 130, 400, 100, 200, 400, 300, 250, 300, 230],
        backgroundColor: '#fc9930',
      },
    ],
  }


  return <Bar options={options} data={data} />;
}


// import React from 'react';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// );
// export function TotalEarn() {

//     const options = {
//         responsive: true,
//         plugins: {
//             title: {
//                 display: false,
//                 text: 'Chart.js Bar Chart',
//             },
//         },
//     }

//     const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

//     const data = {
//         labels,
//         datasets: [
//             {
//                 label: 'Dataset 1',
//                 data: ["afafafaf"],
//                 backgroundColor: 'rgba(255, 99, 132, 0.5)',
//             },
//             {
//                 label: 'Dataset 2',
//                 data: ["afafafaf"],
//                 backgroundColor: 'rgba(53, 162, 235, 0.5)',
//             },
//         ],
//     }


//     return <Bar options={options} data={data} />;

// }