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
      res.redirect('/questions/building/building-name')
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
router.post('/other-building-name-boolean-answer', function (req, res) {

  // Make a variable and give it the value from 'returning-code'
  var otherBuildingName = req.session.data['other-building-name-boolean']

  // Check whether the variable matches a condition
  if (otherBuildingName == "Yes"){
    // Send user to next page
    res.redirect('/questions/building/other-building-name')
  } else {
    // Send user to ineligible page
    res.redirect('/questions/contact-details/name')
  }

})

// Run this code when a form is submitted to number-of-residential-units-answer
router.post('/residential-units-answer', function (req, res) {

  // Make a variable and give it the value from 'returning-code'
  var residentialUnits = req.session.data['number-of-residential-units']

  // Check whether the variable matches a condition
  if (Number(residentialUnits) < 2){
    // Send user to next page
    res.redirect('/questions/blocks/add-block')
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
      res.redirect('/questions/blocks/completion-year')
    } else {
        // Send user to not eligible page
        res.redirect('/questions/blocks/add-block')
    }
  
  })

  // Run this code when a form is submitted to number-of-residential-units-answer
router.post('/completion-year-answer', function (req, res) {

  // Make a variable and give it the value from 'returning-code'
  var completionYear = req.session.data['completion-year-radio']

  // Check whether the variable matches a condition
  if (completionYear == "The block has not yet been completed") {
    // Send user to next page
    res.redirect('/questions/blocks/add-block')
  } else {
    // Send user to ineligible page
    res.redirect('/questions/blocks/completion-certificate-issuer')
  }

})

  // Run this code when a form is submitted to other-name-address-postcode-boolean-answer
router.post('/other-name-address-postcode-boolean-answer', function (req, res) {

    // Make a variable and give it the value from 'returning-boolean'
    var otherNameAddressPostcode = req.session.data['other-name-address-postcode-boolean']
  
    // Check whether the variable matches a condition
    if (otherNameAddressPostcode == "Yes"){
      // Send user to next page
      res.redirect('/questions/blocks/other-name-address-postcode')
    } else {
      // Send user to ineligible page
      res.redirect('/questions/blocks/add-block')
    }
  
  })

// Run this code when a form is submitted to returning-boolean-answer
router.post('/add-block-boolean-answer', function (req, res) {

  // Make a variable and give it the value from 'returning-boolean'
  var addBlock = req.session.data['add-block-boolean']

  // Check whether the variable matches a condition
  if (addBlock == "Yes"){
    // Send user to next page
    res.redirect('/questions/blocks/floors-above')
  } else {
    // Send user to ineligible page
    res.redirect('/check-answers-blocks')
  }

})

// Run this code when a form is submitted to pap-type-answer
router.post('/pap-type-answer', function (req, res) {

  // Make a variable and give it the value from 'returning-boolean'
  var papType = req.session.data['pap-type']

  // Check whether the variable matches a condition
  if (papType == "Organisation"){
    // Send user to next page
    res.redirect('/questions/pap/pap-org-name')
  } else {
    // Send user to ineligible page
    res.redirect('/questions/pap/who-are-you-individual')
  }

})