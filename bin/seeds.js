const mongoose = require('mongoose')
const Employee = require('../models/employee.model')

require('../configs/mongoose.config')

const employee = [
  {
    name: "Elisabeth Bennet",
    employeeNum: 100
  },
  {
    name: "Fitzwilliam Darcy",
    employeeNum: 200

  }
]


Employee.create(employee, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${employee.length} employees`)
  mongoose.connection.close()
})