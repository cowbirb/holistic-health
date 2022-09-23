import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import birb from '../../../assets/cowbird-image.jpg';
import baron from '../../../assets/Dore-munchausen-illustration.jpg';
import { UserContext } from '../../context/user.context';

const Summary = () => {
    const { currentUser } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState(currentUser ? currentUser.daily_info : null);
    const [commonMood, setCommMood] = useState('INSERT_MOOD_HERE');
    const [commonMoodDays, setCommMoodDays] = useState(0);
    const [commonMeditate, setCommMed] = useState('INSERT_MEDITATION_TIME_HERE');
    const [commonExcercise, setCommExc] = useState('INSERT_EXCERCISE_TIME_HERE');
    const [entries, setEntries] = useState(userInfo ? userInfo.filter((curr) => curr.emotion_of_the_day.did_respond) : null);
    const [setup, setSetup] = useState(true);

    const findCommonMood = () => {
        let output = {};
        let outputMood = ['null', 0];
        for(let i = 0; i < entries.length; i++) {
            if (output[entries[i].emotion_of_the_day.emotion]) {
                output[entries[i].emotion_of_the_day.emotion] += 1;
            } else {
                output[entries[i].emotion_of_the_day.emotion] = 1;
            }
        }

        for (let key in output) {
            if (output[key] > outputMood[1]) {
                outputMood[0] = key;
                outputMood[1] = output[key];
            }
        }
        return outputMood[0];
    }

    if (setup) {
        if (entries) {
            let mood = findCommonMood();
            setCommMood(mood);
            setCommMoodDays(entries.filter((curr) => curr.emotion_of_the_day.emotion === mood).length);
            setCommMed(entries.filter((curr) => (curr.emotion_of_the_day.emotion === mood && curr.did_meditate)).length);
            setCommExc(entries.filter((curr) => (curr.emotion_of_the_day.emotion === mood && curr.did_workout)).length);
        }
        setSetup(false);
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <div style={{display: 'inline-block', verticalAlign: 'top'}}>
                    { true ? <img width='100' height='100' src={ birb } /> : <img width='75' height='100' src={ baron } /> }
                </div>
                <div style={{ display: 'inline-block', marginLeft: '10px', borderLeft: '7px solid gray', borderRight: '7px solid gray', borderBottom: '7px solid gray', background: 'gray'}}>
                    {currentUser && <div>
                        <p style={{ color: 'blue', marginBottom: '0px', marginTop: '5px' }} className="float-right">
                            <u>{
                                `The wholesome cowbird says:`
                            }</u>
                        </p>
                        <p style={{margin: '0px'}}>
                            You've most often been { commonMood } for {commonMoodDays} days out of a total {entries ? entries.length : null}.
                        </p>
                        <p style={{margin: '0px'}}>
                            On days you've been {commonMood}, you've meditated for {commonMeditate} of them.
                        </p>
                        <p style={{margin: '0px'}}>
                            On days you've been {commonMood}, you've exercised for {commonExcercise} of them.
                        </p>
                    </div>}
                    {!currentUser && <div>
                        <p style={{ color: 'blue', marginBottom: '0px', marginTop: '5px' }} className="float-right">
                            <u>{
                                `The wholesome cowbird says:`
                            }</u>
                        </p>
                        <p style={{margin: '0px'}}>
                            I know not who you are, log in and I'll tell some interesting facts about you.
                        </p>
                    </div>}
                </div>
            </Box>
        </div>
    );
};

export default Summary;