"use client";

import { useState, useEffect } from "react";
import { ResearchHubLayout } from "@/components/admin/research-hub/layout/research-hub-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Users,
  Calendar,
  HeartHandshake,
  Trophy,
  Images,
  FileText,
  BarChart3,
  TrendingUp,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  Plus,
  ExternalLink,
  Home,
  Target,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardStats {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
  totalTeamMembers: number;
  totalActivities: number;
  totalAwards: number;
  totalGrants: number;
  totalMedia: number;
  recentActivity: Array<{
    id: string;
    action: string;
    entity: string;
    title: string;
    timestamp: string;
  }>;
  quickStats: Array<{
    label: string;
    value: number;
    change: number;
    changeType: 'increase' | 'decrease';
  }>;
}

export default function ResearchHubDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Mock data - replace with actual API calls
      const mockStats: DashboardStats = {
        totalProjects: 12,
        publishedProjects: 8,
        draftProjects: 4,
        totalTeamMembers: 15,
        totalActivities: 24,
        totalAwards: 17,
        totalGrants: 8,
        totalMedia: 156,
        recentActivity: [
          {
            id: '1',
            action: 'created',
            entity: 'project',
            title: 'Traditional Luhya Mourning Rituals',
            timestamp: '2024-01-15T10:30:00Z'
          },
          {
            id: '2',
            action: 'updated',
            entity: 'team',
            title: 'Dr. Stephen Asatsa Profile',
            timestamp: '2024-01-14T15:45:00Z'
          },
          {
            id: '3',
            action: 'published',
            entity: 'activity',
            title: 'Conference Presentation - Berlin',
            timestamp: '2024-01-13T09:20:00Z'
          },
          {
            id: '4',
            action: 'created',
            entity: 'award',
            title: 'Durham University Research Award',
            timestamp: '2024-01-12T14:15:00Z'
          }
        ],
        quickStats: [
          {
            label: 'Projects',
            value: 12,
            change: 2,
            changeType: 'increase'
          },
          {
            label: 'Team Members',
            value: 15,
            change: 1,
            changeType: 'increase'
          },
          {
            label: 'Activities',
            value: 24,
            change: 5,
            changeType: 'increase'
          },
          {
            label: 'Awards',
            value: 17,
            change: 0,
            changeType: 'increase'
          }
        ]
      };

      setStats(mockStats);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const getActionColor = (action: string) => {
    const colors = {
      created: 'bg-green-100 text-green-800 border-green-200',
      updated: 'bg-blue-100 text-blue-800 border-blue-200',
      published: 'bg-purple-100 text-purple-800 border-purple-200',
      deleted: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[action as keyof typeof colors] || colors.created;
  };

  const getEntityIcon = (entity: string) => {
    const icons = {
      project: Brain,
      team: Users,
      activity: Calendar,
      award: Trophy,
      media: Images,
      publication: FileText
    };
    return icons[entity as keyof typeof icons] || FileText;
  };

  if (loading) {
    return (
      <ResearchHubLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[#0F766E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </ResearchHubLayout>
    );
  }

  return (
    <ResearchHubLayout title="Dashboard">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Research Hub Dashboard</h1>
            <p className="text-gray-600">Manage your research lab with confidence</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <a href="/research-hub" target="_blank">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Site
              </a>
            </Button>
            <Button className="bg-[#0F766E] hover:bg-[#0F766E]/90" asChild>
              <a href="/admin/research-hub/projects/new">
                <Plus className="w-4 h-4 mr-2" />
                Quick Add
              </a>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600 mb-1">Total Projects</p>
                <p className="text-2xl font-bold text-emerald-900">{stats?.totalProjects}</p>
                <p className="text-xs text-emerald-600 mt-1">
                  {stats?.publishedProjects} published • {stats?.draftProjects} drafts
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">Team Members</p>
                <p className="text-2xl font-bold text-blue-900">{stats?.totalTeamMembers}</p>
                <p className="text-xs text-blue-600 mt-1">Active researchers</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 mb-1">Activities</p>
                <p className="text-2xl font-bold text-purple-900">{stats?.totalActivities}</p>
                <p className="text-xs text-purple-600 mt-1">Events & publications</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 mb-1">Awards & Grants</p>
                <p className="text-2xl font-bold text-orange-900">
                  {(stats?.totalAwards || 0) + (stats?.totalGrants || 0)}
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  {stats?.totalAwards} awards • {stats?.totalGrants} grants
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#0F766E]" />
              Quick Actions
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col gap-2 hover:bg-emerald-50 hover:border-emerald-200"
              asChild
            >
              <a href="/admin/research-hub/projects">
                <Brain className="w-6 h-6 text-emerald-600" />
                <span className="text-sm">Projects</span>
              </a>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col gap-2 hover:bg-blue-50 hover:border-blue-200"
              asChild
            >
              <a href="/admin/research-hub/team">
                <Users className="w-6 h-6 text-blue-600" />
                <span className="text-sm">Team</span>
              </a>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col gap-2 hover:bg-purple-50 hover:border-purple-200"
              asChild
            >
              <a href="/admin/research-hub/activities">
                <Calendar className="w-6 h-6 text-purple-600" />
                <span className="text-sm">Activities</span>
              </a>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col gap-2 hover:bg-orange-50 hover:border-orange-200"
              asChild
            >
              <a href="/admin/research-hub/media">
                <Images className="w-6 h-6 text-orange-600" />
                <span className="text-sm">Media</span>
              </a>
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Recent Activity
              </h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {stats?.recentActivity.map((activity) => {
                const Icon = getEntityIcon(activity.entity);
                return (
                  <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Badge className={getActionColor(activity.action)} variant="outline">
                          {activity.action}
                        </Badge>
                        <span>•</span>
                        <span>{getRelativeTime(activity.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-500" />
                Quick Stats
              </h2>
            </div>
            <div className="space-y-4">
              {stats?.quickStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{stat.label}</p>
                    <p className="text-xs text-gray-500">Last 30 days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                    <div className={cn(
                      "flex items-center gap-1 text-xs",
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    )}>
                      {stat.changeType === 'increase' ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingUp className="w-3 h-3 rotate-180" />
                      )}
                      <span>{stat.change > 0 ? '+' : ''}{stat.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </ResearchHubLayout>
  );
}
