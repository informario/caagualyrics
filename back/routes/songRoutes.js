const express = require('express');
const {getSongs, addSong, removeSong, editSong} = require('../controllers/songController');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.get('/song', getSongs);
router.post('/song', authenticateToken, addSong);
router.delete('/song', authenticateToken, removeSong);
router.put('/song', authenticateToken, editSong);

module.exports = router;