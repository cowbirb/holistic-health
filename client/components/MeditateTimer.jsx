import React, { useState, useContext, useRef, useEffect } from 'react';
import { UserContext } from '../context/user.context.jsx';
// import Typography from '@mui/material/Typography';
import chime from '../media/audio/meditation-chime.mp3';
import updateMeditateProps from '../services/meditate/meditate-services.js';
import { 
  Slider, 
  Typography,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
  TextField,  
} from '@mui/material';

// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import Typography from "@mui/material/Typography";

const MeditateTimer = ({handleViewChange}) => {  
  const { currentUser } = useContext(UserContext);
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
          return !currentMantra.length ? 
              (
              <>
              <p><i>breathe in...</i></p>
              <br></br>
              <p><i>breathe out...</i></p>
              <br></br>
              </>
              ) : currentMantra.map((line, i) => {
                  return (
                  <div key={line + i}>
                    <p><i>{i % 2 === 0 ? 'breathe in...' : 'breathe out...'}</i></p>
                    <h3>{line}</h3>
                    <br></br>
                  </div>
                  )}
              )
      } else {
        return <h2>{secondsView === '00' ? `${minutes} minutes` : `${minutes} minutes ${secondsView} seconds`}</h2>;
      }
    } else {
      return <h2>Thank you.</h2>;
    }
  };
  
  return (
    <>
    <Card>
      <CardContent>
      {/* <CardHeader> */}
        <Button onClick={handleViewChange} size={'small'}>
          Switch to Guided Meditation
        </Button>
        <h1>Meditation Timer</h1>
      {/* </CardHeader> */}
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
      <CardActions>
        <section>
          { pause ? <Button onClick={startTimer}>Start</Button> : <Button onClick={stopTimer}>Pause</Button>}
            <Button onClick={resetTimer}>Reset</Button>
          </section>
        </CardActions>
        </CardContent>
      </Card>
    </>
  );
};

export default MeditateTimer;
