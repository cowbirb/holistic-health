import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";
import CalorieCalc from "./CalorieCalc.jsx";


//Textfield select
const sexes = [
  {
    value: "male",
    label: "M",
  },
  {
    value: "female",
    label: "F",
  },
];

function ProfileDetails({ user }) {

  //Material-ui: Textfield props
  const inputProps = {
    type: "number",
  };

  const labelProps = {
    shrink: true,
  };

  //React Hooks and functions
  const [userSex, setSex] = useState(sexes[0].value);
  const [userAge, setAge] = useState(0);
  const [userHeight, setHeight] = useState(0);
  const [userWeight, setWeight] = useState(0);
  const [calorieCount, setCalorieCount] = useState(0);

  // handels setting state of Textfields
  const handleFieldChange = (event) => {
    const { value, name } = event.target;

    // determine which setState needs to be called
    switch (name) {
      case "Age":
        setAge(value);
        break;
      case "Weight":
        setWeight(value);
        break;
      case "Height":
        setHeight(value);
        break;
      case "Sex":
        setSex(value);
        break;
    }
  };

  const handleUpdateOnClick = async () => {
    try{
      await axios.put(`/api/user/${user._id}`, {
        user: {
          age: userAge,
          height: userHeight,
          weight: userWeight,
          sex: userSex,
        },
      });
    } catch(err){
      console.log(err)
    }
  };

  
  //run immediately after rendering
  useEffect(() => {
    if(user.age){
      setAge(user.age);
    }
    if(user.height){
      setHeight(user.height);
    }
    if(user.weight){
      setWeight(user.weight);
    }
    if(user.sex){
      setSex(user.sex);
    }
  }, []);

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
          name="Age"
          label="Age"
          value={userAge}
          onChange={handleFieldChange}
          InputLabelProps={labelProps}
          inputProps={inputProps}
        ></TextField>

        <TextField
          id="Heightfield"
          name="Height"
          label="Height"
          value={userHeight}
          onChange={handleFieldChange}
          InputLabelProps={labelProps}
          inputProps={inputProps}
        ></TextField>

        <TextField
          id="Weightfield"
          name="Weight"
          label="Weight"
          value={userWeight}
          onChange={handleFieldChange}
          InputLabelProps={labelProps}
          inputProps={inputProps}
        ></TextField>

        <TextField
          id="select-Sex"
          name="Sex"
          select
          label="Sex"
          InputLabelProps={labelProps}
          value={userSex}
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
          userSex={userSex}
          userAge={userAge}
          userHeight={userHeight}
          userWeight={userWeight}
          calorieCount={calorieCount}
          setCalorieCount={setCalorieCount}
        />
      </Box>
    </div>
  );
}

export default ProfileDetails;
