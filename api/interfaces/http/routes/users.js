const express = require('express')

module.exports = ({
  services: {
    users: usersService
  },
  log
}) => {
  const router = new express.Router()

  // Getting all users
  router.get('/api/users', async (req, res, next) => {
    console.log('usersService ===> ', require('util').inspect(usersService, { colors: true, depth: 2 }))
  })

  // Login user
  router.post('/api/login', async (req, res, next) => {
    try {
      const data = req.body

      const response = await usersService.login(data)

      if (response.success) {
        res.status(200).send(response)
      } else {
        res.status(400).send(response)
      }
    } catch (err) {
      log.error({
        success: false,
        error: err.msg
      })
      res.status(400).send(err.response)
    }
  })

  // Creating new user
  router.post('/api/users', async (req, res, next) => {
    try {
      const data = req.body

      const response = await usersService.create(data)

      if (response.success) {
        res.status(201).send(response)
      } else {
        res.status(400).send(response)
      }
    } catch (err) {
      log.error(err)
      res.status(400).send(err.response)
    }
  })

  return router
}
