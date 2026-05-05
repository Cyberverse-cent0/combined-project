"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, ArrowRight, X, Users, Target, HeartHandshake, Trophy } from "lucide-react";
import Link from "next/link";

interface ResearchHubBriefingProps {
  className?: string;
  onDismiss?: () => void;
}

export function ResearchHubBriefing({ className, onDismiss }: ResearchHubBriefingProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has seen briefing before
    const hasSeenBriefing = localStorage.getItem('hasSeenResearchHubBriefing');
    if (!hasSeenBriefing) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenResearchHubBriefing', 'true');
    onDismiss?.();
  };

  const navigationCards = [
    {
      title: "About",
      description: "Lab identity and research philosophy",
      icon: Brain,
      href: "/research-hub/about",
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "Projects",
      description: "Active and completed research projects",
      icon: Target,
      href: "/research-hub/projects",
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Our Team",
      description: "Research team and international collaborators",
      icon: Users,
      href: "/research-hub/team",
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Activities",
      description: "Conferences, publications, and events",
      icon: ArrowRight,
      href: "/research-hub/activities",
      color: "from-orange-500 to-red-600"
    },
    {
      title: "Community",
      description: "Engagement and partnership opportunities",
      icon: HeartHandshake,
      href: "/research-hub/community",
      color: "from-cyan-500 to-teal-600"
    },
    {
      title: "Awards & Grants",
      description: "Professional recognition and funding",
      icon: Trophy,
      href: "/research-hub/awards",
      color: "from-yellow-500 to-amber-600"
    }
  ];

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${className}`}>
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0F766E] to-teal-600 rounded-xl flex items-center justify-center text-white">
                  🧠🌿
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Welcome to HDLK-L</h1>
                  <p className="text-lg text-gray-600">Human Development, Indigenous Knowledge and Flourishing Lab</p>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Lab Introduction */}
          <div className="space-y-4 bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl">
            <p className="text-lg text-gray-800 leading-relaxed">
              The <span className="font-semibold text-[#0F766E]">Human Development, Indigenous Knowledge and Flourishing Lab (HDLK-L)</span> is a pioneering research center dedicated to culturally grounded psychology, indigenous knowledge systems, and decolonizing mental health practices in African contexts.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed">
              Led by Dr. Stephen Asatsa, we integrate traditional African wisdom with rigorous scientific methods to advance human flourishing across the continent and beyond.
            </p>
          </div>

          {/* Core Pillars */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Core Pillars</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <div className="w-12 h-12 bg-[#0F766E] rounded-full flex items-center justify-center text-white mx-auto mb-3">
                  🌍
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Cultural Authenticity</h3>
                <p className="text-sm text-gray-600">Honoring indigenous knowledge systems</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-3">
                  🔬
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Scientific Excellence</h3>
                <p className="text-sm text-gray-600">Rigorous research methodologies</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-3">
                  🤝
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Community Impact</h3>
                <p className="text-sm text-gray-600">Real-world applications</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white mx-auto mb-3">
                  🔄
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Decolonization</h3>
                <p className="text-sm text-gray-600">Transforming psychology practice</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-[#0F766E] mb-1">12</div>
              <div className="text-sm text-gray-600">Active Projects</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-teal-600 mb-1">28</div>
              <div className="text-sm text-gray-600">Publications</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">15</div>
              <div className="text-sm text-gray-600">Awards</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">8</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
          </div>

          {/* Navigation Cards */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Explore Our Research</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {navigationCards.map((card, index) => (
                <Link key={index} href={card.href}>
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                    <div className="space-y-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                        <card.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{card.title}</h3>
                        <p className="text-sm text-gray-600">{card.description}</p>
                      </div>
                      <div className="flex items-center text-[#0F766E] group-hover:text-teal-600 transition-colors">
                        <span className="text-sm font-medium">Explore</span>
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center pt-6 border-t">
            <p className="text-gray-600 mb-4">
              Ready to dive into our research? Start exploring or get in touch with our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#0F766E] hover:bg-teal-700 text-white px-8" asChild>
                <Link href="/research-hub/about">
                  Start Exploring
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8" onClick={handleDismiss}>
                Continue to Site
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
