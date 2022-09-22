import React from "react";
import ProfileVisual from '../../components/profile-visuals/Profile-visuals.component.jsx';
import baron from '../../../assets/Dore-munchausen-illustration.jpg';

const Profile = () => {
  return (
    <div>
      <div id="profileInfo">
        <h1>Profile</h1>
        <div id="profileImage" style={{display: 'inline-block', verticalAlign: 'top', marginLeft: '5px'}}>
          <img width='75' height='100' src={ baron }></img>
        </div>
        <div id="profileText" style={{display: 'inline-block', marginLeft: '10px'}}>
          <p>{`INSERT_NAME_HERE`}</p>
          <p>{`INSERT_EMAIL_HERE`}</p>
        </div>
      </div>
      <ProfileVisual></ProfileVisual>
    </div>
  );
};

export default Profile;
