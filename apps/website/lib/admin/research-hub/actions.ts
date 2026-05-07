"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import * as fs from "fs/promises";
import * as path from "path";
import { 
  createProjectSchema, 
  updateProjectSchema,
  createTeamMemberSchema,
  updateTeamMemberSchema,
  createActivitySchema,
  updateActivitySchema,
  createAwardSchema,
  updateAwardSchema,
  createGrantSchema,
  updateGrantSchema
} from "./validations";
import type { 
  Project, 
  TeamMember, 
  Activity, 
  Award, 
  Grant,
  CreateProjectData,
  UpdateProjectData,
  CreateTeamMemberData,
  UpdateTeamMemberData,
  ApiResponse 
} from "./types";
import { generateId, generateSlug } from "./utils";

// Base file paths
const CONTENT_DIR = path.join(process.cwd(), "lib", "content", "research-hub");

// Utility functions for file operations
async function readJsonFile<T>(filename: string): Promise<T[]> {
  try {
    const filePath = path.join(CONTENT_DIR, filename);
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
}

async function writeJsonFile<T>(filename: string, data: T[]): Promise<void> {
  try {
    const filePath = path.join(CONTENT_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    throw error;
  }
}

async function ensureContentDir(): Promise<void> {
  try {
    await fs.access(CONTENT_DIR);
  } catch {
    await fs.mkdir(CONTENT_DIR, { recursive: true });
  }
}

// Activity logging
async function logActivity(
  action: string,
  entityType: string,
  entityId: string,
  entityTitle: string,
  userId: string = "admin"
): Promise<void> {
  // TODO: Implement activity logging
  console.log(`Activity: ${action} ${entityType} ${entityId} - ${entityTitle} by ${userId}`);
}

// Project Actions
export async function createProject(data: CreateProjectData): Promise<ApiResponse<Project>> {
  try {
    // Validate input
    const validated = createProjectSchema.parse(data);
    
    // Ensure content directory exists
    await ensureContentDir();
    
    // Read existing projects
    const projects = await readJsonFile<Project>("projects.json");
    
    // Generate slug if not provided
    const slug = validated.slug || generateSlug(validated.title);
    
    // Check for duplicate slug
    const existingSlug = projects.find(p => p.slug === slug);
    if (existingSlug) {
      return {
        success: false,
        error: "A project with this slug already exists"
      };
    }
    
    // Create new project
    const newProject: Project = {
      id: generateId(),
      slug,
      title: validated.title,
      status: validated.status || 'draft',
      featured: validated.featured || false,
      seo: (validated.seo || {
        title: validated.title,
        description: validated.shortDescription,
        keywords: (validated.seo as any)?.keywords || []
      }) as {
        title: string;
        description: string;
        keywords: string[];
      },
      shortDescription: validated.shortDescription,
      fullDescription: validated.fullDescription,
      category: validated.category,
      countries: validated.countries,
      startDate: validated.startDate,
      endDate: validated.endDate,
      sampleSize: validated.sampleSize,
      funding: {
        body: validated.funding.body,
        amount: validated.funding.amount,
        currency: validated.funding.currency || 'USD'
      },
      leadResearcher: validated.leadResearcher,
      collaborators: validated.collaborators || [],
      methodology: validated.methodology,
      keyFindings: validated.keyFindings || [],
      outputs: validated.outputs || [],
      relatedPublications: validated.relatedPublications || [],
      externalLinks: validated.externalLinks?.map(link => ({
        title: link.title,
        url: link.url
      })) || [],
      featuredImage: validated.featuredImage,
      gallery: validated.gallery || [],
      displayOrder: validated.displayOrder || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "admin",
      updatedBy: "admin"
    };
    
    // Add to projects array
    projects.push(newProject);
    
    // Save to file
    await writeJsonFile("projects.json", projects);
    
    // Log activity
    await logActivity("create", "project", newProject.id, newProject.title);
    
    // Revalidate cache
    revalidatePath("/admin/research-hub/projects");
    revalidatePath("/research-hub");
    
    return {
      success: true,
      data: newProject
    };
  } catch (error) {
    console.error("Error creating project:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create project"
    };
  }
}

export async function updateProject(data: UpdateProjectData): Promise<ApiResponse<Project>> {
  try {
    // Validate input
    const validated = updateProjectSchema.parse(data);
    
    // Read existing projects
    const projects = await readJsonFile<Project>("projects.json");
    
    // Find project to update
    const projectIndex = projects.findIndex(p => p.id === validated.id);
    if (projectIndex === -1) {
      return {
        success: false,
        error: "Project not found"
      };
    }
    
    // Update project
    const updatedProject: Project = {
      ...projects[projectIndex],
      ...validated,
      funding: validated.funding ? {
        body: validated.funding.body,
        amount: validated.funding.amount,
        currency: validated.funding.currency || 'USD'
      } : projects[projectIndex].funding,
      externalLinks: validated.externalLinks?.map(link => ({
        title: link.title,
        url: link.url
      })) || projects[projectIndex].externalLinks,
      seo: validated.seo ? {
        title: validated.seo.title,
        description: validated.seo.description,
        keywords: validated.seo.keywords || []
      } : projects[projectIndex].seo,
      updatedAt: new Date().toISOString(),
      updatedBy: "admin"
    };
    
    // Update in array
    projects[projectIndex] = updatedProject;
    
    // Save to file
    await writeJsonFile("projects.json", projects);
    
    // Log activity
    await logActivity("update", "project", updatedProject.id, updatedProject.title);
    
    // Revalidate cache
    revalidatePath("/admin/research-hub/projects");
    revalidatePath("/research-hub");
    revalidatePath(`/research-hub/projects/${updatedProject.slug}`);
    
    return {
      success: true,
      data: updatedProject
    };
  } catch (error) {
    console.error("Error updating project:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update project"
    };
  }
}

export async function deleteProject(id: string): Promise<ApiResponse<null>> {
  try {
    // Read existing projects
    const projects = await readJsonFile<Project>("projects.json");
    
    // Find project to delete
    const projectIndex = projects.findIndex(p => p.id === id);
    if (projectIndex === -1) {
      return {
        success: false,
        error: "Project not found"
      };
    }
    
    const projectTitle = projects[projectIndex].title;
    
    // Remove from array
    projects.splice(projectIndex, 1);
    
    // Save to file
    await writeJsonFile("projects.json", projects);
    
    // Log activity
    await logActivity("delete", "project", id, projectTitle);
    
    // Revalidate cache
    revalidatePath("/admin/research-hub/projects");
    revalidatePath("/research-hub");
    
    return {
      success: true,
      data: null
    };
  } catch (error) {
    console.error("Error deleting project:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete project"
    };
  }
}

export async function getProjects(): Promise<ApiResponse<Project[]>> {
  try {
    const projects = await readJsonFile<Project>("projects.json");
    return {
      success: true,
      data: projects.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      success: false,
      error: "Failed to fetch projects"
    };
  }
}

export async function getProject(id: string): Promise<ApiResponse<Project>> {
  try {
    const projects = await readJsonFile<Project>("projects.json");
    const project = projects.find(p => p.id === id);
    
    if (!project) {
      return {
        success: false,
        error: "Project not found"
      };
    }
    
    return {
      success: true,
      data: project
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    return {
      success: false,
      error: "Failed to fetch project"
    };
  }
}

export async function getProjectBySlug(slug: string): Promise<ApiResponse<Project>> {
  try {
    const projects = await readJsonFile<Project>("projects.json");
    const project = projects.find(p => p.slug === slug);
    
    if (!project) {
      return {
        success: false,
        error: "Project not found"
      };
    }
    
    return {
      success: true,
      data: project
    };
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return {
      success: false,
      error: "Failed to fetch project"
    };
  }
}

// Team Member Actions
export async function createTeamMember(data: CreateTeamMemberData): Promise<ApiResponse<TeamMember>> {
  try {
    // Validate input
    const validated = createTeamMemberSchema.parse(data);
    
    // Ensure content directory exists
    await ensureContentDir();
    
    // Read existing team members
    const teamMembers = await readJsonFile<TeamMember>("team.json");
    
    // Generate slug if not provided
    const slug = validated.slug || generateSlug(validated.name);
    
    // Check for duplicate slug
    const existingSlug = teamMembers.find(m => m.slug === slug);
    if (existingSlug) {
      return {
        success: false,
        error: "A team member with this slug already exists"
      };
    }
    
    // Create new team member
    const newTeamMember: TeamMember = {
      id: generateId(),
      slug,
      title: validated.title,
      status: validated.status || 'draft',
      featured: validated.featured || false,
      seo: (validated.seo || {
        title: validated.title,
        description: validated.bio,
        keywords: (validated.seo as any)?.keywords || []
      }) as {
        title: string;
        description: string;
        keywords: string[];
      },
      name: validated.name,
      role: validated.role,
      institution: validated.institution,
      country: validated.country,
      bio: validated.bio,
      expertise: validated.expertise,
      avatar: validated.avatar,
      links: validated.links || {
        orcid: undefined,
        googleScholar: undefined,
        researchGate: undefined,
        website: undefined,
        email: undefined,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "admin",
      updatedBy: "admin"
    };
    
    // Add to team members array
    teamMembers.push(newTeamMember);
    
    // Save to file
    await writeJsonFile("team.json", teamMembers);
    
    // Log activity
    await logActivity("create", "team", newTeamMember.id, newTeamMember.name);
    
    // Revalidate cache
    revalidatePath("/admin/research-hub/team");
    revalidatePath("/research-hub/team");
    
    return {
      success: true,
      data: newTeamMember
    };
  } catch (error) {
    console.error("Error creating team member:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create team member"
    };
  }
}

export async function updateTeamMember(data: UpdateTeamMemberData): Promise<ApiResponse<TeamMember>> {
  try {
    // Validate input
    const validated = updateTeamMemberSchema.parse(data);
    
    // Read existing team members
    const teamMembers = await readJsonFile<TeamMember>("team.json");
    
    // Find team member to update
    const memberIndex = teamMembers.findIndex(m => m.id === validated.id);
    if (memberIndex === -1) {
      return {
        success: false,
        error: "Team member not found"
      };
    }
    
    // Update team member
    const updatedTeamMember: TeamMember = {
      ...teamMembers[memberIndex],
      ...validated,
      seo: validated.seo ? {
        title: validated.seo.title,
        description: validated.seo.description,
        keywords: validated.seo.keywords || []
      } : teamMembers[memberIndex].seo,
      updatedAt: new Date().toISOString(),
      updatedBy: "admin"
    };
    
    // Update in array
    teamMembers[memberIndex] = updatedTeamMember;
    
    // Save to file
    await writeJsonFile("team.json", teamMembers);
    
    // Log activity
    await logActivity("update", "team", updatedTeamMember.id, updatedTeamMember.name);
    
    // Revalidate cache
    revalidatePath("/admin/research-hub/team");
    revalidatePath("/research-hub/team");
    revalidatePath(`/research-hub/team/${updatedTeamMember.slug}`);
    
    return {
      success: true,
      data: updatedTeamMember
    };
  } catch (error) {
    console.error("Error updating team member:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update team member"
    };
  }
}

export async function deleteTeamMember(id: string): Promise<ApiResponse<null>> {
  try {
    // Read existing team members
    const teamMembers = await readJsonFile<TeamMember>("team.json");
    
    // Find team member to delete
    const memberIndex = teamMembers.findIndex(m => m.id === id);
    if (memberIndex === -1) {
      return {
        success: false,
        error: "Team member not found"
      };
    }
    
    const memberName = teamMembers[memberIndex].name;
    
    // Remove from array
    teamMembers.splice(memberIndex, 1);
    
    // Save to file
    await writeJsonFile("team.json", teamMembers);
    
    // Log activity
    await logActivity("delete", "team", id, memberName);
    
    // Revalidate cache
    revalidatePath("/admin/research-hub/team");
    revalidatePath("/research-hub/team");
    
    return {
      success: true,
      data: null
    };
  } catch (error) {
    console.error("Error deleting team member:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete team member"
    };
  }
}

export async function getTeamMembers(): Promise<ApiResponse<TeamMember[]>> {
  try {
    const teamMembers = await readJsonFile<TeamMember>("team.json");
    return {
      success: true,
      data: teamMembers.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    };
  } catch (error) {
    console.error("Error fetching team members:", error);
    return {
      success: false,
      error: "Failed to fetch team members"
    };
  }
}

// Activity Actions
export async function createActivity(data: z.infer<typeof createActivitySchema>): Promise<ApiResponse<Activity>> {
  try {
    // Validate input
    const validated = createActivitySchema.parse(data);
    
    // Ensure content directory exists
    await ensureContentDir();
    
    // Read existing activities
    const activities = await readJsonFile<Activity>("activities.json");
    
    // Generate slug if not provided
    const slug = validated.slug || generateSlug(validated.title);
    
    // Check for duplicate slug
    const existingSlug = activities.find(a => a.slug === slug);
    if (existingSlug) {
      return {
        success: false,
        error: "An activity with this slug already exists"
      };
    }
    
    // Create new activity
    const newActivity: Activity = {
      id: generateId(),
      slug,
      title: validated.title,
      status: validated.status || 'draft',
      featured: validated.featured || false,
      seo: (validated.seo || {
        title: validated.title,
        description: validated.description,
        keywords: (validated.seo as any)?.keywords || []
      }) as {
        title: string;
        description: string;
        keywords: string[];
      },
      type: validated.type,
      date: validated.date,
      endDate: validated.endDate,
      location: validated.location,
      description: validated.description,
      externalUrl: validated.externalUrl,
      mediaType: validated.mediaType,
      fileUrl: validated.fileUrl,
      presenter: validated.presenter,
      institution: validated.institution,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "admin",
      updatedBy: "admin"
    };
    
    // Add to activities array
    activities.push(newActivity);
    
    // Save to file
    await writeJsonFile("activities.json", activities);
    
    // Log activity
    await logActivity("create", "activity", newActivity.id, newActivity.title);
    
    // Revalidate cache
    revalidatePath("/admin/research-hub/activities");
    revalidatePath("/research-hub/activities");
    
    return {
      success: true,
      data: newActivity
    };
  } catch (error) {
    console.error("Error creating activity:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create activity"
    };
  }
}

export async function getActivities(): Promise<ApiResponse<Activity[]>> {
  try {
    const activities = await readJsonFile<Activity>("activities.json");
    return {
      success: true,
      data: activities.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    };
  } catch (error) {
    console.error("Error fetching activities:", error);
    return {
      success: false,
      error: "Failed to fetch activities"
    };
  }
}

// Award Actions
export async function createAward(data: z.infer<typeof createAwardSchema>): Promise<ApiResponse<Award>> {
  try {
    // Validate input
    const validated = createAwardSchema.parse(data);
    
    // Ensure content directory exists
    await ensureContentDir();
    
    // Read existing awards
    const awards = await readJsonFile<Award>("awards.json");
    
    // Generate slug if not provided
    const slug = validated.slug || generateSlug(validated.title);
    
    // Check for duplicate slug
    const existingSlug = awards.find(a => a.slug === slug);
    if (existingSlug) {
      return {
        success: false,
        error: "An award with this slug already exists"
      };
    }
    
    // Create new award
    const newAward: Award = {
      id: generateId(),
      slug,
      title: validated.title,
      status: validated.status || 'draft',
      featured: validated.featured || false,
      seo: (validated.seo || {
        title: validated.title,
        description: validated.description,
        keywords: (validated.seo as any)?.keywords || []
      }) as {
        title: string;
        description: string;
        keywords: string[];
      },
      issuingBody: validated.issuingBody,
      year: validated.year,
      description: validated.description,
      significance: validated.significance,
      url: validated.url,
      category: validated.category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "admin",
      updatedBy: "admin"
    };
    
    // Add to awards array
    awards.push(newAward);
    
    // Save to file
    await writeJsonFile("awards.json", awards);
    
    // Log activity
    await logActivity("create", "award", newAward.id, newAward.title);
    
    // Revalidate cache
    revalidatePath("/admin/research-hub/awards");
    revalidatePath("/research-hub/awards");
    
    return {
      success: true,
      data: newAward
    };
  } catch (error) {
    console.error("Error creating award:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create award"
    };
  }
}

export async function getAwards(): Promise<ApiResponse<Award[]>> {
  try {
    const awards = await readJsonFile<Award>("awards.json");
    return {
      success: true,
      data: awards.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    };
  } catch (error) {
    console.error("Error fetching awards:", error);
    return {
      success: false,
      error: "Failed to fetch awards"
    };
  }
}

// Grant Actions
export async function createGrant(data: z.infer<typeof createGrantSchema>): Promise<ApiResponse<Grant>> {
  try {
    // Validate input
    const validated = createGrantSchema.parse(data);
    
    // Ensure content directory exists
    await ensureContentDir();
    
    // Read existing grants
    const grants = await readJsonFile<Grant>("grants.json");
    
    // Generate slug if not provided
    const slug = validated.slug || generateSlug(validated.title);
    
    // Check for duplicate slug
    const existingSlug = grants.find(g => g.slug === slug);
    if (existingSlug) {
      return {
        success: false,
        error: "A grant with this slug already exists"
      };
    }
    
    // Create new grant
    const newGrant: Grant = {
      id: generateId(),
      slug,
      title: validated.title,
      status: validated.status || 'draft',
      featured: validated.featured || false,
      seo: (validated.seo || {
        title: validated.title,
        description: validated.description,
        keywords: (validated.seo as any)?.keywords || []
      }) as {
        title: string;
        description: string;
        keywords: string[];
      },
      issuingBody: validated.issuingBody,
      amount: validated.amount,
      currency: validated.currency,
      year: validated.year,
      grantStatus: validated.grantStatus,
      description: validated.description,
      project: validated.project,
      duration: validated.duration,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "admin",
      updatedBy: "admin"
    };
    
    // Add to grants array
    grants.push(newGrant);
    
    // Save to file
    await writeJsonFile("grants.json", grants);
    
    // Log activity
    await logActivity("create", "grant", newGrant.id, newGrant.title);
    
    // Revalidate cache
    revalidatePath("/admin/research-hub/awards");
    revalidatePath("/research-hub/awards");
    
    return {
      success: true,
      data: newGrant
    };
  } catch (error) {
    console.error("Error creating grant:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create grant"
    };
  }
}

export async function getGrants(): Promise<ApiResponse<Grant[]>> {
  try {
    const grants = await readJsonFile<Grant>("grants.json");
    return {
      success: true,
      data: grants.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    };
  } catch (error) {
    console.error("Error fetching grants:", error);
    return {
      success: false,
      error: "Failed to fetch grants"
    };
  }
}

// Bulk Actions
export async function bulkUpdateProjectStatus(
  ids: string[], 
  status: 'draft' | 'published' | 'archived'
): Promise<ApiResponse<null>> {
  try {
    // Read existing projects
    const projects = await readJsonFile<Project>("projects.json");
    
    // Update projects
    let updatedCount = 0;
    projects.forEach(project => {
      if (ids.includes(project.id)) {
        project.status = status;
        project.updatedAt = new Date().toISOString();
        project.updatedBy = "admin";
        updatedCount++;
      }
    });
    
    // Save to file
    await writeJsonFile("projects.json", projects);
    
    // Log activity
    await logActivity("bulk-update", "project", ids.join(","), `Updated ${updatedCount} projects`);
    
    // Revalidate cache
    revalidatePath("/admin/research-hub/projects");
    revalidatePath("/research-hub");
    
    return {
      success: true,
      data: null
    };
  } catch (error) {
    console.error("Error bulk updating projects:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to bulk update projects"
    };
  }
}

export async function bulkDeleteProjects(ids: string[]): Promise<ApiResponse<null>> {
  try {
    // Read existing projects
    const projects = await readJsonFile<Project>("projects.json");
    
    // Filter out projects to delete
    const deletedCount = projects.filter(p => ids.includes(p.id)).length;
    const remainingProjects = projects.filter(p => !ids.includes(p.id));
    
    // Save to file
    await writeJsonFile("projects.json", remainingProjects);
    
    // Log activity
    await logActivity("bulk-delete", "project", ids.join(","), `Deleted ${deletedCount} projects`);
    
    // Revalidate cache
    revalidatePath("/admin/research-hub/projects");
    revalidatePath("/research-hub");
    
    return {
      success: true,
      data: null
    };
  } catch (error) {
    console.error("Error bulk deleting projects:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to bulk delete projects"
    };
  }
}

// Search and Filter
export async function searchProjects(query: string): Promise<ApiResponse<Project[]>> {
  try {
    const projects = await readJsonFile<Project>("projects.json");
    
    const filteredProjects = projects.filter(project => 
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
      project.category.some(cat => cat.toLowerCase().includes(query.toLowerCase())) ||
      project.countries.some(country => country.toLowerCase().includes(query.toLowerCase()))
    );
    
    return {
      success: true,
      data: filteredProjects
    };
  } catch (error) {
    console.error("Error searching projects:", error);
    return {
      success: false,
      error: "Failed to search projects"
    };
  }
}

// Export/Import
export async function exportProjects(): Promise<ApiResponse<string>> {
  try {
    const projects = await readJsonFile<Project>("projects.json");
    const exportData = JSON.stringify(projects, null, 2);
    
    return {
      success: true,
      data: exportData
    };
  } catch (error) {
    console.error("Error exporting projects:", error);
    return {
      success: false,
      error: "Failed to export projects"
    };
  }
}

export async function importProjects(data: Project[]): Promise<ApiResponse<null>> {
  try {
    // Ensure content directory exists
    await ensureContentDir();
    
    // Read existing projects to check for duplicates
    const existingProjects = await readJsonFile<Project>("projects.json");
    
    // Filter out duplicates based on slug
    const newProjects = data.filter(project => 
      !existingProjects.some(existing => existing.slug === project.slug)
    );
    
    // Add new projects
    const allProjects = [...existingProjects, ...newProjects];
    
    // Save to file
    await writeJsonFile("projects.json", allProjects);
    
    // Log activity
    await logActivity("import", "project", "bulk", `Imported ${newProjects.length} projects`);
    
    // Revalidate cache
    revalidatePath("/admin/research-hub/projects");
    revalidatePath("/research-hub");
    
    return {
      success: true,
      data: null
    };
  } catch (error) {
    console.error("Error importing projects:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to import projects"
    };
  }
}
