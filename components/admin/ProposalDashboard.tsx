"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProposalStatusBadge } from "@/components/ui/ProposalStatusBadge";
import { ProposalRecord, EVENT_TYPE_LABELS, PROPOSAL_STATUS_LABELS } from "@/types";
import {
  Loader2,
  Plus,
  FileText,
  Eye,
  Edit,
  Send,
  Copy,
  Trash2,
  Search,
  Download,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ProposalDashboard() {
  const router = useRouter();
  const [proposals, setProposals] = useState<ProposalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchProposals = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      if (searchQuery.trim()) params.set("search", searchQuery.trim());

      const res = await fetch(`/api/proposals?${params.toString()}`);
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to fetch");
      setProposals(result.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, [statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProposals();
  };

  const handleDuplicate = async (id: string) => {
    try {
      const res = await fetch(`/api/proposals/${id}/duplicate`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to duplicate");
      fetchProposals();
    } catch (err) {
      console.error("DUPLICATE_ERROR", err);
    }
  };

  const handleSend = async (id: string) => {
    try {
      const res = await fetch(`/api/proposals/${id}/send`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to send");
      fetchProposals();
    } catch (err) {
      console.error("SEND_ERROR", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/proposals/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setDeleteConfirm(null);
      fetchProposals();
    } catch (err) {
      console.error("DELETE_ERROR", err);
    }
  };

  const handleView = (id: string) => {
    router.push(`/admin/proposals/${id}`);
  };

  const filteredProposals = proposals.filter((p) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.proposalNumber.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.booking?.clientName?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const statusOptions = [
    { value: "ALL", label: "All" },
    { value: "DRAFT", label: "Draft" },
    { value: "SENT", label: "Sent" },
    { value: "VIEWED", label: "Viewed" },
    { value: "APPROVED", label: "Approved" },
    { value: "REJECTED", label: "Rejected" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Proposals</h1>
          <p className="text-gray-600 mt-1">Create and manage event proposals & quotations</p>
        </div>
        <button
          onClick={() => router.push("/admin/proposals/new")}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          New Proposal
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={cn(
                "px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors border",
                statusFilter === opt.value
                  ? "bg-amber-500 text-white border-amber-500"
                  : "bg-white text-gray-600 border-gray-200 hover:border-amber-500"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearch} className="relative sm:ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search proposals..."
            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 w-full sm:w-64"
          />
        </form>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
        </div>
      )}

      {/* Empty */}
      {!loading && filteredProposals.length === 0 && (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No proposals found</p>
          <button
            onClick={() => router.push("/admin/proposals/new")}
            className="mt-4 text-amber-600 font-medium hover:text-amber-500 text-sm"
          >
            Create your first proposal
          </button>
        </div>
      )}

      {/* Table */}
      {!loading && filteredProposals.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-5 font-medium text-gray-600">Proposal #</th>
                  <th className="text-left py-3 px-5 font-medium text-gray-600">Title</th>
                  <th className="text-left py-3 px-5 font-medium text-gray-600 hidden md:table-cell">Client</th>
                  <th className="text-left py-3 px-5 font-medium text-gray-600 hidden lg:table-cell">Event</th>
                  <th className="text-right py-3 px-5 font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-5 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-5 font-medium text-gray-600 hidden sm:table-cell">Created</th>
                  <th className="text-right py-3 px-5 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProposals.map((proposal) => (
                  <tr
                    key={proposal.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-5">
                      <span className="font-mono text-xs text-gray-500">
                        {proposal.proposalNumber}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <button
                        onClick={() => handleView(proposal.id)}
                        className="text-gray-900 font-medium hover:text-amber-600 transition-colors"
                      >
                        {proposal.title}
                      </button>
                    </td>
                    <td className="py-3 px-5 text-gray-700 hidden md:table-cell">
                      {proposal.booking?.clientName || "—"}
                    </td>
                    <td className="py-3 px-5 text-gray-600 hidden lg:table-cell">
                      {EVENT_TYPE_LABELS[proposal.booking?.eventType || ""] || "—"}
                    </td>
                    <td className="py-3 px-5 text-right font-medium text-gray-900">
                      {proposal.currency} {proposal.totalAmount.toLocaleString()}
                    </td>
                    <td className="py-3 px-5">
                      <ProposalStatusBadge status={proposal.status} />
                    </td>
                    <td className="py-3 px-5 text-gray-600 text-xs hidden sm:table-cell">
                      {new Date(proposal.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleView(proposal.id)}
                          className="p-1.5 text-xs rounded border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                          title="View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => router.push(`/admin/proposals/${proposal.id}/edit`)}
                          className="p-1.5 text-xs rounded border border-blue-300 text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        {proposal.status === "DRAFT" && (
                          <button
                            onClick={() => handleSend(proposal.id)}
                            className="p-1.5 text-xs rounded border border-purple-300 text-purple-600 hover:bg-purple-50 transition-colors"
                            title="Send"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDuplicate(proposal.id)}
                          className="p-1.5 text-xs rounded border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                          title="Duplicate"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        {deleteConfirm === proposal.id ? (
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleDelete(proposal.id)}
                              className="p-1.5 text-xs rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                              title="Confirm Delete"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="p-1.5 text-xs rounded border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                              title="Cancel"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(proposal.id)}
                            className="p-1.5 text-xs rounded border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && filteredProposals.length > 0 && (
        <p className="text-xs text-gray-600">
          Showing {filteredProposals.length} proposal{filteredProposals.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}