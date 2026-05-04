"use client";
import { useState } from "react";

export default function ProductTabs() {
  const [tab, setTab] = useState("description");

  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      {/* Tabs */}
      <div className="flex gap-10 border-b pb-3">
        {["description", "additional", "reviews"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 capitalize ${
              tab === t ? "border-b-2 border-black" : "text-gray-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-8 text-gray-700 leading-7">
        {tab === "description" && (
          <p>
            This botanical print dress features lightweight fabric...
          </p>
        )}

        {tab === "additional" && (
          <ul className="list-disc ml-6">
            <li>100% Cotton</li>
            <li>Machine washable</li>
            <li>Made in Italy</li>
          </ul>
        )}

        {tab === "reviews" && (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
