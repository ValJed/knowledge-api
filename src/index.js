const express = require('express')
const cors = require('cors')

const server = express()

const { dbConfig, corsOptions } = require('config')
const mongoose = require('mongoose')
// const Items = require('./models/testModels') // created model loading here
const bodyParser = require('body-parser')

// mongoose instance connection url connection
mongoose.Promise = global.Promise
mongoose.connect(dbConfig.url)

server.use(cors(corsOptions))

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

var routes = require('./routes/') // importing route
routes(server) // register the routes

server.listen(dbConfig.port)

console.log(`Knowledge API just started on port ${dbConfig.port}`)
