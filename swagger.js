const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Personal Assignment 6',
    description: 'Lyrics and Books API'
  },
  host: 'localhost:8080',
  schemes: ['http']
  // host: 'cse341-project-b7jd.onrender.com',
  // schemes: ['https']
}
const outputFile = './swagger.json'
const endpointsFiles = ['./routes/index.js']
// const endpointsFiles = ['./path/endpointsUser.js', './path/endpointsBook.js']

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc)

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//   require('./routes/index') // Your project's root file
// })
