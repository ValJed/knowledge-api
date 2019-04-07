'use strict'
module.exports = (server) => {
  const {
    getProjects,
    createAccount,
    getUsers,
    getUser,
    logUser } = require('../controllers/')

  server.route('/get-projects')
    .get(getProjects)

  server.route('/get-user')
    .get(getUser)

  server.route('/users')
    .get(getUsers)

  server.route('/create-account')
    .put(createAccount)

  server.route('/log-user')
    .post(logUser)

  // server.route('/items/:itemId')
  //   .get(testList.read_an_item)
  //   .put(testList.update_an_item)
  //   .delete(testList.delete_an_item)
}
