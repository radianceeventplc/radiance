import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

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

    // Auto-update booking status
    if (proposal.booking.status === "CONTACTED") {
      await prisma.booking.update({
        where: { id: proposal.bookingId },
        data: { status: "CONFIRMED" },
      });
    }

    return NextResponse.json({ success: true, data: { action: "approved" } });
  } catch (error) {
    console.error("PUBLIC_APPROVE_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Failed to approve proposal" },
      { status: 500 }
    );
  }
}