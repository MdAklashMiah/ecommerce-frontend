import Container from "@/components/common/Container";
import Pagination from "@/components/shop/Pagination";
import ProductCard from "@/components/shop/ProductCard";
import ShopBanner from "@/components/shop/ShopBanner";
import Sidebar from "@/components/shop/Sidebar";

export default function ShopPage() {
  return (
    <section className="pt-32">
      <Container>
        <div className="flex">
          {/* Sidebar */}
          <Sidebar />

          {/* Products Section */}
          <section className="flex-1 p-10">
            {/* Header */}
            
            {/* Products Grid */}
            <div className="grid grid-cols-3 gap-8">
              <ProductCard label="-67%" title="Calvin Shorts" price={62} />
              <ProductCard title="Kirby T-Shirt" price={17} />
              <ProductCard
                label="NEW"
                title="Cableknit Shawl"
                price={99}
                oldPrice={120}
              />
              <ProductCard
                title="Shirt in Botanical Cheetah Print"
                price={62}
              />
              <ProductCard title="Cotton Jersey T-Shirt" price={17} />
              <ProductCard
                label="SALE"
                title="Zessi Dresses"
                price={99}
                oldPrice={120}
              />
              <ProductCard
                title="Shirt in Botanical Cheetah Print"
                price={62}
              />
              <ProductCard title="Cotton Jersey T-Shirt" price={17} />
              <ProductCard title="Zessi Dresses" price={99} oldPrice={120} />
            </div>

            {/* Pagination */}
            <Pagination />
          </section>
        </div>
      </Container>
    </section>
  );
}
