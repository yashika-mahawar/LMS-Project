const supabase = require("../config/supabase");

// Sabhi videos laane ke liye (Admin ke liye)
exports.getAllVideos = async (req, res) => {
    const { data, error } = await supabase.from('videos').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
};

// Course ke hisaab se videos lane ke liye (Student ke liye - YE USE KARO)
exports.getVideosByCourse = async (req, res) => {
    const { course_id } = req.params;
    
    const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('course_id', course_id) // Yahan hum course filter kar rahe hain
        .order('id', { ascending: true }); // Taaki modules sequence mein rahein

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
};