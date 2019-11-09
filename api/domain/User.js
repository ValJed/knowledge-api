
'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  pseudo: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  teams: {
    type: Array,
    required: false
  },
  projects: {
    type: Array
  },
  password: {
    type: String,
    required: true
  },
  CreatedDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Users', UserSchema)
