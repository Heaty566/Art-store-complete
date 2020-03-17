const winston = require("winston");

module.exports = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  transports: [
    new winston.transports.File({ filename: "info.log", level: "info" }),
    new winston.transports.File({ filename: "combineSystem.log" }),
    new winston.transports.File({ filename: "error.log", level: "error" })
  ]
});
