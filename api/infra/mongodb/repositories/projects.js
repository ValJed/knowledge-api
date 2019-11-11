const { ObjectID } = require('mongodb')

const repository = (db) => {
  const ProjectsDb = db.collection('projects')

  return {
    find: () => ProjectsDb.find().toArray(),
    findUserProjects: (ids) => ProjectsDb.find({ _id: { $in: ids } }).toArray(),
    create: (project) => ProjectsDb.insertOne(project),
    addBlockToProject: (projectId, blockData) => ProjectsDb.findOneAndUpdate(
      { _id: ObjectID(projectId) },
      { $push: { blocks: blockData } },
      { returnOriginal: false }),
    addPageToBlock: (projectId, blockId, pageData) => ProjectsDb.findOneAndUpdate(
      { _id: ObjectID(projectId), 'blocks._id': ObjectID(blockId) },
      { $push: { 'blocks.$.pages': pageData } },
      { returnOriginal: false })
  }
}

module.exports = repository
