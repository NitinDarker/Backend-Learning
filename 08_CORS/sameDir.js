const express = require("express");
// const cors = require("cors");

const app = express();
// app.use(cors());
// NO need for CORS
app.use(express.json());

app.post("/sum", (req, res) => {
  console.log(req.name);
  const a = Number(req.body.a);
  const b = Number(req.body.b);
  res.status(200).send((a + b).toString());
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/node.html");
});

app.listen(5000, () => {
  console.log("Listening to port 5000");
});
