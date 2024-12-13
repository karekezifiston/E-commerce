const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors({ origin: '*' })); // Allow all origins

const port = process.env.PORT || 4000; // Use environment variable for production port

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'upload', 'images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// DATABASE CONNECTION WITH MongoDB
mongoose.connect("mongodb+srv://karekezifiston33:karasira@cluster0.08ojd.mongodb.net/e-commerce")
    .then(() => {
        console.log("MongoDB connected successfully.");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });

// Image Storage Engine for multer
const storage = multer.diskStorage({
    destination:"upload", // Absolute path to the directory
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`); // Use unique filename
    }
});

// Multer upload configuration
const upload = multer({ storage:storage });

// Serve static files for uploaded images
app.use('/images', express.static(uploadDir));

// Image upload endpoint
app.post('/upload', upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'No file uploaded' });
    }
    res.json({
        success: 1,
        image_url: `https://shop-eco-backend.onrender.com/images/${req.file.filename}`
    });
});

// Product Schema for MongoDB
const Product = mongoose.model('Product', {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

// Add Product Endpoint
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        price: req.body.price,
    });
    await product.save();
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Delete Product Endpoint
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({
        success: true,
        message: "Product removed successfully",
    });
});

// Get All Products Endpoint
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    res.send(products);
});

// Start Server
app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port);
    } else {
        console.error("Error:", error);
    }
});
