
module.exports = ({ username, email, hash, salt }) => {
  const user = {
    username,
    email,
    password: {
      hash,
      salt
    },
    teams: [],
    projectsIds: [],
    CreatedAt: new Date()
  }

  return user
}
