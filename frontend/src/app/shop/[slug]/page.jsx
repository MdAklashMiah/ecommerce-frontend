"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import ProductDetails from '@/components/products/ProductDetails'
import { useGetSingleProductQuery } from '@/slices/productApiSlice'
import { Loader2 } from 'lucide-react'

const ProductDetailsPage = () => {
  const { slug } = useParams()
  const { data: productData, isLoading, error } = useGetSingleProductQuery(slug)

  if (isLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <Loader2 className="w-10 h-10 animate-spin text-black mb-4" />
      <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px]">Loading Essence...</p>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-red-500 font-bold">Failed to load product details.</p>
    </div>
  )

  return (
    <ProductDetails product={productData?.data} />
  )
}

export default ProductDetailsPage