"use client";

import React, { useEffect, useState } from "react";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import axios from "axios";

const TopCategories = () => {
  let [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/category/allcategory`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="py-24 bg-secondery">
      <Container>
        <SectionTitle title={"Top Categories"} />

        <div className="mt-9 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {categories.map((item) => {
            return (
              <div className="text-center">
                <div className="bg-white w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-[150px] lg:h-[150px] mx-auto rounded-full overflow-hidden">
                  <img
                    src={item.image}
                    alt="category"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h4 className="text-sm sm:text-base mt-3 sm:mt-4 font-medium text-dark">
                  {item.name}
                </h4>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default TopCategories;
