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

  const findByEmail = (email) => {
    const user = usersRepo.findOne({ email })

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
    const user = await usersRepo.findOne(email)

    console.log('user ===> ', require('util').inspect(user, { colors: true, depth: 2 }))

    if (!user) {
      return {
        success: false,
        errors: ['No user found for this email']
      }
    }

    const isPasswordValid = await encrypt.comparePassword(password, user.hash, user.salt)

    console.log('isPasswordValid ===> ', require('util').inspect(isPasswordValid, { colors: true, depth: 2 }))

    if (isPasswordValid) {
      const projects = await projectsRepo.find({ _id: { $in: user.projects } })

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

  const create = async ({ username, email, password }) => {
    // const validation = usersEntity.validate({ username, password })
    // const newUser = {
    //   pseudo,
    //   email
    // }
    const existingUser = await usersRepo.findOne(email)

    if (existingUser) {
      return {
        success: false,
        errors: ['This email already match an account']
      }
    }

    const { hash, salt } = await encrypt.encryptPassword(password)

    const newUser = userEntity({ username, email, hash, salt })

    const res = usersRepo.create(newUser)

    console.log('res ===> ', require('util').inspect(res, { colors: true, depth: 2 }))

    if (res) {

    }

    console.log('newUser ===> ', require('util').inspect(newUser, { colors: true, depth: 2 }))
    // if (validation.error) {
    //   return {
    //     success: false,
    //     errors: validation.error.details.map((error) => error.message)
    //   }
    // }

    const data = {
      username,
      hash,
      salt
    }

    const res = await usersRepo.insertOne(data)

    return {
      success: !!res.result.ok
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
    login,
    create,
    verify
  }
}
