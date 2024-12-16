import productModel from "../models/productModel.js";
import fs from "fs";

// Add Product
const addProduct = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No image file uploaded!" });
  }

  const image_filename = req.file.filename;

  const product = new productModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await product.save();
    res.json({ success: true, message: "Product added successfully!" });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ success: false, message: "Error saving product. Please try again later." });
  }
};

// List Products
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    const formattedProducts = products.map((product) => ({
      ...product.toObject(),
      imageUrl: `${req.protocol}://${req.get("host")}/images/${product.image}`,
    }));
    res.json({ success: true, data: formattedProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Error fetching products." });
  }
};

// Remove Product
const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    // Delete product image if it exists
    const imagePath = `uploads/${product.image}`;
    fs.exists(imagePath, (exists) => {
      if (exists) {
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
            return res.status(500).json({ success: false, message: "Error deleting product image." });
          }
        });
      }
    });

    // Delete the product from the database
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully!" });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ success: false, message: "Error removing product." });
  }
};

export { addProduct, listProduct, removeProduct };
