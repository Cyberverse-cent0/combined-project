import { NextResponse } from "next/server";
import { siteContent } from "@/lib/content/site-content";

export async function GET() {
  try {
    // Return gallery photos from site content
    const photos = siteContent.gallery?.map((item, index) => ({
      id: `photo-${index}`,
      title: `Gallery photo ${index + 1}`,
      description: `Gallery photo ${index + 1}`,
      image_url: item || "", // Ensure we have a valid string, fallback to empty
      thumbnail_url: item || "", // Use same URL for thumbnail
      upload_date: new Date().toISOString(),
      file_size: 0,
      dimensions: { width: 1200, height: 900 },
      category: 'general',
      tags: [],
      uploaded_by: 'system',
      filename: `photo-${index + 1}.jpg`
    })) || [];

    return NextResponse.json({ photos });
  } catch (error) {
    console.error('Error fetching gallery photos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery photos' },
      { status: 500 }
    );
  }
}
