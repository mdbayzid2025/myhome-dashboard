import React from "react";
import type { ListingDetail } from "../../../../types/listing.types";


interface Props { stats: ListingDetail["stats"] }

const ModalPerformance: React.FC<Props> = ({ stats }) => (
  <div className="mb-4">
    <h3 className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-900 mb-3">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
      Listing Performance
    </h3>
    <div className="grid grid-cols-3 gap-2">
      {[
        { label:"Views",     val:stats?.views ?? 10,     color:"blue",   bg:"bg-blue-50",   text:"text-blue-700",   icon:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> },
        { label:"Enquiries", val:stats?.enquiries ?? 10, color:"green",  bg:"bg-green-50",  text:"text-green-700",  icon:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
        { label:"Saves",     val:stats?.saves ?? 10,     color:"purple", bg:"bg-violet-50", text:"text-violet-700", icon:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
      ].map(p => (
        <div key={p.label} className={`${p.bg} rounded-xl p-5`}>
          <p className={`flex items-center gap-1.5 text-lg font-medium ${p.text} mb-1.5`}>{p.icon}{p.label}</p>
          <p className={`text-2xl font-bold ${p.text}`}>{p.val}</p>
        </div>
      ))}
    </div>
  </div>
);

export default ModalPerformance;