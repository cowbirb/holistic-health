import React, { useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import { UserContext } from '../../context/user.context';
import ExerciseList from '../../components/ExerciseList';

const Exercise = () => {
  const { currentUser } = useContext(UserContext);
  const [newWorkout, setNewWorkout] = useState({
    workout: '',
    weight: '',
    set: '',
    reps: '',
  });

  const workoutChange = (e) => {
    const { name, value } = e.target;
    setNewWorkout((newWorkout) => ({
      ...newWorkout,
      [name]: value,
    }));
  };

  const createWorkout = () => {
    axios
      .put(`/api/user/exercise/${currentUser.email}`, {
        user: { $push: { saved_workouts: newWorkout } },
      })
      .then(() =>
        setNewWorkout({
          workout: '',
          weight: '',
          set: '',
          reps: '',
        })
      )
      .catch((err) => console.log('workout update unsuccessful', err));
  };

  if (!currentUser) {
    return <h1>Please login</h1>;
  } else {
    console.log(currentUser);
    const { saved_workouts, daily_info } = currentUser;
 
    return (
      <>
        <Box
          sx={{border:'1px', borderColor: 'grey'}}
        >
          <TextField
            placeholder='name of exercise'
            type='text'
            name='workout'
            value={newWorkout.workout}
            onChange={workoutChange}
          >
            Name of Exercise
          </TextField>
          <TextField
            placeholder='weight lifted'
            type='text'
            name='weight'
            value={newWorkout.weight}
            onChange={workoutChange}
          >
            Weight
          </TextField>
          <TextField
            placeholder='Number of sets'
            type='text'
            name='set'
            value={newWorkout.set}
            onChange={workoutChange}
          >
            Number of Sets
          </TextField>
          <TextField
            placeholder='Number of reps'
            type='text'
            name='reps'
            value={newWorkout.reps}
            onChange={workoutChange}
          >
            Number of Reps
          </TextField>
          <button type='submit' onClick={createWorkout}>
            Update Workout
          </button>
        </Box>
        <h1>Recent Workouts</h1>
        {saved_workouts.map((workout, _id) => (
          <ExerciseList key={_id} workout={workout} daily_info={daily_info} />
        ))}
      </>
    );
  }
};

export default Exercise;
