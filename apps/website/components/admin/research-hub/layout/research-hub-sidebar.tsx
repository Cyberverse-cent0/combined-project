"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Brain,
  Users,
  Calendar,
  HeartHandshake,
  Trophy,
  Images,
  Settings,
  Search,
  FileText,
  BarChart3,
  X,
  ChevronDown,
  ChevronRight,
  LogOut,
  ExternalLink,
  Home,
  FolderOpen,
  Award,
  Globe,
  Target,
  Bell,
  User
} from "lucide-react";
import { useState } from "react";

interface ResearchHubSidebarProps {
  onClose?: () => void;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/research-hub",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    href: "/admin/research-hub/projects",
    icon: Brain,
    badge: "High Priority",
  },
  {
    title: "About Page",
    href: "/admin/research-hub/about",
    icon: FileText,
    children: [
      {
        title: "Lab Information",
        href: "/admin/research-hub/about/lab-info",
        icon: Home,
      },
      {
        title: "Mission & Vision",
        href: "/admin/research-hub/about/mission",
        icon: Target,
      },
      {
        title: "Values & Focus",
        href: "/admin/research-hub/about/values",
        icon: Award,
      },
    ],
  },
  {
    title: "Our Team",
    href: "/admin/research-hub/team",
    icon: Users,
    children: [
      {
        title: "Team Members",
        href: "/admin/research-hub/team/members",
        icon: Users,
      },
      {
        title: "Collaborators",
        href: "/admin/research-hub/team/collaborators",
        icon: Globe,
      },
    ],
  },
  {
    title: "Activities",
    href: "/admin/research-hub/activities",
    icon: Calendar,
    children: [
      {
        title: "Events",
        href: "/admin/research-hub/activities/events",
        icon: Calendar,
      },
      {
        title: "Publications",
        href: "/admin/research-hub/activities/publications",
        icon: FileText,
      },
      {
        title: "Media Appearances",
        href: "/admin/research-hub/activities/media",
        icon: Images,
      },
    ],
  },
  {
    title: "Community",
    href: "/admin/research-hub/community",
    icon: HeartHandshake,
    children: [
      {
        title: "Engagement",
        href: "/admin/research-hub/community/engagement",
        icon: HeartHandshake,
      },
      {
        title: "Testimonials",
        href: "/admin/research-hub/community/testimonials",
        icon: Users,
      },
    ],
  },
  {
    title: "Awards & Grants",
    href: "/admin/research-hub/awards",
    icon: Trophy,
    children: [
      {
        title: "Awards",
        href: "/admin/research-hub/awards/awards",
        icon: Trophy,
      },
      {
        title: "Grants",
        href: "/admin/research-hub/awards/grants",
        icon: Award,
      },
    ],
  },
  {
    title: "Media Library",
    href: "/admin/research-hub/media",
    icon: Images,
  },
  {
    title: "SEO & Settings",
    href: "/admin/research-hub/settings",
    icon: Settings,
    children: [
      {
        title: "SEO Management",
        href: "/admin/research-hub/settings/seo",
        icon: BarChart3,
      },
      {
        title: "General Settings",
        href: "/admin/research-hub/settings/general",
        icon: Settings,
      },
    ],
  },
];

export function ResearchHubSidebar({ onClose }: ResearchHubSidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const filteredItems = navigationItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.children?.some(child =>
      child.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const isActive = (href: string) => {
    if (href === "/admin/research-hub") {
      return pathname === href || pathname === "/admin/research-hub/";
    }
    return pathname.startsWith(href);
  };

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const isExpanded = expandedItems.includes(item.title);
    const hasChildren = item.children && item.children.length > 0;
    const active = isActive(item.href);

    return (
      <div key={item.href}>
        <Link
          href={item.href}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
            active
              ? "bg-[#0F766E] text-white shadow-lg"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            level > 0 && "pl-6"
          )}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.title);
            }
            if (onClose) {
              onClose();
            }
          }}
        >
          <item.icon className={cn(
            "w-5 h-5 flex-shrink-0",
            active ? "text-white" : "text-gray-500 group-hover:text-gray-700"
          )} />
          
          <span className="flex-1 text-left">{item.title}</span>
          
          <div className="flex items-center gap-2">
            {item.badge && (
              <Badge 
                variant="outline" 
                className={cn(
                  "text-xs",
                  active 
                    ? "border-white text-white" 
                    : "border-[#0F766E] text-[#0F766E] bg-[#0F766E]/10"
                )}
              >
                {item.badge}
              </Badge>
            )}
            
            {hasChildren && (
              <div className="p-1">
                {isExpanded ? (
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform",
                    active ? "text-white" : "text-gray-400"
                  )} />
                ) : (
                  <ChevronRight className={cn(
                    "w-4 h-4 transition-transform",
                    active ? "text-white" : "text-gray-400"
                  )} />
                )}
              </div>
            )}
          </div>
        </Link>

        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children?.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#0F766E] to-teal-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
            🧠🌿
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Research Hub</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="lg:hidden p-2"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search navigation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {filteredItems.map(item => renderNavItem(item))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Link
          href="/research-hub"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View Site</span>
        </Link>
        
        <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Admin Online</span>
        </div>
      </div>
    </div>
  );
}
