"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Loader2,
  CheckCircle,
  XCircle,
  Send,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Calendar,
  MapPin,
  Users,
} from "lucide-react";
import { ProposalRecord, EVENT_TYPE_LABELS, PROPOSAL_ITEM_CATEGORY_LABELS } from "@/types";
import { cn } from "@/lib/utils";

export function PublicProposalView() {
  const params = useParams<{ token: string }>();
  const [proposal, setProposal] = useState<ProposalRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [actionResult, setActionResult] = useState<"approve" | "reject" | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentName, setCommentName] = useState("");
  const [commentSent, setCommentSent] = useState(false);

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const res = await fetch(`/api/proposal/public/${params.token}`);
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "Proposal not found");
        setProposal(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProposal();
  }, [params.token]);

  const handleApprove = async () => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/proposal/public/${params.token}/approve`, {
        method: "POST",
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to approve");
      setActionResult("approve");
      setProposal((prev) =>
        prev ? { ...prev, status: "APPROVED", clientApproved: true } : prev
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/proposal/public/${params.token}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: rejectionReason }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to reject");
      setActionResult("reject");
      setProposal((prev) =>
        prev ? { ...prev, status: "REJECTED", clientRejected: true, rejectionReason } : prev
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setActionLoading(false);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim() || !commentName.trim()) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/proposal/public/${params.token}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorName: commentName, content: commentText }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to send comment");
      setCommentSent(true);
      setCommentText("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-amber-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading proposal...</p>
        </div>
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Proposal Not Found</h1>
          <p className="text-gray-600">
            This proposal link may be invalid or expired. Please contact Radiance Event PLC for assistance.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">R</span>
            </div>
            <span className="font-semibold text-gray-900">Radiance</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-500 font-mono text-xs">{proposal.proposalNumber}</span>
            {proposal.clientApproved && (
              <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs font-medium">
                <CheckCircle className="w-3 h-3" />
                Approved
              </span>
            )}
            {proposal.clientRejected && (
              <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-2 py-0.5 rounded-full text-xs font-medium">
                <XCircle className="w-3 h-3" />
                Rejected
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Proposal Content - Luxury Editorial */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Cover Page */}
          <div className="px-8 md:px-16 py-16 md:py-24 text-center border-b border-gray-100">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <span className="text-white text-3xl font-bold">R</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight font-['Cormorant_Garamond']">
              {proposal.title}
            </h1>
            <p className="text-xl text-gray-500 mb-2 font-['DM_Sans']">
              {proposal.booking?.clientName}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400 font-['DM_Sans'] mt-6">
              <span>{EVENT_TYPE_LABELS[proposal.booking?.eventType || ""] || "Event"}</span>
              {proposal.booking?.eventDate && (
                <>
                  <span className="text-gray-300">|</span>
                  <span>{new Date(proposal.booking.eventDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</span>
                </>
              )}
              {proposal.booking?.location && (
                <>
                  <span className="text-gray-300">|</span>
                  <span>{proposal.booking.location}</span>
                </>
              )}
            </div>
          </div>

          {/* Welcome / Introduction */}
          {proposal.introduction && (
            <div className="px-8 md:px-16 py-12 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-['Cormorant_Garamond']">
                Welcome
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">{proposal.introduction}</p>
            </div>
          )}

          {/* Event Vision */}
          {proposal.eventVision && (
            <div className="px-8 md:px-16 py-12 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-['Cormorant_Garamond']">
                The Vision
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">{proposal.eventVision}</p>
            </div>
          )}

          {/* Theme Concept */}
          {proposal.themeConcept && (
            <div className="px-8 md:px-16 py-12 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-['Cormorant_Garamond']">
                Theme & Concept
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">{proposal.themeConcept}</p>
            </div>
          )}

          {/* Custom Sections */}
          {proposal.sections && proposal.sections.length > 0 && (
            <div className="px-8 md:px-16 py-12 border-b border-gray-100 space-y-10">
              {proposal.sections.map((section) => (
                <div key={section.id}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 font-['Cormorant_Garamond']">
                    {section.title}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Pricing Breakdown */}
          {proposal.items && proposal.items.length > 0 && (
            <div className="px-8 md:px-16 py-12 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 font-['Cormorant_Garamond']">
                Investment
              </h2>

              <div className="space-y-4">
                {proposal.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-4 border-b border-gray-100"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      {item.description && (
                        <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {item.quantity} × ETB {item.unitPrice.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold text-gray-900">
                        ETB {item.totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Grand Total */}
              <div className="flex items-center justify-between py-6 mt-6 border-t-2 border-amber-500/40">
                <span className="text-xl font-bold text-gray-900 font-['Cormorant_Garamond']">
                  Total Investment
                </span>
                <span className="text-2xl font-bold text-amber-600">
                  ETB {proposal.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {/* Contract Terms */}
          {proposal.contracts && proposal.contracts.length > 0 && (
            <div className="px-8 md:px-16 py-12 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 font-['Cormorant_Garamond']">
                Terms & Conditions
              </h2>
              <div className="space-y-6">
                {proposal.contracts.map((contract) => (
                  <div key={contract.id}>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{contract.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{contract.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action & Signature Section */}
          <div className="px-8 md:px-16 py-12">
            {actionResult === "approve" ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Proposal Approved</h2>
                <p className="text-gray-600">Thank you! Your approval has been received. A Radiance representative will be in touch shortly.</p>
              </div>
            ) : actionResult === "reject" ? (
              <div className="text-center py-8">
                <p className="text-lg text-gray-700 mb-2">Your feedback has been received.</p>
                <p className="text-gray-500">A Radiance representative will follow up with you.</p>
              </div>
            ) : (
              <>
                {/* Signature Section */}
                <h2 className="text-2xl font-bold text-gray-900 mb-8 font-['Cormorant_Garamond']">
                  Acceptance
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <div className="border-b-2 border-gray-300 pb-2 mb-2">
                      <p className="text-gray-400 text-sm">Client Signature</p>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">Date: _______________</p>
                  </div>
                  <div>
                    <div className="border-b-2 border-gray-300 pb-2 mb-2">
                      <p className="text-gray-400 text-sm">Radiance Representative</p>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">Date: _______________</p>
                  </div>
                </div>

                {/* Approve / Reject Buttons */}
                {!proposal.clientApproved && !proposal.clientRejected && (
                  <div className="border-t border-gray-100 pt-8">
                    <p className="text-center text-gray-600 mb-6 font-['DM_Sans']">
                      Do you approve this proposal?
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button
                        onClick={handleApprove}
                        disabled={actionLoading}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50 text-base"
                      >
                        {actionLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <CheckCircle className="w-5 h-5" />
                        )}
                        Approve Proposal
                      </button>
                      <button
                        onClick={() => setShowRejectForm(!showRejectForm)}
                        disabled={actionLoading}
                        className="inline-flex items-center gap-2 px-8 py-3 border border-red-300 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors disabled:opacity-50 text-base"
                      >
                        <XCircle className="w-5 h-5" />
                        Request Changes
                      </button>
                    </div>

                    {/* Reject Form */}
                    {showRejectForm && (
                      <div className="max-w-md mx-auto mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-sm font-medium text-red-800 mb-2">
                          Let us know what you'd like changed:
                        </p>
                        <textarea
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-red-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                          placeholder="Your feedback helps us improve..."
                        />
                        <button
                          onClick={handleReject}
                          disabled={actionLoading || !rejectionReason.trim()}
                          className="mt-2 w-full px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                          {actionLoading ? "Sending..." : "Submit Feedback"}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Comments Section */}
            <div className="border-t border-gray-100 pt-8 mt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 font-['Cormorant_Garamond']">
                Comments & Questions
              </h3>

              {/* Existing Comments */}
              {proposal.comments && proposal.comments.length > 0 && (
                <div className="space-y-3 mb-6">
                  {proposal.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-xl p-4">
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
              )}

              {/* Add Comment */}
              {!commentSent ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={3}
                    placeholder="Write a comment or ask a question..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  />
                  <button
                    onClick={handleComment}
                    disabled={actionLoading || !commentText.trim() || !commentName.trim()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors disabled:opacity-50"
                  >
                    {actionLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    Send Comment
                  </button>
                </div>
              ) : (
                <p className="text-sm text-green-600">Comment sent! A representative will respond shortly.</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 text-sm text-gray-400">
          <p>Radiance Event PLC — Premium Event Experiences</p>
          <p className="mt-1">
            This proposal is valid until{" "}
            {proposal.validUntil
              ? new Date(proposal.validUntil).toLocaleDateString()
              : "the date specified"}
          </p>
        </div>
      </div>
    </div>
  );
}