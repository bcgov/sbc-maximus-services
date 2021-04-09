const https = require('https');
const express = require("express");
const axios = require("axios");
// const cors = require("cors");
const certs = require("./cert");
require("dotenv").config({ path: `${__dirname}/.env` });

/*=============================================================================
Schedule Service
=============================================================================*/
const app = express();

// Add new cert chain
const cas = https.globalAgent.options.ca || [];
for (cert of certs) {
  cas.push(cert);
}
https.globalAgent.options.ca = cas;

// Read the required items from environment. OS env overrides .env
const SERVICE_PORT = process.env.SERVICE_PORT || 8080;

let envConfig = {
  node: process.version
};

// console.log(__dirname);
// console.log(envConfig);

// needed for OCP Health Check probes
app.get("/hello", function (req, res) {
  res.status(200).end();
});

// needed for OCP Health Check probes
app.get("/health", function (req, res) {
  res.status(200).end();
});

// needed for OCP Health Check probes
app.get("/api/env", function (req, res) {
  res.json(process.env);
});

// Send open/closed status for specified reason code
app.get("/api/status/:reason", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  const reason = req.params.reason;

  const url = process.env[reason];
  if (!url) {
    res.status(400);
    res.json({ error: "service not found" });
    return;
  }
  // console.log(url);

  axios.get(url)
    .then(r => {
      res.json(r.data);
    })
    .catch(err => {
      if (err.response) {
        console.log("status: ", err.response.status, err.response.data);
        res.status(400).json({ status: err.response.status });
      }
      else {
        console.log(err.code);
        res.status(500).json({ status: 500 });
      }
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

console.log("Server Starting ...");
app.listen(SERVICE_PORT);
console.log("Running on Port %s", SERVICE_PORT);
