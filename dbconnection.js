const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection URL
// const dbURI = "mongodb://127.0.0.1:27017/hotels"
const dbURI = process.env.MONGODB_URL;

// Set Up MongoDB connection
mongoose.connect(dbURI)

// Get the default connection 
// Mongoose maintains a default connection onject representing the mongodDB connection.
const db = mongoose.connection;

db.on('connected',()=>{
    console.log("Connected to MongoDB server");
})

db.on('error',(err)=>{
    console.log("MongDB connection err",err);
})

db.on('disconnected',()=>{
    console.log("MongoDB Disconnected");
})

// Export the database connection
module.exports = db;

