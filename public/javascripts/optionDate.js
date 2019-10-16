// define the arrays or info that we want to pass to <option> tags in report.hbs
const years = [2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030]
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'november', 'December']
const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]


// get the <select> elements year, month and days from report.hbs
const selectYear = document.getElementById('year-list')
const selectMonth = document.getElementById('month-list')
const selectDay = document.getElementsByClassName('day-list')


// define a function to set the <option> tags for its <select> tag
const setElemntsInOptionTags = (array, htmlElement) => {
  array.forEach(elm => {
    let opt = document.createElement('option')
    opt.innerHTML= elm
    opt.id = elm
    htmlElement.appendChild(opt)
  })
  return
}


// use the function for every <select> tag

setElemntsInOptionTags(years, selectYear)
setElemntsInOptionTags(months, selectMonth)
setElemntsInOptionTags(days, selectDay[0])
setElemntsInOptionTags(days, selectDay[1])




