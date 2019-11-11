const { ObjectID } = require('mongodb')

const repository = (db) => {
  const UsersDb = db.collection('users')

  return {
    find: () => UsersDb.find().toArray(),
    findOne: (email) => UsersDb.findOne({ email }),
    create: (user) => UsersDb.insertOne(user),
    deleteOne: (id) => UsersDb.deleteOne({ _id: id }),
    addProjectToUser: (userId, projectId) => {
      console.log('userId ===> ', require('util').inspect(userId, { colors: true, depth: 2 }))
      console.log('projectId ===> ', require('util').inspect(projectId, { colors: true, depth: 2 }))

      return UsersDb.findOneAndUpdate(
        { _id: ObjectID(userId) },
        { $push: { projectsIds: ObjectID(projectId) } },
        { returnOriginal: false })
    }
  }
}

module.exports = repository
