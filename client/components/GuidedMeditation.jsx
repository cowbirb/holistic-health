import React, {useState} from 'react';
import axios from 'axios';

const GuidedMeditation = () => {
  // create states
  const [axiosObject, setAxiosObject] = ({});
  const [videos, setVideos] = useState([]);
  const [videoIds, setVideoIds] = useState([]);
  const [videoContents, setVideoContents] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({});
  const [nextPageToken, setNextPageToken] = useState('');

  // retrieve videos
  setAxiosObject({

  });
  const getVideos = () => {
    setAxiosObject({

    })
    axios.get('https://www.googleapis.com/youtube/v3/search?', axiosObject)
      .then((data) => {
        // set the videos to the snippets returned
        // map through the videos, returning the videoid
        // join the videoId Array, separated by a comma
      })
      .then((map) => {
        // return an axios get request to the youtubeLIST api for the content, with the videoIds separated by a comma
  
      })
      .then((data) => {
        // set a variable to mapping through the videos, 
          // at each iteration use Array.find() on the data to find the matching object
          // set the duration in the array equal to the data's duration
          // return the element
        // set video state with new array
      })
      .catch((err) => {
        console.log('This is the err from setting the videos state:\n', err);
      });
  }

  useEffect(() => {

    getVideos();
  }, []);


  return (
    // map through videos array and render each one in a list entry
    {videos.map(video => <h1>{video.title}</h1>)}
  );

};

export default GuidedMeditation;
