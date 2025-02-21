import mongoose, {Schema} from "mongoose";
import { CategoryObj } from "../dto/Categories";
import { ProductParams } from '../dto/Product';

const CategorySchema = new Schema(
    {
        name: {
            type:String,
            require: true
        },
        images: {
            type: [String]
        }
    },
    {
        toJSON: {
            transform(doc, ret){
                delete ret.__V;
                delete ret.createAt;
                delete ret.updateAt;
            }
        },
        timestamps: true
    }
);

const CATEGORIES = mongoose.model<CategoryObj>("categories", CategorySchema)

export {CATEGORIES}

/*
const ProductSchema = new Schema({
    name: {
        type: String, required: true,
    },
    images: {
        type: String, required: true,
    },
    price: {
        type: Number,
    },
    oldPrice: {
        type: Number,
    },
    description: {
        type: String, required: true,
    },
    quantity: {
        type: Number, required: true,
        min: 0,
        max: 9999,
    },
    inStock: {
        type: Boolean, required: false,
    },
    isFeatured: {
        type: Boolean, required: false,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: "Category"
    },
})

*/