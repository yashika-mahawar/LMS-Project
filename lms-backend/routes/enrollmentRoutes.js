const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { enrollCourse, getEnrolledCourses } = require("../controllers/enrollmentController");

router.post("/enroll", authMiddleware, enrollCourse);
router.get("/enrolled-courses", authMiddleware, getEnrolledCourses);

module.exports = router;