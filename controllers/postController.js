const mongoose = require('mongoose');
const PostOnDb = require('../models/Post');

const Log = (req, res, next) => {
  console.log('Time: ', Date.now());
  next();
};

const Add = function (req, res) {
  try {
    const { title, description } = req.body;
    const newpost = {
      title,
      description,
    };
    const post12 = new PostOnDb(newpost);

    post12.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const addPost = (req, res) => {
  res.render('add-post');
};

const getUpdatePost = async (req, res) => {
  const PostUpdate = await PostOnDb.findOne({ _id: req.params.id });
  // res.json(singlePOst)
  res.render('update-post', { data: PostUpdate });
};

const postUpdatePost = async function (req, res) {
  const { _id, title, description } = req.body;
  try {
    const singlePOst = await PostOnDb.findById(_id);

    singlePOst.title = title;
    singlePOst.description = description;
    singlePOst.date = Date.now();

    const saved = await singlePOst.save();

    res.redirect('/');
    // res.json(singlePOst)
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const deletePost = (req, res) => {
  try {
    // const _id = req.params;

    PostOnDb.findByIdAndRemove(req.params.id).exec();
    res.redirect('/');
    // res.json({Id : req.params.id})
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
module.exports = {
  Log,
  Add,
  addPost,
  getUpdatePost,
  postUpdatePost,
  deletePost,
};
