"use client";

import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 bg-black text-white px-4 py-2 rounded"
      >
        Filters
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 text-dark p-6 overflow-y-auto 
          transform transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "-translate-x-full"} 
          md:static md:translate-x-0
        `}
      >
        {/* Close on mobile */}
        <button
          className="md:hidden text-white mb-4"
          onClick={() => setOpen(false)}
        >
          ✕ Close
        </button>

        <div className="space-y-10">

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-3 text-sm tracking-wide">
              PRODUCT CATEGORIES
            </h3>
            <ul className="space-y-2 text-dark text-sm">
              {[
                "Dresses",
                "Sweatshirts",
                "Jeans",
                "Men",
                "Shorts",
                "Swimwear",
                "T-Shirts & Tops",
                "Trousers",
                "Jumpers & Cardigans",
              ].map((item) => (
                <li
                  key={item}
                  className="hover:text-black hover:font-semibold transition-all cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Colors */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">COLOR</h3>
            <div className="flex flex-wrap gap-3">
              {[
                "bg-blue-500",
                "bg-black",
                "bg-yellow-500",
                "bg-orange-500",
                "bg-brown-600",
                "bg-pink-400",
                "bg-green-600",
                "bg-red-600",
              ].map((c, idx) => (
                <div key={idx} className={`w-5 h-5 rounded-full ${c}`} />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">SIZES</h3>
            <div className="flex gap-3 flex-wrap">
              {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  className="border px-3 py-1 text-xs hover:bg-white hover:text-black"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">BRANDS</h3>

            <div className="relative">
              <input
                type="text"
                className="w-full bg-white text-black border px-3 py-2 rounded"
                placeholder="Search"
              />
              <span className="absolute right-3 top-2.5 text-black">🔍</span>
            </div>

            <div className="mt-4 space-y-2 text-dark text-sm">
              {[
                ["Adidas", 2],
                ["Balmain", 7],
                ["Balenciaga", 10],
                ["Burberry", 39],
                ["Kenzo", 95],
                ["Givenchy", 1092],
                ["Zara", 48],
              ].map(([brand, qty]) => (
                <div key={brand} className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>{brand}</span>
                  <span className="ml-auto">{qty}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">PRICE</h3>
            <input type="range" className="w-full" />
            <div className="flex justify-between text-xs mt-1">
              <span>Min: $32</span>
              <span>Max: $937</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}
