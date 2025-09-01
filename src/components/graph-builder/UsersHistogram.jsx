import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const UsersHistogram = ({ affiliatedCount, nonAffiliatedCount }) => {
    const data = {
        labels: ["Utenti Affiliati", "Utenti Non Affiliati"],
        datasets: [
            {
                label: "Numero di utenti",
                data: [affiliatedCount, nonAffiliatedCount],
                backgroundColor: ["#135F48", "#135F48"],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: {
            beginAtZero: true,
            min: 0,
            max: 10,
                ticks: {
                    font: {
                        family: "'Season', sans-serif",
                        size: 14,
                    },
                    stepSize: 1,
                },
            },
            x: {
                ticks: {
                    font: {
                        family: "'Season', sans-serif",
                        size: 14,
                    },
                },
            },
        },
        datasets: {
            bar: {
                barPercentage: 0.5,
                categoryPercentage: 0.5,
                borderRadius: 5,
            },
        },
    };



    return <Bar data={data} options={options} />;
};

export default UsersHistogram;
