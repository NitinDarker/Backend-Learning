const express = require('express');
const app = express();
const PORT = 3000;

const UserRouter = require('./routes/user')
const CourseRouter = require('./routes/courses')

app.use(express.json());

app.use('/user', UserRouter);
app.use('/courses', CourseRouter);

app.get('/' ,(req, res) => {
    res.send("Welcome to Coursex, where all the courses are present!")
})

app.listen(PORT, () => {
    console.log("Listening to port " + PORT);
})