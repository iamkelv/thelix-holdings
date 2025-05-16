"use client"

import { useState, useEffect } from "react"
import { useAppDispatch } from "@/lib/redux/hooks"
import { fetchProducts } from "@/lib/redux/slices/productsSlice"
import DashboardLayout from "@/components/dashboard-layout"
import ProductsTable from "@/components/products-table"
import CreateProductModal from "@/components/create-product-modal"

export default function ProductsPage() {
  const dispatch = useAppDispatch()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <DashboardLayout
      title="Products"
      description="Manage your product inventory"
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onCreateClick={() => setIsCreateModalOpen(true)}
    >
      <div className="p-6">
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
      </div>

      <CreateProductModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </DashboardLayout>
  )
}
