const supabase = require("../config/supabase");

async function enrollCourse(req, res) {
  try {
    const user_id = req.user.id;
    const { course_id } = req.body;

    // Check karo ki course_id aaya bhi hai ya nahi
    if (!course_id) {
      return res.status(400).json({ message: "Course ID is required!" });
    }

    // 1. Check karo ki user pehle se enrolled toh nahi hai?
    // 'maybeSingle' use kiya hai taaki agar data na ho toh error na aaye
    const { data: existing, error: checkError } = await supabase
      .from("enrollment")
      .select("*")
      .eq("user_id", user_id)
      .eq("course_id", course_id)
      .maybeSingle();

    if (existing) {
      return res.status(200).json({ message: "Already enrolled!" });
    }

    // 2. Agar nahi, toh insert karo
    const { data, error } = await supabase
      .from("enrollment")
      .insert([{ user_id, course_id }]);

    if (error) {
        console.error("Insert Error:", error);
        return res.status(500).json({ message: error.message });
    }

    res.status(201).json({ message: "Course enrolled successfully", enrollment: data });
    
  } catch (err) {
    console.error("Unexpected error in enrollCourse:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getEnrolledCourses(req, res) {
  try {
    const user_id = req.user.id;

    const { data, error } = await supabase
      .from("enrollment")
      .select(`
  id,
  created_at,
  courses (
    id,
    title,
    fee,
    duration,
    image_url
  )
`)
      .eq("user_id", user_id);

    if (error) {
      console.error("Fetch Error:", error);
      return res.status(500).json({ message: error.message });
    }

    res.status(200).json({
      message: "Enrolled courses fetched successfully",
      data,
    });
  } catch (err) {
    console.error("Unexpected error in getEnrolledCourses:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  enrollCourse,
  getEnrolledCourses,
};