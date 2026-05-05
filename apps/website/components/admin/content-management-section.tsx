"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Edit3,
  Eye,
  Trash2,
  Calendar,
  Tag,
  Save,
  Upload,
  Download,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  MessageSquare,
  Share2,
  X,
  Home,
  ExternalLink,
  FolderOpen,
  Grid,
  List
} from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  content: string;
  type: 'page' | 'research' | 'testimonial' | 'service';
  status: 'draft' | 'published' | 'scheduled';
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  author: string;
  category?: string;
  views?: number;
}

interface ContentManagementSectionProps {
  onNavigate?: (section: string) => void;
}

export function ContentManagementSection({ onNavigate }: ContentManagementSectionProps) {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // Load content from database
  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration - replace with actual API call
      const mockContent: ContentItem[] = [
        {
          id: '1',
          title: 'About Dr. Stephen Asatsa',
          content: 'Professional psychology services and research expertise in Afrocentric psychology...',
          type: 'page',
          status: 'published',
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-20T15:30:00Z',
          publishedAt: '2024-01-15T10:00:00Z',
          tags: ['psychology', 'about', 'professional'],
          seoTitle: 'About Dr. Stephen Asatsa - Professional Psychology Services',
          seoDescription: 'Learn about Dr. Stephen Asatsa\'s expertise in psychology and research.',
          author: 'Admin',
          category: 'Pages',
          views: 8920
        },
        {
          id: '2',
          title: 'Research on Afrocentric Psychology',
          content: 'Comprehensive research on Afrocentric psychology and its applications...',
          type: 'research',
          status: 'published',
          createdAt: '2024-01-10T09:00:00Z',
          updatedAt: '2024-01-18T14:20:00Z',
          publishedAt: '2024-01-12T08:00:00Z',
          tags: ['research', 'afrocentric', 'psychology'],
          seoTitle: 'Afrocentric Psychology Research - Dr. Stephen Asatsa',
          seoDescription: 'Explore research on Afrocentric psychology and cultural healing frameworks.',
          author: 'Admin',
          category: 'Research',
          views: 3420
        },
        {
          id: '3',
          title: 'Professional Services Overview',
          content: 'Comprehensive psychology services including counseling, therapy, and consultation...',
          type: 'service',
          status: 'draft',
          createdAt: '2024-01-08T11:30:00Z',
          updatedAt: '2024-01-16T10:15:00Z',
          tags: ['services', 'therapy', 'counseling'],
          seoTitle: 'Professional Psychology Services - Dr. Stephen Asatsa',
          seoDescription: 'Professional psychology services including counseling and therapy.',
          author: 'Admin',
          category: 'Services',
          views: 2100
        },
        {
          id: '4',
          title: 'Client Testimonial - John Doe',
          content: 'Dr. Asatsa\'s expertise in Afrocentric psychology transformed my perspective...',
          type: 'testimonial',
          status: 'published',
          createdAt: '2024-01-05T13:45:00Z',
          updatedAt: '2024-01-14T16:30:00Z',
          publishedAt: '2024-01-06T09:00:00Z',
          tags: ['testimonial', 'client', 'feedback'],
          seoTitle: 'Client Testimonial - John Doe',
          seoDescription: 'Client testimonial about Dr. Stephen Asatsa\'s psychology services.',
          author: 'Admin',
          category: 'Testimonials',
          views: 1560
        }
      ];
      setContent(mockContent);
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleEdit = (item: ContentItem) => {
    setSelectedItem(item);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this content?')) {
      setContent(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleSave = () => {
    if (selectedItem) {
      // Save logic here
      console.log('Saving content:', selectedItem);
      setSelectedItem(null);
    }
  };

  const handleCreateNew = () => {
    setSelectedItem({
      id: 'new',
      title: '',
      content: '',
      type: 'page',
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [],
      author: 'Admin',
    });
  };

  const getTypeColor = (type: string) => {
    const colors = {
      page: 'bg-blue-100 text-blue-800',
      research: 'bg-purple-100 text-purple-800',
      testimonial: 'bg-yellow-100 text-yellow-800',
      service: 'bg-red-100 text-red-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      published: 'bg-green-100 text-green-800',
      scheduled: 'bg-yellow-100 text-yellow-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Content Management
          </h1>
          <p className="text-slate-600 mt-2">Manage all website content including pages, research, testimonials, and services</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => onNavigate?.('dashboard')}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <Button 
            onClick={() => onNavigate?.('home-edit')}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700"
          >
            <Edit3 className="w-4 h-4" />
            Edit Home Page
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateNew}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Content
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 h-10 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">All Types</option>
              <option value="page">Pages</option>
              <option value="research">Research</option>
              <option value="testimonial">Testimonials</option>
              <option value="service">Services</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 h-10 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>

            <div className="flex bg-white border border-slate-300 rounded-md">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('grid')}
                className={`rounded-r-none ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : ''}`}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('list')}
                className={`rounded-l-none ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : ''}`}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-white rounded-lg border border-slate-200">
            <p className="text-2xl font-bold text-blue-600">{content.length}</p>
            <p className="text-sm text-slate-600">Total Content</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-slate-200">
            <p className="text-2xl font-bold text-green-600">{content.filter(c => c.status === 'published').length}</p>
            <p className="text-sm text-slate-600">Published</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-slate-200">
            <p className="text-2xl font-bold text-yellow-600">{content.filter(c => c.status === 'draft').length}</p>
            <p className="text-sm text-slate-600">Drafts</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-slate-200">
            <p className="text-2xl font-bold text-purple-600">{content.reduce((sum, c) => sum + (c.views || 0), 0).toLocaleString()}</p>
            <p className="text-sm text-slate-600">Total Views</p>
          </div>
        </div>
      </Card>

      {/* Content Display */}
      {viewMode === 'list' ? (
        <div className="space-y-4">
          {filteredContent.map((item) => (
            <Card key={item.id} className="p-6 hover:shadow-lg transition-all duration-300 bg-white border-slate-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Badge className={getTypeColor(item.type)}>
                    {item.type}
                  </Badge>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                  {item.views && (
                    <Badge variant="outline" className="text-blue-600">
                      <Eye className="w-3 h-3 mr-1" />
                      {item.views.toLocaleString()}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Created: {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Updated: {new Date(item.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="text-sm text-slate-600">
                  {item.content.length > 150 ? `${item.content.substring(0, 150)}...` : item.content}
                </div>
                
                {item.seoTitle && (
                  <div className="mt-3 p-3 bg-slate-50 rounded text-xs">
                    <div className="font-medium text-slate-700">SEO Title: {item.seoTitle}</div>
                    {item.seoDescription && (
                      <div className="text-slate-600">SEO Description: {item.seoDescription}</div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredContent.map((item) => (
            <Card key={item.id} className="p-6 hover:shadow-lg transition-all duration-300 bg-white border-slate-200">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Badge className={getTypeColor(item.type)}>
                      {item.type}
                    </Badge>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                      <Edit3 className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-3">{item.content}</p>
                
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{item.tags.length - 3}
                    </Badge>
                  )}
                </div>
                
                <div className="text-xs text-slate-500">
                  Updated: {new Date(item.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {filteredContent.length === 0 && (
        <Card className="p-12 text-center bg-white border-slate-200">
          <FolderOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No content found</h3>
          <p className="text-slate-600">
            {searchTerm ? 'No content matches your search criteria.' : 'No content has been created yet.'}
          </p>
        </Card>
      )}

      {/* Edit/Create Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {selectedItem.id === 'new' ? 'Create Content' : 'Edit Content'}
              </h2>
              <Button variant="outline" onClick={() => setSelectedItem(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <Input
                  value={selectedItem.title}
                  onChange={(e) => setSelectedItem(prev => prev ? {...prev, title: e.target.value} : null)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
                <Textarea
                  value={selectedItem.content}
                  onChange={(e) => setSelectedItem(prev => prev ? {...prev, content: e.target.value} : null)}
                  rows={10}
                  className="w-full"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                  <select
                    value={selectedItem.type}
                    onChange={(e) => setSelectedItem(prev => prev ? {...prev, type: e.target.value as any} : null)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="page">Page</option>
                    <option value="research">Research</option>
                    <option value="testimonial">Testimonial</option>
                    <option value="service">Service</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                  <select
                    value={selectedItem.status}
                    onChange={(e) => setSelectedItem(prev => prev ? {...prev, status: e.target.value as any} : null)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tags (comma-separated)</label>
                <Input
                  value={selectedItem.tags.join(', ')}
                  onChange={(e) => setSelectedItem(prev => prev ? {...prev, tags: e.target.value.split(',').map(tag => tag.trim())} : null)}
                  placeholder="psychology, research, clinical"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">SEO Title</label>
                <Input
                  value={selectedItem.seoTitle || ''}
                  onChange={(e) => setSelectedItem(prev => prev ? {...prev, seoTitle: e.target.value} : null)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">SEO Description</label>
                <Textarea
                  value={selectedItem.seoDescription || ''}
                  onChange={(e) => setSelectedItem(prev => prev ? {...prev, seoDescription: e.target.value} : null)}
                  rows={3}
                  className="w-full"
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  {selectedItem.id === 'new' ? 'Create' : 'Save Changes'}
                </Button>
                <Button variant="outline" onClick={() => setSelectedItem(null)}>
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
