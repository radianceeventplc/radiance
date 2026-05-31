import { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Heart, WandSparkles } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { isMissingWeddingExperienceTable } from "@/lib/prisma-errors";
import { BOOKING_STATUS, INVITATION_THEME_LABELS } from "@/types";

export const metadata: Metadata = {
  title: "Wedding Experiences | Admin | Radiance",
  description: "Manage Radiance digital wedding invitations",
};

export const dynamic = "force-dynamic";

export default async function AdminWeddingsPage() {
  let setupRequired = false;
  let invitations: Awaited<ReturnType<typeof getWeddingInvitations>> = [];
  let readyBookings: Awaited<ReturnType<typeof getReadyWeddingBookings>> = [];

  try {
    [invitations, readyBookings] = await Promise.all([
      getWeddingInvitations(),
      getReadyWeddingBookings(),
    ]);
  } catch (error) {
    if (!isMissingWeddingExperienceTable(error)) throw error;
    setupRequired = true;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#a47a2a]">
          <Heart className="h-4 w-4" />
          Premium Feature
        </div>
        <h1 className="mt-2 text-3xl font-bold text-radiance-navy">
          Wedding Experiences
        </h1>
        <p className="mt-1 text-gray-600">
          Live invitation microsites connected to bookings, RSVPs, and gift registries.
        </p>
      </div>

      {setupRequired ? (
        <div className="rounded-none border border-[#ecd398] bg-[#fdf6e8] p-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Wedding database tables are not installed yet
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-700">
            Bookings will continue to work, but the premium wedding experience needs
            the new `WeddingInvitation`, `RSVP`, `GiftRegistry`, reservation, and `DesignAsset`
            tables before invitations can be created.
          </p>
          <div className="mt-5 rounded-none bg-white p-4 text-sm text-gray-700">
            Run the schema from{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5">
              prisma/wedding_experience.sql
            </code>{" "}
            in Supabase SQL Editor, or fix `DATABASE_URL` and run{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5">
              npx prisma db push
            </code>
            .
          </div>
          <Link
            href="/admin/bookings"
            className="mt-5 inline-flex rounded-none bg-[#bf8f38] px-4 py-2 text-sm font-semibold text-white hover:bg-[#bf8f38]"
          >
            Back to Bookings
          </Link>
        </div>
      ) : (
        <>
          <section className="mb-8 rounded-none border border-[#ecd398] bg-white p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Ready for Card Design
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Confirmed and planning wedding bookings can start a card design here.
                </p>
              </div>
              <Link
                href="/admin/bookings?status=CONFIRMED"
                className="inline-flex items-center justify-center rounded-none border border-[#d9b665] px-4 py-2 text-sm font-semibold text-[#a47a2a] hover:bg-[#fdf6e8]"
              >
                View confirmed bookings
              </Link>
            </div>

            {readyBookings.length === 0 ? (
              <p className="mt-5 text-sm text-gray-600">
                No confirmed wedding bookings are waiting for a new card design.
              </p>
            ) : (
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {readyBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex flex-col gap-4 rounded-none border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="font-semibold text-gray-900">
                        {booking.clientName}
                      </div>
                      <div className="mt-1 text-xs text-gray-600">
                        {new Date(booking.eventDate).toLocaleDateString()} · {booking.status}
                      </div>
                      <div className="mt-1 text-xs text-gray-600">
                        {booking.location}
                      </div>
                    </div>
                    <Link
                      href={`/admin/weddings/${booking.id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-none bg-[#bf8f38] px-4 py-2 text-sm font-semibold text-white hover:bg-[#bf8f38]"
                    >
                      <WandSparkles className="h-4 w-4" />
                      Design Card
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>

          {invitations.length === 0 ? (
        <div className="rounded-none border border-gray-200 bg-white p-10 text-center">
          <p className="text-gray-700">No wedding invitations have been created yet.</p>
          <Link
            href="/admin/bookings"
            className="mt-4 inline-flex rounded-none bg-[#bf8f38] px-4 py-2 text-sm font-semibold text-white hover:bg-[#bf8f38]"
          >
            Open Bookings
          </Link>
        </div>
          ) : (
        <div className="overflow-x-auto rounded-none border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-5 py-3 text-left font-medium text-gray-600">Couple</th>
                <th className="px-5 py-3 text-left font-medium text-gray-600">Date</th>
                <th className="px-5 py-3 text-left font-medium text-gray-600">Template</th>
                <th className="px-5 py-3 text-left font-medium text-gray-600">Status</th>
                <th className="px-5 py-3 text-left font-medium text-gray-600">Responses</th>
                <th className="px-5 py-3 text-right font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invitations.map((invitation) => (
                <tr key={invitation.id} className="border-b border-gray-200 last:border-0">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-gray-900">
                      {invitation.brideName} & {invitation.groomName}
                    </div>
                    <div className="text-xs text-gray-600">{invitation.booking.clientName}</div>
                  </td>
                  <td className="px-5 py-4 text-gray-700">
                    {new Date(invitation.weddingDate).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 text-gray-700">
                    {INVITATION_THEME_LABELS[invitation.templateKey] || INVITATION_THEME_LABELS[invitation.theme] || invitation.theme}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                      {invitation.status || (invitation.isPublished ? "Published" : "Draft")}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-700">
                    {invitation._count.rsvps} RSVPs · {invitation._count.gifts} gifts
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {invitation.isPublished && (
                        <Link
                          href={`/wedding/${invitation.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 rounded-none border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Live
                        </Link>
                      )}
                      <Link
                        href={`/admin/weddings/${invitation.bookingId}`}
                        className="rounded-none border border-[#d9b665] px-3 py-1.5 text-xs font-semibold text-[#a47a2a] hover:bg-[#fdf6e8]"
                      >
                        Edit & Preview
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          )}
        </>
      )}
    </div>
  );
}

function getWeddingInvitations() {
  return prisma.weddingInvitation.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      booking: true,
      _count: {
        select: {
          rsvps: true,
          gifts: true,
        },
      },
    },
  });
}

function getReadyWeddingBookings() {
  return prisma.booking.findMany({
    where: {
      eventType: "WEDDING",
      status: { in: [BOOKING_STATUS.CONFIRMED, BOOKING_STATUS.PLANNED] },
      invitations: { none: {} },
    },
    orderBy: { eventDate: "asc" },
    take: 12,
  });
}
