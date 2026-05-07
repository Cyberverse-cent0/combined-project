"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteContent } from "@/lib/content/site-content";
import {
  LayoutDashboard,
  Brain,
  Microscope,
  FileText,
  ListChecks,
  Trophy,
  Mic2,
  Lightbulb,
  TrendingUp,
  Users,
  BookOpen,
  ArrowRight,
  Target,
  Award,
  Globe,
  Heart
} from "lucide-react";

const quickAccessCards = [
  {
    title: "About",
    description: "Lab identity and research philosophy",
    icon: Brain,
    href: "/research-hub/about",
    count: null
  },
  {
    title: "Projects",
    description: "Active and completed research",
    icon: Microscope,
    href: "/research-hub/projects",
    count: siteContent.researchProjects.length
  },
  {
    title: "Publications",
    description: "Papers and publications",
    icon: FileText,
    href: "/research-hub/activities",
    count: siteContent.publications.length
  },
  {
    title: "Tasks",
    description: "Research milestones",
    icon: ListChecks,
    href: "/research-hub/tasks",
    count: null
  },
  {
    title: "Awards",
    description: "Recognition and grants",
    icon: Trophy,
    href: "/research-hub/awards",
    count: siteContent.awards.length
  },
  {
    title: "Team",
    description: "Collaborators and network",
    icon: Users,
    href: "/research-hub/team",
    count: siteContent.collaborators.length
  }
];

const statsData = [
  { label: "Projects", value: siteContent.researchProjects.length, icon: Target, color: "text-emerald-600" },
  { label: "Publications", value: siteContent.publications.length, icon: FileText, color: "text-blue-600" },
  { label: "Awards", value: siteContent.awards.length, icon: Award, color: "text-amber-600" },
  { label: "Collaborators", value: siteContent.collaborators.length, icon: Users, color: "text-purple-600" }
];

const recentActivity = [
  { title: "New project submitted", detail: "Traditional Luhya Mourning Rituals", time: "2 days ago", type: "project" },
  { title: "Publication updated", detail: "Cultural Psychology Review", time: "1 week ago", type: "publication" },
  { title: "Team member added", detail: "Dr. Jane Doe, Research Fellow", time: "2 weeks ago", type: "team" },
  { title: "Grant approved", detail: "Templeton Foundation - $150,000", time: "1 month ago", type: "award" }
];

export default function ResearchHubDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to about page by default
    router.replace('/research-hub/about');
  }, [router]);

  return (
    <div className="min-h-screen">
      {/* Welcome Banner - Takes half the page with purple-blue gradient */}
      <div className="min-h-[50vh] bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center text-white">
        <div className="text-center space-y-6 px-4 max-w-4xl mx-auto">
          <div className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl">
            🧠🌿
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Welcome to Our Research Hub
          </h1>
          <p className="text-2xl md:text-3xl font-light opacity-90">
            "Human Development, Indigenous Knowledge and Flourishing Lab"
          </p>
          <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto">
            A pioneering research center dedicated to culturally grounded psychology, 
            indigenous knowledge systems, and decolonizing mental health practices in African contexts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 border-0 px-8" asChild>
              <Link href="/research-hub/about">
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8" asChild>
              <Link href="/research-hub/projects">
                View Projects <Microscope className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Loading indicator while redirecting */}
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting to About page...</p>
        </div>
      </div>
    </div>
  );
}
