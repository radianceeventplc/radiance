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

    const items = await prisma.programItem.findMany({
      where: { weddingId },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("PROGRAM_ITEMS_GET_ERROR", error);
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
    const { weddingId, time, title, description, sortOrder } = body;

    if (!weddingId || !time || !title) {
      return NextResponse.json(
        { success: false, error: "weddingId, time, and title are required" },
        { status: 400 }
      );
    }

    let order = sortOrder;
    if (order === undefined || order === null) {
      const lastItem = await prisma.programItem.findFirst({
        where: { weddingId },
        orderBy: { sortOrder: "desc" },
        select: { sortOrder: true },
      });
      order = (lastItem?.sortOrder ?? -1) + 1;
    }

    const item = await prisma.programItem.create({
      data: { weddingId, time, title, description: description ?? "", sortOrder: order },
    });

    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    console.error("PROGRAM_ITEM_CREATE_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not create program item" },
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
    const { id, time, title, description, sortOrder } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "id is required for update" },
        { status: 400 }
      );
    }

    const item = await prisma.programItem.update({
      where: { id },
      data: {
        ...(time !== undefined && { time }),
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(sortOrder !== undefined && { sortOrder }),
      },
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error("PROGRAM_ITEM_UPDATE_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not update program item" },
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

    await prisma.programItem.delete({ where: { id } });

    return NextResponse.json({ success: true, data: { id } });
  } catch (error) {
    console.error("PROGRAM_ITEM_DELETE_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not delete program item" },
      { status: 500 }
    );
  }
}