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
    const { email } = req.body

    console.log('email ===> ', require('util').inspect(email, { colors: true, depth: 2 }))
    try {
      const results = await UserModel.find({ email })

      console.log('results ===> ', results)
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
      const user = await UserModel.find({ email })

      const pswCompared = bcrypt.compareSync(password, 10)
    } catch (err) {
      console.error('err ===> ', err)
    }
  }
}
