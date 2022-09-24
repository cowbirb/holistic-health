import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
//import { process } from 'dotenv'
import GuidedVideoEntry from './GuidedVideoEntry.jsx';
import CurrentGuidedVideo from './CurrentGuidedVideo.jsx';

const GuidedMeditation = () => {
  // create states
  const videoIndexStart = useRef();
  const [videos, setVideos] = useState([]);
  const [currentVideoList, setCurrentVideoList] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  // const [errorMessage, setErrorMessage] = useState()
  const [isLoading, setIsLoading] = useState(true);

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
    videoIndexStart.current = 0;
    ( async () => {
      try {
        await getVideos();
        setCurrentVideo(currentVideoList[0]);
        // console.log('HELLOO? currentVideo?', currentVideo);
      } catch (err) {
        console.error('Son, you got an error in your IIFE:\n', err);
        setError(err)
      }
    })();
  }, []);

  useEffect(() => {
    setCurrentVideoList(videos.slice(videoIndexStart.current, videoIndexStart.current + 5));
    setCurrentVideo(currentVideoList[0]);
    setIsLoading(false);
  }, [videos, videoIndexStart])
  
  useEffect(() => {
    setCurrentVideo(currentVideoList[0])
  }, [currentVideoList])

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
        let unformattedTime = secondRequest.items[i].contentDetails.duration;
        // video.duration = secondRequest.items[i].contentDetails.duration;
        video.duration = unformattedTime.replace("PT","").replace("H",":").replace("M"," minutes ").replace("S"," seconds");
        return video;
      });
      setVideos(completeVidInfo);
      setCurrentVideoList(videos.slice(videoIndexStart.current, videoIndexStart.current + 5));
      setCurrentVideo(videos[0]);
    } catch (err) {
      console.error('The error from getVideos catch:\n', err);
    }
  }
  return isLoading || !currentVideo ? <h2>Enjoy this moment</h2> : (
      <>
    <h1>Guided Meditation</h1>
    <CurrentGuidedVideo video={currentVideo} />
    {currentVideoList.map((video, i) => <GuidedVideoEntry video={video} key={video.id.videoId} />)}
    </>
    );
};

export default GuidedMeditation;
