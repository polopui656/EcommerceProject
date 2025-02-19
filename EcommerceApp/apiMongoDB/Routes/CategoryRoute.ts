import express, {Request, Response} from 'express';
import multer from 'multer';
import path from 'path';
import { createCategory } from '../Controllers';

const router = express.Router();
const imagesStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets')
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name + "-" + Date.now() + path.extname(file.originalname))
    }
})

const images = multer({ storage: imagesStorage}).array('images');

router.post('/createCategory', images, createCategory);

export {router as CategoryRoute};