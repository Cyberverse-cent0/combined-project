"use client";

import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { Target, FileText, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <div className={className}>
      {/* Hero Content */}
      <div className="text-center space-y-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          About the Research Hub
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Advancing psychological research through innovation, collaboration, and real-world impact.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button 
            asChild 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8"
          >
            <Link href="/research-hub/projects">
              Explore Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button 
            asChild 
            size="lg"
            variant="outline"
            className="border-purple-500/30 text-purple-700 hover:bg-purple-50 px-8"
          >
            <Link href="/contact">
              Collaborate
            </Link>
          </Button>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid gap-6 md:grid-cols-3 mb-16">
        <StatCard 
          value="25+" 
          label="Projects" 
          icon="Target"
          color="text-blue-600"
        />
        <StatCard 
          value="50+" 
          label="Publications" 
          icon="FileText"
          color="text-purple-600"
        />
        <StatCard 
          value="1000+" 
          label="People Impacted" 
          icon="Users"
          color="text-teal-600"
        />
      </div>
    </div>
  );
}
