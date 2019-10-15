// we get from report.hbs the field <p> tags with the data we need for the calculation
// const meals = document.getElementsByClassName("meal")
// const transport = document.getElementsByClassName("transportation")
// const parking = document.getElementsByClassName("parking")

// TREATE THE INFO FROM TE DB
// the info in DB is in an array (dailies) of objects, each one of them has the keys meal, transportation and parfing
const getTotalfromDB = (array) => {
  let meals = [], transportation = [], parking = []
  array.forEach(elm => {
    meals.push(elm.meal)
    transportation.push(elm.transportation)
    parking.push(elm.parking)
  })
  // for(let i =0; i< array.length; i++) {
  //   meals.push(array[i].meal)
  //   transportation.push(array[i].transportation)
  //   parking.push(array[i].parking)
  // }
  return calcTotalExpense(meals, transportation, parking)
}



// ------FUNCTIONS TO USE FOR THE CALC-----

// a function to add units
const addData = (array) => array.reduce((a,b) => a+b)


// a function to calculate each separate payment
let totalExpense = (array, topLimit, inferiorPayment, higherPayment) => {
  let pastLimitPay = 0  
  let units = addData(array) 
  if (units > topLimit) {
      pastLimitPay = (units - topLimit)*inferiorPayment
      units = topLimit
  }
  return units * higherPayment + pastLimitPay
}


// WE SET THE DIFFERENT LIMITS AND PAYMENTS FOR EACH TYPE OF EXPENSE IN THE REPORT

// -------MEALS-------
// up to this cuantity the meals are paid in higher terms
const topLimitMeals = 3
// this is the maximun refund for meals up to the limit said
const higherRefundMeals = 10
// the rest of meals past the limit are refunded at this rate the unit
const lowerRefundMeals = 6

// -----TRANSPORTATION-----
// up to this cuantity the kilometers are paid in higher terms
const topLimitKilometers = 100
// this is the maximun paid for kilometers up to the limit said
const topKmPaidInTotality = 0.12
// the rest of kilometers past the limit are paid at this rate the unit
const inferiorCuantityPaid = 0.08


//------PARKING--------
// up to this cuantity the parking expenses are paid in totally
const topLimitParking = 20
// this is percent refunded if the parking expenses exceeds the limit
const percentRestParkingPayment = 0.5





//----CALCULATION OF THE TOTAL EXPENSE----
const calcTotalExpense = (meals, transport, parking) => {
  const mealsExpense = totalExpense(meals, topLimitMeals, lowerRefundMeals, higherRefundMeals, )
  const kmExpense = totalExpense(transport, topLimitKilometers, inferiorCuantityPaid, topKmPaidInTotality)
  const parkingExpense = totalExpense(parking, topLimitParking, percentRestParkingPayment, higherPayment=1)
  return mealsExpense + kmExpense + parkingExpense
}

module.exports = getTotalfromDB
