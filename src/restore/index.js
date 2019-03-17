const program = require('commander')
const importManager = require('../src/import')
const { logConfig } = require('config')
const logger = require('pino')(logConfig)

program
  .version('0.1.0')
  .description('Import reviews from providers through command line interface')
  .option('-a, --all', 'importing all sources')
  .option('-e, --external', 'importing all external sources')
  .parse(process.argv)

if (program.args.length > 0 || program.all || program.external) {
  importManager(program.all, program.external, program.args)
} else {
  logger.warn('You need to specify flags --all / --external or providers from which you want to import reviews.')
}
