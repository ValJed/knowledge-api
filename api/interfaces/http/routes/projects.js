const express = require('express')

module.exports = ({
  services: {
    projects: projectsService
  },
  log
}) => {
  const router = new express.Router()

  // Getting all user projects
  router.get('/api/projects', async (req, res, next) => {
    try {
      const { userId } = req.body

      const response = projectsService.getprojects()

      if (response.success) {
        res.status(200).send(response)
      } else {
        res.status(400).send(response)
      }
    } catch (err) {
      log.error(err)
      res.status(500).send(err.response)
    }
  })

  // Creating a new project
  router.post('/api/projects', async (req, res, next) => {
    try {
      const { _id, projectName } = req.body

      const response = await projectsService.create(_id, projectName)

      if (response.success) {
        res.send(201).send(response)
      } else {
        res.send(500).send(response)
      }
    } catch (err) {
      log.error(err)
      res.status(500).send(err.response)
    }
  })

  return router
}
