const express = require('express');
const router = express.Router();

const lyricsController = require('../controller/lyrics');

router.get('/', lyricsController.getAll);

router.get('/:id', lyricsController.getSingle);

router.post('/', lyricsController.createContact);

module.exports = router;