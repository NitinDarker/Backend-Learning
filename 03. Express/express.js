// Express js is a web application framework for Node.js

// Creating an http server
const express = require("express"); // Importing the express function
const app = express(); // Calling the express function -> Returns a function
const port = 3000; // Setting the port 

app.use(express.json()); // JSON middleware

function calculateSum(n) {
    // Function that does something...
    n = +n;
    return n + n;
}

app.get("/", function(req, res) {
    const value = req.query.n; // Requesting query
    const ans = calculateSum(value);
    res.send("The value of server was " + value  + "\n" + ans.toString() + " Server created");
})

app.post("/", function(req, res) {
    const value = req.body; // Requesting body
    console.log(value);
    res.send("The value of message received was: \n" + JSON.stringify(value));
    console.log(JSON.stringify(value));
})

app.listen(port, function() {
    console.log(`Listening to port ${port}`);
})
