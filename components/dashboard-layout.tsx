"use client"

import type { ReactNode } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"

interface DashboardLayoutProps {
  children: ReactNode
  title?: string
  description?: string
  searchQuery?: string
  onSearchChange?: (query: string) => void
  onCreateClick?: () => void
}

export default function DashboardLayout({
  children,
  title,
  description,
  searchQuery,
  onSearchChange,
  onCreateClick,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          title={title}
          onCreateProduct={onCreateClick}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
        />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
