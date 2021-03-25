const express = require('express');
const router = express.Router();

const { getConvert, postConvert } = require('../controllers/convertController');

router.get('/', getConvert);

router.post('/', postConvert);

module.exports = router;
