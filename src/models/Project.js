
'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  description: {
    type: String
  },
  owners: {
    type: Array
  },
  fields: {
    type: Array
  }
})

module.exports = mongoose.model('Projects', ProjectSchema)
