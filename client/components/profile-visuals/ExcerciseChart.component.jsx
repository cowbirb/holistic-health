import React, { useState, useContext } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement} from 'chart.js'
import { Chart } from 'react-chartjs-2';
import { UserContext } from '../../context/user.context';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const ExcerciseChart = () => {
    const { currentUser } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState(currentUser ? currentUser.daily_info : null);
    const [totalAvg, setTotalAvg] = useState(0);
    const [setup, setSetup] = useState(true);

    const calculateAvg = (arr) => {
        let output = 0;
        for (let i = 0; i < arr.length; i++) {
            output += arr[i].workout_length;
        }
        output /= arr.length;
        output /= 60;
        return output;
    }

    if (setup) {
        if (userInfo) {
            setTotalAvg(calculateAvg(userInfo));
        }
        setSetup(false);
    }

    return (
        <div id='ExcerciseChart'>
            <Chart
            width='100%'
            height='200%'
            type='bar'
            options={
                {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Average # of workout minutes per day based on mood',
                        },
                        legend: {
                            display: false,
                        },
                    }
                }
            }
            data={
                {
                    labels: ['total','Very Happy', 'Happy', 'Neutral', 'Sad', 'Depressed'],
                    datasets: [
                        {
                            type: 'bar',
                            backgroundColor: ['darkmagenta', 'darkviolet', 'darkorchid', 'mediumorchid', 'orchid', 'plum'],
                            data: [totalAvg, 1, 2, 3, 4, 5],
                            borderColor: ['darkmagenta', 'darkviolet', 'darkorchid', 'mediumorchid', 'orchid', 'plum'],
                            borderWidth: 2,
                        },
                    ],
                }
            }
            ></Chart>
        </div>
    );
}

export default ExcerciseChart;