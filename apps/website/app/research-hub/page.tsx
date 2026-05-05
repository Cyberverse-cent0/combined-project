import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Award, 
  Users, 
  Calendar,
  TrendingUp,
  FileText,
  Target,
  Lightbulb,
  ArrowRight,
  BarChart3
} from "lucide-react";
import { siteContent } from "@/lib/content/site-content";
import { createMetadata } from "@/lib/site";
import { redirect } from 'next/navigation';

export const metadata = createMetadata(
  "Research Hub",
  "Comprehensive research center with projects, publications, and academic activities.",
  "/research-hub",
);

export const revalidate = 3600;

const researchSections = [
  {
    title: "About",
    description: "Research philosophy and methodology",
    icon: BookOpen,
    href: "/research-hub/about",
    color: "bg-blue-500",
    count: null
  },
  {
    title: "Projects",
    description: "Active and completed research projects",
    icon: Target,
    href: "/research-hub/projects",
    color: "bg-green-500",
    count: siteContent.researchProjects.length
  },
  {
    title: "Publications",
    description: "Academic publications and papers",
    icon: FileText,
    href: "/research-hub/publications",
    color: "bg-purple-500",
    count: siteContent.publications.length
  },
  {
    title: "Tasks",
    description: "Research milestones and task tracking",
    icon: Calendar,
    href: "/research-hub/tasks",
    color: "bg-orange-500",
    count: null
  },
  {
    title: "Awards",
    description: "Academic awards and grants",
    icon: Award,
    href: "/research-hub/awards",
    color: "bg-yellow-500",
    count: siteContent.awards.length
  },
  {
    title: "Invited Talks",
    description: "Speaking engagements and presentations",
    icon: Users,
    href: "/research-hub/invited-talks",
    color: "bg-red-500",
    count: siteContent.invitedTalks.length
  },
  {
    title: "Research Interests",
    description: "Areas of expertise and research focus",
    icon: Lightbulb,
    href: "/research-hub/interests",
    color: "bg-indigo-500",
    count: null
  },
  {
    title: "Ongoing",
    description: "Currently active research initiatives",
    icon: TrendingUp,
    href: "/research-hub/ongoing",
    color: "bg-teal-500",
    count: null
  },
  {
    title: "Collaborations",
    description: "Research partnerships and networks",
    icon: Users,
    href: "/research-hub/collaborations",
    color: "bg-pink-500",
    count: siteContent.collaborators.length
  },
  {
    title: "Resources",
    description: "Research tools and documentation",
    icon: BarChart3,
    href: "/research-hub/resources",
    color: "bg-gray-500",
    count: null
  }
];

const statsCards = [
  {
    label: "Total Projects",
    value: siteContent.researchProjects.length,
    icon: Target,
    color: "text-green-600"
  },
  {
    label: "Publications",
    value: siteContent.publications.length,
    icon: FileText,
    color: "text-purple-600"
  },
  {
    label: "Awards",
    value: siteContent.awards.length,
    icon: Award,
    color: "text-yellow-600"
  },
  {
    label: "Collaborators",
    value: siteContent.collaborators.length,
    icon: Users,
    color: "text-blue-600"
  }
];

export default function ResearchHubPage() {
  // Redirect to the About page as the main entry point for the research hub
  redirect('/research-hub/about');
}
