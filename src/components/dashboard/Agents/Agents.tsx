import React, { useState, useMemo } from "react";
import { agentsData } from "../../../data/agentsData";
import AgentStatCards from "./AgentStatCards";
import AgentToolbar from "./AgentToolbar";
import AgentTable from "./AgentTable";

const Agents: React.FC = () => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return !q
      ? agentsData
      : agentsData.filter(a =>
          a.name.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          a.agency.toLowerCase().includes(q)
        );
  }, [search]);

  return (
    <div className="">
      <div className="flex justify-between items-start mb-6 flex-wrap gap-3">
       <div>
          <h1 className="text-3xl! font-semibold text-gray-900">Agents</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage real estate agents and their accounts</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 hover:bg-gray-50">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export
          </button>
          <button className="flex ite`ms-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm text-white hover:bg-blue-700">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
            </svg>
            Add Agent
          </button>
        </div>
      </div>

      <AgentStatCards agents={agentsData} />
      <AgentToolbar search={search} onSearch={setSearch} />
      <AgentTable agents={filtered} total={agentsData.length} />
    </div>
  );
};

export default Agents;