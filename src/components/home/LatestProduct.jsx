import React from "react";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import Product from "../common/Product";

const LatestProducts = () => {
  return (
    <section className="py-24 bg-">
      <Container>
        <SectionTitle title={"Latest Products"} />
        <p className="text-center mt-3 text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
          Our top picks of the season, just for you.{" "}
        </p>
        <div className="flex justify-between w-full mt-16">
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

export default LatestProducts;
