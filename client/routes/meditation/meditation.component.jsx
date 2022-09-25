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
          display: 'flex',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '8%'
        }}
      >
      {view === 'Meditation Timer' ? <MeditateTimer handleViewChange={handleViewChange} /> : <GuidedMeditation handleViewChange={handleViewChange} />}
      </Box>
    </>
  );
};

export default Meditation;
