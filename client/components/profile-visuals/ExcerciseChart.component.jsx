import React, { useState } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement} from 'chart.js'
import { Chart } from 'react-chartjs-2';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const ExcerciseChart = () => {
    return (
        <div id='ExcerciseChart'>
            Excercise chart here
        </div>
    );
}

export default ExcerciseChart;