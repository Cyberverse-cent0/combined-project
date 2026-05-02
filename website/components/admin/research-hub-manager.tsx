"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  getFallbackSiteContent,
  normalizeOverview,
  normalizeProjects,
  normalizePublications,
  normalizeGrants,
  normalizeTalks,
  normalizeAwards,
  normalizeMedia,
  type ManagedProject,
  type ManagedPublication,
  type ManagedGrant,
  type ManagedTalk,
  type ManagedAward,
  type ManagedMedia,
  type ResearchHubSiteContent,
} from "@/components/research-hub/research-hub-content";

type SectionId = "overview" | "projects" | "publications" | "grants" | "talks" | "awards" | "media";
type ManagedItem = ManagedProject | ManagedPublication | ManagedGrant | ManagedTalk | ManagedAward | ManagedMedia;

export function ResearchHubManager() {
  const [siteContent, setSiteContent] = useState<ResearchHubSiteContent>(getFallbackSiteContent());
  const [overview, setOverview] = useState(normalizeOverview(siteContent.overview));
  const [projects, setProjects] = useState<ManagedProject[]>([]);
  const [publications, setPublications] = useState<ManagedPublication[]>([]);
  const [grants, setGrants] = useState<ManagedGrant[]>([]);
  const [talks, setTalks] = useState<ManagedTalk[]>([]);
  const [awards, setAwards] = useState<ManagedAward[]>([]);
  const [media, setMedia] = useState<ManagedMedia[]>([]);
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const [selectedId, setSelectedId] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const selectedItem = projects.find(p => p.id === selectedId) || 
                       publications.find(p => p.id === selectedId) ||
                       grants.find(g => g.id === selectedId) ||
                       talks.find(t => t.id === selectedId) ||
                       awards.find(a => a.id === selectedId) ||
                       media.find(m => m.id === selectedId);

  const sectionItems = {
    overview: [],
    projects,
    publications,
    grants,
    talks,
    awards,
    media,
  }[activeSection];

  const setItemsForSection = (section: SectionId, items: any[]) => {
    switch (section) {
      case "projects": setProjects(items); break;
      case "publications": setPublications(items); break;
      case "grants": setGrants(items); break;
      case "talks": setTalks(items); break;
      case "awards": setAwards(items); break;
      case "media": setMedia(items); break;
    }
  };

  const nextId = (prefix: string) => `${prefix}-${Date.now()}`;

  useEffect(() => {
    const hydrateFromContent = (content: ResearchHubSiteContent) => {
      setSiteContent(content);
      setOverview(normalizeOverview(content.overview));
      setProjects(normalizeProjects(content.projects));
      setPublications(normalizePublications(content.publications));
      setGrants(normalizeGrants(content.grants));
      setTalks(normalizeTalks(content.talks));
      setAwards(normalizeAwards(content.awards));
      setMedia(normalizeMedia(content.media));
    };

    hydrateFromContent(getFallbackSiteContent());
    setLoading(false);
  }, []);

  const addItem = () => {
    setSuccess("");
    if (activeSection === "overview") return;

    const defaults: Record<SectionId, ManagedItem | null> = {
      overview: null,
      projects: {
        id: nextId("project"),
        title: "New project",
        description: "",
        status: "planned",
        startDate: "",
        endDate: "",
        collaborators: [],
        funding: "",
        publications: [],
        tags: [],
      },
      publications: {
        id: nextId("publication"),
        title: "New publication",
        authors: [],
        journal: "",
        year: new Date().getFullYear(),
        type: "journal",
        abstract: "",
        doi: "",
        tags: [],
      },
      grants: {
        id: nextId("grant"),
        title: "New grant",
        agency: "",
        amount: 0,
        currency: "USD",
        startDate: "",
        endDate: "",
        status: "pending",
        investigators: [],
        abstract: "",
        tags: [],
      },
      talks: {
        id: nextId("talk"),
        title: "New talk",
        event: "",
        location: "",
        date: "",
        type: "contributed",
        abstract: "",
        slides: "",
        tags: [],
      },
      awards: {
        id: nextId("award"),
        title: "New award",
        organization: "",
        date: "",
        description: "",
        value: "",
        tags: [],
      },
      media: {
        id: nextId("media"),
        title: "New media item",
        type: "video",
        source: "",
        date: "",
        url: "",
        description: "",
        tags: [],
      },
    };

    const newItem = defaults[activeSection];
    if (!newItem) return;
    const next = [...sectionItems, newItem];
    setItemsForSection(activeSection, next);
    setSelectedId(newItem.id);
  };

  const deleteItem = () => {
    if (activeSection === "overview" || !selectedItem) return;
    const next = sectionItems.filter((item) => item.id !== selectedItem.id);
    setItemsForSection(activeSection, next);
    setSelectedId(next[0]?.id || "");
  };

  const updateItem = (id: string, updates: Partial<ManagedItem>) => {
    const next = sectionItems.map((item) => 
      item.id === id ? { ...item, ...updates } : item
    );
    setItemsForSection(activeSection, next);
  };

  if (isLoading) {
    return <div className="p-6">Loading research hub manager...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Research Hub Manager</h1>
        <p className="text-gray-600">Manage your research content and publications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h2 className="font-semibold mb-4">Sections</h2>
            <div className="space-y-2">
              {(["overview", "projects", "publications", "grants", "talks", "awards", "media"] as SectionId[]).map((section) => (
                <Button
                  key={section}
                  variant={activeSection === section ? "default" : "ghost"}
                  className="w-full justify-start capitalize"
                  onClick={() => setActiveSection(section)}
                >
                  {section}
                </Button>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold capitalize">{activeSection}</h2>
              <div className="space-x-2">
                {activeSection !== "overview" && (
                  <>
                    <Button onClick={addItem}>Add Item</Button>
                    {selectedItem && (
                      <Button variant="destructive" onClick={deleteItem}>
                        Delete
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>

            {activeSection === "overview" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    value={overview.title}
                    onChange={(e) => setOverview({ ...overview, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={overview.description}
                    onChange={(e) => setOverview({ ...overview, description: e.target.value })}
                  />
                </div>
              </div>
            )}

            {activeSection !== "overview" && (
              <div className="space-y-4">
                {sectionItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedId === item.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                    onClick={() => setSelectedId(item.id)}
                  >
                    <h3 className="font-semibold">{item.title}</h3>
                    {selectedId === item.id && (
                      <div className="mt-4 space-y-2">
                        <div>
                          <label className="block text-sm font-medium mb-1">Title</label>
                          <Input
                            value={item.title}
                            onChange={(e) => updateItem(item.id, { title: e.target.value })}
                          />
                        </div>
                        {"description" in item && (
                          <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <Textarea
                              value={item.description}
                              onChange={(e) => updateItem(item.id, { description: e.target.value })}
                            />
                          </div>
                        )}
                        {"abstract" in item && (
                          <div>
                            <label className="block text-sm font-medium mb-1">Abstract</label>
                            <Textarea
                              value={item.abstract}
                              onChange={(e) => updateItem(item.id, { abstract: e.target.value })}
                            />
                          </div>
                        )}
                        {"status" in item && (
                          <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <Badge>{item.status}</Badge>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
