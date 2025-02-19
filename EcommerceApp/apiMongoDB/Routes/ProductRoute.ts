/*import express, {Request, Response} from "express";
import multer from "multer";
import path from "path";
import { createProduct } from "../Controller";
import { Image } from 'react-native';

const router = express.Router();
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'assets')
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name + "-" + Date.now() + path.extname(file.originalname))
    }
})

const images = multer({storage: imageStorage}).array('images');

router.post('/createProduct', images, createProduct);

export {router as ProductRoute};*/