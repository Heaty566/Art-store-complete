const express = require("express");
var cors = require("cors");

const user = require("../routes/user");
const auth = require("../routes/auth");
const genre = require("../routes/genre");
const image = require("../routes/image");
const imageUser = require("../routes/imageUser");

module.exports = app => {
  app.use(express.json());
  app.use(cors());
  app.use("/api/user", user);
  app.use("/api/user", auth);
  app.use("/api/image", image);
  app.use("/api/image/user", imageUser);
  app.use("/api/image/genre", genre);
};
