/* eslint-disable import/newline-after-import */
const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// cors setup
const cors = require("cors");
const allowedOrigin = process.env.ORIGIN || "http://127.0.0.1:5173";
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: "GET, POST, DELETE, PUT",
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Connect to db
const mongoDB = process.env.MONGODB_URI || process.env.DEV_DB;
mongoose
  .connect(mongoDB)
  .then(() => console.log("connected to db"))
  .catch((e) => console.log(e));

// Passport setup
require("./passport");

// Cloudinary Setup
require("./cloudinary");

// public directory for serving the static files.
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(cookieParser());

if (process.env.ENVIRONMENT === "development") {
  const development = require("../routers/development");
  app.use("/dev", development);
}

const authentication = require("../routers/authentication");
const cloud = require("../routers/cloudinary");
const api = require("../routers/api");
app.use("/api", authentication);
app.use("/api", cloud);
app.use("/api", api);

// error handler for when all routes fail
app.use((err, req, res, next) => {
  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.render("error");
});
