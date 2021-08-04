const express = require("express");
require("dotenv").config({ path: `${__dirname}/.env` });
/*=============================================================================
MCAP Single Page Demo App
This server serves the demo static files and provides an /api/env endpoint for
the client to fetch the urls & tokens for webchat and cobrowse
=============================================================================*/
const app = express();

// Read the required items from environment. OS env overrides .env
const SERVICE_PORT = process.env.SERVICE_PORT || 8080;
// const SPA_ENV_URL = process.env.SPA_ENV_URL;
// const SPA_ENV_AUTH = process.env.SPA_ENV_AUTH;

let envConfig = {
  COBROWSE_URL: process.env.COBROWSE_URL,
  COBROWSE_KEY: process.env.COBROWSE_KEY,
  WEBCHAT_URL: process.env.WEBCHAT_URL,
};

console.log("node ver: ", process.version);
console.log("app dir: ", __dirname);
console.log("node dir: ", process.cwd());
console.log(envConfig);

// These directories just serve static file
app.use("/", express.static(`${__dirname}/demo-spa`));
app.use("/js", express.static(`${__dirname}/demo-spa/js`));
app.use("/css", express.static(`${__dirname}/demo-spa/css`));
app.use("/fonts", express.static(`${__dirname}/demo-spa/fonts`));
app.use("/icons", express.static(`${__dirname}/demo-spa/icons`));
app.use("/images", express.static(`${__dirname}/demo-spa/images`));
app.use("/webchat", express.static(`${__dirname}/examples/webchat`));
app.use("/cobrowse", express.static(`${__dirname}/examples/cobrowse`));

// send test/prod config to client
app.get("/api/env", function (req, res) {
  res.type("json");
  res.end(JSON.stringify(envConfig));
});

app.listen(SERVICE_PORT);
console.log("Running on Port %s", SERVICE_PORT);
