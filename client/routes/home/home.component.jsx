import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user.context";

import EmotionModal from "../../components/emotion-modal/emotion-modal.component";

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Divider,
} from "@mui/material";

import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HolisticLogo from "../../../assets/HolisticYouBlue.png"

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = () => {
  const { isAuthenticated } = useContext(UserContext);
  const [quotes, setQuotes] = useState([]);

  const navigate = useNavigate();

  const getQuotes = async () => {
    try {
      const { data } = await axios.get("https://type.fit/api/quotes");
      setQuotes(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <>
          <Box
            sx={{
              marginTop: "5%",
              width: "50%",
              height: "300px",
              marginLeft: "25%",
              borderRadius: "10px",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 0px  2px grey",
            }}
          >
            <Carousel
              autoPlay={true}
              infiniteLoop={true}
              interval={5000}
              showThumbs={false}
              showStatus={false}
              showIndicators={false}
              showArrows={true}
              stopOnHover={true}
              transitionTime={1000}
            >
              {quotes.slice(0, 15).map((quote, indx) => (
                <div key={indx}>
                  <FormatQuoteIcon
                    sx={{
                      transform: "rotate(180deg)",
                      fontSize: "50px",
                      color: "#1976d2",
                      marginBottom: "10px",
                    }}
                  />
                  <h3 style={{ fontSize: 22 }}>{quote.text}</h3>
                  <Divider
                    sx={{ width: "50%", margin: "auto", color: "#1976d2" }}
                  />
                  <h4 style={{ fontSize: 16 }}>
                    <i>{quote.author}</i>
                  </h4>
                </div>
              ))}
            </Carousel>
            <EmotionModal />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "5%",
            }}
          >
            <Grid
              sx={{ flexGrow: 1, textAlign: "center", marginLeft: "265px" }}
              container
              spacing={2}
            >
              <Grid item>
                <Card sx={{ width: "300px", height: "300px" }}>
                  <CardHeader
                    sx={{
                      textAlign: "center",
                      backgroundColor: "#1976d2",
                      color: "white",
                      borderRadius: "5px 5px 0 0",
                    }}
                    title="Meditate"
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      <p>Take a deep breath</p>
                    </Typography>
                    <SelfImprovementIcon
                      sx={{ fontSize: 50, cursor: "pointer" }}
                      onClick={() => navigate("/meditation")}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card sx={{ width: "300px", height: "300px" }}>
                  <CardHeader
                    sx={{
                      textAlign: "center",
                      backgroundColor: "#1976d2",
                      color: "white",
                      borderRadius: "5px 5px 0 0",
                    }}
                    title="Exercise"
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      <p>Set goals and track your progress</p>
                    </Typography>
                    <FitnessCenterIcon
                      sx={{ fontSize: 50, cursor: "pointer" }}
                      onClick={() => navigate("/exercise")}
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item>
                <Card sx={{ width: "300px", height: "300px" }}>
                  <CardHeader
                    sx={{
                      textAlign: "center",
                      backgroundColor: "#1976d2",
                      color: "white",
                      borderRadius: "5px 5px 0 0",
                    }}
                    title="Meals"
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      <p>Look for your favorites recipes and meals</p>
                    </Typography>
                    <RestaurantIcon
                      sx={{ fontSize: 50, cursor: "pointer" }}
                      onClick={() => navigate("/meals")}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card sx={{ width: "300px", height: "300px" }}>
                  <CardHeader
                    sx={{
                      textAlign: "center",
                      backgroundColor: "#1976d2",
                      color: "white",
                      borderRadius: "5px 5px 0 0",
                    }}
                    title="Journal"
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      <p>Write down your thoughts and feelings</p>
                    </Typography>
                    <NewspaperIcon
                      sx={{ fontSize: 50, cursor: "pointer" }}
                      onClick={() => navigate("/journal")}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Card
            sx={{
              width: "50%",
              height: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <img src={HolisticLogo} width='85px'/>
              <Typography
                sx={{
                  fontSize: 22,
                  color: "#1976d2",
                  fontWeight: "bold",
                }}
                color="text.secondary"
                gutterBottom
              >
                Welcome to HolisticYou
              </Typography>
    
              <br />
              <Typography
                sx={{
                  fontSize: 18,
                  color: "#000000",
                  fontWeight: "bold",
                }}
                component="div"
                color="text.secondary"
                gutterBottom
              >
                <p> A place to help you take care of yourself</p>
                <p>
                  HolisticYou keeps track of your physical, mental and emotional
                  patterns and practices, and aims to show you a representation
                  of You, in this moment.
                </p>
              </Typography>
                <span>Please Log In for a full Holistic Experience</span>
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
};

export default Home;
