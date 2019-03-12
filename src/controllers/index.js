'use strict'

const ProjectsModel = require('../models/Project.js')
const UserModel = require('../models/User.js')
const bcrypt = require('bcrypt')

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
    console.log('=============> HERE <================')
    try {
      const results = await UserModel.find()

      console.log('results ===> ', require('util').inspect(results, { colors: true, depth: 2 }))

      if (!results || !results.length) {
        throw new Error('No results found !')
      }
      res.json(results)
    } catch (err) {
      res.send(err)
    }
  },
  createAccount: async (req, res) => {
    const { pseudo, email, password } = req.body
    const newUser = {
      pseudo,
      email
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return new Error('Error during the hash of your password')
      }
      newUser.password = hash
    })

    try {
      return UserModel.create(newUser)
    } catch (err) {
      console.error(err)
    }
  },
  identifyUser: async (req, res) => {

  }
}
