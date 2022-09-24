import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import EmotionModal from "../../components/emotion-modal/emotion-modal.component";

import {Carousel} from "react-responsive-carousel";

import { UserContext } from "../../context/user.context";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// create corousel with inspirational quotes
const Home = () => {
    const { isAuthenticated } = useContext(UserContext);
  const [quotes, setQuotes] = useState([]);

  const getQuotes = async () => {
    try {
      const res = await axios.get("https://type.fit/api/quotes");
      setQuotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getQuotes();
  }, []);

  console.log(quotes);
  return (
    <>
      {/* a box centered horizontaly */}
      {/* <Box
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
          <CardContent>
            <Typography
              sx={{
                fontSize: 18,
                color: "#000000",
                fontWeight: "bold",
              }}
              color="text.secondary"
              gutterBottom
            >
              Quote of the day
            </Typography>
            <Typography
              sx={{
                fontSize: 22,
                color: "#000000",
                fontWeight: "bold",
              }}
              component="div"
              color="text.secondary"
              gutterBottom
            >
              {quotes.slice(0, 5).map((quote, indx) => (
                <p key={indx}>{quote.text}</p>
              ))}
            </Typography>
          </CardContent>
        </Card>
      </Box> */}

      {isAuthenticated ? (
        
          <><Carousel
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
                  {quotes.slice(0, 10).map((quote, indx) => (
                      <div key={indx}>
                          <h3>{quote.text}</h3>
                          <p>~{quote.author}</p>
                      </div>
                  ))}
              </Carousel><EmotionModal /></>
        ) : (
            // a card centered in the middle of the page giving a small description of the app
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
                    <CardContent>
                        <Typography
                            sx={{
                                fontSize: 18,
                                color: "#000000",
                                fontWeight: "bold",
                            }}
                            color="text.secondary"
                            gutterBottom
                        >
                            Welcome to HolisticYou  
                        </Typography>
                        <br />
                        <br />
                        <Typography
                            sx={{
                                fontSize: 22,
                                color: "#000000",
                                fontWeight: "bold",
                            }}
                            component="div"
                            color="text.secondary"
                            gutterBottom
                        >
                            HolisticYou is a web application that allows you to track your emotions and thoughts.
                            <br />
                            <br />
                            You can also view your emotions and thoughts over time to see how you are feeling.
                            
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        )}
    </>
  );
};

export default Home;
