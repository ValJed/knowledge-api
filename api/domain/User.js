
module.export = ({ username, email, hash, salt }) => {
  const user = {
    username,
    email,
    password: {
      hash,
      salt
    },
    teams: [],
    projects: [],
    CreatedAt: new Date()
  }

  return user
}
