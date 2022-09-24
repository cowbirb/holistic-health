import React, { useState, useContext } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement} from 'chart.js'
import { Chart } from 'react-chartjs-2';
import { UserContext } from '../../context/user.context';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const MeditationChart = () => {
    const { currentUser } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState(currentUser ? currentUser.daily_info : null);
    const [totalAvg, setTotalAvg] = useState(0);
    const [veryHappyAvg, setVeryHappy] = useState(0);
    const [happyAvg, setHappy] = useState(0);
    const [neutralAvg, setNeutral] = useState(0);
    const [angryAvg, setAngry] = useState(0);
    const [veryAngryAvg, setVeryAngry] = useState(0);
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

    const filterEntries = (str) => {
        const output = userInfo.filter((curr, i, collection) => {
            if (curr.emotion_of_the_day.did_respond) {
                return curr.emotion_of_the_day.emotion === str;
            } else {
                return false;
            }
        });
        return output;
    }
    
    if (setup) {
        if (userInfo) {
            setTotalAvg(calculateAvg(userInfo));
            setVeryHappy(calculateAvg(filterEntries('Very Happy')));
            setHappy(calculateAvg(filterEntries('Happy')));
            setNeutral(calculateAvg(filterEntries('Neutral')));
            setAngry(calculateAvg(filterEntries('Angry')));
            setVeryAngry(calculateAvg(filterEntries('Very Angry')));
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
                            data: [totalAvg, veryHappyAvg, happyAvg, neutralAvg, angryAvg, veryAngryAvg],
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