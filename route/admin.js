const express = require('express');
const router= express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log(' Admin are accessing  ...')
  next()
})
// define the home page route
router.get('/it', function (req, res) {
  res.send('Adimin - IT page ')
})
// define the about route
router.get('/', function (req, res) {
  res.send('Admin Route - page  ')
})

module.exports = router