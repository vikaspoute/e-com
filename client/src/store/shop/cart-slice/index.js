import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for cart API
const BASE_URL = "http://localhost:5000/api/shop/cart";

// Initial State
const initialState = {
  cart: [],
  loading: false,
  error: null,
  total: 0,
  totalItems: 0,
};

// Async Thunks for Cart Operations
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/add`, {
        productId,
        quantity,
        userId,
      });
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding to cart");
    }
  }
);

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/get/${userId}`);
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching cart");
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, quantity, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/update-cart`, {
        productId,
        quantity,
        userId,
      });
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating cart");
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${userId}/${productId}`);
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error removing from cart"
      );
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/clear`);
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error clearing cart");
    }
  }
);

// Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.cart = null;
      state.total = 0;
      state.totalItems = 0;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // Add to Cart
    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      console.log(action);

      state.loading = false;
      state.cart = action?.payload;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get Cart
    builder.addCase(getCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.total = action.payload.total;
      state.totalItems = action.payload.totalItems;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update Cart Item Quantity
    builder.addCase(updateCartItemQuantity.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.total = action.payload.total;
      state.totalItems = action.payload.totalItems;
    });
    builder.addCase(updateCartItemQuantity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Remove From Cart
    builder.addCase(removeFromCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.total = action.payload.total;
      state.totalItems = action.payload.totalItems;
    });
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Clear Cart
    builder.addCase(clearCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(clearCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.total = 0;
      state.totalItems = 0;
    });
    builder.addCase(clearCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default cartSlice.reducer;
