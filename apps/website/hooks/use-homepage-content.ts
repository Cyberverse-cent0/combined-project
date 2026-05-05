"use client";

import { useState, useEffect } from 'react';

// Types for homepage content
export interface HeroContent {
  id: string;
  name: string;
  titles: string[];
  tagline: string;
  primaryCta: {
    label: string;
    url: string;
  };
  secondaryCta: {
    label: string;
    url: string;
  };
  backgroundImage: string;
  profileImage: string;
  stats: {
    yearsExperience: string;
    clientsHelped: string;
    publications: string;
  };
  trustBadges: {
    credentials: {
      title: string;
      description: string;
      badges: string[];
    };
    contact: {
      phone: string;
      email: string;
      availability: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface AboutContent {
  id: string;
  fullBiography: string;
  shortSummary: string;
  highlights: string[];
  profileImage: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  bulletPoints: string[];
  icon: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  status: 'active' | 'ongoing' | 'completed';
  description: string;
  tags: string[];
  link?: string;
  file?: string;
  order: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StatisticItem {
  id: string;
  label: string;
  value: string;
  description?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  message: string;
  image?: string;
  rating: number;
  isVisible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface AffiliationItem {
  id: string;
  organizationName: string;
  role: string;
  description: string;
  externalLink?: string;
  logo?: string;
  order: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactInfo {
  id: string;
  phones: string[];
  emails: string[];
  address: string;
  workingHours: string;
  socialLinks: {
    platform: string;
    url: string;
    icon: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface NewsletterContent {
  id: string;
  title: string;
  description: string;
  buttonLabel: string;
  placeholder: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FooterContent {
  id: string;
  copyright: string;
  quickLinks: {
    label: string;
    url: string;
  }[];
  socialLinks: {
    platform: string;
    url: string;
    icon: string;
  }[];
  additionalInfo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HomepageContent {
  hero: HeroContent;
  about: AboutContent;
  services: ServiceItem[];
  research: ResearchItem[];
  statistics: StatisticItem[];
  testimonials: TestimonialItem[];
  affiliations: AffiliationItem[];
  contact: ContactInfo;
  newsletter: NewsletterContent;
  footer: FooterContent;
}

// Hook to fetch homepage content
export function useHomepageContent(section?: keyof HomepageContent) {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const url = section ? `/api/content?section=${section}` : '/api/content';
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        
        const data = await response.json();
        
        if (section) {
          setContent(data[section]);
        } else {
          setContent(data);
        }
      } catch (err) {
        console.error('Error fetching homepage content:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [section]);

  return { content, loading, error };
}

// Hook to update homepage content
export function useUpdateHomepageContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateContent = async (section: keyof HomepageContent, data: any) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ section, data }),
      });

      if (!response.ok) {
        throw new Error('Failed to update content');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      console.error('Error updating homepage content:', err);
      setError(err instanceof Error ? err.message : 'Failed to update content');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateContent, loading, error };
}

// Hook to add new content item
export function useAddContentItem() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addItem = async (section: keyof HomepageContent, item: any) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ section, item }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      console.error('Error adding content item:', err);
      setError(err instanceof Error ? err.message : 'Failed to add item');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addItem, loading, error };
}

// Hook to delete content item
export function useDeleteContentItem() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteItem = async (section: keyof HomepageContent, id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/content?section=${section}&id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      console.error('Error deleting content item:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete item');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteItem, loading, error };
}
