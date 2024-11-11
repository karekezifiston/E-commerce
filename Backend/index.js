const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// Use dynamic port from environment variable, or fallback to 4000 if not set
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// DATABASE CONNECTION WITH MongoDB
mongoose.connect(process.env.MONGO_URI) // Use environment variable for MongoDB URI
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
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Creating Upload Endpoint for images
app.use('/images', express.static('upload/images'));

app.post('/upload', upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'No file uploaded' });
    }
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}` // Modify this if deployed on Render
    });
});

// Schema for Creating Products
const Product = mongoose.model('Product', {
    id: { type: Number, required: true },
    name: { type: 'string', required: true },
    image: { type: 'string', required: true },
    category: { type: 'String', required: true },
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    avilable: { type: Boolean, default: true },
});

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        price: req.body.price,
    });
    await product.save();
    res.json({ success: true, name: req.body.name });
});

// API for deleting products
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true, name: req.body.name });
});

// API for getting all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    res.send(products);
});

// Schema for User model
const Users = mongoose.model('Users', {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cartData: { type: Object },
    date: { type: Date, default: Date.now },
});

// User Registration Endpoint
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "Existing user found with the same email address" });
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

    const data = { user: { id: user.id } };
    const token = jwt.sign(data, process.env.SECRET_KEY); // Use environment variable for secret key
    res.json({ success: true, token });
});

// User Login Endpoint
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = { user: { id: user.id } };
            const token = jwt.sign(data, process.env.SECRET_KEY); // Use environment variable for secret key
            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: 'Wrong Password' });
        }
    } else {
        res.json({ success: false, errors: "Wrong Email Id" });
    }
});

// Endpoint for fetching new collections
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollections = products.slice(1).slice(-8);
    res.send(newcollections);
});

// Middleware to fetch user data
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using a valid token" });
    } else {
        try {
            const data = jwt.verify(token, process.env.SECRET_KEY);
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate using a valid token" });
        }
    }
};

// Endpoint to add product to cart
app.post('/addtocart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added");
});

// Endpoint to remove product from cart
app.post('/removefromcart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed");
});

// Endpoint to get cart data
app.post('/getcart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
