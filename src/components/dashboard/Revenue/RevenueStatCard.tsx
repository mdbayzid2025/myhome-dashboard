import React from "react";

const gradients: Record<string, string> = {
  green:  "linear-gradient(135deg,#2d6a3f,#3a8250)",
  blue:   "linear-gradient(135deg,#1e3a6e,#2851a3)",
  purple: "linear-gradient(135deg,#4a2d7a,#6b3fa8)",
};

const icons: Record<string, React.ReactNode> = {
  dollar: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  trend: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  card: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  ),
};

interface Props {
  label: string;
  value: string;
  badge: string;
  color: string;
  icon: string;
}

const RevenueStatCard: React.FC<Props> = ({ label, value, badge, color, icon }) => (
  <div
    className="relative rounded-xl p-5 min-h-[120px] flex flex-col"
    style={{ background: gradients[color] }}
  >
    <span className="absolute top-4 right-4 bg-white/20 text-green-300 text-xs font-medium px-2.5 py-1 rounded-full">
      ↑ {badge}
    </span>
    <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center mb-3">
      {icons[icon]}
    </div>
    <p className="text-sm text-white/75 mb-1">{label}</p>
    <p className="text-2xl font-medium text-white tracking-tight">{value}</p>
  </div>
);

export default RevenueStatCard;