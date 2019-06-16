
'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  img: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  owners: {
    type: Array
  },
  blocks: {
    type: Array
  }
})

module.exports = mongoose.model('Project', ProjectSchema)
