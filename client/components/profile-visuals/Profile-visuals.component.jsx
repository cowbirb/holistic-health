import React, { useState } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, } from 'chart.js'
import { Chart } from 'react-chartjs-2';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, )
//<canvas id="myChart" width="400" height="400"></canvas>
const ProfileVisual = () => {

    return (
        <div>
            <Chart
            width={'30%'}
            type='bar'
            options={ 
                {
                    scales: 
                        {
                            y: {
                                beginAtZero: true,
                                yAxisKey: 'example'
                            },
                        },
                    maintainAspectRatio: false
                }
            }
            data={ 
                {
                    labels: [1, 2, 3, 4], 
                    datasets: [
                        {
                            type: 'bar',
                            label: 'Dataset 2',
                            backgroundColor: 'rgb(75, 192, 192)',
                            data: [1, 2, 3, 4].map(() => Math.floor(Math.random() * 10)),
                            borderColor: 'white',
                            borderWidth: 2,
                            parsing: {
                                y:
                                    {
                                        yAxisKey: 'example'
                                    }
                            },
                        },
                    ]
                } 
            }
            ></Chart>
        </div>
    );
}

export default ProfileVisual;