const express = require('express')
const bodyParser = require('body-parser')
// const dotenv = require('dotenv').config()
const mongoDB = require('./db/connect')
const passport = require('passport')
const session = require('express-session')
const GitHubStrategy = require('passport-github2').Strategy
const cors = require('cors')

const port = process.env.PORT || 8080
const app = express()

app
  .use(bodyParser.json())
  .use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }))
  // This is the basic express session({..}) initialization.
  .use(passport.initialize())
  // init passport on every route call.
  .use(passport.session())
  // allow passport to use "express-session".
  .use((req, res, next) => {
    res.setHeader('Access-Controll-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
    )
    res.setHeader(
      'Access-Control-Allow-Methods',
      'POST, GET, PUT, PATCH, OPTIONS, DELETE'
    )
    next()
  })
  .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
  .use(cors({ origin: '*' }))
  .use('/', require('./routes/index.js'))

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function (accessToken, refreshToken, profile, done) {
  // User.findOrCreate({ githubId: profile.id }, function (err, user) {
  return done(null, profile)
  // });
}
))

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out') })

app.get('/github/callback', passport.authenticate('github', { failureRedirect: '/api-docs', session: false }),
  (req, res) => {
    req.session.user = req.user
    res.redirect('/')
  })

mongoDB.initDb((err, mongoDB) => {
  if (err) {
    console.log(err)
  } else {
    app.listen(port)
    console.log(`Connected to DB and listening on port ${port}`)
  }
})

// const express = require('express')
// const parser = require('body-parser')
// const mongodb = require('./db/connect')
// const dontenv = require('dotenv').config()
// const passport = require('passport')

// const app = express()
// const port = process.env.PORT || 8080

// app.use(parser.json())
//   .use(parser.urlencoded({ extended: false }))
//   .use(parser.json())
//   .use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept, Z-key')
//     res.setHeader(
//       'Access-Control-Allow-Methods',
//       'GET, POST, PUT, PATCH, OPTIONS, DELETE')
//     next()
//   })
//   .use('/', require('./routes'))

// mongodb.initDb((err, mongodb) => {
//   if (err) {
//     console.log(err)
//   } else {
//     app.listen(port)
//     console.log(`Connected to DB and listening on port ${port}`)
//   }
// })
