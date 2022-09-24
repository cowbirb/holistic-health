import React, {useState,useEffect, useContext} from "react";

import CalorieCalc from "../../components/CalorieCalc.jsx";
import ProfileDetails from "../../components/Profile-details.jsx";

import SavedRecipesList from "../../components/SavedRecipesList.jsx";
import Search from "../../components/Search.jsx";

import axios from "axios";

import { UserContext  } from "../../context/user.context";

const Meals = () => {
  const {currentUser} = useContext(UserContext);
  

  console.log('meals: ', currentUser);
  return (
    <>
      <div><h1>Meals</h1></div>
        <ProfileDetails  currentUser={currentUser} />
        <Search />
        <SavedRecipesList />
    </>
  );
};
export default Meals;
