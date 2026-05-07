"use client";

import { useState, useEffect } from "react";
import { ResearchHubLayout } from "@/components/admin/research-hub/layout/research-hub-layout";
import { DataTable } from "@/components/admin/research-hub/ui/data-table";
import { AddButton, FilterButton, RefreshButton } from "@/components/admin/research-hub/ui/action-buttons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Brain, 
  Calendar, 
  Globe, 
  DollarSign, 
  Users, 
  Eye,
  ExternalLink 
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project, ProjectFilters, PaginationOptions } from "@/lib/admin/research-hub/types";
import { getStatusColor, formatDate, truncateText } from "@/lib/admin/research-hub/utils";

// Mock data - replace with actual API calls
const mockProjects: Project[] = [
  {
    id: "1",
    slug: "traditional-luhya-mourning-rituals",
    title: "Traditional Luhya Mourning Rituals",
    shortDescription: "Cultural evolution study of traditional mourning practices in Western Kenya",
    fullDescription: "A comprehensive study examining the cultural evolution and psychological significance of traditional Luhya mourning rituals...",
    status: "published",
    featured: true,
    category: ["Cultural Psychology", "Thanatology"],
    countries: ["Kenya"],
    startDate: "2023-01-15",
    endDate: "2024-12-31",
    sampleSize: 250,
    funding: {
      body: "Templeton Foundation",
      amount: "150000",
      currency: "USD"
    },
    leadResearcher: "stephen-asatsa",
    collaborators: ["sheina-lew-levy", "elizabeth-shino"],
    methodology: "Mixed-methods ethnographic study with quantitative surveys",
    keyFindings: ["Cultural continuity in mourning practices", "Psychological benefits of traditional rituals"],
    outputs: ["Academic publications", "Community workshops"],
    relatedPublications: ["pub-1", "pub-2"],
    externalLinks: [{
      title: "Project Website",
      url: "https://example.com/project"
    }],
    featuredImage: "/uploads/projects/luhya-mourning.jpg",
    gallery: ["/uploads/projects/luhya-1.jpg", "/uploads/projects/luhya-2.jpg"],
    displayOrder: 1,
    seo: {
      title: "Traditional Luhya Mourning Rituals - HDLK-L Research",
      description: "Study of traditional mourning practices and their psychological significance",
      keywords: ["Luhya", "mourning", "rituals", "cultural psychology"]
    },
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    createdBy: "admin",
    updatedBy: "admin"
  },
  {
    id: "2",
    slug: "africa-long-life-study",
    title: "Africa Long Life Study",
    shortDescription: "Cross-cultural study of personality and wellbeing across African populations",
    fullDescription: "Large-scale study examining personality traits and wellbeing indicators across multiple African countries...",
    status: "published",
    featured: true,
    category: ["Cross-Cultural Psychology", "Wellbeing"],
    countries: ["Kenya", "Namibia", "South Africa", "Switzerland", "Ethiopia"],
    startDate: "2022-06-01",
    endDate: "2025-05-31",
    sampleSize: 5000,
    funding: {
      body: "Swiss National Science Foundation",
      amount: "500000",
      currency: "CHF"
    },
    leadResearcher: "amber-thalmayer",
    collaborators: ["stephen-asatsa", "luzelle-naude", "elizabeth-shino"],
    methodology: "Longitudinal survey study with cross-sectional components",
    keyFindings: ["Cultural variations in personality", "Wellbeing predictors across contexts"],
    outputs: ["Database", "Publications", "Conference presentations"],
    relatedPublications: ["pub-3", "pub-4"],
    externalLinks: [{
      title: "Study Portal",
      url: "https://africalonglifestudy.org"
    }],
    featuredImage: "/uploads/projects/africa-long-life.jpg",
    gallery: ["/uploads/projects/alls-1.jpg"],
    displayOrder: 2,
    seo: {
      title: "Africa Long Life Study - Cross-Cultural Research",
      description: "Comprehensive study of personality and wellbeing across African populations",
      keywords: ["Africa", "longitudinal", "personality", "wellbeing", "cross-cultural"]
    },
    createdAt: "2022-06-01T00:00:00Z",
    updatedAt: "2024-01-14T15:45:00Z",
    createdBy: "admin",
    updatedBy: "admin"
  },
  {
    id: "3",
    slug: "covid-19-adolescent-emotional-regulation",
    title: "COVID-19 Adolescent Emotional Regulation Study",
    shortDescription: "Impact of pandemic on emotional regulation in adolescents across cultures",
    fullDescription: "Study examining how COVID-19 affected emotional regulation strategies in adolescent populations...",
    status: "draft",
    featured: false,
    category: ["Developmental Psychology", "Mental Health"],
    countries: ["Kenya", "Switzerland", "USA"],
    startDate: "2021-03-01",
    endDate: "2023-12-31",
    sampleSize: 800,
    funding: {
      body: "Society for Research in Child Development",
      amount: "75000",
      currency: "USD"
    },
    leadResearcher: "stephen-asatsa",
    collaborators: ["amber-thalmayer"],
    methodology: "Mixed-methods with longitudinal components",
    keyFindings: ["Cultural differences in coping strategies", "Impact on academic performance"],
    outputs: ["Research brief", "Policy recommendations"],
    relatedPublications: ["pub-5"],
    externalLinks: [],
    featuredImage: "/uploads/projects/covid-adolescent.jpg",
    gallery: [],
    displayOrder: 3,
    seo: {
      title: "COVID-19 Adolescent Emotional Regulation Study",
      description: "Research on pandemic impact on adolescent emotional development",
      keywords: ["COVID-19", "adolescents", "emotional regulation", "mental health"]
    },
    createdAt: "2021-03-01T00:00:00Z",
    updatedAt: "2024-01-13T09:20:00Z",
    createdBy: "admin",
    updatedBy: "admin"
  }
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ProjectFilters>({});
  const [pagination, setPagination] = useState<PaginationOptions>({
    page: 1,
    limit: 20,
    sortBy: "updatedAt",
    sortOrder: "desc"
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProjects(mockProjects);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadProjects();
  };

  const handleViewProject = (project: Project) => {
    window.open(`/research-hub/projects/${project.slug}`, '_blank');
  };

  const handleEditProject = (project: Project) => {
    window.location.href = `/admin/research-hub/projects/${project.id}/edit`;
  };

  const handleDeleteProject = async (project: Project) => {
    if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
      try {
        // TODO: Implement delete API call
        setProjects(prev => prev.filter(p => p.id !== project.id));
        console.log('Project deleted:', project.id);
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  const handleDuplicateProject = async (project: Project) => {
    try {
      // TODO: Implement duplicate API call
      const duplicatedProject = {
        ...project,
        id: Date.now().toString(),
        title: `${project.title} (Copy)`,
        slug: `${project.slug}-copy`,
        status: 'draft' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setProjects(prev => [duplicatedProject, ...prev]);
      console.log('Project duplicated:', project.id);
    } catch (error) {
      console.error('Failed to duplicate project:', error);
    }
  };

  const columns = [
    {
      key: "title",
      title: "Project",
      sortable: true,
      render: (value: string, row: Project) => (
        <div className="space-y-1">
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{truncateText(row.shortDescription, 80)}</div>
          <div className="flex items-center gap-2">
            <StatusBadge status={row.status} />
            {row.featured && (
              <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                Featured
              </Badge>
            )}
          </div>
        </div>
      )
    },
    {
      key: "category",
      title: "Category",
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.map((cat, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {cat}
            </Badge>
          ))}
        </div>
      )
    },
    {
      key: "countries",
      title: "Countries",
      render: (value: string[]) => (
        <div className="flex items-center gap-1">
          <Globe className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{value.length} countries</span>
        </div>
      )
    },
    {
      key: "funding",
      title: "Funding",
      render: (value: Project["funding"]) => (
        <div className="space-y-1">
          <div className="text-sm font-medium">{value.body}</div>
          {value.amount && (
            <div className="text-sm text-gray-500">
              {value.currency} {parseInt(value.amount).toLocaleString()}
            </div>
          )}
        </div>
      )
    },
    {
      key: "sampleSize",
      title: "Sample Size",
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{value?.toLocaleString() || 'N/A'}</span>
        </div>
      )
    },
    {
      key: "startDate",
      title: "Timeline",
      render: (value: string, row: Project) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{formatDate(value)}</span>
          </div>
          {row.endDate && (
            <div className="text-xs text-gray-500">to {formatDate(row.endDate)}</div>
          )}
        </div>
      )
    },
    {
      key: "updatedAt",
      title: "Last Updated",
      sortable: true,
      render: (value: string) => (
        <span className="text-sm text-gray-600">{formatDate(value)}</span>
      )
    }
  ];

  const filteredProjects = projects.filter(project => {
    if (filters.search && !project.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.status && filters.status.length > 0 && !filters.status.includes(project.status)) {
      return false;
    }
    if (filters.category && filters.category.length > 0 && !filters.category.some(cat => project.category.includes(cat))) {
      return false;
    }
    if (filters.countries && filters.countries.length > 0 && !filters.countries.some(country => project.countries.includes(country))) {
      return false;
    }
    if (filters.featured !== undefined && project.featured !== filters.featured) {
      return false;
    }
    return true;
  });

  const paginatedProjects = filteredProjects.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit
  );

  return (
    <ResearchHubLayout title="Projects Management">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600">Manage research projects and studies</p>
          </div>
          <div className="flex items-center gap-3">
            <RefreshButton onClick={handleRefresh} loading={loading} />
            <AddButton onClick={() => window.location.href = '/admin/research-hub/projects/new'}>
              New Project
            </AddButton>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
              </div>
              <Brain className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-green-600">
                  {projects.filter(p => p.status === 'published').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Draft</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {projects.filter(p => p.status === 'draft').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 text-sm">○</span>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Featured</p>
                <p className="text-2xl font-bold text-purple-600">
                  {projects.filter(p => p.featured).length}
                </p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-sm">★</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Projects Table */}
        <Card className="p-6">
          <DataTable
            data={paginatedProjects}
            columns={columns}
            loading={loading}
            searchable={false}
            pagination={{
              page: pagination.page,
              limit: pagination.limit,
              total: filteredProjects.length,
              onPageChange: (page) => setPagination(prev => ({ ...prev, page })),
              onLimitChange: (limit) => setPagination(prev => ({ ...prev, limit, page: 1 }))
            }}
            sorting={{
              sortBy: pagination.sortBy as keyof Project,
              sortOrder: pagination.sortOrder,
              onSort: (sortBy, sortOrder) => setPagination(prev => ({ ...prev, sortBy, sortOrder }))
            }}
            actions={{
              view: handleViewProject,
              edit: handleEditProject,
              delete: handleDeleteProject,
              duplicate: handleDuplicateProject,
              preview: handleViewProject
            }}
          />
        </Card>
      </div>
    </ResearchHubLayout>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  return (
    <Badge className={cn(getStatusColor(status))}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
