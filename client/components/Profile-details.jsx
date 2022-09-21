import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import CalorieCalc from './CalorieCalc.jsx';
import Exercise from './Exercise.jsx';
import Meals from './Meals.jsx';

//Textfield select
const sexes = [
  {
    value: 'male',
    label: 'M',
  },
  {
    value: 'female',
    label: 'F',
  },
];

function ProfileDetails({ user, calorieCount, setCalorieCount }) {
  //Material-ui: Textfield props
  const inputProps = {
    type: 'number',
  };

  const labelProps = {
    shrink: true,
  };

  const [userInfo, setUserInfo] = useState({
    sex: sexes[0].value,
    age: 0,
    height: 0,
    weight: 0,
  });

  // handels setting state of Textfields
  const handleFieldChange = (event) => {
    const { value, name } = event.target;
    setUserInfo(userInfo => ({...userInfo,
        [name]: value,
    }));
  };

  // on Update click send axios put request that will communicate with server
  const handleUpdateOnClick = () => {
    const {sex, age, height, weight} = userInfo;
    axios
      .put(`/profile/${user.email}`, {users: {
        age,
        height,
        weight,
        sex,
      }
      })
      .then(() => console.log('profile update successful'))
      .catch(err => console.error('profile update unsuccessful', err));
  };

  // send axios get request to get user information not provided by Auth0
  const getProfileDetails = () => {
    // axios
    //   .get(`/profile/${user.email}`)
    //   .then(({ data }) => {
    //     console.log('---->', data);
    //     return data;
    //   })
    //   .then((data) => {
    //     // setState to reflect user information

    //     if (data.age) {
    //       setAge(data.age);
    //     }
    //     if (data.weight) {
    //       setWeight(data.weight);
    //     }
    //     if (data.height) {
    //       setHeight(data.height);
    //     }
    //     if (data.sex) {
    //       setSex(data.sex);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log('could not get information', err);
    //   });
  };

  //run immediately after rendering
  useEffect(() => {
    getProfileDetails();
  }, []);

  return (
    <div>
      <Box
        sx={{
          border: '1px',
          borderColor: 'grey',
        }}
      >
        <TextField
          id='Agefield'
          name='age'
          label='Age'
          value={userInfo.age}
          onChange={handleFieldChange}
          InputLabelProps={labelProps}
          inputProps={inputProps}
        ></TextField>

        <TextField
          id='Heightfield'
          name='height'
          label='Height'
          value={userInfo.height}
          onChange={handleFieldChange}
          InputLabelProps={labelProps}
          inputProps={inputProps}
        ></TextField>

        <TextField
          id='Weightfield'
          name='weight'
          label='Weight'
          value={userInfo.weight}
          onChange={handleFieldChange}
          InputLabelProps={labelProps}
          inputProps={inputProps}
        ></TextField>

        <TextField
          id='select-Sex'
          name='sex'
          select
          label='Sex'
          InputLabelProps={labelProps}
          value={userInfo.sex}
          onChange={handleFieldChange}
        >
          {sexes.map((option) => {
            return (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            );
          })}
        </TextField>

        <Button
          text='Update'
          variant='outlined'
          onClick={() => {
            handleUpdateOnClick(user);
          }}
        >
          Update
        </Button>
      </Box>
      <br />
      <Box>
        <CalorieCalc
          userInfo={userInfo}
          calorieCount={calorieCount}
          setCalorieCount={setCalorieCount}
        />
      </Box>
      <Box>
        <Meals />
      </Box>
      <Box>
       <Exercise user={user} />
      </Box>
    </div>
  );
}

export default ProfileDetails;
