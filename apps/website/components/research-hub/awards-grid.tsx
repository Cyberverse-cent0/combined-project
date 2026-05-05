"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/lib/content/site-content";
import { Award, Calendar, ExternalLink, Trophy, Star, Target } from "lucide-react";

interface AwardsGridProps {
  className?: string;
}

export function AwardsGrid({ className }: AwardsGridProps) {
  const additionalAwards = [
    {
      title: "Excellence in Teaching Award",
      organization: "Catholic University of Eastern Africa",
      year: "2023",
      type: "Teaching",
      description: "Recognized for outstanding contribution to psychology education"
    },
    {
      title: "Best Research Paper Award",
      organization: "African Psychological Association",
      year: "2022",
      type: "Research",
      description: "Awarded for groundbreaking research on indigenous healing practices"
    },
    {
      title: "Community Service Excellence",
      organization: "Kenya Psychological Association",
      year: "2021",
      type: "Service",
      description: "Recognized for exceptional community mental health initiatives"
    }
  ];

  const grants = [
    {
      title: "Traditional Luhya Mourning Rituals Research",
      organization: "Templeton Foundation",
      amount: "$150,000",
      year: "2024",
      status: "Active",
      description: "Major interdisciplinary project exploring therapeutic value of Indigenous mourning rituals"
    },
    {
      title: "Cultural Evolution Society Transformation Fund",
      organization: "Cultural Evolution Society",
      amount: "$75,000",
      year: "2024",
      status: "Active",
      description: "Support for research on cultural transmission and resilience"
    },
    {
      title: "Mental Health Services Research Grant",
      organization: "National Research Fund",
      amount: "$50,000",
      year: "2023",
      status: "Completed",
      description: "Evaluation of community-based mental health interventions"
    }
  ];

  const allAwards = [...siteContent.awards, ...additionalAwards];
  const totalFunding = grants.reduce((sum, grant) => {
    const amount = parseInt(grant.amount.replace(/[$,]/g, ''));
    return sum + amount;
  }, 0);

  const groupedByYear = allAwards.reduce((acc, award) => {
    const year = award.year;
    if (!acc[year]) acc[year] = [];
    acc[year].push(award);
    return acc;
  }, {} as Record<string, typeof allAwards>);

  return (
    <div className={className}>
      {/* Summary Numbers */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card className="p-6 text-center">
          <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
          <div className="text-2xl font-bold">{allAwards.length}</div>
          <div className="text-sm text-muted-foreground">Total Awards</div>
        </Card>
        <Card className="p-6 text-center">
          <Star className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <div className="text-2xl font-bold">{grants.length}</div>
          <div className="text-sm text-muted-foreground">Research Grants</div>
        </Card>
        <Card className="p-6 text-center">
          <Award className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <div className="text-2xl font-bold">${totalFunding.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Total Funding</div>
        </Card>
        <Card className="p-6 text-center">
          <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <div className="text-2xl font-bold">2024</div>
          <div className="text-sm text-muted-foreground">Latest Award</div>
        </Card>
      </div>

      {/* Timeline View */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Awards Timeline
        </h3>
        
        <div className="space-y-4">
          {Object.entries(groupedByYear)
            .sort(([a], [b]) => parseInt(b) - parseInt(a))
            .map(([year, awards]) => (
              <div key={year} className="relative">
                {/* Year Marker */}
                <div className="sticky top-4 z-10 mb-4">
                  <div className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full">
                    <Calendar className="w-4 h-4" />
                    <span className="font-semibold">{year}</span>
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {awards.length} {awards.length === 1 ? 'Award' : 'Awards'}
                    </Badge>
                  </div>
                </div>

                {/* Awards for this year */}
                <div className="grid gap-4 md:grid-cols-2">
                  {awards.map((award, index) => (
                    <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Trophy className="w-4 h-4 text-yellow-600" />
                              <h4 className="font-semibold">{award.title}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {'organization' in award ? award.organization : 'Various Organizations'}
                            </p>
                            {'description' in award && award.description && (
                              <p className="text-xs text-muted-foreground mt-1">{award.description}</p>
                            )}
                          </div>
                          {'href' in award && award.href && (
                            <Button asChild variant="outline" size="sm">
                              <a href={award.href} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3 h-3 mr-1" />
                                View
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Research Grants Section */}
      <div className="mt-12 space-y-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Target className="w-5 h-5" />
          Research Grants
        </h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          {grants.map((grant, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold mb-1">{grant.title}</h4>
                    <p className="text-sm text-muted-foreground">{grant.organization}</p>
                    {grant.description && (
                      <p className="text-xs text-muted-foreground mt-1">{grant.description}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{grant.amount}</div>
                    <Badge 
                      variant={grant.status === 'Active' ? 'default' : 'outline'}
                      className={grant.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {grant.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {grant.year}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
