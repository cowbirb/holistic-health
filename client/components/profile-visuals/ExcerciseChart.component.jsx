import React, { useState, useContext } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement} from 'chart.js'
import { Chart } from 'react-chartjs-2';
import { UserContext } from '../../context/user.context';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const ExcerciseChart = () => {
    const { currentUser } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState(currentUser ? currentUser.daily_info : null);
    return (
        <div id='ExcerciseChart'>
            Excercise chart here
        </div>
    );
}

export default ExcerciseChart;