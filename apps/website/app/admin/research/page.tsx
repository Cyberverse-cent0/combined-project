"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
  Users
} from "lucide-react";

interface ResearchItem {
  id: string;
  title: string;
  description: string;
  type: 'project' | 'publication' | 'presentation' | 'collaboration';
  status: 'published' | 'draft';
  date: string;
  authors: string[];
  tags: string[];
  url?: string;
  pdfUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ResearchManagementPage() {
  const router = useRouter();
  const [research, setResearch] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<ResearchItem | null>(null);

  // Check authentication
  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (!session) {
      router.push('/admin-signup');
      return;
    }
  }, [router]);

  // Load research data
  useEffect(() => {
    loadResearchData();
  }, []);

  const loadResearchData = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockResearch: ResearchItem[] = [
        {
          id: '1',
          title: 'Afrocentric Psychology and Cultural Healing Frameworks',
          description: 'A comprehensive study on Afrocentric psychology approaches to mental health and cultural healing practices in African communities.',
          type: 'publication',
          status: 'published',
          date: '2024-01-15',
          authors: ['Dr. Stephen Asatsa', 'Dr. Jane Smith'],
          tags: ['afrocentric', 'psychology', 'cultural healing', 'mental health'],
          url: 'https://example.com/publication1',
          pdfUrl: '/assets/research/afrocentric-psychology.pdf',
          createdAt: '2024-01-10T10:00:00Z',
          updatedAt: '2024-01-15T14:30:00Z'
        },
        {
          id: '2',
          title: 'Community-Based Mental Health Interventions',
          description: 'Research on community-based approaches to mental health interventions in underserved populations.',
          type: 'project',
          status: 'published',
          date: '2024-01-20',
          authors: ['Dr. Stephen Asatsa', 'Dr. Michael Johnson'],
          tags: ['community health', 'mental health', 'interventions', 'underserved populations'],
          createdAt: '2024-01-05T09:00:00Z',
          updatedAt: '2024-01-20T11:15:00Z'
        },
        {
          id: '3',
          title: 'Traditional Healing Practices in Modern Psychology',
          description: 'Exploring the integration of traditional African healing practices with modern psychological approaches.',
          type: 'presentation',
          status: 'draft',
          date: '2024-02-01',
          authors: ['Dr. Stephen Asatsa'],
          tags: ['traditional healing', 'modern psychology', 'integration', 'cultural practices'],
          createdAt: '2024-01-12T13:45:00Z',
          updatedAt: '2024-01-25T16:20:00Z'
        },
        {
          id: '4',
          title: 'Cross-Cultural Psychology Research Collaboration',
          description: 'International collaboration on cross-cultural psychology research with focus on African diaspora communities.',
          type: 'collaboration',
          status: 'published',
          date: '2024-01-25',
          authors: ['Dr. Stephen Asatsa', 'Prof. Maria Garcia', 'Dr. James Wilson'],
          tags: ['cross-cultural', 'collaboration', 'african diaspora', 'international'],
          createdAt: '2024-01-08T11:30:00Z',
          updatedAt: '2024-01-25T10:45:00Z'
        }
      ];

      setResearch(mockResearch);
    } catch (error) {
      console.error('Error loading research data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveResearch = async (item: ResearchItem) => {
    try {
      console.log('Saving research:', item);
      
      setResearch(prev => prev.map(researchItem => 
        researchItem.id === item.id 
          ? { ...item, updatedAt: new Date().toISOString() }
          : researchItem
      ));
      
      setSelectedItem(null);
    } catch (error) {
      console.error('Error saving research:', error);
    }
  };

  const createResearch = async (item: Partial<ResearchItem>) => {
    try {
      const newItem: ResearchItem = {
        id: Date.now().toString(),
        title: item.title || 'Untitled Research',
        description: item.description || '',
        type: item.type || 'project',
        status: item.status || 'draft',
        date: item.date || new Date().toISOString().split('T')[0],
        authors: item.authors || ['Dr. Stephen Asatsa'],
        tags: item.tags || [],
        url: item.url,
        pdfUrl: item.pdfUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setResearch(prev => [...prev, newItem]);
      setSelectedItem(null);
    } catch (error) {
      console.error('Error creating research:', error);
    }
  };

  const deleteResearch = async (id: string) => {
    try {
      console.log('Deleting research:', id);
      
      setResearch(prev => prev.filter(item => item.id !== id));
      setSelectedItem(null);
    } catch (error) {
      console.error('Error deleting research:', error);
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      project: 'bg-blue-100 text-blue-800',
      publication: 'bg-green-100 text-green-800',
      presentation: 'bg-purple-100 text-purple-800',
      collaboration: 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      project: Brain,
      publication: FileText,
      presentation: Users,
      collaboration: Award
    };
    return icons[type as keyof typeof icons] || FileText;
  };

  const filteredResearch = research.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading research data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/admin')}
                className="mr-4"
              >
                <X className="w-4 h-4" />
              </Button>
              <Brain className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-slate-900">Research Management</h1>
                <p className="text-sm text-slate-500">Manage your research projects and publications</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Research
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setSelectedItem({
                id: 'new',
                title: '',
                description: '',
                type: 'project',
                status: 'draft',
                date: new Date().toISOString().split('T')[0],
                authors: ['Dr. Stephen Asatsa'],
                tags: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              } as ResearchItem)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Research
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search research..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Types</option>
              <option value="project">Projects</option>
              <option value="publication">Publications</option>
              <option value="presentation">Presentations</option>
              <option value="collaboration">Collaborations</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </Card>

        {/* Research List */}
        <div className="space-y-4">
          {filteredResearch.map((item) => {
            const TypeIcon = getTypeIcon(item.type);
            return (
              <Card key={item.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <TypeIcon className="w-5 h-5 text-purple-600" />
                      <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                      <Badge className={getTypeColor(item.type)}>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </Badge>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <p className="text-slate-600 mb-3">{item.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.authors.map((author, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {author}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                      {item.url && (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
                          <ExternalLink className="w-3 h-3" />
                          View Online
                        </a>
                      )}
                      {item.pdfUrl && (
                        <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
                          <FileText className="w-3 h-3" />
                          PDF
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => setSelectedItem(item)}>
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => deleteResearch(item.id)} className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Edit Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  {selectedItem.id === 'new' ? 'Add Research' : 'Edit Research'}
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
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <Textarea
                    value={selectedItem.description}
                    onChange={(e) => setSelectedItem(prev => prev ? {...prev, description: e.target.value} : null)}
                    rows={4}
                    className="w-full"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                    <select
                      value={selectedItem.type}
                      onChange={(e) => setSelectedItem(prev => prev ? {...prev, type: e.target.value as any} : null)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="project">Project</option>
                      <option value="publication">Publication</option>
                      <option value="presentation">Presentation</option>
                      <option value="collaboration">Collaboration</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                    <select
                      value={selectedItem.status}
                      onChange={(e) => setSelectedItem(prev => prev ? {...prev, status: e.target.value as any} : null)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                    <Input
                      type="date"
                      value={selectedItem.date}
                      onChange={(e) => setSelectedItem(prev => prev ? {...prev, date: e.target.value} : null)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Authors (comma-separated)</label>
                    <Input
                      value={selectedItem.authors.join(', ')}
                      onChange={(e) => setSelectedItem(prev => prev ? {...prev, authors: e.target.value.split(',').map(a => a.trim())} : null)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">URL</label>
                    <Input
                      value={selectedItem.url || ''}
                      onChange={(e) => setSelectedItem(prev => prev ? {...prev, url: e.target.value} : null)}
                      className="w-full"
                      placeholder="https://example.com/research"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">PDF URL</label>
                    <Input
                      value={selectedItem.pdfUrl || ''}
                      onChange={(e) => setSelectedItem(prev => prev ? {...prev, pdfUrl: e.target.value} : null)}
                      className="w-full"
                      placeholder="/assets/research/document.pdf"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tags (comma-separated)</label>
                  <Input
                    value={selectedItem.tags.join(', ')}
                    onChange={(e) => setSelectedItem(prev => prev ? {...prev, tags: e.target.value.split(',').map(t => t.trim())} : null)}
                    className="w-full"
                    placeholder="psychology, research, afrocentric"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => selectedItem.id === 'new' ? createResearch(selectedItem) : saveResearch(selectedItem)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
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
      </main>
    </div>
  );
}
