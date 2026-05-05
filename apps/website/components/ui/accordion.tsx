"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  title: string;
  content: string;
  icon?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {item.icon && (
                <div className="text-blue-600">
                  {item.icon}
                </div>
              )}
              <h3 className="font-semibold text-lg">{item.title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <ChevronDown 
                className={cn(
                  "w-5 h-5 text-gray-500 transition-transform",
                  openIndex === index && "rotate-180"
                )}
              />
            </div>
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4 text-muted-foreground animate-in slide-in-from-top-2">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
