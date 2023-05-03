// eslint-disable-next-line semi
const express = require('express');
// eslint-disable-next-line semi
const router = express.Router();
// const swaggerUi = require('swagger-ui-express')
// const swaggerFile = require('./swagger-output.json')

// eslint-disable-next-line semi
router.use('/lyrics', require('./lyrics'));
// router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
// router.use('/', require('./swagger'))

module.exports = router