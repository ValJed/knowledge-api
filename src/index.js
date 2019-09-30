const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const { dbConfig, corsOptions } = require('config')
const bodyParser = require('body-parser')

const app = express()
const db = require('./db')
const api = require('./modules/') // importing route

const startApp = async () => {
  await db.connect()

  app.use(helmet())

  app.use(cors(corsOptions))

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  api(app) // register the routes

  app.listen(dbConfig.port)

  console.log(`Knowledge API just started on port ${dbConfig.port}`)
}

startApp()
