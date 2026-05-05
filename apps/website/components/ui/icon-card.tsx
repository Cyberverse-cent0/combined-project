"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface IconCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: string;
  className?: string;
}

export function IconCard({ 
  title, 
  description, 
  icon: Icon, 
  color = "text-blue-600",
  className 
}: IconCardProps) {
  return (
    <Card className={cn(
      "p-6 group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer",
      className
    )}>
      <div className={cn(
        "w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform",
        `${color.replace('text-', 'bg-')} bg-opacity-10`
      )}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </Card>
  );
}
