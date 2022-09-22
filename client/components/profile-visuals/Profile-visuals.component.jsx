import React, { useState } from 'react';
import PieChart from './PieChart.component.jsx';
import Summary from './Summary.component.jsx';
import MeditationChart from './MeditationChart.component.jsx';
import ExcerciseChart from './ExcerciseChart.component.jsx';

const ProfileVisual = (props) => {
    const [graphView, setGraphView] = useState('entries');
    const [userProfile, setUserProfile] = useState(props.userProfile);

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
            {graphView === 'entries' ? <PieChart userProfile={userProfile}></PieChart> : graphView === 'meditation' ? <MeditationChart userProfile={userProfile}></MeditationChart> : graphView === 'excercise' ? <ExcerciseChart userProfile={userProfile}></ExcerciseChart> : <div style={{display: 'flex', justifyContent: 'center', color: 'crimson'}}><b><u>You Shouldn't Be Seeing This</u></b></div>}
            <Summary userProfile={userProfile}></Summary>
        </div>
    );
}

export default ProfileVisual;