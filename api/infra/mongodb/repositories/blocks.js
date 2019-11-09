const { ObjectID } = require('mongodb')

const repository = (db) => {
  const BlocksDb = db.collection('projects')

  return {
    find: () => BlocksDb.find().toArray()
  }
}

module.exports = repository
