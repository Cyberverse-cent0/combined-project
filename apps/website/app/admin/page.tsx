"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/admin/admin-layout";
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
  AlertCircle,
  Activity,
  Target,
  Zap,
  ShieldCheck,
  Globe,
  Star,
  FolderOpen,
  Upload,
  Download,
  RefreshCw,
  Bell,
  User,
  LogOut
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
  activeUsers: number;
  bounceRate: number;
  avgSessionDuration: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [recentContent, setRecentContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

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
        lastUpdate: new Date().toISOString(),
        activeUsers: 127,
        bounceRate: 32.5,
        avgSessionDuration: "4:32"
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
    <AdminLayout 
      user={{
        username: 'admin',
        displayName: 'Website Administrator',
        role: 'super_admin'
      }}
    >
      <div className="space-y-6">
        {/* Enhanced Dashboard Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-blue-100">Manage your website with confidence</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Site
              </Button>
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                <Plus className="w-4 h-4 mr-2" />
                Quick Add
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">Total Content</p>
                <p className="text-3xl font-bold text-blue-900">{stats?.totalContent}</p>
                <p className="text-xs text-blue-600 mt-1">+12% from last month</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600 mb-1">Media Files</p>
                <p className="text-3xl font-bold text-emerald-900">{stats?.totalMedia}</p>
                <p className="text-xs text-emerald-600 mt-1">156 images, videos</p>
              </div>
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Images className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 mb-1">Published</p>
                <p className="text-3xl font-bold text-purple-900">{stats?.publishedPages}</p>
                <p className="text-xs text-purple-600 mt-1">{stats?.draftPages} drafts</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 mb-1">Total Views</p>
                <p className="text-3xl font-bold text-orange-900">{stats?.totalViews.toLocaleString()}</p>
                <p className="text-xs text-orange-600 mt-1">{stats?.activeUsers} active now</p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Enhanced Quick Actions */}
        <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              onClick={() => setActiveSection('content')}
              className="h-20 flex-col items-center justify-center bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.05]"
            >
              <FileText className="w-6 h-6 mb-2" />
              <span>Manage Content</span>
            </Button>

            <Button 
              onClick={() => setActiveSection('media')}
              className="h-20 flex-col items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.05]"
            >
              <Images className="w-6 h-6 mb-2" />
              <span>Media Library</span>
            </Button>

            <Button 
              onClick={() => setActiveSection('analytics')}
              className="h-20 flex-col items-center justify-center bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.05]"
            >
              <BarChart3 className="w-6 h-6 mb-2" />
              <span>Analytics</span>
            </Button>

            <Button 
              onClick={() => setActiveSection('settings')}
              className="h-20 flex-col items-center justify-center bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.05]"
            >
              <Settings className="w-6 h-6 mb-2" />
              <span>Settings</span>
            </Button>
          </div>
        </Card>

        {/* Enhanced Recent Content */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Recent Content
            </h2>
            <Button variant="outline" onClick={() => setActiveSection('content')}>
              View All
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Title</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Views</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Last Updated</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentContent.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-900">{item.title}</div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getTypeColor(item.type)}>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {item.views?.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {new Date(item.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
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
        </Card>
      </div>
    </AdminLayout>
  );
}
