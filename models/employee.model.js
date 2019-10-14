const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema ({
  name: String,
  employeeNum: Number
}, {timestamps: true})



module.exports = mongoose.model('Employee', employeeSchema)