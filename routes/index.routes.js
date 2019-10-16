const express = require('express')
const router  = express.Router()

ObjectId = require('mongodb').ObjectID

// we require the models
const Employee = require('../models/employee.model')
const MonthlyReport = require('../models/monthlyReport.model')

const getTotalfromDB = require('../public/javascripts/calculateTotal')

/* GET employees info from DB as the app starts running */
router.get('/', (req, res, next) => {
  Employee.find()
  .then(employees => res.render('reports/report', {employees}))
  .catch(err => console.log('error getting employees info from DB: ', err))
})


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
          res.render('reports/report', {theReport, name})
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



/* POST to the DB daily info for the selected employee, year and month and show it and total cuantity on the screen */

router.post('/create-report', (req,res, next) => {
  const {day, meal, transportation, parking} = req.body
  const {name, year, month} = req.query

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
  
  // now we update de dailies field in DB for the report we are working with and the total, and send the info in report.hbs
  MonthlyReport.findOneAndUpdate({year, month}, {$push: {dailies: {day, meal, transportation, parking}}}, {new:true})
  .populate(employee_id)
  .then(theReport => {
    let total = getTotalfromDB(theReport.dailies)

    MonthlyReport.findOneAndUpdate({year, month}, {total}, {new:true})
    .then(theReport => {
      res.render('reports/report', {theReport, name})
    })
  })
  .catch(err => console.log('error checking existing report and creating new ', err))

})


// ROUTE TO GET THE DETAILS OF A DAILY REPORT TO UPDATE IT AFTERWARDS

router.get('/edit', (req,res,next) => {

  const {_id, day, meal, transportation, parking} = req.query
  const name = req.query.name

  MonthlyReport.findOne({"dailies": {_id, day, meal, transportation, parking}})
  .then(theReport => {
    const dailiesArray = theReport.dailies
    const dailyReportArray = dailiesArray.filter(elm => elm.id == req.query._id)
    const dailyReport = dailyReportArray[0]

    res.render('reports/report', {theReport, name, dailyReport})
  })
  .catch(err => console.log('error while searching a daily report in DB', err))
})


// POST TO UPDATE A DAILY REPORT

router.post('/update' , (req,res,next) => {

  const {day, meal, transportation, parking} = req.body
  const {cId, cDay, cMeal, cTransportation, cParking} = req.query

  MonthlyReport.findOneAndUpdate({"dailies": {_id: cId, day: cDay, meal: cMeal, transportation: cTransportation, parking: cParking}}, 
                                  {$set: {"dailies.$": {_id: cId, day, meal, transportation, parking}}}, {new:true})
  .then(theReport => {

    let total = getTotalfromDB(theReport.dailies)
    MonthlyReport.findOneAndUpdate({_id: theReport._id}, {total}, {new:true})
    .then(theReport => {
      Employee.findById(theReport.employee_id)
      .then(theEmployee => {
        let name = theEmployee.name
        res.render('reports/report', {theReport, name})
      })
    })
    .catch(err => console.log('error updating the daily report', err))
  })
})



module.exports = router
