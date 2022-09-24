import React, { useContext, useState } from "react";
import { UserContext } from "../../context/user.context.jsx";

import ProfileDetails from "../../components/Profile-details.jsx";
import SavedRecipesList from "../../components/SavedRecipesList.jsx";
import Search from "../../components/Search.jsx";


const Meals = () => {
  const {currentUser} = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({user: {}});
  const [isLoading, setLoading] = useState(true);

  if (isLoading) {
    if (currentUser) {
        setUserInfo(currentUser);
    }
    setLoading(false);
  }

  return (
    <>
      <div><h1>Meals</h1></div>
        <ProfileDetails user={userInfo} />
        <SavedRecipesList user={userInfo}/>
        <Search />
    </>
  );
};
export default Meals;
