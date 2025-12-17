import Container from "@/components/common/Container";
import Product from "@/components/common/Product";
import Pagination from "@/components/shop/Pagination";
import ProductCard from "@/components/shop/ProductCard";
import ShopBanner from "@/components/shop/ShopBanner";
import Sidebar from "@/components/shop/Sidebar";

async function allProducts() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_API}/product/allproducts`);

  return await res.json();
}
export default async function ShopPage() {
  let { data } = await allProducts();
  
  return (
    <main>
      <Container>
        <ShopBanner />
        <div className="flex">
          {/* Sidebar */}
          <Sidebar />

          {/* Products Section */}
          <section className="flex-1 p-10">
            {/* Header */}
            <div className="flex justify-between text-sm text-gray-500 mb-10">
              <span>HOME / THE SHOP</span>
              <div className="flex gap-5">
                <span>DEFAULT SORTING ⌄</span>
              </div>
            </div>
            {/* Products Grid */}
            <div className="grid grid-cols-3 gap-8">
              {data.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination />
          </section>
        </div>
      </Container>
    </main>
  );
}
