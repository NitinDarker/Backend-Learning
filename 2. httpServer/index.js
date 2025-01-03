const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/nitin", (req, res) => {
  console.log("A Server is created!");
  res.send("Hello Universe! <b>This is a Server created by Nitin Sharma<b>");
});

app.post("/nitin", (req, res) => {
  const message = req.body.message;
  console.log(message);

  res.json({
    output: "2 + 2 = 4",
  });

  console.log("I am in post request");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
