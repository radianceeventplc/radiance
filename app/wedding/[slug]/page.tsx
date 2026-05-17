import { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import WeddingCardClient from "@/components/wedding/WeddingCardClient";

interface WeddingPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: WeddingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const invitation = await prisma.weddingInvitation.findUnique({
    where: { slug },
    select: {
      brideName: true,
      groomName: true,
      weddingDate: true,
      venueName: true,
      isPublished: true,
      status: true,
      invitationMessage: {
        select: { preline: true, message: true },
      },
    },
  });

  if (!invitation || (!invitation.isPublished && invitation.status !== "PUBLISHED")) {
    // Still return basic metadata even if not found — page will show 404
    return { title: "Wedding Invitation | Radiance" };
  }

  return {
    title: `Wedding Invitation | Radiance`,
    description: `Join us for the wedding celebration at ${invitation.venueName}`,
    openGraph: {
      title: `Wedding Invitation`,
      description: `You're invited to celebrate this special day.`,
    },
  };
}

export default async function WeddingPage({ params }: WeddingPageProps) {
  const { slug } = await params;

  const invitation = await prisma.weddingInvitation.findUnique({
    where: { slug },
    include: {
      invitationMessage: true,
      loveStories: {
        orderBy: { sortOrder: "asc" },
      },
      programItems: {
        orderBy: { sortOrder: "asc" },
      },
      venueDetails: true,
      gifts: {
        orderBy: [{ priority: "desc" }, { createdAt: "asc" }],
        include: {
          reservations: {
            select: { reservedBy: true, reservedMessage: true },
          },
        },
      },
      rsvps: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!invitation) {
    notFound();
  }

  // Check if requesting from admin (preview) — allow access even for drafts
  // Allow if: published, status is PUBLISHED/APPROVED/REVIEW, or preview cookie/header
  const headersList = await headers();
  const referer = headersList.get("referer") || "";
  const isAdminPreview = referer.includes("/admin/");

  const isPubliclyViewable =
    invitation.isPublished ||
    invitation.status === "PUBLISHED" ||
    invitation.status === "APPROVED";

  if (!isPubliclyViewable && !isAdminPreview) {
    notFound();
  }

  const serialized = JSON.parse(JSON.stringify(invitation));

  return <WeddingCardClient invitation={serialized} />;
}