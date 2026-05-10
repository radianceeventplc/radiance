import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/proposal/templates
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const templates = await prisma.proposalTemplate.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ success: true, data: templates });
  } catch (error) {
    console.error("TEMPLATES_GET_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch templates" },
      { status: 500 }
    );
  }
}

// POST /api/proposal/templates
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      description,
      eventType,
      coverImage,
      sections,
      contractTerms,
    } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Template name is required" },
        { status: 400 }
      );
    }

    const template = await prisma.proposalTemplate.create({
      data: {
        name,
        description: description || null,
        eventType: eventType || null,
        coverImage: coverImage || null,
        sections: JSON.stringify(sections || []),
        contractTerms: contractTerms || null,
        createdById: (session.user as unknown as { id: string }).id,
      },
    });

    return NextResponse.json({ success: true, data: template }, { status: 201 });
  } catch (error) {
    console.error("TEMPLATES_POST_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Failed to create template" },
      { status: 500 }
    );
  }
}