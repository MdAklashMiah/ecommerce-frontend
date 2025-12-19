"use client";

import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "../common/Container";
import Slider from "react-slick";
import axios from "axios";

const Banner = () => {
  const [banners, setBanners] = useState([])


  useEffect(() => {
      axios.get(`${process.env.NEXT_PUBLIC_API}/banner/allbanners`).then((res)=>{
        setBanners(res.data.data)
      }).catch((err)=>{
        console.log(err)
      })
  }, [])
  
  let settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 1000,
  };

  return (
    <section className="pb-16 pt-32">
      <Container>
        <Slider {...settings}>
          {banners.map((item)=>{
            return(
          <div>
            <img
              src={item.image}
              alt="bannerimage"
              className="w-full h-auto aspect-auto"
            />
          </div>

            )
          })}
        </Slider>
      </Container>
    </section>
  );
};

export default Banner;
