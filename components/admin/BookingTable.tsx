"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { BookingRecord, BookingStatus, BOOKING_STATUS, STATUS_LABELS, EVENT_TYPE_LABELS, BUDGET_LABELS } from "@/types";
import { Loader2, Search, ChevronRight, Phone, Check, WandSparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function BookingTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>(
    searchParams.get("status") || "ALL"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      if (searchQuery.trim()) params.set("search", searchQuery.trim());

      const res = await fetch(`/api/bookings?${params.toString()}`);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to fetch");
      }

      setBookings(result.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBookings();
  };

  const quickUpdateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update");
      fetchBookings();
    } catch (err) {
      console.error("QUICK_UPDATE_ERROR", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const statusOptions = [
    { value: "ALL", label: "All" },
    { value: BOOKING_STATUS.NEW_REQUEST, label: "New Requests" },
    { value: BOOKING_STATUS.CONTACTED, label: "Contacted" },
    { value: BOOKING_STATUS.CONFIRMED, label: "Confirmed" },
    { value: BOOKING_STATUS.PLANNED, label: "Planning" },
    { value: BOOKING_STATUS.COMPLETED, label: "Completed" },
    { value: BOOKING_STATUS.CANCELLED, label: "Cancelled" },
  ];

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={fetchBookings} className="text-[#bf8f38] underline hover:no-underline">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setStatusFilter(option.value)}
              className={cn(
                "px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors border",
                statusFilter === option.value
                  ? "bg-[#bf8f38] text-white border-[#bf8f38]"
                  : "bg-gray-100 text-gray-600 border-gray-200 hover:border-[#bf8f38]"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearch} className="relative sm:ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name..."
            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-none text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#bf8f38] focus:border-[#bf8f38] w-full sm:w-64"
          />
        </form>
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#bf8f38]" />
        </div>
      )}

      {!loading && bookings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No bookings found</p>
        </div>
      )}

      {!loading && bookings.length > 0 && (
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-none">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-5 font-medium text-gray-600">Client</th>
                <th className="text-left py-3 px-5 font-medium text-gray-600">Event</th>
                <th className="text-left py-3 px-5 font-medium text-gray-600 hidden md:table-cell">Date</th>
                <th className="text-left py-3 px-5 font-medium text-gray-600 hidden sm:table-cell">Budget</th>
                <th className="text-left py-3 px-5 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-5 font-medium text-gray-600">Submitted</th>
                <th className="text-right py-3 px-5 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => router.push(`/admin/bookings/${booking.id}`)}
                >
                  <td className="py-3 px-5">
                    <div className="text-gray-900 font-medium">{booking.clientName}</div>
                    <div className="text-gray-600 text-xs">{booking.clientEmail}</div>
                  </td>
                  <td className="py-3 px-5 text-gray-700">
                    {EVENT_TYPE_LABELS[booking.eventType] || booking.eventType}
                  </td>
                  <td className="py-3 px-5 text-gray-600 hidden md:table-cell">
                    {booking.eventDate ? new Date(booking.eventDate).toLocaleDateString() : "-"}
                  </td>
                  <td className="py-3 px-5 text-gray-600 hidden sm:table-cell">
                    {BUDGET_LABELS[booking.budgetRange] || booking.budgetRange}
                  </td>
                  <td className="py-3 px-5">
                    <StatusBadge status={booking.status as BookingStatus} />
                  </td>
                  <td className="py-3 px-5 text-gray-600 text-xs">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {booking.status === BOOKING_STATUS.NEW_REQUEST && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            quickUpdateStatus(booking.id, BOOKING_STATUS.CONTACTED);
                          }}
                          disabled={updatingId === booking.id}
                          className="p-1.5 text-xs rounded border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Mark Contacted"
                        >
                          {updatingId === booking.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Phone className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                      {booking.status === BOOKING_STATUS.CONTACTED && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            quickUpdateStatus(booking.id, BOOKING_STATUS.CONFIRMED);
                          }}
                          disabled={updatingId === booking.id}
                          className="p-1.5 text-xs rounded border border-green-500 text-green-600 hover:bg-green-50 transition-colors"
                          title="Mark Confirmed"
                        >
                          {updatingId === booking.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Check className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                      {booking.eventType === "WEDDING" &&
                        [BOOKING_STATUS.CONFIRMED, BOOKING_STATUS.PLANNED].includes(
                          booking.status as typeof BOOKING_STATUS.CONFIRMED | typeof BOOKING_STATUS.PLANNED
                        ) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/admin/bookings/${booking.id}/invitation`);
                            }}
                            className="inline-flex items-center gap-1 rounded border border-pink-400 px-2 py-1.5 text-xs font-medium text-pink-600 transition-colors hover:bg-pink-50"
                            title={booking.invitations?.[0] ? "Edit Wedding Card" : "Design Wedding Card"}
                          >
                            <WandSparkles className="w-3.5 h-3.5" />
                            <span className="hidden lg:inline">Cards</span>
                          </button>
                        )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/admin/bookings/${booking.id}`);
                        }}
                        className="p-1.5 text-xs rounded border border-[#bf8f38] text-[#bf8f38] hover:bg-[#fdf6e8] transition-colors"
                        title="View Details"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && bookings.length > 0 && (
        <p className="text-xs text-gray-600 mt-4">
          Showing {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
