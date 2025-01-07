// This is my first http server using express library.
// To run this server:
// 1. Open terminal & Install express by typing npm install express
//    (node & npm should already by installed obv)
// 2. Then run the server by either node index.js or alternatively
//    install nodemon (npm i nodemon) and do nodemon index.js
// This should properly run this server.

const express = require("express");
const app = express();
const port = 3000;

// Using body-parser instead of express.json() - FANCY!
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Go to /nitin");
});

app.get("/nitin", (req, res) => {
  res.send("Hello Universe! <b>This is a Server created by Nitin Sharma<b>");
});

app.post("/nitin", (req, res) => {
  const message = req.body.message;
  console.log(message);
  res.json({
    output: `${message}`,
    txt: "Yeah! It's the same message you just typed dumbass!",
  });
  console.log("I am in post request");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log("A Server is created and successfully running!");
});
