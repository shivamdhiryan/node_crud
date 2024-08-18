const express = require('express');
const router = express.Router();
const Menu = require('../models/menuData');

// post route to add a menu
router.post('/',async(req,res)=>{
    try{
        const data = req.body;
        const newMenu = new Menu(data);

        const response = await newMenu.save();
        console.log("data saved");
        res.status(200).json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
})


// get route to display a menu
router.get('/',async(req,res)=>{
    try{
         const data = await Menu.find();
         console.log('data fetched');
         res.status(200).json(data);
    }
    catch(error){
      console.log(error);
      res.status(500).json({error:"Internal Server Error"});
    }
  })

//parameter router taste find
router.get('/:taste',async(req,res)=>{
  const taste = req.params.taste;
  try{
    if(taste == "sweet" || taste == "spicy" || taste == "sour"){
      const data = await Menu.find({taste:taste});
      console.log("data fetched");
      res.status(200).json(data);
    }
  }
  catch(error){
    console.log(error);
    res.status(500).json({error:"Internal Server Error"});
  }
})


// Update the data of the menu
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatePersonData = req.body;
    const response = await Menu.findByIdAndUpdate(
      personId,
      updatePersonData,
      {
        new: true, //Return the updated document
        runValidators: true, //Run mongoose validation
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data updated");
    res.status(400).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Delete the data of the menu
router.delete("/:id", async(req, res) => {
  try {
    const peopleId = req.params.id;
    const response = await Menu.findByIdAndDelete(peopleId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data deleted");
    res.status(400).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;