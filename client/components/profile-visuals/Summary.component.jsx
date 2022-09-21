import React, { useState } from 'react';
import Box from '@mui/material/Box';
import birb from '../../../assets/cowbird-image.jpg';
import baron from '../../../assets/Dore-munchausen-illustration.jpg';

const Summary = () => {
    const [commonMood, setCommMood] = useState('INSERT_MOOD_HERE');
    const [commonMeditate, setCommMed] = useState('INSERT_MEDITATION_TIME_HERE');
    const [commonExcercise, setCommExc] = useState('INSERT_EXCERCISE_TIME_HERE');

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <div style={{display: 'inline-block', 'vertical-align': 'top'}}>
                    { true ? <img width='100' height='100' src={ birb } /> : <img width='75' height='100' src={ baron } /> }
                </div>
                <div style={{ display: 'inline-block', 'margin-left': '10px', 'border-left': '7px solid gray', 'border-right': '7px solid gray', 'border-bottom': '7px solid gray', background: 'gray'}}>
                    <p style={{ color: 'blue', 'margin-bottom': '0px', 'margin-top': '5px' }} className="float-right">
                        <u>{
                            `The wholesome cowbird says:`
                        }</u>
                    </p>
                    <p style={{margin: '0px'}}>
                        You've most often been { commonMood } for {'INSERT_DAYS_COUNT_HERE'}.
                    </p>
                    <p style={{margin: '0px'}}>
                        On days you've been {commonMood}, your average meditation time is {commonMeditate}.
                    </p>
                    <p style={{margin: '0px'}}>
                        On days you've been {commonMood}, your average excercise time is {commonExcercise}.
                    </p>
                </div>
            </Box>
        </div>
    );
};

export default Summary;