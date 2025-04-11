import { Router } from "express";
const app = Router();

app.post("/login", (req, res) => {
  const userDetails = req.body;
  res.json(userDetails);
});

app.post("/signup", (req, res) => {
  const userDetails = req.body;
});

app.get("/purchases", (req, res) => {

});


module.exports = app;