const { ObjectID } = require('mongodb')

module.exports = (name) => {
  const block = {
    _id: ObjectID(),
    name,
    pages: []
  }

  return block
}
