const ProjectModel = require('../../db/models/Project')
const UserModel = require('../../db/models/User')
const auth = require('../../lib/authentication')

module.exports = {
  getProjects: async (req, res) => {
    const { userId } = req.body

    try {
      const results = await ProjectModel.find()
      if (!results || !results.length) {
        throw new Error('No results found !')
      }
      res.send(results)
    } catch (err) {
      res.send(err)
    }
  },

  createProject: async (req, res) => {
    auth(req, res)
    try {
      const { _id, projectName } = req.body

      const project = await ProjectModel.create({ name: projectName })

      if (project) {
        const user = await UserModel.updateOne({ _id }, { $push: { projects: project._id } })

        if (user.ok) {
          res.status(200).send(project)
        } else {
          res.status(500).send('Error when trying to update user profile')
        }
      } else {
        res.status(500).send('Error when trying to add a project')
      }
    } catch (err) {
      res.status(500).send(err.message)
    }
  }
}
