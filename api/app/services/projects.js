const ProjectEntity = require('../../domain/Project')

module.exports = ({
  usersRepo,
  projectsRepo,
  encrypt,
  jwt,
  log
}) => {
  const getUserprojects = async (userId) => {
    const projects = await usersRepo.findUserProjects(userId)

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
    const project = ProjectEntity(userId, projectName)

    const createdProject = await projectsRepo.create(project)

    if (createdProject.result.ok) {
      const updatedUser = await usersRepo.addProjectToUser(userId, createdProject.insertedId)

      if (updatedUser.value) {
        return {
          success: true,
          project: {
            _id: createdProject.insertedId,
            ...project
          }
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
    getUserprojects,
    create
  }
}
