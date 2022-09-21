import React, {useState,useEffect, useContext} from "react";

import CalorieCalc from "../../components/CalorieCalc.jsx";
import ProfileDetails from "../../components/Profile-details.jsx";

import SavedRecipesList from "../../components/SavedRecipesList.jsx";
import Search from "../../components/Search.jsx";

import axios from "axios";

import { UserContext } from "../../context/user.context.jsx";

const Meals = () => {
  const {currentUser} = useContext(UserContext);

  return (
    <>
      <div><h1>Meals</h1></div>
        <ProfileDetails user={currentUser} />
        <Search />
        <SavedRecipesList user={currentUser}/>
    </>
  );
};
export default Meals;
