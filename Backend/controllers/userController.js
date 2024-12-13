import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';  // Instead of 'bcrypt'
import validator from "validator";

// Login user
const loginUser = async (req, res) => {
   const {email,password} =req.body;
   try {
     const user =await userModel.findOne({email})

     if (!user) {
        return res.json({success:false,message:"User Doesn't exist"})
     }
     const isMatch =await bcrypt.compare(password,user.password);

     if (!isMatch) {
        return res.json({success:false,message:"Innvalid credentials"})
     }

     const token =createToken(user._id);
     res.json({success:true,token})
     
   } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
   }
};

const createToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing in the environment variables.");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register User
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // Checking if User already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User Already exists" });
    }

    // Validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a Strong password" });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating a new user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };
