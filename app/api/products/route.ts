import { NextResponse } from "next/server"
import type { Product } from "@/types/product"


const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life",
    price: 199.99,
    category: "Electronics",
    stock: 45,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Fitness tracker with heart rate monitoring and sleep analysis",
    price: 149.99,
    category: "Electronics",
    stock: 28,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Cotton T-Shirt",
    description: "Comfortable 100% organic cotton t-shirt in various colors",
    price: 24.99,
    category: "Clothing",
    stock: 150,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "Bestselling Novel",
    description: "Award-winning fiction novel by a renowned author",
    price: 18.99,
    category: "Books",
    stock: 73,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "5",
    name: "Coffee Maker",
    description: "Programmable coffee maker with thermal carafe",
    price: 89.99,
    category: "Home",
    stock: 32,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "6",
    name: "Yoga Mat",
    description: "Non-slip exercise yoga mat with carrying strap",
    price: 29.99,
    category: "Home",
    stock: 65,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "7",
    name: "Moisturizing Cream",
    description: "Hydrating face cream with SPF 30 protection",
    price: 34.99,
    category: "Beauty",
    stock: 89,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "8",
    name: "Bluetooth Speaker",
    description: "Portable waterproof Bluetooth speaker with 12-hour playback",
    price: 79.99,
    category: "Electronics",
    stock: 51,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "9",
    name: "Denim Jeans",
    description: "Classic fit denim jeans with stretch comfort",
    price: 59.99,
    category: "Clothing",
    stock: 120,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "10",
    name: "Cookbook",
    description: "International recipes from award-winning chefs",
    price: 32.99,
    category: "Books",
    stock: 42,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "11",
    name: "Desk Lamp",
    description: "Adjustable LED desk lamp with wireless charging base",
    price: 49.99,
    category: "Home",
    stock: 38,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "12",
    name: "Face Serum",
    description: "Anti-aging vitamin C serum for all skin types",
    price: 45.99,
    category: "Beauty",
    stock: 67,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return NextResponse.json(mockProducts)
}

export async function POST(request: Request) {
  try {
    const product = await request.json()

    
    const newProduct = {
      ...product,
      id: (mockProducts.length + 1).toString(),
    }

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 400 })
  }
}
