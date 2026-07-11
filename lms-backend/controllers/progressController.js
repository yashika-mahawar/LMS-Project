const { supabase } = require('../config/supabase');

exports.saveProgress = async (req, res) => {
    const { user_id, video_id, watched_seconds, status } = req.body;
    const { data, error } = await supabase
        .from('progress')
        .upsert({ user_id, video_id, watched_seconds, status });
        
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: "Progress saved!", data });
};