import express from "express";
const router = express.Router();

// Controller import karo (.js extension ke sath)
import { saveProgress } from "../controllers/progressController.js";

// Route define karo
router.post("/", saveProgress);

export default router;