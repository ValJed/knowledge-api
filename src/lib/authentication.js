const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.includes('Bearer')) {
    console.log('req ===> ', require('util').inspect(req.session, { colors: true, depth: 0 }))
    // console.log('req.headers.authorization ===> ', req.headers.authorization)
  } else {
    res.status(401).send()
  }
}
