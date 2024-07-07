const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const router = Router();
const { default: mongoose } = require("mongoose");

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);

  await User.create({
    username,
    password,
  });
  res.json({
    message: "User created successfully",
  });
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = User.find({
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

router.get("/courses", async (req, res) => {
  const response = await Course.find({});
  res.json({
    Course: response,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const username = req.headers.username;

  await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  );
  res.json({
    message: "Purchase complete!",
  });
});
router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const username = req.headers.username;
  const response = await User.findOne({
    username,
  });
  const courses = await Course.find({
    _id: {
      $in: response.purchasedCourses,
    },
  });
  res.json({
    PurchasedCourses: courses,
  });
});

module.exports = router;
