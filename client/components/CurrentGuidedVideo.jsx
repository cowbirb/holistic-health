import React from 'react';

const CurrentGuidedVideo = ({video}) => {
  //console.log('the video in the currentGuidedVid comp:', video);

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
      <h4>{decodedTitle}</h4>
      <h5>{video.duration}</h5>
    </div>
  </div>
);
}
export default CurrentGuidedVideo;
