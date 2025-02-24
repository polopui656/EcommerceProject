export interface ProductListParams {
  _id: string;
  images: [string];
  name: string;
  price: number;
  oldPrice?: number;
  inStock?: boolean;
  isFeatured: boolean;
  color?: string;
  size?: string;
  description?: string;
  quantity: number; 
  category: string;
}

export interface FetchProductsParam {
    data: {
        Products: ProductListParams[]
        results: ProductListParams[]
    }
}