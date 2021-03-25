const express = require('express');
const passport = require('passport');
const router = express.Router();

const {
  getRegister,
  postRegister,
  Logout,
  getLogin,
  postLogin,
} = require('../controllers/authController');



router.get('/register', getRegister);

router.post('/register', postRegister);

router.delete('/logout', Logout);

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', getLogin);

router.post(
  '/loginpassport',
  passport.authenticate('local', {
    failureRedirect: '/auth/login',
    session: false,
  }),
  postLogin,
);

module.exports = router;
