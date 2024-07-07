const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const router = Router();

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  await Admin.create({
    username,
    // same as username:username
    password,
  });

  res.json({
    message: "Admin Created",
  });
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = Admin.find({
    username,
    password,
  });
  if (user) {
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET
    );
    res.json({
      token,
    });
  } else {
    res.status(403).json("User do not exist");
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const title = req.body.title;
  const discription = req.body.discription;
  const imageLink = req.body.imageLink;
  const price = req.body.price;

  const newCourse = await Course.create({
    title,
    discription,
    imageLink,
    price,
  });

  res.json({
    message: "Course Created successfully",
    CourseId: newCourse._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const response = await Course.find({});
  res.json({
    Courses: response,
  });
});

module.exports = router;
