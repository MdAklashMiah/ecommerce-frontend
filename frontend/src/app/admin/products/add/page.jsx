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
  ChevronRight,
  Info,
  Loader2,
  Layers,
  CreditCard
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AddProduct = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountprice: "",
    stock: "",
    category: "",
    variantType: "singleVariant",
  });

  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([]); // [{size, color}]
  
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}/category/allcategory`)
      .then(res => setCategories(res.data.data))
      .catch(err => console.error(err));
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
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
    if (images.length === 0) return alert("Please upload at least one image");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      
      // 1. Create Product with images in one multipart request
      const mainFormData = new FormData();
      mainFormData.append("title", formData.title);
      mainFormData.append("description", formData.description);
      mainFormData.append("price", formData.price);
      mainFormData.append("discountprice", formData.discountprice);
      mainFormData.append("stock", formData.stock);
      mainFormData.append("category", formData.category);
      mainFormData.append("variantType", formData.variantType);
      
      images.forEach(img => {
        mainFormData.append("product", img); // Backend expects "product" field
      });
      
      const productRes = await axios.post(`${process.env.NEXT_PUBLIC_API}/product/createproduct`, mainFormData, {
        headers: { 
          token, 
          "Content-Type": "multipart/form-data" 
        }
      });

      const productId = productRes.data.data._id;

      // 2. Add Variants if multi-variant
      if (formData.variantType === "multiVariant" && variants.length > 0) {
        await Promise.all(variants.map(v => 
          axios.post(`${process.env.NEXT_PUBLIC_API}/variant/addvariant`, {
            ...v,
            product: productId
          }, { headers: { token } })
        ));
      }

      alert("Product and variants created successfully!");
      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to create product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin/products" className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-black hover:shadow-md transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Add New <span className="text-gray-400">Product</span></h2>
            <p className="text-gray-500 mt-1 font-medium text-sm">Fill in the details to list a new item in your store.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-10">
        {/* Left Column */}
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
                placeholder="Ex: Premium Leather Jacket"
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
                placeholder="Describe the product details, materials, and care instructions..."
                className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl text-sm focus:bg-white focus:border-black outline-none transition-all resize-none"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Media Upload */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-2">
               <Upload className="w-4 h-4 text-purple-500" />
               <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">Product Media</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-[3/4] rounded-2xl overflow-hidden group border border-gray-100 bg-gray-50">
                  <img src={URL.createObjectURL(img)} alt="" className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={() => removeImage(i)}
                    className="absolute top-2 right-2 p-1.5 bg-white text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <label className="aspect-[3/4] rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-all group">
                <div className="p-4 bg-gray-50 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6 text-gray-400" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Upload Image</span>
                <input type="file" multiple className="hidden" onChange={handleImageUpload} accept="image/*" />
              </label>
            </div>
          </div>

          {/* Variants */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center mb-2">
               <div className="flex items-center gap-3">
                  <Layers className="w-4 h-4 text-orange-500" />
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">Inventory & Variants</h3>
               </div>
               <select 
                name="variantType" 
                value={formData.variantType} 
                onChange={handleInputChange}
                className="text-[10px] font-black uppercase tracking-widest bg-gray-50 border-none rounded-xl px-4 py-2 outline-none cursor-pointer"
               >
                  <option value="singleVariant">Single Variant</option>
                  <option value="multiVariant">Multi Variant</option>
               </select>
            </div>

            {formData.variantType === "multiVariant" ? (
               <div className="space-y-4">
                  {variants.map((v, i) => (
                    <div key={i} className="flex gap-4 items-end bg-gray-50 p-6 rounded-2xl border border-gray-100 animate-slideUp">
                       <div className="flex-1 space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Size</label>
                          <input 
                            type="text" 
                            placeholder="M, L, XL..."
                            className="w-full bg-white border border-gray-100 px-4 py-3 rounded-xl text-xs outline-none"
                            value={v.size}
                            onChange={(e) => updateVariant(i, "size", e.target.value)}
                          />
                       </div>
                       <div className="flex-1 space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Color</label>
                          <input 
                            type="text" 
                            placeholder="Red, Blue, #000..."
                            className="w-full bg-white border border-gray-100 px-4 py-3 rounded-xl text-xs outline-none"
                            value={v.color}
                            onChange={(e) => updateVariant(i, "color", e.target.value)}
                          />
                       </div>
                       <button 
                        type="button" 
                        onClick={() => removeVariant(i)}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors mb-0.5"
                       >
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  ))}
                  <button 
                    type="button" 
                    onClick={addVariant}
                    className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center gap-2 text-gray-400 hover:bg-gray-50 hover:text-black hover:border-gray-400 transition-all font-bold text-xs"
                  >
                    <Plus className="w-4 h-4" /> Add Another Variant
                  </button>
               </div>
            ) : (
               <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50 flex items-start gap-4">
                  <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                  <p className="text-xs text-blue-800 leading-relaxed font-medium">Single variant products do not require additional attributes. This is ideal for one-size items or products without variations.</p>
               </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-8">
           {/* Pricing & Stock */}
           <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 mb-2">
                 <CreditCard className="w-4 h-4 text-green-500" />
                 <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">Pricing & Stock</h3>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Regular Price</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-gray-900">৳</span>
                  <input 
                    required 
                    type="number" 
                    name="price" 
                    placeholder="0.00"
                    className="w-full bg-gray-50 border border-gray-100 px-10 py-4 rounded-2xl text-sm focus:bg-white focus:border-black outline-none transition-all font-bold"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Discounted Price</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-gray-900">৳</span>
                  <input 
                    type="number" 
                    name="discountprice" 
                    placeholder="0.00"
                    className="w-full bg-gray-50 border border-gray-100 px-10 py-4 rounded-2xl text-sm focus:bg-white focus:border-black outline-none transition-all font-bold"
                    value={formData.discountprice}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Total Stock</label>
                <input 
                  required 
                  type="number" 
                  name="stock" 
                  placeholder="Ex: 100"
                  className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl text-sm focus:bg-white focus:border-black outline-none transition-all font-bold"
                  value={formData.stock}
                  onChange={handleInputChange}
                />
              </div>
           </div>

           {/* Organization */}
           <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 mb-2">
                 <Layers className="w-4 h-4 text-gray-400" />
                 <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">Organization</h3>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Category</label>
                <select 
                  required 
                  name="category" 
                  className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl text-sm focus:bg-white focus:border-black outline-none transition-all font-bold appearance-none cursor-pointer"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
           </div>

           {/* Action Buttons */}
           <div className="flex flex-col gap-4 pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-gray-900 transition-all shadow-xl hover:shadow-black/20 flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Check className="w-5 h-5" /> Publish Product</>}
              </button>
              <button 
                type="button" 
                onClick={() => router.back()}
                className="w-full bg-white text-gray-400 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:text-black border border-gray-100 transition-all"
              >
                Cancel Changes
              </button>
           </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
