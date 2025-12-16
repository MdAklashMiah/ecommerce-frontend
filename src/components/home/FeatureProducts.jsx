import React from "react";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import Product from "../common/Product";

const FeatureProducts = () => {
  return (
    <section className="py-24 bg-secondery">
      <Container>
        <SectionTitle title={"Feature Products"} />
        <p className="text-center mt-3 text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
          Explore our newest arrivals and top trending products.{" "}
        </p>
        <div className="flex justify-between w-full mt-16 flex-wrap space-y-9">
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
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
