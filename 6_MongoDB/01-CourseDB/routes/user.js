const { Router } = require("express");
const mongoose = require("mongoose");
const { User, Course } = require("../db/index.js");

const userMiddleware = require("../middleware/user");

const router = Router(); // Calling express

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  // Check if username and password are not undefined
  if (username == undefined || password == undefined) {
    return res
      .status(400)
      .send("Please enter your username and password in body!");
  }

  const newUser = await User.create({
    username: username,
    password: password,
    purchasedCourses: [],
  });

  if (!newUser) {
    return res.status(500).send("Something occurred on our end!");
  }
  res.status(200).send("User created successfully!");
  console.log(newUser);
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic

  // Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }

  const allCourses = await Course.find({});
  res.status(200).send(allCourses);
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;

  if (!mongoose.isValidObjectId(courseId)) {
    // Validate the courseId
    return res.status(400).send("Invalid Course ID!");
  }

  const myCourse = await Course.findOne({
    _id: courseId,
  });
  if (!myCourse) {
    return res.status(404).send("Course does not exist!");
  }

  const updateUser = await User.updateOne(
    { username: req.headers.username },
    {
      $addToSet: { purchasedCourses: myCourse },
    }
  );
  if (!updateUser) {
    return res.status(500).send("Something occurred on our end!");
  }
  console.log(updateUser);
  return res.status(200).send("Course purchased successfully!");
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const currentUser = await User.findOne({ username: req.headers.username });
  const purchasedCourses = [];
  for (let course of currentUser.purchasedCourses) {
    const myCourse = await Course.findOne({ _id: course });
    purchasedCourses.push(myCourse);
  }
  res.status(200).json({
    purchasedCourses: purchasedCourses,
  });
});

module.exports = router;
