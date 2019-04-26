'use strict'

const ProjectModel = require('../models/Project.js')
const UserModel = require('../models/User.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../lib/authentication.js')

module.exports = {

  getProjects: async (req, res) => {
    console.log('req ===> ', require('util').inspect(req, { colors: true, depth: 0 }))

    const { userId } = req.body

    console.log('userId ===> ', userId)

    try {
      const results = await ProjectModel.find()
      if (!results || !results.length) {
        throw new Error('No results found !')
      }
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
  },

  getUser: async (req, res) => {
    const { email } = req.query

    try {
      const results = await UserModel.find({ email })

      console.log('results ===> ', results)

      if (results && results.length) {
        return res.status(200).send('exists')
      }
      console.log('=============> HERE <================')
      return res.status(200).send()
    } catch (err) {
      return res.status(500).send(err.message)
    }
  },

  createAccount: async (req, res) => {
    // const getRandomInt = (min, max) => {
    //   return Math.floor(Math.random() * (max - min) + min)
    // }
    const saltRounds = 10

    const { pseudo, email, password } = req.body
    const newUser = {
      pseudo,
      email
    }
    try {
      const existingAccount = await UserModel.find({ email })
      // const makePswSafer = (psw) => {
      //   const splitted = psw.split(2, 4)

      //   console.log('spliced ===> ', splitted)
      // }

      if (existingAccount && existingAccount.length) {
        return res.status(200).send('existing mail')
      }

      // const saltRounds = getRandomInt(10, 100)
      // const harderPwd = makePswSafer(password)

      const hash = await bcrypt.hash(password, saltRounds)

      newUser.password = hash

      await UserModel.create(newUser)

      return res.status(201).send('created')
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  logUser: async (req, res) => {
    const { email, password } = req.body

    try {
      const [user] = await UserModel.find({ email })

      console.log('user ===> ', require('util').inspect(user, { colors: true, depth: 2 }))
      const pswCompared = bcrypt.compareSync(password, user.password, 10)

      console.log('pswCompared ===> ', pswCompared)
      if (pswCompared) {
        const projects = await ProjectModel.find({ _id: { $in: user.projects } })

        const token = jwt.sign({ id: user._id }, config.secret)

        console.log('token ===> ', token)
        const {
          _id,
          pseudo,
          email,
          teams } = user

        const data = {
          token,
          user: {
            _id,
            pseudo,
            email,
            teams
          },
          projects
        }

        console.log('data ===> ', require('util').inspect(data, { colors: true, depth: 2 }))
        res.status(200).send(data)
      } else {
        res.status(401).send()
      }

      // return pswCompared ? res.status(200).send(user) : res.status(401)
    } catch (err) {
      res.send(err)
      res.status(500).send(err.message)
    }
  },

  createProject: async (req, res) => {
    auth(req, res)
    try {
      const { _id, projectName } = req.body

      const project = await ProjectModel.create({ name: projectName })

      if (project) {
        const user = await UserModel.updateOne({ _id }, { $push: { projects: project._id } })

        if (user) {
          res.status(200).send(project)
        } else {
          res.status(500).send('Error when trying to update user profile')
        }
      } else {
        res.status(500).send('Error when trying to add a project')
      }
    } catch (err) {
      res.status(500).send(err.message)
    }
  }
}
