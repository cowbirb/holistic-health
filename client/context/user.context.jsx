/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// provider
// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [currentUser, setCurrentUser] = useState({});
  const value = { currentUser, setCurrentUser, isAuthenticated, loginWithRedirect, logout };

  // immediately after the user logs in, we want to set the currentUser to the user object
  // and then we want to make a request to our backend to create a user document in the database

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .post("/api/user/googleAuth", { user })
        .then(({data}) => setCurrentUser(data))
        .catch((err) => console.log(err));
    }
  }, [isAuthenticated, user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
