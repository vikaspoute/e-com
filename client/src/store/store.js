import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "./product-slice";
import shoppingProductSlice from "./shop/shop-slice";
import cartSlice from "./shop/cart-slice/index";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductSlice,
    shopProducts: shoppingProductSlice,
    shopCart: cartSlice,
  },
});

export default store;
