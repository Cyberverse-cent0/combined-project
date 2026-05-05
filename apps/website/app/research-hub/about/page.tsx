import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResearchHubSidebar } from "@/components/research-hub/research-hub-sidebar";
import { HeroSection } from "@/components/research-hub/hero-section";
import { StatCard } from "@/components/ui/stat-card";
import { IconCard } from "@/components/ui/icon-card";
import { Accordion } from "@/components/ui/accordion";
import { createMetadata } from "@/lib/site";
import { 
  Brain, 
  Microscope, 
  Globe, 
  Users, 
  Target,
  Heart,
  Lightbulb,
  CheckCircle,
  Shield,
  Lock,
  Eye,
  ArrowRight,
  Mail
} from "lucide-react";
import Link from "next/link";

export const metadata = createMetadata(
  "About Research",
  "Research philosophy, methodology, and approach.",
  "/research-hub/about",
);

export const revalidate = 3600;

export default function ResearchAboutPage() {
  const methodologyItems = [
    {
      title: "Mixed-Methods Approach",
      content: "We combine qualitative and quantitative research methods to provide comprehensive insights. This includes ethnographic studies, focus groups, in-depth interviews, survey research, and statistical analysis to ensure robust findings.",
      icon: <Microscope className="w-5 h-5" />
    },
    {
      title: "Evidence-Based Practice",
      content: "Our research is grounded in scientific rigor and empirical evidence. We follow established protocols for data collection, analysis, and interpretation to ensure validity and reliability of our findings.",
      icon: <Target className="w-5 h-5" />
    },
    {
      title: "Community Engagement",
      content: "We actively involve community members in the research process, ensuring cultural relevance and practical applicability. This participatory approach enhances the impact and sustainability of our research outcomes.",
      icon: <Users className="w-5 h-5" />
    },
    {
      title: "Innovative Design",
      content: "We employ cutting-edge research methodologies and technologies to address complex psychological questions. Our innovative approaches allow us to explore new frontiers in mental health research.",
      icon: <Lightbulb className="w-5 h-5" />
    }
  ];

  const researchAreas = [
    {
      title: "Clinical Psychology",
      description: "Evidence-based interventions and therapeutic approaches for mental health challenges.",
      icon: Heart,
      color: "text-red-600"
    },
    {
      title: "Cultural Psychology",
      description: "Exploring how culture influences psychological processes and mental wellbeing.",
      icon: Globe,
      color: "text-blue-600"
    },
    {
      title: "Community Mental Health",
      description: "Promoting mental health at the community level through prevention and intervention programs.",
      icon: Users,
      color: "text-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-shell py-8">
        <div className="flex gap-8">
          <ResearchHubSidebar />
          
          <div className="flex-1 space-y-16">
            {/* Hero Section */}
            <HeroSection />

            {/* Quick Overview Cards */}
            <section>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl mb-3">🧠</div>
                  <h3 className="font-semibold mb-2">Purpose</h3>
                  <p className="text-sm text-muted-foreground">Advancing culturally-grounded psychological science</p>
                </Card>
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl mb-3">🔬</div>
                  <h3 className="font-semibold mb-2">Methodology</h3>
                  <p className="text-sm text-muted-foreground">Mixed-methods with community engagement</p>
                </Card>
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl mb-3">🌍</div>
                  <h3 className="font-semibold mb-2">Impact</h3>
                  <p className="text-sm text-muted-foreground">Real-world applications for mental health</p>
                </Card>
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl mb-3">🤝</div>
                  <h3 className="font-semibold mb-2">Collaboration</h3>
                  <p className="text-sm text-muted-foreground">Partnerships with global research networks</p>
                </Card>
              </div>
            </section>

            {/* Research Philosophy */}
            <section className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Research Philosophy</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our approach is rooted in cultural relevance and scientific rigor
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <IconCard
                  title="Evidence-Based"
                  description="Grounded in scientific research and empirical data"
                  icon={Target}
                  color="text-blue-600"
                />
                <IconCard
                  title="Cultural Relevance"
                  description="Respecting indigenous knowledge and local contexts"
                  icon={Globe}
                  color="text-purple-600"
                />
                <IconCard
                  title="Real-World Application"
                  description="Translating research into practical solutions"
                  icon={Heart}
                  color="text-green-600"
                />
                <IconCard
                  title="Interdisciplinary"
                  description="Integrating diverse perspectives and methods"
                  icon={Brain}
                  color="text-orange-600"
                />
              </div>
            </section>

            {/* Interactive Methodology */}
            <section className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Research Methodology</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Click to explore our methodological approaches
                </p>
              </div>
              
              <Accordion items={methodologyItems} className="max-w-4xl mx-auto" />
            </section>

            {/* Visual Impact Stats */}
            <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Research Impact</h2>
                <p className="text-muted-foreground">Measurable outcomes from our research initiatives</p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-3">
                <StatCard 
                  value="25+" 
                  label="Research Projects" 
                  icon={Target}
                  color="text-blue-600"
                />
                <StatCard 
                  value="50+" 
                  label="Publications" 
                  icon={Brain}
                  color="text-purple-600"
                />
                <StatCard 
                  value="1000+" 
                  label="People Impacted" 
                  icon={Users}
                  color="text-teal-600"
                />
              </div>
            </section>

            {/* Core Research Areas */}
            <section className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Core Research Areas</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our primary focus areas in psychological research
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-3">
                {researchAreas.map((area, index) => (
                  <IconCard
                    key={index}
                    title={area.title}
                    description={area.description}
                    icon={area.icon}
                    color={area.color}
                  />
                ))}
              </div>
            </section>

            {/* Ethics & Standards */}
            <section className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Ethics & Standards</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Committed to highest ethical standards in research
                </p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">IRB Approved</h3>
                  <p className="text-sm text-muted-foreground">All studies reviewed and approved</p>
                </Card>
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Informed Consent</h3>
                  <p className="text-sm text-muted-foreground">Voluntary participation guaranteed</p>
                </Card>
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
                  <Lock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Confidentiality</h3>
                  <p className="text-sm text-muted-foreground">Data protection and privacy</p>
                </Card>
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
                  <Eye className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Transparency</h3>
                  <p className="text-sm text-muted-foreground">Open and honest research practices</p>
                </Card>
              </div>
            </section>

            {/* Collaboration CTA */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <div className="text-center space-y-6">
                <h2 className="text-3xl font-bold">Join Our Research Community</h2>
                <p className="text-lg max-w-2xl mx-auto opacity-90">
                  Collaborate with us and contribute to impactful studies that advance psychological science and improve lives.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 border-0 px-8"
                  >
                    <Link href="/contact" className="flex items-center">
                      Get Involved
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600 px-8"
                  >
                    <Link href="/contact" className="flex items-center">
                      Contact Us
                      <Mail className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </section>

            {/* Minimal Footer */}
            <footer className="border-t pt-8">
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="font-semibold mb-3">Stay Updated</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Subscribe to our research newsletter for latest updates
                  </p>
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Subscribe
                  </Button>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Quick Links</h3>
                  <div className="space-y-2">
                    <Link href="/research-hub/projects" className="block text-sm text-muted-foreground hover:text-foreground">
                      Research Projects
                    </Link>
                    <Link href="/research-hub/publications" className="block text-sm text-muted-foreground hover:text-foreground">
                      Publications
                    </Link>
                    <Link href="/contact" className="block text-sm text-muted-foreground hover:text-foreground">
                      Contact
                    </Link>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Connect</h3>
                  <div className="space-y-2">
                    <Link href="https://scholar.google.com/citations?user=nBzSCvUAAAAJ&hl=en" className="block text-sm text-muted-foreground hover:text-foreground">
                      Google Scholar
                    </Link>
                    <Link href="/admin" className="block text-sm text-muted-foreground hover:text-foreground">
                      Research Portal
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
