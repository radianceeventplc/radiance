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

    const venue = await prisma.venueDetail.findUnique({
      where: { weddingId },
    });

    return NextResponse.json({ success: true, data: venue });
  } catch (error) {
    console.error("VENUE_DETAILS_GET_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
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
    const { weddingId, name, address, googleMapsLink, eventTime, dressCode } = body;

    if (!weddingId) {
      return NextResponse.json(
        { success: false, error: "weddingId is required" },
        { status: 400 }
      );
    }

    const data = await prisma.venueDetail.upsert({
      where: { weddingId },
      update: {
        ...(name !== undefined && { name }),
        ...(address !== undefined && { address }),
        ...(googleMapsLink !== undefined && { googleMapsLink }),
        ...(eventTime !== undefined && { eventTime }),
        ...(dressCode !== undefined && { dressCode }),
      },
      create: {
        weddingId,
        name: name ?? "",
        address: address ?? "",
        googleMapsLink: googleMapsLink ?? null,
        eventTime: eventTime ?? "4:30 PM – Late",
        dressCode: dressCode ?? null,
      },
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("VENUE_DETAILS_SAVE_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not save venue details" },
      { status: 500 }
    );
  }
}