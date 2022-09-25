import React from 'react';
import { Typography } from '@mui/material';

const CurrentGuidedVideo = ({video}) => {

const encodedTitle = video.snippet.title;
const parser = new DOMParser;
var dom = parser.parseFromString(
    '<!doctype html><body>' + encodedTitle,
    'text/html');
var decodedTitle = dom.body.textContent;

  return (
  <div>
    <div>
      <iframe src={ `https://www.youtube.com/embed/${video.id.videoId}` } allowFullScreen></iframe>
    </div>
    <div>
      <Typography variant='h5'>
        {decodedTitle}

      </Typography>
      <Typography variant='h6' color='text.secondary'>
        {video.duration}
      </Typography>
    </div>
  </div>
);
}
export default CurrentGuidedVideo;
