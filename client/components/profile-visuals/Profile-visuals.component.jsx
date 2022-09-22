import React, { useState } from 'react';
import PieChart from './PieChart.component.jsx';
import Summary from './Summary.component.jsx';
import MeditationChart from './MeditationChart.component.jsx';
import ExcerciseChart from './ExcerciseChart.component.jsx';

const ProfileVisual = () => {
    const [graphView, setGraphView] = useState('entries');

    const selectHandler = (e) => {
        setGraphView(e.target.value);
    }

    return (
        <div id="ProfileVisual">
            <div id="ProfileButtons" style={{display: 'flex', justifyContent: 'center'}}>
                <select value={graphView} onChange={selectHandler}>
                    <option value='entries'>Entries</option>
                    <option value='meditation'>Meditation</option>
                    <option value='excercise'>Excercise</option>
                </select>
            </div>
            {graphView === 'entries' ? <PieChart></PieChart> : graphView === 'meditation' ? <MeditationChart></MeditationChart> : graphView === 'excercise' ? <ExcerciseChart></ExcerciseChart> : <div>You Shouldn't See This</div>}
            <Summary></Summary>
        </div>
    );
}

export default ProfileVisual;