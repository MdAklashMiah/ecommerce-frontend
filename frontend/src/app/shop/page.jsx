"use client";

import React, { useState, useMemo } from "react";
import Container from "@/components/common/Container";
import Product from "@/components/common/Product";
import ProductSkeleton from "@/components/common/ProductSkeleton";
import SectionTitle from "@/components/common/SectionTitle";
import { useGetProductsQuery } from "@/slices/productApiSlice";
import { useGetCategoriesQuery } from "@/slices/categoryApiSlice";
import { useSearchParams } from "next/navigation";
import { Filter, ChevronDown, LayoutGrid, List, Search, SlidersHorizontal, X } from "lucide-react";

const ShopPage = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(categoryId || "All");
  const [priceRange, setPriceRange] = useState(50000);
  const [sortBy, setSortBy] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { data: productsData, isLoading: productsLoading } = useGetProductsQuery();
  const { data: categoriesData } = useGetCategoriesQuery();

  React.useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    } else {
      setSelectedCategory("All");
    }
  }, [categoryId]);

  const products = productsData?.data || [];
  const categories = categoriesData?.data || [];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category?._id === selectedCategory || p.category === selectedCategory);
    }

    if (searchQuery) {
      result = result.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    result = result.filter((p) => p.discountprice <= priceRange);

    if (sortBy === "price-low") result.sort((a, b) => a.discountprice - b.discountprice);
    if (sortBy === "price-high") result.sort((a, b) => b.discountprice - a.discountprice);
    if (sortBy === "latest") result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return result;
  }, [products, selectedCategory, priceRange, sortBy, searchQuery]);

  return (
    <div className="bg-white min-h-screen py-24">
      <Container>
        {/* Page Header */}
        <div className="mb-12">
           <SectionTitle 
              title="The Collection" 
              subtitle="Discover our curated selection of premium products designed for quality and style."
           />
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-10">
            {/* Search */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900">Search</h3>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
                <input 
                  type="text" 
                  placeholder="Find something..."
                  className="w-full bg-gray-50 border border-gray-100 px-10 py-4 rounded-2xl text-sm outline-none focus:bg-white focus:border-black transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900">Categories</h3>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setSelectedCategory("All")}
                  className={`text-left px-5 py-3 rounded-xl text-sm font-bold transition-all ${selectedCategory === "All" ? "bg-black text-white shadow-lg shadow-black/10" : "text-gray-500 hover:bg-gray-50 hover:text-black"}`}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button 
                    key={cat._id}
                    onClick={() => setSelectedCategory(cat._id)}
                    className={`text-left px-5 py-3 rounded-xl text-sm font-bold transition-all ${selectedCategory === cat._id ? "bg-black text-white shadow-lg shadow-black/10" : "text-gray-500 hover:bg-gray-50 hover:text-black"}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900">Price Range</h3>
                <span className="text-xs font-black text-black">৳{priceRange}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="50000" 
                step="500"
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-black"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
              />
              <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <span>৳0</span>
                <span>৳50,000+</span>
              </div>
            </div>

            {/* Featured Badge */}
            <div className="bg-black rounded-3xl p-8 text-white relative overflow-hidden group">
               <div className="relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-2">Exclusive Offer</p>
                  <h4 className="text-lg font-bold mb-4 italic">Join the Inner Circle</h4>
                  <p className="text-xs text-white/60 leading-relaxed mb-6">Get 15% off your first order and early access to drops.</p>
                  <button className="bg-white text-black px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all">Sign Me Up</button>
               </div>
               <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-50">
               <div className="flex items-center gap-6">
                  <button 
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden flex items-center gap-2 text-xs font-black uppercase tracking-widest border border-gray-100 px-5 py-3 rounded-xl hover:bg-gray-50 transition-all"
                  >
                     <SlidersHorizontal className="w-4 h-4" /> Filters
                  </button>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 hidden sm:block">
                     Showing <span className="text-black">{filteredProducts.length}</span> Results
                  </p>
               </div>

               <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-2 border border-gray-100 p-1 rounded-xl">
                     <button className="p-2 bg-black text-white rounded-lg shadow-lg"><LayoutGrid className="w-4 h-4" /></button>
                     <button className="p-2 text-gray-400 hover:text-black transition-all"><List className="w-4 h-4" /></button>
                  </div>
                  <div className="relative group">
                     <select 
                        className="appearance-none bg-gray-50 border-none rounded-xl px-6 py-3 pr-10 text-[10px] font-black uppercase tracking-widest cursor-pointer outline-none hover:bg-gray-100 transition-all"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                     >
                        <option value="latest">Latest Arrivals</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                     </select>
                     <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                  </div>
               </div>
            </div>

            {/* Results */}
            {productsLoading ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => <ProductSkeleton key={i} />)}
               </div>
            ) : filteredProducts.length === 0 ? (
               <div className="py-32 text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                     <Search className="w-10 h-10 text-gray-200" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">No matches found</h3>
                  <p className="text-gray-500 mt-2">Try adjusting your filters or search term.</p>
                  <button 
                    onClick={() => { setSelectedCategory("All"); setSearchQuery(""); setPriceRange(50000); }}
                    className="mt-8 text-xs font-black uppercase tracking-widest text-black underline underline-offset-8"
                  >
                    Clear All Filters
                  </button>
               </div>
            ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                  {filteredProducts.map((item) => (
                    <Product key={item._id} product={item} />
                  ))}
               </div>
            )}

            {/* Pagination Placeholder */}
            {filteredProducts.length > 0 && (
              <div className="mt-20 pt-10 border-t border-gray-50 flex justify-center">
                 <div className="flex gap-2">
                    <button className="w-12 h-12 rounded-2xl bg-black text-white text-xs font-black shadow-xl shadow-black/10">1</button>
                    <button className="w-12 h-12 rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-black hover:shadow-sm transition-all text-xs font-black">2</button>
                    <button className="w-12 h-12 rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-black hover:shadow-sm transition-all text-xs font-black">3</button>
                 </div>
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[1000] lg:hidden animate-fade-in">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
           <div className="absolute top-0 right-0 w-80 h-full bg-white shadow-2xl p-8 flex flex-col transform transition-transform duration-300">
              <div className="flex items-center justify-between mb-10 pb-4 border-b border-gray-50">
                 <h2 className="text-xl font-black tracking-tight italic">Refine <span className="text-gray-400">Search</span></h2>
                 <button onClick={() => setMobileFiltersOpen(false)} className="p-2 bg-gray-50 rounded-xl hover:bg-gray-100">
                    <X className="w-5 h-5" />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-10 pr-2 custom-scrollbar">
                 <div className="space-y-4">
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Search</h3>
                   <input 
                      type="text" 
                      placeholder="Product name..."
                      className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl text-sm outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                   />
                 </div>

                 <div className="space-y-4">
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Category</h3>
                   <div className="grid grid-cols-1 gap-2">
                     <button 
                        onClick={() => setSelectedCategory("All")}
                        className={`text-left px-5 py-3 rounded-xl text-xs font-bold transition-all ${selectedCategory === "All" ? "bg-black text-white" : "bg-gray-50 text-gray-500"}`}
                     >
                        All
                     </button>
                     {categories.map(cat => (
                        <button 
                          key={cat._id}
                          onClick={() => setSelectedCategory(cat._id)}
                          className={`text-left px-5 py-3 rounded-xl text-xs font-bold transition-all ${selectedCategory === cat._id ? "bg-black text-white" : "bg-gray-50 text-gray-500"}`}
                        >
                           {cat.name}
                        </button>
                     ))}
                   </div>
                 </div>

                 <div className="space-y-4">
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Price Threshold</h3>
                   <input 
                      type="range" 
                      min="0" max="50000" step="500"
                      className="w-full accent-black"
                      value={priceRange}
                      onChange={(e) => setPriceRange(parseInt(e.target.value))}
                   />
                   <p className="text-sm font-bold">Up to ৳{priceRange}</p>
                 </div>
              </div>

              <div className="pt-8 mt-8 border-t border-gray-50">
                 <button 
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full bg-black text-white py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl"
                 >
                    Apply Filters
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
