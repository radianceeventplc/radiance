import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getWeddingTemplate } from "@/templates/wedding";

const variants = {
  a4: {
    label: "A4 Invitation",
    className: "aspect-[1/1.414] w-[min(92vw,794px)]",
  },
  story: {
    label: "Mobile Story",
    className: "aspect-[9/16] w-[min(92vw,430px)]",
  },
  square: {
    label: "Instagram Square",
    className: "aspect-square w-[min(92vw,640px)]",
  },
};

interface PrintPageProps {
  params: Promise<{ slug: string; variant: string }>;
}

export const metadata: Metadata = {
  title: "Printable Wedding Invitation | Radiance",
};

export const dynamic = "force-dynamic";

export default async function WeddingPrintPage({ params }: PrintPageProps) {
  const { slug, variant } = await params;
  const selected = variants[variant as keyof typeof variants];

  if (!selected) notFound();

  const invitation = await prisma.weddingInvitation.findUnique({
    where: { slug },
  });

  if (!invitation || (!invitation.isPublished && invitation.status !== "PUBLISHED")) notFound();

  const template = getWeddingTemplate(invitation.templateKey ?? invitation.theme);
  const palette = {
    ...template.palette,
    primary: invitation.primaryColor || template.palette.primary,
    secondary: invitation.secondaryColor || template.palette.secondary,
  };

  return (
    <main
      className="min-h-screen px-4 py-8 print:bg-white print:p-0"
      style={{ background: palette.background, color: palette.text }}
    >
      <div className="mx-auto mb-4 max-w-3xl print:hidden">
        <p className="text-sm text-gray-700">
          {selected.label}. Use your browser print dialog and choose Save as PDF.
        </p>
      </div>
      <article
        className={`${selected.className} relative mx-auto overflow-hidden bg-white shadow-2xl print:h-screen print:w-screen print:shadow-none`}
        style={{ background: palette.surface }}
      >
        {(invitation.heroImageUrl || invitation.coverImage) && (
          <Image
            src={invitation.heroImageUrl || invitation.coverImage || ""}
            alt=""
            fill
            priority
            className="object-cover opacity-20"
          />
        )}
        <div
          className="absolute inset-5 border"
          style={{ borderColor: palette.secondary }}
        />
        {template.ornament.cornerAsset && (
          <>
            <Image
              src={template.ornament.cornerAsset}
              alt=""
              width={160}
              height={160}
              className="absolute left-0 top-0 w-40 opacity-80"
            />
            <Image
              src={template.ornament.cornerAsset}
              alt=""
              width={160}
              height={160}
              className="absolute bottom-0 right-0 w-40 rotate-180 opacity-80"
            />
          </>
        )}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-10 text-center">
          <p className="text-xs uppercase" style={{ color: palette.muted }}>
            Together with their families
          </p>
          <h1
            className="mt-8 text-5xl leading-none sm:text-6xl"
            style={{ color: palette.primary, fontFamily: template.typography.heading }}
          >
            {invitation.brideName}
            <span className="my-4 block text-3xl" style={{ color: palette.accent }}>
              &
            </span>
            {invitation.groomName}
          </h1>
          <p className="mt-8 max-w-md text-sm leading-6" style={{ color: palette.muted }}>
            {invitation.customMessage ||
              "request the honor of your presence as they celebrate their wedding."}
          </p>
          <div className="mt-10 h-px w-24" style={{ background: palette.secondary }} />
          <p className="mt-8 text-lg font-semibold">
            {new Date(invitation.weddingDate).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p className="mt-2 text-sm" style={{ color: palette.muted }}>
            {invitation.weddingTime}
          </p>
          <p className="mt-8 text-base font-semibold">{invitation.venueName}</p>
          <p className="mt-2 max-w-sm text-sm leading-6" style={{ color: palette.muted }}>
            {invitation.venueAddress}
          </p>
          <p className="mt-10 text-xs" style={{ color: palette.primary }}>
            radianceevents.com/wedding/{invitation.slug}
          </p>
        </div>
      </article>
    </main>
  );
}
