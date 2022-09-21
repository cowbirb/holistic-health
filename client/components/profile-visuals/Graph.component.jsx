import React, { useState } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement} from 'chart.js'
import { Chart } from 'react-chartjs-2';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const Graph = () => {
    return (
        <div>
            <Chart
            width={'100%'}
            height={'200%'}
            type='pie'
            options={ 
                {
                    /*
                    scales: 
                        {
                            y: {
                                beginAtZero: true,
                                yAxisKey: 'example'
                            },
                        },
                    */
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: '# of entries with mood'
                        }
                    },
                }
            }
            data={ 
                {
                    labels: ['Very Happy', 'Happy', 'Neutral', 'Sad', 'Depressed'], 
                    datasets: [
                        {
                            type: 'pie',
                            label: 'Number of Entries with Mood',
                            backgroundColor: ['blue', 'rgb(75, 192, 192)', 'white', 'gray', 'black'],
                            data: ['Very Happy', 'Happy', 'Neutral', 'Sad', 'Depressed'].map(() => Math.floor(Math.random() * 10)),
                            borderColor: 'white',
                            borderWidth: 2,
                            parsing: {
                                /*
                                y:
                                    {
                                        yAxisKey: 'example'
                                    },
                                */
                            },
                        },
                    ],
                    
                    title: {
                        display: true,
                        text: '# of entries with mood'
                    },
                } 
            }
            ></Chart>
        </div>
    )
}

export default Graph;