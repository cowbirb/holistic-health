const path = require("path");
const express = require("express");
require("./db");
require("dotenv").config();

const api = require("./routes/api");

const port = 3000;

const publicPath = path.resolve(__dirname, "../client/public");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));

// Routes
app.use("/api", api);

app.get("/*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../client/public/index.html"),
    (data, err) => {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`listening @ http://localhost:${port}`);
});
