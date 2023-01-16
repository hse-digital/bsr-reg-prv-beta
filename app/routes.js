// 
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/routes
// 

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// Run this code when a form is submitted to returning-boolean-answer
router.post('/returning-boolean-answer', function (req, res) {

    // Make a variable and give it the value from 'returning-boolean'
    var returningApplication = req.session.data['returning-boolean']
  
    // Check whether the variable matches a condition
    if (returningApplication == "yes"){
      // Send user to next page
      res.redirect('/returning-code')
    } else {
      // Send user to ineligible page
      res.redirect('/questions/building-name')
    }
  
  })

// Run this code when a form is submitted to returning-code-answer
router.post('/returning-code-answer', function (req, res) {

    // Make a variable and give it the value from 'returning-code'
    var returningCode = req.session.data['returning-code']
  
    // Check whether the variable matches a condition
    if (returningCode == "001"){
      // Send user to next page
      res.redirect('/kbi-task-list')
    } else {
      // Send user to ineligible page
      res.redirect('/register-task-list-returning')
    }
  
  })

// Run this code when a form is submitted to number-of-residential-units-answer
router.post('/residential-units-answer', function (req, res) {

  // Make a variable and give it the value from 'returning-code'
  var residentialUnits = req.session.data['number-of-residential-units']

  // Check whether the variable matches a condition
  if (Number(residentialUnits) < 2){
    // Send user to next page
    res.redirect('/check-answers-eligibility')
  } else {
    // Send user to ineligible page
    res.redirect('/questions/blocks/are-people-living-in-the-building')
  }

})

// Run this code when a form is submitted to returning-code-answer
router.post('/eligibility-answer', function (req, res) {

    // Make a variable and give it the value from 'number-of-floors'
    var numberOfFloors = req.session.data['number-of-floors']
    var buildingHeight = req.session.data['height']
    var residentialUnits = req.session.data['number-of-residential-units']
    var occupied = req.session.data['are-people-living-in-the-building']
  
    if ((Number(numberOfFloors) >= 7 || Number(buildingHeight) >= 18) && Number(residentialUnits) >= 2 && occupied !== "No and people will not be moving in"){
      // Send user to eligible page
      res.redirect('/questions/contact-details/email')
    } else {
        // Send user to not eligible page
        res.redirect('/not-eligible')
    }
  
  })

  // Run this code when a form is submitted to other-name-address-postcode-boolean-answer
router.post('/other-name-address-postcode-boolean-answer', function (req, res) {

    // Make a variable and give it the value from 'returning-boolean'
    var otherNameAddressPostcode = req.session.data['other-name-address-postcode-boolean']
  
    // Check whether the variable matches a condition
    if (otherNameAddressPostcode == "Yes"){
      // Send user to next page
      res.redirect('/questions/building/other-name-address-postcode')
    } else {
      // Send user to ineligible page
      res.redirect('/questions/building/completion-year')
    }
  
  })