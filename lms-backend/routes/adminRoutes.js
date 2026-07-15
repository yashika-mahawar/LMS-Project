import express from "express";
import {
  getDashboardStats,
  getStudents,
  deleteStudent,
} from "../controllers/adminController.js";
const router = express.Router();

router.get("/dashboard", getDashboardStats);
router.get("/students", getStudents);

router.delete("/students/:id", deleteStudent);
export default router;