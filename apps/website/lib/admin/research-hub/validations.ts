import { z } from 'zod';

// Base content schema
const baseContentSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  slug: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']),
  featured: z.boolean().default(false),
  seo: z.object({
    title: z.string().min(1, 'SEO title is required').max(60, 'SEO title must be less than 60 characters'),
    description: z.string().min(1, 'SEO description is required').max(160, 'SEO description must be less than 160 characters'),
    keywords: z.array(z.string()).default([]),
  }),
});

// Project schema
export const projectSchema = baseContentSchema.extend({
  shortDescription: z.string().min(1, 'Short description is required').max(500, 'Short description must be less than 500 characters'),
  fullDescription: z.string().min(1, 'Full description is required'),
  category: z.array(z.string()).min(1, 'At least one category is required'),
  countries: z.array(z.string()).min(1, 'At least one country is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  sampleSize: z.number().int().positive().optional(),
  funding: z.object({
    body: z.string().min(1, 'Funding body is required'),
    amount: z.string().optional(),
    currency: z.string().default('USD'),
  }),
  leadResearcher: z.string().min(1, 'Lead researcher is required'),
  collaborators: z.array(z.string()).default([]),
  methodology: z.string().min(1, 'Methodology is required'),
  keyFindings: z.array(z.string()).default([]),
  outputs: z.array(z.string()).default([]),
  relatedPublications: z.array(z.string()).default([]),
  externalLinks: z.array(z.object({
    title: z.string().min(1, 'Link title is required'),
    url: z.string().url('Please enter a valid URL'),
  })).default([]),
  featuredImage: z.string().optional(),
  gallery: z.array(z.string()).default([]),
  displayOrder: z.number().int().min(0).default(0),
});

// Team member schema
export const teamMemberSchema = baseContentSchema.extend({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  role: z.string().min(1, 'Role is required').max(100, 'Role must be less than 100 characters'),
  institution: z.string().min(1, 'Institution is required').max(200, 'Institution must be less than 200 characters'),
  country: z.string().min(1, 'Country is required'),
  bio: z.string().min(1, 'Bio is required').max(1000, 'Bio must be less than 1000 characters'),
  expertise: z.array(z.string()).min(1, 'At least one area of expertise is required'),
  avatar: z.string().optional(),
  links: z.object({
    orcid: z.string().optional(),
    googleScholar: z.string().optional(),
    researchGate: z.string().optional(),
    website: z.string().url('Please enter a valid website URL').optional(),
    email: z.string().email('Please enter a valid email address').optional(),
  }),
});

// Collaborator schema
export const collaboratorSchema = baseContentSchema.extend({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  role: z.string().min(1, 'Role is required').max(100, 'Role must be less than 100 characters'),
  institution: z.string().min(1, 'Institution is required').max(200, 'Institution must be less than 200 characters'),
  country: z.string().min(1, 'Country is required'),
  bio: z.string().min(1, 'Bio is required').max(1000, 'Bio must be less than 1000 characters'),
  expertise: z.array(z.string()).min(1, 'At least one area of expertise is required'),
  links: z.object({
    website: z.string().url('Please enter a valid website URL').optional(),
    orcid: z.string().optional(),
    googleScholar: z.string().optional(),
    researchGate: z.string().optional(),
  }),
});

// Activity schema
export const activitySchema = baseContentSchema.extend({
  type: z.enum(['conference', 'publication', 'media', 'workshop', 'talk']),
  date: z.string().min(1, 'Date is required'),
  endDate: z.string().optional(),
  location: z.string().optional(),
  description: z.string().min(1, 'Description is required').max(1000, 'Description must be less than 1000 characters'),
  externalUrl: z.string().url('Please enter a valid URL').optional(),
  mediaType: z.enum(['video', 'audio', 'image', 'document']).optional(),
  fileUrl: z.string().optional(),
  presenter: z.string().optional(),
  institution: z.string().optional(),
});

// Award schema
export const awardSchema = baseContentSchema.extend({
  issuingBody: z.string().min(1, 'Issuing body is required').max(200, 'Issuing body must be less than 200 characters'),
  year: z.string().min(4, 'Year must be at least 4 characters').max(4, 'Year must be exactly 4 characters'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
  significance: z.enum(['high', 'medium', 'low']),
  url: z.string().url('Please enter a valid URL').optional(),
  category: z.string().min(1, 'Category is required'),
});

// Grant schema
export const grantSchema = baseContentSchema.extend({
  issuingBody: z.string().min(1, 'Issuing body is required').max(200, 'Issuing body must be less than 200 characters'),
  amount: z.string().min(1, 'Amount is required'),
  currency: z.string().default('USD'),
  year: z.string().min(4, 'Year must be at least 4 characters').max(4, 'Year must be exactly 4 characters'),
  grantStatus: z.enum(['active', 'completed', 'pending']),
  description: z.string().min(1, 'Description is required').max(1000, 'Description must be less than 1000 characters'),
  project: z.string().optional(),
  duration: z.string().optional(),
});

// Community engagement schema
export const communityEngagementSchema = baseContentSchema.extend({
  type: z.enum(['research', 'collaboration', 'community']),
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().min(1, 'Description is required').max(1000, 'Description must be less than 1000 characters'),
  requirements: z.array(z.string()).min(1, 'At least one requirement is required'),
  duration: z.string().optional(),
  compensation: z.string().optional(),
  contactEmail: z.string().email('Please enter a valid email address').optional(),
  applicationUrl: z.string().url('Please enter a valid URL').optional(),
});

// Testimonial schema
export const testimonialSchema = baseContentSchema.extend({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  role: z.string().min(1, 'Role is required').max(100, 'Role must be less than 100 characters'),
  institution: z.string().optional(),
  quote: z.string().min(1, 'Quote is required').max(500, 'Quote must be less than 500 characters'),
  rating: z.number().int().min(1).max(5),
  context: z.string().optional(),
  avatar: z.string().optional(),
});

// Media item schema
export const mediaItemSchema = baseContentSchema.extend({
  type: z.enum(['image', 'video', 'audio', 'document']),
  fileUrl: z.string().min(1, 'File URL is required'),
  fileSize: z.number().int().positive(),
  mimeType: z.string().min(1, 'MIME type is required'),
  dimensions: z.object({
    width: z.number().int().positive(),
    height: z.number().int().positive(),
  }).optional(),
  duration: z.number().int().positive().optional(),
  alt: z.string().optional(),
  caption: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

// Lab info schema
export const labInfoSchema = z.object({
  name: z.string().min(1, 'Lab name is required'),
  shortName: z.string().min(1, 'Short name is required'),
  tagline: z.string().min(1, 'Tagline is required'),
  positioning: z.string().min(1, 'Positioning is required'),
  description: z.string().min(1, 'Description is required'),
  mission: z.string().min(1, 'Mission is required'),
  vision: z.string().min(1, 'Vision is required'),
  values: z.array(z.object({
    title: z.string().min(1, 'Value title is required'),
    description: z.string().min(1, 'Value description is required'),
    icon: z.string().min(1, 'Icon is required'),
  })),
  director: z.object({
    name: z.string().min(1, 'Director name is required'),
    title: z.string().min(1, 'Director title is required'),
    institution: z.string().min(1, 'Institution is required'),
    credentials: z.array(z.string()),
    bio: z.string().min(1, 'Bio is required'),
    expertise: z.array(z.string()),
  }),
  focusAreas: z.array(z.object({
    title: z.string().min(1, 'Focus area title is required'),
    description: z.string().min(1, 'Focus area description is required'),
    icon: z.string().min(1, 'Icon is required'),
    color: z.string().min(1, 'Color is required'),
  })),
  internationalPartners: z.array(z.object({
    country: z.string().min(1, 'Country is required'),
    institution: z.string().min(1, 'Institution is required'),
    role: z.string().min(1, 'Role is required'),
  })),
});

// Form schemas for create/update operations
export const createProjectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  slug: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']),
  featured: z.boolean().default(false),
  seo: z.object({
    title: z.string().min(1, 'SEO title is required').max(60, 'SEO title must be less than 60 characters'),
    description: z.string().min(1, 'SEO description is required').max(160, 'SEO description must be less than 160 characters'),
    keywords: z.array(z.string()).default([]),
  }),
  shortDescription: z.string().min(1, 'Short description is required').max(500, 'Short description must be less than 500 characters'),
  fullDescription: z.string().min(1, 'Full description is required'),
  category: z.array(z.string()).min(1, 'At least one category is required'),
  countries: z.array(z.string()).min(1, 'At least one country is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  sampleSize: z.number().int().positive().optional(),
  funding: z.object({
    body: z.string().min(1, 'Funding body is required'),
    amount: z.string().optional(),
    currency: z.string().default('USD'),
  }),
  leadResearcher: z.string().min(1, 'Lead researcher is required'),
  collaborators: z.array(z.string()).default([]),
  methodology: z.string().min(1, 'Methodology is required'),
  keyFindings: z.array(z.string()).default([]),
  outputs: z.array(z.string()).default([]),
  relatedPublications: z.array(z.string()).default([]),
  externalLinks: z.array(z.object({
    title: z.string().min(1, 'Link title is required'),
    url: z.string().url('Please enter a valid URL'),
  })).default([]),
  featuredImage: z.string().optional(),
  gallery: z.array(z.string()).default([]),
  displayOrder: z.number().int().min(0).default(0),
});

export const updateProjectSchema = projectSchema.partial().extend({
  id: z.string().min(1, 'Project ID is required'),
});

export const createTeamMemberSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  slug: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']),
  featured: z.boolean().default(false),
  seo: z.object({
    title: z.string().min(1, 'SEO title is required').max(60, 'SEO title must be less than 60 characters'),
    description: z.string().min(1, 'SEO description is required').max(160, 'SEO description must be less than 160 characters'),
    keywords: z.array(z.string()).default([]),
  }),
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  role: z.string().min(1, 'Role is required').max(100, 'Role must be less than 100 characters'),
  institution: z.string().min(1, 'Institution is required').max(200, 'Institution must be less than 200 characters'),
  country: z.string().min(1, 'Country is required'),
  bio: z.string().min(1, 'Bio is required').max(1000, 'Bio must be less than 1000 characters'),
  expertise: z.array(z.string()).min(1, 'At least one area of expertise is required'),
  avatar: z.string().optional(),
  links: z.object({
    orcid: z.string().optional(),
    googleScholar: z.string().optional(),
    researchGate: z.string().optional(),
    website: z.string().url('Please enter a valid website URL').optional(),
    email: z.string().email('Please enter a valid email address').optional(),
  }),
});

export const updateTeamMemberSchema = teamMemberSchema.partial().extend({
  id: z.string().min(1, 'Team member ID is required'),
});

export const createActivitySchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  slug: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']),
  featured: z.boolean().default(false),
  seo: z.object({
    title: z.string().min(1, 'SEO title is required').max(60, 'SEO title must be less than 60 characters'),
    description: z.string().min(1, 'SEO description is required').max(160, 'SEO description must be less than 160 characters'),
    keywords: z.array(z.string()).default([]),
  }),
  type: z.enum(['conference', 'publication', 'media', 'workshop', 'talk']),
  date: z.string().min(1, 'Date is required'),
  endDate: z.string().optional(),
  location: z.string().optional(),
  description: z.string().min(1, 'Description is required').max(1000, 'Description must be less than 1000 characters'),
  externalUrl: z.string().url('Please enter a valid URL').optional(),
  mediaType: z.enum(['video', 'audio', 'image', 'document']).optional(),
  fileUrl: z.string().optional(),
  presenter: z.string().optional(),
  institution: z.string().optional(),
});

export const updateActivitySchema = activitySchema.partial().extend({
  id: z.string().min(1, 'Activity ID is required'),
});

export const createAwardSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  slug: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']),
  featured: z.boolean().default(false),
  seo: z.object({
    title: z.string().min(1, 'SEO title is required').max(60, 'SEO title must be less than 60 characters'),
    description: z.string().min(1, 'SEO description is required').max(160, 'SEO description must be less than 160 characters'),
    keywords: z.array(z.string()).default([]),
  }),
  issuingBody: z.string().min(1, 'Issuing body is required').max(200, 'Issuing body must be less than 200 characters'),
  year: z.string().min(4, 'Year must be at least 4 characters').max(4, 'Year must be exactly 4 characters'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
  significance: z.enum(['high', 'medium', 'low']),
  url: z.string().url('Please enter a valid URL').optional(),
  category: z.string().min(1, 'Category is required'),
});

export const updateAwardSchema = awardSchema.partial().extend({
  id: z.string().min(1, 'Award ID is required'),
});

export const createGrantSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  slug: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']),
  featured: z.boolean().default(false),
  seo: z.object({
    title: z.string().min(1, 'SEO title is required').max(60, 'SEO title must be less than 60 characters'),
    description: z.string().min(1, 'SEO description is required').max(160, 'SEO description must be less than 160 characters'),
    keywords: z.array(z.string()).default([]),
  }),
  issuingBody: z.string().min(1, 'Issuing body is required').max(200, 'Issuing body must be less than 200 characters'),
  amount: z.string().min(1, 'Amount is required'),
  currency: z.string().default('USD'),
  year: z.string().min(4, 'Year must be at least 4 characters').max(4, 'Year must be exactly 4 characters'),
  grantStatus: z.enum(['active', 'completed', 'pending']),
  description: z.string().min(1, 'Description is required').max(1000, 'Description must be less than 1000 characters'),
  project: z.string().optional(),
  duration: z.string().optional(),
});

export const updateGrantSchema = grantSchema.partial().extend({
  id: z.string().min(1, 'Grant ID is required'),
});

// Filter schemas
export const projectFiltersSchema = z.object({
  status: z.array(z.string()).optional(),
  category: z.array(z.string()).optional(),
  countries: z.array(z.string()).optional(),
  year: z.array(z.string()).optional(),
  fundingBody: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  search: z.string().optional(),
});

export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// Type exports
export type CreateProjectData = z.infer<typeof createProjectSchema>;
export type UpdateProjectData = z.infer<typeof updateProjectSchema>;
export type CreateTeamMemberData = z.infer<typeof createTeamMemberSchema>;
export type UpdateTeamMemberData = z.infer<typeof updateTeamMemberSchema>;
export type ProjectFilters = z.infer<typeof projectFiltersSchema>;
export type PaginationOptions = z.infer<typeof paginationSchema>;
