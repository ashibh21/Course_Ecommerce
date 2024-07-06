const { Router } = require("express");
const adminMiddleware = require("..middleware/user");
const router = Router();

router.post("/signup", (req, res) => {});

router.get("/courses", userMiddleware, (req, res) => {});

router.get("/courses/:courseId", userMiddleware, (req, res) => {});

router.get("/purchasedCourses", userMiddleware, (req, res) => {});

module.exports = router;
