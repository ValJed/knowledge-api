const { ObjectID } = require('mongodb')

module.exports = ({ name }) => {
  const page = {
    _id: ObjectID(),
    name,
    content: ''
  }

  return page
}
