"use client";

import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WarmCardProps {
  children: ReactNode;
  className?: string;
  variant?: "sage" | "amber" | "terracotta" | "olive" | "white" | "sand";
  hoverLift?: boolean;
  colSpan?: 1 | 2 | 3;
}

export function WarmCard({
  children,
  className,
  variant = "white",
  hoverLift = false,
  colSpan = 1,
}: WarmCardProps) {
  const variantClass = {
    sage: "warm-gradient-sage text-white",
    amber: "warm-gradient-amber text-white",
    terracotta: "warm-gradient-terracotta text-white",
    olive: "warm-gradient-olive text-white",
    white: "warm-card",
    sand: "bg-[#F5F0E8]/60 backdrop-blur-sm",
  }[variant];

  const colSpanClass = {
    1: "col-span-1",
    2: "col-span-1 md:col-span-2",
    3: "col-span-1 md:col-span-3",
  }[colSpan];

  return (
    <div
      className={cn(
        "rounded-3xl p-8 transition-all duration-300",
        colSpanClass,
        variantClass,
        hoverLift && "warm-card-hover cursor-default",
        className
      )}
    >
      {children}
    </div>
  );
}
