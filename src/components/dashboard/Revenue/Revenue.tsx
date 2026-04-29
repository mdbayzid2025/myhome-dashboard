import React from "react";
import { statsData } from "../../../data/revenueData";
import RevenueStatCard from "./RevenueStatCard";
import RevenueTrendChart from "./RevenueTrendChart";
import RevenueSources from "./RevenueSources";
import RecentTransactions from "./RecentTransactions";

const RevenueAnalytics: React.FC = () => (
  <div className="p-6 bg-gray-50 min-h-screen">
    {/* Header */}
    <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
      <div>
        <h1 className="text-2xl font-medium text-gray-900">Revenue Analytics</h1>
        <p className="text-sm text-gray-400 mt-0.5">Track and analyze platform revenue performance</p>
      </div>
      <div className="flex gap-2">
        <button className="flex items-center gap-1.5 px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg text-gray-700">
          📅 Last 12 months
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 text-sm bg-primary! rounded-lg text-white">
          ⬇ Export Report
        </button>
      </div>
    </div>

    {/* Stat Cards */}
    <div className="grid grid-cols-3 gap-4 mb-4">
      {statsData.map((s) => <RevenueStatCard key={s.id} {...s} />)}
    </div>

    {/* Trend + Sources */}
    <div className="grid grid-cols-[1.6fr_1fr] gap-4 mb-4">
      <RevenueTrendChart />
      <RevenueSources />
    </div>

    {/* Transactions */}
    <RecentTransactions />
  </div>
);

export default RevenueAnalytics;