"use client";

import { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Plus,
  Minus,
  Maximize2,
} from "lucide-react";
import RelatedProducts from "./RelatedProducts";

export default function ProductView() {
  const images = [
    "/images/products/images.png",
    "/images/products/product1.jpg",
    "/images/products/images.png",
    "/images/products/product1.jpg",
  ];

  const [mainSlider, setMainSlider] = useState(null);
  const [thumbSlider, setThumbSlider] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const mainSettings = {
    arrows: false,
    fade: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3000,
    asNavFor: thumbSlider,
  };

  const thumbSettings = {
    slidesToShow: 4,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: false,
    asNavFor: mainSlider,
  };

  return (
    <section className="bg-white text-gray-900 pb-16 pt-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-14">
        {/* LEFT — PRODUCT IMAGES */}
        <div>
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            {/* Main Slider */}
            <Slider {...mainSettings} ref={(slider) => setMainSlider(slider)}>
              {images.map((img, i) => (
                <div key={i} className="relative h-[450px] md:h-[520px]">
                  <Image
                    src={img}
                    alt="Product"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </Slider>

            {/* Left Arrow */}
            <button
              onClick={() => mainSlider?.slickPrev()}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => mainSlider?.slickNext()}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center"
            >
              <ChevronRight size={18} />
            </button>

            {/* Fullscreen Icon */}
            <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
              <Maximize2 size={18} />
            </button>
          </div>

          {/* Thumbnail Slider */}
          <div className="mt-4">
            <Slider {...thumbSettings} ref={(slider) => setThumbSlider(slider)}>
              {images.map((img, i) => (
                <div key={i} className="p-1">
                  <div className="w-full h-20 rounded-md overflow-hidden border">
                    <Image
                      src={img}
                      alt="Thumbnail"
                      width={100}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* RIGHT — PRODUCT DETAILS */}
        <div>
          <h2 className="text-3xl font-semibold mb-2">
            Lightweight Puffer Jacket With a Hood
          </h2>

          <p className="text-xl font-bold mb-4">$249</p>

          <p className="text-gray-600 leading-relaxed mb-6">
            Phasellus sed volutpat orci. Fusce eget lorem mauris vehicula
            elementum gravida nec dui. Aenean aliquam varius ipsum...
          </p>

          {/* Sizes */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Sizes</h3>
            <div className="flex gap-2">
              {["XS", "S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Color</h3>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-black border"></span>
              <span className="w-6 h-6 rounded-full bg-white border"></span>
              <span className="w-6 h-6 rounded-full bg-red-600 border"></span>
              <span className="w-6 h-6 rounded-full bg-blue-700 border"></span>
            </div>
          </div>

          {/* Quantity + Add to Cart + Buy Now */}
          <div className="flex items-center gap-4 mb-6">
            {/* Quantity */}
            <div className="flex items-center border rounded">
              <button
                onClick={() => qty > 1 && setQty(qty - 1)}
                className="px-3 py-2"
              >
                <Minus size={16} />
              </button>
              <span className="px-4">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-2">
                <Plus size={16} />
              </button>
            </div>

            {/* Add to Cart */}
            <button className="px-8 py-3 bg-black text-white rounded hover:bg-gray-800">
              ADD TO CART
            </button>

            {/* BUY NOW */}
            <button className="px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
              BUY NOW
            </button>
          </div>

          {/* Wishlist + Share */}
          <div className="flex items-center gap-6 text-gray-600 mt-4">
            <button className="flex items-center gap-1 hover:text-black">
              <Heart size={16} /> Add to Wishlist
            </button>
            <button className="hover:text-black">Share</button>
          </div>

          {/* Meta */}
          <div className="mt-10 text-sm text-gray-600 space-y-1">
            <p>SKU: N/A</p>
            <p>Categories: Casual & Urban Wear, Jackets, Men</p>
            <p>Tags: black, bomber, leather</p>
          </div>
        </div>
      </div>

      {/* TABS SECTION — NEW PART ADDED */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-20">
        {/* Tabs */}
        <div className="flex gap-10 text-sm font-semibold border-b pb-3">
          <button
            className={`pb-2 ${
              activeTab === "description"
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => setActiveTab("description")}
          >
            DESCRIPTION
          </button>
          <button
            className={`pb-2 ${
              activeTab === "additional"
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => setActiveTab("additional")}
          >
            ADDITIONAL INFORMATION
          </button>
          <button
            className={`pb-2 ${
              activeTab === "reviews"
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            REVIEWS (3)
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "description" && (
          <div className="mt-8 text-gray-700 leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              sed volutpat orci. Fusce eget lorem mauris vehicula elementum
              gravida nec dui...
            </p>

            <h3 className="mt-10 font-semibold text-lg">Why choose product?</h3>
            <ul className="list-disc ml-6 mt-3 space-y-2 text-gray-700">
              <li>Cushy soft cotton fabric, very smooth</li>
              <li>Simple configurable design</li>
              <li>Digital downloadable items included</li>
            </ul>

            <h3 className="mt-10 font-semibold text-lg">Sample Number List</h3>
            <ol className="list-decimal ml-6 mt-3 space-y-2 text-gray-700">
              <li>Create store-specific attributes</li>
              <li>Simple or configurable bundles</li>
              <li>Digital/Virtual products included</li>
            </ol>

            <h3 className="mt-10 font-semibold text-lg">Lining</h3>
            <p className="text-gray-700 mt-2">
              100% Polyester, Main: 100% Polyester.
            </p>
          </div>
        )}

        {activeTab === "additional" && (
          <div className="mt-8 text-gray-700 leading-relaxed">
            <h3 className="font-semibold text-lg">Additional Information</h3>
            <ul className="list-disc ml-6 mt-3 space-y-2 text-gray-700">
              <li>Material: Premium Soft Cotton Blend</li>
              <li>Fit Type: Regular & Comfortable</li>
              <li>Care: Machine wash cold, gentle cycle</li>
              <li>Packaging: Eco-friendly recyclable material</li>
              <li>Manufactured in: Bangladesh</li>
            </ul>

            <h3 className="mt-10 font-semibold text-lg">Specifications</h3>
            <p className="mt-2">
              Crafted for everyday wear with durable stitching and breathable
              fabric that maintains comfort throughout the day.
            </p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="mt-8 text-gray-700 leading-relaxed">
            <h3 className="font-semibold text-lg">Customer Reviews</h3>

            <div className="mt-4 space-y-6">
              {/* Rating Summary */}
              <div>
                <p className="font-semibold">⭐ 4.8 / 5</p>
                <p className="text-gray-600 text-sm">
                  Based on 124 customer reviews
                </p>
              </div>

              {/* Review 1 */}
              <div className="border-b pb-4">
                <p className="font-semibold">Ayesha R.</p>
                <p className="text-sm text-gray-600 mt-1">
                  Excellent quality! The fabric feels soft and premium. Really
                  pleased with the purchase.
                </p>
              </div>

              {/* Review 2 */}
              <div className="border-b pb-4">
                <p className="font-semibold">Rahim U.</p>
                <p className="text-sm text-gray-600 mt-1">
                  Fits perfectly and looks stylish. Highly recommended for daily
                  wear.
                </p>
              </div>

              {/* Review 3 */}
              <div>
                <p className="font-semibold">Mitu S.</p>
                <p className="text-sm text-gray-600 mt-1">
                  Great material and fast delivery. Satisfied with the product.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <RelatedProducts/>
    </section>
  );
}
