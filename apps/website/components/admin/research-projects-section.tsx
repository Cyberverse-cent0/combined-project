"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Plus,
  Search,
  Edit3,
  Eye,
  Trash2,
  Calendar,
  Tag,
  Save,
  X,
  ExternalLink,
  FileText,
  Award,
  Users,
  DollarSign,
  Clock,
  Target,
  Filter,
  Grid,
  List,
  Upload,
  Download,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Star,
  GitBranch,
  User,
  MapPin,
  Globe
} from "lucide-react";

interface ResearchProject {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  status: 'active' | 'completed' | 'collaborative' | 'planning';
  keyComponents: string[];
  funding: number;
  fundingStatus: 'funded' | 'seeking' | 'completed';
  duration: string;
  teamSize: number;
  topicTags: string[];
  coverImage?: string;
  attachments: string[];
  startDate: string;
  endDate?: string;
  progress: number;
  collaborators: string[];
  createdAt: string;
  updatedAt: string;
  views?: number;
  featured?: boolean;
}

interface ResearchProjectsSectionProps {
  onNavigate?: (section: string) => void;
}

export function ResearchProjectsSection({ onNavigate }: ResearchProjectsSectionProps) {
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedFunding, setSelectedFunding] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProject, setSelectedProject] = useState<ResearchProject | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Load research projects data
  useEffect(() => {
    loadResearchProjects();
  }, []);

  const loadResearchProjects = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockProjects: ResearchProject[] = [
        {
          id: '1',
          title: 'Luhya Mourning Rituals: A Psychological Perspective',
          shortDescription: 'Exploring traditional mourning practices and their psychological impact on community wellbeing.',
          fullDescription: 'This comprehensive study examines the intricate mourning rituals of the Luhya community, focusing on their psychological significance, therapeutic benefits, and role in community healing. The research combines ethnographic methods with psychological assessment tools to understand how these traditional practices contribute to mental health resilience and social cohesion.',
          status: 'active',
          keyComponents: [
            'Ethnographic fieldwork in Western Kenya',
            'Psychological assessment of mourning participants',
            'Comparative analysis with Western grief models',
            'Community-based intervention development'
          ],
          funding: 45000,
          fundingStatus: 'funded',
          duration: '24 months',
          teamSize: 5,
          topicTags: ['indigenous psychology', 'cultural healing', 'community health', 'grief counseling'],
          coverImage: '/assets/research/luhya-mourning.jpg',
          attachments: ['/assets/research/luhya-proposal.pdf', '/assets/research/ethnography-guide.pdf'],
          startDate: '2024-01-15',
          endDate: '2026-01-15',
          progress: 35,
          collaborators: ['Dr. Jane Smith', 'Prof. Michael Johnson', 'Dr. Sarah Williams'],
          createdAt: '2024-01-10T10:00:00Z',
          updatedAt: '2024-01-20T14:30:00Z',
          views: 1250,
          featured: true
        },
        {
          id: '2',
          title: 'Youth Mental Health in Urban Kenya',
          shortDescription: 'Assessing mental health challenges and developing interventions for urban youth populations.',
          fullDescription: 'This project addresses the growing mental health concerns among urban youth in Kenya, focusing on depression, anxiety, and substance abuse. Through mixed-methods research, we aim to identify risk factors, protective factors, and develop culturally appropriate interventions.',
          status: 'active',
          keyComponents: [
            'Survey research in Nairobi schools',
            'Focus groups with youth participants',
            'Development of school-based interventions',
            'Training programs for teachers and counselors'
          ],
          funding: 28000,
          fundingStatus: 'seeking',
          duration: '18 months',
          teamSize: 4,
          topicTags: ['youth development', 'mental health', 'urban psychology', 'intervention'],
          coverImage: '/assets/research/youth-mental-health.jpg',
          attachments: ['/assets/research/youth-proposal.pdf'],
          startDate: '2024-03-01',
          endDate: '2025-09-01',
          progress: 15,
          collaborators: ['Dr. Alice Kimani', 'Dr. Robert Ochieng'],
          createdAt: '2024-02-15T09:00:00Z',
          updatedAt: '2024-02-28T16:20:00Z',
          views: 890
        },
        {
          id: '3',
          title: 'Indigenous Knowledge Systems in Psychology',
          shortDescription: 'Documenting and validating traditional healing practices for integration into modern psychology.',
          fullDescription: 'This research project aims to systematically document indigenous knowledge systems related to mental health and healing across various Kenyan communities. The goal is to identify practices that can be scientifically validated and integrated into mainstream psychological services.',
          status: 'completed',
          keyComponents: [
            'Community interviews with traditional healers',
            'Documentation of healing practices',
            'Scientific validation of key interventions',
            'Development of integrated treatment models'
          ],
          funding: 35000,
          fundingStatus: 'completed',
          duration: '12 months',
          teamSize: 3,
          topicTags: ['indigenous knowledge', 'traditional healing', 'integration', 'validation'],
          coverImage: '/assets/research/indigenous-knowledge.jpg',
          attachments: ['/assets/research/final-report.pdf', '/assets/research/healing-practices.pdf'],
          startDate: '2023-06-01',
          endDate: '2024-06-01',
          progress: 100,
          collaborators: ['Dr. Joseph Mwangi', 'Dr. Grace Ouma'],
          createdAt: '2023-05-15T11:30:00Z',
          updatedAt: '2024-06-30T10:45:00Z',
          views: 2100,
          featured: true
        }
      ];

      setProjects(mockProjects);
    } catch (error) {
      console.error('Error loading research projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProject = async (project: ResearchProject) => {
    try {
      console.log('Saving project:', project);
      
      setProjects(prev => prev.map(p => 
        p.id === project.id 
          ? { ...project, updatedAt: new Date().toISOString() }
          : p
      ));
      
      setSelectedProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const createProject = async (projectData: Partial<ResearchProject>) => {
    try {
      const newProject: ResearchProject = {
        id: Date.now().toString(),
        title: projectData.title || 'Untitled Project',
        shortDescription: projectData.shortDescription || '',
        fullDescription: projectData.fullDescription || '',
        status: projectData.status || 'planning',
        keyComponents: projectData.keyComponents || [],
        funding: projectData.funding || 0,
        fundingStatus: projectData.fundingStatus || 'seeking',
        duration: projectData.duration || '12 months',
        teamSize: projectData.teamSize || 1,
        topicTags: projectData.topicTags || [],
        coverImage: projectData.coverImage,
        attachments: projectData.attachments || [],
        startDate: projectData.startDate || new Date().toISOString().split('T')[0],
        endDate: projectData.endDate,
        progress: 0,
        collaborators: projectData.collaborators || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        featured: false
      };

      setProjects(prev => [...prev, newProject]);
      setSelectedProject(null);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      console.log('Deleting project:', id);
      setProjects(prev => prev.filter(p => p.id !== id));
      setSelectedProject(null);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800 border-green-200',
      completed: 'bg-blue-100 text-blue-800 border-blue-200',
      collaborative: 'bg-purple-100 text-purple-800 border-purple-200',
      planning: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getFundingColor = (status: string) => {
    const colors = {
      funded: 'bg-emerald-100 text-emerald-800',
      seeking: 'bg-orange-100 text-orange-800',
      completed: 'bg-slate-100 text-slate-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.topicTags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    const matchesTopic = selectedTopic === 'all' || project.topicTags.includes(selectedTopic);
    const matchesFunding = selectedFunding === 'all' || project.fundingStatus === selectedFunding;
    
    return matchesSearch && matchesStatus && matchesTopic && matchesFunding;
  });

  const allTopics = Array.from(new Set(projects.flatMap(p => p.topicTags)));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading research projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-600" />
            Research Projects
          </h1>
          <p className="text-slate-600 mt-1">Manage your research portfolio and track progress</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Public
          </Button>
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => setSelectedProject({
              id: 'new',
              title: '',
              shortDescription: '',
              fullDescription: '',
              status: 'planning',
              keyComponents: [],
              funding: 0,
              fundingStatus: 'seeking',
              duration: '12 months',
              teamSize: 1,
              topicTags: [],
              attachments: [],
              startDate: new Date().toISOString().split('T')[0],
              progress: 0,
              collaborators: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            } as ResearchProject)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Active Projects</p>
              <p className="text-2xl font-bold text-slate-900">{projects.filter(p => p.status === 'active').length}</p>
            </div>
            <Target className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Funding</p>
              <p className="text-2xl font-bold text-slate-900">${(projects.reduce((sum, p) => sum + p.funding, 0) / 1000).toFixed(0)}k</p>
            </div>
            <DollarSign className="w-8 h-8 text-emerald-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Team Members</p>
              <p className="text-2xl font-bold text-slate-900">{projects.reduce((sum, p) => sum + p.teamSize, 0)}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Completed</p>
              <p className="text-2xl font-bold text-slate-900">{projects.filter(p => p.status === 'completed').length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="collaborative">Collaborative</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                {allTopics.map(topic => (
                  <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedFunding} onValueChange={setSelectedFunding}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Funding" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Funding</SelectItem>
                <SelectItem value="funded">Funded</SelectItem>
                <SelectItem value="seeking">Seeking</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Projects Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {project.coverImage && (
                <div className="h-48 bg-gradient-to-br from-purple-100 to-blue-100 relative">
                  <img 
                    src={project.coverImage} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  {project.featured && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-yellow-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>
              )}
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-slate-900 line-clamp-2">{project.title}</h3>
                  <div className="flex gap-1 ml-2">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedProject(project)}>
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteProject(project.id)} className="text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{project.shortDescription}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className={getStatusColor(project.status)} variant="outline">
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>
                  <Badge className={getFundingColor(project.fundingStatus)} variant="outline">
                    {project.fundingStatus.charAt(0).toUpperCase() + project.fundingStatus.slice(1)}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm text-slate-600 mb-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>${project.funding.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{project.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{project.teamSize} team members</span>
                  </div>
                </div>
                
                {project.status === 'active' && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-1">
                  {project.topicTags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                  {project.topicTags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.topicTags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-slate-900">{project.title}</h3>
                    {project.featured && (
                      <Badge className="bg-yellow-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    <Badge className={getStatusColor(project.status)} variant="outline">
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </Badge>
                    <Badge className={getFundingColor(project.fundingStatus)} variant="outline">
                      {project.fundingStatus.charAt(0).toUpperCase() + project.fundingStatus.slice(1)}
                    </Badge>
                  </div>
                  
                  <p className="text-slate-600 mb-3">{project.shortDescription}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      ${project.funding.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {project.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {project.teamSize} members
                    </span>
                    {project.views && (
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {project.views.toLocaleString()} views
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.topicTags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm" onClick={() => setShowPreview(true)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setSelectedProject(project)}>
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deleteProject(project.id)} className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                {selectedProject.id === 'new' ? 'Create New Project' : 'Edit Project'}
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowPreview(true)}>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" onClick={() => setSelectedProject(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="details">Project Details</TabsTrigger>
                  <TabsTrigger value="team">Team & Funding</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4">
                  <div>
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                      id="title"
                      value={selectedProject.title}
                      onChange={(e) => setSelectedProject(prev => prev ? {...prev, title: e.target.value} : null)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="shortDescription">Short Description</Label>
                    <Textarea
                      id="shortDescription"
                      value={selectedProject.shortDescription}
                      onChange={(e) => setSelectedProject(prev => prev ? {...prev, shortDescription: e.target.value} : null)}
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="fullDescription">Full Description</Label>
                    <Textarea
                      id="fullDescription"
                      value={selectedProject.fullDescription}
                      onChange={(e) => setSelectedProject(prev => prev ? {...prev, fullDescription: e.target.value} : null)}
                      rows={6}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={selectedProject.status} onValueChange={(value) => setSelectedProject(prev => prev ? {...prev, status: value as any} : null)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="planning">Planning</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="collaborative">Collaborative</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="fundingStatus">Funding Status</Label>
                      <Select value={selectedProject.fundingStatus} onValueChange={(value) => setSelectedProject(prev => prev ? {...prev, fundingStatus: value as any} : null)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="seeking">Seeking Funding</SelectItem>
                          <SelectItem value="funded">Funded</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="space-y-4">
                  <div>
                    <Label>Key Components</Label>
                    <div className="mt-2 space-y-2">
                      {selectedProject.keyComponents.map((component, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={component}
                            onChange={(e) => {
                              const newComponents = [...selectedProject.keyComponents];
                              newComponents[index] = e.target.value;
                              setSelectedProject(prev => prev ? {...prev, keyComponents: newComponents} : null);
                            }}
                          />
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              const newComponents = selectedProject.keyComponents.filter((_, i) => i !== index);
                              setSelectedProject(prev => prev ? {...prev, keyComponents: newComponents} : null);
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedProject(prev => prev ? {...prev, keyComponents: [...prev.keyComponents, '']} : null)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Component
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        value={selectedProject.duration}
                        onChange={(e) => setSelectedProject(prev => prev ? {...prev, duration: e.target.value} : null)}
                        className="mt-1"
                        placeholder="e.g., 12 months"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="teamSize">Team Size</Label>
                      <Input
                        id="teamSize"
                        type="number"
                        value={selectedProject.teamSize}
                        onChange={(e) => setSelectedProject(prev => prev ? {...prev, teamSize: parseInt(e.target.value)} : null)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Topic Tags</Label>
                    <div className="mt-2 space-y-2">
                      {selectedProject.topicTags.map((tag, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={tag}
                            onChange={(e) => {
                              const newTags = [...selectedProject.topicTags];
                              newTags[index] = e.target.value;
                              setSelectedProject(prev => prev ? {...prev, topicTags: newTags} : null);
                            }}
                          />
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              const newTags = selectedProject.topicTags.filter((_, i) => i !== index);
                              setSelectedProject(prev => prev ? {...prev, topicTags: newTags} : null);
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedProject(prev => prev ? {...prev, topicTags: [...prev.topicTags, '']} : null)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Tag
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="team" className="space-y-4">
                  <div>
                    <Label htmlFor="funding">Funding Amount ($)</Label>
                    <Input
                      id="funding"
                      type="number"
                      value={selectedProject.funding}
                      onChange={(e) => setSelectedProject(prev => prev ? {...prev, funding: parseInt(e.target.value)} : null)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label>Collaborators</Label>
                    <div className="mt-2 space-y-2">
                      {selectedProject.collaborators.map((collaborator, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={collaborator}
                            onChange={(e) => {
                              const newCollaborators = [...selectedProject.collaborators];
                              newCollaborators[index] = e.target.value;
                              setSelectedProject(prev => prev ? {...prev, collaborators: newCollaborators} : null);
                            }}
                          />
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              const newCollaborators = selectedProject.collaborators.filter((_, i) => i !== index);
                              setSelectedProject(prev => prev ? {...prev, collaborators: newCollaborators} : null);
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedProject(prev => prev ? {...prev, collaborators: [...prev.collaborators, '']} : null)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Collaborator
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={selectedProject.startDate}
                        onChange={(e) => setSelectedProject(prev => prev ? {...prev, startDate: e.target.value} : null)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="endDate">End Date (Optional)</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={selectedProject.endDate || ''}
                        onChange={(e) => setSelectedProject(prev => prev ? {...prev, endDate: e.target.value} : null)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="media" className="space-y-4">
                  <div>
                    <Label htmlFor="coverImage">Cover Image URL</Label>
                    <Input
                      id="coverImage"
                      value={selectedProject.coverImage || ''}
                      onChange={(e) => setSelectedProject(prev => prev ? {...prev, coverImage: e.target.value} : null)}
                      className="mt-1"
                      placeholder="/assets/projects/cover-image.jpg"
                    />
                  </div>
                  
                  <div>
                    <Label>Attachments</Label>
                    <div className="mt-2 space-y-2">
                      {selectedProject.attachments.map((attachment, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={attachment}
                            onChange={(e) => {
                              const newAttachments = [...selectedProject.attachments];
                              newAttachments[index] = e.target.value;
                              setSelectedProject(prev => prev ? {...prev, attachments: newAttachments} : null);
                            }}
                          />
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              const newAttachments = selectedProject.attachments.filter((_, i) => i !== index);
                              setSelectedProject(prev => prev ? {...prev, attachments: newAttachments} : null);
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedProject(prev => prev ? {...prev, attachments: [...prev.attachments, '']} : null)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Attachment
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex gap-3 mt-6 pt-6 border-t">
                <Button 
                  onClick={() => selectedProject.id === 'new' ? createProject(selectedProject) : saveProject(selectedProject)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {selectedProject.id === 'new' ? 'Create Project' : 'Save Changes'}
                </Button>
                <Button variant="outline" onClick={() => setSelectedProject(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
