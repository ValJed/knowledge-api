const {
  createUser,
  getUsers,
  // getUser,
  logUser
} = require('./UsersControllers')

module.exports = (app) => {
  // app.get('/get-user', getUser)

  app.get('/users', getUsers)

  app.post('/users/log', logUser)

  app.put('/users', createUser)
}