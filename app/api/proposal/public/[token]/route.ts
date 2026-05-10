import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/proposal/public/[token]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    const proposal = await prisma.proposal.findUnique({
      where: { publicToken: token },
      include: {
        booking: {
          select: {
            id: true,
            clientName: true,
            clientEmail: true,
            eventType: true,
            eventDate: true,
            location: true,
            guestCount: true,
          },
        },
        items: {
          orderBy: { sortOrder: "asc" },
        },
        sections: {
          orderBy: { sortOrder: "asc" },
        },
        contracts: true,
        comments: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!proposal) {
      return NextResponse.json(
        { success: false, error: "Proposal not found" },
        { status: 404 }
      );
    }

    // Track that proposal was viewed (only on first view)
    if (proposal.status === "SENT") {
      await prisma.proposal.update({
        where: { id: proposal.id },
        data: { status: "VIEWED" },
      });
    }

    return NextResponse.json({ success: true, data: proposal });
  } catch (error) {
    console.error("PUBLIC_PROPOSAL_GET_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch proposal" },
      { status: 500 }
    );
  }
}

// POST /api/proposal/public/[token]/approve
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const body = await request.json();

    const proposal = await prisma.proposal.findUnique({
      where: { publicToken: token },
      include: { booking: true },
    });

    if (!proposal) {
      return NextResponse.json(
        { success: false, error: "Proposal not found" },
        { status: 404 }
      );
    }

    const action = request.nextUrl.pathname.endsWith("approve") ? "approve" : "reject";

    if (action === "approve") {
      await prisma.proposal.update({
        where: { id: proposal.id },
        data: {
          status: "APPROVED",
          clientApproved: true,
          clientApprovedAt: new Date(),
          clientRejected: false,
          rejectionReason: null,
        },
      });

      // Auto-update booking status from CONTACTED to CONFIRMED
      if (proposal.booking.status === "CONTACTED") {
        await prisma.booking.update({
          where: { id: proposal.bookingId },
          data: { status: "CONFIRMED" },
        });
      }
    } else {
      await prisma.proposal.update({
        where: { id: proposal.id },
        data: {
          status: "REJECTED",
          clientRejected: true,
          rejectionReason: body.reason || null,
          clientApproved: false,
        },
      });
    }

    return NextResponse.json({ success: true, data: { action } });
  } catch (error) {
    console.error("PUBLIC_PROPOSAL_ACTION_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Failed to process action" },
      { status: 500 }
    );
  }
}