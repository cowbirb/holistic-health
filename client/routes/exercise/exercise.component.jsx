import React, {useState, useContext, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import {UserContext} from '../../context/user.context';

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

  const updateWorkout = () => {
   if (newWorkout.workout) {
     axios.put(`/api/user/${currentUser._id}`, {users: {$push: {saved_workouts: newWorkout}}})
     .then(() => setNewWorkout({
       workout: '',
       set: '',
       reps: '',
     }))
     .catch(err => console.log('workout update unsuccessful', err));
   }
  };
  
  return (
    <Box>
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
        onClick={updateWorkout}
      >Update Workout</button>
      {/* {currentUser.map(user => (<div>{user.exercises}</div>))} */}
    </Box>
  )
}

export default Exercise;
