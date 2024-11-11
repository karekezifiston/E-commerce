const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(cors());

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
    // Update image URL to use Render URL instead of localhost
    res.json({
        success: 1,
        image_url: `https://e-commerce-backend.onrender.com/images/${req.file.filename}` // Update with your Render backend URL
    });
});

// Schema for Creating Products
const Product = mongoose.model('Product', {
   id: {
      type: Number,
      required: true,
  },
  name: {
   type: 'string',
   required: true,
  },
  image: {
   type: 'string',
   required: true,
  },
  category: {
   type: 'String',
   required: true,
  },
  price: {
   type: Number,
   required: true,
  },
  date: {
   type: Date,
   defoult: Date.now,
  },
  avilable: {
   type: Boolean,
   default: true,
  },
});

// Add Product
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
   console.log(product);
   await product.save();
   console.log('Saved');
   res.json({
      success: true,
      name: req.body.name,
   });
});

// Remove Product
app.post('/removeproduct', async (req, res) => {
   await Product.findOneAndDelete({ id: req.body.id });
   console.log("Removed");
   res.json({
      success: true,
      name: req.body.name
   });
});

// Get All Products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log('All Products Fetched');
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
    }
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

    const data = {
        user: {
            id: user.id
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
            const data = {
                user: {
                    id: user.id
                }
            };
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: 'Wrong Password' });
        }
    } else {
        res.json({ success: false, errors: "Wrong Email Id" });
    }
});

// New Collections Endpoint
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollections = products.slice(1).slice(-8);
    console.log('NewCollections Fetched');
    res.send(newcollections);
});

// Middleware to Fetch User
const fetchUser = async (req, res, next) => {
   const token = req.header('auth-token');
   if (!token) {
     res.status(401).send({ errors: "Please authenticate using a valid token" });
   } else {
    try {
       const data = jwt.verify(token, 'secret_ecom');
       req.user = data.user;
       next();
    } catch (error) {
      res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
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
    console.log("removed", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    }
    res.send("Removed");
});

// Get Cart Data Endpoint
app.post('/getcart', fetchUser, async (req, res) => {
   console.log('get cart');
   let userData = await Users.findOne({ _id: req.user.id });
   res.json(userData.cartData);
});

// Set up Render URL for your backend port dynamically if needed
const port = process.env.PORT || 4000;

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port);
    } else {
        console.log("Error: " + error);
    }
});
