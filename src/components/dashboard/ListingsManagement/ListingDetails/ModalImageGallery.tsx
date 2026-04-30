import React, { useState } from "react";

const THUMB_COLORS = [
  "from-indigo-100 to-blue-100",
  "from-green-100 to-emerald-200",
  "from-yellow-100 to-amber-200",
  "from-pink-100 to-rose-200",
  "from-violet-100 to-purple-200",
];

interface Props { count: number }

const ModalImageGallery: React.FC<Props> = ({ count = 5 }) => {
  const [active, setActive] = useState(0);
  const total = Math.min(count, THUMB_COLORS.length);
    const images = Array.from({ length: total }).map((_, i) => `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&${i}`);
  return (
    <div className="mb-4">
      <p className="flex items-center gap-1.5 text-xs font-medium text-gray-700 mb-2.5">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
        </svg>
        Property Images ({count} photos)
      </p>
      {/* Main image */}
      <div className={`relative w-full  rounded-xl  flex items-center justify-center mb-2`}>
        <img src={images[active]} alt="" className="w-full h-full object-cover aspect-16/6" />
        <span className="absolute bottom-2.5 right-2.5 bg-black/50 text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
          {active + 1} / {total}
        </span>
      </div>
      {/* Thumbnails */}
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-16 h-12 rounded-lg bg-gradient-to-br ${THUMB_COLORS[i]} flex items-center justify-center border-2 transition-all ${
              active === i ? "border-blue-600" : "border-transparent"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModalImageGallery;