import React, { useState, useEffect, useRef } from 'react';

const Meditate = () => {
  
  // initialize timer start value using useState
  const [num, setNum] = useState(600);
  // initialize a pause state value set to false
  const [pause, setPause] = useState(false);
  
  // create a
  
  const [randomInput, setRandomInput] = useState('');
  const [timerVal, setTimerVal] = useState(600);
  // const renders = useRef(0);
  const timerId = useRef();
  
  // console.log(renders.current);
  console.log('timerId.current:\n', timerId.current);
  console.log('timerVal:\n', timerVal);
  // useEffect(() => {
  //   count.current = count.current + 1;
  // });
  
  // const handleChange = (e) => {
  //   setRandomInput(e.target.value);
  //   renders.current++;
  // };

  // function to start the timer
  const startTimer = () => {
    // set the interval to one second
    timerId.current = setInterval(() => {
      // renders.current++;
      setTimerVal(prev => prev - 1);
    }, 1000);
  };

  const minutes = Math.floor(timerVal / 60);
  const seconds = timerVal % 60;
  const secondsView = seconds > 9 ? seconds : `0${seconds}`;

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
  };

  const resetTimer = () => {
    stopTimer();
    if (timerVal) {
      //renders.current++;
      setTimerVal(600);
    }
  };
  
  return (
    <>
      <h1>Meditate</h1>
      {/* <input
        type="text"
        value={randomInput}
        placeholder="Random Input"
        onChange={handleChange}
      />
      <h4>Render Count: {renders.current}</h4> */}
      <br /><br />
      <section>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Pause</button>
        <button onClick={resetTimer}>Reset</button>

      </section>
      <br /><br />
      <p>Time Left: {`${minutes}:${secondsView}`}</p>
      <br /><br />
      {/* <p>{randomInput}</p> */}
    </>
  );
};

export default Meditate;
