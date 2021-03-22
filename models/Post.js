const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title:{
	type:String,
	required:[true, 'Title is require']
	},
	description:{
	type:String,
	required:[true, 'Description is require']
	},
	date:{
	type:Date,
	default:Date.now()
	}
})

module.exports = mongoose.model('Newpost',PostSchema);