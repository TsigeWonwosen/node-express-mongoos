const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const {
  registrationValidation,
  logInValidation,
} = require('../validation/validation');

const getRegister = async (req, res) => {
  try {
    //const users = await User.find()
    //res.json(users);

    res.render('register');
  } catch (e) {
    res.status(400).json('Error ', e);
  }
};

const postRegister = async (req, res) => {
  const { error } = registrationValidation(req.body);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(500).send('Email Already exist Try Anther.');

  if (error) return res.status(400).send(error.details[0].message);
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();

    res.render('login');
  } catch (e) {
    res.status(400).send(e);
  }
};

const Logout = (req, res) => {
  req.logOut();
  res.redirect('/auth/login');
};

const getLogin = async (req, res) => {
  const { error } = logInValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(500).send('email is not found!');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Password is not Correct');
  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  // res.header('auth-token',token).render('main',{user:user.email})
  res.header('auth-token', token).redirect('/');
  // res.status(200).send('Login Successful ...')
  // res.render('main',{user:user.email})
};

const postLogin = async (req, res) => {
  const { error } = logInValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(500).send('email is not found!');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Password is not Correct');
  const token1 = await jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  console.log('Token 1 : passport >>> ' + token1);

  res.header('auth-token', token1).render('main', { user: user.email });
};

module.exports = {
  getRegister,
  postRegister,
  Logout,
  getLogin,
  postLogin,
};
