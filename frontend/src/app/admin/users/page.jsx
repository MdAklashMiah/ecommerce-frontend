"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Shield, 
  User, 
  Mail, 
  Phone,
  Trash2,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/auth/allusers`, {
        headers: { token }
      });
      setUsers(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.phone?.includes(searchTerm)
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight italic">User <span className="text-gray-400">Registry</span></h2>
          <p className="text-gray-500 mt-1 font-medium">Manage customer accounts, roles, and security.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm text-center min-w-[120px]">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total Users</p>
              <p className="text-xl font-black text-black">{users.length}</p>
           </div>
           <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm text-center min-w-[120px]">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Admins</p>
              <p className="text-xl font-black text-black">{users.filter(u => u.role === 'admin').length}</p>
           </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
          <input 
            type="text" 
            placeholder="Search by Name, Email, or Phone..." 
            className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 rounded-2xl py-4 pl-12 pr-6 text-sm outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 bg-gray-50 text-gray-900 px-6 py-4 rounded-2xl font-bold text-xs hover:bg-gray-100 transition-all">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">User Identity</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Contact Details</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Access Level</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Verification</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [1,2,3,4,5].map(i => (
                  <tr key={i} className="animate-pulse h-24 bg-gray-50/20"><td colSpan={5}></td></tr>
                ))
              ) : filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center font-bold shadow-lg shadow-black/10">
                          {user.name?.charAt(0).toUpperCase()}
                       </div>
                       <div>
                          <p className="text-xs font-black text-gray-900 uppercase tracking-tight">{user.name}</p>
                          <p className="text-[10px] text-gray-400 font-medium mt-1">ID: #{user._id.slice(-6).toUpperCase()}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                       <p className="text-xs font-bold text-gray-900 flex items-center gap-2"><Mail className="w-3 h-3 text-gray-400" /> {user.email}</p>
                       <p className="text-[10px] text-gray-400 font-medium flex items-center gap-2 tracking-widest"><Phone className="w-3 h-3 text-gray-400" /> {user.phone || 'N/A'}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                     <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-2 w-fit ${user.role === 'admin' ? 'bg-purple-50 text-purple-600' : 'bg-gray-100 text-gray-600'}`}>
                        {user.role === 'admin' ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                        {user.role}
                     </span>
                  </td>
                  <td className="px-8 py-6">
                     {user.verify ? (
                        <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-green-600">
                           <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                        </span>
                     ) : (
                        <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-red-400">
                           <XCircle className="w-3.5 h-3.5" /> Unverified
                        </span>
                     )}
                  </td>
                  <td className="px-8 py-6 text-right">
                     <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-black transition-all">
                           <MoreVertical className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-all">
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
           <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Showing {filteredUsers.length} Users</p>
           <div className="flex gap-2">
              <button className="p-2 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-black transition-all disabled:opacity-50" disabled><ChevronLeft className="w-5 h-5" /></button>
              <button className="p-2 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-black transition-all disabled:opacity-50" disabled><ChevronRight className="w-5 h-5" /></button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
