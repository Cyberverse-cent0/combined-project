"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/lib/content/site-content";
import { ExternalLink, Calendar, Users, Target, Filter } from "lucide-react";
import Link from "next/link";

interface FilterableProjectGridProps {
  className?: string;
}

export function FilterableProjectGrid({ className }: FilterableProjectGridProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { id: "all", label: "All Projects", count: siteContent.researchProjects.length },
    { id: "active", label: "Active", count: siteContent.researchProjects.filter(p => p.status === 'Active').length },
    { id: "collaborative", label: "Collaborative", count: siteContent.researchProjects.filter(p => p.category?.includes('Collaborative')).length },
    { id: "indigenous", label: "Indigenous Psychology", count: siteContent.researchProjects.filter(p => p.category?.includes('Indigenous')).length },
    { id: "youth", label: "Youth", count: siteContent.researchProjects.filter(p => p.category?.includes('Youth')).length },
    { id: "cultural", label: "Cultural", count: siteContent.researchProjects.filter(p => p.category?.includes('Cultural')).length }
  ];

  const filteredProjects = siteContent.researchProjects.filter(project => {
    if (activeFilter === "all") return true;
    if (activeFilter === "active") return project.status === "Active";
    if (activeFilter === "collaborative") return project.category?.includes('Collaborative');
    if (activeFilter === "indigenous") return project.category?.includes('Indigenous');
    if (activeFilter === "youth") return project.category?.includes('Youth');
    if (activeFilter === "cultural") return project.category?.includes('Cultural');
    return true;
  });

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getTags = (project: any) => {
    const tags = [];
    if (project.category?.includes('Indigenous')) tags.push('Indigenous Psychology');
    if (project.category?.includes('Cultural')) tags.push('Cultural Evolution');
    if (project.category?.includes('Youth')) tags.push('Youth Development');
    if (project.category?.includes('Community')) tags.push('Community Health');
    if (project.status === 'Active') tags.push('Ongoing');
    return tags;
  };

  return (
    <div className={className}>
      {/* Filter Bar */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Filter Projects</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === category.id
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.label}
              <span className="ml-2 text-xs opacity-75">
                ({category.count})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.slice(0, 6).map((project, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
            <div className="space-y-4">
              {/* Project Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {project.summary}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {getTags(project).map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Project Meta */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {project.funding && (
                    <div className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      <span>Funded</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Ongoing</span>
                  </div>
                </div>
                
                {project.link && (
                  <Button asChild variant="outline" size="sm">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* View All Button */}
      {filteredProjects.length > 6 && (
        <div className="text-center mt-8">
          <Button 
            asChild 
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
          >
            <Link href="/research-hub/projects">
              View All {filteredProjects.length} Projects
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
