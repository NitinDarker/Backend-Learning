const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const PORT = 3000;
const JWT_KEY = '12345'; // To authorize JWT (store in .env file)
const users = []; // In-memory database

app.use(express.json());

app.post('/signup', (req, res) => {
    // Verify request body with zod
    const newUser = {
        username: req.body.username,
        password: req.body.password
    }
    // Check if the user already exists in the db

    // If user does not exist
    users.push(newUser);
    // Encrypt the passwords using bcrypt
    console.log("New User created, username: " + newUser.username);
    const token = jwt.sign({username: newUser.username}, JWT_KEY);
    res.json({
        jwt: token
    })
})

// Sign-in using JWT
app.post('/signin', (req, res) => {
    try {
        const token = req.headers['authorization'];
        const decoded = jwt.verify(token, JWT_KEY);
        console.log(decoded);
        return res.send("Welcome " + decoded.username);
    } catch (err) {
        return res.status(401).json({
            Error: err
        })
    }
})
// Create another route for first sign-in when the client doesn't have a jwt
// Or the previous jwt expires

app.get('/users', (req, res) => {
    // Authorize only the admins
    res.send(users);
})

// Create a jwt verify middleware, Instead of rewriting JWT checks in every route

// Catch-All Middleware
app.use((req, res) => {
  res.status(404).send("Route Not Found");
  console.log("Catch-All Middleware Hit");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).send("Sorry! We have encountered and error!\n" + err);
  console.log("Error-Handling Middleware Hit");
});

app.listen(PORT, () => {
    console.log("Listening to PORT " + PORT);
})