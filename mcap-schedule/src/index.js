const express = require("express");
require("dotenv").config();
/*=============================================================================
Schedule Service
=============================================================================*/
const app = express();

// Read the required items from environment. OS env overrides .env
const SERVICE_PORT = process.env.SERVICE_PORT || 8080;

let envConfig = {
  SCHEDULE_URL: process.env.SCHEDULE_URL,
};

// console.log(__dirname);
console.log(envConfig);

// needed for OCP Health Check probes
app.get("/hello", function (req, res) {
  res.status(200).end();
});

// send test/prod config to client
app.get("/api/test", function (req, res) {
  res.type("json");
  res.end(JSON.stringify(envConfig));
});

app.listen(SERVICE_PORT);
console.log("Running on Port %s", SERVICE_PORT);
