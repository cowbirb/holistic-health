const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.DB_Connect;

mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to HoslisticYou DB");
  })
  .catch((err) => {
    console.log("Failed to connect to HolisticYou DB", err);
  });
