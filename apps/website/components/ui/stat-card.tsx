"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: LucideIcon;
  color?: string;
  className?: string;
}

export function StatCard({ 
  value, 
  label, 
  icon: Icon, 
  color = "text-blue-600", 
  className 
}: StatCardProps) {
  return (
    <Card className={cn("p-6 text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1", className)}>
      {Icon && (
        <div className="flex justify-center mb-4">
          <Icon className={`w-8 h-8 ${color} group-hover:scale-110 transition-transform`} />
        </div>
      )}
      <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
    </Card>
  );
}
