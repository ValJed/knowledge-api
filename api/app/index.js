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

const jwt = require('../infra/jwt')
const encrypt = require('../infra/encryption')

const startApp = async () => {
  const client = await database.connect(config.dbConfig)

  const usersRepo = usersRepository(database.db())
  const projectsRepo = ProjectsRepository(database.db())

  http.start({
    config,
    database: client,
    log: logger,
    services: {
      users: usersServices({
        usersRepo,
        projectsRepo,
        encrypt,
        jwt: jwt(config),
        log: logger
      }),
      projects: ProjectsServices({
        usersRepo,
        projectsRepo,
        jwt: jwt(config),
        log: logger
      }),
      blocks: BlocksServices({
        projectsRepo,
        log: logger
      })
    }
  })
}

startApp()
