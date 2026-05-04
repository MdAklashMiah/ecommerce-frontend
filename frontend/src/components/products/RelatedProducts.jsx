"use client";

import React from "react";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import Product from "../common/Product";
import ProductSkeleton from "../common/ProductSkeleton";
import { useGetProductsQuery } from "@/slices/productApiSlice";

export default function RelatedProducts({ product }) {
  const { data: productsData, isLoading } = useGetProductsQuery();
  const allProducts = productsData?.data || [];

  // Filter products by category, excluding the current product
  const relatedProducts = allProducts
    .filter((p) => p.category?._id === product?.category?._id && p._id !== product?._id)
    .slice(0, 4);

  // If no related products found, just show latest 4
  const displayProducts = relatedProducts.length > 0 
    ? relatedProducts 
    : allProducts.filter(p => p._id !== product?._id).slice(0, 4);

  return (
    <section className="py-24 border-t border-gray-50">
      <div className="mb-12">
        <SectionTitle 
          title="Related Masterpieces" 
          subtitle="Pieces that complement your selection, chosen for their shared aesthetic and craftsmanship."
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {[1, 2, 3, 4].map(i => <ProductSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.map((item) => (
            <Product key={item._id} product={item} />
          ))}
        </div>
      )}

      {displayProducts.length === 0 && !isLoading && (
        <p className="text-center text-gray-400 text-xs font-black uppercase tracking-widest py-10">No related items found at this time.</p>
      )}
    </section>
  );
}
