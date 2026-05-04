"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Layers, 
  Plus, 
  Trash2, 
  Edit, 
  Upload, 
  X,
  Loader2,
  Check
} from "lucide-react";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [formData, setFormData] = useState({ name: "" });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/category/allcategory`);
      setCategories(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image");
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.append("name", formData.name);
      data.append("category", image); // Backend expects "category" field for image

      await axios.post(`${process.env.NEXT_PUBLIC_API}/category/createcategory`, data, {
        headers: { token, "Content-Type": "multipart/form-data" }
      });

      alert("Category created successfully!");
      setFormData({ name: "" });
      setImage(null);
      setShowAddForm(false);
      fetchCategories();
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to create category");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Are you sure? This will delete the category and its subcategories.")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.NEXT_PUBLIC_API}/category/deletecategory/${id}`, {
        headers: { token }
      });
      fetchCategories();
    } catch (error) {
      alert("Failed to delete category");
    }
  };

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight italic">Category <span className="text-gray-400">Architecture</span></h2>
          <p className="text-gray-500 mt-1 font-medium">Organize your store structure and product groupings.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-900 transition-all shadow-xl shadow-black/20"
        >
          {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showAddForm ? "Cancel" : "Add New Category"}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm animate-slideUp max-w-2xl">
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-8">New Category Details</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Category Name</label>
              <input 
                required 
                type="text" 
                placeholder="Ex: Men's Fashion, Electronics..."
                className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl text-sm focus:bg-white focus:border-black outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Category Image</label>
              <div className="flex items-center gap-6">
                 {image ? (
                   <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                      <img src={URL.createObjectURL(image)} className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setImage(null)} className="absolute top-1 right-1 bg-black text-white rounded-full p-1 shadow-lg">
                        <X className="w-3 h-3" />
                      </button>
                   </div>
                 ) : (
                   <label className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all">
                      <Upload className="w-6 h-6 text-gray-400" />
                      <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                   </label>
                 )}
                 <div className="flex-1">
                    <p className="text-xs font-bold text-gray-900">Upload Category Thumbnail</p>
                    <p className="text-[10px] text-gray-400 mt-1">Recommended size: 512x512px. Max 2MB.</p>
                 </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={submitting}
              className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-gray-900 transition-all shadow-xl hover:shadow-black/20 flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Check className="w-5 h-5" /> Save Category</>}
            </button>
          </form>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          [1,2,3].map(i => <div key={i} className="h-64 bg-white rounded-3xl animate-pulse border border-gray-100 shadow-sm" />)
        ) : categories.map((cat) => (
          <div key={cat._id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:shadow-black/5 transition-all group">
            <div className="aspect-video relative overflow-hidden bg-gray-50">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                 <button className="p-3 bg-white text-black rounded-2xl shadow-lg hover:scale-110 transition-transform">
                    <Edit className="w-5 h-5" />
                 </button>
                 <button 
                  onClick={() => deleteCategory(cat._id)}
                  className="p-3 bg-red-500 text-white rounded-2xl shadow-lg hover:scale-110 transition-transform"
                 >
                    <Trash2 className="w-5 h-5" />
                 </button>
              </div>
            </div>
            <div className="p-8 flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold text-gray-900">{cat.name}</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">{cat.subcategory?.length || 0} Subcategories</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl text-gray-400 group-hover:bg-black group-hover:text-white transition-all">
                <Layers className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;
