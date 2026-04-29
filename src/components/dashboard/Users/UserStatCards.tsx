import React from "react";
import { statCards } from "../../../data/usersData";

const gradients: Record<string, string> = {
  blue:   "linear-gradient(135deg,#1e3a6e,#2851a3)",
  green:  "linear-gradient(135deg,#1f5c35,#2d7a49)",
  purple: "linear-gradient(135deg,#3d2672,#5a38a8)",
  orange: "linear-gradient(135deg,#7a3a10,#a0531a)",
};

const icons: Record<string, React.ReactNode> = {
  users: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  check: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  mail:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  eye:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
};

const UserStatCards: React.FC = () => (
  <div className="grid grid-cols-4 gap-4 mb-6">
    {statCards.map((s) => (
      <div key={s.label} className="rounded-xl p-5" style={{ background: gradients[s.color] }}>
        <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center mb-3">
          {icons[s.icon]}
        </div>
        <p className="text-xs text-white/70 mb-1">{s.label}</p>
        <p className="text-3xl font-medium text-white">{s.value}</p>
        <p className="text-[11px] text-white/50 mt-1">{s.sub}</p>
      </div>
    ))}
  </div>
);

export default UserStatCards;