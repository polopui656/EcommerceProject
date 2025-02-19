export interface ProductParam {
    name: string;
    images: [string];
    price: number;
    oldPrice: number;
    description: string;
    quantity: number;
    inStock: boolean;
    isFeatured: boolean;
    category: string; 
}