/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import {useAuth0} from '@auth0/auth0-react';

const AppContext = createContext();

function AppContextProvider({ children }) {
  const {isAuthenticated, user} = useAuth0();
  const [searchResults, setSearchResults] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loggedRecipeCal, setLoggedRecipeCal] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  const searchRecipes = ({ query }) => {
    axios
      .get('/search', { params: { query } })
      .then((response) => {
        console.log(response.data.hits);
        setSearchResults(response.data.hits);
      })
      .catch((err) => console.error(err));
  };

  const saveRecipe = (recipe) => {

    axios
      .post('/search/save', recipe)
      .then((response) => {
        console.log(response, 'recipe saved');
        setSavedRecipes(response);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (isAuthenticated) {
      const {name, email, picture} = currentUser;
      axios.post('/profile', {user: {
        name,
        email,
        picture,
      }})
      .then(({data}) => {
        setCurrentUser(data);
      })
      .catch(err => console.log('profile post unsuccessful', err));
    }
  }, [isAuthenticated, user]);



  const appProps = {
    searchRecipes,
    searchResults,
    setSearchResults,
    savedRecipes,
    setSavedRecipes,
    saveRecipe,
  };
  return <AppContext.Provider value={appProps}>{children}</AppContext.Provider>;
}

export { AppContextProvider, AppContext };
