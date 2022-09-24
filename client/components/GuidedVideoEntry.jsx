import React from "react";
import { Typography } from "@mui/material";

const GuidedVideoEntry = ({video}) => {
  return (
    <>
    <Typography>
      {video.snippet.title}
    </Typography>
      <p>{video.snippet.description}</p>
      <p>{video.duration}</p>
    </>
  )
};

export default GuidedVideoEntry;
