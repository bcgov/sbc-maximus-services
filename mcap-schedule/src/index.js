const express = require("express");
const axios = require("axios");
require("dotenv").config({ path: `${__dirname}/.env` });
/*=============================================================================
Schedule Service
=============================================================================*/
const app = express();

// Read the required items from environment. OS env overrides .env
const SERVICE_PORT = process.env.SERVICE_PORT || 8080;

let envConfig = {
  SCHEDULE_URL: process.env.SCHEDULE_URL,
  CHAT_STATUS_URL: process.env.CHAT_STATUS_URL,
};

const sslRootCAs = require('ssl-root-cas');
sslRootCAs.inject();

// console.log(__dirname);
console.log(envConfig);

// needed for OCP Health Check probes
app.get("/hello", function (req, res) {
  res.status(200).end();
});

// send test/prod config to client
app.get("/api/test", function (req, res) {
  res.json(envConfig);
});

// send test/prod config to client
app.get("/api/status/:service", function (req, res) {
  const service = req.params.service;
  const url = envConfig[`${service.toUpperCase()}_STATUS_URL`];
  if (!url) {
    res.status(400);
    res.json({ error: "bad service" });
    return;
  }
  console.log(url);

  console.log("axios.get");
  axios.get(url)
    .then(r => {
      res.json(r.data);
    })
    .catch(err => {
      console.log(err.message);
      res.status(500);
      // res.json({ error: err.errno });
      res.json({ error: err });
    });

});

app.listen(SERVICE_PORT);
console.log("Running on Port %s", SERVICE_PORT);
