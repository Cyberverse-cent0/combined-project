"use client";

import React, { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AuroraCardProps {
  children: ReactNode;
  className?: string;
  gradient?: "teal" | "indigo" | "rose" | "amber" | "blue" | "purple" | "none";
  hoverGlow?: boolean;
  borderGlow?: boolean;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
}

export function AuroraCard({
  children,
  className,
  gradient = "none",
  hoverGlow = false,
  borderGlow = false,
  colSpan = 1,
  rowSpan = 1,
}: AuroraCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverGlow || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--x", `${x}%`);
    cardRef.current.style.setProperty("--y", `${y}%`);
  };

  const gradientClass = gradient !== "none" ? `mesh-gradient-${gradient}` : "";

  const colSpanClass = {
    1: "col-span-1",
    2: "col-span-1 md:col-span-2",
    3: "col-span-1 md:col-span-2 lg:col-span-3",
  }[colSpan];

  const rowSpanClass = {
    1: "row-span-1",
    2: "row-span-1 md:row-span-2",
  }[rowSpan];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "rounded-2xl p-6 transition-all duration-300",
        colSpanClass,
        rowSpanClass,
        gradientClass,
        borderGlow && "gradient-border-glow",
        hoverGlow && "aurora-card",
        !borderGlow && !hoverGlow && "bg-white/80 backdrop-blur-sm border border-white/40 shadow-sm",
        "hover:shadow-lg hover:scale-[1.01]",
        className
      )}
    >
      {children}
    </div>
  );
}
