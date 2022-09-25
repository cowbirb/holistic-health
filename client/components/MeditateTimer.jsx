import React, { useState, useContext, useRef, useEffect } from 'react';
import { UserContext } from '../context/user.context.jsx';
// import Typography from '@mui/material/Typography';
import chime from '../media/audio/meditation-chime.mp3';
import updateMeditateProps from '../services/meditate/meditate-services.js';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { 
  Slider, 
  Typography,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  //ExpandMoreIcon,
  IconButton,
  Grid,
  Button,
} from '@mui/material';

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
  // const [isTimerRunning, setIsTimerRunning] = useState(false);
  // set a value for the currentMantra
  const [expanded, setExpanded] = useState(false);
  // const renders = useRef(0);
  const timerId = useRef();

  useEffect(() => {
    if (currentUser) {
      setUserNum(currentUser.default_timer);
    }
  }, [currentUser]);

  useEffect(() => {
    setTimerVal(userNum)
  }, [userNum, currentUser]);
  
  const mantras = [[['Breathing in, I calm my body'],['Breathing out, I smile'], ['Dwelling in the present moment'], ['I know this is a wonderful moment.']]
, [['I'],['Am'],['Here'],['Now']], [['I have arrived'], ['I am home']], [['May you be free'], ['May you be at peace'], ['May you be healthy'], ['Thank you']]];
  
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

const handleExpandClick = () => {
  setExpanded(!expanded);
};

const handleSliderChange = (e) => {
  setTimerVal(e.target.value * 60);
  setUserNum(e.target.value * 60);
};

const stopTimer = () => {
  clearInterval(timerId.current);
  setPause(true);
  // setIsTimerRunning(false);
  timerId.current = 0;
};

const resetTimer = () => {
  stopTimer();
  // setIsTimerRunning(false);
  setTimerVal(userNum);

};

// const updateCurrentMantra = () => {
//   setCurrentMantra(mantras[Math.floor(Math.random() * mantras.length)]);
// }

// function to start the timer
const startTimer = () => {
  setPause(false);
  // setIsTimerRunning(true);
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
          resetTimer();
          // reset the timer
          // play the chime
          const alert = new Audio(chime);
          alert.play();
          // updateCurrentMantra();
          // set a timout for 15 seconds until you switch the value of  timesup back
          setTimeout(() => {
            setIsTimeUp(false);
          }, 15000);
          return userNum
        }
      });
    }, 1000);
  };

  // useEffect(() => {
  //   updateCurrentMantra();
  // }, [])
  
  const minutes = Math.floor(timerVal / 60);
  const seconds = timerVal % 60;
  const secondsView = seconds > 9 ? seconds : `0${seconds}`;

  const RenderView = () => {
    // if the time isn't up
    if (!isTimeUp) {
        return (
          <Typography variant='h5' color='text.secondary'>
            {secondsView === '00' ? `${minutes} minutes` : `${minutes} minutes ${secondsView} seconds`}
          </Typography>
        )
    } else {
        return (
      <Typography variant='h4' color='text.secondary'>
        Thank you.
      </Typography>)
    }
  };
  
  return (
    <>
    <Card sx={{ width: 600}} >
      <CardContent>
      {/* <CardHeader> */}
        <Button onClick={handleViewChange} size={'small'}>
          Switch to Guided Meditation
        </Button>
        <Typography variant='h2'>
          Meditation Timer
        </Typography>
      {/* </CardHeader> */}
      <br></br>
      <RenderView />
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
        <Grid container spacing={12}>
          <Grid item xs
            sx={{
              justifyContent:'left',
            }}
            xs={6}
          >
            
        <section>
          { pause ? <Button onClick={startTimer}>Start</Button> : <Button onClick={stopTimer}>Pause</Button>}
            <Button onClick={resetTimer}>Reset</Button>
          </section>
          </Grid>
          <Grid item xs
            sx={{
              justifyContent:'right',
            }}
            
          >

          <Button>Mantras</Button>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show mantras"
            >
            <ExpandMoreIcon />
          </ExpandMore>
            </Grid>
        </Grid>
        </CardActions>
        <Collapse in={expanded} unmountOnExit>
        <CardContent>
        <Carousel 
       // key={videoIndexStart}
       // showIndicators={false} 
        showThumbs={false} 
        useKeyboardArrows={true} 
        showStatus={false}
        infiniteLoop={true}
        // width={'75%'}
        >
              {mantras.map((mantra, i) => (
                <div key={`${mantra}, ${i}`}>
                  {mantra.map((line, i) => (
                  <div key={line + i}>
                    <Typography variant='body1' color='text.secondary'>
                    {i % 2 === 0 ? 'breathe in...' : 'breathe out...'}
                    </Typography>
                    <Typography variant='h5'>
                      {line}
                    </Typography>
                    <br></br>
                  </div>
                  ))}
                </div>
              ))}
              
            </Carousel>
        </CardContent>
        </Collapse>
        </CardContent>
      </Card>
    </>
  );
};

export default MeditateTimer;
