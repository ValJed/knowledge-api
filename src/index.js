const express = require('express')

const server = express()

const { port, url } = require('config').dbConfig
const mongoose = require('mongoose')
// const Items = require('./models/testModels') // created model loading here
const bodyParser = require('body-parser')

// mongoose instance connection url connection
mongoose.Promise = global.Promise
mongoose.connect(url)

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

var routes = require('./routes/') // importing route
routes(server) // register the routes

server.listen(port)

console.log(`Knowledge API just started on port ${port}`)
