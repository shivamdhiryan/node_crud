const Person = require('./models/person');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Configure Passport to use a local strategy
passport.use(new LocalStrategy(async (username, password, done)=> {
    // Replace with your actual user authentication logic
    try{
        // console.log("Received credentials:",username,password);
        const user = await Person.findOne({username});
        if(!user)
          return done(null,false,{message:"Incorrect username"})
        
        const isPasswordMatch = await user.comparePassword(password);
        if(isPasswordMatch)
          return done(null,user);
        else 
          return done(null,false,{message:"Incorrect password."});
    } 
    catch(error){
        return done(error);
    }
  }
));

module.exports = passport;