"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Eye
} from "lucide-react";
import Link from "next/link";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/product/allproducts`);
        setProducts(res.data.data);
      } catch (error) {
        console.error("Fetch products error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.NEXT_PUBLIC_API}/product/delete/${id}`, {
        headers: { token }
      });
      setProducts(products.filter(p => p._id !== id));
      alert("Product deleted successfully");
    } catch (error) {
      alert("Failed to delete product");
    }
  };

  const filteredProducts = products.filter(p => 
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight italic">Inventory <span className="text-gray-400">Management</span></h2>
          <p className="text-gray-500 mt-1 font-medium">Manage your product catalog, stock, and variants.</p>
        </div>
        <Link 
          href="/admin/products/add" 
          className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-900 transition-all shadow-xl shadow-black/20"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
          <input 
            type="text" 
            placeholder="Search products by name or category..." 
            className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 rounded-2xl py-4 pl-12 pr-6 text-sm outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 bg-gray-50 text-gray-900 px-6 py-4 rounded-2xl font-bold text-xs hover:bg-gray-100 transition-all">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Product</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Price</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Stock</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [1,2,3,4,5].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-8 py-10 h-24 bg-gray-50/50"></td>
                  </tr>
                ))
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-gray-400 italic">No products found.</td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-16 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 p-2 flex-shrink-0">
                          <img src={product.images?.[0]} alt="" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-black text-gray-900 uppercase tracking-tight truncate max-w-[200px]">{product.title}</p>
                          <p className="text-[10px] text-gray-400 font-medium mt-1">ID: #{product._id.slice(-6).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className="bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                          {product.category?.name || "Uncategorized"}
                       </span>
                    </td>
                    <td className="px-8 py-6">
                       <div className="space-y-0.5">
                          <p className="text-xs font-bold text-gray-900">৳ {product.discountprice}</p>
                          {product.price > product.discountprice && (
                            <p className="text-[10px] text-gray-400 line-through">৳ {product.price}</p>
                          )}
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <p className={`text-xs font-bold ${product.stock < 10 ? 'text-red-500' : 'text-gray-900'}`}>{product.stock}</p>
                    </td>
                    <td className="px-8 py-6">
                       <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${product.stock > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                       </span>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center justify-end gap-2">
                          <Link href={`/shop/${product.slug}`} target="_blank" className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-black transition-all">
                             <Eye className="w-4 h-4" />
                          </Link>
                          <Link href={`/admin/products/edit/${product._id}`} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-blue-600 transition-all">
                             <Edit className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => deleteProduct(product._id)}
                            className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-all"
                          >
                             <Trash2 className="w-4 h-4" />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-8 bg-gray-50/50 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-6">
           <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Showing {filteredProducts.length} of {products.length} Products</p>
           <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-black hover:shadow-sm transition-all disabled:opacity-50" disabled>
                 <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-1">
                 <button className="w-10 h-10 rounded-xl bg-black text-white text-xs font-black">1</button>
              </div>
              <button className="p-2 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-black hover:shadow-sm transition-all disabled:opacity-50" disabled>
                 <ChevronRight className="w-5 h-5" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
