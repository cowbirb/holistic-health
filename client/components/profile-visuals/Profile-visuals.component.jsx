import React, { useState } from 'react';
import Graph from './Graph.component.jsx';
import Summary from './Summary.component.jsx';

const ProfileVisual = () => {

    return (
        <div>
            <Graph></Graph>
            <Summary></Summary>
        </div>
    );
}

export default ProfileVisual;