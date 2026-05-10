import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/proposals/[id]
export async function GET(
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
          select: {
            id: true,
            clientName: true,
            clientEmail: true,
            clientPhone: true,
            eventType: true,
            eventDate: true,
            location: true,
            guestCount: true,
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

    return NextResponse.json({ success: true, data: proposal });
  } catch (error) {
    console.error("PROPOSAL_GET_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch proposal" },
      { status: 500 }
    );
  }
}

// PATCH /api/proposals/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.proposal.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Proposal not found" },
        { status: 404 }
      );
    }

    // Handle items update
    if (body.items) {
      // Delete existing items and recreate
      await prisma.proposalItem.deleteMany({ where: { proposalId: id } });

      let totalAmount = 0;
      const newItems = body.items.map(
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

      await prisma.proposalItem.createMany({
        data: newItems.map((item: { title: string; description: string | null; quantity: number; unitPrice: number; totalPrice: number; category: string; sortOrder: number }) => ({
          ...item,
          proposalId: id,
        })),
      });

      body.totalAmount = totalAmount;
    }

    // Handle sections update
    if (body.sections) {
      await prisma.proposalSection.deleteMany({ where: { proposalId: id } });
      await prisma.proposalSection.createMany({
        data: body.sections.map(
          (section: { title: string; content: string; sortOrder?: number }, index: number) => ({
            title: section.title,
            content: section.content,
            sortOrder: section.sortOrder ?? index,
            proposalId: id,
          })
        ),
      });
    }

    // Handle contracts update
    if (body.contracts) {
      await prisma.proposalContract.deleteMany({ where: { proposalId: id } });
      await prisma.proposalContract.createMany({
        data: body.contracts.map(
          (contract: { title: string; content: string }) => ({
            title: contract.title,
            content: contract.content,
            proposalId: id,
          })
        ),
      });
    }

    // Update proposal fields
    const updateData: Record<string, unknown> = {};
    const fields = [
      "title", "introduction", "eventVision", "themeConcept",
      "totalAmount", "currency", "status", "validUntil",
      "notes", "clientApproved", "clientRejected", "rejectionReason",
    ];
    for (const field of fields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    const proposal = await prisma.proposal.update({
      where: { id },
      data: updateData,
      include: {
        booking: {
          select: {
            id: true,
            clientName: true,
            clientEmail: true,
            eventType: true,
            eventDate: true,
          },
        },
        createdBy: {
          select: { id: true, name: true },
        },
        items: { orderBy: { sortOrder: "asc" } },
        sections: { orderBy: { sortOrder: "asc" } },
        contracts: true,
      },
    });

    return NextResponse.json({ success: true, data: proposal });
  } catch (error) {
    console.error("PROPOSAL_PATCH_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Failed to update proposal" },
      { status: 500 }
    );
  }
}

// DELETE /api/proposals/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.proposal.delete({ where: { id } });

    return NextResponse.json({ success: true, data: null });
  } catch (error) {
    console.error("PROPOSAL_DELETE_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete proposal" },
      { status: 500 }
    );
  }
}