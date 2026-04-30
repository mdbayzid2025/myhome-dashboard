import { useState } from "react";
import type { Enquiry } from "../../../types/enquiry";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { enquiries } from "../../../data/enquiries";
import { EnquiryTable } from "./EnquiryTable";
import { EnquiryModal } from "./EnquiryModal";


const StatsCard = ({ title, value, growth }: any) => {
    return (
        <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-5">
            <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{title}</p>
            <span className="text-green-600 text-sm font-medium">
                {growth}
            </span>
            </div>
            <h2 className="text-2xl font-bold mt-2">{value}</h2>
        </CardContent>
        </Card>
    );
};


export default function EnquiriesPage() {
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [open, setOpen] = useState(false);

  const handleView = (item: Enquiry) => {
    setSelected(item);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="title">Leads & Enquiries</h1>
        <Button>Export</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatsCard title="Total Enquiries" value="1,247" growth="+12.5%" />
        <StatsCard title="New This Week" value="87" growth="+8.2%" />
        <StatsCard title="This Month" value="342" growth="+15.3%" />
      </div>

      {/* Search */}
      <Input placeholder="Search by property, user, or agent..." />

      {/* Table */}
      <EnquiryTable data={enquiries} onView={handleView} />

      {/* Modal */}
      <EnquiryModal
        open={open}
        onClose={() => setOpen(false)}
        data={selected || undefined}
      />
    </div>
  );
}