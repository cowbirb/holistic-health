import React, { useState, useContext } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement} from 'chart.js'
import { Chart } from 'react-chartjs-2';
import { UserContext } from '../../context/user.context';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const MeditationChart = () => {
    const { currentUser } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState(currentUser ? currentUser.daily_info : null);
    const [totalAvg, setTotalAvg] = useState(0);
    const [setup, setSetup] = useState(true);

    const calculateAvg = (arr) => {
        let output = 0;
        for (let i = 0; i < arr.length; i++) {
            output += arr[i].meditate_length;
        }
        output /= arr.length;
        output /= 60;
        return output;
    }
    
    axios.get('/api/user/632bf701cd4d0ef00f7796c2')
        .then(result => {
            setTotalAvg(calculateAvg(result.data.daily_info));
        })
        .catch(err => console.error(err));

    if (setup) {
        if (userInfo) {
            setTotalAvg(calculateAvg(userInfo));
        }
        setSetup(false);
    }

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
                    labels: ['total','Very Happy', 'Happy', 'Neutral', 'Sad', 'Depressed'],
                    datasets: [
                        {
                            type: 'bar',
                            backgroundColor: ['seagreen', 'darkgreen', 'green', 'limegreen', 'lime', 'chartreuse'],
                            data: [totalAvg, 1, 2, 3, 4, 5],
                            borderColor: ['seagreen', 'darkgreen', 'green', 'limegreen', 'lime', 'chartreuse'],
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