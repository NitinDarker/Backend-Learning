const { Router } = require("express");
const { Admin, Course } = require("../db/index.js"); // Defining Admin from db

const router = Router(); // Calling express

// Defining Route for middleware
const adminMiddleware = require("../middleware/admin");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  // Check if username and password are not undefined
  if (username == undefined || password == undefined) {
    return res
      .status(400)
      .send("Please enter your username and password in body!");
  }

  const newAdmin = await Admin.create({
    username: username,
    password: password,
  });

  if (!newAdmin) {
    return res.status(500).send("Something occurred on our end!");
  }
  res.status(200).send("Admin created successfully!");
  console.log(newAdmin);
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic

  // Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }

  const courseInfo = req.body;
  const newCourse = await Course.create({
    title: courseInfo.title,
    description: courseInfo.description,
    price: courseInfo.price,
    imageLink: courseInfo.imageLink,
    published: true,
  });

  if (newCourse) {
    console.log("New course created by Admin " + req.headers["username"]);
    console.log(newCourse);
    return res.status(200).json({
      message: "Course created successfully",
      courseId: newCourse._id,
    });
  } else {
    return res.status(500).json({
      txt: "Something occurred on our end!",
    });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic

  // Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }

  const allCourses = await Course.find({});
  res.status(200).send(allCourses);
});

module.exports = router;
