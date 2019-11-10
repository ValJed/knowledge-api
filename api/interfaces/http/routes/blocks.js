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
      const { _id, name } = req.body
      const blockData = { name }

      const response = await blocksService.createBlock(_id, blockData)

      if (response.success) {
        res.status(201).send(response)
      } else {
        res.status(400).send(response)
      }
    } catch (err) {
      log.error(err)
      res.status(500).send(err.response)
    }
  })

  // Creating a new page in a block
  router.post('/api/blocks/pages', async (req, res, next) => {
    try {
      const { _id, name, blockId } = req.body

      const pageData = { name }

      const response = await blocksService.createPage(_id, blockId, pageData)

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
