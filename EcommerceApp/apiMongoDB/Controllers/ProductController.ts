/*import express, {Request, Response} from 'express';
import {PRODUCTS} from '../Models/ProductModel';
import { ProductParam } from '../dto/Product';

const path = 'http://localhost:8888/assets/'
export const createProduct = async (req: Request, res: Response) => {
    const {name, price, oldPrice, description, quantity, inStock, isFeatured, category} = <ProductParam>req.body;
    const files = req.files as [Express.Multer.File];
    const images = files.map ((file: Express.Multer.File) => path + file.filename)

    const product = new PRODUCTS({
        name: name,
        images: images,
        price, oldPrice, description, quantity, inStock, isFeatured, category
    });

    try{
        console.log(product)
        await product.save();
        res.status(200).json(`Product create successfully :-) + ${path}!!!`)
    }catch(error){
        res.status(500).json(`Failed to create Product ${error} :-(`)
    }
}*/