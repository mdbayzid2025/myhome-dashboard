export const statsData = [
  {
    id: "total",
    label: "Total Revenue",
    value: "£412,450",
    badge: "+22.5%",
    color: "green",
    icon: "dollar",
  },
  {
    id: "month",
    label: "Revenue This Month",
    value: "£51,200",
    badge: "+15.3%",
    color: "blue",
    icon: "trend",
  },
  {
    id: "txn",
    label: "Total Transactions",
    value: "1,248",
    badge: "+18.2%",
    color: "purple",
    icon: "card",
  },
];

export const trendData = {
  labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  values: [12000,14500,17000,20000,23000,27000,30000,35000,38000,43000,47000,51200],
  thisMonth: "£51,200",
  target: "£45,000",
  achievement: "113.8%",
};

export const sourcesData = [
  { name: "Agent Subscriptions", pct: 59.5, amount: "£245,600", color: "#1a4fd6" },
  { name: "Featured Listings",   pct: 30.2, amount: "£124,380", color: "#0ea5a0" },
  { name: "Banner Ads",          pct: 10.3, amount: "£42,470",  color: "#0ea5a0" },
];

export const transactions = [
  { id: "TXN-2024-1247", agent: "Premium Estates Ltd", type: "Monthly Subscription", amount: "£299", date: "2 hours ago",  status: "Completed" },
  { id: "TXN-2024-1246", agent: "Johnson Properties",  type: "Featured Listing",     amount: "£49",  date: "5 hours ago",  status: "Completed" },
  { id: "TXN-2024-1245", agent: "Heritage Homes",      type: "Monthly Subscription", amount: "£299", date: "8 hours ago",  status: "Completed" },
  { id: "TXN-2024-1244", agent: "Mortgage Masters",    type: "Banner Ad Campaign",   amount: "£499", date: "1 day ago",    status: "Completed" },
  { id: "TXN-2024-1243", agent: "City Living Realty",  type: "Featured Listing",     amount: "£49",  date: "1 day ago",    status: "Pending"   },
];