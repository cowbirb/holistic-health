import React, {useState} from 'react';
import MeditateTimer from '../../components/MeditateTimer.jsx';
import GuidedMeditation from '../../components/GuidedMeditation.jsx';
import { 
  Box,
  Slider, 
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,  
} from '@mui/material';

const Meditation = () => {
  const [view, setView] = useState('Meditation Timer');

  const handleViewChange = () => {
    view === 'Meditation Timer' ? setView('Guided Meditation') : setView('Meditation Timer')
  }

  return (
    <>
      <Box 
        sx={{
          margin: "auto",
          width: "80%",
          marginTop: "10px",
          textAlign: "center",
        }}
      >
      {view === 'Meditation Timer' ? <MeditateTimer handleViewChange={handleViewChange} /> : <GuidedMeditation handleViewChange={handleViewChange} />}
      {/* <Button onClick={handleViewChange}
      >
        {view === 'Meditation Timer' ? 'Guided Meditation' : 'Meditation Timer'}
      </Button> */}
      </Box>
    </>
  );
};

export default Meditation;
