
const mongoose = require('mongoose');

const db = mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.DB_PASSWORD}@wscluster-hikgh.mongodb.net/post?retryWrites=true&w=majority`,
			{useNewUrlParser: true ,useUnifiedTopology: true},
			()=>{
			console.log("DB Connected Successfly.")
		})

module.exports = db