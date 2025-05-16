"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  title?: string
  onCreateProduct?: () => void
  searchQuery?: string
  onSearchChange?: (query: string) => void
}

export default function Header({ title, onCreateProduct, searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-semibold text-gray-800 hidden md:block">{title || "Thelix Holdings"}</h2>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto">
        {onSearchChange && (
          <div className="relative flex-1 md:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}
        {onCreateProduct && <Button onClick={onCreateProduct}>Add Product</Button>}
      </div>
    </header>
  )
}
