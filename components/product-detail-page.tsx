"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { fetchProducts, deleteProductAsync } from "@/lib/redux/slices/productsSlice"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowLeft, Edit, Trash } from "lucide-react"
import EditProductModal from "@/components/edit-product-modal"

export default function ProductDetailPage({ productId }: { productId: string }) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { items: products, loading } = useAppSelector((state) => state.products)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts())
    }
  }, [dispatch, products.length])

  const product = products.find((p) => p.id === productId)

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!product) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <h2 className="text-2xl font-bold">Product Not Found</h2>
            <p className="text-muted-foreground mt-2">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => router.push("/products")} className="mt-4">
              View All Products
            </Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const handleDelete = async () => {
    await dispatch(deleteProductAsync(productId))
    router.push("/products")
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardContent className="p-6">
              <div className="aspect-square relative rounded-md overflow-hidden border border-gray-200 mb-4">
                <Image
                  src={product.image || "/placeholder.svg?height=300&width=300"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-2">
                <Badge>{product.category}</Badge>
                <div className="flex justify-between items-center">
                  <div className="font-medium text-sm">Price</div>
                  <div className="font-bold text-lg">NGN {product.price.toFixed(2)}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="font-medium text-sm">Stock</div>
                  <div className="font-bold text-lg">{product.stock} units</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="font-medium text-sm">Status</div>
                  <Badge variant={product.stock > 0 ? "outline" : "destructive"}>
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl">{product.name}</CardTitle>
              <CardDescription>Product ID: {product.id}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Product Details</h3>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    <div className="sm:col-span-2">
                      <dt className="text-sm text-muted-foreground">Category</dt>
                      <dd className="font-medium">{product.category}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Price</dt>
                      <dd className="font-medium">NGN {product.price.toFixed(2)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Stock</dt>
                      <dd className="font-medium">{product.stock} units</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsEditModalOpen(true)}>
                <Edit className="mr-2 h-4 w-4" /> Edit Product
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash className="mr-2 h-4 w-4" /> Delete Product
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the product "{product.name}" from the
                      database.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </div>
      </div>

      <EditProductModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} product={product} />
    </DashboardLayout>
  )
}
