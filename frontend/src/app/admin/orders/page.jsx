"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  Truck, 
  AlertCircle,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Package,
  User,
  CreditCard
} from "lucide-react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/order/allorder`);
      setOrders(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${process.env.NEXT_PUBLIC_API}/order/updateorder/${id}`, { orderStatus: status }, {
        headers: { token }
      });
      fetchOrders();
      alert("Order status updated");
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.NEXT_PUBLIC_API}/order/deleteorder/${id}`, {
        headers: { token }
      });
      fetchOrders();
    } catch (error) {
      alert("Failed to delete order");
    }
  };

  const filteredOrders = orders.filter(o => 
    o._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.phone?.includes(searchTerm) ||
    o.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-50 text-green-600';
      case 'processing': return 'bg-blue-50 text-blue-600';
      case 'cancelled': return 'bg-red-50 text-red-600';
      default: return 'bg-yellow-50 text-yellow-600';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight italic">Order <span className="text-gray-400">Fulfillment</span></h2>
          <p className="text-gray-500 mt-1 font-medium">Manage transactions, tracking, and delivery statuses.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm text-center min-w-[120px]">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">New Orders</p>
              <p className="text-xl font-black text-black">{orders.filter(o => o.orderStatus === 'pending').length}</p>
           </div>
           <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm text-center min-w-[120px]">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">In Transit</p>
              <p className="text-xl font-black text-black">{orders.filter(o => o.orderStatus === 'processing').length}</p>
           </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
          <input 
            type="text" 
            placeholder="Search by Order ID, Phone, or City..." 
            className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 rounded-2xl py-4 pl-12 pr-6 text-sm outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 bg-gray-50 text-gray-900 px-6 py-4 rounded-2xl font-bold text-xs hover:bg-gray-100 transition-all">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Order Details</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Customer Info</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Payment</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [1,2,3,4,5].map(i => (
                  <tr key={i} className="animate-pulse h-24 bg-gray-50/20"><td colSpan={6}></td></tr>
                ))
              ) : filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-all">
                          <Package className="w-5 h-5" />
                       </div>
                       <div>
                          <p className="text-xs font-black text-gray-900 uppercase tracking-tight">#{order._id.slice(-8).toUpperCase()}</p>
                          <p className="text-[10px] text-gray-400 font-medium mt-1">{new Date(order.createdAt).toLocaleString()}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                       <p className="text-xs font-bold text-gray-900 flex items-center gap-2"><Phone className="w-3 h-3" /> {order.phone}</p>
                       <p className="text-[10px] text-gray-400 font-medium flex items-center gap-2 uppercase tracking-widest"><Truck className="w-3 h-3" /> {order.city}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                     <p className="text-sm font-black text-black">৳ {order.totalPrice.toLocaleString()}</p>
                     <p className="text-[10px] text-gray-400 font-medium mt-0.5">{order.items?.length || 0} Items</p>
                  </td>
                  <td className="px-8 py-6">
                     <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-900 flex items-center gap-1">
                           <CreditCard className="w-3 h-3" /> {order.paymentMethod}
                        </span>
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full w-fit ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                           {order.paymentStatus || 'pending'}
                        </span>
                     </div>
                  </td>
                  <td className="px-8 py-6">
                     <select 
                      value={order.orderStatus} 
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full outline-none cursor-pointer border-none ${getStatusStyle(order.orderStatus)}`}
                     >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                     </select>
                  </td>
                  <td className="px-8 py-6 text-right">
                     <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-black transition-all">
                           <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deleteOrder(order._id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-all"
                        >
                           <Trash2 className="w-4 h-4" />
                        </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-8 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
           <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Showing {filteredOrders.length} Orders</p>
           <div className="flex gap-2">
              <button className="p-2 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-black transition-all disabled:opacity-50" disabled><ChevronLeft className="w-5 h-5" /></button>
              <button className="p-2 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-black transition-all disabled:opacity-50" disabled><ChevronRight className="w-5 h-5" /></button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
