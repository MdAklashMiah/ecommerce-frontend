import React from "react";

const SectionTitle = ({ title, subtitle, align = "center" }) => {
  const isCenter = align === "center";

  return (
    <div className={`mb-12 ${isCenter ? "text-center" : "text-left"}`}>
      <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900 mb-4 italic uppercase">
        {title.split(' ').map((word, i) => (
          <span key={i} className={i % 2 !== 0 ? "text-gray-400" : ""}>
            {word}{' '}
          </span>
        ))}
      </h2>
      {subtitle && (
        <p className={`text-gray-500 text-xs md:text-sm font-medium uppercase tracking-[0.2em] leading-relaxed max-w-2xl ${isCenter ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-6 h-px w-20 bg-black/10 ${isCenter ? "mx-auto" : ""}`} />
    </div>
  );
};

export default SectionTitle;
