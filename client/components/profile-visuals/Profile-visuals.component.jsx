import React, { useState } from 'react';
import PieChart from './PieChart.component.jsx';
import Summary from './Summary.component.jsx';

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
            {graphView === 'entries' ? <PieChart></PieChart> : graphView === 'meditation' ? <div>meditation graph here</div> : <div>excercise graph here</div>}
            <Summary></Summary>
        </div>
    );
}

export default ProfileVisual;