import React, { useState, useContext, useRef, useEffect } from 'react';
import { Slider, Typography } from '@mui/material';
import { UserContext } from '../context/user.context.jsx';
// import Typography from '@mui/material/Typography';
import chime from '../media/audio/meditation-chime.mp3';
import updateMeditateProps from '../services/meditate/meditate-services.js';


const Meditate = () => {  
  const { currentUser } = useContext(UserContext);
  console.log('currentUser:', currentUser)
  // initialize timer start value using useState
  const [userNum, setUserNum] = useState(currentUser && currentUser.default_timer || 600);
  // initialize a pause state value set to true
  const [pause, setPause] = useState(true);
  // create a state for if the timer is going off
  const [isTimeUp, setIsTimeUp] = useState(false);
  //const [randomInput, setRandomInput] = useState('');
  const [timerVal, setTimerVal] = useState(userNum);
  // set a value for if the timer is running
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // set a value for the currentMantra
  const [currentMantra, setCurrentMantra] = useState([])
  // const renders = useRef(0);
  const timerId = useRef();

  const mantras = [[['Breathing in, I calm my body'],['Breathing out, I smile'], ['Dwelling in the present moment'], ['I know this is a wonderful moment.']]
, [['I'],['Am'],['Here'],['Now']], [['I have arrived'], ['I am home']], [['May you be free'], ['May you be at peace'], ['May you be healthy'], ['Thank you']], [], []];
  

const handleSliderChange = (e) => {
  setTimerVal(e.target.value * 60);
  setUserNum(e.target.value * 60);
};

const stopTimer = () => {
  setPause(true);
  setIsTimerRunning(false);
  clearInterval(timerId.current);
  timerId.current = 0;
};

const resetTimer = () => {
  stopTimer();
  setIsTimerRunning(false);
  if (timerVal) {
    //renders.current++;
    setTimerVal(userNum);
  }
};

const updateCurrentMantra = () => {
  setCurrentMantra(mantras[Math.floor(Math.random() * mantras.length)]);
}

// function to start the timer
const startTimer = () => {
  setPause(false);
  setIsTimerRunning(true);
  // set the interval to one second
    timerId.current = setInterval(() => {
      // renders.current++;
      setTimerVal((prev) => {
        // if the previous value is gt 0
        if (prev > 1) {
          // countdown
          return prev - 1;
          // otherwise
        } else {
          // change the value of timesUp
          updateMeditateProps(currentUser._id, userNum);
          setIsTimeUp(true);
          // reset the timer
          resetTimer();
          // play the chime
          const alert = new Audio(chime);
          alert.play();
          updateCurrentMantra();
          // set a timout for 15 seconds until you switch the value of  timesup back
          setTimeout(() => {
            setIsTimeUp(false);
          }, 15000);
        }
      });
    }, 1000);
  };

  useEffect(() => {
    updateCurrentMantra();
  }, [])
  
  const minutes = Math.floor(timerVal / 60);
  const seconds = timerVal % 60;
  const secondsView = seconds > 9 ? seconds : `0${seconds}`;

  const RenderView = () => {
    // if the time isn't up
    if (!isTimeUp) {
      // if the timer is running
      if (isTimerRunning) {
        return (
          <div>

            <p><i>breathe in...</i></p>
            <h3>
            {currentMantra[0] || []}
            </h3>
            <br></br>
            <br></br>
            <p><i>breathe out...</i></p>
            <h3>
            {currentMantra[1] || []}
            </h3>
            <br></br>
            <br></br>
            <p><i>breathe in...</i></p>
            <h3>
            {currentMantra[2] || currentMantra[0] || []}
            </h3>
            <br></br>
            <br></br>
            <p><i>breathe out...</i></p>
            <h3>
            {currentMantra[3] || currentMantra[1] || []}
            </h3>
          </div>
        );
      } else {
        return <h2>{secondsView === '00' ? `${minutes} minutes` : `${minutes} minutes ${secondsView} seconds`}</h2>;

      }

    } else {
      return <h2>Thank you.</h2>;
    }
  };
  
  return (
    <>
      <h1>Meditate</h1>
      <br></br>
      <br></br>
      <RenderView />
      <br /><br />
      <br /><br />
      <Slider
        aria-label="Time"
        // defaultValue={10}
        value={timerVal / 60}
        // getAriaValueText={'Time'}
        valueLabelDisplay="auto"
        onChange={handleSliderChange}
        step={5}
        marks
        min={.1}
        max={30}
      />
      <section>
        { pause ? <button onClick={startTimer}>Start</button> : <button onClick={stopTimer}>Pause</button>}
        <button onClick={resetTimer}>Reset</button>
      </section>
    </>
  );
};

export default Meditate;
