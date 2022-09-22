import React, { useState, useContext } from "react";
import ProfileVisual from '../../components/profile-visuals/Profile-visuals.component.jsx';
import baron from '../../../assets/Dore-munchausen-illustration.jpg';
import { UserContext } from '../../context/user.context.jsx';
import sample1 from '../../../assets/Sample-Image-1.jpg';
import sample2 from '../../../assets/Sample-Image-2.jpg';
import sample3 from '../../../assets/Sample-Image-3.jpg';
import axios from 'axios';

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const [setup, setSetup] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  if (setup) {
    axios.get(`/api/user/632bf701cd4d0ef00f7796c2`)
        .then(result => {
            setSetup(false);
            setUserProfile(result.data);
        })
        .catch(err => { console.error(err) });
    }
  
  return (
    <div>
      <div id="profileInfo" style={{color: 'blue'}}>
        <h1>Profile</h1>
        <div id="profileImage" style={{display: 'inline-block', verticalAlign: 'top', marginLeft: '5px'}}>
          { currentUser ? (currentUser.name === 'Quixotic destiny' ? <img width='75' height='100' src={ baron }></img> : (currentUser.name === 'Adonis Suriel' ? <img width='100' height='100' src={sample3}></img> : ( currentUser.name === 'Eric Kuehnemann' ? <img width='100' height='100' src={sample2}></img> : (currentUser.name === 'Federico Jimenez' ? <img width='200' height='100' src={sample1}></img> : <img width='100' height='100' src={currentUser.picture}></img>)))) : <img width='75' height='100' src={ baron }></img> }
        </div>
        <div id="profileText" style={{display: 'inline-block', marginLeft: '10px'}}>
          <p>{currentUser ? currentUser.name : 'ERROR'}</p>
          <p>{currentUser ? currentUser.email : 'ERROR'}</p>
        </div>
      </div>
      <ProfileVisual userProfile={userProfile}></ProfileVisual>
    </div>
  );
};

export default Profile;
