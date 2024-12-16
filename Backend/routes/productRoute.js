import express from "express";
import multer from "multer";
import { addProduct, listProduct, removeProduct } from "../controllers/productController.js";

const productRouter = express.Router();

// Multer Storage Engine
const storage =multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
       return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage });

// Product Routes
productRouter.post("/add", upload.single("image"), addProduct);
productRouter.get("/list", listProduct);
productRouter.post("/remove", removeProduct);

export default productRouter;
