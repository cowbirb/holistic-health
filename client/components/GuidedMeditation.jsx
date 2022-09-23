import React, {useState, useEffect} from 'react';
import axios from 'axios';
//import { process } from 'dotenv'

const GuidedMeditation = () => {
  // create states
  const [axiosObject, setAxiosObject] = useState({});
  const [videos, setVideos] = useState([]);
  const [videoIds, setVideoIds] = useState([]);
  const [videoContents, setVideoContents] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({});
  const [nextPageToken, setNextPageToken] = useState('');

  // retrieve videos
  // setAxiosObject({
  const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  // });
  // console.log('YOUTUBE_API_KEY', YOUTUBE_API_KEY);

  const notStateAxios = {
    // method: 'get',
    // url: 'https://www.googleapis.com/youtube/v3/search?',
    params: {
      key: YOUTUBE_API_KEY,
      q: 'guided+meditation',
      part: 'snippet',
      maxResults: '5',
      videoEmbeddable: true,
      type: 'video',
    }
  };

  const getVideos = async () => {
    try {
      const { data: firstRequest } =  await axios.get('https://www.googleapis.com/youtube/v3/search?', notStateAxios)
      const videoIds = firstRequest.items.map(video => video.id.videoId).join(',');
      // console.log('videoIds', videoIds);
      const videoIdRequestObject = {
        params: {
          key: YOUTUBE_API_KEY,
          part: 'contentDetails',
          id: videoIds,
        }
      }
      const { data: secondRequest } = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, videoIdRequestObject)
      const completeVidInfo = firstRequest.items.map((video, i) => {
        video.duration = secondRequest.items[i].contentDetails.duration;
        console.log(video.duration);
        return video;
      });
      setVideos(completeVidInfo);
      // console.log('secondGet:', secondGet);
    } catch (err) {
      console.error('The error from getVideos catch:\n', err);
    }
    // axios.get('https://www.googleapis.com/youtube/v3/search?', notStateAxios)
    // axios.get(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&q=guided+meditation&maxResults=5&part=snippet`)
      // .then(({data}) => {
      //   const { items } = data;
      //   console.log('data in first .then:', items);
      //   setVideos(items);
      //   // set the videos to the snippets returned
      //   // map through the videos, returning the videoi
      //   const videoIds = items.map(video => video.id.videoId);
      //   // join the videoId Array, separated by a comma
      //   return videoIds.join(',');
      // })
      // .then((videoIds) => {
      //   // return an axios get request to the youtubeLIST api for the content, with the videoIds separated by a comma
      //   console.log('these are the videoIds:\n', videoIds);

      // })
      // .then((data) => {
      //   console.log('We got into the third data');
      //   // set a variable to mapping through the videos, 
      //     // at each iteration use Array.find() on the data to find the matching object
      //     // set the duration in the array equal to the data's duration
      //     // return the element
      //   // set video state with new array
      // })
      // .catch((err) => {
      //   console.log('This is the err from setting the videos state:\n', err);
      // });
  }

  useEffect(() => {
    setAxiosObject({
      params: {
        key: YOUTUBE_API_KEY,
        q: 'guided+meditation',
        part: 'snippet',
        maxResults: '5',
      }
    });
    getVideos();
  }, []);

  console.log('these are the videos', videos);

  return (
    // map through videos array and render each one in a list entry
    // {videos.map(video => <h1>{video.title}</h1>)}
    // console.log('we got returned');
    <h1>Guided Meditation</h1>
  );

};

export default GuidedMeditation;
