const https = require('https');
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const testData = require("./testdata");
const certs = require("./cert");
require("dotenv").config({ path: `${__dirname}/.env` });

/*=============================================================================
Schedule Service
=============================================================================*/
const app = express();
app.use(cors());


// Add new cert chain
const cas = https.globalAgent.options.ca || [];
for (cert of certs) {
  cas.push(cert);
}
https.globalAgent.options.ca = cas;

// Read the required items from environment. OS env overrides .env
const SERVICE_PORT = process.env.SERVICE_PORT || 8080;

let envConfig = {
  SKILLS_URL: process.env.SKILLS_URL,
  BASE_SCHEDULE_URL: process.env.BASE_SCHEDULE_URL,
  node: process.version
};

// console.log(__dirname);
// console.log(envConfig);

app.options('*', cors()) // include before other routes

// needed for OCP Health Check probes
app.get("/hello", function (req, res) {
  res.status(200).end();
});

// needed for OCP Health Check probes
app.get("/health", function (req, res) {
  res.status(200).end();
});

// send test/prod config to client
app.get("/api/env", function (req, res) {
  res.json(envConfig);
});

// Send open/closed status for specified service code
app.get("/api/status/:name", function (req, res) {
  const name = req.params.name;
  const url = getSkillUrl(name);
  if (!url) {
    res.status(400);
    res.json({ error: "service not found" });
    return;
  }
  console.log(url);

  axios.get(url)
    .then(r => {
      res.json(r.data);
    })
    .catch(err => {
      console.log(err.message);
      res.status(500);
      res.json({ error: err });
    });

});

const getSkillUrl = function (name) {
  // Fetch skills array from SKILLS_URL (using static data for now)
  const skills = testData;

  // Find ID for this skill
  for (const skill of skills) {
    if (skill.name === name) {
      return `${envConfig.BASE_SCHEDULE_URL}/${skill.id}`;
    }
  }
};

// Send open/closed status for specified service code
app.get("/test/cert", function (req, res) {
  const url = "https://incomplete-chain.badssl.com/";
  axios.get(url)
    .then(r => {
      res.end(r.data);
    })
    .catch(err => {
      console.log(err.message);
      res.status(500);
      res.json({ error: err });
    });

});

app.listen(SERVICE_PORT);
console.log("Running on Port %s", SERVICE_PORT);
