"use client";

import { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { Heart, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import SectionTitle from "../common/SectionTitle";
import Container from "../common/Container";

// Slider Arrows
const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-[-20px] top-1/2 z-20 -translate-y-1/2 w-10 h-10 bg-white shadow rounded-full flex items-center justify-center hover:bg-gray-100"
    onClick={onClick}
  >
    <ChevronRight size={20} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-[-20px] top-1/2 z-20 -translate-y-1/2 w-10 h-10 bg-white shadow rounded-full flex items-center justify-center hover:bg-gray-100"
    onClick={onClick}
  >
    <ChevronLeft size={20} />
  </button>
);

const TopCollection = () => {
  const [active, setActive] = useState("Featured");

  const categories = ["All", "Featured", "Popular", "Sale", "Best Rated"];

  const products = [
    {
      id: 1,
      title: "Cropped Faux Leather Jacket",
      price: 29,
      category: "Dresses",
      img: "/images/products/images.png",
    },
    {
      id: 2,
      title: "Calvin Shorts",
      price: 62,
      category: "Dresses",
      img: "/images/products/images.png",
    },
    {
      id: 3,
      title: "Kirby T-Shirt",
      price: 17,
      category: "Dresses",
      img: "/images/products/images.png",
    },
    {
      id: 4,
      title: "Cableknit Shawl",
      price: 129,
      salePrice: 99,
      category: "Dresses",
      img: "/images/products/images.png",
    },
    {
      id: 5,
      title: "Botanical Cheetah Print Shirt",
      price: 149,
      salePrice: 99,
      category: "Dresses",
      img: "/images/products/images.png",
    },
  ];

  // Slider Settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 900,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="py-24 bg-white">
      <Container>
        {/* Section Title */}
        <SectionTitle title={"Our Top Collection"} />

        {/* Category Tabs */}
        <div className="flex justify-center space-x-10 mt-8 text-gray-600 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`relative pb-1 text-sm tracking-wide transition ${
                active === cat
                  ? "text-black font-semibold"
                  : "hover:text-black"
              }`}
              onClick={() => setActive(cat)}
            >
              {cat}
              {active === cat && (
                <span className="absolute left-0 -bottom-1 w-full h-[1.5px] bg-black rounded-full"></span>
              )}
            </button>
          ))}
        </div>

        {/* Product Slider */}
        <div className="relative px-10">
          <Slider {...settings}>
            {products.map((p) => (
              <a href="/product">
              <div key={p.id} className="pr-4">
                <div className="group relative bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">

                  {/* Product Image */}
                  <div className="relative w-full h-60 bg-gray-100">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      className="object-cover"
                    />

                    {/* Hover Icons */}
                    <div className="absolute top-3 right-3 flex flex-col opacity-0 group-hover:opacity-100 transition space-y-2">
                      <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-200">
                        <Eye size={16} />
                      </button>
                      <button className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow hover:bg-red-600">
                        <Heart size={16} />
                      </button>
                    </div>

                    {/* Add To Cart Button */}
                    <div className="absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 transition">
                      <button className="w-full bg-white py-2 text-sm font-semibold tracking-wide shadow hover:bg-gray-100">
                        ADD TO CART
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="px-3 py-4">
                    <p className="text-xs text-gray-500">{p.category}</p>
                    <h3 className="text-sm mt-1 font-medium text-gray-800">
                      {p.title}
                    </h3>

                    {/* Price */}
                    <div className="mt-2 flex space-x-2">
                      {p.salePrice ? (
                        <>
                          <span className="text-gray-400 line-through text-sm">
                            ${p.price}
                          </span>
                          <span className="text-red-500 font-semibold">
                            ${p.salePrice}
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-900 font-semibold">
                          ${p.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              </a>
            ))}
          </Slider>
        </div>
      </Container>
    </section>
  );
};

export default TopCollection;
