"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProposalStatusBadge } from "@/components/ui/ProposalStatusBadge";
import { ProposalRecord, EVENT_TYPE_LABELS, PROPOSAL_ITEM_CATEGORY_LABELS } from "@/types";
import {
  Loader2,
  ArrowLeft,
  Edit,
  Send,
  Copy,
  Download,
  ExternalLink,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";

export function ProposalDetail() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [proposal, setProposal] = useState<ProposalRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const fetchProposal = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/proposals/${params.id}`);
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to fetch");
      setProposal(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposal();
  }, [params.id]);

  const handleSend = async () => {
    setSending(true);
    try {
      const res = await fetch(`/api/proposals/${params.id}/send`, { method: "POST" });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to send");
      fetchProposal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  };

  const handleDuplicate = async () => {
    try {
      const res = await fetch(`/api/proposals/${params.id}/duplicate`, { method: "POST" });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to duplicate");
      if (result.data) {
        router.push(`/admin/proposals/${result.data.id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to duplicate");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 mb-4">{error || "Proposal not found"}</p>
        <button
          onClick={() => router.push("/admin/proposals")}
          className="text-amber-600 underline hover:no-underline"
        >
          Back to proposals
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/proposals")}
            className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{proposal.title}</h1>
              <ProposalStatusBadge status={proposal.status} />
            </div>
            <p className="text-sm text-gray-500 mt-0.5">
              {proposal.proposalNumber}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push(`/admin/proposals/${proposal.id}/edit`)}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          {proposal.status === "DRAFT" && (
            <button
              onClick={handleSend}
              disabled={sending}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-purple-600 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {sending ? "Sending..." : "Send"}
            </button>
          )}
          <button
            onClick={() => window.open(`/proposal/${proposal.publicToken}`, "_blank")}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Public View
          </button>
          <button
            onClick={handleDuplicate}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-amber-600 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
          >
            <Copy className="w-4 h-4" />
            Duplicate
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Info */}
          {proposal.booking && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-sm font-medium text-gray-900">{proposal.booking.clientName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">{proposal.booking.clientEmail}</p>
                  </div>
                </div>
                {proposal.booking.clientPhone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-900">{proposal.booking.clientPhone}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Event Date</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(proposal.booking.eventDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Event Type</p>
                    <p className="text-sm font-medium text-gray-900">
                      {EVENT_TYPE_LABELS[proposal.booking.eventType] || proposal.booking.eventType}
                    </p>
                  </div>
                </div>
                {proposal.booking.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-sm font-medium text-gray-900">{proposal.booking.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Event Vision / Theme */}
          {(proposal.introduction || proposal.eventVision || proposal.themeConcept) && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Proposal Content</h2>
              {proposal.introduction && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Introduction</h3>
                  <p className="text-gray-900 text-sm">{proposal.introduction}</p>
                </div>
              )}
              {proposal.eventVision && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Event Vision</h3>
                  <p className="text-gray-900 text-sm">{proposal.eventVision}</p>
                </div>
              )}
              {proposal.themeConcept && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Theme Concept</h3>
                  <p className="text-gray-900 text-sm">{proposal.themeConcept}</p>
                </div>
              )}
            </div>
          )}

          {/* Pricing Breakdown */}
          {proposal.items && proposal.items.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing Breakdown</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 pr-4 font-medium text-gray-600">Item</th>
                      <th className="text-left py-2 pr-4 font-medium text-gray-600 hidden sm:table-cell">Category</th>
                      <th className="text-right py-2 pr-4 font-medium text-gray-600">Qty</th>
                      <th className="text-right py-2 pr-4 font-medium text-gray-600">Unit Price</th>
                      <th className="text-right py-2 font-medium text-gray-600">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proposal.items.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="py-3 pr-4">
                          <p className="font-medium text-gray-900">{item.title}</p>
                          {item.description && (
                            <p className="text-xs text-gray-500">{item.description}</p>
                          )}
                        </td>
                        <td className="py-3 pr-4 text-gray-600 hidden sm:table-cell">
                          {PROPOSAL_ITEM_CATEGORY_LABELS[item.category] || item.category}
                        </td>
                        <td className="py-3 pr-4 text-right text-gray-700">{item.quantity}</td>
                        <td className="py-3 pr-4 text-right text-gray-700">
                          ETB {item.unitPrice.toLocaleString()}
                        </td>
                        <td className="py-3 text-right font-medium text-gray-900">
                          ETB {item.totalPrice.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={4} className="pt-4 text-right font-bold text-gray-900">
                        Total
                      </td>
                      <td className="pt-4 text-right font-bold text-amber-600">
                        ETB {proposal.totalAmount.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* Contract Terms */}
          {proposal.contracts && proposal.contracts.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contract Terms</h2>
              <div className="space-y-4">
                {proposal.contracts.map((contract) => (
                  <div key={contract.id}>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{contract.title}</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{contract.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Status & Dates */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Details</h2>

            <div>
              <p className="text-xs text-gray-500">Status</p>
              <div className="mt-1">
                <ProposalStatusBadge status={proposal.status} />
              </div>
            </div>

            {proposal.clientApproved && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm font-medium text-green-800">Approved by client</p>
                {proposal.clientApprovedAt && (
                  <p className="text-xs text-green-600 mt-0.5">
                    {new Date(proposal.clientApprovedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}

            {proposal.clientRejected && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm font-medium text-red-800">Rejected by client</p>
                {proposal.rejectionReason && (
                  <p className="text-xs text-red-600 mt-0.5">{proposal.rejectionReason}</p>
                )}
              </div>
            )}

            <div>
              <p className="text-xs text-gray-500">Created by</p>
              <p className="text-sm font-medium text-gray-900 mt-0.5">
                {proposal.createdBy?.name || "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Created</p>
              <p className="text-sm text-gray-900 mt-0.5">
                {new Date(proposal.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Valid until</p>
              <p className="text-sm text-gray-900 mt-0.5">
                {proposal.validUntil
                  ? new Date(proposal.validUntil).toLocaleDateString()
                  : "Not specified"}
              </p>
            </div>
          </div>

          {/* Public Link */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
              Public Link
            </h2>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">Client view link:</p>
              <a
                href={`/proposal/${proposal.publicToken}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-amber-600 hover:text-amber-500 break-all"
              >
                {window.location.origin}/proposal/{proposal.publicToken}
              </a>
            </div>
          </div>

          {/* Comments */}
          {proposal.comments && proposal.comments.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                Comments ({proposal.comments.length})
              </h2>
              <div className="space-y-3">
                {proposal.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900">{comment.authorName}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}