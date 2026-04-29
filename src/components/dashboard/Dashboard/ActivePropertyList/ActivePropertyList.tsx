// components/dashboard/ActiveListings/ActiveListingsFilter.tsx
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { Button } from "../../../ui/button";


interface FilterState {
  engagement: string;
  status: string;
  location: string;
}

interface ActiveListingsFilterProps {
  filters: FilterState;
  locations: string[];
  onChange: (key: keyof FilterState, value: string) => void;
  onReset: () => void;
}

const ENGAGEMENT_OPTIONS = ["All", "High", "Medium", "Low"];
const STATUS_OPTIONS = ["All", "Active", "Under Offer", "Sold", "Inactive"];

const ActiveListingsFilter = ({
  filters,
  locations,
  onChange,
  onReset,
}: ActiveListingsFilterProps) => {
  const isFiltered =
    filters.engagement !== "All" ||
    filters.status !== "All" ||
    filters.location !== "All";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Engagement */}
      <Select
        value={filters.engagement}
        onValueChange={(v:any) => onChange("engagement", v)}
      >
        <SelectTrigger className="w-36 h-9 text-sm border-gray-200">
          <SelectValue placeholder="Engagement" />
        </SelectTrigger>
        <SelectContent>
          {ENGAGEMENT_OPTIONS.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status */}
      <Select
        value={filters.status}
        onValueChange={(v:any) => onChange("status", v)}
      >
        <SelectTrigger className="w-36 h-9 text-sm border-gray-200">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Location */}
      <Select
        value={filters.location}
        onValueChange={(v:any) => onChange("location", v)}
      >
        <SelectTrigger className="w-36 h-9 text-sm border-gray-200">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          {["All", ...locations].map((loc) => (
            <SelectItem key={loc} value={loc}>
              {loc}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Reset */}
      {isFiltered && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="h-9 px-3 text-sm text-gray-500 hover:text-gray-700 gap-1"
        >
          <X className="w-3.5 h-3.5" />
          Reset
        </Button>
      )}
    </div>
  );
};

export default ActiveListingsFilter;