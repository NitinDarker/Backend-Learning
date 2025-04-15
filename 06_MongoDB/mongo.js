const express = require("express"); // Import Express library
const jwt = require("jsonwebtoken"); // Import jwt library
const mongoose = require("mongoose"); // Import mongoose library
const jwtPassword = "123456"; // Setting jwt verification password

require('.dotenv').config();
const mongoDbURI = process.env.MONGODB_URI;

mongoose.connect(mongoDbURI);

// Schema for User data
const User = mongoose.model("User1", {
  fullName: String,
  username: String,
  password: String,
});

const app = express();
app.use(express.json());

const guy = new User({
  fullName: "Nitin Sharma",
  username: "Mitochondria",
  password: "powerhouse"
})

await guy.save();
guy.speak();

async function userExists(username, password) {
  let data = await User.findOne({
    username: username,
    password: password,
  });
  return data != null;
}

app.get("/", (req, res) => {
  console.log("Someone has hit the /GET request");
  res.send("Cheers! Nothing at this endpoint");
});

app.post("/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesn't exist in our Database",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users",async function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    let userStuff = await User.find();
    res.json(userStuff)
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000);
