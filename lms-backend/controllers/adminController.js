import { supabase } from "../config/supabase.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [
      { count: students },
      { count: courses },
      { count: videos },
      { count: enrollments },
    ] = await Promise.all([
      supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .eq("role", "student"),

      supabase
        .from("courses")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("videos")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("enrollment")
        .select("*", { count: "exact", head: true }),
    ]);

    res.json({
      success: true,
      students,
      courses,
      videos,
      enrollments,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
// Get All Students
export const getStudents = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, full_name, email, program, role, profile_image")
      .eq("role", "student")
      .order("full_name");

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      students: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Delete Student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Deleting student:", id);


    // 1. Pehle enrollment delete karo
    const { error: enrollmentError } = await supabase
      .from("enrollment")
      .delete()
      .eq("user_id", id);


    if (enrollmentError) {
      return res.status(500).json({
        success: false,
        error: enrollmentError.message,
      });
    }


    // 2. Ab user delete karo
    const { error: userError } = await supabase
      .from("users")
      .delete()
      .eq("id", id);


    if (userError) {
      return res.status(500).json({
        success: false,
        error: userError.message,
      });
    }


    res.json({
      success: true,
      message: "Student deleted successfully",
    });


  } catch (err) {

    console.log("Delete Student Error:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });

  }
};
