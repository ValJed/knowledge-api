'use strict'
module.exports = (server) => {
  var { getAllProjects } = require('../controllers/')

  // testList Routes
  // console.log('TESTLIST ===> ', require('util').inspect(testList, { colors: true, depth: 2 }))

  // server.route('/user/:id')

  server.route('/projects')
    .get(getAllProjects)

  // server.route('/items/:itemId')
  //   .get(testList.read_an_item)
  //   .put(testList.update_an_item)
  //   .delete(testList.delete_an_item)
}
