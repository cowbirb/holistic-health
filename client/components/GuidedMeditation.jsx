import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
//import { process } from 'dotenv'
import VideoListEntry from './VideoListEntry.jsx';

const GuidedMeditation = () => {
  // create states
  const videoIndexStart = useRef();
  const [videos, setVideos] = useState([]);
  const [currentVideoList, setCurrentVideoList] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  // const [axiosObject, setAxiosObject] = useState({});
  // const [videoContents, setVideoContents] = useState([]);
  // const [videoIds, setVideoIds] = useState([]);
  // const [currentVideoList, setCurrentVideoList] = useState([]);
  // const [nextPageToken, setNextPageToken] = useState('');

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
      maxResults: '50',
      videoEmbeddable: true,
      type: 'video',
    }
  };

  useEffect(() => {
    // setAxiosObject({
    //   params: {
    //     key: YOUTUBE_API_KEY,
    //     q: 'guided+meditation',
    //     part: 'snippet',
    //     maxResults: '50',
    //   }
    // });
    // let's see if an async iife will work here
    videoIndexStart.current = 0;
    ( async () => {
      try {
        await getVideos();
        setCurrentVideo(videos[0]);
        console.log('HELLOO? currentVideo?', currentVideo);
      } catch (err) {
        console.error('Son, you got an error in your IIFE:\n', err);
      }
    })();
    // console.log('videoIndexStart.current', videoIndexStart.current);
    // (async () => {
    //   try {
    //     await getVideos();
    //     videoIndexStart.current = 0;
    //     setCurrentVideoList(videos.slice(videoIndexStart.current));
    //     console.log('The current VideoList:', currentVideoList);
    //   } catch (err) {
    //     console.error('Son, you got an error in your IIFE:\n', err);
    //   }
    // })();
  }, []);

  useEffect(() => {
    setCurrentVideoList(videos.slice(videoIndexStart.current, videoIndexStart.current + 5));
    setCurrentVideo(currentVideoList[0]);
  }, [videos, videoIndexStart])
  
  useEffect(() => {
    setCurrentVideo(currentVideoList[0])
  }, [currentVideoList ])

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
        return video;
      });
      setVideos(completeVidInfo);
      setCurrentVideoList(videos.slice(videoIndexStart.current, videoIndexStart.current + 5));
      setCurrentVideo(videos[0]);
      console.log('the videos, right?', videos);
      console.log('The current VideoList:', currentVideoList);
      console.log('Please cmon the currentVideo:', currentVideo);
      // console.log('secondGet:', secondGet);
    } catch (err) {
      console.error('The error from getVideos catch:\n', err);
    }
    setCurrentVideo(videos[0]);
    console.log('The current video:', currentVideo);
  }


  console.log('these are the videos', videos);

  //setCurrentVideoList(videos.slice(videoIndexStart.current, videoIndexStart.current + 5));
  console.log('heres that slice thing:', videos.slice(videoIndexStart.current, videoIndexStart.current + 5));
  console.log('this is the currentVideo:', currentVideo);
  console.log('THIS is the currentVideoList:', currentVideoList);

  return (
    <>
    {/* // map through videos array and render each one in a list entry
    // {videos.map(video => <h1>{video.title}</h1>)}
    // console.log('we got returned'); */}
    <h1>Guided Meditation</h1>
    {videos.slice(videoIndexStart.current, videoIndexStart.current + 5).map(video => <div key={video.id.videoId}><VideoListEntry /></div>)}
    </>
  );

};

export default GuidedMeditation;
