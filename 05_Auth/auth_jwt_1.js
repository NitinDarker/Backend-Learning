const express = require("express");
const jwt = require("jsonwebtoken");
// Library for jwt

const jwtPassword = "123456"; // Setting custom password

const app = express();

// In-memory database
const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
  {
    username: "nitin@gmail.com",
    password: "tmkc",
    name: "Nitin Sharma",
  }
];

app.use(express.json());

// Create this as a middleware
function userExists(username, password) {
  // write logic to return true or false if this user exists
  // in ALL_USERS array
  for (let user of ALL_USERS) {
    if (user.username == username && user.password == password) return true;
  }
  return false;
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesn't exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  console.log("Someone has hit the GET/users request");
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    console.log(decoded, username, token);
    
    // return a list of users other than this username
    let users = ALL_USERS.filter((user) => {
      return user.username != username;
    });
    res.send(users);
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000);
