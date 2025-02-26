import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartItem, ProductListParams } from "../TypesCheck/productCartTypes";

export const CartSlide = createSlice ({
    name: 'cart',
    initialState: {
        cart: [],
        length: 0
    },
    reducers: {
        addToCart: (state: CartItem, action: PayloadAction<ProductListParams>) => {
            const existingItem = state.cart.find(item => item._id === action.payload._id);
            if(!existingItem) {
                state.cart.push(action.payload);
            }
        },
        increaseQuantity: (state: CartItem, action: PayloadAction<ProductListParams>) => {
            const existingItem = state.cart.find(item => item._id === action.payload._id);
            if(existingItem) {
                existingItem.quantity ++;
            }
        },
        decreaseQuantity: (state: CartItem, action: PayloadAction<ProductListParams>) => {
            const existingItem = state.cart.find(item => item._id === action.payload._id);
            if(existingItem) {
                existingItem.quantity --;
            }
        },
        removeFromCart: (state: CartItem, action: PayloadAction<string>) => {
            const removeItem = state.cart.filter(item => item._id !== action.payload);
            state.cart = removeItem;
        },
        clearCart: (state) => {
            state.length = 0;
            state.cart = [];
        },
    }
})

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart} = CartSlide.actions;
export default CartSlide.reducer;