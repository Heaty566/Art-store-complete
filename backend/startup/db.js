const config = require("../config.json");
const logger = require("./logging");
const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(config.mongodb.url, config.mongodb.options)
    .then(() => logger.info("connect to mongodb successfully"))
    .catch(() => logger.error("connect to mongodb failed"));
};
