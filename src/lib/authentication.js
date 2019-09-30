const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = async (req, res) => {
  console.log('req.headers.authorization ===> ', req.headers.authorization)
  if (req.headers && req.headers.authorization && req.headers.authorization.includes('Bearer')) {
    const token = req.headers.authorization.replace('Bearer ', '')
    let verifiedToken = false

    try {
      verifiedToken = jwt.verify(token, config.secret)
    } catch (err) {
      res.status(401).send('invalid token...')
    }

    if (verifiedToken) {
    } else {
      res.status(401).send('invalid token...')
    }
  } else {
    res.status(401).send('This request isn\'t authorized')
  }
}
