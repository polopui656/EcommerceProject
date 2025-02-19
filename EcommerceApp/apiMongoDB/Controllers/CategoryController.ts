import express, {Request, Response} from 'express';
import { CATEGORIES } from '../Models/CategoryModel';
import { CategoryObj } from '../dto/Categories';

export const createCategory = async (req: Request, res: Response) => {
    const {name} = <CategoryObj>req.body;
    const files = req.files as [Express.Multer.File];
    const path = 'http://localhost:9000/assets'
    const images = files.map((file: Express.Multer.File) => path + file.filename)

    const categories = new CATEGORIES ({
        name: name,
        images: images
    });

    try{
        console.log(categories)
        await categories.save();
        res.status(200).json(`Category create successfully :-) + ${path}!!!`)
    }catch(error){
        res.status(500).json(`Failed to create Category ${error} :-(`)
    }
}
