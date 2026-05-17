"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Save,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Heart,
  Clock,
  MapPin,
  Gift,
  MessageSquareText,
  UserCheck,
  Eye,
  PenSquare,
} from "lucide-react";

// ── Types ──
interface WeddingOption {
  id: string;
  brideName: string;
  groomName: string;
  slug: string;
  isPublished: boolean;
}

interface InvitationMessageData {
  id?: string;
  weddingId: string;
  preline: string;
  message: string;
}

interface LoveStoryData {
  id?: string;
  weddingId: string;
  year: string;
  title: string;
  description: string;
  sortOrder: number;
}

interface ProgramItemData {
  id?: string;
  weddingId: string;
  time: string;
  title: string;
  description: string;
  sortOrder: number;
}

interface VenueDetailData {
  id?: string;
  weddingId: string;
  name: string;
  address: string;
  googleMapsLink: string;
  eventTime: string;
  dressCode: string;
}

interface WeddingInvitationFull {
  id: string;
  brideName: string;
  groomName: string;
  slug: string;
  weddingDate: string;
  weddingTime: string;
  venueName: string;
  venueAddress: string;
  isPublished: boolean;
  invitationMessage?: InvitationMessageData | null;
  loveStories?: LoveStoryData[];
  programItems?: ProgramItemData[];
  venueDetails?: VenueDetailData | null;
  gifts?: GiftData[];
  rsvps?: RSVPData[];
}

interface GiftData {
  id: string;
  giftName: string;
  priorityLabel: string;
  isReserved: boolean;
}

interface RSVPData {
  id: string;
  guestName: string;
  attendance: string;
  createdAt: string;
}

const emptyStory = (): LoveStoryData => ({
  weddingId: "",
  year: "",
  title: "",
  description: "",
  sortOrder: 0,
});

const emptyProgram = (): ProgramItemData => ({
  weddingId: "",
  time: "",
  title: "",
  description: "",
  sortOrder: 0,
});

export function CardDesignBuilder() {
  const router = useRouter();
  const [weddings, setWeddings] = useState<WeddingOption[]>([]);
  const [selectedWeddingId, setSelectedWeddingId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ── Form State ──
  // Invitation Message
  const [preline, setPreline] = useState("We are getting married");
  const [inviteText, setInviteText] = useState("");

  // Love Stories
  const [loveStories, setLoveStories] = useState<LoveStoryData[]>([]);

  // Program Items
  const [programItems, setProgramItems] = useState<ProgramItemData[]>([]);

  // Venue Details
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [googleMapsLink, setGoogleMapsLink] = useState("");
  const [eventTime, setEventTime] = useState("4:30 PM – Late");
  const [dressCode, setDressCode] = useState("");

  // Preview
  const [previewSlug, setPreviewSlug] = useState("");

  // Gifts & RSVPs (read-only)
  const [gifts, setGifts] = useState<GiftData[]>([]);
  const [rsvps, setRSVPs] = useState<RSVPData[]>([]);

  // ── Load weddings list ──
  useEffect(() => {
    async function loadWeddings() {
      try {
        const res = await fetch("/api/wedding-invitations");
        const json = await res.json();
        if (json.success && json.data) {
          const list = json.data.map((inv: WeddingInvitationFull) => ({
            id: inv.id,
            brideName: inv.brideName,
            groomName: inv.groomName,
            slug: inv.slug,
            isPublished: inv.isPublished,
          }));
          setWeddings(list);
        }
      } catch (e) {
        console.error("Failed to load weddings", e);
      } finally {
        setLoading(false);
      }
    }
    loadWeddings();
  }, []);

  // ── Load full invitation data when selected ──
  const loadInvitation = useCallback(async (weddingId: string) => {
    if (!weddingId) return;
    setLoading(true);
    setError("");

    try {
      // Fetch the full invitation with all relations
      const res = await fetch(`/api/wedding-invitations/${weddingId}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error);

      const inv: WeddingInvitationFull = json.data;

      // Load invitation message
      const msgRes = await fetch(`/api/admin/card-design/invitation-message?weddingId=${weddingId}`);
      const msgJson = await msgRes.json();
      if (msgJson.success && msgJson.data) {
        setPreline(msgJson.data.preline || "We are getting married");
        setInviteText(msgJson.data.message || "");
      } else {
        setPreline("We are getting married");
        setInviteText("");
      }

      // Load love stories
      const storyRes = await fetch(`/api/admin/card-design/love-stories?weddingId=${weddingId}`);
      const storyJson = await storyRes.json();
      setLoveStories(
        storyJson.success && storyJson.data ? storyJson.data : []
      );

      // Load program items
      const progRes = await fetch(`/api/admin/card-design/program-items?weddingId=${weddingId}`);
      const progJson = await progRes.json();
      setProgramItems(
        progJson.success && progJson.data ? progJson.data : []
      );

      // Load venue details
      const venueRes = await fetch(`/api/admin/card-design/venue-details?weddingId=${weddingId}`);
      const venueJson = await venueRes.json();
      if (venueJson.success && venueJson.data) {
        setVenueName(venueJson.data.name || "");
        setVenueAddress(venueJson.data.address || "");
        setGoogleMapsLink(venueJson.data.googleMapsLink || "");
        setEventTime(venueJson.data.eventTime || "4:30 PM – Late");
        setDressCode(venueJson.data.dressCode || "");
      } else {
        setVenueName(inv.venueName || "");
        setVenueAddress(inv.venueAddress || "");
        setEventTime(inv.weddingTime || "4:30 PM – Late");
      }

      // Gifts & RSVPs
      setGifts(
        (inv.gifts || []).map((g: GiftData) => ({
          id: g.id,
          giftName: g.giftName,
          priorityLabel: g.priorityLabel,
          isReserved: g.isReserved,
        }))
      );
      setRSVPs(
        (inv.rsvps || []).map((r: RSVPData) => ({
          id: r.id,
          guestName: r.guestName,
          attendance: r.attendance,
          createdAt: r.createdAt,
        }))
      );

      setPreviewSlug(inv.slug);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load invitation");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedWeddingId) {
      loadInvitation(selectedWeddingId);
    }
  }, [selectedWeddingId, loadInvitation]);

  // ── Save all data ──
  async function handleSave() {
    if (!selectedWeddingId) return;
    setSaving(true);
    setMessage("");
    setError("");

    try {
      // Save invitation message
      const msgRes = await fetch("/api/admin/card-design/invitation-message", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weddingId: selectedWeddingId,
          preline,
          message: inviteText,
        }),
      });
      if (!msgRes.ok) throw new Error("Failed to save invitation message");

      // Save venue details
      const venueRes = await fetch("/api/admin/card-design/venue-details", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weddingId: selectedWeddingId,
          name: venueName,
          address: venueAddress,
          googleMapsLink,
          eventTime,
          dressCode,
        }),
      });
      if (!venueRes.ok) throw new Error("Failed to save venue details");

      // Save love stories (delete all and recreate to sync order)
      const existingStories = loveStories.filter((s) => s.id);
      for (const story of existingStories) {
        await fetch(`/api/admin/card-design/love-stories?id=${story.id}`, {
          method: "DELETE",
        });
      }
      for (let i = 0; i < loveStories.length; i++) {
        const s = loveStories[i];
        if (s.id) continue; // already deleted, skip
        await fetch("/api/admin/card-design/love-stories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            weddingId: selectedWeddingId,
            year: s.year,
            title: s.title,
            description: s.description,
            sortOrder: i,
          }),
        });
      }

      // Save program items
      const existingPrograms = programItems.filter((p) => p.id);
      for (const prog of existingPrograms) {
        await fetch(`/api/admin/card-design/program-items?id=${prog.id}`, {
          method: "DELETE",
        });
      }
      for (let i = 0; i < programItems.length; i++) {
        const p = programItems[i];
        if (p.id) continue;
        await fetch("/api/admin/card-design/program-items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            weddingId: selectedWeddingId,
            time: p.time,
            title: p.title,
            description: p.description,
            sortOrder: i,
          }),
        });
      }

      setMessage("Card design saved successfully!");
      // Reload
      loadInvitation(selectedWeddingId);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  // ── Helpers ──
  function moveStory(index: number, direction: -1 | 1) {
    const newList = [...loveStories];
    const target = index + direction;
    if (target < 0 || target >= newList.length) return;
    [newList[index], newList[target]] = [newList[target], newList[index]];
    setLoveStories(newList);
  }

  function moveProgram(index: number, direction: -1 | 1) {
    const newList = [...programItems];
    const target = index + direction;
    if (target < 0 || target >= newList.length) return;
    [newList[index], newList[target]] = [newList[target], newList[index]];
    setProgramItems(newList);
  }

  function getSelectedNames() {
    const w = weddings.find((w) => w.id === selectedWeddingId);
    return w ? `${w.brideName} & ${w.groomName}` : "";
  }

  // ── Render ──
  if (loading && weddings.length === 0) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Card Design</h1>
          <p className="mt-1 text-sm text-gray-600">
            Design your wedding invitation card content - all fields in one place.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {previewSlug && (
            <a
              href={`/wedding/${previewSlug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <Eye className="h-4 w-4" />
              Preview
            </a>
          )}
          <button
            onClick={handleSave}
            disabled={saving || !selectedWeddingId}
            className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500 disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save All
          </button>
        </div>
      </div>

      {/* Wedding selector */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
        <label className="block text-sm font-medium text-gray-700">
          Select Wedding
          <select
            value={selectedWeddingId}
            onChange={(e) => setSelectedWeddingId(e.target.value)}
            className="mt-1 block w-full max-w-md rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
          >
            <option value="">-- Choose a wedding --</option>
            {weddings.map((w) => (
              <option key={w.id} value={w.id}>
                {w.brideName} & {w.groomName} {w.isPublished ? "(Published)" : "(Draft)"}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Messages */}
      {(message || error) && (
        <div
          className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
            error
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-green-200 bg-green-50 text-green-700"
          }`}
        >
          {error || message}
        </div>
      )}

      {!selectedWeddingId ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <PenSquare className="mx-auto h-12 w-12 text-gray-300" />
          <h2 className="mt-4 text-lg font-semibold text-gray-900">Select a Wedding</h2>
          <p className="mt-2 text-sm text-gray-600">
            Choose a wedding from the dropdown above to start designing the card.
          </p>
        </div>
      ) : loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* ═══ LEFT COLUMN ═══ */}
          <div className="space-y-6">
            {/* ── Invitation Message ── */}
            <Section title="Invitation Message" icon={MessageSquareText}>
              <Field
                label="Preline (top text)"
                value={preline}
                onChange={setPreline}
                placeholder="We are getting married"
              />
              <TextArea
                label="Invitation Message"
                value={inviteText}
                onChange={setInviteText}
                rows={5}
                placeholder="Together with their families, Emma Laurent & Daniel Moreau request the pleasure of your company..."
              />
            </Section>

            {/* ── Love Story ── */}
            <Section title="Love Story Timeline" icon={Heart}>
              {loveStories.length === 0 && (
                <p className="text-sm text-gray-500">No love story entries yet. Add one below.</p>
              )}
              {loveStories.map((story, i) => (
                <div key={i} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500">
                      Entry #{i + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveStory(i, -1)}
                        disabled={i === 0}
                        className="rounded p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveStory(i, 1)}
                        disabled={i === loveStories.length - 1}
                        className="rounded p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setLoveStories((prev) => prev.filter((_, idx) => idx !== i))}
                        className="rounded p-1 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Year"
                      value={story.year}
                      onChange={(v) =>
                        setLoveStories((prev) =>
                          prev.map((item, idx) => (idx === i ? { ...item, year: v } : item))
                        )
                      }
                      placeholder="2020"
                    />
                    <Field
                      label="Title"
                      value={story.title}
                      onChange={(v) =>
                        setLoveStories((prev) =>
                          prev.map((item, idx) => (idx === i ? { ...item, title: v } : item))
                        )
                      }
                      placeholder="How We Met"
                    />
                  </div>
                  <TextArea
                    label="Description"
                    value={story.description}
                    onChange={(v) =>
                      setLoveStories((prev) =>
                        prev.map((item, idx) => (idx === i ? { ...item, description: v } : item))
                      )
                    }
                    rows={2}
                    placeholder="A chance encounter at a gallery opening..."
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setLoveStories((prev) => [
                    ...prev,
                    { ...emptyStory(), weddingId: selectedWeddingId, sortOrder: prev.length },
                  ])
                }
                className="inline-flex items-center gap-2 rounded-lg border border-amber-300 px-4 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-50"
              >
                <Plus className="h-4 w-4" />
                Add Story Entry
              </button>
            </Section>

            {/* ── Day Program ── */}
            <Section title="Day Program / Schedule" icon={Clock}>
              {programItems.length === 0 && (
                <p className="text-sm text-gray-500">No program items yet. Add one below.</p>
              )}
              {programItems.map((item, i) => (
                <div key={i} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500">
                      Item #{i + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveProgram(i, -1)}
                        disabled={i === 0}
                        className="rounded p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveProgram(i, 1)}
                        disabled={i === programItems.length - 1}
                        className="rounded p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setProgramItems((prev) => prev.filter((_, idx) => idx !== i))}
                        className="rounded p-1 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Time"
                      value={item.time}
                      onChange={(v) =>
                        setProgramItems((prev) =>
                          prev.map((p, idx) => (idx === i ? { ...p, time: v } : p))
                        )
                      }
                      placeholder="4:30 PM"
                    />
                    <Field
                      label="Title"
                      value={item.title}
                      onChange={(v) =>
                        setProgramItems((prev) =>
                          prev.map((p, idx) => (idx === i ? { ...p, title: v } : p))
                        )
                      }
                      placeholder="Guest Arrival"
                    />
                  </div>
                  <TextArea
                    label="Description"
                    value={item.description}
                    onChange={(v) =>
                      setProgramItems((prev) =>
                        prev.map((p, idx) => (idx === i ? { ...p, description: v } : p))
                      )
                    }
                    rows={2}
                    placeholder="Welcome drinks and reception in the gardens."
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setProgramItems((prev) => [
                    ...prev,
                    { ...emptyProgram(), weddingId: selectedWeddingId, sortOrder: prev.length },
                  ])
                }
                className="inline-flex items-center gap-2 rounded-lg border border-amber-300 px-4 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-50"
              >
                <Plus className="h-4 w-4" />
                Add Program Item
              </button>
            </Section>
          </div>

          {/* ═══ RIGHT COLUMN ═══ */}
          <div className="space-y-6">
            {/* ── Venue Details ── */}
            <Section title="Venue Details" icon={MapPin}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Venue Name"
                  value={venueName}
                  onChange={setVenueName}
                  placeholder="Château de Vaux-le-Vicomte"
                />
                <Field
                  label="Event Time"
                  value={eventTime}
                  onChange={setEventTime}
                  placeholder="4:30 PM – Late"
                />
              </div>
              <Field
                label="Venue Address"
                value={venueAddress}
                onChange={setVenueAddress}
                placeholder="77950 Maincy, France"
              />
              <Field
                label="Google Maps Link"
                value={googleMapsLink}
                onChange={setGoogleMapsLink}
                placeholder="https://maps.google.com/?q=..."
              />
              <Field
                label="Dress Code"
                value={dressCode}
                onChange={setDressCode}
                placeholder="Black Tie / Formal / Casual"
              />
            </Section>

            {/* ── Gift Registry ── */}
            <Section title="Gift Registry Records" icon={Gift}>
              {gifts.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No gifts in registry. Add gifts via the Wedding Experience builder.
                </p>
              ) : (
                <div className="space-y-2">
                  {gifts.map((gift) => (
                    <div
                      key={gift.id}
                      className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3"
                    >
                      <div>
                        <span className="font-medium text-gray-900">{gift.giftName}</span>
                        <span className="ml-2 text-xs text-gray-500">{gift.priorityLabel}</span>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          gift.isReserved
                            ? "bg-rose-100 text-rose-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {gift.isReserved ? "Reserved" : "Available"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <a
                href={selectedWeddingId ? `/admin/weddings/${selectedWeddingId}` : "#"}
                className="mt-3 inline-flex text-sm text-amber-600 hover:text-amber-700"
              >
                Manage gifts in Wedding Builder →
              </a>
            </Section>

            {/* ── RSVP Records ── */}
            <Section title="RSVP Responses" icon={UserCheck}>
              {rsvps.length === 0 ? (
                <p className="text-sm text-gray-500">No RSVP responses yet.</p>
              ) : (
                <div className="space-y-2">
                  {rsvps.slice(0, 10).map((rsvp) => (
                    <div
                      key={rsvp.id}
                      className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3"
                    >
                      <span className="font-medium text-gray-900">{rsvp.guestName}</span>
                      <div className="flex items-center gap-3">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            rsvp.attendance === "ACCEPTED" || rsvp.attendance === "ATTENDING"
                              ? "bg-green-100 text-green-700"
                              : rsvp.attendance === "MAYBE"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {rsvp.attendance.replace("_", " ")}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(rsvp.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  {rsvps.length > 10 && (
                    <p className="text-center text-xs text-gray-500">
                      +{rsvps.length - 10} more responses
                    </p>
                  )}
                </div>
              )}
              {rsvps.length > 0 && (
                <a
                  href={selectedWeddingId ? `/admin/weddings/${selectedWeddingId}` : "#"}
                  className="mt-3 inline-flex text-sm text-amber-600 hover:text-amber-700"
                >
                  View all RSVPs in Wedding Builder →
                </a>
              )}
            </Section>
          </div>
        </div>
      )}
    </div>
  );
}

// ── UI Components ──

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-gray-900">
        <Icon className="h-5 w-5 text-amber-600" />
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {label}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows: number;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {label}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
      />
    </label>
  );
}