"use client";

import { useState, useEffect } from "react";
import { Menu, ChevronDown, Search, X } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [openBrowse, setOpenBrowse] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [browseItems, setBrowseItems] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const router = useRouter();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/category/allcategory`
        );

        // API response -> data array
        setBrowseItems(res.data.data); // browse items
        setAllCategories(res.data.data); // all categories (same array, can adjust)
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Filter categories for search input
  const filteredBrowse = browseItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredAll = allCategories.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navigate to shop page
  const handleCategoryClick = (slug) => {
    router.push(`/shop?category=${encodeURIComponent(slug)}`);
    setOpenBrowse(false);
    setMobileMenu(false);
    setSearchQuery("");
  };

  // Close menus on Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOpenBrowse(false);
        setMobileMenu(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="max-w-6xl mx-auto border-b px-4 md:px-6 flex items-center gap-3 py-2 relative">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden block text-gray-700 hover:text-gray-900"
        onClick={() => setMobileMenu(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Desktop Browse Categories */}
      <div className="hidden md:flex relative">
        <button
          onClick={() => setOpenBrowse(!openBrowse)}
          className="flex items-center gap-2 bg-yellow-500 px-4 py-2 rounded-md font-semibold text-sm hover:bg-yellow-600 transition"
        >
          <Menu className="w-5 h-5" />
          BROWSE CATEGORIES
          <ChevronDown className="w-4 h-4" />
        </button>

        {openBrowse && (
          <div className="absolute top-12 left-0 bg-white shadow-lg border w-64 rounded-md z-20 max-h-80 overflow-y-auto">
            {(filteredBrowse.length > 0 ? filteredBrowse : browseItems).map(
              (item) => (
                <p
                  key={item._id}
                  onClick={() => handleCategoryClick(item.slug)}
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer transition"
                >
                  {item.name}
                </p>
              )
            )}
          </div>
        )}
      </div>

      {/* Search Input */}
      <div className="relative flex-1 flex items-center bg-white border border-gray-300 rounded-md overflow-hidden">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-3 py-2 text-sm focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="absolute right-0 bg-gray-300 px-3 h-full flex items-center justify-center rounded-tr-md rounded-br-md hover:bg-gray-400 transition">
          <Search className="w-5 h-5 text-gray-700" />
        </button>

        {/* Live Search Dropdown */}
        {searchQuery && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg border rounded-md mt-1 z-30 max-h-60 overflow-y-auto">
            {filteredBrowse.length + filteredAll.length > 0 ? (
              <>
                {filteredBrowse.length > 0 && (
                  <div className="border-b">
                    <p className="px-4 py-2 text-gray-500 font-semibold text-xs">
                      Browse Categories
                    </p>
                    {filteredBrowse.map((item) => (
                      <p
                        key={item._id}
                        onClick={() => handleCategoryClick(item.slug)}
                        className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer transition"
                      >
                        {item.name}
                      </p>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="px-4 py-2 text-sm text-gray-400">No results found</p>
            )}
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileMenu && (
        <div className="fixed inset-0 bg-black/40 z-30 md:hidden">
          <div className="absolute top-0 left-0 w-64 bg-white h-full shadow-lg p-4 flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Menu</h3>
              <button onClick={() => setMobileMenu(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <h4 className="text-sm font-semibold mb-2">Browse Categories</h4>
            {(searchQuery ? filteredBrowse : browseItems).map((item) => (
              <p
                key={item._id}
                onClick={() => handleCategoryClick(item.slug)}
                className="py-2 border-b text-sm cursor-pointer hover:bg-gray-100 transition"
              >
                {item.name}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
