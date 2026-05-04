"use client";

import React from "react";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { useGetCategoriesQuery } from "@/slices/categoryApiSlice";
import { ArrowRight, Layers, Loader2 } from "lucide-react";
import Link from "next/link";

const CollectionPage = () => {
  const { data: categoriesData, isLoading } = useGetCategoriesQuery();
  const categories = categoriesData?.data || [];

  return (
    <main className="bg-white min-h-screen pt-32 pb-24">
      <Container>
        <div className="mb-20">
           <SectionTitle 
              title="Our Collections" 
              subtitle="Explore our diverse range of categories, curated specifically for your lifestyle and taste."
           />
        </div>

        {isLoading ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                 <div key={i} className="aspect-square bg-gray-50 rounded-3xl animate-pulse" />
              ))}
           </div>
        ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((cat) => (
                <Link 
                  key={cat._id}
                  href={`/shop?category=${cat._id}`}
                  className="group relative aspect-square rounded-3xl overflow-hidden bg-gray-100 transition-all hover:shadow-2xl hover:shadow-black/10"
                >
                   {/* Image Background */}
                   <img 
                      src={cat.image || "/images/placeholder.jpg"} 
                      alt={cat.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                   />
                   
                   {/* Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                         <div className="flex items-center gap-2 mb-2">
                            <Layers className="w-4 h-4 text-white/60" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Category</span>
                         </div>
                         <h3 className="text-3xl font-black text-white tracking-tighter mb-4 italic">{cat.name}</h3>
                         <div className="flex items-center gap-3 text-white text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            Explore Collection <ArrowRight className="w-4 h-4" />
                         </div>
                      </div>
                   </div>

                   {/* Count Badge */}
                   <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                      {cat.subcategory?.length || 0} Sub-categories
                   </div>
                </Link>
              ))}

              {/* Exclusive Collection Card */}
              <div className="group relative aspect-square rounded-3xl overflow-hidden bg-black p-10 flex flex-col justify-between shadow-2xl shadow-black/20">
                  <div className="flex justify-between items-start">
                     <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                        <span className="text-white font-black text-xl">✨</span>
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Limited Series</span>
                  </div>
                  <div>
                     <h3 className="text-3xl font-black text-white tracking-tighter mb-4 leading-tight">THE ARTISAN<br/><span className="text-white/40 italic">COLLECTION</span></h3>
                     <p className="text-xs text-white/50 mb-8 max-w-[200px]">Handcrafted pieces released in limited quantities each month.</p>
                     <button className="bg-white text-black px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center gap-3">
                        Join Waitlist <ArrowRight className="w-4 h-4" />
                     </button>
                  </div>
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-1000" />
              </div>
           </div>
        )}
      </Container>
    </main>
  );
};

export default CollectionPage;
