import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import GuidedVideoEntry from './GuidedVideoEntry.jsx';
import CurrentGuidedVideo from './CurrentGuidedVideo.jsx';

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

const GuidedMeditation = ({handleViewChange}) => {
  // create states
  const [videoIndexStart, setVideoIndexStart] = useState(0);
  const [videos, setVideos] = useState([]);
  const [currentVideoList, setCurrentVideoList] = useState([]);
  // const [currentVideo, setCurrentVideo] = useState(null);
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
    // videoIndexStart.current = 0;
    ( async () => {
      try {
        await getVideos();
        // setCurrentVideo(currentVideoList[0]);
        // console.log('HELLOO? currentVideo?', currentVideo);
      } catch (err) {
        console.error('Son, you got an error in your IIFE:\n', err);
        setError(err)
      }
    })();
  }, []);

  useEffect(() => {
    setCurrentVideoList(videos.slice(videoIndexStart, videoIndexStart + 10));
    // setCurrentVideo(currentVideoList[0]);
    setIsLoading(false);
  }, [videos, videoIndexStart])
  
  // useEffect(() => {
  //   setCurrentVideo(currentVideoList[0])
  // }, [currentVideoList])

  const getVideos = async () => {
    console.log('uh oh we sending a request');
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
      setCurrentVideoList(videos.slice(videoIndexStart, videoIndexStart + 10));
      // setCurrentVideo(videos[0]);
    } catch (err) {
      console.error('The error from getVideos catch:\n', err);
    }
  }

  const handleMoreMeditations = () => {
    // const { current } = videoIndexStart;
    videoIndexStart < 50 ? setVideoIndexStart(videoIndexStart + 10) : setVideoIndexStart(0);
  }

  return isLoading ? <h2>Enjoy this moment</h2> : (
      <>
      <Card>
        <CardContent
        sx={{
          textAlign: "center"
        }}
        >
        <Button onClick={handleViewChange} size={'small'}>
          Switch to Meditation Timer
        </Button>
        <h1>Guided Meditation</h1>
    {/* <CurrentGuidedVideo video={currentVideo} />
    {currentVideoList.map((video, i) => <GuidedVideoEntry video={video} key={video.id.videoId} />)} */}
      <Carousel 
        key={videoIndexStart}
        showIndicators={false} 
        showThumbs={false} 
        useKeyboardArrows={true} 
        showStatus={false}
        width={'75%'}
        >
              {currentVideoList.map(video => <CurrentGuidedVideo video={video} key={video.id.videoId} />)}
              
            </Carousel>
          <CardActions>
            <Button onClick={handleMoreMeditations}>
              Load More Meditations
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
    );
};

export default GuidedMeditation;
