"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const CheckoutPage = () => {
  const user = useSelector((state) => state?.userInfo?.value);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  // ================= FETCH CART =================
  const fetchCart = async () => {
    if (!user?._id) return;

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/cart/usercart/${user._id}`
      );
      setCart(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (error) {
      console.error("Fetch cart error:", error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  // ================= REMOVE ITEM =================
  const removeItem = async (cartItemId) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API}/cart/delete/${cartItemId}`);
      setCart((prev) => prev.filter((item) => item._id !== cartItemId));
    } catch (error) {
      console.error("Remove error:", error);
    }
  };

  // ================= UPDATE QUANTITY =================
  const updateQty = async (cartItemId, qty) => {
    if (qty < 1) return;

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API}/cart/update/${cartItemId}`, { quantity: qty });
      setCart((prev) =>
        prev.map((item) =>
          item._id === cartItemId ? { ...item, quantity: qty } : item
        )
      );
    } catch (error) {
      console.error("Qty update error:", error);
    }
  };

  // ================= CALCULATIONS =================
  const subtotal = cart.reduce((sum, item) => sum + item.product.discountprice * item.quantity, 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const tax = subtotal * 0.02;
  const total = subtotal + shipping + tax;

  // ================= PLACE ORDER =================
  const placeOrder = async () => {
    if (!cart.length) return alert("Cart is empty");

    setPlacingOrder(true);
    try {
      // Example: call your backend order API
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/order/create`, {
        userId: user._id,
        cartItems: cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          totalPrice: item.product.discountprice * item.quantity,
          variants: item.variants ? item.variants : null,
        })),
        subtotal,
        shipping,
        tax,
        total,
      });

      alert(res.data.message || "Order placed successfully!");
      setCart([]); // clear cart on success
    } catch (error) {
      console.error("Order error:", error);
      alert("Failed to place order");
    } finally {
      setPlacingOrder(false);
    }
  };

  // ================= UI STATES =================
  if (loading) return <p className="text-center py-20">Loading cart...</p>;
  if (!cart.length) return <p className="text-center py-20">Your cart is empty 🛒</p>;

  return (
    <div className="max-w-5xl mx-auto bg-white p-4 py-24">
      <h2 className="text-2xl font-semibold mb-8">Checkout</h2>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* ================= CART ITEMS ================= */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item._id} className="grid grid-cols-2 sm:grid-cols-3 gap-6 border-b pb-6">
              <div className="col-span-2 flex gap-4">
                <img
                  src={item.product.images?.[0]}
                  className="w-28 h-28 object-contain bg-gray-100 p-2 rounded"
                  alt={item.product.title}
                />

                <div>
                  <h3 className="font-semibold">{item.product.title}</h3>
                  {item.variants && (
                    <p className="text-sm text-gray-500 mt-1">
                      Size: {item.variants.size} | Color: {item.variants.color}
                    </p>
                  )}
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-xs text-red-500 font-semibold mt-4"
                  >
                    REMOVE
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between">
                <p className="font-semibold">৳ {item.product.discountprice}</p>
                <div className="flex items-center border rounded">
                  <button
                    onClick={() => updateQty(item._id, item.quantity - 1)}
                    className="px-3 py-1"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => updateQty(item._id, item.quantity + 1)}
                    className="px-3 py-1"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= ORDER SUMMARY ================= */}
        <div className="bg-gray-100 p-5 rounded h-fit">
          <h3 className="font-semibold mb-4">Order Summary</h3>

          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              Subtotal <span>৳ {subtotal.toFixed(2)}</span>
            </li>
            <li className="flex justify-between">
              Shipping <span>৳ {shipping.toFixed(2)}</span>
            </li>
            <li className="flex justify-between">
              Tax <span>৳ {tax.toFixed(2)}</span>
            </li>
            <hr />
            <li className="flex justify-between font-semibold">
              Total <span>৳ {total.toFixed(2)}</span>
            </li>
          </ul>

          <button
            onClick={placeOrder}
            disabled={placingOrder}
            className={`w-full mt-6 py-2 rounded text-white ${
              placingOrder ? "bg-gray-600 cursor-not-allowed" : "bg-black"
            }`}
          >
            {placingOrder ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
