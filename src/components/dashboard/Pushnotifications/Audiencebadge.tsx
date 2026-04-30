import type { AudienceType } from "../../../data/notifications";
import { Badge } from "../../ui/badge";


const config: Record<AudienceType, string> = {
  users: "bg-blue-100 text-blue-700 border-blue-200",
  agents: "bg-green-100 text-green-700 border-green-200",
  all: "bg-purple-100 text-purple-700 border-purple-200",
  custom: "bg-orange-100 text-orange-700 border-orange-200",
};

export function AudienceBadge({ audience }: { audience: AudienceType }) {
  return (
    <Badge variant="outline" className={`text-xs font-medium ${config[audience]}`}>
      {audience}
    </Badge>
  );
}