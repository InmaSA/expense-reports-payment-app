const mongoose = require('mongoose')
const Schema = mongoose.Schema


const monthlyReportScheema = new Schema ({
  employee_id: {type: Schema.Types.ObjectId, ref: 'Employee'},
  year: Number,
  month: String,
  dailies: [{
      day: String,
      transportation: Number,
      meal: Number,
      parking: Number
  }],
  total: Number
}, {timestamps: true})


module.exports = mongoose.model('MonthlyReport', monthlyReportScheema)