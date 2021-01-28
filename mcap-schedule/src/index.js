const express = require("express");
const axios = require("axios");
const testData = require("./testdata");
require("dotenv").config({ path: `${__dirname}/.env` });
/*=============================================================================
Schedule Service
=============================================================================*/
const app = express();

// Read the required items from environment. OS env overrides .env
const SERVICE_PORT = process.env.SERVICE_PORT || 8080;

let envConfig = {
  SKILLS_URL: process.env.SKILLS_URL,
  BASE_SCHEDULE_URL: process.env.BASE_SCHEDULE_URL,
  node: process.version
};

const sslRootCAs = require('ssl-root-cas');
sslRootCAs.inject();

// console.log(__dirname);
console.log(envConfig);

// needed for OCP Health Check probes
app.get("/hello", function (req, res) {
  res.status(200).end();
});

// needed for OCP Health Check probes
app.get("/health", function (req, res) {
  res.status(200).end();
});

// send test/prod config to client
app.get("/api/test", function (req, res) {
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

app.listen(SERVICE_PORT);
console.log("Running on Port %s", SERVICE_PORT);
