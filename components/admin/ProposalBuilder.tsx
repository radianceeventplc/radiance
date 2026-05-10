"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Eye,
  FileText,
  Send,
  Save,
  Sparkles,
  ArrowLeft,
  DollarSign,
  FileSignature,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProposalStatusBadge } from "@/components/ui/ProposalStatusBadge";
import { ProposalRecord, EVENT_TYPE_LABELS, PROPOSAL_ITEM_CATEGORY_LABELS, PROPOSAL_ITEM_CATEGORIES } from "@/types";

interface Props {
  proposalId?: string;
  isEditing?: boolean;
}

interface PricingItem {
  title: string;
  description: string;
  quantity: number;
  unitPrice: number;
  category: string;
}

interface SectionItem {
  title: string;
  content: string;
}

interface ContractItem {
  title: string;
  content: string;
}

const DEFAULT_SECTION_TEMPLATES = [
  { title: "Event Story", content: "Tell the story of how this event came together..." },
  { title: "Design Direction", content: "Describe the creative direction and visual approach..." },
  { title: "Mood & Inspiration", content: "Set the tone with mood references and inspiration..." },
  { title: "Guest Experience", content: "Outline the journey guests will experience..." },
];

const DEFAULT_CONTRACT_TERMS = [
  {
    title: "Payment Terms",
    content: "A 50% deposit is required to secure the booking. The remaining balance is due 7 days before the event date.",
  },
  {
    title: "Cancellation Policy",
    content: "Cancellations made 30+ days before the event receive a full refund. Cancellations within 14-29 days receive a 50% refund. Cancellations within 13 days are non-refundable.",
  },
  {
    title: "Event Responsibility",
    content: "Radiance Event PLC will be responsible for the setup, execution, and takedown of all contracted services. Client is responsible for providing access to the venue at agreed times.",
  },
  {
    title: "Vendor Limitations",
    content: "Any external vendors brought in by the client must be approved in writing at least 14 days before the event.",
  },
];

export function ProposalBuilder({ proposalId, isEditing }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState<
    "details" | "pricing" | "sections" | "contract" | "preview"
  >("details");

  // Form state
  const [bookingId, setBookingId] = useState("");
  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [eventVision, setEventVision] = useState("");
  const [themeConcept, setThemeConcept] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [notes, setNotes] = useState("");

  // Pricing items
  const [pricingItems, setPricingItems] = useState<PricingItem[]>([
    { title: "", description: "", quantity: 1, unitPrice: 0, category: "CUSTOM" },
  ]);

  // Sections
  const [sections, setSections] = useState<SectionItem[]>([]);

  // Contracts
  const [contracts, setContracts] = useState<ContractItem[]>([]);

  // Bookings list for dropdown
  const [bookings, setBookings] = useState<Array<{ id: string; clientName: string; eventType: string; eventDate: string }>>([]);

  // Preview data
  const [previewData, setPreviewData] = useState<ProposalRecord | null>(null);

  // Load bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings");
        const result = await res.json();
        if (res.ok) {
          setBookings(result.data ?? []);
          // Auto-select first booking if new
          if (!isEditing && result.data?.length > 0 && !bookingId) {
            setBookingId(result.data[0].id);
          }
        }
      } catch (err) {
        console.error("BOOKINGS_FETCH_ERROR", err);
      }
    };
    fetchBookings();
  }, []);

  // Load proposal data if editing
  useEffect(() => {
    if (proposalId && isEditing) {
      const fetchProposal = async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/proposals/${proposalId}`);
          const result = await res.json();
          if (!res.ok) throw new Error(result.error);

          const data = result.data as ProposalRecord;
          setTitle(data.title);
          setIntroduction(data.introduction || "");
          setEventVision(data.eventVision || "");
          setThemeConcept(data.themeConcept || "");
          setValidUntil(data.validUntil ? new Date(data.validUntil).toISOString().split("T")[0] : "");
          setNotes(data.notes || "");
          setBookingId(data.bookingId);

          if (data.items && data.items.length > 0) {
            setPricingItems(
              data.items.map((item) => ({
                title: item.title,
                description: item.description || "",
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                category: item.category,
              }))
            );
          }

          if (data.sections && data.sections.length > 0) {
            setSections(
              data.sections.map((s) => ({
                title: s.title,
                content: s.content,
              }))
            );
          }

          if (data.contracts && data.contracts.length > 0) {
            setContracts(
              data.contracts.map((c) => ({
                title: c.title,
                content: c.content,
              }))
            );
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to load proposal");
        } finally {
          setLoading(false);
        }
      };
      fetchProposal();
    }
  }, [proposalId, isEditing]);

  const addPricingItem = () => {
    setPricingItems([...pricingItems, { title: "", description: "", quantity: 1, unitPrice: 0, category: "CUSTOM" }]);
  };

  const removePricingItem = (index: number) => {
    if (pricingItems.length > 1) {
      setPricingItems(pricingItems.filter((_, i) => i !== index));
    }
  };

  const updatePricingItem = (index: number, field: keyof PricingItem, value: string | number) => {
    setPricingItems((prev) => {
      const items = [...prev];
      items[index] = { ...items[index], [field]: value };
      return items;
    });
  };

  const addSection = () => {
    setSections([...sections, { title: "", content: "" }]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const updateSection = (index: number, field: keyof SectionItem, value: string) => {
    setSections((prev) => {
      const items = [...prev];
      items[index] = { ...items[index], [field]: value };
      return items;
    });
  };

  const addContract = () => {
    setContracts([...contracts, { title: "", content: "" }]);
  };

  const removeContract = (index: number) => {
    setContracts(contracts.filter((_, i) => i !== index));
  };

  const updateContract = (index: number, field: keyof ContractItem, value: string) => {
    setContracts((prev) => {
      const items = [...prev];
      items[index] = { ...items[index], [field]: value };
      return items;
    });
  };

  const loadSectionTemplate = (templateIndex: number) => {
    if (templateIndex >= 0 && templateIndex < DEFAULT_SECTION_TEMPLATES.length) {
      const tpl = DEFAULT_SECTION_TEMPLATES[templateIndex];
      setSections([...sections, { title: tpl.title, content: tpl.content }]);
    }
  };

  const loadContractDefaults = () => {
    setContracts(DEFAULT_CONTRACT_TERMS.map((c) => ({ ...c })));
  };

  const calculateTotal = () => {
    return pricingItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  const handleSave = async (publishStatus: "DRAFT" | "SENT" = "DRAFT") => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const body = {
        bookingId,
        title,
        introduction,
        eventVision,
        themeConcept,
        validUntil: validUntil || null,
        notes,
        items: pricingItems
          .filter((item) => item.title.trim())
          .map((item) => ({
            title: item.title,
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            category: item.category,
          })),
        sections: sections.filter((s) => s.title.trim()),
        contracts: contracts.filter((c) => c.title.trim()),
      };

      let result;
      if (isEditing && proposalId) {
        const updateBody = { ...body, status: publishStatus };
        const res = await fetch(`/api/proposals/${proposalId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        result = await res.json();
        if (!res.ok) throw new Error(result.error || "Failed to update");
      } else {
        const res = await fetch("/api/proposals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        result = await res.json();
        if (!res.ok) throw new Error(result.error || "Failed to create");
      }

      setSuccess(
        isEditing
          ? "Proposal updated successfully!"
          : "Proposal created successfully!"
      );

      if (!isEditing && result.data) {
        router.push(`/admin/proposals/${result.data.id}`);
      } else {
        setPreviewData(result.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleSend = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/proposals/${proposalId}/send`, { method: "POST" });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to send");
      setSuccess("Proposal sent successfully!");
      router.push("/admin/proposals");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "details" as const, label: "Details", icon: FileText },
    { id: "pricing" as const, label: "Pricing", icon: DollarSign },
    { id: "sections" as const, label: "Sections", icon: Sparkles },
    { id: "contract" as const, label: "Contract", icon: FileSignature },
    { id: "preview" as const, label: "Preview", icon: Eye },
  ];

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/proposals")}
            className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? "Edit Proposal" : "Create Proposal"}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {isEditing ? "Update proposal details" : "Build a professional event proposal"}
            </p>
          </div>
          {previewData && (
            <ProposalStatusBadge status={previewData.status} />
          )}
        </div>
        <div className="flex items-center gap-2">
          {isEditing && (
            <>
              <button
                onClick={handleSend}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </>
          )}
          <button
            onClick={() => handleSave("DRAFT")}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Draft"}
          </button>
          <button
            onClick={() => handleSave("SENT")}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {saving ? "Saving..." : "Save & Send"}
          </button>
        </div>
      </div>

      {/* Error & Success */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          {success}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab.id
                  ? "border-amber-500 text-amber-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* LEFT SIDE - Controls */}
        <div className="space-y-6">
          {activeTab === "details" && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
              <h2 className="text-lg font-semibold text-gray-900">Proposal Details</h2>

              {/* Booking Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Booking <span className="text-red-500">*</span>
                </label>
                <select
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  required
                >
                  <option value="">Select a booking...</option>
                  {bookings.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.clientName} — {EVENT_TYPE_LABELS[b.eventType] || b.eventType} — {new Date(b.eventDate).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Proposal Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Luxury Wedding Proposal — Helen & Michael"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Introduction */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Introduction</label>
                <textarea
                  value={introduction}
                  onChange={(e) => setIntroduction(e.target.value)}
                  rows={3}
                  placeholder="A warm welcome message to introduce the proposal..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              {/* Event Vision */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Event Vision</label>
                <textarea
                  value={eventVision}
                  onChange={(e) => setEventVision(e.target.value)}
                  rows={3}
                  placeholder="Describe the overall vision for the event..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              {/* Theme Concept */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Theme Concept</label>
                <textarea
                  value={themeConcept}
                  onChange={(e) => setThemeConcept(e.target.value)}
                  rows={3}
                  placeholder="Outline the theme concept and design direction..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              {/* Valid Until */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Valid Until</label>
                <input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Internal Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Private notes for internal reference..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>
            </div>
          )}

          {activeTab === "pricing" && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Pricing Items</h2>
                <button
                  onClick={addPricingItem}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-amber-600 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Item
                </button>
              </div>

              {pricingItems.map((item, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">Item {index + 1}</span>
                    <button
                      onClick={() => removePricingItem(index)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="block text-xs text-gray-500 mb-1">Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updatePricingItem(index, "title", e.target.value)}
                        placeholder="e.g., Premium Floral Arrangement"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-gray-500 mb-1">Description</label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updatePricingItem(index, "description", e.target.value)}
                        placeholder="Brief description of the item"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Category</label>
                      <select
                        value={item.category}
                        onChange={(e) => updatePricingItem(index, "category", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        {PROPOSAL_ITEM_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {PROPOSAL_ITEM_CATEGORY_LABELS[cat]}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Quantity</label>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updatePricingItem(index, "quantity", parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Unit Price (ETB)</label>
                      <input
                        type="number"
                        min={0}
                        value={item.unitPrice}
                        onChange={(e) => updatePricingItem(index, "unitPrice", parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                        Total: ETB {(item.quantity * item.unitPrice).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Grand Total */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Grand Total</span>
                  <span className="text-xl font-bold text-amber-600">
                    ETB {calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "sections" && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Proposal Sections</h2>
                <div className="flex gap-2">
                  <select
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val)) loadSectionTemplate(val);
                      e.target.value = "";
                    }}
                    className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Quick add template...</option>
                    {DEFAULT_SECTION_TEMPLATES.map((tpl, i) => (
                      <option key={i} value={i}>{tpl.title}</option>
                    ))}
                  </select>
                  <button
                    onClick={addSection}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-amber-600 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Section
                  </button>
                </div>
              </div>

              {sections.length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No sections yet. Add custom sections or use a template.
                </div>
              )}

              {sections.map((section, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">Section {index + 1}</span>
                    <button
                      onClick={() => removeSection(index)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Title</label>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateSection(index, "title", e.target.value)}
                      placeholder="e.g., The Vision"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Content</label>
                    <textarea
                      value={section.content}
                      onChange={(e) => updateSection(index, "content", e.target.value)}
                      rows={4}
                      placeholder="Write section content in rich detail..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "contract" && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Contract Terms</h2>
                <div className="flex gap-2">
                  <button
                    onClick={loadContractDefaults}
                    className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Load Defaults
                  </button>
                  <button
                    onClick={addContract}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-amber-600 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Term
                  </button>
                </div>
              </div>

              {contracts.length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No contract terms yet. Add custom terms or load default template.
                </div>
              )}

              {contracts.map((contract, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">Term {index + 1}</span>
                    <button
                      onClick={() => removeContract(index)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Title</label>
                    <input
                      type="text"
                      value={contract.title}
                      onChange={(e) => updateContract(index, "title", e.target.value)}
                      placeholder="e.g., Payment Terms"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Content</label>
                    <textarea
                      value={contract.content}
                      onChange={(e) => updateContract(index, "content", e.target.value)}
                      rows={4}
                      placeholder="Write the full term details..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "preview" && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-gray-500 text-sm">
                Save the proposal first to see a live preview. The preview will appear on the right side.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT SIDE - Live Preview */}
        <div className="xl:sticky xl:top-8 xl:self-start">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
            {/* Preview Header */}
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-gray-700">Proposal Preview</span>
              </div>
              {previewData && (
                <span className="text-xs text-gray-500">{previewData.proposalNumber}</span>
              )}
            </div>

            {/* Preview Content — Luxury Editorial Style */}
            <div className="proposal-preview font-['Cormorant_Garamond']">
              {/* Cover Page */}
              {previewData ? (
                <div className="p-8 space-y-8">
                  {/* Cover */}
                  <div className="text-center py-16 border-b border-amber-200/30">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">R</span>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                      {previewData.title}
                    </h1>
                    <p className="text-gray-500 text-lg font-['DM_Sans']">
                      {previewData.booking?.clientName}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-3 text-sm text-gray-400 font-['DM_Sans']">
                      <span>{previewData.proposalNumber}</span>
                      <span>•</span>
                      <span>{EVENT_TYPE_LABELS[previewData.booking?.eventType || ""] || "Event"}</span>
                      {previewData.booking?.eventDate && (
                        <>
                          <span>•</span>
                          <span>{new Date(previewData.booking.eventDate).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Introduction */}
                  {previewData.introduction && (
                    <div className="py-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome</h2>
                      <p className="text-gray-700 text-lg leading-relaxed">{previewData.introduction}</p>
                    </div>
                  )}

                  {/* Event Vision */}
                  {previewData.eventVision && (
                    <div className="py-8 border-t border-gray-100">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">The Vision</h2>
                      <p className="text-gray-700 text-lg leading-relaxed">{previewData.eventVision}</p>
                    </div>
                  )}

                  {/* Theme Concept */}
                  {previewData.themeConcept && (
                    <div className="py-8 border-t border-gray-100">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Theme & Concept</h2>
                      <p className="text-gray-700 text-lg leading-relaxed">{previewData.themeConcept}</p>
                    </div>
                  )}

                  {/* Custom Sections */}
                  {previewData.sections && previewData.sections.length > 0 && (
                    <div className="py-8 border-t border-gray-100 space-y-8">
                      {previewData.sections.map((section) => (
                        <div key={section.id}>
                          <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">{section.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pricing Breakdown */}
                  {previewData.items && previewData.items.length > 0 && (
                    <div className="py-8 border-t border-gray-100">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Investment</h2>
                      <div className="space-y-3">
                        {previewData.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between py-3 border-b border-gray-100"
                          >
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900">{item.title}</p>
                              {item.description && (
                                <p className="text-sm text-gray-500">{item.description}</p>
                              )}
                              <p className="text-xs text-gray-400 mt-0.5">
                                {item.quantity} × ETB {item.unitPrice.toLocaleString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">
                                ETB {item.totalPrice.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Grand Total */}
                      <div className="flex items-center justify-between py-4 mt-4 border-t-2 border-amber-500/30">
                        <span className="text-xl font-bold text-gray-900">Total Investment</span>
                        <span className="text-2xl font-bold text-amber-600">
                          ETB {previewData.totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Contract Terms */}
                  {previewData.contracts && previewData.contracts.length > 0 && (
                    <div className="py-8 border-t border-gray-100">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms & Conditions</h2>
                      <div className="space-y-6">
                        {previewData.contracts.map((contract) => (
                          <div key={contract.id}>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{contract.title}</h3>
                            <p className="text-gray-600 text-base leading-relaxed">{contract.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Signature Section */}
                  <div className="py-8 border-t border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Acceptance</h2>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <div className="border-b border-gray-300 pb-2 mb-2">
                          <p className="text-gray-400 text-sm">Client Signature</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Date: _______________</p>
                      </div>
                      <div>
                        <div className="border-b border-gray-300 pb-2 mb-2">
                          <p className="text-gray-400 text-sm">Radiance Representative</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Date: _______________</p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="py-6 text-center text-xs text-gray-400 border-t border-gray-100 font-['DM_Sans']">
                    <p>Radiance Event PLC</p>
                    <p className="mt-1">This proposal is valid until {previewData.validUntil ? new Date(previewData.validUntil).toLocaleDateString() : "the date specified"}</p>
                  </div>
                </div>
              ) : (
                /* Live Builder Preview */
                <div className="p-8 space-y-8">
                  {/* Cover */}
                  <div className="text-center py-16 border-b border-amber-200/30">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">R</span>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                      {title || "Proposal Title"}
                    </h1>
                    <p className="text-gray-500 text-lg font-['DM_Sans']">
                      {bookings.find((b) => b.id === bookingId)?.clientName || "Client Name"}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-3 text-sm text-gray-400 font-['DM_Sans']">
                      <span>PRP-2026-XXXXX</span>
                      <span>•</span>
                      <span>
                        {bookings.find((b) => b.id === bookingId)
                          ? EVENT_TYPE_LABELS[bookings.find((b) => b.id === bookingId)?.eventType || ""] || "Event"
                          : "Event"}
                      </span>
                    </div>
                  </div>

                  {/* Introduction */}
                  {introduction && (
                    <div className="py-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome</h2>
                      <p className="text-gray-700 text-lg leading-relaxed">{introduction}</p>
                    </div>
                  )}

                  {/* Event Vision */}
                  {eventVision && (
                    <div className="py-8 border-t border-gray-100">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">The Vision</h2>
                      <p className="text-gray-700 text-lg leading-relaxed">{eventVision}</p>
                    </div>
                  )}

                  {/* Theme */}
                  {themeConcept && (
                    <div className="py-8 border-t border-gray-100">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Theme & Concept</h2>
                      <p className="text-gray-700 text-lg leading-relaxed">{themeConcept}</p>
                    </div>
                  )}

                  {/* Sections */}
                  {sections.filter((s) => s.title.trim()).length > 0 && (
                    <div className="py-8 border-t border-gray-100 space-y-8">
                      {sections
                        .filter((s) => s.title.trim())
                        .map((section, i) => (
                          <div key={i}>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">{section.content}</p>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Pricing */}
                  {pricingItems.filter((i) => i.title.trim()).length > 0 && (
                    <div className="py-8 border-t border-gray-100">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Investment</h2>
                      <div className="space-y-3">
                        {pricingItems
                          .filter((i) => i.title.trim())
                          .map((item, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between py-3 border-b border-gray-100"
                            >
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">{item.title}</p>
                                {item.description && (
                                  <p className="text-sm text-gray-500">{item.description}</p>
                                )}
                                <p className="text-xs text-gray-400 mt-0.5">
                                  {item.quantity} × ETB {item.unitPrice.toLocaleString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-gray-900">
                                  ETB {(item.quantity * item.unitPrice).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="flex items-center justify-between py-4 mt-4 border-t-2 border-amber-500/30">
                        <span className="text-xl font-bold text-gray-900">Total Investment</span>
                        <span className="text-2xl font-bold text-amber-600">
                          ETB {calculateTotal().toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Contracts */}
                  {contracts.filter((c) => c.title.trim()).length > 0 && (
                    <div className="py-8 border-t border-gray-100">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms & Conditions</h2>
                      <div className="space-y-6">
                        {contracts
                          .filter((c) => c.title.trim())
                          .map((contract, i) => (
                            <div key={i}>
                              <h3 className="text-lg font-bold text-gray-900 mb-2">{contract.title}</h3>
                              <p className="text-gray-600 text-base leading-relaxed">{contract.content}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Signature */}
                  <div className="py-8 border-t border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Acceptance</h2>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <div className="border-b border-gray-300 pb-2 mb-2">
                          <p className="text-gray-400 text-sm">Client Signature</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Date: _______________</p>
                      </div>
                      <div>
                        <div className="border-b border-gray-300 pb-2 mb-2">
                          <p className="text-gray-400 text-sm">Radiance Representative</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Date: _______________</p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="py-6 text-center text-xs text-gray-400 border-t border-gray-100 font-['DM_Sans']">
                    <p>Radiance Event PLC</p>
                    <p className="mt-1">Premium Event Experiences</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}