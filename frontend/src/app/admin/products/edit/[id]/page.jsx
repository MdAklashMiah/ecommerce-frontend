"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Plus, 
  Trash2, 
  Check,
  Info,
  Loader2,
  Layers,
  CreditCard
} from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

const EditProduct = () => {
  const router = useRouter();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountprice: "",
    stock: "",
    category: "",
    variantType: "singleVariant",
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API}/category/allcategory`),
          axios.get(`${process.env.NEXT_PUBLIC_API}/product/allproducts`) // Getting all and filtering because there's no single product by ID in backend currently
        ]);
        
        setCategories(catRes.data.data);
        
        // Find the specific product
        const product = prodRes.data.data.find(p => p._id === id);
        if (product) {
          setFormData({
            title: product.title,
            description: product.description,
            price: product.price,
            discountprice: product.discountprice,
            stock: product.stock,
            category: product.category?._id || product.category,
            variantType: product.variantType || "singleVariant",
          });
          setExistingImages(product.images || []);
          setVariants(product.variants || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages([...newImages, ...files]);
  };

  const removeExistingImage = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImages(newImages.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    setVariants([...variants, { size: "", color: "" }]);
  };

  const updateVariant = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const mainFormData = new FormData();
      
      mainFormData.append("title", formData.title);
      mainFormData.append("description", formData.description);
      mainFormData.append("price", formData.price);
      mainFormData.append("discountprice", formData.discountprice);
      mainFormData.append("stock", formData.stock);
      mainFormData.append("category", formData.category);
      mainFormData.append("variantType", formData.variantType);
      
      // If we have new images, they will replace old ones in the current backend logic 
      // (The backend updateProductController replaces images if filename is present)
      if (newImages.length > 0) {
        newImages.forEach(img => mainFormData.append("product", img));
      }

      await axios.patch(`${process.env.NEXT_PUBLIC_API}/product/updateproduct/${id}`, mainFormData, {
        headers: { token, "Content-Type": "multipart/form-data" }
      });

      // Update variants (if needed, this would require separate calls)
      // For now, assume variants are handled by ID or separate logic
      
      alert("Product updated successfully!");
      router.push("/admin/products");
    } catch (error) {
      alert("Failed to update product.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-black mb-4" />
      <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">Fetching Product Data...</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin/products" className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-black hover:shadow-md transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Edit <span className="text-gray-400">Product</span></h2>
            <p className="text-gray-500 mt-1 font-medium text-sm">Modify existing product details and inventory.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          {/* General Information */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-2">
               <Info className="w-4 h-4 text-blue-500" />
               <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">General Information</h3>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Product Title</label>
              <input 
                required 
                type="text" 
                name="title" 
                className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl text-sm focus:bg-white focus:border-black outline-none transition-all"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Description</label>
              <textarea 
                required 
                name="description" 
                rows="6"
                className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl text-sm focus:bg-white focus:border-black outline-none transition-all resize-none"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Media */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-2">
               <Upload className="w-4 h-4 text-purple-500" />
               <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">Product Media</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {existingImages.map((img, i) => (
                <div key={`old-${i}`} className="relative aspect-[3/4] rounded-2xl overflow-hidden group border border-gray-100 bg-gray-50">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={() => removeExistingImage(i)} className="bg-white text-red-500 p-2 rounded-xl">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {newImages.map((img, i) => (
                <div key={`new-${i}`} className="relative aspect-[3/4] rounded-2xl overflow-hidden group border border-blue-100 bg-blue-50/30">
                  <img src={URL.createObjectURL(img)} alt="" className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={() => removeNewImage(i)}
                    className="absolute top-2 right-2 p-1.5 bg-white text-red-500 rounded-xl shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <label className="aspect-[3/4] rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-all group">
                <Plus className="w-6 h-6 text-gray-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">New Image</span>
                <input type="file" multiple className="hidden" onChange={handleImageUpload} accept="image/*" />
              </label>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 mb-2">
                 <CreditCard className="w-4 h-4 text-green-500" />
                 <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">Pricing & Stock</h3>
              </div>
              <div className="space-y-4">
                 <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Price</label>
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl text-sm font-bold mt-1" />
                 </div>
                 <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Discount Price</label>
                    <input type="number" name="discountprice" value={formData.discountprice} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl text-sm font-bold mt-1 text-green-600" />
                 </div>
                 <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Stock</label>
                    <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl text-sm font-bold mt-1" />
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 mb-2">
                 <Layers className="w-4 h-4 text-orange-500" />
                 <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">Organization</h3>
              </div>
              <div>
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Category</label>
                 <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleInputChange} 
                    className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl text-sm font-bold mt-1"
                 >
                    {categories.map(cat => (
                       <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                 </select>
              </div>
           </div>

           <div className="flex flex-col gap-4">
              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-gray-900 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Check className="w-5 h-5" /> Update Product</>}
              </button>
              <button type="button" onClick={() => router.back()} className="w-full bg-white text-gray-400 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs border border-gray-100 hover:text-black">Cancel</button>
           </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
