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
import { Switch } from "@/components/ui/switch";
import {
  Home,
  User,
  Briefcase,
  Target,
  BarChart3,
  MessageSquare,
  Award,
  Phone,
  Mail,
  Settings,
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  Eye,
  EyeOff,
  GripVertical,
  Star,
  Upload,
  Image,
  FileText,
  Link,
  MoveUp,
  MoveDown,
  Copy,
  Check
} from "lucide-react";
import {
  HeroContent,
  AboutContent,
  ServiceItem,
  ResearchItem,
  StatisticItem,
  TestimonialItem,
  AffiliationItem,
  ContactInfo,
  NewsletterContent,
  FooterContent
} from "@/lib/content/types";

interface HomepageContentSectionProps {
  onNavigate?: (section: string) => void;
}

export function HomepageContentSection({ onNavigate }: HomepageContentSectionProps) {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [research, setResearch] = useState<ResearchItem[]>([]);
  const [statistics, setStatistics] = useState<StatisticItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [affiliations, setAffiliations] = useState<AffiliationItem[]>([]);
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [newsletter, setNewsletter] = useState<NewsletterContent | null>(null);
  const [footer, setFooter] = useState<FooterContent | null>(null);

  // Load all content data
  useEffect(() => {
    loadHomepageContent();
  }, []);

  const loadHomepageContent = async () => {
    try {
      setLoading(true);
      
      // Mock data for demonstration - in real implementation, this would come from API
      const mockHero: HeroContent = {
        id: '1',
        name: 'Dr. Stephen Asatsa',
        titles: ['Licensed Psychologist', 'Senior Lecturer', 'Research Leader'],
        tagline: 'Senior Lecturer, licensed psychologist, and research leader advancing culturally grounded psychological science.',
        primaryCta: {
          label: 'Book a Consultation',
          url: '/contact'
        },
        secondaryCta: {
          label: 'Contact',
          url: '/contact'
        },
        backgroundImage: '/assets/people/hero.webp',
        profileImage: '/assets/people/profile.webp',
        stats: {
          yearsExperience: '15+',
          clientsHelped: '1000+',
          publications: '50+'
        },
        trustBadges: {
          credentials: {
            title: 'Trusted Credentials',
            description: 'CUEA leadership, licensed practice, international research.',
            badges: ['Licensed', 'Certified']
          },
          contact: {
            phone: '+254 712 345 678',
            email: 'stephen.asatsa@cuea.edu',
            availability: 'Available 24/7'
          }
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const mockAbout: AboutContent = {
        id: '1',
        fullBiography: 'Dr. Stephen Asatsa is a distinguished psychologist and academic leader with extensive experience in clinical practice, research, and teaching. His work focuses on culturally grounded psychological approaches that integrate indigenous knowledge systems with modern psychological science.',
        shortSummary: 'Expert in psychological services, research leadership, and mentorship with extensive experience in academic strategy and clinical practice.',
        highlights: [
          '15+ years in psychological practice',
          'Expertise in culturally grounded therapy',
          'Published researcher and academic leader',
          'Specialized in community mental health'
        ],
        profileImage: '/assets/people/about.webp',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const mockServices: ServiceItem[] = [
        {
          id: '1',
          title: 'Clinical Psychology',
          description: 'Professional psychological assessment and therapy services tailored to individual needs.',
          bulletPoints: [
            'Individual counseling sessions',
            'Psychological assessments',
            'Evidence-based interventions',
            'Crisis intervention support'
          ],
          icon: 'User',
          order: 1,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Research Consultation',
          description: 'Expert guidance on research methodology, data analysis, and academic publishing.',
          bulletPoints: [
            'Research design consultation',
            'Statistical analysis support',
            'Academic writing assistance',
            'Publication guidance'
          ],
          icon: 'Target',
          order: 2,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];

      setHeroContent(mockHero);
      setAboutContent(mockAbout);
      setServices(mockServices);
      
    } catch (error) {
      console.error('Error loading homepage content:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveHeroContent = async (content: HeroContent) => {
    try {
      console.log('Saving hero content:', content);
      setHeroContent({ ...content, updatedAt: new Date().toISOString() });
    } catch (error) {
      console.error('Error saving hero content:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading homepage content...</p>
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
            <Home className="w-8 h-8 text-blue-600" />
            Homepage Content Management
          </h1>
          <p className="text-slate-600 mt-1">Manage all content displayed on your homepage</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview Site
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>

      {/* Content Management Tabs */}
      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="hero" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Hero Section
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              About
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="research" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Research
            </TabsTrigger>
            <TabsTrigger value="more" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              More
            </TabsTrigger>
          </TabsList>

          {/* Hero Section Tab */}
          <TabsContent value="hero" className="space-y-6">
            <div className="grid gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={heroContent?.name || ''}
                      onChange={(e) => setHeroContent(prev => prev ? {...prev, name: e.target.value} : null)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label>Titles</Label>
                    <div className="mt-2 space-y-2">
                      {heroContent?.titles.map((title, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={title}
                            onChange={(e) => {
                              const newTitles = [...heroContent!.titles];
                              newTitles[index] = e.target.value;
                              setHeroContent(prev => prev ? {...prev, titles: newTitles} : null);
                            }}
                          />
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              const newTitles = heroContent!.titles.filter((_, i) => i !== index);
                              setHeroContent(prev => prev ? {...prev, titles: newTitles} : null);
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        onClick={() => setHeroContent(prev => prev ? {...prev, titles: [...prev.titles, '']} : null)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Title
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="tagline">Tagline</Label>
                    <Textarea
                      id="tagline"
                      value={heroContent?.tagline || ''}
                      onChange={(e) => setHeroContent(prev => prev ? {...prev, tagline: e.target.value} : null)}
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Call-to-Action</h3>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primaryCtaLabel">Primary Button Text</Label>
                      <Input
                        id="primaryCtaLabel"
                        value={heroContent?.primaryCta.label || ''}
                        onChange={(e) => setHeroContent(prev => prev ? {...prev, primaryCta: {...prev.primaryCta, label: e.target.value}} : null)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="primaryCtaUrl">Primary Button URL</Label>
                      <Input
                        id="primaryCtaUrl"
                        value={heroContent?.primaryCta.url || ''}
                        onChange={(e) => setHeroContent(prev => prev ? {...prev, primaryCta: {...prev.primaryCta, url: e.target.value}} : null)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="secondaryCtaLabel">Secondary Button Text</Label>
                      <Input
                        id="secondaryCtaLabel"
                        value={heroContent?.secondaryCta.label || ''}
                        onChange={(e) => setHeroContent(prev => prev ? {...prev, secondaryCta: {...prev.secondaryCta, label: e.target.value}} : null)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="secondaryCtaUrl">Secondary Button URL</Label>
                      <Input
                        id="secondaryCtaUrl"
                        value={heroContent?.secondaryCta.url || ''}
                        onChange={(e) => setHeroContent(prev => prev ? {...prev, secondaryCta: {...prev.secondaryCta, url: e.target.value}} : null)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Statistics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="yearsExperience">Years Experience</Label>
                    <Input
                      id="yearsExperience"
                      value={heroContent?.stats.yearsExperience || ''}
                      onChange={(e) => setHeroContent(prev => prev ? {...prev, stats: {...prev.stats, yearsExperience: e.target.value}} : null)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientsHelped">Clients Helped</Label>
                    <Input
                      id="clientsHelped"
                      value={heroContent?.stats.clientsHelped || ''}
                      onChange={(e) => setHeroContent(prev => prev ? {...prev, stats: {...prev.stats, clientsHelped: e.target.value}} : null)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="publications">Publications</Label>
                    <Input
                      id="publications"
                      value={heroContent?.stats.publications || ''}
                      onChange={(e) => setHeroContent(prev => prev ? {...prev, stats: {...prev.stats, publications: e.target.value}} : null)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </Card>

              <div className="flex gap-3">
                <Button onClick={() => heroContent && saveHeroContent(heroContent)} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Hero Section
                </Button>
                <Button variant="outline">Reset to Default</Button>
              </div>
            </div>
          </TabsContent>

          {/* About Section Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">About Content</h3>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="shortSummary">Short Summary</Label>
                  <Textarea
                    id="shortSummary"
                    value={aboutContent?.shortSummary || ''}
                    onChange={(e) => setAboutContent(prev => prev ? {...prev, shortSummary: e.target.value} : null)}
                    rows={3}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="fullBiography">Full Biography</Label>
                  <Textarea
                    id="fullBiography"
                    value={aboutContent?.fullBiography || ''}
                    onChange={(e) => setAboutContent(prev => prev ? {...prev, fullBiography: e.target.value} : null)}
                    rows={8}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label>Key Highlights</Label>
                  <div className="mt-2 space-y-2">
                    {aboutContent?.highlights.map((highlight, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={highlight}
                          onChange={(e) => {
                            const newHighlights = [...aboutContent!.highlights];
                            newHighlights[index] = e.target.value;
                            setAboutContent(prev => prev ? {...prev, highlights: newHighlights} : null);
                          }}
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            const newHighlights = aboutContent!.highlights.filter((_, i) => i !== index);
                            setAboutContent(prev => prev ? {...prev, highlights: newHighlights} : null);
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      onClick={() => setAboutContent(prev => prev ? {...prev, highlights: [...prev.highlights, '']} : null)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Highlight
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save About Section
                </Button>
                <Button variant="outline">Reset to Default</Button>
              </div>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Services Management</h3>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New Service
              </Button>
            </div>
            
            <div className="space-y-4">
              {services.map((service, index) => (
                <Card key={service.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{service.title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant={service.isActive ? "default" : "secondary"}>
                              {service.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                            <span className="text-sm text-slate-600">Order: {service.order}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-slate-600 mb-3">{service.description}</p>
                      
                      <div className="space-y-1">
                        {service.bulletPoints.map((point, pointIndex) => (
                          <div key={pointIndex} className="text-sm text-slate-600 flex items-center gap-2">
                            <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                            {point}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        {service.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Research Tab */}
          <TabsContent value="research" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Research Projects</h3>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Research Project
              </Button>
            </div>
            
            <div className="space-y-4">
              {research.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-slate-900">{item.title}</h4>
                        <Badge variant={
                          item.status === 'active' ? 'default' : 
                          item.status === 'ongoing' ? 'secondary' : 'outline'
                        }>
                          {item.status}
                        </Badge>
                        {!item.isVisible && (
                          <Badge variant="outline" className="text-slate-600">
                            Hidden
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-slate-600 mb-2">{item.description}</p>
                      
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        {item.isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* More Settings Tab */}
          <TabsContent value="more" className="space-y-6">
            <div className="grid gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Statistics & Metrics</h3>
                <div className="space-y-4">
                  {statistics.map((stat) => (
                    <div key={stat.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{stat.label}</div>
                        <div className="text-sm text-slate-600">{stat.value}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="contactPhone">Phone</Label>
                    <Input
                      id="contactPhone"
                      value={contact?.phones[0] || ''}
                      onChange={(e) => setContact(prev => prev ? {...prev, phones: [e.target.value]} : null)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">Email</Label>
                    <Input
                      id="contactEmail"
                      value={contact?.emails[0] || ''}
                      onChange={(e) => setContact(prev => prev ? {...prev, emails: [e.target.value]} : null)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactAddress">Address</Label>
                    <Textarea
                      id="contactAddress"
                      value={contact?.address || ''}
                      onChange={(e) => setContact(prev => prev ? {...prev, address: e.target.value} : null)}
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Newsletter Settings</h3>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="newsletterTitle">Title</Label>
                    <Input
                      id="newsletterTitle"
                      value={newsletter?.title || ''}
                      onChange={(e) => setNewsletter(prev => prev ? {...prev, title: e.target.value} : null)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newsletterDescription">Description</Label>
                    <Textarea
                      id="newsletterDescription"
                      value={newsletter?.description || ''}
                      onChange={(e) => setNewsletter(prev => prev ? {...prev, description: e.target.value} : null)}
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="newsletterActive"
                      checked={newsletter?.isActive || false}
                      onCheckedChange={(checked) => setNewsletter(prev => prev ? {...prev, isActive: checked} : null)}
                    />
                    <Label htmlFor="newsletterActive">Newsletter section active</Label>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
