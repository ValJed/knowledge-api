const express = require('express')

module.exports = ({
  services: {
    blocks: blocksService
  },
  log
}) => {
  const router = new express.Router()

  // Creating a new block
  router.post('/api/blocks', async (req, res, next) => {
    try {
      const { projectId, blockName } = req.body

      const response = await blocksService.createBlock(projectId, blockName)

      if (response.success) {
        res.status(201).send(response)
      } else {
        res.status(400).send(response)
      }
    } catch (err) {
      log.error(err)
      res.status(500).send(err.message)
    }
  })

  // Deleting a block
  router.delete('/api/blocks', async (req, res, next) => {
    try {
      const { projectId, blockId } = req.body

      if (!projectId || !blockId) {
        return res.status(400).send('You should provide a project id and a block id')
      }

      const response = await blocksService.deleteBlock(projectId, blockId)

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

  // Creating a new page in a block
  router.post('/api/blocks/pages', async (req, res, next) => {
    try {
      const { projectId, blockId, pageName } = req.body

      const pageData = { name: pageName }

      const response = await blocksService.createPage(projectId, blockId, pageData)

      if (response.success) {
        return res.status(201).send(response)
      }

      res.status(500).send(response)
    } catch (err) {
      log.error(err)
      res.status(500).send(err.message)
    }
  })

  // Deleting a page
  router.delete('/api/blocks/pages', async (req, res, next) => {
    try {
      const { projectId, blockId, pageName } = req.body

      const response = await blocksService.deletePage(projectId, blockId, pageName)

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
