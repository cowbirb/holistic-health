import React, { useContext } from "react";
import { UserContext } from "../../context/user.context.jsx";

import ProfileDetails from "../../components/Profile-details.jsx";
import SavedRecipesList from "../../components/SavedRecipesList.jsx";
import Search from "../../components/Search.jsx";


const Meals = () => {
  const {currentUser} = useContext(UserContext);

  return (
    <>
      <div><h1>Meals</h1></div>
        <ProfileDetails user={currentUser} />
        <SavedRecipesList user={currentUser}/>
        <Search />
    </>
  );
};
export default Meals;
