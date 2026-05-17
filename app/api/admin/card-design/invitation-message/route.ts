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

    const invitationMessage = await prisma.invitationMessage.findUnique({
      where: { weddingId },
    });

    return NextResponse.json({ success: true, data: invitationMessage });
  } catch (error) {
    console.error("INVITATION_MESSAGE_GET_ERROR", error);
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
    const { weddingId, preline, message } = body;

    if (!weddingId) {
      return NextResponse.json(
        { success: false, error: "weddingId is required" },
        { status: 400 }
      );
    }

    const data = await prisma.invitationMessage.upsert({
      where: { weddingId },
      update: {
        preline: preline ?? "We are getting married",
        message: message ?? "",
      },
      create: {
        weddingId,
        preline: preline ?? "We are getting married",
        message: message ?? "",
      },
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("INVITATION_MESSAGE_SAVE_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not save invitation message" },
      { status: 500 }
    );
  }
}