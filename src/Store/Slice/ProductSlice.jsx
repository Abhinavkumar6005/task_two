import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  favorites: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const product = action.payload;
      const existing = state.favorites.find((item) => item.id === product.id);
      if (!existing) {
        state.favorites.push({ ...product, quantity: 1 }); // ✅ Add with quantity
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.favorites.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1; // ✅ Increase quantity
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.favorites.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1; // ✅ Decrease quantity
        } else {
          state.favorites = state.favorites.filter((i) => i.id !== action.payload); // ✅ Remove if 0
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
export const {
  addToFavorites,
  removeFromFavorites,
  increaseQuantity,
  decreaseQuantity,
} = productSlice.actions;