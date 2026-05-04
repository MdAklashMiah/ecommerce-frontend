"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User, ShoppingBag, MapPin, Phone, Mail, LogOut, ChevronRight, Package, Loader2, ShieldCheck, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { userInfo } from "@/slices/userSlice";
import { useGetUserOrdersQuery } from "@/slices/orderApiSlice";
import Container from "@/components/common/Container";
import Link from "next/link";

const Dashboard = () => {
  const user = useSelector((state) => state?.userInfo?.value);
  const dispatch = useDispatch();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: ordersData, isLoading } = useGetUserOrdersQuery(user?._id, { skip: !user?._id });
  const orders = ordersData?.data || [];

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(userInfo(null));
    router.push("/");
  };

  if (!user) {
    if (typeof window !== 'undefined') router.push("/");
    return null;
  }

  return (
    <main className="bg-white min-h-screen pt-32 pb-24">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sidebar */}
          <aside className="lg:w-80 shrink-0 space-y-8">
            <div className="bg-white rounded-[32px] border border-gray-100 p-10 text-center shadow-2xl shadow-black/[0.02]">
              <div className="w-24 h-24 bg-black text-white rounded-[32px] flex items-center justify-center text-4xl font-black mx-auto mb-8 shadow-xl shadow-black/10 transform -rotate-3">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight italic">{user.name}</h2>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">Member Since {new Date().getFullYear()}</p>
              
              <div className="mt-10 pt-10 border-t border-gray-50 space-y-3">
                <button 
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "overview" ? "bg-black text-white shadow-xl shadow-black/20" : "text-gray-400 hover:bg-gray-50 hover:text-black"}`}
                >
                  <User className="w-5 h-5" />
                  Profile
                </button>
                <button 
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "orders" ? "bg-black text-white shadow-xl shadow-black/20" : "text-gray-400 hover:bg-gray-50 hover:text-black"}`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Purchases
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-red-400 hover:bg-red-50 transition-all mt-6"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>

            <div className="bg-gray-900 rounded-[32px] p-10 text-white relative overflow-hidden group">
               <div className="relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">Elite Status</p>
                  <h4 className="text-xl font-black tracking-tight mb-6 italic">Platinum <span className="text-white/40">Circle</span></h4>
                  <p className="text-xs text-white/50 leading-relaxed mb-8">Access private drops, complimentary logistics, and priority support.</p>
                  <button className="w-full bg-white text-black py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all">Details</button>
               </div>
               <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-1000" />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {activeTab === "overview" && (
              <div className="space-y-12 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-2xl shadow-black/[0.02] group hover:border-black transition-all">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Acquisitions</p>
                    <p className="text-4xl font-black text-black tracking-tighter italic">{orders.length}</p>
                  </div>
                  <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-2xl shadow-black/[0.02] group hover:border-black transition-all">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Rewards</p>
                    <p className="text-4xl font-black text-black tracking-tighter italic">2.4k</p>
                  </div>
                  <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-2xl shadow-black/[0.02] group hover:border-black transition-all">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Tier</p>
                    <p className="text-4xl font-black text-black tracking-tighter italic">P1</p>
                  </div>
                </div>

                <div className="bg-white rounded-[32px] border border-gray-100 shadow-2xl shadow-black/[0.02] overflow-hidden">
                  <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                    <h3 className="text-xl font-black text-gray-900 tracking-tight italic">Identity <span className="text-gray-400">Profile</span></h3>
                    <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition">Update Details</button>
                  </div>
                  <div className="p-10 grid md:grid-cols-2 gap-12">
                    <div className="flex items-start gap-6">
                      <div className="p-4 bg-gray-50 rounded-2xl text-gray-400">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Email Access</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-6">
                      <div className="p-4 bg-gray-50 rounded-2xl text-gray-400">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Secure Line</p>
                        <p className="text-sm font-bold text-gray-900">{user.phone || "Not Registry"}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-6 md:col-span-2">
                      <div className="p-4 bg-gray-50 rounded-2xl text-gray-400">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Delivery HQ</p>
                        <p className="text-sm font-bold text-gray-900 leading-relaxed">{user.address || "No primary address established in the registry."}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity Placeholder */}
                <div className="bg-gray-50 rounded-[32px] p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-100">
                   <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                         <ShieldCheck className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                         <h4 className="text-sm font-black uppercase tracking-widest text-gray-900">Security Audit</h4>
                         <p className="text-[10px] text-gray-400 font-medium mt-1">Your account is fully protected with 2FA protocol.</p>
                      </div>
                   </div>
                   <button className="bg-white border border-gray-200 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">Review Logs</button>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight italic">Acquisition <span className="text-gray-400">History</span></h3>
                </div>

                {isLoading ? (
                   <div className="space-y-6">
                     {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-50 rounded-[32px] animate-pulse" />)}
                   </div>
                ) : orders.length === 0 ? (
                  <div className="bg-white rounded-[40px] p-24 text-center border border-dashed border-gray-100">
                    <ShoppingBag className="w-16 h-16 text-gray-100 mx-auto mb-8" />
                    <h4 className="text-2xl font-black text-gray-900 italic">No <span className="text-gray-400">Acquisitions</span></h4>
                    <p className="text-gray-400 mt-2 mb-10 max-w-xs mx-auto font-medium">Your purchase history is currently a blank canvas. Discover something extraordinary.</p>
                    <Link href="/shop" className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-black/20 hover:bg-gray-900 transition-all">Shop Collection</Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order._id} className="bg-white rounded-[32px] border border-gray-100 p-8 flex flex-col md:flex-row justify-between items-center gap-8 hover:shadow-2xl hover:shadow-black/5 transition-all group relative overflow-hidden">
                        <div className="flex items-center gap-6 relative z-10">
                          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 group-hover:bg-black group-hover:text-white transition-all">
                            <Package className="w-8 h-8" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Protocol ID</p>
                            <p className="text-sm font-black text-gray-900 uppercase tracking-tighter italic">#{order._id.slice(-8).toUpperCase()}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-6 flex-1 px-0 md:px-10 relative z-10">
                          <div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Launch Date</p>
                             <p className="text-xs font-black text-gray-900">{new Date(order.createdAt).toLocaleDateString('en-GB')}</p>
                          </div>
                          <div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Valuation</p>
                             <p className="text-xs font-black text-gray-900">৳ {order.totalPrice.toLocaleString()}</p>
                          </div>
                          <div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Transaction</p>
                             <p className="text-[10px] font-black uppercase tracking-widest text-gray-900 flex items-center gap-2">
                                <CreditCard className="w-3.5 h-3.5 text-gray-400" /> {order.paymentMethod}
                             </p>
                          </div>
                          <div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Execution</p>
                             <span className={`text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full ${
                               order.orderStatus === 'delivered' ? 'bg-green-50 text-green-600' : 
                               order.orderStatus === 'cancelled' ? 'bg-red-50 text-red-600' : 'bg-yellow-50 text-yellow-600'
                             }`}>
                                {order.orderStatus}
                             </span>
                          </div>
                        </div>

                        <button className="w-full md:w-auto px-8 py-4 bg-gray-50 text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-black hover:text-white transition-all relative z-10">Details</button>
                        
                        {/* Background subtle decoration */}
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gray-50/50 rounded-full blur-2xl group-hover:bg-black/5 transition-all" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
};

export default Dashboard;
