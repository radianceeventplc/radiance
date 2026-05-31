import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BookingTable } from "@/components/admin/BookingTable";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Bookings | Admin | Radiance",
  description: "Manage booking requests",
};

export default function AdminBookingsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-radiance-navy">Bookings</h1>
          <p className="text-gray-600 mt-1">
            Manage and respond to event booking requests
          </p>
        </div>
        <Link href="/admin/bookings/create" className="inline-flex items-center gap-2 px-4 py-2 bg-[#bf8f38] text-white font-medium rounded-none hover:bg-[#bf8f38] transition-colors">
          <Plus className="h-4 w-4" />
          Create Booking
        </Link>
      </div>

      <Suspense fallback={<div className="py-12 text-sm text-gray-600">Loading bookings...</div>}>
        <BookingTable />
      </Suspense>
    </div>
  );
}
