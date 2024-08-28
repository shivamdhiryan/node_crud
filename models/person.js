const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the Person Schema

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
});

personSchema.pre('save',async function(next){
  const user = this;

  // hash the password only if it has been modified (or is new)
  if (!user.isModified('password')) return next(); // Proceed if the password is not modified or not created
  try{
      const salt  = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(user.password,salt);
      user.password = hashPassword;
      next()
  }
  catch(error){
     next(error);
  }
})

personSchema.methods.comparePassword = async function(candidatePassword){
  try{
   const isMatch = await bcrypt.compare(candidatePassword,this.password);
   return isMatch;
  }
  catch(err){
   throw err;
  }
}

// Create person Model
const Person = mongoose.model("Person",personSchema);
module.exports = Person;
