import React, { useState } from 'react';
import PieChart from './PieChart.component.jsx';
import Summary from './Summary.component.jsx';

const ProfileVisual = () => {

    return (
        <div>
            <PieChart></PieChart>
            <Summary></Summary>
        </div>
    );
}

export default ProfileVisual;