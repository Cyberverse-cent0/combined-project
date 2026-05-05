"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Brain,
  Microscope,
  Users,
  Calendar,
  HeartHandshake,
  Trophy,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const sidebarItems = [
  {
    title: "About",
    href: "/research-hub/about",
    description: "Lab identity and research philosophy",
    icon: Brain
  },
  {
    title: "Projects",
    href: "/research-hub/projects",
    description: "Active and completed research projects",
    icon: Microscope
  },
  {
    title: "Our Team",
    href: "/research-hub/team",
    description: "Research team and international collaborators",
    icon: Users
  },
  {
    title: "Activities",
    href: "/research-hub/activities",
    description: "Conferences, publications, and events",
    icon: Calendar
  },
  {
    title: "Community",
    href: "/research-hub/community",
    description: "Engagement and partnership opportunities",
    icon: HeartHandshake
  },
  {
    title: "Awards & Grants",
    href: "/research-hub/awards",
    description: "Professional recognition and funding",
    icon: Trophy
  }
];

interface ResearchHubSidebarProps {
  className?: string;
}

export function ResearchHubSidebar({ className }: ResearchHubSidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden mb-4 w-full justify-start"
      >
        {isMobileOpen ? (
          <X className="w-4 h-4" />
        ) : (
          <Menu className="w-4 h-4" />
        )}
      </Button>

      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:block w-72 space-y-2 sticky top-0 h-screen overflow-y-auto", className)}>
        {/* HDLK-L Branding */}
        <div className="p-4 border-b bg-gradient-to-r from-[#0F766E] to-teal-600 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-3xl">🧠🌿</div>
            <div>
              <div className="font-bold text-lg">HDLK-L</div>
              <div className="text-xs text-emerald-100">Human Development, Indigenous Knowledge & Flourishing Lab</div>
            </div>
          </div>
        </div>

        <div className="space-y-1 p-3">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive(item.href)
                  ? "bg-[#0F766E] text-white shadow-lg"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon className="w-5 h-5" />
              <div className="flex-1">
                <div className="font-medium">{item.title}</div>
                <div className="text-xs opacity-75">{item.description}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="p-4 border-t bg-muted/30">
          <h3 className="font-semibold mb-3 text-sm">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white p-3 rounded-lg shadow-sm text-center">
              <div className="text-lg font-bold text-[#0F766E]">12</div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm text-center">
              <div className="text-lg font-bold text-[#0F766E]">28</div>
              <div className="text-xs text-muted-foreground">Publications</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)}>
          <div className="bg-white p-4 w-80">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Research Hub</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <div className="w-4 h-4" />
                  <div className="font-medium">{item.title}</div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
