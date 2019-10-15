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

router.get('/get-report', (req, res, next) => {

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
    else {res.render('reports/report', {message: "You must select an option for every field"})}
   
})



router.post('/create-report', (req,res, next) => {
  const {name, year, month, day, meal, transportation, parking} = req.body
  console.log('esta es la query' ,req.body)
  let employee_id = ''

  // first we check if the form fields are correctly completed
  if(name == 'Select' || year == 'Select' || month == 'Select' || day == 'Select'
    || transportation == null || parking == null)
     {res.render('reports/report', {message: "You must select an option for every field"})}

  // if(!transportation.match(/^[0-9]*$/g) || !parking.match(/^[0-9]*$/g)) 
  //   {res.render('reports/report', {message: "Transportation and Parking concepts must be  numbers"})}   


  // now we get the employee_id from the DB
  Employee.findOne({name})
  .then(theEmployee => {
    employee_id = theEmployee._id
    console.log('este es el id', employee_id)
    
    // first we check if there's an existing report for that date and employee and then we create or edit it
    MonthlyReport.findOne({employee_id, year, month})
    .then(theReport => {
      if (theReport !== null) {
        MonthlyReport.findOneAndUpdate({employee_id, year, month}, {$push: {dailies: {day, meal, transportation, parking}}}, {new:true} )
        .then(theReport => {
          res.render('reports/report', {theReport})
          console.log(theReport)
        })
      }
      else {
        MonthlyReport.create({employee_id, year, month, dailies:{day, meal, transportation, parking} })
        // .then(theReport => res.render('reports/report', {theReport}))
        .then(theReport => {
          res.render('reports/report', {theReport})
          console.log(theReport)
        })
      }
    })    
  })
  .catch(err => console.log('error checking existing report and creating new ', err))

})




module.exports = router
