const express = require("express");
const router = express.Router();
const Person = require("../models/person");
const { jwtAuthMiddleware } = require("../middlewares/jwt");
const {
  signUp,
  loginUp,
  getProfile,
  getAllUser,
  workTime,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Post route to add a person
// router.post("/signup", async (req, res) => {
//   try {
//     const data = req.body;
//     // Create a new Person document using the Mongoose model
//     const newPerson = new Person(data);
//     const response = await newPerson.save();
//     console.log("data saved");

//     const payload = {
//       id:response.id,
//       username:response.username
//     }
//     const token = generateToken(payload);
//     console.log("Token is : ",token);

//     res.status(200).json({response:response,token:token});
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
router.post("/signup", signUp);
router.post("/login", loginUp);
router.get("/profile", jwtAuthMiddleware, getProfile);
router.get("/", jwtAuthMiddleware, getAllUser);
router.get("/:workType", jwtAuthMiddleware, workTime);
router.put("/:id", jwtAuthMiddleware, updateUser);
router.delete("/:id", jwtAuthMiddleware, deleteUser);

// router.post("/login",async(req,res)=>{
//   try{

//     const {username,password} = req.body;
//     const user = await Person.findOne({username:username});
//     if(!user || !(await user.comparePassword(password))){
//       return res.status(401).json({error:"Invalid username or password"});
//     }

//     // generate token
//     const payload = {
//       id:user.id,
//       username:user.username
//     }

//     const token = generateToken(payload);
//     console.log(token);
//     res.json({token});
//   }
//   catch(err){
//        console.error(err);
//       res.status(500).json({error:"Internal Server Error"});
//   }
// }
// )

// router.get("/profile",jwtAuthMiddleware,async(req,res)=>{
//   try{
//     const userData = req.user;
//     const userId = userData.id;
//     const response = await Person.findById(userId);
//      res.status(200).json({response});
//   }
//   catch(err){
//     res.status(500).json({error:"Internal Server Error"});
//   }
// })

// router.get("/",jwtAuthMiddleware, async (req, res) => {
//   try {
//     const data = await Person.find({});
//     console.log("data fetched");
//     res.status(200).json(data);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// work of person
// router.get("/:workType", async (req, res) => {
//   try {
//     const work = req.params.workType;
//     if (work == "chef" || work == "waiter" || work == "manager") {
//       const data = await Person.find({ work: work });
//       console.log("data fetched");
//       res.status(200).json(data);
//     } else {
//       res.status(400).json({ error: "Invalid Work Type" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Update the data of the person
// router.put("/:id", async (req, res) => {
//   try {
//     const personId = req.params.id;
//     const updatePersonData = req.body;
//     const response = await Person.findByIdAndUpdate(
//       personId,
//       updatePersonData,
//       {
//         new: true, //Return the updated document
//         runValidators: true, //Run mongoose validation
//       }
//     );
//     if (!response) {
//       return res.status(404).json({ error: "Person not found" });
//     }
//     console.log("data updated");
//     res.status(400).json(response);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Delete the data of the person
// router.delete("/:id", async(req, res) => {
//   try {
//     const peopleId = req.params.id;
//     const response = await Person.findByIdAndDelete(peopleId);
//     if (!response) {
//       return res.status(404).json({ error: "Person not found" });
//     }
//     console.log("data deleted");
//     res.status(400).json(response);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

module.exports = router;

// Save the new Person to the database
// newPerson.save((err,savedPerson)=>{
//     if(error){
//         console.log('Error saving person : ',error);
//         res.status(500).json({error:"Internal server error"})
//     } else {
//         console.log("data saved successfully");
//         res.status(200).json(savedPerson);
//     }
// })
