const { Admin } = require("../db/index.js");

// Middleware for handling Admin auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const username = req.headers["username"];
  const password = req.headers["password"];
  const adminAuth = await Admin.findOne({
    username: username,
    password: password,
  });

  if (adminAuth) {
    console.log("Admin Authentication Successful! Username: " + username);
    next();
  } else {
    return res.status(403).json({
      txt: "Admin does not exist!",
    });
  }
}

module.exports = adminMiddleware;
