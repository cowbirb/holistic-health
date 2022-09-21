import React, { useEffect, createContext, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    if (isAuthenticated) {
      axios.post('/profile', { user })
        .then(({ data }) => {
          console.log('--->', data);
          setCurrentUser(data)})
        .catch(err => console.log('profile post unsuccessful', err));
    }
  }, [isAuthenticated, user]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};