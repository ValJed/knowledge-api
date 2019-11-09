const jwt = require('jsonwebtoken')
const { jwtConfig } = require('config')

module.exports = (config) => ({
  signin: (id) => {
    return jwt.sign({ id }, jwtConfig.secret)
  },

  verify: (token) => {
    return jwt.verify(token, jwtConfig.secret)
  }
})
