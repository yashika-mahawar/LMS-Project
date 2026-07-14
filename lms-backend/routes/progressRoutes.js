import express from "express";
import { supabase } from "../config/supabase.js";
import { saveProgress } from "../controllers/progressController.js";
import { getUserProgress } from "../controllers/progressController.js";
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
router.get("/user/:userId", getUserProgress);

router.get("/:courseId/:userId", async (req, res) => {
  const { courseId, userId } = req.params;

  try {
    const { data: videos, error: videosError } = await supabase
      .from("videos")
      .select("id")
      .eq("course_id", courseId);

    if (videosError) throw videosError;

    const totalVideos = videos.length;

    const videoIds = videos.map((video) => video.id);

    const { data: completed, error: progressError } = await supabase
      .from("progress")
      .select("video_id")
      .eq("user_id", userId)
      .eq("is_completed", true)
      .in("video_id", videoIds);

    if (progressError) throw progressError;

    const completedVideos = completed.length;

    const progress =
      totalVideos === 0
        ? 0
        : Math.round((completedVideos / totalVideos) * 100);

    res.json({
      success: true,
      totalVideos,
      completedVideos,
      progress,
      completedIds: completed.map((item) => item.video_id),
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