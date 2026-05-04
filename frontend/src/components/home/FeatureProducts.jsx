"use client";

import React from "react";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import Product from "../common/Product";
import ProductSkeleton from "../common/ProductSkeleton";
import { useGetProductsQuery } from "@/slices/productApiSlice";
import Link from "next/link";
import { Sparkles } from "lucide-react";

const FeatureProducts = () => {
  const { data: productsData, isLoading } = useGetProductsQuery();
  const products = productsData?.data || [];

  return (
    <section className="py-32 bg-gray-50/50">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
          <SectionTitle 
            title="Curated Essentials" 
            subtitle="A selection of items chosen for their exceptional craftsmanship and enduring appeal."
            align="left"
          />
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-black pb-2 italic">
             <Sparkles className="w-4 h-4 text-gray-400" /> Handpicked for you
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? (
            [...Array(8)].map((_, i) => <ProductSkeleton key={i} />)
          ) : (
            products.slice(0, 8).map((item) => (
              <Product key={item._id} product={item} />
            ))
          )}
        </div>
      </Container>
    </section>
  );
};

export default FeatureProducts;
