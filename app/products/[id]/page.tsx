import ProductDetailPage from "@/components/product-detail-page"

export default function ProductDetail({ params }: { params: { id: string } }) {
  return <ProductDetailPage productId={params.id} />
}
