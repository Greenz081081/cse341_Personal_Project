const express = require('express')
const router = express.Router()

const booksController = require('../controller/books')
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', booksController.getAll)
router.get('/:id', booksController.getSingle)
router.post('/', isAuthenticated, booksController.createBooks)
router.put('/:id', isAuthenticated, booksController.updateBooks)
router.delete('/:id', isAuthenticated, booksController.deleteBooks)

module.exports = router
