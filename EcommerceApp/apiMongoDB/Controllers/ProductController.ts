import express, {Request, Response} from 'express';
import { ProductParams } from '../dto/Product';
import { PRODUCTS } from '../Models/ProductModel';

const path = 'http://localhost:9000/assets/'
export const createProduct = async (req: Request, res: Response) => {
    const {name, price, oldPrice, description, quantity, inStock, isFeatured, category, createAt} = <ProductParams>req.body;
    const files = req.files as [Express.Multer.File];
    const images = files.map ((file: Express.Multer.File) => path + file.filename)

    const product = new PRODUCTS({
        name: name,
        images: images,
        price, oldPrice, description, quantity, inStock, isFeatured, category,
        createAt: new Date()
    });

    try{
        console.log(product)
        await product.save();
        res.status(200).json(`Product create successfully :-) + ${path}!!!`)
    }catch(error){
        res.status(500).json(`Failed to create Product ${error} :-(`)
    }
}

export const getProductByCatID = async ( req: Request, res: Response) => {
    console.log(req.params.CatID)
    try {
        const result = await PRODUCTS.find ({ category: req.params.CatID})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(`ProductByID fetch failed ${error} :-(`)
    }
}

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const result = (await PRODUCTS.find()).sort({ createAt: -1})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(`ProductByID fetch failed ${error} :-(`)
    }
}