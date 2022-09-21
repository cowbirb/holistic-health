import React, { useState, useEffect, useRef } from 'react';
import { Slider } from '@mui/material';
// import sound from '../media/audio/chime.wav';

const Meditate = () => {
  
  // initialize timer start value using useState
  const [userNum, setUserNum] = useState(600);
  // initialize a pause state value set to true
  const [pause, setPause] = useState(true);
  
  // create a state for if the timer is going off
  const [isTimeUp, setIsTimeUp] = useState(false);
  
  //const [randomInput, setRandomInput] = useState('');
  const [timerVal, setTimerVal] = useState(userNum);
  // set a value for if the timer is running
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // const renders = useRef(0);
  const timerId = useRef();
  
  // console.log(renders.current);
  // console.log('timerId.current:\n', timerId.current);
  // console.log('timerVal:\n', timerVal);
  // useEffect(() => {
  //   count.current = count.current + 1;
  // });
  
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
          setIsTimeUp(true);
          // reset the timer
          resetTimer();
          // play the chime
          // set a timout for 15 seconds until you switch the value of  timesup back
          setTimeout(() => {
            setIsTimeUp(false);
          }, 15000);
        }
      });
    }, 1000);
  };

  const minutes = Math.floor(timerVal / 60);
  const seconds = timerVal % 60;
  const secondsView = seconds > 9 ? seconds : `0${seconds}`;


  const timesUp = () => {
    // const chime = new Audio('../media/audio/meditation-chime.mp3');
    setIsTimeUp(true);
    resetTimer();
    //chime.play();
    setTimeout(() => {
      setIsTimeUp(false);
    }, 18000);
  };

  // useEffect(() => {
  //   console.log('we are inside of the useEffect');
  //   resetTimer();
  //   setIsTimeUp(true);
  // });

  //
  const RenderView = () => {
    // if the time isn't up
    if (!isTimeUp) {
      // if the timer is running
      if (isTimerRunning) {
        return (
          <div>
            <h2>
              Breathing in, I calm my body.
              <br></br>
              <br></br>
              Breathing out, I smile.
              <br></br>
              <br></br>
              Dwelling in the present moment,
              <br></br>
              <br></br>
              I know this is a wonderful moment.
            </h2>
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
        max={60}
      />
      <section>
        { pause ? <button onClick={startTimer}>Start</button> : <button onClick={stopTimer}>Pause</button>}
        <button onClick={resetTimer}>Reset</button>
      </section>
    </>
  );
};

export default Meditate;
