"use client";

import { Card } from "@/components/ui/card";
import { Target, FileText, Users, Award, Globe, Briefcase } from "lucide-react";

interface QuickStatsRowProps {
  className?: string;
}

export function QuickStatsRow({ className }: QuickStatsRowProps) {
  const stats = [
    {
      label: "Active Projects",
      value: "12",
      icon: Target,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    },
    {
      label: "Publications",
      value: "28",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      label: "Awards",
      value: "15",
      icon: Award,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      label: "Total Funding",
      value: "$275k+",
      icon: Briefcase,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      label: "Countries Reached",
      value: "6",
      icon: Globe,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      label: "Team Size",
      value: "8-12",
      icon: Users,
      color: "text-teal-600",
      bgColor: "bg-teal-100"
    }
  ];

  return (
    <div className={className}>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-1 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
