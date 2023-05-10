const express = require('express')
const router = express.Router()

const booksController = require('../controller/books')

router.get('/', booksController.getAll)
router.get('/:id', booksController.getSingle)
router.post('/', booksController.createBooks)
router.put('/:id', booksController.updateBooks)
router.delete('/:id', booksController.deleteBooks)

module.exports = router
