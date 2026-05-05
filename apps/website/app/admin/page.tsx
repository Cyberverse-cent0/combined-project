"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  FileText,
  Images,
  Users,
  BarChart3,
  Settings,
  Plus,
  Edit3,
  Trash2,
  Search,
  Home,
  Trophy,
  Brain,
  ExternalLink,
  Menu,
  X,
  TrendingUp,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  type: 'page' | 'research' | 'testimonial' | 'service';
  status: 'published' | 'draft';
  updatedAt: string;
  views?: number;
}

interface SystemStats {
  totalContent: number;
  totalMedia: number;
  publishedPages: number;
  draftPages: number;
  totalViews: number;
  lastUpdate: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [recentContent, setRecentContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check authentication
  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (!session) {
      router.push('/admin-signup');
      return;
    }
    try {
      const parsed = JSON.parse(session);
      const sessionAge = Date.now() - parsed.timestamp;
      if (sessionAge > 24 * 60 * 60 * 1000) {
        localStorage.removeItem('userSession');
        localStorage.removeItem('authToken');
        router.push('/admin-signup');
        return;
      }
    } catch {
      localStorage.removeItem('userSession');
      localStorage.removeItem('authToken');
      router.push('/admin-signup');
      return;
    }
  }, [router]);

  // Load dashboard data
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Mock data for now - replace with actual API calls
      const mockStats: SystemStats = {
        totalContent: 24,
        totalMedia: 156,
        publishedPages: 18,
        draftPages: 6,
        totalViews: 15420,
        lastUpdate: new Date().toISOString()
      };

      const mockRecentContent: ContentItem[] = [
        {
          id: '1',
          title: 'Home Page Hero Section',
          type: 'page',
          status: 'published',
          updatedAt: '2024-01-15T10:30:00Z',
          views: 8920
        },
        {
          id: '2',
          title: 'Research on Afrocentric Psychology',
          type: 'research',
          status: 'published',
          updatedAt: '2024-01-14T15:45:00Z',
          views: 3420
        },
        {
          id: '3',
          title: 'Professional Services Overview',
          type: 'service',
          status: 'draft',
          updatedAt: '2024-01-13T09:20:00Z',
          views: 2100
        },
        {
          id: '4',
          title: 'Client Testimonial - John Doe',
          type: 'testimonial',
          status: 'published',
          updatedAt: '2024-01-12T14:15:00Z',
          views: 1560
        }
      ];

      setStats(mockStats);
      setRecentContent(mockRecentContent);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
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
      published: 'bg-green-100 text-green-800',
      draft: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
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
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="ml-4 flex items-center">
                <LayoutDashboard className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
                  <p className="text-sm text-slate-500">Manage your website content</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Site
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Content</p>
                <p className="text-2xl font-bold text-slate-900">{stats?.totalContent}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Images className="w-8 h-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Media Files</p>
                <p className="text-2xl font-bold text-slate-900">{stats?.totalMedia}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Published</p>
                <p className="text-2xl font-bold text-slate-900">{stats?.publishedPages}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Views</p>
                <p className="text-2xl font-bold text-slate-900">{stats?.totalViews.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              onClick={() => router.push('/admin/content')}
              className="h-20 flex-col items-center justify-center bg-blue-600 hover:bg-blue-700"
            >
              <FileText className="w-6 h-6 mb-2" />
              <span>Manage Content</span>
            </Button>

            <Button 
              onClick={() => router.push('/admin/media')}
              className="h-20 flex-col items-center justify-center bg-green-600 hover:bg-green-700"
            >
              <Images className="w-6 h-6 mb-2" />
              <span>Media Library</span>
            </Button>

            <Button 
              onClick={() => router.push('/admin/analytics')}
              className="h-20 flex-col items-center justify-center bg-purple-600 hover:bg-purple-700"
            >
              <BarChart3 className="w-6 h-6 mb-2" />
              <span>Analytics</span>
            </Button>

            <Button 
              onClick={() => router.push('/admin/content/home')}
              className="h-20 flex-col items-center justify-center bg-orange-600 hover:bg-orange-700"
            >
              <Home className="w-6 h-6 mb-2" />
              <span>Edit Home</span>
            </Button>
          </div>
        </div>

        {/* Recent Content */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Recent Content</h2>
            <Button variant="outline" size="sm" onClick={() => router.push('/admin/content')}>
              View All
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {recentContent.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{item.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getTypeColor(item.type)}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getStatusColor(item.status)}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {item.views?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
