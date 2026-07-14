import { supabase } from "../config/supabase.js";

export const saveProgress = async (req, res) => {
  try {
    const { user_id, video_id, is_completed } = req.body;

    // Validation
    if (!user_id || !video_id) {
      return res.status(400).json({
        success: false,
        error: "user_id and video_id are required",
      });
    }

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

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Progress saved successfully",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};