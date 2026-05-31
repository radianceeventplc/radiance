"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2, Check } from "lucide-react";

interface PaymentData {
  agreed_amount: string;
  deposit_amount: string;
  deposit_received: boolean;
  deposit_date: string;
  balance_paid: boolean;
  balance_date: string;
}

interface PaymentTrackerProps {
  bookingId: string;
  initialData?: Partial<PaymentData>;
}

export function PaymentTracker({
  bookingId,
  initialData,
}: PaymentTrackerProps) {
  const [data, setData] = useState<PaymentData>({
    agreed_amount: initialData?.agreed_amount || "",
    deposit_amount: initialData?.deposit_amount || "",
    deposit_received: initialData?.deposit_received || false,
    deposit_date: initialData?.deposit_date || "",
    balance_paid: initialData?.balance_paid || false,
    balance_date: initialData?.balance_date || "",
  });
  const [saving, setSaving] = useState(false);

  const getPaymentStatus = () => {
    if (!data.agreed_amount) return "none";
    if (data.balance_paid) return "paid";
    if (data.deposit_received) return "deposit";
    return "none";
  };

  const paymentStatus = getPaymentStatus();

  const statusIndicator = {
    none: "bg-red-500",
    deposit: "bg-yellow-500",
    paid: "bg-green-500",
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payment: data }),
      });

      if (!res.ok) throw new Error("Failed to save payment");
    } catch (err) {
      console.error("PAYMENT_SAVE_ERROR", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Status indicator */}
      <div className="flex items-center gap-3">
        <div className={cn("w-3 h-3 rounded-full", statusIndicator[paymentStatus])} />
        <span className="text-sm text-gray-600">
          {paymentStatus === "none" && "No payment recorded"}
          {paymentStatus === "deposit" && "Deposit received"}
          {paymentStatus === "paid" && "Fully paid"}
        </span>
      </div>

      <div className="space-y-4">
        {/* Agreed Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Agreed Amount (ETB)
          </label>
          <input
            type="number"
            value={data.agreed_amount}
            onChange={(e) =>
              setData((prev) => ({ ...prev, agreed_amount: e.target.value }))
            }
            placeholder="0.00"
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-none text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#bf8f38] focus:border-[#bf8f38] transition-colors text-sm"
          />
        </div>

        {/* Deposit */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Deposit Amount
            </label>
            <input
              type="number"
              value={data.deposit_amount}
              onChange={(e) =>
                setData((prev) => ({ ...prev, deposit_amount: e.target.value }))
              }
              placeholder="0.00"
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-none text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#bf8f38] focus:border-[#bf8f38] transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Deposit Received
            </label>
            <button
              onClick={() =>
                setData((prev) => ({
                  ...prev,
                  deposit_received: !prev.deposit_received,
                }))
              }
              className={cn(
                "w-full px-4 py-2.5 rounded-none border text-sm font-medium transition-colors flex items-center justify-center gap-2",
                data.deposit_received
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-500"
              )}
            >
              {data.deposit_received && <Check className="w-4 h-4" />}
              {data.deposit_received ? "Received" : "Mark Received"}
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Deposit Date
            </label>
            <input
              type="date"
              value={data.deposit_date}
              onChange={(e) =>
                setData((prev) => ({ ...prev, deposit_date: e.target.value }))
              }
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-none text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#bf8f38] focus:border-[#bf8f38] transition-colors text-sm"
            />
          </div>
        </div>

        {/* Balance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Balance Paid
            </label>
            <button
              onClick={() =>
                setData((prev) => ({
                  ...prev,
                  balance_paid: !prev.balance_paid,
                  balance_date: !prev.balance_paid
                    ? new Date().toISOString().split("T")[0]
                    : "",
                }))
              }
              className={cn(
                "w-full px-4 py-2.5 rounded-none border text-sm font-medium transition-colors flex items-center justify-center gap-2",
                data.balance_paid
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-500"
              )}
            >
              {data.balance_paid && <Check className="w-4 h-4" />}
              {data.balance_paid ? "Paid" : "Mark Paid"}
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Balance Date
            </label>
            <input
              type="date"
              value={data.balance_date}
              onChange={(e) =>
                setData((prev) => ({ ...prev, balance_date: e.target.value }))
              }
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-none text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#bf8f38] focus:border-[#bf8f38] transition-colors text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-[#bf8f38] hover:bg-[#bf8f38] text-white text-sm font-medium rounded-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Save Payment"
          )}
        </button>
      </div>
    </div>
  );
}