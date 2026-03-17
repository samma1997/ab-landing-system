import { NextRequest, NextResponse } from "next/server";
import { templateRegistry } from "@/lib/templates";
import type { PageConfig } from "@/types/blocks";

/**
 * GET /api/pages?template=event
 * Returns the default page config for a given template.
 *
 * POST /api/pages
 * Accepts a full PageConfig JSON body, validates it, and returns the
 * processed config (or stores it — integrate your DB here).
 */

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const template = searchParams.get("template");

  if (template && templateRegistry[template]) {
    return NextResponse.json(templateRegistry[template]);
  }

  // Return all available template keys
  return NextResponse.json({
    availableTemplates: Object.keys(templateRegistry),
    usage: "GET /api/pages?template=event",
  });
}

export async function POST(request: NextRequest) {
  try {
    const body: PageConfig = await request.json();

    // Basic validation
    if (!body.slug || !body.template || !body.seo || !body.blocks || body.blocks.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: slug, template, seo, blocks" },
        { status: 400 }
      );
    }

    // Validate each block has id and type
    for (const block of body.blocks) {
      if (!block.id || !block.type) {
        return NextResponse.json(
          { error: `Block missing id or type: ${JSON.stringify(block).slice(0, 100)}` },
          { status: 400 }
        );
      }
    }

    // In production, store to database (Prisma, Supabase, etc.)
    // For now, return the validated config
    return NextResponse.json({
      success: true,
      message: "Page config validated successfully",
      config: body,
      previewUrl: `/${body.slug}`,
    });
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
