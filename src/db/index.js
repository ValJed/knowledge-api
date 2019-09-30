const config = require('config')
const mongoose = require('mongoose')
const log = require('../lib/logger')

const dbConfig = config.get('dbConfig')

mongoose.promise = global.Promise

mongoose.Schema.Types.String.checkRequired(v => v != null)

mongoose.connection
  .on('connected', () => {
    log.info(`Mongoose default connection to ${dbConfig.uri} connected`)
  })
  .on('disconnected', () => {
    log.info(`Mongoose default connection to ${dbConfig.uri} disconnected`)
  })
  .on('error', (err) => {
    log.error(err)
  })

const connect = async () => {
  try {
    await mongoose.connect(dbConfig.uri, dbConfig.options)
  } catch (error) {
    log.error(error)
  }
}

const disconnect = async () => {
  try {
    await mongoose.disconnect()
  } catch (error) {
    log.error(error)
  }
}

module.exports = {
  connect,
  disconnect
}
