"use client";

import Link from "next/link";
import React from "react";
import { Heart, ShoppingBag, ArrowUpRight } from "lucide-react";

export default function Product({ product }) {
  if (!product) return null;

  const discountPercentage = product.price > product.discountprice 
    ? Math.round(((product.price - product.discountprice) / product.price) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-[32px] overflow-hidden flex flex-col transition-all duration-700 hover:shadow-2xl hover:shadow-black/5 border border-transparent hover:border-gray-50">
      <div className="relative w-full aspect-[3/4] bg-gray-50 overflow-hidden">
        {/* Badges */}
        {discountPercentage > 0 && (
          <div className="absolute top-5 left-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full z-10 shadow-lg italic">
            -{discountPercentage}%
          </div>
        )}

        {/* Wishlist Button */}
        <button className="absolute top-5 right-5 z-10 w-10 h-10 bg-white/40 backdrop-blur-md flex items-center justify-center rounded-2xl opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-white text-gray-800 hover:text-red-500 shadow-sm border border-white/20">
          <Heart className="w-4 h-4" />
        </button>

        <Link href={`/shop/${product.slug}`} className="block h-full">
          <img
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.title || "Product"}
            className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-1000"
          />
        </Link>

        {/* Category Label */}
        <div className="absolute bottom-5 left-5 opacity-0 translate-y-[10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
           <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
              {product.category?.name || 'Exclusive'}
           </span>
        </div>

        {/* Quick View Link */}
        <Link 
          href={`/shop/${product.slug}`}
          className="absolute bottom-5 right-5 w-10 h-10 bg-black text-white rounded-2xl opacity-0 translate-y-[10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150 flex items-center justify-center shadow-xl shadow-black/20"
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Content */}
      <div className="p-8 flex-1 flex flex-col">
        <Link href={`/shop/${product.slug}`} className="block mb-2">
          <h5 className="text-sm font-black text-gray-900 uppercase tracking-tight truncate group-hover:text-gray-500 transition-colors">
            {product.title}
          </h5>
        </Link>
        
        <div className="flex items-center gap-1.5 mb-4">
          {[...Array(5)].map((_, i) => (
             <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < 4 ? "bg-black" : "bg-gray-200"}`} />
          ))}
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-2">Verified Drop</span>
        </div>

        <div className="flex items-end justify-between mt-auto">
          <div className="flex gap-3 items-end">
             <span className="text-xl font-black text-black tracking-tighter italic">
                ৳ {product.discountprice.toLocaleString()}
             </span>
             {product.discountprice < product.price && (
               <span className="text-xs text-gray-300 line-through mb-0.5 font-medium">
                 ৳ {product.price.toLocaleString()}
               </span>
             )}
          </div>
          <button className="text-gray-300 hover:text-black transition-colors">
             <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
