const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 4000;  // Use environment variable for production port

app.use(express.json());
app.use(cors());

// DATABASE CONNECTION WITH MongoDB
mongoose.connect("mongodb+srv://your_mongo_connection_string")
    .then(() => {
        console.log("MongoDB connected successfully.");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Upload endpoint for images
app.use('/images', express.static('upload/images'));

app.post('/upload', upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'No file uploaded' });
    }
    res.json({
        success: 1,
        image_url: `https://shop-eco-backend.onrender.com/images/${req.file.filename}`  // Production URL
    });
});

// Routes for Products, User Registration, Login, etc. (No changes needed for routes)
// ...

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
