import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata("Home", undefined, "/");
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Current Version */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Stephen <br />Asatsa, PhD
                </h1>
                <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed">
                  is a senior Lecturer and Head of Department of Psychology at Catholic University of Eastern Africa with extensive experience in academic strategy and research. Proven track record as a Lecturer of Psychology, excelling in teaching, research, and student mentorship.
                </p>
              </div>
              
              {/* Action Buttons - Current Layout */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Link href="#who-we-are">
                    Read More
                  </Link>
                </Button>
                
                <Button 
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 flex items-center gap-2"
                >
                  <Link href="/Stephen_Asatsa-CV-2025.pdf" target="_blank" rel="noopener noreferrer">
                    DOWNLOAD CV
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Right Column - Profile Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/stephen-asatsa-profile.jpg"
                  alt="Dr. Stephen Asatsa"
                  className="w-full h-auto object-cover"
                  width={600}
                  height={800}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section - Current Content */}
      <section id="who-we-are" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">Who We Are</h2>
              <div className="text-lg text-slate-700 leading-relaxed space-y-4">
                <p>
                  Dr. Stephen is a senior Lecturer and Head of Department of Psychology at Catholic University of Eastern Africa with extensive experience in academic strategy and research. Proven track record as a Lecturer of Psychology, excelling in teaching, research, and student mentorship. He is an experienced Consultant Psychologist registered and licensed by Kenya Counselors and Psychologists Board and co-founder of{' '}
                  <a 
                    href="https://beautifulmind.cc/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-semibold underline"
                  >
                    BeautifulMind Consultants
                  </a>
                  , a Kenyan mental health social enterprise.
                </p>
                <p>
                  He serves on governing Council{' '}
                  <a 
                    href="https://www.srcd.org/about-us/who-we-are/governing-council" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-semibold underline"
                  >
                    Society for Research in Child Development-SRCD
                  </a>
                  . He is Africa regional representative for{' '}
                  <a 
                    href="https://eapp.org/organization/regional-promoters/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-semibold underline"
                  >
                    European Association of Personality Psychology- EAPP
                  </a>
                  . He is e-newsletter editor for{' '}
                  <a 
                    href="https://issbd.org/publications-2/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-semibold underline"
                  >
                    International Society for Study of Behavioral Development- ISSBD
                  </a>
                  . A review editor for{' '}
                  <a 
                    href="https://loop.frontiersin.org/people/828729/editorial" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-semibold underline"
                  >
                    <em>Frontiers in Psychology</em> and <em>Frontiers in Reproductive Health</em>
                  </a>
                  . His research interests span from Indigenous knowledge systems, Decolonization of Psychology, Thanatology and Cultural evolution. He is a strong advocate for indigenization of psychological practice.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/images/stephen-asatsa-research.jpg"
                  alt="Dr. Stephen Asatsa Research & Publications International Awards"
                  className="w-full h-auto object-cover"
                  width={600}
                  height={800}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Current Design */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Gallery</h2>
            <blockquote className="text-xl text-slate-700 italic max-w-3xl mx-auto">
              <p className="font-semibold">"We are all in gutter, but some of us are looking at the stars."</p>
              <p className="mt-2">Everyone has problems to deal with, but people who are mesmerized by beauty of their dreams are ones who actually live life to the fullest.</p>
              <footer className="mt-4 text-slate-600">– Oscar Wilde</footer>
            </blockquote>
          </div>
          
          {/* Gallery Grid - Current Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src="/images/gallery-1.jpg"
                alt="Gallery image 1"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
            </div>
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src="/images/gallery-2.jpg"
                alt="Gallery image 2"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
            </div>
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src="/images/gallery-3.jpg"
                alt="Gallery image 3"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
            </div>
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src="/images/gallery-4.jpg"
                alt="Gallery image 4"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
            </div>
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src="/images/gallery-5.jpg"
                alt="Gallery image 5"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
            </div>
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src="/images/gallery-6.jpg"
                alt="Gallery image 6"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
