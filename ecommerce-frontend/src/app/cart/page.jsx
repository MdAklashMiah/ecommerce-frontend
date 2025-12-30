"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const CartPage = () => {
  const user = useSelector((state) => state?.userInfo?.value);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ========== FETCH CART ========== */
  useEffect(() => {
    if (!user?._id) return;

    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/cart/usercart/${user._id}`
        );
        setCart(res.data?.data || []);
      } catch (error) {
        console.error(error);
        setCart([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  /* ========== REMOVE ITEM ========== */
  const removeItem = async (id) => {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API}/cart/delete/${id}`
    );
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  /* ========== UPDATE QTY ========== */
  const updateQty = async (id, qty) => {
    if (qty < 1) return;

    await axios.put(
      `${process.env.NEXT_PUBLIC_API}/cart/update/${id}`,
      { quantity: qty }
    );

    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  /* ========== CALCULATION ========== */
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.discountprice * item.quantity,
    0
  );
  const shipping = subtotal ? 50 : 0;
  const total = subtotal + shipping;

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!cart.length)
    return <p className="text-center py-20">Cart is empty 🛒</p>;

  return (
    <div className="max-w-6xl mx-auto py-24 px-4">
      <h2 className="text-2xl font-semibold mb-8">Shopping Cart</h2>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* ITEMS */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between border-b pb-6">
              <div className="flex gap-4">
                <img
                  src={item.product.images[0]}
                  className="w-24 h-24 object-contain bg-gray-100 p-2 rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.product.title}</h3>
                  {item.variants && (
                    <p className="text-sm text-gray-500">
                      {item.variants.size} / {item.variants.color}
                    </p>
                  )}
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-500 text-xs mt-2"
                  >
                    REMOVE
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p>৳ {item.product.discountprice}</p>
                <div className="flex border mt-2">
                  <button onClick={() => updateQty(item._id, item.quantity - 1)}>-</button>
                  <span className="px-4">{item.quantity}</span>
                  <button onClick={() => updateQty(item._id, item.quantity + 1)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="bg-gray-100 p-5 rounded h-fit">
          <p>Subtotal: ৳ {subtotal.toFixed(2)}</p>
          <p>Shipping: ৳ {shipping.toFixed(2)}</p>
          <hr className="my-2" />
          <p className="font-semibold">Total: ৳ {total.toFixed(2)}</p>
          <button className="w-full mt-4 bg-black text-white py-2 rounded">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
