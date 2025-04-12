const express = require("express");

const app = express();

app.use(express.json());

app.post("/sum", (req, res) => {
  const a = Number(req.body.a);
  const b = Number(req.body.b);
  res.status(200).send(a + b.toString());
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
