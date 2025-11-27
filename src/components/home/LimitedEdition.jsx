"use client";
import Slider from "react-slick";
import Image from "next/image";
import { useRef } from "react";
import Container from "../common/Container";
import Product from "../common/Product";

const products = [
  { id: 1, title: "Cropped Faux Leather Jacket", price: "$29" },
  { id: 2, title: "Calvin Shorts", price: "$62" },
  { id: 3, title: "Kirby T-Shirt", price: "$17" },
  { id: 4, title: "Cableknit Shawl", price: "$129" },
  { id: 5, title: "Shirt In Botanical Cheetah", price: "$129" },
];

export default function LimitedEdition() {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="bg-gray-100 py-16 relative">
      <Container>
        <h2 className="text-center text-black text-3xl font-semibold tracking-wide mb-10">
          LIMITED EDITION
        </h2>

        {/* Arrow Left */}
        <button
          onClick={() => sliderRef.current.slickPrev()}
          className="absolute left-10 top-1/2 -translate-y-1/2 text-black text-3xl hidden md:block"
        >
          ❮
        </button>

        {/* Slider */}
        <div className="w-full   space-x-4">
          <Slider ref={sliderRef} {...settings}>
            {products.map((item) => (
              <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg flex flex-col justify-between transition-all w-full sm:w-[48%] md:w-[20%]">
                <a href="/product">
                  {/* Image */}
                  <div className="w-full bg-gray-50">
                    <img
                      src="/images/products/images.png"
                      alt="Classic White T-Shirt"
                      className="w-full object-cover object-top h-48 sm:h-56 md:h-60"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-3 flex-1 flex flex-col">
                    <div className="flex-1">
                      {/* Title */}
                      <h5 className="text-sm sm:text-base font-semibold text-slate-900 truncate">
                        Classic White T-Shirt
                      </h5>

                      {/* Subtitle */}
                      <p className="text-xs sm:text-sm mt-1 text-slate-600 truncate">
                        100% Cotton
                      </p>

                      {/* Price + Rating */}
                      <div className="flex flex-wrap justify-between gap-2 mt-3 items-center">
                        <div className="flex gap-2 items-center">
                          <h6 className="text-sm sm:text-base font-bold text-slate-900">
                            $29.99
                          </h6>
                          <h6 className="text-xs sm:text-sm text-slate-600">
                            <strike>$39.99</strike>
                          </h6>
                        </div>

                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-3 h-3 sm:w-[14px] sm:h-[14px] ${
                                i < 4 ? "fill-yellow-400" : "fill-[#CED5D8]"
                              }`}
                              viewBox="0 0 14 13"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Wishlist + Add to Cart */}
                    <div className="flex items-center gap-2 mt-4">
                      <button
                        className="bg-gray-200 w-12 h-9 flex items-center justify-center rounded-sm cursor-pointer"
                        title="Wishlist"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16px"
                          className="fill-dark inline-block"
                          viewBox="0 0 64 64"
                        >
                          <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
                        </svg>
                      </button>

                      <button className="text-xs sm:text-sm font-medium px-2 cursor-pointer min-h-[36px] w-full bg-black text-white tracking-wide ml-auto rounded-sm">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </Slider>
        </div>

        {/* Arrow Right */}
        <button
          onClick={() => sliderRef.current.slickNext()}
          className="absolute right-10 top-1/2 -translate-y-1/2 text-black text-3xl hidden md:block"
        >
          ❯
        </button>
      </Container>
    </div>
  );
}
