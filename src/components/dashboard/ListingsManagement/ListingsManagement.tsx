import React, { useState, useMemo } from "react";
import { listingsData } from "../../../data/listingsData";
import ListingStatCards from "./ListingStatCards";
import ListingTabs from "./ListingTabs";
import ListingTable from "./ListingTable";

type Tab = "all" | "pending";

const ListingsManagement: React.FC = () => {
  const [tab, setTab]       = useState<Tab>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q    = search.toLowerCase();
    const base = tab === "pending"
      ? listingsData.filter(l => l.status === "pending")
      : listingsData;
    return !q ? base : base.filter(l =>
      l.title.toLowerCase().includes(q)   ||
      l.address.toLowerCase().includes(q) ||      
      l.agency.toLowerCase().includes(q)
    );
  }, [tab, search]);

  const pendingCount = listingsData.filter(l => l.status === "pending").length;

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-start mb-5 flex-wrap gap-3">
        <div>
          <h1 className="title">Listings Management</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage all property listings on the platform</p>
        </div>
        <div className="flex gap-2">
          {["Export","Import"].map(label => (
            <button key={label} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 hover:bg-gray-50">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {label === "Export"
                  ? <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>
                  : <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>}
              </svg>
              {label}
            </button>
          ))}
        </div>
      </div>

      <ListingStatCards listings={listingsData} />

      <ListingTabs
        active={tab}
        allCount={listingsData.length}
        pendingCount={pendingCount}
        onChange={(t) => { setTab(t); setSearch(""); }}
      />

      {/* Search */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 h-10 bg-white">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className="flex-shrink-0">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, address, city, agent..."
            className="flex-1 text-sm outline-none bg-transparent text-gray-900 placeholder:text-gray-400"
          />
        </div>
        <button className="flex items-center gap-2 px-4 h-10 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 hover:bg-gray-50">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
          Filters
        </button>
      </div>

      <ListingTable listings={filtered} />
    </div>
  );
};

export default ListingsManagement;