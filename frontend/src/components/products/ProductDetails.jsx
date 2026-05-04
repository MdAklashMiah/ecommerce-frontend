"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Heart, Plus, Minus, Share2 } from "lucide-react";
import { useSelector } from "react-redux";
import RelatedProducts from "./RelatedProducts";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAddToCartMutation } from "@/slices/cartApiSlice";
import { toast } from "react-hot-toast";

export default function ProductView({ product }) {
  if (!product || !product.images?.length) {
    return (
      <div className="pt-36 pb-16 max-w-7xl mx-auto px-6 animate-pulse">
         <div className="grid md:grid-cols-2 gap-14">
            <div className="h-[500px] bg-gray-200 rounded-lg"></div>
            <div className="space-y-6 pt-4">
               <div className="h-8 bg-gray-200 rounded w-3/4"></div>
               <div className="h-6 bg-gray-200 rounded w-1/4"></div>
               <div className="h-24 bg-gray-200 rounded w-full"></div>
               <div className="h-12 bg-gray-200 rounded w-1/2"></div>
            </div>
         </div>
      </div>
    );
  }

  const router = useRouter();
  const [addToCart] = useAddToCartMutation();

  /* ---------------- STATE ---------------- */
  const [mainSlider, setMainSlider] = useState(null);
  const [qty, setQty] = useState(1);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const user = useSelector((state) => state?.userInfo?.value);

  /* ---------------- SAFE VARIANTS ---------------- */
  const variants = product.variants || [];

  const sizes = [...new Set(variants.map((v) => v.size))].filter(Boolean);
  const colors = [...new Set(variants.map((v) => v.color))].filter(Boolean);

  /* ---------------- AVAILABLE OPTIONS ---------------- */
  const availableColorsBySize = selectedSize
    ? variants.filter((v) => v.size === selectedSize).map((v) => v.color)
    : [];

  const availableSizesByColor = selectedColor
    ? variants.filter((v) => v.color === selectedColor).map((v) => v.size)
    : [];

  /* ---------------- RESOLVE VARIANT ---------------- */
  const resolveVariant = (size, color) => {
    const found = variants.find((v) => v.size === size && v.color === color);
    setSelectedVariant(found || null);
  };

  /* ---------------- SLIDER SETTINGS ---------------- */
  const mainSettings = {
    arrows: false,
    fade: true,
    autoplay: false,
  };

  const thumbSettings = {
    slidesToShow: Math.min(product.images.length, 5),
    arrows: false,
    swipeToSlide: true,
    focusOnSelect: true,
  };

  /* ---------------- ADD TO CART ---------------- */
  const handleAddToCart = async () => {
    if (!user) {
      toast.error("IDENTIFICATION REQUIRED");
      return;
    }

    const hasVariants = variants.length > 0;

    if (product.variantType === "multiVariant") {
      if (hasVariants && !selectedVariant) {
        toast.error("SPECIFY SIZE & COLOR");
        return;
      }
      if (!hasVariants && product.stock <= 0) {
        toast.error("ITEM UNAVAILABLE");
        return;
      }
    }

    try {
      const payload = {
        user: user._id,
        product: product._id,
        quantity: qty,
      };

      if (product.variantType === "multiVariant" && selectedVariant) {
        payload.variants = selectedVariant._id;
      } else if (product.variantType === "singleVariant" && hasVariants) {
        payload.variants = variants[0]._id;
      }

      await addToCart(payload).unwrap();
      toast.success("ADDED TO BAG");
      router.push("/cart");
    } catch (error) {
      toast.error(error.data?.message || "TRANSACTION FAILED");
    }
  };

  return (
    <section className="bg-white pb-24 pt-12">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-4 mb-10">
        <div className="max-w-7xl mx-auto px-6 flex items-center text-sm text-gray-500">
           <Link href="/" className="hover:text-black transition">Home</Link>
           <ChevronRight className="w-4 h-4 mx-2" />
           <Link href="/shop" className="hover:text-black transition">Shop</Link>
           <ChevronRight className="w-4 h-4 mx-2" />
           <span className="text-black font-medium truncate">{product.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-x-16 gap-y-12">
        {/* ---------------- LEFT IMAGES ---------------- */}
        <div className="space-y-4">
          <div className="relative bg-gray-50 rounded-xl overflow-hidden group">
            <Slider {...mainSettings} ref={setMainSlider}>
              {product.images.map((img, i) => (
                <div key={i} className="h-[500px] lg:h-[600px] outline-none">
                  <img
                    src={img}
                    alt={product.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </Slider>

            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => mainSlider?.slickPrev()}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur flex items-center justify-center rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-gray-800"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => mainSlider?.slickNext()}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur flex items-center justify-center rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-gray-800"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {product.images.length > 1 && (
            <Slider {...thumbSettings} className="thumb-slider mx-[-8px]">
              {product.images.map((img, i) => (
                <div key={i} className="px-2 outline-none">
                  <div 
                    className="h-24 rounded-lg overflow-hidden border-2 border-transparent hover:border-gray-300 cursor-pointer transition-colors"
                    onClick={() => mainSlider?.slickGoTo(i)}
                  >
                    <img
                      src={img}
                      alt={`Thumb ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>

        {/* ---------------- RIGHT DETAILS ---------------- */}
        <div className="flex flex-col">
          <div className="mb-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-2">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                   <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <span className="text-sm text-gray-500 underline cursor-pointer">Read 12 Reviews</span>
            </div>

            <div className="flex items-end gap-3">
              <p className="text-3xl font-bold text-gray-900">৳ {product.discountprice}</p>
              {product.discountprice < product.price && (
                <p className="text-lg text-gray-400 line-through mb-1">৳ {product.price}</p>
              )}
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          <hr className="border-gray-100 mb-8" />

          {/* ---------------- MULTI VARIANT SELECTORS ---------------- */}
          {product.variantType === "multiVariant" && (
            <div className="space-y-6 mb-8">
              {variants.length > 0 ? (
                <>
                  {/* COLOR */}
                  {colors.length > 0 && (
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <p className="text-sm font-semibold uppercase tracking-wider text-gray-900">Color</p>
                        <span className="text-sm text-gray-500">{selectedColor || "Select a color"}</span>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {colors.map((color) => {
                          const disabled = selectedSize && !availableColorsBySize.includes(color);
                          return (
                            <button
                              key={color}
                              disabled={disabled}
                              onClick={() => {
                                if (disabled) return;
                                setSelectedColor(color);
                                setSelectedVariant(null);
                                if (selectedSize) resolveVariant(selectedSize, color);
                              }}
                              className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center
                                ${selectedColor === color ? "border-black scale-110" : "border-transparent hover:border-gray-300"}
                                ${disabled ? "opacity-20 cursor-not-allowed" : "cursor-pointer"}
                              `}
                            >
                              <span className="w-8 h-8 rounded-full border border-gray-200 block" style={{ backgroundColor: color }}></span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* SIZE */}
                  {sizes.length > 0 && (
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <p className="text-sm font-semibold uppercase tracking-wider text-gray-900">Size</p>
                        <span className="text-sm text-gray-500 underline cursor-pointer hover:text-black transition">Size Guide</span>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {sizes.map((size) => {
                          const disabled = selectedColor && !availableSizesByColor.includes(size);
                          return (
                            <button
                              key={size}
                              disabled={disabled}
                              onClick={() => {
                                if (disabled) return;
                                setSelectedSize(size);
                                setSelectedVariant(null);
                                if (selectedColor) resolveVariant(size, selectedColor);
                              }}
                              className={`min-w-[3rem] px-4 py-2 text-sm font-medium border rounded-md transition-colors
                                ${selectedSize === size ? "border-black bg-black text-white" : "border-gray-200 text-gray-800 hover:border-gray-900"}
                                ${disabled ? "opacity-30 cursor-not-allowed bg-gray-50 text-gray-400" : ""}
                              `}
                            >
                              {size}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">Options Unavailable</p>
                  <p className="text-xs text-orange-700 mt-1">This masterpiece currently has no variations. Contact concierge for bespoke orders.</p>
                </div>
              )}
            </div>
          )}

          {/* ---------------- SINGLE VARIANT INFO ---------------- */}
          {product.variantType === "singleVariant" && (
            <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
              {variants.length > 0 ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Standard Edition</p>
                    <p className="text-sm text-gray-900 font-bold">
                      {variants[0].size || "One Size"} {variants[0].color && ` | ${variants[0].color}`}
                    </p>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">Limited stock specifications apply.</p>
              )}
            </div>
          )}

          {/* ---------------- ACTION BUTTONS ---------------- */}
          <div className="flex flex-col sm:flex-row items-stretch gap-4 mt-auto mb-8">
            <div className="flex items-center justify-between border border-gray-300 rounded-md bg-white w-full sm:w-32 h-14">
              <button
                onClick={() => qty > 1 && setQty(qty - 1)}
                className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black transition"
              >
                <Minus size={18} />
              </button>
              <span className="font-semibold text-lg">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black transition"
              >
                <Plus size={18} />
              </button>
            </div>

            <button 
              onClick={handleAddToCart}
              className="flex-1 h-14 bg-black text-white rounded-md font-bold tracking-wide uppercase hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              Add to Cart
            </button>
          </div>

          <div className="flex items-center gap-6 border-t border-gray-100 pt-6">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-500 transition-colors group">
              <Heart className="w-5 h-5 group-hover:fill-current" /> 
              Add to Wishlist
            </button>
            <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors">
              <Share2 className="w-5 h-5" /> 
              Share
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-24">
         <RelatedProducts product={product} />
      </div>
    </section>
  );
}
