const passport = require('passport');
const User =require('../models/User');
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy


module.exports = function initializedPasport (passport){

passport.use(new LocalStrategy({usernameField:'email'},
   function(email, password, done) {
   
		const userNew = User.findOne({ email: email });
          
            if (!userNew) { 
            	return done(null, false, {message:'No user with that Email.'}) 
            }

        try{
            // const isValid = validPassword(password, user.hash, user.salt);
            const isValid = bcrypt.compare(password,userNew.password);
            if (isValid) {
                return done(null, userNew);
            } else {
                return done(null, false, {message:'Password incorrect ..'});
            }
        } 	     
        catch(err) {   
            done(err);
        }
}));
passport.serializeUser(function(userNew, done) {
    done(null, userNew.id);
});

passport.deserializeUser((id, done)=> {
    User.findById(id, (err, user)=> {
        if (err) { return done(err); }
        done(null, user);
    });
});

}