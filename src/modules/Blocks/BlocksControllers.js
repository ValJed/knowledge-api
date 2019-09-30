const mongoose = require('mongoose')
const ProjectModel = require('../../db/models/Project')
const auth = require('../../lib/authentication')

module.exports = {
  addBlock: async (req, res) => {
    auth(req, res)
    try {
      const { _id, name } = req.body
      const data = { name }

      const updatedDoc = await ProjectModel.findOneAndUpdate(
        { _id },
        { $push: { blocks: data } },
        { new: true }
      )

      const newBlock = updatedDoc.blocks[updatedDoc.blocks.length - 1]

      if (updatedDoc && newBlock) {
        res.status(200).send(updatedDoc)
      } else {
        res.status(500).send('Error when trying to add a field')
      }
    } catch (err) {
      console.error(
        `Error when trying to add a field
        ${err}`
      )
      res.status(500).send(err.message)
    }
  },

  addPage: async (req, res) => {
    const ObjectId = mongoose.Types.ObjectId

    auth(req, res)
    try {
      const { _id, name, blockId } = req.body
      const data = { name }

      const updatedDoc = await ProjectModel.findOneAndUpdate(
        { _id, 'blocks._id': blockId },
        { $push: { 'blocks.$.pages': data } },
        { new: true }
      )

      const currentBlock = updatedDoc.blocks.find((block) => block._id.toString() === blockId)
      const newPage = currentBlock.pages && currentBlock.pages[currentBlock.pages.length - 1]

      if (updatedDoc && newPage) {
        res.status(200).send(newPage)
      } else {
        res.status(500).send('Error when trying to add a field')
      }
    } catch (err) {
      console.error(
        `Error when trying to add a field
        ${err}`
      )
      res.status(500).send(err.message)
    }
  }
}
