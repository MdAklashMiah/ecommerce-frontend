"use client";

import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { ChevronRight, ChevronLeft } from "lucide-react";

const NextArrow = ({ onClick }) => (
  <button onClick={onClick} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full text-black hover:bg-white transition opacity-0 group-hover:opacity-100 shadow-md">
    <ChevronRight className="w-5 h-5" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button onClick={onClick} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full text-black hover:bg-white transition opacity-0 group-hover:opacity-100 shadow-md">
    <ChevronLeft className="w-5 h-5" />
  </button>
);

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}/banner/allbanners`)
      .then((res) => {
        setBanners(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: i => (
      <div className="w-2.5 h-2.5 mx-1 rounded-full bg-white/50 hover:bg-white transition mt-4"></div>
    )
  };

  if (loading) {
    return (
      <section className="pt-[72px] bg-gray-50 animate-pulse">
        <div className="w-full h-[60vh] md:h-[80vh] bg-gray-200"></div>
      </section>
    );
  }

  if (banners.length === 0) return null;

  return (
    <section className="bg-gray-50">
      <div className="w-full relative group">
        <Slider {...settings}>
          {banners.map((item, index) => (
            <div key={index} className="relative outline-none">
              <div className="w-full h-[60vh] md:h-[85vh] relative overflow-hidden">
                <img
                  src={item.image}
                  alt="banner"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                {/* Optional dark gradient overlay for text readability if you add text later */}
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Banner;
