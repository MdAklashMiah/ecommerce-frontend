import React from "react";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

const TopCategories = () => {
  return (
    <section className="py-24 bg-secondery">
      <Container>
        <SectionTitle title={"Top Categories"} />
        <div className="mt-9 flex justify-between">
          <div className="text-center">
            <div className="bg-white p-9 rounded-full">
              <img src="/images/categories/hoodie.png" alt="category" />
            </div>
            <h4 className="text-base mt-4 font-medium text-dark">Handbags</h4>
          </div>
          <div className="text-center">
            <div className="bg-white p-9 rounded-full">
              <img src="/images/categories/hoodie.png" alt="category" />
            </div>
            <h4 className="text-base mt-4 font-medium text-dark">
              Shirt & T-Shirt
            </h4>
          </div>
          <div className="text-center">
            <div className="bg-white p-9 rounded-full">
              <img src="/images/categories/hoodie.png" alt="category" />
            </div>
            <h4 className="text-base mt-4 font-medium text-dark">
              Shirt & T-Shirt
            </h4>
          </div>
          <div className="text-center">
            <div className="bg-white p-9 rounded-full">
              <img src="/images/categories/hoodie.png" alt="category" />
            </div>
            <h4 className="text-base mt-4 font-medium text-dark">
              Shirt & T-Shirt
            </h4>
          </div>
          <div className="text-center">
            <div className="bg-white p-9 rounded-full">
              <img src="/images/categories/hoodie.png" alt="category" />
            </div>
            <h4 className="text-base mt-4 font-medium text-dark">
              Shirt & T-Shirt
            </h4>
          </div>
          <div className="text-center">
            <div className="bg-white p-9 rounded-full">
              <img src="/images/categories/hoodie.png" alt="category" />
            </div>
            <h4 className="text-base mt-4 font-medium text-dark">
              Shirt & T-Shirt
            </h4>
          </div>
          <div className="text-center">
            <div className="bg-white p-9 rounded-full">
              <img src="/images/categories/hoodie.png" alt="category" />
            </div>
            <h4 className="text-base mt-4 font-medium text-dark">
              Shirt & T-Shirt
            </h4>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TopCategories;
