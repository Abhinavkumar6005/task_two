import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 
export const testData = createAsyncThunk(
    "products",
    async() => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
});


export const test=createSlice({
    name:testProducts,
    initialState:{products:[],loading, error},
    reducers:{},
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

export default test.reducer;