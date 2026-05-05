"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  Target, 
  Globe, 
  Heart, 
  Brain,
  Microscope,
  Users,
  Lightbulb,
  CheckCircle,
  Shield,
  Lock,
  Eye,
  ArrowRight,
  Mail
} from "lucide-react";

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: string;
  color?: string;
  className?: string;
}

const iconMap: Record<string, any> = {
  Target,
  Globe,
  Heart,
  Brain,
  Microscope,
  Users,
  Lightbulb,
  CheckCircle,
  Shield,
  Lock,
  Eye,
  ArrowRight,
  Mail
};

export function StatCard({ 
  value, 
  label, 
  icon: iconName, 
  color = "text-blue-600", 
  className 
}: StatCardProps) {
  const Icon = iconName ? iconMap[iconName] : null;
  
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
