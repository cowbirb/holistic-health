import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/user.context.jsx';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const CalorieCalc = ({
  userSex,
  userAge,
  userHeight,
  userWeight,
}) => {
  const [calCnt, setCalCnt] = useState(0);
  const { calorieCount, setCalorieCount } = useContext(UserContext);

  const getCalCnt = () => {
    if (userSex === 'female') {
      const userCalCnt = Math.round(
        (65.51 + 4.35 * userWeight + 4.7 * userHeight - 4.7 * userAge) * 1.55
      );
      setCalCnt(userCalCnt);
    } else {
      const userCalCnt = Math.round(
        (66.47 + 6.24 * userWeight + 12.7 * userHeight - 6.75 * userAge) * 1.55
      );
      setCalCnt(userCalCnt);
    }
  };

  useEffect(() => {
    getCalCnt();
  });

  const handleResetClick = () => {
    setCalorieCount(0);
  };

  return (
    <Container
      sx={{
        textAlign: 'center',
        p: 2,
        width: 400,
        boxShadow: 5,
      }}
    >
      <Box
        sx={{
          fontSize: 24,
        }}
      >
        Calorie Calculator
      </Box>
      <Box
        sx={{
          fontSize: 20,
          p: 2,
        }}
      >
        {calCnt} cal goal - {calorieCount} cal logged ={' '}
        {Math.round(calCnt - calorieCount)} cal remaining
      </Box>
      <Box>
        <Button variant='contained' onClick={handleResetClick}>
          Reset
        </Button>
      </Box>
    </Container>
  );
};

export default CalorieCalc;
