import express from "express";
const router = express.Router();

// Controller import karo (.js extension ke sath)
import { getAllVideos, getVideosByCourse } from "../controllers/videoController.js";

// Routes define karo
router.get("/", getAllVideos); // Route: /api/videos/
router.get("/:course_id", getVideosByCourse); // Route: /api/videos/:course_id

export default router;