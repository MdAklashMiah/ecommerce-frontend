"use client";

import { useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Heart, Plus, Minus } from "lucide-react";
import { useSelector } from "react-redux";
import RelatedProducts from "./RelatedProducts";
import { useRouter } from "next/navigation";

export default function ProductView({ product }) {
  if (!product || !product.images?.length) {
    return <p>Loading...</p>;
  }

  const router = useRouter();

  /* ---------------- STATE ---------------- */
  const [mainSlider, setMainSlider] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

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
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const thumbSettings = {
    slidesToShow: 4,
    arrows: false,
    swipeToSlide: true,
  };

  /* ---------------- ADD TO CART ---------------- */
  const handleAddToCart = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    // Multi Variant: require selected variant
    if (product.variantType === "multiVariant" && !selectedVariant) {
      alert("Please select size and color");
      return;
    }

    // Single Variant: require at least one variant
    if (product.variantType === "singleVariant" && variants.length === 0) {
      alert("This product is not available right now");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        user,
        product: product._id,
        quantity: qty,
        variants:
          product.variantType === "singleVariant"
            ? variants[0]._id
            : selectedVariant._id,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/cart/addtocart`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add to cart");
      }

      alert("Product added to cart 🛒");
      console.log(selectedVariant)
      router.push("/cart");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white pb-16 pt-36">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14">
        {/* ---------------- LEFT IMAGES ---------------- */}
        <div>
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            <Slider {...mainSettings} ref={setMainSlider}>
              {product.images.map((img, i) => (
                <div key={i} className="h-[450px]">
                  <img
                    src={img}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </Slider>

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

          <Slider {...thumbSettings} className="mt-4">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={product.title}
                className="h-20 w-full object-cover border rounded cursor-pointer"
                onClick={() => mainSlider?.slickGoTo(i)}
              />
            ))}
          </Slider>
        </div>

        {/* ---------------- RIGHT DETAILS ---------------- */}
        <div>
          <h2 className="text-3xl font-semibold">{product.title}</h2>

          <div className="flex gap-3 my-3">
            <p className="text-gray-400 line-through">৳ {product.price}</p>
            <p className="text-xl font-bold">৳ {product.discountprice}</p>
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* ---------------- MULTI VARIANT SELECTORS ---------------- */}
          {product.variantType === "multiVariant" && variants.length > 0 && (
            <>
              {/* SIZE */}
              <div className="mb-4">
                <p className="font-semibold mb-2">Size</p>
                <div className="flex gap-3">
                  {sizes.map((size) => {
                    const disabled =
                      selectedColor && !availableSizesByColor.includes(size);

                    return (
                      <button
                        key={size}
                        disabled={disabled}
                        title={
                          disabled
                            ? "This size is not available for selected color"
                            : ""
                        }
                        onClick={() => {
                          if (disabled) return;
                          setSelectedSize(size);
                          setSelectedVariant(null);
                          if (selectedColor) resolveVariant(size, selectedColor);
                        }}
                        className={`border px-4 py-2 rounded transition
                          ${
                            selectedSize === size
                              ? "bg-black text-white"
                              : "hover:border-black"
                          }
                          ${disabled ? "opacity-40 cursor-not-allowed" : ""}
                        `}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* COLOR */}
              <div className="mb-6">
                <p className="font-semibold mb-2">Color</p>
                <div className="flex gap-3">
                  {colors.map((color) => {
                    const disabled =
                      selectedSize && !availableColorsBySize.includes(color);

                    return (
                      <span
                        key={color}
                        title={
                          disabled
                            ? "This color is not available for selected size"
                            : ""
                        }
                        onClick={() => {
                          if (disabled) return;
                          setSelectedColor(color);
                          setSelectedVariant(null);
                          if (selectedSize) resolveVariant(selectedSize, color);
                        }}
                        className={`w-7 h-7 rounded-full border transition
                          ${selectedColor === color ? "ring-2 ring-black" : ""}
                          ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
                        `}
                        style={{ backgroundColor: color }}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* ---------------- SINGLE VARIANT INFO ---------------- */}
          {product.variantType === "singleVariant" &&
            variants.length > 0 && (
              <p className="text-sm mb-4 text-gray-700">
                Size: <span className="font-semibold">{variants[0].size || "N/A"}</span>
                {variants[0].color && (
                  <>
                    {" "} / Color: <span className="font-semibold">{variants[0].color}</span>
                  </>
                )}
              </p>
            )}

          {/* ---------------- SELECTED VARIANT ---------------- */}
          {selectedVariant && (
            <p className="text-sm mb-4 text-gray-700">
              Selected Variant:
              <span className="font-semibold">
                {" "}
                {selectedVariant.size} / {selectedVariant.color}
              </span>
            </p>
          )}

          {/* ---------------- QTY & CART ---------------- */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded">
              <button
                onClick={() => qty > 1 && setQty(qty - 1)}
                className="px-3 py-2"
              >
                <Minus size={16} />
              </button>
              <span className="px-4">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-2"
              >
                <Plus size={16} />
              </button>
            </div>

            <button 
              onClick={handleAddToCart}
              disabled={
                loading ||
                (product.variantType === "singleVariant" && variants.length === 0)
              }
              className="px-6 py-3 bg-black text-white rounded disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add to Cart"}
            </button>
          </div>

          <button className="flex items-center gap-2 text-gray-600">
            <Heart size={16} /> Add to Wishlist
          </button>
        </div>
      </div>

      <RelatedProducts product={product} />
    </section>
  );
}
