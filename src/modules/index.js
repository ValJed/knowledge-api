const UsersRoutes = require('./Users')
const blocksRoutes = require('./Blocks')
const projetsRoutes = require('./Projects')

module.exports = (app) => {
  UsersRoutes(app)
  projetsRoutes(app)
  blocksRoutes(app)
}
