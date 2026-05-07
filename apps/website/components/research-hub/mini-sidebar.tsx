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
} from "lucide-react";

const sidebarItems = [
  { title: "About", href: "/research-hub/about", icon: Brain },
  { title: "Projects", href: "/research-hub/projects", icon: Microscope },
  { title: "Our Team", href: "/research-hub/team", icon: Users },
  { title: "Activities", href: "/research-hub/activities", icon: Calendar },
  { title: "Community", href: "/research-hub/community", icon: HeartHandshake },
  { title: "Awards", href: "/research-hub/awards", icon: Trophy },
];

export function MiniSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-2 py-4 px-2 bg-white/80 backdrop-blur-xl rounded-3xl border border-[#D4A04A]/20 shadow-lg shadow-[#5B7B5E]/5 group hover:w-56 w-16 transition-all duration-300 ease-out overflow-hidden">
      {/* Mini Lab Logo */}
      <div className="w-10 h-10 bg-gradient-to-br from-[#5B7B5E] to-[#7A8B5C] rounded-2xl flex items-center justify-center text-white text-lg shadow-md shrink-0">
        🧠
      </div>

      <div className="w-8 h-px bg-[#D4A04A]/20 my-1" />

      {/* Nav Items */}
      {sidebarItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex items-center gap-3 w-full px-2 py-2.5 rounded-2xl transition-all duration-200 shrink-0",
              active
                ? "bg-gradient-to-r from-[#C4785A]/20 to-[#D4A04A]/10 text-[#C4785A]"
                : "text-[#7A8B5C] hover:bg-[#5B7B5E]/5 hover:text-[#5B7B5E]"
            )}
          >
            {/* Active dot */}
            {active && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-[#C4785A] to-[#D4A04A] rounded-full" />
            )}
            <item.icon className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-75">
              {item.title}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
