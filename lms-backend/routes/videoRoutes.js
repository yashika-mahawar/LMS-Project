const express = require('express');
const router = express.Router();
const { getAllVideos, getVideosByCourse } = require('../controllers/videoController');

router.get('/', getAllVideos); // Route: /api/videos/
router.get('/:course_id', getVideosByCourse); // Route: /api/videos/:course_id

module.exports = router;