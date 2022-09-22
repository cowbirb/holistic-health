// create a function that will update the meditate props in the database
const updateMeditateProps = (userId, meditateLength) => {
  axios.put(`/api/user/meditate/${userId}`, {meditateLength})
    .catch((err) => {
      console.error('This is the error from the updateMeditateProps');
    });
};

export default updateMeditateProps;
