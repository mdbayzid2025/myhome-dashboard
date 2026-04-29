import React, { useState, useMemo } from "react";
import { usersData } from "../../../data/usersData";
import UserStatCards from "./UserStatCards";
import UserToolbar from "./UserToolbar";
import UserTable from "./UserTable";

const UserManagement: React.FC = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() =>
    usersData.filter((u) => {
      const q = search.toLowerCase();
      const matchQ = !q || u.name.toLowerCase().includes(q)
        || u.email.toLowerCase().includes(q)
        || u.location.toLowerCase().includes(q);
      const matchS = !statusFilter || u.status === statusFilter;
      return matchQ && matchS;
    }), [search, statusFilter]);

  return (
    <div className="">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Users</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage all registered users on the platform</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 hover:bg-gray-50">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export
        </button>
      </div>

      <UserStatCards />
      <UserToolbar
        search={search}
        status={statusFilter}
        onSearch={setSearch}
        onStatus={setStatusFilter}
      />
      <UserTable users={filtered} total={usersData.length} />
    </div>
  );
};

export default UserManagement;