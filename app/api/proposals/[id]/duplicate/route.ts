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

    const original = await prisma.proposal.findUnique({
      where: { id },
      include: {
        items: true,
        sections: true,
        contracts: true,
      },
    });

    if (!original) {
      return NextResponse.json(
        { success: false, error: "Original proposal not found" },
        { status: 404 }
      );
    }

    const duplicated = await prisma.proposal.create({
      data: {
        bookingId: original.bookingId,
        title: `${original.title} (Copy)`,
        proposalNumber: generateProposalNumber(),
        publicToken: generatePublicToken(),
        introduction: original.introduction,
        eventVision: original.eventVision,
        themeConcept: original.themeConcept,
        totalAmount: original.totalAmount,
        currency: original.currency,
        status: "DRAFT",
        notes: original.notes,
        createdById: (session.user as unknown as { id: string }).id,
        items: {
          create: original.items.map((item) => ({
            title: item.title,
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
            category: item.category,
            sortOrder: item.sortOrder,
          })),
        },
        sections: {
          create: original.sections.map((section) => ({
            title: section.title,
            content: section.content,
            sortOrder: section.sortOrder,
          })),
        },
        contracts: {
          create: original.contracts.map((contract) => ({
            title: contract.title,
            content: contract.content,
          })),
        },
      },
      include: {
        booking: {
          select: { id: true, clientName: true, clientEmail: true, eventType: true },
        },
        items: true,
        sections: true,
        contracts: true,
      },
    });

    return NextResponse.json({ success: true, data: duplicated }, { status: 201 });
  } catch (error) {
    console.error("PROPOSAL_DUPLICATE_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Failed to duplicate proposal" },
      { status: 500 }
    );
  }
}