import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial State
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

// Async Thunks for Product Operations
export const createProduct = createAsyncThunk(
  "admin-products/create-product",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/add",
        productData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Product creation failed");
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  "adminProducts/fetchAllProducts",
  async (
    { page = 0, limit = 10, category = "", brand = "", sortBy = "" },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/get",
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

export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/products/edit/${id}`,
        productData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Product update failed");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/admin/products/delete/${id}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Product deletion failed");
    }
  }
);

// Create Slice
const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create Product
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload.product);
        state.currentProduct = action.payload.product;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All Products
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pagination = {
          totalProducts: action.payload.totalProducts,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage,
        };
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.products = [];
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (p) => p._id === action.payload.product._id
        );
        if (index !== -1) {
          state.products[index] = action.payload.product;
        }
        state.currentProduct = action.payload.product;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (p) => p._id !== action.payload.id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentProduct } = adminProductSlice.actions;

export default adminProductSlice.reducer;
