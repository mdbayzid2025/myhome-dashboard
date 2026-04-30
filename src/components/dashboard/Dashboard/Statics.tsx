

import { useState } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { useGetAnalyticsQuery } from "../../../redux/features/dashboard/dashboardApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import StatsCard from "./StatsCard";


const currentYear = new Date().getFullYear();

const StatsCards = () => {
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const { data: analyticsData } = useGetAnalyticsQuery({ year: selectedYear });

  const stats = [
    {
      title: "Total Property Seeker",
      value: analyticsData?.totalPropertySeekers
        ? analyticsData.totalPropertySeekers.toLocaleString()
        : "4,020",
      icon: <FiUsers className="h-5 w-5 text-white" />,
      iconBgColor: "bg-blue-500",
      cardBgColor: "bg-blue-50",
      growth: "+12.5%",
    },
    {
      title: "Total Agents",
      value: analyticsData?.totalAgents ?? "342",
      icon: <MdOutlineRealEstateAgent className="h-5 w-5 text-white" />,
      iconBgColor: "bg-purple-500",
      cardBgColor: "bg-purple-50",
      growth: "+8.2%",
    },
    {
      title: "Total Revenue",
      value: analyticsData?.totalRevenue
        ? `£${analyticsData.totalRevenue.toLocaleString()}`
        : "£412,450",
      icon: <BsCurrencyDollar className="h-5 w-5 text-white" />,
      iconBgColor: "bg-green-500",
      cardBgColor: "bg-green-50",
      growth: "+15.3%",
    },
  ];

  return (
    <div className="w-full  ">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="title">Overview</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Welcome back! Here's what's happening with your platform.
          </p>
        </div>

        {/* Year Select */}
        <Select
          value={selectedYear}
          onValueChange={(value) => setSelectedYear(value)}
        >
          <SelectTrigger className="w-32 bg-primary! text-white! shadow-sm">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent position="popper" className="bg-primary! text-white">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <SelectItem key={i} value={(currentYear - i).toString()}>
                {currentYear - i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-gray-50 p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-11 w-11 rounded-xl" />
                  <Skeleton className="h-4 w-14" />
                </div>
                <div>
                  <Skeleton className="h-3 w-32 mb-2" />
                  <Skeleton className="h-8 w-24 mb-2" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))
            : stats.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))} */}
           { stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
      </div>
    </div>
  );
};

export default StatsCards;