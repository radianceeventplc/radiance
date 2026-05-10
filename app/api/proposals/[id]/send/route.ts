import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const proposal = await prisma.proposal.findUnique({
      where: { id },
      include: {
        booking: {
          select: { clientName: true, clientEmail: true },
        },
      },
    });

    if (!proposal) {
      return NextResponse.json(
        { success: false, error: "Proposal not found" },
        { status: 404 }
      );
    }

    // Update status to SENT
    await prisma.proposal.update({
      where: { id },
      data: { status: "SENT" },
    });

    // Build public link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const publicLink = `${baseUrl}/proposal/${proposal.publicToken}`;

    // Here you would integrate with your email service (e.g., Resend, SendGrid)
    // For now, we log the action
    console.log(`📧 Proposal ${proposal.proposalNumber} sent to ${proposal.booking.clientEmail}`);
    console.log(`🔗 Public link: ${publicLink}`);

    return NextResponse.json({
      success: true,
      data: {
        publicLink,
        proposalNumber: proposal.proposalNumber,
        clientEmail: proposal.booking.clientEmail,
        clientName: proposal.booking.clientName,
      },
    });
  } catch (error) {
    console.error("PROPOSAL_SEND_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Failed to send proposal" },
      { status: 500 }
    );
  }
}