/**
  An express HTTP server in Node.js which will handle the logic of a file server.
  - Uses built in Node.js `fs` module

  The expected API endpoints are defined below:
  1. GET /files - Returns a list of files present in `./files/` directory
  2. GET /files/:filename - Returns content of given file by name
  3. Post /files/:filename - Creates an new file in ./files directory
*/

const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

// Title Page
app.get("/", (req, res) => {
  console.log("Someone has hit the GET/ request");
  res.status(200).send("Go to GET/files to see all the available files.");
});

// Returns a list of files present in `./files/` directory
app.get("/files", (req, res) => {
  console.log("Someone has hit the GET/files request");

  // using read directory function from fs module
  fs.readdir("./files", (err, files) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.status(200).json(files);
  });
});

// Returns content of given file by name
app.get("/files/:filename", (req, res) => {
  let fileName = req.params.filename;
  if (fileName.includes("..")) {
    return res.status(400).send("Invalid file name");
  }
  fs.readFile(`./files/${fileName}`, "utf-8", (err, data) => {
    if (err) {
      res.status(404).send("File not found!");
      return;
    }
    res.status(200).send(data);
  });
});

// Creates an new file in ./files directory
app.post("/files/:filename", (req, res) => {
  console.log("Someone has hit the POST/files request");
  const filename = req.params.filename;
  let content = req.body.txt;
  console.log(req.body);
  fs.writeFile(`./files/${filename}`, content, "utf-8", (err) => {
    if (err) {
      res.status(500).send("Something occurred on our end");
    }
    res.status(200).send("Changes Saved successfully");
  });
});

// For any other route
app.use((req, res, next) => {
  res.status(404).send("Route not found");
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
