const usersEntity = require('../../domain/users')

module.exports = ({
  repository,
  projectsRepository,
  encrypt,
  jwt,
  log
}) => {
  const findAll = async () => {
    const users = await repository.find()

    if (users && users.length) {
      return {
        success: true,
        users
      }
    }
    return {
      success: false,
      errors: ['No users found']
    }
  }

  const findByEmail = (email) => {
    const user = repository.findOne({ email })

    if (user) {
      return {
        success: true,
        user
      }
    }
    return {
      success: false,
      errros: ['No user found for this email']
    }
  }

  const login = async ({ email, password }) => {
    const user = await repository.findOne({ email })

    if (!user) {
      return {
        success: false,
        errors: ['No user found for this email']
      }
    }

    const isPasswordValid = await encrypt.comparePassword(password, user.hash, user.salt)

    if (isPasswordValid) {
      const projects = await projectsRepository.find({ _id: { $in: user.projects } })

      return {
        success: true,
        token: jwt.signin(user._id),
        projects
      }
    }

    return {
      success: false,
      msg: 'Password isn\'t valid'
    }
  }


  const create = async ({ pseudo, username, password }) => {
    // const validation = usersEntity.validate({ username, password })
    const newUser = {
      pseudo,
      email
    }

    if (validation.error) {
      return {
        success: false,
        errors: validation.error.details.map((error) => error.message)
      }
    }

    log.info(validation)

    const { hash, salt } = await encrypt.encryptPassword(password)

    const data = {
      username,
      hash,
      salt
    }

    const res = await repository.insertOne(data)

    return {
      success: !!res.result.ok
    }
  }

  const login = async ({ username, password }) => {
    const user = await repository.findOne({ username })

    if (!user) {
      return false
    }

    const isPasswordValid = await encrypt.comparePassword(password, user.hash, user.salt)

    if (isPasswordValid) {
      return {
        success: true,
        token: jwt.signin(user._id)
      }
    }

    return {
      success: false,
      msg: 'Password isn\'t valid'
    }
  }

  const verify = (token) => {
    const isTokenValid = jwt.verify(token)

    return !!isTokenValid
  }

  const remove = () => {
    // const user = await repository.deleteOne({})
  }

  return {
    findAll,
    findByEmail
    login,
  }
}
