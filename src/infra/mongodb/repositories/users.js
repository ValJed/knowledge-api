const { ObjectID } = require('mongodb')

const repository = (db) => {
  const UsersDb = db.collection('users')

  return {
    find: () => UsersDb.find().toArray(),

    findUserByEmail: (email) => UsersDb.findOne({ email }),

    findUserById: (id) => UsersDb.findOne({ _id: ObjectID(id) }),

    create: (user) => UsersDb.insertOne(user),

    deleteOne: (id) => UsersDb.deleteOne({ _id: id }),

    deleteUserProject: (userId, projectId) => UsersDb.findOneAndUpdate(
      { _id: ObjectID(userId) },
      { $pull: { projectsIds: ObjectID(projectId) } },
      { returnOriginal: false }
    ),

    addProjectToUser: (userId, projectId) => UsersDb.findOneAndUpdate(
      { _id: ObjectID(userId) },
      { $push: { projectsIds: ObjectID(projectId) } },
      { returnOriginal: false })
  }
}

module.exports = repository
