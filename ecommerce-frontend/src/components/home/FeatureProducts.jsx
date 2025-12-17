"use client"

import React, { useEffect, useState } from "react";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import Product from "../common/Product";
import axios from "axios";

const FeatureProducts = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}/product/allproducts`)
      .then((res) => {
        setProducts(res.data.data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <section className="py-24 bg-secondery">
      <Container>
        <SectionTitle title={"Feature Products"} />
        <p className="text-center mt-3 text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
          Explore our newest arrivals and top trending products.
        </p>
        <div className="flex justify-between w-full mt-16 flex-wrap space-y-9">
          {products.map((item) => (
            <Product key={item._id} product={item} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button className="px-6 py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition">
            Load More
          </button>
        </div>
      </Container>
    </section>
  );
};

export default FeatureProducts;
