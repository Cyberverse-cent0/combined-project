"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  FileText,
  Images,
  Users,
  BarChart3,
  Plus,
  Edit3,
  Trash2,
  Home,
  TrendingUp,
  Eye,
  Clock,
  CheckCircle,
  Activity,
  Database
} from "lucide-react";
import Link from "next/link";

interface ContentItem {
  id: string;
  title: string;
  type: 'page' | 'research' | 'service' | 'media';
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
  const [content, setContent] = useState<ContentItem[]>([]);
  const [stats, setStats] = useState<SystemStats>({
    totalContent: 0,
    totalMedia: 0,
    publishedPages: 0,
    draftPages: 0,
    totalViews: 0,
    lastUpdate: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load dashboard data
    const mockContent: ContentItem[] = [
      {
        id: '1',
        title: 'Home Page',
        type: 'page',
        status: 'published',
        updatedAt: '2024-01-15',
        views: 1234
      },
      {
        id: '2',
        title: 'Research Hub',
        type: 'research',
        status: 'published',
        updatedAt: '2024-01-14',
        views: 892
      },
      {
        id: '3',
        title: 'Services',
        type: 'service',
        status: 'draft',
        updatedAt: '2024-01-13',
        views: 456
      }
    ];

    const mockStats: SystemStats = {
      totalContent: 15,
      totalMedia: 234,
      publishedPages: 12,
      draftPages: 3,
      totalViews: 5678,
      lastUpdate: '2024-01-15'
    };

    setContent(mockContent);
    setStats(mockStats);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600">Welcome back! Here's what's happening with your site.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Content</p>
              <p className="text-2xl font-bold text-slate-900">{stats.totalContent}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+12% from last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Media Files</p>
              <p className="text-2xl font-bold text-slate-900">{stats.totalMedia}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Images className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+8% from last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Published Pages</p>
              <p className="text-2xl font-bold text-slate-900">{stats.publishedPages}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-slate-600">
            <span>{stats.draftPages} drafts pending</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Views</p>
              <p className="text-2xl font-bold text-slate-900">{stats.totalViews.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+23% from last month</span>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <Plus className="w-6 h-6" />
              <span className="text-sm">New Page</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <Images className="w-6 h-6" />
              <span className="text-sm">Upload Media</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <Users className="w-6 h-6" />
              <span className="text-sm">Add User</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <BarChart3 className="w-6 h-6" />
              <span className="text-sm">View Analytics</span>
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Content</h2>
          <div className="space-y-3">
            {content.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    item.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <div>
                    <p className="font-medium text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600">{item.views} views</p>
                  <p className="text-xs text-slate-500">{item.updatedAt}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
