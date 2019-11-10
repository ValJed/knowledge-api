const { ObjectID } = require('mongodb')

const repository = (db) => {
  const UsersDb = db.collection('users')

  return {
    find: () => UsersDb.find().toArray(),
    findOne: (email) => UsersDb.findOne({ email }),
    insertOne: (user) => UsersDb.insertOne(user),
    deleteOne: (id) => UsersDb.deleteOne({ _id: id }),
    addProjectToUser: (userId, projectId) => UsersDb.findOneAndUpdate(
      { _id: userId },
      { $push: { projects: projectId } },
      { returnOriginal: false })
  }
}

module.exports = repository
