"use client";

import { useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Heart, Plus, Minus } from "lucide-react";
import RelatedProducts from "./RelatedProducts";

export default function ProductView({ product }) {
  if (!product || !product.images || product.images.length === 0) {
    return <p>Loading...</p>;
  }

  const [mainSlider, setMainSlider] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const mainSettings = {
    arrows: false,
    fade: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const thumbSettings = {
    slidesToShow: 4,
    swipeToSlide: true,
    arrows: false,
  };

  return (
    <section className="bg-white pb-16 pt-36">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14">
        {/* LEFT — PRODUCT IMAGES */}
        <div>
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            <Slider {...mainSettings} ref={setMainSlider}>
              {product.images.map((img, index) => (
                <div key={index} className="relative h-[450px] w-full">
                  <img
                    src={img}
                    alt={`Product Image ${index}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </Slider>

            {/* Arrow Buttons */}
            <button
              onClick={() => mainSlider?.slickPrev()}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => mainSlider?.slickNext()}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="mt-4">
            <Slider {...thumbSettings}>
              {product.images.map((img, index) => (
                <div key={index} className="p-1">
                  <img
                    src={img}
                    alt={`Thumbnail ${index}`}
                    width={100}
                    height={80}
                    className="object-cover border rounded cursor-pointer"
                    onClick={() => mainSlider?.slickGoTo(index)} // <-- click thumbnail
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* RIGHT — PRODUCT DETAILS */}
        <div>
          <h2 className="text-3xl font-semibold mb-2">{product.title}</h2>
          <div className="flex items-center gap-3 mb-4">
            <p className="text-lg text-gray-400 line-through">
              ৳ {product.price}
            </p>
            <p className="text-xl font-bold text-black">
              ৳ {product.discountprice}
            </p>
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>
          {/* SIZE OPTIONS */}
          <div className="mb-6">
            <p className="font-semibold mb-2">Sizes</p>
            <div className="flex gap-3">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className="border px-4 py-2 rounded hover:border-black"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* COLOR OPTIONS */}
          <div className="mb-6">
            <p className="font-semibold mb-2">Color</p>
            <div className="flex gap-4">
              <span className="w-6 h-6 rounded-full bg-black border cursor-pointer"></span>
              <span className="w-6 h-6 rounded-full bg-white border cursor-pointer"></span>
              <span className="w-6 h-6 rounded-full bg-red-600 border cursor-pointer"></span>
              <span className="w-6 h-6 rounded-full bg-blue-600 border cursor-pointer"></span>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
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

            <button className="px-6 py-3 bg-black text-white rounded">
              Add to Cart
            </button>
          </div>

          <button className="flex items-center gap-2 text-gray-600">
            <Heart size={16} /> Add to Wishlist
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="flex gap-10 border-b pb-3">
          {["description", "additional", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 font-semibold ${
                activeTab === tab ? "border-b-2 border-black" : "text-gray-500"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {activeTab === "description" && (
          <p className="mt-8 text-gray-700">{product.description}</p>
        )}
      </div>

      <RelatedProducts product ={product}/>
    </section>
  );
}
