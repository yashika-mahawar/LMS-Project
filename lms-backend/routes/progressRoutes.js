import express from "express";
import { supabase } from "../config/supabase.js";
import { saveProgress } from "../controllers/progressController.js";
const router = express.Router();

router.post("/update", async (req, res) => {
  console.log("Backend ko data mila:", req.body);

  const { user_id, video_id, is_completed } = req.body;

  try {
    const { data, error } = await supabase
      .from("progress")
      .upsert(
        {
          user_id,
          video_id,
          is_completed: is_completed ?? true,
        },
        {
          onConflict: "user_id,video_id",
        }
      )
      .select();

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: "Progress updated!",
      data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

export default router;