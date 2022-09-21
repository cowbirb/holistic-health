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
            <select value={graphView} onChange={selectHandler}>
                <option value='entries' selected>Entries</option>
                <option value='other'>Other</option>
            </select>
            {graphView === 'entries' ? <PieChart></PieChart> : <div>test</div>}
            <Summary></Summary>
        </div>
    );
}

export default ProfileVisual;