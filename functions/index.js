const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.get("/halo", (req, res) => {
  res.status(200).json({
    message: "halo world",
  });
});

exports.api = functions.region("asia-southeast2").https.onRequest(app);
