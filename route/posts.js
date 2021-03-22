const express = require('express');
const mongoose = require('mongoose')
const router= express.Router()
const PostOnDb = require('../models/Post')
const verifyToken = require('../validation/verifywebtoken')

// middleware that is specific to this router
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

router.use('/addpost', function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/addpost',(req,res)=>{
	 res.render('add-post')
	// res.json({user:req.user})
})

// Create (Insert) post in to db
router.post('/add',verifyToken,function (req, res) {
	try{
	const {title, description}=req.body;
	const newpost ={
					title,
					description
						}
  	const post12 = new PostOnDb(newpost)
	

  post12.save()
  res.redirect('/')
  
	}catch(err){
		res.status(500).json({ error: err});
	}
	
})

router.get('/update/:id',async (req,res)=>{

const PostUpdate = await PostOnDb.findOne({_id:req.params.id});
// res.json(singlePOst)
	res.render('update-post',{data:PostUpdate})
})


//Update post
router.post('/update', async function (req, res) {
			
	const {_id,title,description}=req.body;
	try{
	
		const singlePOst = await PostOnDb.findById(_id);
					
			singlePOst.title =req.body.title;
			singlePOst.description=req.body.description;
			singlePOst.date= Date.now();
			const saved = await singlePOst.save();
		
			 res.redirect('/')
			 // res.json(singlePOst)

	}catch(err){
		res.status(500).json({ error: err});
	}
	  
})

//Delete Post 
router.get('/delete/:id', (req,res)=>{
	try{
	// const _id = req.params;
	
	PostOnDb.findByIdAndRemove(req.params.id).exec();
	res.redirect('/')
	// res.json({Id : req.params.id})

	}catch(err){
		res.status(500).json({ error: err});
	}
	})


module.exports = router