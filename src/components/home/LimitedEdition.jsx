"use client";

import Image from "next/image";
import { useRef } from "react";
import Container from "../common/Container";
import Slider from "react-slick";

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
    arrows: false, // We use custom arrows
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
        <div className="relative">

        {/* LEFT ARROW */}
        <button
          onClick={() => sliderRef.current.slickPrev()}
          className="absolute -left-10 top-1/2 -translate-y-1/2 z-30 bg-white shadow p-3 rounded-full hover:bg-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={() => sliderRef.current.slickNext()}
          className="absolute -right-10 top-1/2 -translate-y-1/2 z-30 bg-white shadow p-3 rounded-full hover:bg-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* SLIDER */}
        <Slider ref={sliderRef} {...settings}>
          {products.map(() => {
            return (
                <div className="px-4">

              <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg flex flex-col transition-all">
                <a href="/product">
                  <div className="w-full bg-gray-50">
                    <img
                      src="/images/products/images.png"
                      alt="Classic White T-Shirt"
                      className="w-full object-cover object-top h-48 sm:h-56 md:h-60"
                    />
                  </div>

                  <div className="p-3 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h5 className="text-sm sm:text-base font-semibold text-slate-900 truncate">
                        Classic White T-Shirt
                      </h5>

                      <p className="text-xs sm:text-sm mt-1 text-slate-600 truncate">
                        100% Cotton
                      </p>

                      <div className="flex justify-between items-center mt-3">
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
                              className={`w-3 sm:w-[14px] ${
                                i < 4 ? "fill-yellow-400" : "fill-gray-300"
                              }`}
                              viewBox="0 0 14 13"
                            >
                              <path d="M7 0L9.4 3.6 13.6 4.8 11 8.3l.1 4.4L7 11.2 2.9 12.7 3 8.3.3 4.8l4.2-1.2L7 0z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <button className="bg-gray-200 w-12 h-9 flex items-center justify-center rounded-sm">
                        ❤️
                      </button>

                      <button className="text-xs sm:text-sm font-medium px-2 min-h-[36px] w-full bg-black text-white rounded-sm">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </a>
              </div>
                </div>
            );
          })}
        </Slider>
        </div>
      </Container>
    </div>
  );
}
