// const ProjectEntity = require('../../domain/Project')

module.exports = ({
  usersRepo,
  projectsRepo,
  encrypt,
  jwt,
  log
}) => {
  const getprojects = async (userId) => {
    const projects = await usersRepo.find()

    if (projects && projects.length) {
      return {
        success: true,
        projects
      }
    }
    return {
      success: false,
      errors: ['No projects found for this user']
    }
  }

  const create = async (userId, projectName) => {
    const project = await projectsRepo.create({ name: projectName })

    if (project) {
      const res = await usersRepo.addprojectToUser(userId, project.id)

      if (res.value) {
        return {
          success: true,
          project: res.value
        }
      }

      return {
        success: false,
        errors: ['User couldn\'t have been updated']
      }
    }

    return {
      success: false,
      errors: ['Project couldn\'t have been created']
    }
  }

  return {
    getprojects,
    create
  }
}
