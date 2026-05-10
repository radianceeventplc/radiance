import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const body = await request.json();

    const proposal = await prisma.proposal.findUnique({
      where: { publicToken: token },
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
        status: "REJECTED",
        clientRejected: true,
        rejectionReason: body.reason || null,
        clientApproved: false,
      },
    });

    return NextResponse.json({ success: true, data: { action: "rejected" } });
  } catch (error) {
    console.error("PUBLIC_REJECT_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Failed to reject proposal" },
      { status: 500 }
    );
  }
}