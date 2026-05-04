"use client";

import React from "react";

export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-[32px] overflow-hidden flex flex-col border border-gray-50 animate-pulse">
      <div className="relative w-full aspect-[3/4] bg-gray-50 flex items-center justify-center">
         <div className="w-1/2 h-1/2 bg-gray-100 rounded-3xl" />
      </div>

      <div className="p-8 space-y-4">
        <div className="h-4 bg-gray-100 rounded-full w-3/4" />
        <div className="flex gap-1.5">
           {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-100" />
           ))}
        </div>
        <div className="flex justify-between items-end pt-4">
           <div className="h-6 bg-gray-100 rounded-full w-24" />
           <div className="h-5 bg-gray-100 rounded-full w-5" />
        </div>
      </div>
    </div>
  );
}
