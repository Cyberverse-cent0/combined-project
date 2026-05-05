"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ResearchHubSidebar } from "./research-hub-sidebar";
import { ResearchHubHeader } from "./research-hub-header";
import { cn } from "@/lib/utils";

interface ResearchHubLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function ResearchHubLayout({ children, title }: ResearchHubLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (!session) {
      router.push('/admin-signup');
      return;
    }
    
    try {
      const parsed = JSON.parse(session);
      const sessionAge = Date.now() - parsed.timestamp;
      if (sessionAge > 24 * 60 * 60 * 1000) {
        localStorage.removeItem('userSession');
        localStorage.removeItem('authToken');
        router.push('/admin-signup');
        return;
      }
    } catch {
      localStorage.removeItem('userSession');
      localStorage.removeItem('authToken');
      router.push('/admin-signup');
      return;
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const sidebar = document.getElementById('research-hub-sidebar');
      
      if (sidebarOpen && sidebar && !sidebar.contains(target)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Close sidebar on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#0F766E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Research Hub Admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        id="research-hub-sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <ResearchHubSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="lg:ml-72">
        {/* Header */}
        <ResearchHubHeader 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          title={title}
        />

        {/* Page content */}
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
