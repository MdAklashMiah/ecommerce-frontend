import Header from "@/components/common/Header";
import Banner from "@/components/home/Banner";
import FeatureProducts from "@/components/home/FeatureProducts";
import LatestProducts from "@/components/home/LatestProduct";
import LimitedEdition from "@/components/home/LimitedEdition";
import TopCategories from "@/components/home/TopCategories";
import React from "react";

const page = () => {
  return (
    <main>
      <Banner />
      <TopCategories />
      <LatestProducts />
      <FeatureProducts/>
      <LimitedEdition/>
    </main>
  );
};

export default page;
