"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Minus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  
  // 🔹 Fetch Cart
  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/cart/mycart`,
        { withCredentials: true }
      );
      setCart(res.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 🔹 Update Quantity
  const updateQty = async (id, qty) => {
    if (qty < 1) return;

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API}/cart/update/${id}`,
        { quantity: qty },
        { withCredentials: true }
      );
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Remove Item
  const removeItem = async (id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API}/cart/remove/${id}`,
        { withCredentials: true }
      );
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Total Price
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  if (loading) {
    return <p className="text-center pt-40">Loading cart...</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 pt-36 pb-20">
      <h1 className="text-3xl font-semibold mb-10">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 mb-6">Your cart is empty</p>
          <Link
            href="/shop"
            className="px-6 py-3 bg-black text-white rounded"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* LEFT — CART ITEMS */}
          <div className="md:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex gap-6 border p-4 rounded-lg"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-28 h-28 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {item.product.title}
                  </h3>

                  {item.variants && (
                    <p className="text-sm text-gray-500">
                      Size: {item.variants.size} | Color:{" "}
                      {item.variants.color}
                    </p>
                  )}

                  <p className="font-bold mt-1">
                    ৳ {item.product.discountprice}
                  </p>

                  {/* QTY */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() =>
                        updateQty(item._id, item.quantity - 1)
                      }
                      className="border p-1"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQty(item._id, item.quantity + 1)
                      }
                      className="border p-1"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeItem(item._id)}
                  className="text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT — SUMMARY */}
          <div className="border p-6 rounded-lg h-fit">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>৳ {totalAmount}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Delivery</span>
              <span>৳ 0</span>
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-4">
              <span>Total</span>
              <span>৳ {totalAmount}</span>
            </div>

            <button className="w-full mt-6 py-3 bg-black text-white rounded">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
