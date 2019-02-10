'use strict'

const ProjectsModel = require('../models/Project.js')
const UserModel = require('../models/User.js')

module.exports = {
  getAllProjects: async (req, res) => {
    try {
      const results = await ProjectsModel.find()
      if (!results || !results.length) {
        throw new Error('No results found !')
      }
      console.log('results ===> ', require('util').inspect(results, { colors: true, depth: 4 }))
      res.send(results)
    } catch (err) {
      res.send(err)
    }
  },
  getUsers: async (req, res) => {
    try {
      const results = await UserModel.find()
      if (!results || !results.length) {
        throw new Error('No results found !')
      }
      res.json(results)
    } catch (err) {
      res.send(err)
    }
  }
}
