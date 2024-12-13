import foodModel from "../models/productModel.js";
import fs from 'fs';

// Add food item
const addFood = async (req, res) => {
  // Check if the file is uploaded
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No image file uploaded!" });
  }

  const image_filename = `${req.file.filename}`;

  // Create new food document
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    // Save food to database
    await food.save();
    res.json({ success: true, message: "Food Added Successfully!" });
  } catch (error) {
    console.error("Error saving food:", error);
    res.status(500).json({ success: false, message: "Error saving food item. Please try again later." });
  }
};

//  all food list
const listFood =async (req,res)=>{
      try {
           const foods =await foodModel.find({});
           res.json({success:true,data:foods})
      } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
      }
}

// Remove food item
const removeFood =async(req,res)=>{
  try {
      const food =await foodModel.findById(req.body.id);
      fs.unlink(`uploads/${food.image}`,()=>{})

      await foodModel.findByIdAndDelete(req.body.id);
      res.json({success:true,message:"Food Removed"})
  } catch (error) {
    console.log(Error);
    res.json({success:false,message:"Error"})
  }
}

export { addFood,listFood,removeFood};
