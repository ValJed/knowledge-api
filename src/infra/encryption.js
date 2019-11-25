const crypto = require('crypto')

const encryptPsw = async (password) => {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = await crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')

  return {
    hash,
    salt
  }
}

const comparePsw = async (password, hash, salt) => {
  const hashPassword = await crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')

  return hashPassword === hash
}

module.exports = {
  encryptPsw,
  comparePsw
}
