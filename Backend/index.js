const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

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

// API Creation
app.get('/', (req, res) => {
    res.send('Express App is Running');
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: uploadDir, // Absolute path to the directory
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`); // Use unique filename
    }
});

const upload = multer({ storage: storage });

// Serve static files for uploaded images
app.use('/images', express.static(uploadDir));

// Upload Endpoint for images
app.post('/upload', upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'No file uploaded' });
    }
    res.json({
        success: 1,
        image_url: `https://shop-eco-backend.onrender.com/images/${req.file.filename}`
    });
});

// Product Schema
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
        default: Date.now, // Fixed typo in `default`
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

// User Schema
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// User Signup Endpoint
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "Existing user found with same email address" });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });

    await user.save();

    const data = {
        user: {
            id: user.id,
        }
    };
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
});

// User Login Endpoint
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = { user: { id: user.id } };
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        } else {
            res.status(401).json({ success: false, errors: 'Wrong Password' });
        }
    } else {
        res.status(404).json({ success: false, errors: "Wrong Email ID" });
    }
});

// Fetch New Collections Endpoint
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollections = products.slice(1).slice(-8);
    res.send(newcollections);
});

// Middleware to Fetch User
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
};

// Add to Cart Endpoint
app.post('/addtocart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added");
});

// Remove from Cart Endpoint
app.post('/removefromcart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    }
    res.send("Removed");
});

// Get Cart Data Endpoint
app.post('/getcart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
});

// Start Server
app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port);
    } else {
        console.error("Error:", error);
    }
});
