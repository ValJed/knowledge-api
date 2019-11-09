const { ObjectID } = require('mongodb')

const repository = (db) => {
  const ProjectsDb = db.collection('projects')

  return {
    find: () => ProjectsDb.find().toArray()
  }
}

module.exports = repository
