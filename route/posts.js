const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const verifyToken = require('../validation/verifywebtoken');

const {
  Log,
  Add,
  addPost,
  getUpdatePost,
  postUpdatePost,
  deletePost,
} = require('../controllers/postController.js');

// middleware that is specific to this router
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

router.use('/addpost', Log);

router.get('/addpost', addPost);

// Create (Insert) post in to db
router.post('/add', verifyToken, Add);

router.get('/update/:id', getUpdatePost);

//Update post
router.post('/update', postUpdatePost);

//Delete Post
router.get('/delete/:id', deletePost);

module.exports = router;
