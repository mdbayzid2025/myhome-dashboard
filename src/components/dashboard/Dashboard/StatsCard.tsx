// components/dashboard/StatsCards/StatsCard.tsx
import { cn } from "../../../lib/utils";
import { TrendingUp } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor: string;
  cardBgColor: string;
  growth: string;
}

const StatsCard = ({
  title,
  value,
  icon,
  iconBgColor,
  cardBgColor,
  growth,
}: StatsCardProps) => {
  return (
    <div className={cn("rounded-2xl px-4 py-5 flex flex-col gap-4", cardBgColor)}>
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl shadow-sm",
            iconBgColor
          )}
        >
          {icon}
        </div>
        <span className="flex items-center gap-1 text-sm font-semibold text-green-500">
          <TrendingUp className="h-3.5 w-3.5" />
          {growth}
        </span>
      </div>

      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="mt-1 text-3xl font-bold text-gray-800">{value}</h3>
        <p className="mt-1 text-xs text-gray-400">vs last month</p>
      </div>
    </div>
  );
};

export default StatsCard;