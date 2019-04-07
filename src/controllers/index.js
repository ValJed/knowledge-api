'use strict'

const ProjectsModel = require('../models/Project.js')
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
      const results = await ProjectsModel.find()
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

      if (results && results.length) {
        return res.status(200).send('exists')
      }

      return res.status(200)
    } catch (err) {
      console.error('err ===> ', err)
      res.send(err)
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
      console.error(err)
      res.send(err)
    }
  },

  logUser: async (req, res) => {
    const { email, password } = req.body

    try {
      const [user] = await UserModel.find({ email })
      const pswCompared = bcrypt.compareSync(password, user.password, 10)

      console.log('user ===> ', require('util').inspect(user, { colors: true, depth: 2 }))

      if (pswCompared) {
        const projects = await ProjectsModel.find({ _id: { $in: user.projects } })

        console.log('projects ===> ', require('util').inspect(projects, { colors: true, depth: 2 }))

        const token = jwt.sign({ id: user._id }, config.secret)
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
        res.status(200).send(data)
      } else {
        res.status(401)
      }

      // return pswCompared ? res.status(200).send(user) : res.status(401)
    } catch (err) {
      res.send(err)
    }
  }
}
