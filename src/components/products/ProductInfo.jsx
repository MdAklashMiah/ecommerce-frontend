export default function ProductInfo() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Botanical Dress</h1>
      <p className="text-gray-500 mt-1">Women / Dresses</p>

      <div className="flex items-center gap-4 mt-4">
        <p className="text-3xl font-bold">$99</p>
        <p className="text-gray-400 line-through">$120</p>
        <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">-20%</span>
      </div>

      {/* Sizes */}
      <div className="mt-6">
        <p className="font-medium mb-2">Select Size</p>
        <div className="flex gap-2">
          {["XS","S","M","L","XL"].map(s => (
            <button
              key={s}
              className="border px-4 py-2 rounded hover:bg-black hover:text-white"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Add to cart */}
      <div className="mt-8 flex gap-4">
        <button className="bg-black text-white px-6 py-3 rounded-md w-full">
          Add to Cart
        </button>
        <button className="border px-6 py-3 rounded-md">♡</button>
      </div>

      <p className="mt-5 text-gray-600">
        Free shipping on orders over $150.  
        Delivery in 3–5 business days.
      </p>
    </div>
  );
}
