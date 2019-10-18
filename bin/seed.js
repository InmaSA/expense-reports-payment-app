const mongoose = require('mongoose')
const Employee = require('../models/employee.model')

require('../configs/mongoose.config')

const employee = [
  {name: "Jhon Doe"},
  {name: "Elisabeth Bennet"},
  {name: "Fitzwilliam Darcy"},
  {name: "Luke SkyWalker"},
  {name: "Leia Organa"}
]


Employee.create(employee, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${employee.length} employees`)
  mongoose.connection.close()
})