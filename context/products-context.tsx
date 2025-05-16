"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/types/product"

interface ProductsContextType {
  products: Product[]
  loading: boolean
  error: string | null
  addProduct: (product: Product) => Promise<void>
  updateProduct: (product: Product) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  getProductById: (id: string) => Product | undefined
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        // In a real app, this would be an API call
        // For this demo, we'll use a mock API with a timeout
        const response = await fetch("/api/products")

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data = await response.json()
        setProducts(data)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const getProductById = (id: string): Product | undefined => {
    return products.find((product) => product.id === id)
  }

  const addProduct = async (product: Product): Promise<void> => {
    try {
      // In a real app, this would be an API call
      // For this demo, we'll simulate an API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Add the new product to the state
      setProducts((prevProducts) => [product, ...prevProducts])
    } catch (err) {
      console.error("Error adding product:", err)
      throw new Error("Failed to add product")
    }
  }

  const updateProduct = async (product: Product): Promise<void> => {
    try {
      // In a real app, this would be an API call
      // For this demo, we'll simulate an API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update the product in the state
      setProducts((prevProducts) => prevProducts.map((p) => (p.id === product.id ? product : p)))
    } catch (err) {
      console.error("Error updating product:", err)
      throw new Error("Failed to update product")
    }
  }

  const deleteProduct = async (id: string): Promise<void> => {
    try {
      // In a real app, this would be an API call
      // For this demo, we'll simulate an API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Remove the product from the state
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id))
    } catch (err) {
      console.error("Error deleting product:", err)
      throw new Error("Failed to delete product")
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider")
  }
  return context
}
