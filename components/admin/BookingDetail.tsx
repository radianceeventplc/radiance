"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MessageThread } from "@/components/admin/MessageThread";
import { PaymentTracker } from "@/components/admin/PaymentTracker";
import { BookingRecord, BookingStatus, BOOKING_STATUS, EVENT_TYPE_LABELS, BUDGET_LABELS } from "@/types";
import {
  Loader2,
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  DollarSign,
  MapPin,
  Users,
  Heart,
  ExternalLink,
  WandSparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingDetailProps {
  bookingId: string;
}

export function BookingDetail({ bookingId }: BookingDetailProps) {
  const router = useRouter();
  const [booking, setBooking] = useState<BookingRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const fetchBooking = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/bookings?search=${bookingId}`);
      const result = await res.json();

      if (!res.ok) throw new Error(result.error);

      const found = (result.data ?? []).find(
        (b: BookingRecord) => b.id === bookingId
      );
      if (!found) throw new Error("Booking not found");

      setBooking(found);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load booking");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [bookingId]);

  const updateStatus = async (newStatus: string) => {
    if (!booking || updating) return;

    setUpdating(true);

    try {
      const res = await fetch(`/api/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      setBooking(result.data);
      setToastMessage("Status updated successfully");
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      setToastMessage("Failed to update status");
      setTimeout(() => setToastMessage(""), 3000);
      console.error("STATUS_UPDATE_ERROR", err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#bf8f38]" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 mb-4">{error || "Booking not found"}</p>
        <button
          onClick={() => router.push("/admin/bookings")}
          className="text-[#bf8f38] underline hover:no-underline"
        >
          Back to bookings
        </button>
      </div>
    );
  }

  const statusTransitions: Record<string, string[]> = {
    [BOOKING_STATUS.NEW_REQUEST]: [BOOKING_STATUS.CONTACTED, BOOKING_STATUS.CANCELLED],
    [BOOKING_STATUS.CONTACTED]: [BOOKING_STATUS.CONFIRMED, BOOKING_STATUS.CANCELLED],
    [BOOKING_STATUS.CONFIRMED]: [BOOKING_STATUS.PLANNED, BOOKING_STATUS.CANCELLED],
    [BOOKING_STATUS.PLANNED]: [BOOKING_STATUS.COMPLETED, BOOKING_STATUS.CANCELLED],
    [BOOKING_STATUS.COMPLETED]: [],
    [BOOKING_STATUS.CANCELLED]: [],
  };

  const availableTransitions = statusTransitions[booking.status] ?? [];
  const invitation = booking.invitations?.[0];
  const canCreateWeddingExperience =
    booking.eventType === "WEDDING" &&
    [BOOKING_STATUS.CONFIRMED, BOOKING_STATUS.PLANNED].includes(
      booking.status as typeof BOOKING_STATUS.CONFIRMED | typeof BOOKING_STATUS.PLANNED
    );

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#bf8f38] text-white px-4 py-2 rounded-none shadow-lg text-sm">
          {toastMessage}
        </div>
      )}

      <div className="flex items-start justify-between">
        <div>
          <button
            onClick={() => router.push("/admin/bookings")}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to bookings
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{booking.clientName}</h1>
          <p className="text-gray-600 text-sm mt-1">
            Created {new Date(booking.createdAt).toLocaleDateString()}
          </p>
        </div>
        <StatusBadge status={booking.status as BookingStatus} className="text-sm px-3 py-1" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-none p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-gray-600" />
              <a href={`mailto:${booking.clientEmail}`} className="text-[#bf8f38] hover:text-[#bf8f38]">
                {booking.clientEmail}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-gray-600" />
              <a href={`tel:${booking.clientPhone}`} className="text-[#bf8f38] hover:text-[#bf8f38]">
                {booking.clientPhone}
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-none p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-600 w-24">Type</span>
              <span className="font-medium text-gray-900">{EVENT_TYPE_LABELS[booking.eventType] || booking.eventType}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">
                {booking.eventDate
                  ? new Date(booking.eventDate).toLocaleDateString("en-US", {
                      weekday: "long", year: "numeric", month: "long", day: "numeric",
                    })
                  : "Not specified"}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">{booking.location || "Not specified"}</span>
            </div>
            {booking.guestCount && (
              <div className="flex items-center gap-3 text-sm">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">{booking.guestCount} guests</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm">
              <DollarSign className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">{BUDGET_LABELS[booking.budgetRange] || booking.budgetRange}</span>
            </div>
          </div>
        </div>
      </div>

      {booking.notes && (
        <div className="bg-white border border-gray-200 rounded-none p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Client Notes</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{booking.notes}</p>
        </div>
      )}

      {booking.eventType === "WEDDING" && (
        <div className="bg-white border border-[#ecd398] rounded-none p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#a47a2a]">
                <Heart className="h-4 w-4" />
                Premium Wedding Experience
              </div>
              <h2 className="mt-2 text-lg font-semibold text-gray-900">
                Invitation cards
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-gray-600">
                Design editable wedding invitation cards from this booking, preview the
                result, then publish the invitation page with RSVP and gifts.
              </p>
              {invitation && (
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
                  <span className="rounded-full bg-gray-100 px-3 py-1">
                    {invitation.status || (invitation.isPublished ? "Published" : "Draft")}
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1">
                    {invitation._count?.rsvps ?? 0} RSVPs
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1">
                    {invitation._count?.gifts ?? 0} gifts
                  </span>
                </div>
              )}
              {!canCreateWeddingExperience && !invitation && (
                <p className="mt-3 text-xs text-[#a47a2a]">
                  Available once this wedding booking is confirmed.
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {(canCreateWeddingExperience || invitation) && (
                <button
                  onClick={() => router.push(`/admin/bookings/${booking.id}/invitation`)}
                  className="inline-flex items-center gap-2 rounded-none bg-[#bf8f38] px-4 py-2 text-sm font-semibold text-white hover:bg-[#bf8f38]"
                >
                  <WandSparkles className="h-4 w-4" />
                  {invitation ? "Edit & Preview Invitation Cards" : "Design Invitation Cards"}
                </button>
              )}
              {invitation?.isPublished && (
                <a
                  href={`/wedding/${invitation.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-none border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Live
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-none p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Control</h2>
        {availableTransitions.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {availableTransitions.map((transition) => (
              <button
                key={transition}
                onClick={() => updateStatus(transition)}
                disabled={updating}
                className={cn(
                  "px-4 py-2 text-sm rounded-none transition-colors border font-medium",
                  transition === BOOKING_STATUS.CANCELLED
                     ? "border-red-200 text-red-600 hover:bg-red-50"
                     : "border-[#bf8f38]/30 text-[#bf8f38] hover:bg-[#fdf6e8]",
                  updating && "opacity-50 cursor-not-allowed"
                )}
              >
                {updating ? <Loader2 className="w-4 h-4 animate-spin inline mr-1" /> : null}
                Move to {transition.replace("_", " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-600">No further status changes available.</p>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-none p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Tracking</h2>
        <PaymentTracker bookingId={bookingId} />
      </div>

      <div className="bg-white border border-gray-200 rounded-none p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Communication Log</h2>
        <MessageThread bookingId={bookingId} />
      </div>
    </div>
  );
}
