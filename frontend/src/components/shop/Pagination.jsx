export default function Pagination() {
  return (
    <div className="flex justify-center md:justify-between items-center py-10 text-gray-600 text-sm">
      
      <button className="hidden md:block">&lt; PREV</button>

      <div className="flex gap-3">
        {[1, 2, 3, 4].map((n) => (
          <button key={n} className="hover:text-black">
            {n}
          </button>
        ))}
      </div>

      <button className="hidden md:block">NEXT &gt;</button>
    </div>
  );
}
