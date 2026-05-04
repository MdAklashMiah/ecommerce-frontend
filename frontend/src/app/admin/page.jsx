"use client";

import React from "react";
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Package, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical
} from "lucide-react";
import { useGetDashboardStatsQuery } from "@/slices/orderApiSlice";

const AdminDashboard = () => {
  const { data: statsData, isLoading, error } = useGetDashboardStatsQuery();
  const stats = statsData?.data;

  if (isLoading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm animate-pulse h-40"></div>
      ))}
      <div className="lg:col-span-4 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm animate-pulse h-96"></div>
    </div>
  );

  if (error) return <div className="text-red-500 p-8 bg-red-50 rounded-2xl border border-red-100">Error loading dashboard stats.</div>;

  const statCards = [
    { name: "Total Revenue", value: `৳ ${stats.totalRevenue.toLocaleString()}`, icon: TrendingUp, trend: "+12.5%", color: "blue" },
    { name: "Total Orders", value: stats.totalOrders, icon: ShoppingBag, trend: "+8.2%", color: "green" },
    { name: "Total Users", value: stats.totalUsers, icon: Users, trend: "+5.1%", color: "purple" },
    { name: "Total Products", value: stats.totalProducts, icon: Package, trend: "+2.4%", color: "orange" },
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Executive Dashboard</h2>
        <p className="text-gray-500 mt-1 font-medium">Real-time business performance analytics and overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:bg-black group-hover:text-white transition-all`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-green-50 text-green-600 flex items-center gap-1`}>
                <ArrowUpRight className="w-3 h-3" /> {stat.trend}
              </span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{stat.name}</p>
            <h4 className="text-2xl font-black text-black">{stat.value}</h4>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
           <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
              <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
              <button className="text-xs font-black uppercase tracking-widest text-black flex items-center gap-2 hover:translate-x-1 transition-transform">
                View Report <ArrowUpRight className="w-4 h-4" />
              </button>
           </div>
           <div className="p-0">
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-gray-50/50">
                          <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Order ID</th>
                          <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Customer</th>
                          <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                          <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                          <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {stats.recentOrders.map((order) => (
                          <tr key={order._id} className="hover:bg-gray-50/80 transition-colors">
                             <td className="px-8 py-6">
                                <p className="text-xs font-bold text-gray-900">#{order._id.slice(-8).toUpperCase()}</p>
                                <p className="text-[10px] text-gray-400 mt-1 font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                             </td>
                             <td className="px-8 py-6">
                                <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-gray-600">
                                      {order.user?.name?.charAt(0)}
                                   </div>
                                   <div>
                                      <p className="text-xs font-bold text-gray-900">{order.user?.name}</p>
                                      <p className="text-[10px] text-gray-400 font-medium">{order.user?.email}</p>
                                   </div>
                                </div>
                             </td>
                             <td className="px-8 py-6">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-2 w-fit ${
                                  order.orderStatus === 'delivered' ? 'bg-green-50 text-green-600' : 
                                  order.orderStatus === 'pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-blue-50 text-blue-600'
                                }`}>
                                   {order.orderStatus === 'delivered' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                   {order.orderStatus}
                                </span>
                             </td>
                             <td className="px-8 py-6 text-sm font-black text-black">
                                ৳ {order.totalPrice.toLocaleString()}
                             </td>
                             <td className="px-8 py-6">
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                   <MoreVertical className="w-4 h-4 text-gray-400" />
                                </button>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        {/* Status Distribution */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-black rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-black/20">
              <div className="relative z-10">
                 <h3 className="text-xl font-bold mb-6">Order Statistics</h3>
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                          <span className="opacity-60">Success Rate</span>
                          <span>94%</span>
                       </div>
                       <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="w-[94%] h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                          <span className="opacity-60">Pending</span>
                          <span>6%</span>
                       </div>
                       <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="w-[6%] h-full bg-yellow-500 rounded-full" />
                       </div>
                    </div>
                 </div>

                 <div className="mt-12 flex gap-4">
                    <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/5">
                       <AlertCircle className="w-4 h-4 text-yellow-500 mb-2" />
                       <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Attention</p>
                       <p className="text-sm font-bold mt-1">4 Issues</p>
                    </div>
                    <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/5">
                       <CheckCircle2 className="w-4 h-4 text-green-500 mb-2" />
                       <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Resolved</p>
                       <p className="text-sm font-bold mt-1">28 Today</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 italic">Quick <span className="text-gray-400">Inventory</span></h3>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center">
                          <AlertCircle className="w-5 h-5" />
                       </div>
                       <p className="text-xs font-bold text-gray-900">Low Stock Alert</p>
                    </div>
                    <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">12</span>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-green-50 text-green-500 rounded-xl flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5" />
                       </div>
                       <p className="text-xs font-bold text-gray-900">In Stock</p>
                    </div>
                    <span className="bg-gray-200 text-gray-600 text-[10px] font-black px-2 py-0.5 rounded-full">84</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
