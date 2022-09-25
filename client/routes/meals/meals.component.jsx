import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/user.context.jsx';
import { TextField, Box, Button } from '@mui/material';
import ProfileDetails from '../../components/Profile-details.jsx';
import SavedRecipesList from '../../components/SavedRecipesList.jsx';
import Search from '../../components/Search.jsx';

const Meals = () => {
  const { currentUser } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({ user: {} });
  const [isLoading, setLoading] = useState(true);

  if (isLoading) {
    if (currentUser) {
      setUserInfo(currentUser);
    }
    setLoading(false);
  }

  return (
    <>
      <Box
        sx={{
          margin: 'auto',
          marginTop: '10px',
          textAlign: 'center',
          border: '1px',
          borderColor: 'grey',
        }}
      >
        <ProfileDetails user={userInfo} />
      </Box>
      <Box
        sx={{
          margin: 'auto',
          marginTop: '10px',
          textAlign: 'center',
          border: '1px',
          borderColor: 'grey',
        }}
      >
        <SavedRecipesList user={userInfo} />
      </Box>
      <Box
        sx={{
          margin: 'auto',
          marginTop: '10px',
          textAlign: 'center',
          border: '1px',
          borderColor: 'grey',
        }}
      >
        <Search />
      </Box>
    </>
  );
};
export default Meals;
