"use client"

import { useState } from "react"
import { ProductsProvider } from "@/context/products-context"
import ProductsTable from "@/components/products-table"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import CreateProductModal from "@/components/create-product-modal"

export default function Dashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <ProductsProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header
            onCreateProduct={() => setIsCreateModalOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Products</h1>
              <p className="text-gray-600">Manage your product inventory</p>
            </div>

            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {["All", "Electronics", "Clothing", "Books", "Home", "Beauty"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category === "All" ? null : category)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      (category === "All" && selectedCategory === null) || category === selectedCategory
                        ? "bg-primary text-white"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <ProductsTable searchQuery={searchQuery} categoryFilter={selectedCategory} />
          </main>
        </div>

        <CreateProductModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      </div>
    </ProductsProvider>
  )
}
