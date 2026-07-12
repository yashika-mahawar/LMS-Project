import express from "express";
const router = express.Router();

// Middlewares import karo (.js extension zaroori hai)
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

// Controllers import karo
import { 
  getCourses, 
  getCourseById, 
  createCourse, 
  updateCourse 
} from "../controllers/courseController.js";

// Routes define karo
router.get("/courses", getCourses);
router.get("/courses/:id", getCourseById);
router.post("/courses", createCourse);
router.put("/courses/:id", authMiddleware, roleMiddleware(["admin"]), updateCourse);

export default router;