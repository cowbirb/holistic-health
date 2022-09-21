import React, {useState, useContext, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import {UserContext, setCurrentUser} from '../../context/user.context';

const Exercise = () => {
  const {currentUser} = useContext(UserContext);
  const [newExercise, setNewExercise] = useState({
    workout: '',
    set: '',
    rep: '',
  });
  console.log('user: ', currentUser);
  useEffect(() => {
    axios.get(`/api/user/${currentUser.email}`)
    .then(({data}) => setCurrentUser(data))
    .catch(err => console.log('exercise get unsuccessful', err));
  }, [])

  const exerciseChange = (e) => {
    const {name, value} = e.target;
    setNewExercise(newExercise => ({
      ...newExercise,
      [name]: value
    }));
  }
  const updateWorkout = () => {
    axios.put(`/profile/${currentUser.email}`, {users: {$push: {exercises: newExercise}}})
    .then(() => setNewExercise({
      workout: '',
      set: '',
      rep: '',
    }))
    .catch(err => console.log('workout update unsuccessful', err));
  };

  return (
    <Box>
      <TextField
        placeholder='name of exercise'
        type='text'
        name='workout'
        value={newExercise.workout}
        onChange={exerciseChange}
      >Name of Exercise</TextField>
      <TextField
        placeholder='number of sets'
        type='text'
        name='set'
        value={newExercise.set}
        onChange={exerciseChange}
      >Number of Sets</TextField>
      <TextField
        placeholder='number of reps'
        type='text'
        name='rep'
        value={newExercise.rep}
        onChange={exerciseChange}
      >Number of Reps</TextField>
      <button
        type='submit'
        onClick={updateWorkout}
      >Update Workout</button>
    </Box>
  )
}

export default Exercise;
