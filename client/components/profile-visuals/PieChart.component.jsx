import React, { useState, useContext } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement} from 'chart.js'
import { Chart } from 'react-chartjs-2';
import { UserContext } from '../../context/user.context';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const PieChart = () => {
    const { currentUser } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState(currentUser ? currentUser.daily_info : null);
    const [veryHappyAmt, setVeryHappy] = useState(0);
    const [happyAmt, setHappy] = useState(0);
    const [neutralAmt, setNeutral] = useState(0);
    const [angryAmt, setAngry] = useState(0);
    const [veryAngryAmt, setVeryAngry] = useState(0);
    const [setup, setSetup] = useState(true);

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

    if (userInfo && setup) {
        setVeryHappy(filterEntries('Very Happy').length);
        setHappy(filterEntries('Happy').length);
        setNeutral(filterEntries('Neutral').length);
        setAngry(filterEntries('Angry').length);
        setVeryAngry(filterEntries('Very Angry').length);
        setSetup(false);
    }

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
                            backgroundColor: ['blue', 'rgb(75, 192, 192)', 'cyan', 'gray', 'black'],
                            data: [veryHappyAmt, happyAmt, neutralAmt, angryAmt, veryAngryAmt],
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

export default PieChart;