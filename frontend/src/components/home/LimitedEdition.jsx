"use client";

import React, { useRef } from "react";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const products = [
  { id: 1, title: "Faux Leather Moto Jacket", price: 12000, discountPrice: 8500, category: "Outerwear", image: "/images/products/images.png" },
  { id: 2, title: "Calvin Relaxed Shorts", price: 4500, discountPrice: 3200, category: "Bottoms", image: "/images/products/images.png" },
  { id: 3, title: "Essential Heavyweight Tee", price: 2500, discountPrice: 1800, category: "Tops", image: "/images/products/images.png" },
  { id: 4, title: "Cableknit Wool Shawl", price: 15000, discountPrice: 12000, category: "Accessories", image: "/images/products/images.png" },
  { id: 5, title: "Botanical Cheetah Shirt", price: 6500, discountPrice: 5200, category: "Tops", image: "/images/products/images.png" },
];

export default function LimitedEdition() {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-32 bg-gray-50/50">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
          <SectionTitle 
            title="Limited Edition" 
            subtitle="Extremely rare pieces released in small batches. Once they're gone, they're gone forever."
            align="left"
          />
          <div className="flex gap-3 pb-2">
             <button 
               onClick={() => sliderRef.current.slickPrev()}
               className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all shadow-sm"
             >
                <ChevronLeft className="w-5 h-5" />
             </button>
             <button 
               onClick={() => sliderRef.current.slickNext()}
               className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all shadow-sm"
             >
                <ChevronRight className="w-5 h-5" />
             </button>
          </div>
        </div>

        <div className="relative -mx-4">
          <Slider ref={sliderRef} {...settings}>
            {products.map((product) => {
              const discount = Math.round(((product.price - product.discountPrice) / product.price) * 100);
              return (
                <div key={product.id} className="px-4">
                  <div className="group bg-white rounded-[32px] overflow-hidden flex flex-col transition-all duration-700 hover:shadow-2xl hover:shadow-black/5 border border-transparent hover:border-gray-50">
                    <div className="relative w-full aspect-[3/4] bg-gray-50 overflow-hidden">
                      {/* Badge */}
                      <div className="absolute top-5 left-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full z-10 shadow-lg italic">
                        Limited
                      </div>

                      {/* Wishlist */}
                      <button className="absolute top-5 right-5 z-10 w-10 h-10 bg-white/40 backdrop-blur-md flex items-center justify-center rounded-2xl opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-white text-gray-800 hover:text-red-500 shadow-sm border border-white/20">
                        <Heart className="w-4 h-4" />
                      </button>

                      <div className="block h-full cursor-pointer">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-1000"
                        />
                      </div>

                      {/* Category */}
                      <div className="absolute bottom-5 left-5 opacity-0 translate-y-[10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
                         <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                            {product.category}
                         </span>
                      </div>

                      {/* Quick View */}
                      <div className="absolute bottom-5 right-5 w-10 h-10 bg-black text-white rounded-2xl opacity-0 translate-y-[10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150 flex items-center justify-center shadow-xl shadow-black/20">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="p-8 flex-1 flex flex-col">
                      <h5 className="text-sm font-black text-gray-900 uppercase tracking-tight truncate group-hover:text-gray-500 transition-colors mb-2">
                        {product.title}
                      </h5>
                      
                      <div className="flex items-center gap-1.5 mb-4">
                        {[...Array(5)].map((_, i) => (
                           <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < 4 ? "bg-black" : "bg-gray-200"}`} />
                        ))}
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-2">Rare Drop</span>
                      </div>

                      <div className="flex items-end justify-between mt-auto">
                        <div className="flex gap-3 items-end">
                           <span className="text-xl font-black text-black tracking-tighter italic">
                              ৳ {product.discountPrice.toLocaleString()}
                           </span>
                           <span className="text-xs text-gray-300 line-through mb-0.5 font-medium">
                             ৳ {product.price.toLocaleString()}
                           </span>
                        </div>
                        <button className="text-gray-300 hover:text-black transition-colors">
                           <ShoppingBag className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </Container>
    </section>
  );
}
