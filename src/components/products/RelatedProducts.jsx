import Link from "next/link";

export default function RelatedProducts() {
  const products = [
    { title: "Cotton Jersey T-Shirt", price: 17, img: "/p1.jpg" },
    { title: "Cabelknit Shawl", price: 99, old: 120, img: "/p2.jpg" },
    { title: "Zessi Dress", price: 99, old: 130, img: "/p3.jpg" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-semibold mb-8">Related Products</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((p, i) => (
          <Link key={i} href="#">
            <div>
              <img
                src={p.img}
                className="w-full rounded-lg shadow-sm mb-3"
              />
              <p className="text-gray-500">Dresses</p>
              <p className="font-medium">{p.title}</p>

              <div className="flex items-center gap-2">
                <p className="font-semibold">${p.price}</p>
                {p.old && (
                  <p className="text-gray-400 line-through">${p.old}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
