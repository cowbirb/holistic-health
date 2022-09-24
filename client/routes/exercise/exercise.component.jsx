import React, {useState, useContext, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import {UserContext} from '../../context/user.context';
import Exercises from '../../components/Exercise'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {
  styled,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  Button,
  List,
  ListItem,
} from "@mui/material";

const Exercise = () => {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [newWorkout, setNewWorkout] = useState({
    workout: '',
    set: '',
    reps: '',
  });

  const workoutChange = (e) => {
    const {name, value} = e.target;
    setNewWorkout(newWorkout => ({
      ...newWorkout,
      [name]: value
    }));
  }

  const createWorkout = () => {
   if (newWorkout.workout) {
     axios.put(`/api/user/exercise/${currentUser.email}`, {users: {$push: {saved_workouts: newWorkout}}})
     .then(() => setNewWorkout({
       workout: '',
       set: '',
       reps: '',
     }))
     .catch(err => console.log('workout update unsuccessful', err));
   }
  };

  

  return (
    <>
    <Box >
      <TextField
        placeholder='name of exercise'
        type='text'
        name='workout'
        value={newWorkout.workout}
        onChange={workoutChange}
      >Name of Exercise</TextField>
      <TextField
        placeholder='number of sets'
        type='text'
        name='set'
        value={newWorkout.set}
        onChange={workoutChange}
        >Number of Sets</TextField>
      <TextField
        placeholder='number of reps'
        type='text'
        name='reps'
        value={newWorkout.reps}
        onChange={workoutChange}
        >Number of Reps</TextField>
      <button
        type='submit'
        onClick={createWorkout}
        >Update Workout</button>
    </Box>

  </>
  )
}

export default Exercise;
