"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Clock,
  Calendar,
  Download,
  RefreshCw,
  Filter,
  Search,
  Home,
  FileText,
  Activity,
  Target,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Star,
  MessageSquare,
  Share2,
  Heart,
  Bookmark,
  Zap,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";

interface AnalyticsData {
  totalVisitors: number;
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: string;
  topPages: Array<{
    title: string;
    views: number;
    change: number;
  }>;
  trafficSources: Array<{
    source: string;
    visitors: number;
    percentage: number;
  }>;
  deviceStats: Array<{
    device: string;
    visitors: number;
    percentage: number;
  }>;
  monthlyViews: Array<{
    month: string;
    views: number;
  }>;
}

interface AnalyticsSectionProps {
  onNavigate?: (section: string) => void;
}

export function AnalyticsSection({ onNavigate }: AnalyticsSectionProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadAnalytics();
  }, [selectedPeriod]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      // Mock analytics data - replace with actual API call
      const mockAnalytics: AnalyticsData = {
        totalVisitors: 15420,
        pageViews: 45680,
        uniqueVisitors: 8234,
        bounceRate: 32.5,
        avgSessionDuration: "4:32",
        topPages: [
          { title: "Home", views: 8920, change: 12.5 },
          { title: "Research", views: 3420, change: -5.2 },
          { title: "About", views: 2100, change: 8.7 },
          { title: "Services", views: 1560, change: 15.3 },
          { title: "Contact", views: 980, change: -2.1 }
        ],
        trafficSources: [
          { source: "Direct", visitors: 5678, percentage: 36.8 },
          { source: "Organic Search", visitors: 4567, percentage: 29.6 },
          { source: "Social Media", visitors: 2345, percentage: 15.2 },
          { source: "Referral", visitors: 1890, percentage: 12.3 },
          { source: "Email", visitors: 940, percentage: 6.1 }
        ],
        deviceStats: [
          { device: "Desktop", visitors: 8234, percentage: 53.4 },
          { device: "Mobile", visitors: 5678, percentage: 36.8 },
          { device: "Tablet", visitors: 1508, percentage: 9.8 }
        ],
        monthlyViews: [
          { month: "Jan", views: 12000 },
          { month: "Feb", views: 14500 },
          { month: "Mar", views: 13200 },
          { month: "Apr", views: 15800 },
          { month: "May", views: 16900 },
          { month: "Jun", views: 15420 }
        ]
      };
      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUpRight className="w-4 h-4 text-green-600" />;
    if (change < 0) return <ArrowDownRight className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-slate-400" />;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-slate-400';
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'desktop': return <Monitor className="w-4 h-4" />;
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'tablet': return <Tablet className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <RefreshCw className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center p-12">
        <AlertCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Analytics Unavailable</h2>
        <p className="text-slate-600 mb-6">Unable to load analytics data</p>
        <Button onClick={loadAnalytics}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-slate-600 mt-2">Comprehensive insights into your website performance and user behavior</p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 h-10 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <Button 
            variant="outline" 
            onClick={() => onNavigate?.('dashboard')}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-green-100 text-green-800">
              +12.5%
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-blue-600 mb-1">Total Visitors</p>
            <p className="text-2xl font-bold text-blue-900">{analytics.totalVisitors.toLocaleString()}</p>
            <p className="text-xs text-blue-600 mt-1">vs last period</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-green-100 text-green-800">
              +8.3%
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-purple-600 mb-1">Page Views</p>
            <p className="text-2xl font-bold text-purple-900">{analytics.pageViews.toLocaleString()}</p>
            <p className="text-xs text-purple-600 mt-1">vs last period</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-green-100 text-green-800">
              +5.7%
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-emerald-600 mb-1">Unique Visitors</p>
            <p className="text-2xl font-bold text-emerald-900">{analytics.uniqueVisitors.toLocaleString()}</p>
            <p className="text-xs text-emerald-600 mt-1">vs last period</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-red-100 text-red-800">
              -2.1%
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-orange-600 mb-1">Bounce Rate</p>
            <p className="text-2xl font-bold text-orange-900">{analytics.bounceRate}%</p>
            <p className="text-xs text-orange-600 mt-1">vs last period</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-green-100 text-green-800">
              +18.2%
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-pink-600 mb-1">Avg. Session</p>
            <p className="text-2xl font-bold text-pink-900">{analytics.avgSessionDuration}</p>
            <p className="text-xs text-pink-600 mt-1">vs last period</p>
          </div>
        </Card>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card className="p-6 bg-white border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              Top Pages
            </h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {analytics.topPages.map((page, index) => (
              <div key={page.title} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{page.title}</p>
                    <p className="text-sm text-slate-600">{page.views.toLocaleString()} views</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getChangeIcon(page.change)}
                  <span className={`text-sm font-medium ${getChangeColor(page.change)}`}>
                    {Math.abs(page.change)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Traffic Sources */}
        <Card className="p-6 bg-white border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-500" />
              Traffic Sources
            </h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {analytics.trafficSources.map((source) => (
              <div key={source.source} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-900">{source.source}</span>
                  <span className="text-sm text-slate-600">{source.percentage}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-slate-600">{source.visitors.toLocaleString()} visitors</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Device Stats and Monthly Views */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Statistics */}
        <Card className="p-6 bg-white border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-purple-500" />
              Device Statistics
            </h2>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
          <div className="space-y-4">
            {analytics.deviceStats.map((device) => (
              <div key={device.device} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    {getDeviceIcon(device.device)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{device.device}</p>
                    <p className="text-sm text-slate-600">{device.visitors.toLocaleString()} visitors</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-purple-600">{device.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Monthly Trend */}
        <Card className="p-6 bg-white border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              Monthly Trend
            </h2>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
          <div className="space-y-4">
            {analytics.monthlyViews.map((month) => (
              <div key={month.month} className="flex items-center justify-between">
                <span className="font-medium text-slate-900">{month.month}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full"
                      style={{ width: `${(month.views / Math.max(...analytics.monthlyViews.map(m => m.views))) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-600 w-16 text-right">
                    {month.views.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-16 flex-col items-center justify-center">
            <Download className="w-5 h-5 mb-2" />
            <span className="text-sm">Export CSV</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col items-center justify-center">
            <RefreshCw className="w-5 h-5 mb-2" />
            <span className="text-sm">Refresh Data</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col items-center justify-center">
            <Filter className="w-5 h-5 mb-2" />
            <span className="text-sm">Advanced Filters</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
