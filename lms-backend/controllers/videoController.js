import { supabase } from "../config/supabase.js";

// Sabhi videos laane ke liye (Admin ke liye)
export const getAllVideos = async (req, res) => {
    const { data, error } = await supabase.from('videos').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
};

// Course ke hisaab se videos lane ke liye (Student ke liye)
export const getVideosByCourse = async (req, res) => {
    const { course_id } = req.params;
    
    const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('course_id', course_id)
        .order('id', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
};