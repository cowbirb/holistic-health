import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";
import CalorieCalc from "./CalorieCalc.jsx";


//Textfield select
const sexes = [{value:"male",label:"M"},{value:"female",label:"F"}];

function ProfileDetails({ currentUser }) {

  //Material-ui: Textfield props
  const inputProps = {type: "number"};

  const labelProps = {shrink: true};

  //React Hooks and functions
  const [userInfo, setUserInfo] = useState({
    sex: sexes[0].value,
    age: '',
    height: '',
    weight: '',
  })

  const [calorieCount, setCalorieCount] = useState(0);

  // handles setting state of Textfields
  const handleFieldChange = (event) => {
    const { value, name } = event.target;
    setUserInfo(userInfo => ({...userInfo, 
    [name]: value,
    }));
  };

  const handleUpdateOnClick = () => {
    const {age, height, weight, sex} = userInfo;
      axios.put(`/api/user/${currentUser._id}`, {
        user: {
          age,
          height,
          weight,
          sex,
        },
      })
      .catch(err => console.log('put req unsuccessful', err));
  };


  return (
    <div>
      <Box
        sx={{
          border: "1px",
          borderColor: "grey",
        }}
      >

        <TextField
          id="Agefield"
          name="age"
          label="Age"
          value={userInfo.age}
          onChange={handleFieldChange}
          InputLabelProps={labelProps}
          inputProps={inputProps}
        ></TextField>

        <TextField
          id="Heightfield"
          name="height"
          label="Height"
          value={userInfo.height}
          onChange={handleFieldChange}
          InputLabelProps={labelProps}
          inputProps={inputProps}
        ></TextField>

        <TextField
          id="Weightfield"
          name="weight"
          label="Weight"
          value={userInfo.weight}
          onChange={handleFieldChange}
          InputLabelProps={labelProps}
          inputProps={inputProps}
        ></TextField>

        <TextField
          id="select-Sex"
          name="sex"
          select
          label="Sex"
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
          text="Update"
          variant="outlined"
          onClick={handleUpdateOnClick}
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
    </div>
  );
}

export default ProfileDetails;
