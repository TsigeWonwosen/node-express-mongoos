const express = require('express');
const router= express.Router()

const {getIt ,getAdmin} = require('../controllers/adminController')

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log(' Admin are accessing  ...')
  next()
})

// define the home page route
router.get('/it', getIt)

// define the about route
router.get('/', getAdmin)

module.exports = router