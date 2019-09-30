module.exports = (app) => {
  const {
    getProjects,
    createProject
  } = require('./ProjectsControllers')

  app.get('/projects', getProjects)

  app.post('/projects', createProject)
}
