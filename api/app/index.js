const config = require('config')

const http = require('../interfaces/http')
const logger = require('../infra/logger')()

// Services
const usersServices = require('./services/users')
const ProjectsServices = require('./services/projects')
const BlocksServices = require('./services/blocks')

// Infra
const database = require('../infra/mongodb')

// Repositories
const usersRepository = require('../infra/mongodb/repositories/users')
const ProjectsRepository = require('../infra/mongodb/repositories/projects')
const BlocksRepository = require('../infra/mongodb/repositories/blocks')

const jwt = require('../infra/jwt')
const encrypt = require('../infra/encryption')

const startApp = async () => {
  const client = await database.connect(config.dbConfig)

  http.start({
    config,
    database: client,
    log: logger,
    services: {
      users: usersServices({
        repository: usersRepository(database.db()),
        projectsRepository: ProjectsRepository(database.db()),
        encrypt,
        jwt: jwt(config),
        log: logger
      }),
      projects: ProjectsServices({
        repository: ProjectsRepository(database.db()),
        jwt: jwt(config),
        log: logger
      }),
      blocks: BlocksServices({
        repository: BlocksRepository(database.db()),
        log: logger
      })
    }
  })
}

startApp()
