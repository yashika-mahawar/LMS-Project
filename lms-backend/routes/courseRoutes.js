const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { getCourses, getCourseById, createCourse, updateCourse} = require("../controllers/courseController");


router.get("/courses", getCourses);
router.get("/courses/:id", getCourseById);
router.post("/courses", createCourse);
router.put("/courses/:id", authMiddleware, roleMiddleware(["admin"]), updateCourse);

module.exports = router;