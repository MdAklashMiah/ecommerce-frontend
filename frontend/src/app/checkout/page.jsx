"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChevronRight, CreditCard, Truck, ShieldCheck, MapPin, Phone, User, Loader2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useGetCartQuery } from "@/slices/cartApiSlice";
import { useCreateOrderMutation } from "@/slices/orderApiSlice";
import Container from "@/components/common/Container";

const CheckoutPage = () => {
  const user = useSelector((state) => state?.userInfo?.value);
  const { data: cartData, isLoading: cartLoading } = useGetCartQuery(user?._id, { skip: !user?._id });
  const [createOrder, { isLoading: placingOrder }] = useCreateOrderMutation();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "cod",
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, name: user.name || "", phone: user.phone || "" }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cart = cartData?.data || [];
  const subtotal = cart.reduce((sum, item) => sum + (item.product?.discountprice || 0) * item.quantity, 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const tax = subtotal * 0.02;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async (e) => {
    if (e) e.preventDefault();
    if (!cart.length) return alert("Cart is empty");
    if (!formData.phone || !formData.address || !formData.city) {
      return alert("Please fill all required fields");
    }

    try {
      const res = await createOrder({
        user: user._id,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        paymentMethod: formData.paymentMethod,
        orderStatus: "pending",
        discount: 0
      }).unwrap();

      if (formData.paymentMethod === "online" && res.url) {
        window.location.href = res.url;
      } else {
        alert("Order placed successfully!");
        window.location.href = "/cart?success=true";
      }
    } catch (error) {
      alert(error.data?.message || "Failed to place order");
    }
  };

  if (cartLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <Loader2 className="w-10 h-10 animate-spin text-black mb-4" />
      <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px]">Securing your transaction...</p>
    </div>
  );
  
  if (!cart.length) return (
    <main className="min-h-screen flex items-center justify-center bg-white pt-20">
      <div className="text-center space-y-8 animate-fade-in px-6">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <ShoppingCart className="w-10 h-10 text-gray-200" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tighter italic">Checkout <span className="text-gray-400">Locked</span></h2>
        <p className="text-gray-500 max-w-sm mx-auto font-medium">Your selection is currently empty. Add masterpieces to your bag to proceed.</p>
        <Link href="/shop" className="inline-block bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-gray-900 transition-all shadow-xl shadow-black/20">Explore the Shop</Link>
      </div>
    </main>
  );

  return (
    <main className="bg-white min-h-screen pt-32 pb-24">
      <Container>
        <div className="mb-16">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter italic">Secured <span className="text-gray-400">Checkout</span></h1>
          <p className="text-gray-500 mt-2 font-medium uppercase tracking-widest text-[10px]">Step into the final stage of acquisition</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-8 space-y-12">
            {/* Shipping Information */}
            <div className="bg-white rounded-[32px] border border-gray-100 p-10 shadow-2xl shadow-black/[0.02]">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg shadow-black/10">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-xl font-black text-gray-900 tracking-tight">Shipping Destination</h3>
                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Where should we deliver your selection?</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Recipient Name</label>
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      className="w-full bg-gray-50 border border-gray-50 px-12 py-4 rounded-2xl text-sm font-bold focus:bg-white focus:border-black outline-none transition-all" 
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Contact Phone</label>
                  <div className="relative group">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
                    <input 
                      type="text" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      className="w-full bg-gray-50 border border-gray-50 px-12 py-4 rounded-2xl text-sm font-bold focus:bg-white focus:border-black outline-none transition-all" 
                    />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Physical Address</label>
                  <div className="relative group">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
                    <input 
                      type="text" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleInputChange} 
                      className="w-full bg-gray-50 border border-gray-50 px-12 py-4 rounded-2xl text-sm font-bold focus:bg-white focus:border-black outline-none transition-all" 
                    />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">City / Metropolitan Area</label>
                  <input 
                    type="text" 
                    name="city" 
                    value={formData.city} 
                    onChange={handleInputChange} 
                    className="w-full bg-gray-50 border border-gray-50 px-6 py-4 rounded-2xl text-sm font-bold focus:bg-white focus:border-black outline-none transition-all" 
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-[32px] border border-gray-100 p-10 shadow-2xl shadow-black/[0.02]">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg shadow-black/10">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-xl font-black text-gray-900 tracking-tight">Payment Protocol</h3>
                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Select your preferred transaction method</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className={`flex items-center gap-6 p-8 rounded-3xl cursor-pointer border-2 transition-all ${formData.paymentMethod === "cod" ? "border-black bg-black/[0.01]" : "border-gray-50 bg-gray-50/50 hover:bg-white hover:border-gray-200"}`}>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === "cod" ? "border-black" : "border-gray-200"}`}>
                    {formData.paymentMethod === "cod" && <div className="w-3 h-3 bg-black rounded-full" />}
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900 uppercase tracking-widest">Cash on Delivery</p>
                    <p className="text-[10px] text-gray-400 mt-1 font-medium">Pay upon physical handover</p>
                  </div>
                  <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === "cod"} onChange={handleInputChange} className="hidden" />
                </label>

                <label className={`flex items-center gap-6 p-8 rounded-3xl cursor-pointer border-2 transition-all ${formData.paymentMethod === "online" ? "border-black bg-black/[0.01]" : "border-gray-50 bg-gray-50/50 hover:bg-white hover:border-gray-200"}`}>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === "online" ? "border-black" : "border-gray-200"}`}>
                    {formData.paymentMethod === "online" && <div className="w-3 h-3 bg-black rounded-full" />}
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900 uppercase tracking-widest">Digital Payment</p>
                    <p className="text-[10px] text-gray-400 mt-1 font-medium">Secured via SSLCommerz</p>
                  </div>
                  <input type="radio" name="paymentMethod" value="online" checked={formData.paymentMethod === "online"} onChange={handleInputChange} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-2xl shadow-black/5 overflow-hidden">
              <div className="p-8 border-b border-gray-50 bg-gray-50/30">
                <h3 className="text-lg font-black text-gray-900 tracking-tight italic">Order <span className="text-gray-400">Ledger</span></h3>
              </div>
              <div className="p-8 space-y-8">
                <div className="space-y-6 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item._id} className="flex gap-5 group">
                      <div className="w-16 h-20 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 p-2 shrink-0">
                        <img src={item.product?.images?.[0]} alt="" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest truncate">{item.product?.title}</h4>
                        <p className="text-[9px] text-gray-400 mt-1 font-medium uppercase tracking-widest">Qty: {item.quantity} {item.variants ? `| ${item.variants.size}` : ""}</p>
                        <p className="text-xs font-black text-black mt-1">৳ {(item.product?.discountprice * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-5 pt-8 border-t border-gray-50">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-black">৳ {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    <span>Shipping</span>
                    <span className="text-black">৳ {shipping.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    <span>Est. Surcharge (2%)</span>
                    <span className="text-black">৳ {tax.toFixed(0)}</span>
                  </div>
                  <div className="pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-900">Total</span>
                      <span className="text-3xl font-black text-black tracking-tighter italic">৳ {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={placingOrder}
                  className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-xl hover:bg-gray-900 disabled:opacity-50 transition-all group"
                >
                  {placingOrder ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>Authorize Acquisition <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>

                <div className="flex items-center justify-center gap-3 pt-4">
                   <ShieldCheck className="w-4 h-4 text-green-500" />
                   <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Encrypted Transaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default CheckoutPage;
