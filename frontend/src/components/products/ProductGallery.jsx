"use client";

export default function ProductGallery() {
  return (
    <div className="space-y-4">
      <img
        src="/single-main.jpg"
        className="w-full rounded-lg shadow-sm"
      />

      <div className="grid grid-cols-4 gap-3">
        {Array(4).fill(0).map((_, i) => (
          <img
            key={i}
            src={`/thumb-${i + 1}.jpg`}
            className="rounded-md cursor-pointer hover:opacity-80"
          />
        ))}
      </div>
    </div>
  );
}
