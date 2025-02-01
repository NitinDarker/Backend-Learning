const { User } = require("../db/index.js");

// Middleware for handling User auth
async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const username = req.headers["username"];
  const password = req.headers["password"];
  const userAuth = await User.findOne({
    username: username,
    password: password,
  });
  if (userAuth) {
    console.log("User authentication successful! Username: " + username);
    next();
  } else {
    return res.status(403).send("User does not exist!");
  }
}

module.exports = userMiddleware;