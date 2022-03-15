const express = require("express");
const app = express();

const SERVICE_PORT = process.env.SERVICE_PORT || 8080;

app.use(express.static('public'));

// needed for OCP Health Check probes
app.get("/hello", function (req, res) {
  res.status(200).end();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(SERVICE_PORT);
console.log("Running on Port %s", SERVICE_PORT);
