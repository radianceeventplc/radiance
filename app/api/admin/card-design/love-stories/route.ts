import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const weddingId = searchParams.get("weddingId");

    if (!weddingId) {
      return NextResponse.json(
        { success: false, error: "weddingId query parameter is required" },
        { status: 400 }
      );
    }

    const stories = await prisma.loveStory.findMany({
      where: { weddingId },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({ success: true, data: stories });
  } catch (error) {
    console.error("LOVE_STORIES_GET_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { weddingId, year, title, description, sortOrder } = body;

    if (!weddingId || !year || !title) {
      return NextResponse.json(
        { success: false, error: "weddingId, year, and title are required" },
        { status: 400 }
      );
    }

    // Get max sort order if not provided
    let order = sortOrder;
    if (order === undefined || order === null) {
      const lastItem = await prisma.loveStory.findFirst({
        where: { weddingId },
        orderBy: { sortOrder: "desc" },
        select: { sortOrder: true },
      });
      order = (lastItem?.sortOrder ?? -1) + 1;
    }

    const story = await prisma.loveStory.create({
      data: { weddingId, year, title, description: description ?? "", sortOrder: order },
    });

    return NextResponse.json({ success: true, data: story }, { status: 201 });
  } catch (error) {
    console.error("LOVE_STORY_CREATE_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not create love story entry" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, year, title, description, sortOrder } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "id is required for update" },
        { status: 400 }
      );
    }

    const story = await prisma.loveStory.update({
      where: { id },
      data: {
        ...(year !== undefined && { year }),
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(sortOrder !== undefined && { sortOrder }),
      },
    });

    return NextResponse.json({ success: true, data: story });
  } catch (error) {
    console.error("LOVE_STORY_UPDATE_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not update love story entry" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "id query parameter is required" },
        { status: 400 }
      );
    }

    await prisma.loveStory.delete({ where: { id } });

    return NextResponse.json({ success: true, data: { id } });
  } catch (error) {
    console.error("LOVE_STORY_DELETE_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not delete love story entry" },
      { status: 500 }
    );
  }
}