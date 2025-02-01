// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// maintain a count of the number of requests made to the server in the global
// requestCount variable

const express = require("express");

const app = express();
let requestCount = 0;

// Universal Middleware
app.use((req, res, next) => {
  requestCount++;
  console.log("Universal middleware hit");
  next();
});
// It also counts requests for the endpoints which are not present in the server
// It can be changed by doing requestCount++ in the endpoint itself
// instead of in universal middleware

app.get("/user", function (req, res) {
  res.status(200).json({ name: "john" });
});

app.post("/user", function (req, res) {
  res.status(200).json({ msg: "created dummy user" });
});

app.get("/requestCount", function (req, res) {
  res.status(200).json({ requestCount });
});

// Catch-All Middleware
app.use((req, res) => {
  res.status(404).send("Rout Not Found");
  console.log("Catch-All Middleware hit");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).send("Sorry! We have encountered and error!\n" + err);
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
