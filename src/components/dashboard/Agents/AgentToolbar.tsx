import { FilterIcon } from "lucide-react";
import React from "react";
import { Button } from "../../ui/button";

interface Props {
  search: string;
  onSearch: (v: string) => void;
}

const AgentToolbar: React.FC<Props> = ({ search, onSearch }) => (
  <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center gap-3 mb-4">
    <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 h-9">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className="flex-shrink-0">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input
        value={search}
        onChange={e => onSearch(e.target.value)}
        placeholder="Search agents by name, email, or agency..."
        className="flex-1 text-sm outline-none bg-transparent text-gray-900 placeholder:text-gray-400"
      />
    </div>
    <Button size="icon" className="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center bg-white hover:bg-gray-50">
      <FilterIcon size={16} className="" />
    </Button>      
  </div>
);

export default AgentToolbar;