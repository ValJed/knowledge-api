const { ObjectID } = require('mongodb')

const repository = (db) => {
  const ProjectsDb = db.collection('projects')

  return {
    find: () => ProjectsDb.find().toArray(),

    findUserProjects: (userId) => ProjectsDb
      .find({ ownersIds: { $all: [ObjectID(userId)] } }).toArray(),

    createProject: (project) => ProjectsDb.insertOne(project),

    deleteProject: (projectId) => ProjectsDb.deleteOne({ '_id': ObjectID(projectId) }),

    addBlockToProject: (projectId, block) => ProjectsDb.findOneAndUpdate(
      { _id: ObjectID(projectId) },
      { $push: { blocks: block } },
      { returnOriginal: false }),

    deleteBlock: (projectId, blockId) => ProjectsDb.findOneAndUpdate(
      { _id: ObjectID(projectId) },
      { $pull: { blocks: { _id: ObjectID(blockId) } } }
    ),

    addPageToBlock: (projectId, blockId, pageData) => ProjectsDb.findOneAndUpdate(
      { _id: ObjectID(projectId), 'blocks._id': ObjectID(blockId) },
      { $push: { 'blocks.$.pages': pageData } },
      { returnOriginal: false }),

    deletePage: (projectId, blockId, pageName) => ProjectsDb.findOneAndUpdate(
      { _id: ObjectID(projectId), 'blocks._id': ObjectID(blockId) },
      { $pull: { 'blocks.$.pages': { name: pageName } } },
      { returnOriginal: false })
  }
}

module.exports = repository
