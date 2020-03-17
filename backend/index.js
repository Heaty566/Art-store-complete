const config = require("./config.json");
const express = require("express");
const app = express();

const logger = require("./startup/logging");

require("./startup/db")();
require("./startup/routes")(app);

const port = process.env.node_env || config.host.url;

app.listen(port, () => logger.info(`listening on port ${port}`));
