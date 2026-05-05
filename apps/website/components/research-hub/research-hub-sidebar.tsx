"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  BookOpen, 
  Target, 
  Calendar, 
  Award, 
  FileText,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const sidebarItems = [
  {
    title: "About",
    href: "/research-hub/about",
    icon: BookOpen,
    description: "Research philosophy and methodology"
  },
  {
    title: "Projects",
    href: "/research-hub/projects",
    icon: Target,
    description: "Active and completed research projects"
  },
  {
    title: "Tasks",
    href: "/research-hub/tasks",
    icon: Calendar,
    description: "Research milestones and task tracking"
  },
  {
    title: "Awards",
    href: "/research-hub/awards",
    icon: Award,
    description: "Academic awards and recognition"
  },
  {
    title: "Blog/Portfolio",
    href: "/research-hub/blog",
    icon: FileText,
    description: "Research insights and publications"
  }
];

interface ResearchHubSidebarProps {
  className?: string;
}

export function ResearchHubSidebar({ className }: ResearchHubSidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full justify-start"
        >
          {isMobileOpen ? (
            <>
              <X className="w-4 h-4 mr-2" />
              Close Menu
            </>
          ) : (
            <>
              <Menu className="w-4 h-4 mr-2" />
              Research Hub Menu
            </>
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "w-full lg:w-64 space-y-2",
        isMobileOpen ? "block" : "hidden lg:block",
        className
      )}>
        <div className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-100 text-blue-700 border-l-4 border-blue-700"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                onClick={() => setIsMobileOpen(false)}
              >
                <Icon className="w-4 h-4" />
                <div className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {item.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-semibold text-sm mb-3">Quick Stats</h3>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Active Projects</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span>Publications</span>
              <span className="font-medium">28</span>
            </div>
            <div className="flex justify-between">
              <span>Awards</span>
              <span className="font-medium">15</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
