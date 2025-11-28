"use client";

import Slider from "react-slick";
import Image from "next/image";
import { useState } from "react";

export default function CustomerReview() {
  const [active, setActive] = useState(0);

  const reviews = [
    {
      id: 1,
      img: "/images/review1.png",
      name: "Adam Johnson",
      role: "Customer",
      message: "Excellent service. Very fast delivery and great support!",
    },
    {
      id: 2,
      img: "/images/review2.png",
      name: "Sarah Parker",
      role: "Customer",
      message: "Product quality is amazing. Highly recommended!",
    },
    {
      id: 3,
      img: "/images/review3.png",
      name: "Daniel White",
      role: "Customer",
      message: "Loved the experience. Would definitely shop again!",
    },
    {
      id: 3,
      img: "/images/review3.png",
      name: "Daniel White",
      role: "Customer",
      message: "Loved the experience. Would definitely shop again!",
    },
    {
      id: 3,
      img: "/images/review3.png",
      name: "Daniel White",
      role: "Customer",
      message: "Loved the experience. Would definitely shop again!",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 700,
    focusOnSelect: true,
    beforeChange: (_, next) => setActive(next),

    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],

    appendDots: (dots) => (
      <div className="mt-6">
        <ul className="flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-gray-400 rounded-full hover:bg-black transition" />
    ),
  };

  return (
    <div className="py-16 bg-white">
      <h2 className="text-center text-3xl font-bold mb-10">
        What Our Customers Say
      </h2>

      <Slider {...settings}>
        {reviews.map((r, i) => (
          <div key={r.id} className="px-3">
            <div
              className={`
                bg-white border border-gray-200 rounded-2xl shadow-md p-8 text-center transition-all duration-500
                ${
                  active === i
                    ? "scale-105 opacity-100 shadow-xl"
                    : "scale-90 opacity-50"
                }
              `}
            >
              <div className="flex justify-center mb-4">
                <Image
                  src={r.img}
                  width={80}
                  height={80}
                  alt={r.name}
                  className="rounded-full"
                />
              </div>

              <h3 className="font-semibold text-lg">{r.name}</h3>
              <p className="text-sm text-gray-500">{r.role}</p>

              <p className="mt-4 text-gray-600">{r.message}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
