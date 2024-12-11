import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  pagination: {
    totalProducts: 0,
    totalPages: 0,
    currentPage: 1,
  },
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "products/fetchAllFilteredProducts",
  async (
    { page = 0, limit = 10, category = "", brand = "", sortBy = "" },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/shop/products/get",
        {
          params: { page, limit, category, brand, sortBy },
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch products"
      );
    }
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create Product
    builder

      // Fetch All Products
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pagination = {
          totalProducts: action.payload.totalProducts,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage,
        };
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.products = [];
      });
  },
});

export default shoppingProductSlice.reducer;
