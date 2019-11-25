const express = require('express')

module.exports = ({
  services: {
    users: usersService
  },
  log
}) => {
  const router = new express.Router()

  // Getting a specific user
  router.get('/api/users', async (req, res, next) => {
    try {
      const { email } = req.query
      const response = await usersService.findByEmail(email)

      if (response.success) {
        return res.status(200).send(response)
      }
      res.status(404).send(response)
    } catch (err) {
      log.error(err)
      res.status(500).send(err.message)
    }
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
      log.error(err)
      res.status(500).send(err.message)
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
      res.status(400).send(err.message)
    }
  })

  return router
}
