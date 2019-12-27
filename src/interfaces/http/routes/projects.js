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

      const response = projectsService.getUserProjects(userId)

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

  // Creating a new project
  router.post('/api/projects', async (req, res, next) => {
    try {
      const { _id, projectName } = req.body

      const response = await projectsService.createProject(_id, projectName)

      if (response.success) {
        return res.status(201).send(response)
      }

      res.status(500).send(response)
    } catch (err) {
      log.error(err)
      res.status(500).send(err.message)
    }
  })

  // Deleting project
  router.delete('/api/projects', async (req, res, next) => {
    try {
      const { userId, projectId } = req.body

      const response = await projectsService.deleteProject(userId, projectId)

      if (response.success) {
        return res.status(200).send(response)
      }

      res.status(500).send(response)
    } catch (err) {
      log.error(err)
      res.status(500).send(err.message)
    }
  })

  return router
}
