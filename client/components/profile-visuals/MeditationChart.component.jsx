import React, { useState, useContext } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement} from 'chart.js'
import { Chart } from 'react-chartjs-2';
import { UserContext } from '../../context/user.context';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const MeditationChart = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <div id='MeditationChart'>
            <Chart
            width='100%'
            height='200%'
            type='bar'
            options={
                {
                    scales: {
                        y: {
                            beginAtZero: true,
                        }
                    },
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Average # of meditation minutes per day based on mood',
                        },
                        legend: {
                            display: false,
                        }
                    }
                }
            }
            data={
                {
                    labels: ['Very Happy', 'Happy', 'Neutral', 'Sad', 'Depressed'],
                    datasets: [
                        {
                            type: 'bar',
                            backgroundColor: ['darkgreen', 'green', 'limegreen', 'lime', 'chartreuse'],
                            data: [1, 2, 3, 4, 5],
                            borderColor: ['darkgreen', 'green', 'limegreen', 'lime', 'chartreuse'],
                            borderWidth: 2,
                        }
                    ],
                }
            }
            ></Chart>
        </div>
    );
}

export default MeditationChart;