require('dotenv/config')
const express = require('express');
const passport = require('passport');
const axios = require('axios');
const flash = require('express-flash');
const bodyParser = require('body-parser')
const exphbs  = require('express-handlebars');
const session = require("express-session");
const path  = require('path');
const Posts = require('./route/posts')
const Admin = require('./route/admin')
const AuthRoute = require('./route/auth')
const PostOnDb = require('./models/Post')
const MethodOverRide = require('method-override')

require('./models/connection')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(MethodOverRide('_method'));

const initializePassport = require('./validation/passport-config')

initializePassport(passport);

app.use(flash());
app.use(session({
    //secret: process.env.SECRET,
    secret: 'secret',
    resave: false,
    saveUninitialized: false
    //     cookie: {
    //     maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    // }
}));

app.use(passport.initialize());
app.use(passport.session());


// app.use('/posts',express.static('public'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
	layoutsDir:`${__dirname}/views/layouts`,
	extname:'hbs',
	defaultLayout:'index',
	// partialsDir:`${__dirname}/views/partials`
}));

app.use(express.static(path.join(__dirname,'/public')))
//Read post from Db 
app.get('/',async (req,res)=>{
	try{
		const totalPost = await PostOnDb.find();
		
		 res.render('main',{data:totalPost});
    
	}catch(e){
		res.status(500).json({data:e})
	}
	
})
app.get('/convert', (req,res)=>{
	
	res.render('home.ejs',{name:"Wonde Shi",age:34})
})
app.post('/convert', async(req,res)=>{

	 const {reference_date, amount , src_currency,dest_currency} = req.body;
	
	try{
	const result = await axios(`http://localhost:7040/convert?reference_date=${reference_date}&amount=${amount}&src_currency=${src_currency}&dest_currency=${dest_currency}`);
	const convertedCurrency = JSON.stringify(result.data.data);

	console.log("Resquest Data:"+ JSON.stringify(req.body));
    console.log("Convert Data: " + convertedCurrency);
    if(result){
   	 return	res.render('result.ejs',{amountNew:JSON.parse(convertedCurrency)});
    }
    return res.redirect('/convert');   
	}catch(e){
	console.log("Error : ",e)
	}



})
app.use('/posts',Posts);
app.use('/admin',Admin);
app.use('/auth',AuthRoute);


app.listen(5000 ,()=>{
	console.log("Server is connected!!!")
})