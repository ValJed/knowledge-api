const { ObjectID } = require('mongodb')

const repository = (db) => {
  const ProjectsDb = db.collection('projects')

  return {
    find: () => ProjectsDb.find().toArray(),
    create: (name) => ProjectsDb.insertOne({ name }),
    addBlockToProject: (projectId, blockData) => ProjectsDb.findOneAndUpdate(
      { _id: projectId },
      { $push: { blocks: blockData } },
      { returnOriginal: false }),
    addPageToBlock: (projectId, blockId, pageData) => ProjectsDb.findOneAndUpdate(
      { _id: projectId, 'blocks._id': blockId },
      { $push: { 'blocks.$.pages': pageData } },
      { returnOriginal: false })
  }
}

module.exports = repository
