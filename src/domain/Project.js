const { ObjectID } = require('mongodb')

module.exports = (userId, name) => {
  const user = {
    name,
    img: '',
    description: '',
    ownersIds: [ObjectID(userId)],
    blocks: [],
    CreatedAt: new Date()
  }

  return user
}
