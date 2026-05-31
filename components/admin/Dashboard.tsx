"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { BookingRecord, BookingStatus, BOOKING_STATUS, EVENT_TYPE_LABELS } from "@/types";
import { Loader2, CalendarCheck, TrendingUp, CheckCircle, List } from "lucide-react";

export function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    newRequests: 0,
    confirmed: 0,
    completed: 0,
    total: 0,
  });
  const [recentBookings, setRecentBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/bookings");
        const result = await res.json();

        if (!res.ok) throw new Error(result.error);

        const bookings: BookingRecord[] = result.data ?? [];

        setStats({
          newRequests: bookings.filter((b) => b.status === BOOKING_STATUS.NEW_REQUEST).length,
          confirmed: bookings.filter((b) => b.status === BOOKING_STATUS.CONFIRMED).length,
          completed: bookings.filter((b) => b.status === BOOKING_STATUS.COMPLETED).length,
          total: bookings.length,
        });

        setRecentBookings(bookings.slice(0, 10));
      } catch (err) {
        console.error("DASHBOARD_FETCH_ERROR", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const statCards = [
    { label: "New Requests", value: stats.newRequests, icon: CalendarCheck, color: "text-blue-400 bg-blue-500/10" },
    { label: "Confirmed", value: stats.confirmed, icon: TrendingUp, color: "text-green-400 bg-green-500/10" },
    { label: "Completed", value: stats.completed, icon: CheckCircle, color: "text-gray-400 bg-gray-500/10" },
    { label: "Total Bookings", value: stats.total, icon: List, color: "text-[#d4a85c] bg-[#bf8f38]/10" },
  ];

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#bf8f38]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your event bookings</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white border border-gray-200 rounded-none p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 text-sm">{card.label}</span>
                <div className={`p-2 rounded-none ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-gray-200 rounded-none">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
        </div>

        {recentBookings.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600">No bookings yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-5 font-medium text-gray-600">Client</th>
                  <th className="text-left py-3 px-5 font-medium text-gray-600 hidden sm:table-cell">Event</th>
                  <th className="text-left py-3 px-5 font-medium text-gray-600 hidden md:table-cell">Date</th>
                  <th className="text-left py-3 px-5 font-medium text-gray-600">Status</th>
                  <th className="text-right py-3 px-5 font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-5">
                      <div className="text-gray-900 font-medium">{booking.clientName}</div>
                      <div className="text-gray-600 text-xs">{booking.clientEmail}</div>
                    </td>
                    <td className="py-3 px-5 text-gray-700 hidden sm:table-cell">
                      {EVENT_TYPE_LABELS[booking.eventType] || booking.eventType}
                    </td>
                    <td className="py-3 px-5 text-gray-600 hidden md:table-cell">
                      {booking.eventDate ? new Date(booking.eventDate).toLocaleDateString() : "-"}
                    </td>
                    <td className="py-3 px-5">
                      <StatusBadge status={booking.status as BookingStatus} />
                    </td>
                    <td className="py-3 px-5 text-right">
                      <button
                        onClick={() => router.push(`/admin/bookings/${booking.id}`)}
                        className="text-[#bf8f38] hover:text-[#bf8f38] text-sm font-medium transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}