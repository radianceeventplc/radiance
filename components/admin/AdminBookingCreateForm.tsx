"use client";

import { useState, FormEvent } from "react";
import { bookingFormSchema } from "@/lib/validations";
import { EVENT_TYPE_LABELS, BUDGET_LABELS } from "@/types";
import { Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FormData = {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: string;
  eventDate: string;
  location: string;
  guestCount: string;
  budgetRange: string;
  notes: string;
};

const initialFormData: FormData = {
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  eventType: "",
  eventDate: "",
  location: "",
  guestCount: "",
  budgetRange: "",
  notes: "",
};

interface FormErrors {
  [key: string]: string;
}

const eventTypes = [
  "WEDDING", "BIRTHDAY", "CORPORATE", "GRADUATION",
  "ENGAGEMENT", "ANNIVERSARY", "CULTURAL", "OTHER",
];

const budgetRanges = [
  "UNDER_50K", "RANGE_50K_100K", "RANGE_100K_200K",
  "RANGE_200K_500K", "ABOVE_500K",
];

export function AdminBookingCreateForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateForm = (): boolean => {
    const result = bookingFormSchema.safeParse(formData);
    if (result.success) {
      setErrors({});
      return true;
    }

    const fieldErrors = result.error.flatten().fieldErrors as Record<string, string[] | undefined>;
    const nextErrors: FormErrors = {};

    Object.keys(formData).forEach((field) => {
      const fieldErrorsArr = fieldErrors[field as keyof FormData];
      if (fieldErrorsArr && fieldErrorsArr.length > 0) {
        nextErrors[field] = fieldErrorsArr[0];
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const validated = bookingFormSchema.parse(formData);

      // Create booking via API
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validated),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to create booking");
      }

      setIsSuccess(true);
      setFormData(initialFormData);
    } catch (error: any) {
      console.error("ADMIN_BOOKING_CREATE_ERROR", error);
      setSubmitError(error.message || "Failed to create booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border border-gray-200 rounded-xl p-6">
        <h2 className="mb-5 text-lg font-semibold text-gray-900">Create New Booking</h2>
        <p className="text-sm text-gray-600 mb-4">
          Create a new booking manually for walk-in clients or phone bookings
        </p>

        {isSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
            <span>Booking created successfully! The client will appear in the bookings table.</span>
          </div>
        )}

        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-600">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="clientName"
                type="text"
                value={formData.clientName}
                onChange={(e) => updateField("clientName", e.target.value)}
                placeholder="Client's full name"
                className={cn(
                  "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors",
                  errors.clientName ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-amber-500/20 focus:border-amber-500"
                )}
              />
              {errors.clientName && <p className="mt-1 text-sm text-red-500">{errors.clientName}</p>}
            </div>

            <div>
              <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="clientEmail"
                type="email"
                value={formData.clientEmail}
                onChange={(e) => updateField("clientEmail", e.target.value)}
                placeholder="client@email.com"
                className={cn(
                  "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors",
                  errors.clientEmail ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-amber-500/20 focus:border-amber-500"
                )}
              />
              {errors.clientEmail && <p className="mt-1 text-sm text-red-500">{errors.clientEmail}</p>}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700 mb-1.5">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="clientPhone"
                type="tel"
                value={formData.clientPhone}
                onChange={(e) => updateField("clientPhone", e.target.value)}
                placeholder="+254 7XX XXX XXX"
                className={cn(
                  "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors",
                  errors.clientPhone ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-amber-500/20 focus:border-amber-500"
                )}
              />
              {errors.clientPhone && <p className="mt-1 text-sm text-red-500">{errors.clientPhone}</p>}
            </div>

            <div>
              <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1.5">
                Event Type <span className="text-red-500">*</span>
              </label>
              <select
                id="eventType"
                value={formData.eventType}
                onChange={(e) => updateField("eventType", e.target.value)}
                className={cn(
                  "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors",
                  errors.eventType ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-amber-500/20 focus:border-amber-500"
                )}
              >
                <option value="">Select event type</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>{EVENT_TYPE_LABELS[type]}</option>
                ))}
              </select>
              {errors.eventType && <p className="mt-1 text-sm text-red-500">{errors.eventType}</p>}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1.5">
                Event Date <span className="text-red-500">*</span>
              </label>
              <input
                id="eventDate"
                type="date"
                value={formData.eventDate}
                onChange={(e) => updateField("eventDate", e.target.value)}
                className={cn(
                  "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors",
                  errors.eventDate ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-amber-500/20 focus:border-amber-500"
                )}
              />
              {errors.eventDate && <p className="mt-1 text-sm text-red-500">{errors.eventDate}</p>}
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1.5">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => updateField("location", e.target.value)}
                placeholder="Event venue or location"
                className={cn(
                  "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors",
                  errors.location ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-amber-500/20 focus:border-amber-500"
                )}
              />
              {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="guestCount" className="block text-sm font-medium text-gray-700 mb-1.5">
                Guest Count
              </label>
              <input
                id="guestCount"
                type="number"
                value={formData.guestCount}
                onChange={(e) => updateField("guestCount", e.target.value)}
                placeholder="Number of guests"
                className={cn(
                  "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors",
                  errors.guestCount ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-amber-500/20 focus:border-amber-500"
                )}
              />
              {errors.guestCount && <p className="mt-1 text-sm text-red-500">{errors.guestCount}</p>}
            </div>

            <div>
              <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700 mb-1.5">
                Budget Range <span className="text-red-500">*</span>
              </label>
              <select
                id="budgetRange"
                value={formData.budgetRange}
                onChange={(e) => updateField("budgetRange", e.target.value)}
                className={cn(
                  "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors",
                  errors.budgetRange ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-amber-500/20 focus:border-amber-500"
                )}
              >
                <option value="">Select budget range</option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range}>{BUDGET_LABELS[range]}</option>
                ))}
              </select>
              {errors.budgetRange && <p className="mt-1 text-sm text-red-500">{errors.budgetRange}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1.5">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              rows={4}
              value={formData.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder="Any special notes or requirements..."
              className={cn(
                "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors",
                errors.notes ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-amber-500/20 focus:border-amber-500"
              )}
            />
            {errors.notes && <p className="mt-1 text-sm text-red-500">{errors.notes}</p>}
          </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-amber-600 hover:bg-amber-500 text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Creating booking...
                    </div>
                  ) : (
                    <div>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Create Booking
                    </div>
                  )}
                </button>
              </div>
          </form>
        </div>

        {/* Quick stats */}
        <div className="border border-gray-200 rounded-xl p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Recent Activity</h2>
          <div className="space-y-3">
            <div className="text-sm text-gray-600">
              • Use this form to create bookings for clients who call or visit in person
            </div>
            <div className="text-sm text-gray-600">
              • New bookings start with "NEW_REQUEST" status and can be updated from the bookings table
            </div>
            <div className="text-sm text-gray-600">
              • All created bookings will trigger the standard workflow and notifications
            </div>
           </div>
         </div>
       </div>
   );
 }