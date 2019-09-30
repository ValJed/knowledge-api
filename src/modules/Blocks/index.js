module.exports = (app) => {
  const {
    addBlock,
    addPage
  } = require('./BlocksControllers')

  app.post('/blocks', addBlock)

  app.post('/pages', addPage)
}
