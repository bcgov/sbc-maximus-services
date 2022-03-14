const express = require("express");
require("dotenv").config({ path: `${__dirname}/.env` });
/*=============================================================================
Genesys Single Page Demo App
This server serves the demo static files and provides an /api/env endpoint for
the client to fetch the urls & tokens for webchat and cobrowse
=============================================================================*/
const app = express();

// Read the required items from environment. OS env overrides .env
const SERVICE_PORT = process.env.SERVICE_PORT || 8080;

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

// needed for OCP Health Check probes
app.get("/hello", function (req, res) {
  res.status(200).end();
});

app.listen(SERVICE_PORT);
console.log("Running on Port %s", SERVICE_PORT);
