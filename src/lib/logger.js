const config = require('config')

const logConfig = config.get('logConfig')
const logger = require('pino')(logConfig)

module.exports = logger
