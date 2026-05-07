"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/lib/content/site-content";
import { FileText, Calendar, User, Clock, ExternalLink, TrendingUp } from "lucide-react";
import Link from "next/link";

interface BlogSectionProps {
  className?: string;
}

export function BlogSection({ className }: BlogSectionProps) {
  const blogPosts = [
    {
      id: 1,
      title: "Indigenous Healing Practices: A Cultural Evolutionary Perspective",
      excerpt: "Exploring how traditional healing practices evolve and adapt in contemporary African societies, and their therapeutic value in modern mental health care.",
      author: "Dr. Stephen Asatsa",
      date: "2024-04-15",
      category: "Cultural Psychology",
      readTime: "8 min read",
      tags: ["indigenous healing", "cultural evolution", "mental health"],
      featured: true,
      image: "/images/research/traditional-healing.jpg"
    },
    {
      id: 2,
      title: "The Role of Community in Mental Health: Lessons from Luhya Mourning Rituals",
      excerpt: "Insights from our ongoing research on how communal mourning practices contribute to psychological wellbeing and collective resilience.",
      author: "Dr. Elizabeth Shino",
      date: "2024-03-28",
      category: "Community Psychology",
      readTime: "6 min read",
      tags: ["community health", "mourning rituals", "resilience"],
      featured: false
    },
    {
      id: 3,
      title: "Decolonizing Psychology: African Perspectives on Mental Health",
      excerpt: "A critical examination of Western psychological frameworks and the need for culturally appropriate approaches in African contexts.",
      author: "Dr. Stephen Asatsa",
      date: "2024-03-10",
      category: "Theory & Framework",
      readTime: "10 min read",
      tags: ["decolonization", "african psychology", "cultural competence"],
      featured: false
    },
    {
      id: 4,
      title: "Youth Mental Health in Kenya: Challenges and Opportunities",
      excerpt: "Analysis of mental health challenges facing Kenyan youth and community-based intervention strategies.",
      author: "Research Team",
      date: "2024-02-22",
      category: "Youth Development",
      readTime: "7 min read",
      tags: ["youth mental health", "kenya", "interventions"],
      featured: false
    },
    {
      id: 5,
      title: "Methodological Considerations in Cross-Cultural Psychology Research",
      excerpt: "Best practices for conducting culturally sensitive research that respects local contexts while maintaining scientific rigor.",
      author: "Dr. Luzelle Naude",
      date: "2024-02-05",
      category: "Research Methods",
      readTime: "9 min read",
      tags: ["methodology", "cross-cultural", "research ethics"],
      featured: false
    }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className={className}>
      {/* Featured Article */}
      {featuredPost && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <h3 className="text-xl font-semibold">Featured Article</h3>
          </div>
          
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="md:flex">
              {/* Featured Image */}
              <div className="md:w-1/3 bg-gradient-to-br from-emerald-600 to-teal-600 p-8 flex items-center justify-center">
                <FileText className="w-16 h-16 text-white" />
              </div>
              
              {/* Content */}
              <div className="md:w-2/3 p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-100 text-emerald-800">Featured</Badge>
                    <Badge variant="secondary">{featuredPost.category}</Badge>
                    <span className="text-sm text-muted-foreground">{featuredPost.readTime}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-2">{featuredPost.title}</h2>
                  <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </div>
                    </div>
                    
                    <Button asChild>
                      <Link href={`/research-hub/blog/${featuredPost.id}`}>
                        Read Full Article
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {featuredPost.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Recent Posts Grid */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-xl font-semibold">Recent Posts</h3>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {regularPosts.map((post) => (
            <Card key={post.id} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={`/research-hub/blog/${post.id}`}>
                    Read More
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Publications Section */}
      <div className="mt-12 space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-purple-600" />
          <h3 className="text-xl font-semibold">Recent Publications</h3>
        </div>
        
        <div className="space-y-4">
          {siteContent.publications.slice(0, 3).map((publication, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-purple-600" />
                    <Badge variant="secondary">{publication.type}</Badge>
                    <Badge variant="outline">{publication.year}</Badge>
                  </div>
                  <h4 className="font-semibold mb-1">{publication.title}</h4>
                  <p className="text-sm text-muted-foreground">{publication.summary}</p>
                </div>
                {publication.fileUrl && (
                  <Button asChild variant="outline" size="sm" className="ml-4">
                    <a href={publication.fileUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      PDF
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="https://scholar.google.com/citations?user=nBzSCvUAAAAJ&hl=en" target="_blank">
              View All Publications
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
