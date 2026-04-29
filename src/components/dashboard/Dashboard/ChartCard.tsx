// components/dashboard/Charts/ChartCard.tsx
import GrowthChart from "./GrowthChart";

interface ChartCardProps {
  title: string;
  subtitle: string;
  data: { month: string; value: number }[];
  color: string;
  gradientId: string;
  footerLabel: string;
  footerValue: string;
}

const ChartCard = ({
  title,
  subtitle,
  data,
  color,
  gradientId,
  footerLabel,
  footerValue,
}: ChartCardProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>

      {/* Chart */}
      <GrowthChart data={data} color={color} gradientId={gradientId} />

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <span className="text-sm text-gray-400">{footerLabel}</span>
        <span className="text-base font-bold text-gray-900">{footerValue}</span>
      </div>
    </div>
  );
};

export default ChartCard;