"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Layers, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  ChevronRight
} from "lucide-react";

const AdminLayout = ({ children }) => {
  const user = useSelector((state) => state?.userInfo?.value);
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin
    if (user === null) {
      // Still loading or not logged in
      return;
    }
    
    if (user?.role !== "admin") {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-[2000]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-bold uppercase tracking-widest animate-pulse">Authenticating Admin...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Products", icon: Package, path: "/admin/products" },
    { name: "Orders", icon: ShoppingBag, path: "/admin/orders" },
    { name: "Categories", icon: Layers, path: "/admin/categories" },
    { name: "Users", icon: Users, path: "/admin/users" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar Overlay */}
      {!isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-[#0A0A0B] text-gray-400 transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } flex flex-col border-r border-white/5`}
      >
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-black text-xl">A</span>
             </div>
             <h1 className="text-white font-black tracking-tighter text-2xl italic">Admin<span className="text-white/40">Core</span></h1>
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-4 ml-4">Main Navigation</p>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="flex items-center gap-4 px-4 py-4 rounded-xl text-sm font-bold transition-all hover:bg-white/5 hover:text-white group"
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {item.name}
              <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="bg-white/5 rounded-2xl p-6 mb-4">
             <p className="text-xs font-bold text-white mb-1">System Health</p>
             <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] text-white/40 uppercase tracking-widest">Server Load</span>
                <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Normal</span>
             </div>
             <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-green-500 rounded-full" />
             </div>
          </div>
          <button className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-6">
            <button 
              className="p-2 hover:bg-gray-50 rounded-xl transition-all lg:hidden"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="w-6 h-6 text-gray-500" />
            </button>
            <div className="relative hidden md:block group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
               <input 
                type="text" 
                placeholder="Search analytics, orders..." 
                className="bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-black/5 rounded-xl py-3 pl-12 pr-6 text-sm w-80 outline-none transition-all"
               />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-black transition-colors">
               <Bell className="w-5 h-5" />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-gray-100"></div>
            <div className="flex items-center gap-4">
               <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-gray-900 leading-none">{user.name}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Super Admin</p>
               </div>
               <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-black/10">
                  {user.name?.charAt(0).toUpperCase()}
               </div>
            </div>
          </div>
        </header>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50/50 p-8 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
