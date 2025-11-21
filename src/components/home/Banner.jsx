"use client";

import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "../common/Container";
import Slider from "react-slick";

const Banner = () => {
  let settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
  };

  return (
    <section className="pb-16 pt-32">
      <Container>
        <Slider {...settings}>
          <div>
            <img
              src="/images/banner/banner1.jpg"
              alt="bannerimage"
              className="w-full h-auto"
            />
          </div>
          <div>
            <img
              src="/images/banner/banner2.jpg"
              alt="bannerimage"
              className="w-full h-auto"
            />
          </div>
          <div>
            <img
              src="/images/banner/banner3.jpg"
              alt="bannerimage"
              className="w-full h-auto"
            />
          </div>
        </Slider>
      </Container>
    </section>
  );
};

export default Banner;
