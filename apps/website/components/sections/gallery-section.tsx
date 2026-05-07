"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import { SectionHeading } from "@/components/layout/section-heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/lib/content/site-content";
import { api } from "@/components/api/client";

interface GalleryPhoto {
  id: string;
  title: string;
  description: string;
  image_url: string;
  thumbnail_url: string;
  upload_date: string;
  file_size: number;
  dimensions: { width: number; height: number };
  category?: string;
  tags?: string[];
  uploaded_by?: string;
  filename?: string;
}

export function GallerySection() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGalleryPhotos();
  }, []);

  const fetchGalleryPhotos = async () => {
    try {
      const response = await api.get('/api/gallery/photos');
      if (response.ok) {
        const data = await response.json();
        setPhotos(data.photos || []);
      } else {
        setError("Failed to load gallery photos");
      }
    } catch (error) {
      console.error("Error fetching gallery photos:", error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="section-space">
        <div className="container-shell space-y-10">
          <SectionHeading
            eyebrow="Gallery and Media"
            title="A curated visual narrative of scholarship, service, and public engagement."
            description={`${siteContent.quote.text} — ${siteContent.quote.author}`}
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="overflow-hidden p-2 animate-pulse">
                <div className="h-full min-h-[220px] w-full rounded-[20px] bg-muted" />
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-space">
        <div className="container-shell space-y-10">
          <SectionHeading
            eyebrow="Gallery and Media"
            title="A curated visual narrative of scholarship, service, and public engagement."
            description={`${siteContent.quote.text} — ${siteContent.quote.author}`}
          />
          <Card className="p-8 text-center text-muted-foreground">
            {error}
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="section-space">
      <div className="container-shell space-y-10">
        <SectionHeading
          eyebrow="Gallery and Media"
          title="A curated visual narrative of scholarship, service, and public engagement."
          description={`${siteContent.quote.text} — ${siteContent.quote.author}`}
        />
        {photos.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">
            No gallery images yet. Upload them from the admin panel and they will appear here.
          </Card>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {photos.map((photo, index) => {
                // Skip rendering if image_url is empty or invalid
                if (!photo.image_url || photo.image_url.trim() === "") {
                  return (
                    <Card key={photo.id} className={`overflow-hidden p-2 ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
                      <div className="h-full min-h-[220px] w-full rounded-[20px] bg-muted flex items-center justify-center text-muted-foreground">
                        <div className="text-center">
                          <div className="text-4xl mb-2">📷</div>
                          <p className="text-sm">Image not available</p>
                        </div>
                      </div>
                    </Card>
                  );
                }

                return (
                  <Card key={photo.id} className={`overflow-hidden p-2 ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
                    <Image
                      src={photo.image_url}
                      alt={photo.title || `Gallery photo ${index + 1}`}
                      width={1200}
                      height={900}
                      sizes={index === 0 ? "(max-width: 768px) 100vw, 40vw" : "(max-width: 768px) 100vw, 20vw"}
                      className="h-full min-h-[220px] w-full rounded-[20px] object-cover"
                      onError={(e) => {
                        // Handle image load errors
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="h-full min-h-[220px] w-full rounded-[20px] bg-muted flex items-center justify-center text-muted-foreground">
                              <div class="text-center">
                                <div class="text-4xl mb-2">📷</div>
                                <p class="text-sm">Failed to load</p>
                              </div>
                            </div>
                          `;
                        }
                      }}
                    />
                  </Card>
                );
              })}
            </div>
            <div className="text-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transform hover:scale-105">
                <Link href="/gallery">
                  View Full Gallery
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
