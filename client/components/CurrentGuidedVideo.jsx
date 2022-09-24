import React from 'react';

const CurrentGuidedVideo = ({video}) => {
  console.log('the video in the currentGuidedVid comp:', video);
  return (
  <div>

    <div>
      <iframe src={ `https://www.youtube.com/embed/${video.id.videoId}` } allowFullScreen></iframe>
    </div>
    <div>
      <h4>{video.snippet.title}</h4>
      <h5>{video.duration}</h5>
    </div>
  </div>
);
}
export default CurrentGuidedVideo;
