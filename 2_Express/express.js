// Express js is a web application framework for Node.js
// Not a library

// Creating an http server
const express = require("express"); // Importing the express function
const app = express(); // Calling the express function -> Returns a function
const port = 3000; // Setting the port 

app.use(express.json()); // JSON middleware
// body-parser can be used as well

function calculateSum(n) {
    // Function that does something...

    n = +n; // Type casting n to an integer
    // n = parseInt(n); // Does the same thing
    return n + n;
}

app.get("/", function(req, res) {
    const value = req.query.n; // Requesting query as n in the url
    const ans = calculateSum(value);
    res.send("The value of server was " + value  + "\n" + ans.toString() + " Returned");
})

app.post("/", function(req, res) {
    const value = req.body; // Requesting body
    console.log(value);
    res.send("The value of message received was: \n" + JSON.stringify(value));
    console.log(JSON.stringify(value)); // Convert JSON to string
})

app.listen(port, function() {
    console.log(`Listening to port ${port}`);
})

// Not Perfect but it works fine as a first Express server