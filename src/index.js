const express = require('express')
const session = require('express-session')
const cors = require('cors')
const helmet = require('helmet')
const { dbConfig, corsOptions } = require('config')
const mongoose = require('mongoose')
// const Items = require('./models/testModels') // created model loading here
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const server = express()
const routes = require('./routes/') // importing route

server.use(helmet())

// mongoose instance connection url connection
mongoose.Promise = global.Promise

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
})

mongoose.connection.on('error', (err) => {
  console.error(err)
})

server.use(cors(corsOptions))

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.use(cookieParser())

server.use(session({
  key: 'user_id',
  secret: 'whatdoyouwant?',
  cookie: {
    // secure: true,
    expires: 600000
  },
  resave: false,
  saveUninitialized: false
}
))

// server.use((req, res, next) => {
//   if (req.cookies.user_id && !req.session.user) {
//     res.clearCookie('user_id')
//   }
//   next()
// })

server.use('*', (req, res, next) => {
  console.log('=============> USE <================')
  console.log('req.session ===> ', require('util').inspect(req.session, { colors: true, depth: 2 }))
  console.log('req.cookies ===> ', require('util').inspect(req.cookies, { colors: true, depth: 2 }))
  if (req.session.user && req.cookies.user_id) {
    res.redirect('/')
  }
  next()
})

routes(server) // register the routes

server.listen(dbConfig.port)

console.log(`Knowledge API just started on port ${dbConfig.port}`)
