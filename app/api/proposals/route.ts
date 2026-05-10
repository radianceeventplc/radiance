import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import crypto from "crypto";

function generateProposalNumber(): string {
  const year = new Date().getFullYear();
  const rand = crypto.randomInt(10000, 99999);
  return `PRP-${year}-${rand}`;
}

function generatePublicToken(): string {
  return crypto.randomBytes(24).toString("hex");
}

// GET /api/proposals
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get("bookingId");
    const status = searchParams.get("status");

    const where: Record<string, unknown> = {};
    if (bookingId) where.bookingId = bookingId;
    if (status) where.status = status;

    const proposals = await prisma.proposal.findMany({
      where,
      include: {
        booking: {
          select: {
            id: true,
            clientName: true,
            clientEmail: true,
            clientPhone: true,
            eventType: true,
            eventDate: true,
            status: true,
          },
        },
        createdBy: {
          select: { id: true, name: true, email: true },
        },
        items: {
          orderBy: { sortOrder: "asc" },
        },
        sections: {
          orderBy: { sortOrder: "asc" },
        },
        contracts: true,
        _count: {
          select: { comments: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: proposals });
  } catch (error) {
    console.error("PROPOSALS_GET_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch proposals" },
      { status: 500 }
    );
  }
}

// POST /api/proposals
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      bookingId,
      title,
      introduction,
      eventVision,
      themeConcept,
      validUntil,
      notes,
      items,
      sections,
      contracts,
    } = body;

    if (!bookingId || !title) {
      return NextResponse.json(
        { success: false, error: "Booking ID and title are required" },
        { status: 400 }
      );
    }

    // Verify booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });
    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    // Calculate total amount from items
    let totalAmount = 0;
    const proposalItems = (items || []).map(
      (item: { title: string; description?: string; quantity: number; unitPrice: number; category: string; sortOrder?: number }, index: number) => {
        const totalPrice = item.quantity * item.unitPrice;
        totalAmount += totalPrice;
        return {
          title: item.title,
          description: item.description || null,
          quantity: item.quantity || 1,
          unitPrice: item.unitPrice,
          totalPrice,
          category: item.category || "CUSTOM",
          sortOrder: item.sortOrder ?? index,
        };
      }
    );

    const proposal = await prisma.proposal.create({
      data: {
        bookingId,
        title,
        proposalNumber: generateProposalNumber(),
        publicToken: generatePublicToken(),
        introduction: introduction || null,
        eventVision: eventVision || null,
        themeConcept: themeConcept || null,
        totalAmount,
        validUntil: validUntil ? new Date(validUntil) : null,
        notes: notes || null,
        createdById: (session.user as unknown as { id: string }).id,
        items: {
          create: proposalItems,
        },
        sections: {
          create: (sections || []).map(
            (section: { title: string; content: string; sortOrder?: number }, index: number) => ({
              title: section.title,
              content: section.content,
              sortOrder: section.sortOrder ?? index,
            })
          ),
        },
        contracts: {
          create: (contracts || []).map(
            (contract: { title: string; content: string }) => ({
              title: contract.title,
              content: contract.content,
            })
          ),
        },
      },
      include: {
        booking: {
          select: {
            id: true,
            clientName: true,
            clientEmail: true,
            clientPhone: true,
            eventType: true,
            eventDate: true,
          },
        },
        createdBy: {
          select: { id: true, name: true },
        },
        items: true,
        sections: true,
        contracts: true,
      },
    });

    return NextResponse.json({ success: true, data: proposal }, { status: 201 });
  } catch (error) {
    console.error("PROPOSALS_POST_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Failed to create proposal" },
      { status: 500 }
    );
  }
}