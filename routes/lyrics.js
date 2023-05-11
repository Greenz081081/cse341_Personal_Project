const express = require('express')
const router = express.Router()

const lyricsController = require('../controller/lyrics')
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', lyricsController.getAll)
router.get('/:id', lyricsController.getSingle)
router.post('/', isAuthenticated, lyricsController.createLyrics)
router.put('/:id', isAuthenticated, lyricsController.updateLyrics)
router.delete('/:id', isAuthenticated, lyricsController.deleteLyrics)

module.exports = router
