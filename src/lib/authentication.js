const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res) => {
  console.log('req.headers.authorization ===> ', req.headers.authorization)
  if (req.headers && req.headers.authorization && req.headers.authorization.includes('Bearer')) {
    const token = req.headers.authorization.replace('Bearer ', '')
    const verifiedToken = jwt.verify(token, config.secret)

    if (verifiedToken) {
      console.log('valid token <===')
    } else {
      res.status(401).send('invalid token...')
    }
  } else {
    res.status(401).send('This request isn\'t authorized')
  }
}
