import React from "react";
import type { Listing } from "../../../data/listingsData";


interface Props { listings: Listing[] }

const ListingStatCards: React.FC<Props> = ({ listings }) => {
  const active   = listings.filter(l => l.status === "active").length;
  const pending  = listings.filter(l => l.status === "pending").length;
  const featured = listings.filter(l => l.featured).length;
  const rejected = listings.filter(l => l.status === "rejected").length;

  const cards = [
    { label:"Total Listings", value:listings.length, bg:"bg-blue-50",   text:"text-blue-700"   },
    { label:"Active",          value:active,           bg:"bg-green-50",  text:"text-green-700"  },
    { label:"Pending",         value:pending,          bg:"bg-yellow-50", text:"text-yellow-700" },
    { label:"Featured",        value:featured,         bg:"bg-purple-50", text:"text-purple-700" },
    { label:"Rejected",        value:rejected,         bg:"bg-red-50",    text:"text-rose-700"   },
  ];

  return (
    <div className="grid grid-cols-5 gap-3 mb-5">
      {cards.map(c => (
        <div key={c.label} className={`${c.bg} rounded-xl px-5 py-4`}>
          <p className={`text-3xl font-bold ${c.text} mb-1`}>{c.value}</p>
          <p className={`text-xs font-medium ${c.text}`}>{c.label}</p>
        </div>
      ))}
    </div>
  );
};

export default ListingStatCards;