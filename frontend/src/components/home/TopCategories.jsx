"use client";

import React, { useEffect, useState } from "react";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import axios from "axios";

import Link from "next/link";

const TopCategories = () => {
  let [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/category/allcategory`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionTitle 
          title="Top Categories" 
          subtitle="Explore our curated collections by category for a personalized shopping experience."
        />

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 sm:gap-12">
          {loading ? (
             [1, 2, 3, 4, 5, 6, 7].map(i => (
                <div key={i} className="animate-pulse flex flex-col items-center">
                   <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-[120px] lg:h-[120px] bg-gray-100 rounded-full mb-4"></div>
                   <div className="h-3 bg-gray-100 rounded w-16"></div>
                </div>
             ))
          ) : categories.map((item) => {
            return (
              <Link 
                key={item._id} 
                href={`/shop?category=${item._id}`}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative bg-gray-50 w-24 h-24 sm:w-28 sm:h-28 lg:w-[120px] lg:h-[120px] mx-auto rounded-full overflow-hidden border border-gray-100 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-black/10 group-hover:border-black">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </div>

                <h4 className="text-xs sm:text-sm mt-4 font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-black transition-colors leading-tight">
                  {item.name}
                </h4>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default TopCategories;
