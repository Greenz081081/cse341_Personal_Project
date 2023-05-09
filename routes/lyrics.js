const express = require('express')
const router = express.Router()

const lyricsController = require('../controller/lyrics')

router.get('/', lyricsController.getAll)
router.get('/:id', lyricsController.getSingle)
router.post('/', lyricsController.createLyrics)
router.put('/:id', lyricsController.updateLyrics)
router.delete('/:id', lyricsController.deleteLyrics)

module.exports = router
