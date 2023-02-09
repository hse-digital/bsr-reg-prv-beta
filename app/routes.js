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
    res.redirect('/questions/blocks/completion-year')
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
      res.redirect('/questions/aps/add-ap')
    } else {
        res.redirect('/not-eligible')
    }
  
  })

router.post('/completion-year-answer', function (req, res) {

  var completionYear = req.session.data['completion-year-radio']

  if (completionYear == "No, I don't know the exact year") {

    res.redirect('/questions/blocks/completion-year-bands')
  }

  else {

    res.redirect('/questions/blocks/completion-certificate-issuer')
  }

})

router.post('/completion-certificate-reference-number-answer', function (req, res) {

  var completionYear = req.session.data['more-than-one-block']

  if (completionYear == "One") {

    res.redirect('/questions/building-address/find-address')
  }

  else {

    res.redirect('/questions/block-address/find-address')
  }

})

  // Run this code when a form is submitted to other-name-address-postcode-boolean-answer
router.post('/other-name-address-postcode-boolean-answer', function (req, res) {

    var otherNameAddressPostcode = req.session.data['other-name-address-postcode-boolean']
    var numberOfBlocks = req.session.data['more-than-one-block']

    console.log(numberOfBlocks)

    if (otherNameAddressPostcode === "Yes"){
      res.redirect('/questions/block-address/find-address')
    } else if (numberOfBlocks === "One"){
      res.redirect('/check-answers-blocks')
    } else {
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
    res.redirect('/check-answers-blocks-complex')
  }

})

// Run this code when a form is submitted to pap-type-answer
router.post('/pap-type-answer', function (req, res) {

  // Make a variable and give it the value from 'returning-boolean'
  var papType = req.session.data['pap-type']

  // Check whether the variable matches a condition
  if (papType == "Organisation"){
    // Send user to next page
    res.redirect('/questions/pap/pap-org-type')
  } else {
    // Send user to ineligible page
    res.redirect('/questions/pap/are-you-the-pap')
  }

})

router.post('/are-you-the-pap-answer', function (req, res) {

  var areYouThePap = req.session.data['are-you-the-pap']
  if (areYouThePap == "Yes") {
    res.redirect('/check-answers-pap-individual')
  } else {
    res.redirect('/questions/pap/pap-individual-name')
  }

})

router.post('/who-are-you-org-answer', function (req, res) {

  var whoAreYouOrg = req.session.data['are-you-the-pap']
  if (whoAreYouOrg == "I am none of the above"){
    res.redirect('/not-authorised')
  } else if (whoAreYouOrg == "I am the lead contact at the principal accountable person organisation") {
    res.redirect('/questions/pap/pap-org-lead-contact-details-user=lead')
  } else if (whoAreYouOrg == "I have written authorisation from the lead contact to register this building for them") {
    res.redirect('/questions/pap/pap-org-lead-contact-details')
  } else if (whoAreYouOrg == "I am a staff member of BSR, registering this building for someone by telephone") {
    res.redirect('/questions/pap/pap-org-lead-contact-details')
  }

})

router.post('/pap-org-lead-contact-details-answer', function (req, res) {

  var whoAreYouOrg = req.session.data['are-you-the-pap']
  if (whoAreYouOrg == "I am the lead contact at the principal accountable person organisation") {
    res.redirect('/questions/pap/pap-org-act-on-behalf-user=lead')
  } else if (whoAreYouOrg == "I have written authorisation from the lead contact to register this building for them") {
    res.redirect('/questions/pap/pap-org-lead-contact-details-user=lead')
  } else if (whoAreYouOrg == "I am a staff member of BSR, registering this building for someone by telephone") {
    res.redirect('/questions/pap/pap-org-lead-contact-details')
  }

})

router.post('/pap-address-answer', function (req, res) {

  var papType = req.session.data['pap-type']
  if (papType == "Organisation") {
    res.redirect('/questions/pap/what-is-your-role-at-pap-org')
  } else {
    res.redirect('/check-answers-pap-individual')
  }

})

router.post('/pap-confirm-address-answer', function (req, res) {

  var papType = req.session.data['pap-type']
  var userPap = req.session.data['are-you-the-pap']

  if (papType == "Organisation") {
    res.redirect('/questions/pap/pap-org-lead-contact-name')
  } else if (userPap == "Yes") {
    res.redirect('/check-answers-pap-individual')
  } else {
    res.redirect('/questions/pap/pap-individual-name')
  }

})

router.post('/what-is-your-role-at-pap-org-answer', function (req, res) {

  var papType = req.session.data['pap-org-role']
  if (papType == "I am the named contact") {
    res.redirect('/questions/pap/what-is-your-job-role')
  } else {
    res.redirect('/questions/pap/same-address-as-pap-org')
  }

})

router.post('/same-address-as-pap-org-answer', function (req, res) {

  var papType = req.session.data['pap-org-role']
  if (papType == "Use this address") {
    res.redirect('/questions/pap/pap-org-lead-contact-name')
  } else {
    res.redirect('/questions/users-address/find-address')
  }

})

router.post('/pap-authorised-boolean-answer', function (req, res) {

  var papAuthorisedBoolean = req.session.data
  ['pap-authorised-boolean']
  var papType = req.session.data['pap-type']
  if (papAuthorisedBoolean == "Yes") {
    res.redirect('/questions/pap/pap-authorised-person-contact-details')
  } else if (papAuthorisedBoolean == "No" && papType == "Organisation") {
    res.redirect('check-answers-pap-org')
  } else if (papAuthorisedBoolean == "No" && papType == "Individual") {
    res.redirect('check-answers-pap-individual')
  }

})

router.post('/check-answers-pap-answer', function (req, res) {

  var papType = req.session.data['pap-type']
  if (papType == "Organisation") {
    res.redirect('/check-answers-pap-org')
  } else {
    res.redirect('check-answers-pap-individual')
  }

})

router.post('/add-ap-answer', function (req, res) {

  var addAp = req.session.data['add-another-ap']
  if (addAp == "Yes") {
    res.redirect('/questions/aps/ap-type')
  } else {
    res.redirect('check-answers-aps')
  }

})

router.post('/ap-type-answer', function (req, res) {

  var apType = req.session.data['ap-type']
  if (apType == "Organisation"){
    // Send user to next page
    res.redirect('/questions/aps/ap-org-type')
  } else {
    // Send user to ineligible page
    res.redirect('/questions/aps/ap-individual-name')
  }

})

router.post('/ap-areas-answer', function (req, res) {

  var apType = req.session.data['ap-type']
  if (apType == "Organisation") {
    res.redirect('/questions/aps/ap-org-named-contact-name')
  } else {
    res.redirect('/questions/aps/add-ap')
  }

})

router.post('/more-than-one-block-answer', function (req, res) {

  var multipleBlocks = req.session.data['more-than-one-block']
  if (multipleBlocks == "Complex") {
    res.redirect('/what-we-need-blocks')
  } else {
    res.redirect('/questions/blocks/floors-above')
  }

})

router.post('/registration-confirm-answer', function (req, res) {

  var multipleBlocks = req.session.data['more-than-one-block']
  if (multipleBlocks == "Complex") {
    res.redirect('/kbi-task-list-complex')
  } else {
    res.redirect('/kbi-task-list')
  }

})

router.post('/connected-high-rise-buildings-boolean-answer', function (req, res) {

  var connectedBuildings = req.session.data['connected-high-rise-buildings-boolean']
  if (connectedBuildings == "No") {
    res.redirect('/questions/connected/connected-high-rise-buildings-boolean')
  } else {
    res.redirect('/questions/connected/connected-high-rise-buildings')
  }

})

router.post('/connected-other-buildings-boolean-answer', function (req, res) {

  var connectedBuildings = req.session.data['connected-other-buildings-boolean']
  if (connectedBuildings == "No") {
    res.redirect('/questions/roof/roof-type')
  } else {
    res.redirect('/questions/connected/connected-other-buildings')
  }

})