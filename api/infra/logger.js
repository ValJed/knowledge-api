const pino = require('pino')
const isDev = process.env.NODE_ENV === 'development'

const logger = ({
  name = 'blog',
  level = 'info',
  enabled = true,
  destination = '/dev/stderr'
} = {}) => {
  return pino({
    name,
    level,
    enabled,
    useLevelLabels: true,
    ...isDev ? { prettyPrint: { colorize: true } } : {}
  }, pino.destination(destination))

  // TODO setup or remove
  // return {
  //   debug: pinoLogger.debug,
  //   info: pinoLogger.info,
  //   warn: pinoLogger.warn,
  //   error: pinoLogger.error,
  //   fatal: pinoLogger.fatal,
  //   child: pinoLogger.child,
  // }
}

module.exports = logger
