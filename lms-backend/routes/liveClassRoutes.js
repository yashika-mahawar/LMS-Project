import express from "express";
import { getLiveClasses } from "../controllers/liveClassController.js";

const router = express.Router();

router.get("/", getLiveClasses);

export default router;