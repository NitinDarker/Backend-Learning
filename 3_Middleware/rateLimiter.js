// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

const express = require("express");

const app = express();

let numberOfRequestsForUser = {};
// Object tracking no. of requests per second of different user
// { userId: <int> noOfRequest }

setInterval(() => {
  numberOfRequestsForUser = {};
}, 1000);

// Rate Limiter Middleware (Global)
app.use((req, res, next) => {
  let userId = req.headers["user-id"];

  if (!userId) {
    // Handle missing user ID
    return res.status(400).send("User ID is required");
  }

  if (numberOfRequestsForUser[userId]) numberOfRequestsForUser[userId]++;
  else numberOfRequestsForUser[userId] = 1;

  if (numberOfRequestsForUser[userId] > 5) {
    res.status(429).send("Too Many requests!");
    return;
  }
  next();
});

app.get("/user", function (req, res) {
  res.status(200).json({ name: "john" });
});

app.post("/user", function (req, res) {
  res.status(200).json({ msg: "created dummy user" });
});

// Catch-All Middleware
app.use((req, res) => {
  res.status(404).send("Route Not Found");
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
