// Homepage Content Types for Admin Management

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
