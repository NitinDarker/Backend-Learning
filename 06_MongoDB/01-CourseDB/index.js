const express = require("express");
const bodyParser = require("body-parser");

// Defining Routes for user and admin
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const app = express();

// Middleware for parsing request bodies
app.use(bodyParser.json());

app.use("/admin", adminRouter);
app.use("/users", userRouter);

// Catch-All Middleware
app.use((req, res) => {
  console.log("Catch-All Middleware hit");
  res.status(404).send("Route does not exist!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(505).send("Internal Server Error!");
  console.log("Error handling middleware hit! Error:" + err);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
