"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Images,
  Video,
  File,
  Upload,
  Download,
  Search,
  Filter,
  Grid,
  List,
  Plus,
  Eye,
  Trash2,
  Edit3,
  FolderOpen,
  FileImage,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Share2,
  Copy,
  RefreshCw,
  MoreVertical,
  X,
  Check,
  BarChart3,
  FileText,
  Image,
  Folder,
  Tag,
  Users,
  Bell,
  Info,
  TrendingUp,
  Maximize2,
  Zap,
  Target,
  Home
} from "lucide-react";

interface MediaItem {
  id: string;
  filename: string;
  type: 'image' | 'video' | 'document';
  size: number;
  uploadedAt: string;
  url: string;
  thumbnail?: string;
  tags?: string[];
  alt?: string;
  dimensions?: { width: number; height: number };
  duration?: string;
}

interface MediaLibrarySectionProps {
  onNavigate?: (section: string) => void;
}

export function MediaLibrarySection({ onNavigate }: MediaLibrarySectionProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  // Mock data - in real implementation, this would come from database
  useEffect(() => {
    const mockMedia: MediaItem[] = [
      {
        id: '1',
        filename: 'hero-banner.jpg',
        type: 'image',
        size: 245760,
        uploadedAt: '2024-01-15T10:00:00Z',
        url: '/images/hero-banner.jpg',
        thumbnail: '/images/hero-banner-thumb.jpg',
        tags: ['hero', 'banner', 'psychology'],
        alt: 'Professional psychology services hero banner',
        dimensions: { width: 1920, height: 1080 }
      },
      {
        id: '2',
        filename: 'dr-asatsa-profile.jpg',
        type: 'image',
        size: 156320,
        uploadedAt: '2024-01-14T15:30:00Z',
        url: '/images/dr-asatsa-profile.jpg',
        thumbnail: '/images/dr-asatsa-profile-thumb.jpg',
        tags: ['profile', 'professional', 'psychology'],
        alt: 'Dr. Stephen Asatsa professional headshot',
        dimensions: { width: 400, height: 400 }
      },
      {
        id: '3',
        filename: 'therapy-session-intro.mp4',
        type: 'video',
        size: 5242880,
        uploadedAt: '2024-01-13T09:15:00Z',
        url: '/videos/therapy-session-intro.mp4',
        thumbnail: '/videos/therapy-session-intro-thumb.jpg',
        tags: ['therapy', 'session', 'introduction'],
        alt: 'Therapy session introduction video',
        duration: '2:45'
      },
      {
        id: '4',
        filename: 'research-paper.pdf',
        type: 'document',
        size: 1048576,
        uploadedAt: '2024-01-12T14:20:00Z',
        url: '/documents/research-paper.pdf',
        tags: ['research', 'paper', 'academic'],
        alt: 'Research paper on Afrocentric psychology'
      },
      {
        id: '5',
        filename: 'client-testimonial.jpg',
        type: 'image',
        size: 89234,
        uploadedAt: '2024-01-11T11:45:00Z',
        url: '/images/client-testimonial.jpg',
        thumbnail: '/images/client-testimonial-thumb.jpg',
        tags: ['testimonial', 'client', 'feedback'],
        alt: 'Client testimonial image',
        dimensions: { width: 800, height: 600 }
      },
      {
        id: '6',
        filename: 'psychology-consultation.mp4',
        type: 'video',
        size: 8388608,
        uploadedAt: '2024-01-10T16:30:00Z',
        url: '/videos/psychology-consultation.mp4',
        thumbnail: '/videos/psychology-consultation-thumb.jpg',
        tags: ['consultation', 'psychology', 'session'],
        alt: 'Psychology consultation session',
        duration: '5:12'
      }
    ];
    setMedia(mockMedia);
    setLoading(false);
  }, []);

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'document': return <File className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'image': return 'bg-blue-100 text-blue-800';
      case 'video': return 'bg-purple-100 text-purple-800';
      case 'document': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredMedia.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredMedia.map(item => item.id));
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this media file?')) {
      setMedia(prev => prev.filter(item => item.id !== id));
      setSelectedItems(prev => prev.filter(item => item !== id));
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedItems.length} media files?`)) {
      setMedia(prev => prev.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    }
  };

  const handlePreview = (item: MediaItem) => {
    setSelectedMedia(item);
    setShowPreview(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
          <h1 className="text-3xl font-bold text-slate-900 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Media Library
          </h1>
          <p className="text-slate-600 mt-2">Upload and manage your media files including images, videos, and documents</p>
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
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Upload className="w-4 h-4 mr-2" />
            Upload Media
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search media files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 bg-white border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/20"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 h-10 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="document">Documents</option>
            </select>

            <div className="flex bg-white border border-emerald-300 rounded-md">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('grid')}
                className={`rounded-r-none ${viewMode === 'grid' ? 'bg-emerald-100 text-emerald-600' : ''}`}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('list')}
                className={`rounded-l-none ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-600' : ''}`}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-white rounded-lg border border-emerald-200">
            <p className="text-2xl font-bold text-emerald-600">{media.length}</p>
            <p className="text-sm text-slate-600">Total Files</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-emerald-200">
            <p className="text-2xl font-bold text-blue-600">{media.filter(m => m.type === 'image').length}</p>
            <p className="text-sm text-slate-600">Images</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-emerald-200">
            <p className="text-2xl font-bold text-purple-600">{media.filter(m => m.type === 'video').length}</p>
            <p className="text-sm text-slate-600">Videos</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-emerald-200">
            <p className="text-2xl font-bold text-green-600">{media.filter(m => m.type === 'document').length}</p>
            <p className="text-sm text-slate-600">Documents</p>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <div className="flex items-center justify-between p-3 bg-emerald-100 rounded-lg">
            <span className="text-sm font-medium text-emerald-800">
              {selectedItems.length} items selected
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-300">
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleBulkDelete}
                className="text-red-600 border-red-300"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Media Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMedia.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white border-slate-200 group">
              <div className="relative aspect-video bg-slate-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  {item.type === 'image' ? (
                    <Image className="w-12 h-12 text-slate-400" />
                  ) : item.type === 'video' ? (
                    <Video className="w-12 h-12 text-slate-400" />
                  ) : (
                    <File className="w-12 h-12 text-slate-400" />
                  )}
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handlePreview(item)}
                    className="bg-white/90 hover:bg-white"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => copyToClipboard(item.url)}
                    className="bg-white/90 hover:bg-white"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                {/* Checkbox */}
                <div className="absolute top-2 left-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="w-4 h-4 rounded border-white bg-white/90"
                  />
                </div>

                {/* Type Badge */}
                <div className="absolute top-2 right-2">
                  <Badge className={getTypeColor(item.type)}>
                    {item.type}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-slate-900 truncate mb-2">{item.filename}</h3>
                <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                  <span>{formatFileSize(item.size)}</span>
                  <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
                </div>
                
                {item.dimensions && (
                  <div className="text-xs text-slate-600 mb-2">
                    {item.dimensions.width} × {item.dimensions.height}
                  </div>
                )}
                
                {item.duration && (
                  <div className="text-xs text-slate-600 mb-2">
                    Duration: {item.duration}
                  </div>
                )}
                
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {item.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{item.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMedia.map((item) => (
            <Card key={item.id} className="p-6 hover:shadow-lg transition-all duration-300 bg-white border-slate-200">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                  className="w-4 h-4 rounded border-slate-300"
                />
                
                <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {getTypeIcon(item.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-slate-900 truncate">{item.filename}</h3>
                    <Badge className={getTypeColor(item.type)}>
                      {item.type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span>{formatFileSize(item.size)}</span>
                    <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
                    {item.dimensions && (
                      <span>{item.dimensions.width} × {item.dimensions.height}</span>
                    )}
                    {item.duration && (
                      <span>Duration: {item.duration}</span>
                    )}
                  </div>
                  
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handlePreview(item)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(item.url)}>
                    <Copy className="w-4 h-4" />
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
            </Card>
          ))}
        </div>
      )}

      {filteredMedia.length === 0 && (
        <Card className="p-12 text-center bg-white border-slate-200">
          <FolderOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No media files found</h3>
          <p className="text-slate-600">
            {searchTerm ? 'No media files match your search criteria.' : 'No media files have been uploaded yet.'}
          </p>
        </Card>
      )}

      {/* Preview Modal */}
      {showPreview && selectedMedia && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-slate-900">{selectedMedia.filename}</h3>
              <Button variant="ghost" onClick={() => setShowPreview(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="p-6">
              <div className="aspect-video bg-slate-100 rounded-lg mb-4 flex items-center justify-center">
                {selectedMedia.type === 'image' ? (
                  <Image className="w-16 h-16 text-slate-400" />
                ) : selectedMedia.type === 'video' ? (
                  <Video className="w-16 h-16 text-slate-400" />
                ) : (
                  <File className="w-16 h-16 text-slate-400" />
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-slate-700">Type:</span> {selectedMedia.type}
                </div>
                <div>
                  <span className="font-medium text-slate-700">Size:</span> {formatFileSize(selectedMedia.size)}
                </div>
                <div>
                  <span className="font-medium text-slate-700">Uploaded:</span> {new Date(selectedMedia.uploadedAt).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium text-slate-700">URL:</span> {selectedMedia.url}
                </div>
              </div>
              
              {selectedMedia.tags && (
                <div className="mt-4">
                  <span className="font-medium text-slate-700 text-sm">Tags:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedMedia.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex gap-2 mt-6">
                <Button onClick={() => copyToClipboard(selectedMedia.url)}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy URL
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
