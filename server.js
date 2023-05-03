const express = require('express')
const parser = require('body-parser')
const mongodb = require('./db/connect')

const app = express()
const port = process.env.PORT || 8080

app.use(parser.json())
  .use(parser.urlencoded({ extended: false }))
  .use(parser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
  })
  .use('/', require('./routes'))

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err)
  } else {
    app.listen(port)
    console.log(`Connected to DB and listening on ${port}`)
  }
})
