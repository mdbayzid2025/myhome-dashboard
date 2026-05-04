import React, { useState, useMemo } from "react";
import { agentsData } from "../../../data/agentsData";
import AgentStatCards from "./AgentStatCards";
import AgentToolbar from "./AgentToolbar";
import AgentTable from "./AgentTable";
import { Button } from "../../ui/button";
import { Download, Plus } from "lucide-react";

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
          <h1 className="title">Agents</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage real estate agents and their accounts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" className="flex items-center gap-2  rounded-lg text-sm bg-white text-gray-700 hover:bg-gray-50">
            <Download />
            Export
          </Button>
          <Button className="flex items-center gap-2  bg-blue-600 rounded-lg text-sm text-white hover:bg-blue-700">           
            <Plus /> Add Agent
          </Button>
        </div>
      </div>

      <AgentStatCards agents={agentsData} />
      <AgentToolbar search={search} onSearch={setSearch} />
      <AgentTable agents={filtered} total={agentsData.length} />
    </div>
  );
};

export default Agents;