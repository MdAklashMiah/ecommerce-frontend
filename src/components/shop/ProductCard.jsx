export default function ProductCard({
  title,
  subtitle,
  price,
  oldPrice,
  image,
  rating = 3,
}) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg md:min-w-xs flex flex-col transition-all">
      <a href="/product">
      {/* Image */}
      <div className="w-full bg-gray-50">
        <a href="/product" className="block">
          <img
            src={"/images/products/images.png"}
            alt={title}
            className="w-full object-cover object-top h-60"
          />
        </a>
      </div>

      {/* Content */}
      <div className="p-3 flex-1 flex flex-col">
        <div className="flex-1">
          {/* Title */}
          <a href="#" className="block border-0 outline-0">
            <h5 className="text-sm sm:text-base font-semibold text-slate-900 truncate">
              {title}
            </h5>
          </a>

          {/* Subtitle */}
          <p className="text-sm mt-1 text-slate-600 truncate">{subtitle}</p>

          {/* Price */}
          <div className="flex flex-wrap justify-between gap-2 mt-3">
            <div className="flex gap-2 items-center">
              <h6 className="text-sm sm:text-base font-bold text-slate-900">
                ${price}
              </h6>

              {oldPrice && (
                <h6 className="text-sm sm:text-base text-slate-600">
                  <strike>${oldPrice}</strike>
                </h6>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-[14px] h-[14px] ${
                    i < rating ? "fill-yellow-400" : "fill-[#CED5D8]"
                  }`}
                  viewBox="0 0 14 13"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              ))}
            </div>
          </div>
        </div>

        {/* Wishlist + Add to Cart */}
        <div className="flex items-center gap-2 mt-4">
          {/* Wishlist Button */}
          <button
            className="bg-gray-200 w-12 h-9 flex items-center justify-center rounded-sm cursor-pointer"
            title="Wishlist"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              className="fill-dark inline-block"
              viewBox="0 0 64 64"
            >
              <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
            </svg>
          </button>

          {/* Add to Cart Button */}
          <button
            type="button"
            
            className="text-sm font-medium px-2 cursor-pointer min-h-[36px] w-full bg-secondary text-white tracking-wide ml-auto outline-0 border-0 rounded-sm"
          >
            Add to cart
          </button>
        </div>
      </div>
      </a>
    </div>
  );
}
