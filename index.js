const express = require("express");
const app = express();
const db = require("./connection/dbconnection");
require("dotenv").config();
const passport = require('./auth');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
// Middleware function
const logRoute = (req,res,next)=>{
  console.log(`${new Date().toString()} and the url ${req.originalUrl}`);
  next();
}
app.use(logRoute);


// Initialize Passport and use session middleware
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local",{session:false});


app.get("/", (req, res) => {
  res.send("connection is completed");
});

const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");
app.use("/person", personRoutes);
app.use("/menu",localAuthMiddleware, menuRoutes);

// This is the Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is listening ${PORT}`);
});
