import productModel from "../models/productModel.js";
import fs from 'fs';

// Add product item
const addProduct = async (req,res) => {
  // Check if the file is uploaded
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No image file uploaded!" });
  }

  const image_filename = `${req.file.filename}`;
 
  // Create new product document
  const product = new productModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image:image_filename
  });

  try {
    // Save product to database
    await product.save();
    res.json({ success: true, message: "product Added Successfully!" });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ success:false, message: "Error saving product item. Please try again later." });
  }
};

//  all product list
const listProduct =async (req,res)=>{
      try {
           const products =await productModel.find({});
           res.json({success:true,data:products})
      } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
      }
}

// Remove product item
const removeProduct =async(req,res)=>{
  try {
      const product =await productModel.findById(req.body.id);
      fs.unlink(`uploads/${product.image}`,()=>{})

      await productModel.findByIdAndDelete(req.body.id);
      res.json({success:true,message:"Product Removed"})
  } catch (error) {
    console.log(Error);
    res.json({success:false,message:"Error"})
  }
}

export { addProduct,listProduct,removeProduct};
