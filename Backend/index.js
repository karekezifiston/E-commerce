const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { type } = require('os');

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
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Schema for Creating Products//
const Product=mongoose.model('Product',{
   id:{
      type:Number,
      required:true,
  },
  name:{
   type:'string',
   required:true,
  },
  image:{
   type:'string',
   required:true,
  },
  category:{
   type:'String',
   required:true,
  },
  price:{
   type:Number,
   required:true,
  },
  date:{
   type:Date,
   defoult:Date.now,
  },
  avilable:{
   type:Boolean,
   default:true,
  },

  })
  app.post('/addproduct',async(req,res)=>{
   let products =await Product.find({});
   let id;
   if(products.length >0){
      let last_product_array =products.slice(-1);
      let last_product =last_product_array[0];
      id = last_product.id+1;
   }
   else{
      id=1;
   }
   const product= new Product({
      id:id,
      name:req.body.name,
      image:req.body.image,
      category:req.body.category,
      price:req.body.price,
   });
   console.log(product);
   await product.save();
   console.log('Saved');
   res.json({
      success:true,
      name:req.body.name,
   })
})


// Creating  API for deleting products//
app.post('/removeproduct', async (req,res)=>{
   await Product.findOneAndDelete({id:req.body.id});
   console.log("Removed");
   res.json({
      success:true,
      name:req.body.name
   })
})

// Creating API getting all products//
app.get('/allproducts',async (req, res)=>{
    let products = await Product.find({});
    console.log('All Products Fetched')
    res.send(products);
})



app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port);
    } else {
        console.log("Error :" + error);
    }
});
