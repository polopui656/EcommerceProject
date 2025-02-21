import express, {Request, Response} from "express";
import multer from "multer";
import path from "path";
import { createProduct, getAllProducts, getProductByCatID } from "../Controllers";

const router = express.Router();
const imagesStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'assets')
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name + "-" + Date.now() + path.extname(file.originalname))
    }
})

const images = multer({storage: imagesStorage}).array('images');

router.post('/createProduct', images, createProduct);
router.get('/getProductByCatID/:CatID', getProductByCatID);
router.get('/getAllProducts',getAllProducts)

export {router as ProductRoute};