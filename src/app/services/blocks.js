const blockEntity = require('../../domain/Block')
const pageEntity = require('../../domain/Page')

const getCurrentBlock = (project, blockId) => project.blocks.find((block) => block._id.toString() === blockId)

module.exports = ({
  projectsRepo,
  encrypt,
  jwt,
  log
}) => {
  const createBlock = async (projectId, blockName) => {
    const block = blockEntity(blockName)

    const insertedBlock = await projectsRepo.addBlockToProject(projectId, block)

    if (insertedBlock.value) {
      const newBlock = insertedBlock.value.blocks[insertedBlock.value.blocks.length - 1]

      return {
        success: true,
        block: newBlock
      }
    }
    return {
      success: false,
      errors: ['project couldn\'t have been update']
    }
  }

  const deleteBlock = async (projectId, blockId) => {
    const updatedProject = await projectsRepo.deleteBlock(projectId, blockId)

    if (updatedProject.value) {
      return {
        success: true,
        blockId
      }
    }

    return {
      success: false,
      errors: ['block couldn\'t have been deleted']
    }
  }

  const createPage = async (projectId, blockId, pagaData) => {
    const page = pageEntity(pagaData)

    const updatedProject = await projectsRepo.addPageToBlock(projectId, blockId, page)

    if (updatedProject.value) {
      const currentBlock = getCurrentBlock(updatedProject.value, blockId)
      const newPage = currentBlock.pages && currentBlock.pages[currentBlock.pages.length - 1]

      if (newPage) {
        return {
          success: true,
          page: newPage
        }
      }

      return {
        success: false,
        errors: ['No pages found for this block after update']
      }
    }

    return {
      success: false,
      errors: ['Adding a page to current block failed']
    }
  }

  const deletePage = async (projectId, blockId, pageId) => {
    const updatedProject = await projectsRepo.deletePage(projectId, blockId, pageId)

    if (updatedProject.value) {
      const currentBlock = getCurrentBlock(updatedProject.value, blockId)
      const deletedPage = currentBlock.pages.find((page) => page._id === pageId)

      return {
        success: true,
        deletedPage
      }
    }

    return {
      success: false,
      errors: [`Failed to delete page : ${pageId}`]
    }
  }

  return {
    createBlock,
    deleteBlock,
    createPage,
    deletePage
  }
}
