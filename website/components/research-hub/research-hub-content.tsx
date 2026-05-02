// Research Hub Content Types and Interfaces

export interface ResearchHubOverview {
  title: string;
  description: string;
  researchInterests: string[];
  currentFocus: string[];
}

export interface ManagedProject {
  id: string;
  title: string;
  description: string;
  status: 'ongoing' | 'completed' | 'planned';
  startDate: string;
  endDate?: string;
  collaborators: string[];
  funding?: string;
  publications: string[];
  tags: string[];
}

export interface ManagedPublication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  type: 'journal' | 'conference' | 'book' | 'chapter';
  abstract: string;
  tags: string[];
}

export interface ManagedGrant {
  id: string;
  title: string;
  agency: string;
  amount: number;
  currency: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'pending';
  investigators: string[];
  abstract: string;
  tags: string[];
}

export interface ManagedTalk {
  id: string;
  title: string;
  event: string;
  location: string;
  date: string;
  type: 'keynote' | 'invited' | 'contributed';
  abstract?: string;
  slides?: string;
  tags: string[];
}

export interface ManagedAward {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  value?: string;
  tags: string[];
}

export interface ManagedMedia {
  id: string;
  title: string;
  type: 'news' | 'blog' | 'podcast' | 'video' | 'interview';
  source: string;
  date: string;
  url: string;
  description: string;
  tags: string[];
}

export interface ResearchHubSiteContent {
  overview: ResearchHubOverview;
  projects: ManagedProject[];
  publications: ManagedPublication[];
  grants: ManagedGrant[];
  talks: ManagedTalk[];
  awards: ManagedAward[];
  media: ManagedMedia[];
}

// Fallback content for initial setup
export function getFallbackSiteContent(): ResearchHubSiteContent {
  return {
    overview: {
      title: "Research Hub",
      description: "A comprehensive overview of research activities and achievements",
      researchInterests: ["Machine Learning", "Data Science", "Artificial Intelligence"],
      currentFocus: ["Deep Learning", "Natural Language Processing", "Computer Vision"]
    },
    projects: [],
    publications: [],
    grants: [],
    talks: [],
    awards: [],
    media: []
  };
}

// Content management functions
export function validateResearchHubContent(content: any): content is ResearchHubSiteContent {
  return (
    content &&
    typeof content === 'object' &&
    content.overview &&
    Array.isArray(content.projects) &&
    Array.isArray(content.publications) &&
    Array.isArray(content.grants) &&
    Array.isArray(content.talks) &&
    Array.isArray(content.awards) &&
    Array.isArray(content.media)
  );
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Normalize functions for data validation and transformation
export function normalizeOverview(data: any): ResearchHubOverview {
  return {
    title: data.title || "Research Overview",
    description: data.description || "",
    researchInterests: Array.isArray(data.researchInterests) ? data.researchInterests : [],
    currentFocus: Array.isArray(data.currentFocus) ? data.currentFocus : []
  };
}

export function normalizeProjects(data: any[]): ManagedProject[] {
  return (data || []).map(project => ({
    id: project.id || generateId(),
    title: project.title || "",
    description: project.description || "",
    status: project.status || "planned",
    startDate: project.startDate || "",
    endDate: project.endDate,
    collaborators: Array.isArray(project.collaborators) ? project.collaborators : [],
    funding: project.funding,
    publications: Array.isArray(project.publications) ? project.publications : [],
    tags: Array.isArray(project.tags) ? project.tags : []
  }));
}

export function normalizePublications(data: any[]): ManagedPublication[] {
  return (data || []).map(pub => ({
    id: pub.id || generateId(),
    title: pub.title || "",
    authors: Array.isArray(pub.authors) ? pub.authors : [],
    journal: pub.journal || "",
    year: pub.year || new Date().getFullYear(),
    volume: pub.volume,
    issue: pub.issue,
    pages: pub.pages,
    doi: pub.doi,
    type: pub.type || "journal",
    abstract: pub.abstract || "",
    tags: Array.isArray(pub.tags) ? pub.tags : []
  }));
}

export function normalizeGrants(data: any[]): ManagedGrant[] {
  return (data || []).map(grant => ({
    id: grant.id || generateId(),
    title: grant.title || "",
    agency: grant.agency || "",
    amount: grant.amount || 0,
    currency: grant.currency || "USD",
    startDate: grant.startDate || "",
    endDate: grant.endDate || "",
    status: grant.status || "pending",
    investigators: Array.isArray(grant.investigators) ? grant.investigators : [],
    abstract: grant.abstract || "",
    tags: Array.isArray(grant.tags) ? grant.tags : []
  }));
}

export function normalizeTalks(data: any[]): ManagedTalk[] {
  return (data || []).map(talk => ({
    id: talk.id || generateId(),
    title: talk.title || "",
    event: talk.event || "",
    location: talk.location || "",
    date: talk.date || "",
    type: talk.type || "contributed",
    abstract: talk.abstract,
    slides: talk.slides,
    tags: Array.isArray(talk.tags) ? talk.tags : []
  }));
}

export function normalizeAwards(data: any[]): ManagedAward[] {
  return (data || []).map(award => ({
    id: award.id || generateId(),
    title: award.title || "",
    organization: award.organization || "",
    date: award.date || "",
    description: award.description || "",
    value: award.value,
    tags: Array.isArray(award.tags) ? award.tags : []
  }));
}

export function normalizeMedia(data: any[]): ManagedMedia[] {
  return (data || []).map(media => ({
    id: media.id || generateId(),
    title: media.title || "",
    type: media.type || "news",
    source: media.source || "",
    date: media.date || "",
    url: media.url || "",
    description: media.description || "",
    tags: Array.isArray(media.tags) ? media.tags : []
  }));
}

// Serialize functions for data storage
export function serializeOverview(overview: ResearchHubOverview): any {
  return overview;
}

export function serializeProjects(projects: ManagedProject[]): any[] {
  return projects;
}

export function serializePublications(publications: ManagedPublication[]): any[] {
  return publications;
}

export function serializeGrants(grants: ManagedGrant[]): any[] {
  return grants;
}

export function serializeTalks(talks: ManagedTalk[]): any[] {
  return talks;
}

export function serializeAwards(awards: ManagedAward[]): any[] {
  return awards;
}

export function serializeMedia(media: ManagedMedia[]): any[] {
  return media;
}
