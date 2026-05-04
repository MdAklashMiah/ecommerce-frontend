"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, ArrowRight } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/product/allproducts`);
        const filtered = res.data.data.filter(p => 
          p.title.toLowerCase().includes(query.toLowerCase()) || 
          p.category?.name?.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (query) {
      router.push(`/shop?search=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <form onSubmit={handleSearchSubmit} className="relative group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
        <input
          type="text"
          placeholder="Search for items, brands, categories..."
          className="w-full bg-gray-50 border border-gray-100 px-14 py-4 rounded-2xl text-sm outline-none focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 transition-all"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button 
            type="button" 
            onClick={() => { setQuery(""); setResults([]); }}
            className="absolute right-14 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-black transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button 
          type="submit"
          className="absolute right-5 top-1/2 -translate-y-1/2 p-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-all shadow-lg shadow-black/10"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Live Results Dropdown */}
      {isOpen && (query || results.length > 0) && (
        <div className="absolute top-full left-0 w-full bg-white mt-4 rounded-3xl shadow-2xl border border-gray-50 overflow-hidden z-[1000] animate-slideUp">
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="w-6 h-6 animate-spin text-black" />
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Products Found</h4>
                  <Link href={`/shop?search=${query}`} className="text-[10px] font-black uppercase tracking-widest text-black hover:underline underline-offset-4" onClick={() => setIsOpen(false)}>
                    View All
                  </Link>
                </div>
                <div className="space-y-4">
                  {results.map((product) => (
                    <Link 
                      key={product._id}
                      href={`/shop/${product.slug}`}
                      className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-2xl transition-all group"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="w-14 h-16 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 p-2 shrink-0">
                        <img src={product.images?.[0]} alt="" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-gray-900 uppercase tracking-tight truncate">{product.title}</p>
                        <p className="text-[10px] text-gray-400 font-medium mt-1">{product.category?.name}</p>
                        <p className="text-xs font-bold text-black mt-1">৳ {product.discountprice}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Search className="w-8 h-8 text-gray-200" />
                </div>
                <p className="text-sm font-bold text-gray-900">No products found</p>
                <p className="text-xs text-gray-400 mt-1">Try searching for something else.</p>
              </div>
            )}
          </div>
          
          {/* Popular Categories Placeholder */}
          <div className="bg-gray-50 p-6 border-t border-gray-100 flex flex-wrap gap-2">
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 w-full mb-2">Suggested</span>
             {["Men's Wear", "Jewelry", "Accessories", "New Drops"].map(cat => (
               <button key={cat} className="px-4 py-2 bg-white border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                 {cat}
               </button>
             ))}
          </div>
        </div>
      )}
    </div>
  );
}
