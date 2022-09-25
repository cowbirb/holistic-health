import React, { useState, useContext, useEffect } from 'react';
import {TextField, Box, Button} from '@mui/material';
import axios from 'axios';
import { UserContext } from '../../context/user.context';
import ExerciseList from '../../components/ExerciseList';

const Exercise = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
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

  const handleDelete = (_id) => {
    const {saved_workouts, email} = currentUser;
    const selectedWorkout = saved_workouts.filter(workout => {
      return workout._id === _id;
    });
    axios.put(`/api/user/exercise/${email}`, {
      user: {$pull: {saved_workouts: selectedWorkout[0]}}
    })
    .then(updateUser)
    .catch(err => console.log('delete workout unsuccessful', err));
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
      .then(updateUser)
      .catch((err) => console.log('workout update unsuccessful', err));
  };

  const updateUser = async () => {
    const {email} = currentUser;
    try{
      const {data} = await axios.get(`/api/user/exercise/${email}`);
      setCurrentUser(data);
    } catch (err) {
      console.log('update user unsuccessful', err);
    }
  };

  if (!currentUser) {
    return <h1>Please login</h1>;
  } else if (currentUser.saved_workouts) {
    const { saved_workouts, daily_info } = currentUser;
 
    return (
      <>
        <Box
          sx={{
          margin: 'auto',
          marginTop: '10px',
          textAlign: 'center',
          border:'1px',
          borderColor: 'grey'
        }}
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
        </Box>
        <Box sx={{
          textAlign:'right',
          width: '80%',
        }}>
          <Button type='submit' onClick={createWorkout}>
            Update Workout
          </Button>
        </Box>
        <Box
        sx={{
          margin: "auto",
          width: "50%",
          marginTop: "10px",
          textAlign: "center",
        }}
      >
        <h1>Recent Workouts</h1>
        {saved_workouts.map((workout, _id) => (
          <ExerciseList 
          key={_id} 
          workout={workout} 
          daily_info={daily_info} 
          handleDelete={handleDelete}
          />
        ))}
      </Box>
      </>
    );
  }
};

export default Exercise;
