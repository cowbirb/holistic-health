import React from "react";

const GuidedVideoEntry = ({video}) => {
  return (
    <>
      <h3>{video.snippet.title}</h3>
      <p>{video.snippet.description}</p>
      <p>{video.duration}</p>
    </>
  )
};

export default GuidedVideoEntry;
