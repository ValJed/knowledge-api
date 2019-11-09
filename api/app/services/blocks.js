const blocksEntity = require('../../domain/Block')

module.exports = ({
  repository,
  encrypt,
  jwt,
  log
}) => {
  const find = async (id) => {
    const user = await repository.find({ _id: id })

    log.info(user)
    return user
  }

  return {
    find
  }
}
