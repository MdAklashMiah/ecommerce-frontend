"use client";

import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { useGetCartQuery, useRemoveFromCartMutation, useUpdateCartMutation } from "@/slices/cartApiSlice";
import Container from "@/components/common/Container";

const CartPage = () => {
  const user = useSelector((state) => state?.userInfo?.value);
  const { data: cartData, isLoading } = useGetCartQuery(user?._id, { skip: !user?._id });
  const [removeFromCart] = useRemoveFromCartMutation();
  const [updateCart] = useUpdateCartMutation();

  const cart = cartData?.data || [];

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.product?.discountprice || 0) * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  if (isLoading) {
     return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
           <Loader2 className="w-10 h-10 animate-spin text-black mb-4" />
           <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px]">Assembling your selection...</p>
        </div>
     );
  }

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white pt-20">
        <div className="text-center space-y-8 animate-fade-in px-6">
           <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <ShoppingBag className="w-10 h-10 text-gray-200" />
           </div>
           <h2 className="text-3xl font-black text-gray-900 tracking-tighter italic">Identify <span className="text-gray-400">Yourself</span></h2>
           <p className="text-gray-500 max-w-sm mx-auto font-medium">Please login to access your curated shopping selection and personalized offers.</p>
           <button className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-gray-900 transition-all shadow-xl shadow-black/20">Sign In to Continue</button>
        </div>
      </main>
    );
  }

  if (!cart.length) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white pt-20">
        <div className="text-center space-y-8 animate-fade-in px-6">
           <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <ShoppingBag className="w-10 h-10 text-gray-200" />
           </div>
           <h2 className="text-3xl font-black text-gray-900 tracking-tighter italic">Your Bag is <span className="text-gray-400">Empty</span></h2>
           <p className="text-gray-500 max-w-sm mx-auto font-medium">It seems you haven't discovered your next favorite piece yet. Browse our latest arrivals.</p>
           <Link href="/shop" className="inline-block bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-gray-900 transition-all shadow-xl shadow-black/20">Start Exploring</Link>
        </div>
      </main>
    );
  }

  return (
    <div className="bg-white min-h-screen py-24">
      <Container>
        <div className="mb-16">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter italic">Shopping <span className="text-gray-400">Bag</span></h1>
          <p className="text-gray-500 mt-2 font-medium uppercase tracking-widest text-[10px]">{cart.length} Masterpieces selected</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-10">
            {cart.map((item) => (
              <div key={item._id} className="flex flex-col sm:flex-row gap-8 items-center group animate-fade-in pb-10 border-b border-gray-50 last:border-0">
                {/* Image */}
                <div className="w-full sm:w-40 aspect-[3/4] bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 p-4 shrink-0 shadow-sm transition-all group-hover:shadow-xl group-hover:shadow-black/5">
                  <img
                    src={item.product?.images?.[0]}
                    alt={item.product?.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-4 text-center sm:text-left">
                  <div>
                    <Link href={`/shop/${item.product?.slug}`} className="text-xl font-black text-gray-900 uppercase tracking-tight hover:text-gray-500 transition-colors">
                      {item.product?.title}
                    </Link>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-2">
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                          Size <span className="text-black">{item.variants?.size || 'N/A'}</span>
                       </span>
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                          Color <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.variants?.color }} /> {item.variants?.color || 'N/A'}
                       </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start gap-6 pt-4">
                    <div className="flex items-center gap-4 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                      <button 
                        onClick={() => updateCart({ id: item._id, quantity: Math.max(1, item.quantity - 1) })}
                        className="p-2.5 bg-white text-gray-400 hover:text-black rounded-xl shadow-sm transition-all"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-black text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateCart({ id: item._id, quantity: item.quantity + 1 })}
                        className="p-2.5 bg-white text-gray-400 hover:text-black rounded-xl shadow-sm transition-all"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="p-3 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="sm:text-right text-center">
                  <p className="text-2xl font-black text-black tracking-tighter">৳ {(item.product?.discountprice * item.quantity).toLocaleString()}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">৳ {item.product?.discountprice.toLocaleString()} / Unit</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
             <div className="bg-white border border-gray-100 p-10 rounded-[32px] shadow-2xl shadow-black/5 sticky top-32 space-y-10">
               <h3 className="text-xl font-black text-gray-900 tracking-tight italic">Order <span className="text-gray-400">Economics</span></h3>
               
               <div className="space-y-6">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                   <span>Inventory Subtotal</span>
                   <span className="text-black">৳ {subtotal.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                   <span>Standard Shipping</span>
                   <span className="text-black">৳ {shipping.toLocaleString()}</span>
                 </div>
                 <div className="h-px bg-gray-50" />
                 <div className="flex justify-between items-end">
                   <span className="text-sm font-black uppercase tracking-[0.2em] text-gray-900">Final Amount</span>
                   <span className="text-3xl font-black text-black tracking-tighter italic">৳ {total.toLocaleString()}</span>
                 </div>
               </div>

               <Link href="/checkout" className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-gray-900 transition-all shadow-xl shadow-black/20 group">
                 Proceed to Checkout <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Link>

               <div className="flex flex-col gap-4 pt-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                     <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <ShieldCheck className="w-5 h-5 text-green-500" />
                     </div>
                     <div className="flex-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-900">Secure Checkout</p>
                        <p className="text-[9px] text-gray-400 font-medium">SSL Encrypted Payment</p>
                     </div>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
