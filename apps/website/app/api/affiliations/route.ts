import { NextResponse } from "next/server";
import { siteContent } from "@/lib/content/site-content";

export async function GET() {
  try {
    const affiliations = siteContent.externalProfiles?.map((profile, index) => ({
      id: profile.label || `profile-${index}`,
      institution: profile.label,
      role: profile.description,
      period: "",
      logo: "",
      featured: false,
      href: profile.href
    })) || [];

    return NextResponse.json({ affiliations });
  } catch (error) {
    console.error('Error fetching affiliations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch affiliations' },
      { status: 500 }
    );
  }
}
