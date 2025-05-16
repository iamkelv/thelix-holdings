import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Product } from "@/types/product"

interface ProductsState {
  items: Product[]
  loading: boolean
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
}

// Async thunks
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  // Simulate API call
  const response = await fetch("/api/products")
  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }
  return response.json()
})

export const addProductAsync = createAsyncThunk("products/addProduct", async (product: Product) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  return product
})

export const updateProductAsync = createAsyncThunk("products/updateProduct", async (product: Product) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  return product
})

export const deleteProductAsync = createAsyncThunk("products/deleteProduct", async (id: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  return id
})

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch products"
      })
      // Add product
      .addCase(addProductAsync.fulfilled, (state, action: PayloadAction<Product>) => {
        state.items.unshift(action.payload)
      })
      // Update product
      .addCase(updateProductAsync.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.items.findIndex((product) => product.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      // Delete product
      .addCase(deleteProductAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((product) => product.id !== action.payload)
      })
  },
})

export default productsSlice.reducer
