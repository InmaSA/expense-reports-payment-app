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


// /* GET  - we send employee, year and month info to the DB to get if the report already exists and it's info*/

// router.get('/get-report', (req, res, next) => {

//   const {name, year, month} = req.query
//   let employee_id = ''

//   if(name != 'Employee name' && year != 'year' && month != 'month') {
//     Employee.findOne({name})
//     .then(theEmployee => {
//       employee_id = theEmployee._id

//       MonthlyReport.findOne({employee_id, year, month})
//       .then(theReport => {
//         (theReport !== null) ? res.render('reports/report', {theReport, name}) : 
//         res.render('reports/report', {message: "There isn't a report for the selected date"})
//       })    
//     })
//     .catch(err => console.log('error getting the employee report ', err))
//   }
//     else {res.render('reports/report', {message: "You must select an option for every field"})}
   
// })



/* GET  - we send employee, year and month info to the DB to get if the report already exists and if not, create a new one*/
router.get('/create-report', (req, res, next) => {

  const {name, year, month} = req.query
  let employee_id = ''

  if(name != 'Employee name' && year != 'year' && month != 'month') {
    Employee.findOne({name})
    .then(theEmployee => {
      employee_id = theEmployee._id

      MonthlyReport.findOne({employee_id, year, month})
      .then(theReport => {
        if (theReport !== null) {
          res.render('reports/report', 
          {message: 'There is already a report for the selected employee and date, go to "Consult an existing report" section.'})
        } 
        else {
          MonthlyReport.create({employee_id, year, month})
          .then(theReport => res.render('reports/report', {theReport, name}))
        }
      })    
    })
    .catch(err => console.log('error getting the employee report ', err))
  }
    else {res.render('reports/report', {message: "You must set employee name, year and month"})}
   
})



/* we update de daily info for the selected employee, year and month */
router.post(`/create-report`, (req,res, next) => {
  const {day, meal, transportation, parking} = req.body
  const {name, year, month} = req.query
  console.log('esta es la query', req.query)

  let employee_id = ''

  // first we check if the employee and date are selected in report.hbs and the query isn't empty
  if(req.query.name === '' || req.query.year === '' || req.query.month === '') 
  {res.render('reports/report', {message: "You must select first an employee and a date (year and month)"})} 
  
  // secondly we check if the form fields are correctly completed
  if(day == 'Select' || transportation == null || parking == null)
     {res.render('reports/report', {message: "You must select an option for every field"})}

  // then we fetch de employee_id   
  Employee.findOne({name})
  .then(theEmployee => {
    employee_id = theEmployee._id
  })  
  
  // now we update de dailies field in DB for the report we are working with
  MonthlyReport.findOneAndUpdate({year, month}, {$push: {dailies: {day, meal, transportation, parking}}}, {new:true})
  .populate(employee_id)
  .then(theReport => {
    res.render('reports/report', {theReport, name})
    console.log(theReport)
  })
  .catch(err => console.log('error checking existing report and creating new ', err))

})




module.exports = router
