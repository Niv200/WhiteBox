require("dotenv").config;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.json());

//Json validator middleware
app.use((err, req, res, next) => {
  // 400 if the json is in error
  if (err.status === 400) return res.status(err.status).send("Request is not in JSON format.");
  return next(err); // if it's not a 400, let the default error handling do it.
});

app.get("/", function (req, res) {
  res.send("hello world!");
});

app.post("/data/:type", async (req, res) => {
  let body = req.body;
  if (body) {
    let { database, sensor, reading } = body;
    if (database && sensor && reading) {
      res.send({ success: "reading data" });
      return;
    }
    res.send({ error: "Request body does not match the format." });
    return;
  }
  res.send({ error: "Error reading data. Does the request body follows the format?" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(process.env.PORT);
});
