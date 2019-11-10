const blocksEntity = require('../../domain/Block')

module.exports = ({
  projectsRepo,
  encrypt,
  jwt,
  log
}) => {
  const createBlock = async (projectId, blockData) => {
    const res = await projectsRepo.addBlockToProject(projectId, blockData)

    if (res.value) {
      const newBlock = res.value.blocks[res.value.blocks.length - 1]

      return {
        success: true,
        newBlock
      }
    }
    return {
      success: false,
      errors: ['project couldn\'t have been update']
    }
  }

  const createPage = (projectId, blockId, pageData) => {
    const res = projectsRepo.addPageToBlock(projectId, blockId, pageData)

    if (res.value) {
      const currentBlock = res.value.blocks.find((block) => block._id.toString() === blockId)
      const newPage = currentBlock.pages && currentBlock.pages[currentBlock.pages.length - 1]

      if (newPage) {
        return {
          success: true,
          newPage
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

  return {
    createBlock,
    createPage
  }
}
