const userEntity = require('../../domain/User')

module.exports = ({
  usersRepo,
  projectsRepo,
  encrypt,
  jwt,
  log
}) => {
  const findAll = async () => {
    const users = await usersRepo.find()

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

  const findByEmail = async (email) => {
    const user = await usersRepo.findUserByEmail(email)

    if (user) {
      return {
        success: true
      }
    }
    return {
      success: false,
      errros: ['No user found for this email']
    }
  }

  const create = async ({ username, email, password, checkPassword }) => {
    const existingUser = await usersRepo.findUserByEmail(email)

    if (existingUser) {
      return {
        success: false,
        errors: ['This email already match an account']
      }
    }

    if (password !== checkPassword) {
      return {
        success: false,
        errors: ['Your password validation shoyld match your password']
      }
    }

    const { hash, salt } = await encrypt.encryptPsw(password)

    const newUser = userEntity({ username, email, hash, salt })

    const res = await usersRepo.create(newUser)

    if (res) {
      return {
        success: !!res.result.ok
      }
    }
  }

  const login = async ({ email, password }) => {
    const user = await usersRepo.findUserByEmail(email)

    if (!user) {
      return {
        success: false,
        errors: ['No user found for this email']
      }
    }

    const isPasswordValid = await encrypt.comparePsw(password, user.password.hash, user.password.salt)

    if (isPasswordValid) {
      const projects = await projectsRepo.findUserProjects(user._id)

      delete user.password

      return {
        success: true,
        token: jwt.signin(user._id),
        projects,
        user
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
    findByEmail,
    create,
    login,
    verify
  }
}
