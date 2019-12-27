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

  const createProject = async (userId, projectName) => {
    const project = ProjectEntity(userId, projectName)

    const createdProject = await projectsRepo.createProject(project)

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

  const deleteProject = async (userId, projectId) => {
    const deletedUserProject = await usersRepo.deleteUserProject(userId, projectId)

    if (!deletedUserProject.value) {
      return {
        success: false,
        errors: ['User did not has been updated']
      }
    }

    const deletedProject = await projectsRepo.deleteProject(projectId)

    if (deletedProject.result.ok) {
      return {
        success: true,
        projectId
      }
    }

    return {
      success: false,
      errors: ['Project didn\'t have been deleted']
    }
  }

  return {
    getUserprojects,
    createProject,
    deleteProject
  }
}
