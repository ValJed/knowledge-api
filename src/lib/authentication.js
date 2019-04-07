const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.includes('Bearer')) {
    const token = req.headers.authorization.replace('Bearer ', '')
    const verifiedToken = jwt.verify(token, config.secret)

    console.log('verifiedToken ===> ', verifiedToken)

    if (verifiedToken) {
      console.log('valid token <===')
    } else {
      res.status(401).send('invalid token...')
    }
    // console.log('req.headers.authorization ===> ', req.headers.authorization)
  } else {
    res.status(401).send()
  }
}
