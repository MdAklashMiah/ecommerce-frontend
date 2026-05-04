"use client"

import React from "react";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import Product from "../common/Product";
import ProductSkeleton from "../common/ProductSkeleton";
import { useGetLatestProductsQuery } from "@/slices/productApiSlice";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const LatestProducts = () => {
  const { data: productsData, isLoading } = useGetLatestProductsQuery();
  const products = productsData?.data || [];

  return (
    <section className="py-32 bg-white">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
          <SectionTitle 
            title="The Latest Drops" 
            subtitle="Explore our newest acquisitions, defined by superior quality and timeless design."
            align="left"
          />
          <Link href="/shop" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors pb-2">
             View All Collections <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
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

export default LatestProducts;
