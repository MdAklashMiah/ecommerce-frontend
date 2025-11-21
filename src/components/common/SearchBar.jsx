"use client";

import { useState } from "react";
import { Menu, ChevronDown, Search, X } from "lucide-react";

export default function SearchBar() {
  const [openBrowse, setOpenBrowse] = useState(false);
  const [openAllCategory, setOpenAllCategory] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const browseItems = [
    "Electronics",
    "Fashion",
    "Home & Furniture",
    "Sports",
    "Beauty Products",
  ];

  const allCategories = [
    "All Category",
    "Trending",
    "Top Rated",
    "Best Seller",
    "New Arrival",
  ];

  return (
    <div className="max-w-4/5 mx-auto  border-b  px-4  flex items-center gap-3">
      {/* Mobile Menu Button */}
      <button className="md:hidden block" onClick={() => setMobileMenu(true)}>
        <Menu className="w-6 h-6" />
      </button>

      {/* Browse Categories (desktop only) */}
      <div className="hidden md:flex relative">
        <button
          onClick={() => setOpenBrowse(!openBrowse)}
          className="flex items-center gap-2 bg-yellow-500 px-4 py-2 rounded-md font-semibold text-sm"
        >
          <Menu className="w-5 h-5" />
          BROWSE CATEGORIES
          <ChevronDown className="w-4 h-4" />
        </button>

        {openBrowse && (
          <div className="absolute top-12 left-0 bg-white shadow-md border w-full rounded-md z-20">
            {browseItems.map((item, i) => (
              <p
                key={i}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative flex items-center bg-white border border-gray-300 rounded-md flex-1 px-3 py-2">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full outline-none px-3 text-sm"
        />
        <button className="bg-gray-300 px-4 py-2 absolute right-0 rounded-tr-md rounded-br-md cursor-pointer">
          <Search className="w-5 h-5 text-dark" />
        </button>
        {/* <div className="relative hidden md:flex">
          <button
            onClick={() => setOpenAllCategory(!openAllCategory)}
            className="flex  items-center gap-2 border border-gray-300 px-4 py-2 rounded-md font-semibold text-nowrap text-sm"
          >
            ALL CATEGORY
            <ChevronDown className="w-4 h-4" />
          </button>

          {openAllCategory && (
            <div className="absolute top-12 right-0 bg-white shadow-md border w-40 rounded-md z-20">
              {allCategories.map((item, i) => (
                <p
                  key={i}
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </p>
              ))}
            </div>
          )}
        </div> */}
      </div>

      {/* All Category Dropdown */}

      {/* Mobile Full Menu Drawer */}
      {mobileMenu && (
        <div className="fixed inset-0 bg-black/40 z-30 md:hidden">
          <div className="absolute top-0 left-0 w-64 bg-white h-full shadow-lg p-4">
            <button className="mb-4" onClick={() => setMobileMenu(false)}>
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-sm font-bold mb-2">Browse Categories</h3>
            {browseItems.map((item, i) => (
              <p
                key={i}
                className="py-2 border-b text-sm cursor-pointer hover:bg-gray-100"
              >
                {item}
              </p>
            ))}

            <h3 className="text-sm font-bold mt-4 mb-2">All Categories</h3>
            {allCategories.map((item, i) => (
              <p
                key={i}
                className="py-2 border-b text-sm cursor-pointer hover:bg-gray-100"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
