const express = require('express')
const router  = express.Router()

// we require the models
const Employee = require('../models/employee.model')
const MonthlyReport = require('../models/monthlyReport.model')



/* GET employees info from DB as the app starts running */
router.get('/', (req, res, next) => {
  Employee.find()
  .then(employees => res.render('reports/report', {employees}))
  .catch(err => console.log('error getting employees info from DB: ', err))
})


/* GET  - we send employee, year and month info to the DB to get if the report already exists and it's info*/

router.get('/getReport', (req, res, next) => {

  const {name, year, month} = req.query
  let employee_id = ''

  if(name != 'Employee name' && year != 'year' && month != 'month') {
    Employee.findOne({name})
    .then(theEmployee => {
      employee_id = theEmployee._id

      MonthlyReport.findOne({employee_id, year, month})
      .then(theReport => {
        (theReport !== null) ? res.render('reports/report', {theReport, name}) : 
        res.render('reports/report', {message: "There isn't a report for the selected date"})
      })    
    })
    .catch(err => console.log('error getting the employee report ', err))
  }
    else {res.render('reports/report', {message: "Be sure to choose an option for every field"})}
   
 
})




module.exports = router
