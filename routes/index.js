const router = require('express').Router()
const passport = require('passport')

router.use('/', require('./swagger'))
router.use('/lyrics', require('./lyrics'))
router.use('/books', require('./books'))

router.get('/login', passport.authenticate('github'), (req, res) => {})

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err) }
    res.redirect('/')
  })
})

module.exports = router

// // eslint-disable-next-line semi
// const express = require('express');
// // eslint-disable-next-line semi
// const router = express.Router();
// // const swaggerUi = require('swagger-ui-express')
// // const swaggerFile = require('./swagger-output.json')

// // eslint-disable-next-line semi
// router.use('/lyrics', require('./lyrics'));

// router.use('/books', require('./books'))
// // router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
// router.use('/', require('./swagger'))

// module.exports = router
