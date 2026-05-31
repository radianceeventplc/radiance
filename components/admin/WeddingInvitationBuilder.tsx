"use client";

import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Eye,
  Gift,
  Loader2,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import {
  BookingRecord,
  GIFT_PRIORITIES,
  GiftPriority,
  INVITATION_THEME_LABELS,
  INVITATION_THEMES,
  INVITATION_STATUS,
  InvitationStatus,
  InvitationTheme,
  WeddingInvitationRecord,
} from "@/types";
import { cn } from "@/lib/utils";

interface WeddingInvitationBuilderProps {
  bookingId: string;
}

interface GiftDraft {
  giftName: string;
  description: string;
  imageUrl: string;
  priority: number;
  priorityLabel: GiftPriority;
  allowDuplicates: boolean;
  reservedMessage: string;
}

const emptyGift: GiftDraft = {
  giftName: "",
  description: "",
  imageUrl: "",
  priority: 1,
  priorityLabel: GIFT_PRIORITIES.MEDIUM,
  allowDuplicates: false,
  reservedMessage: "",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function dateInputValue(value?: string) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

function splitCoupleNames(clientName?: string | null) {
  const fallback = { bride: "", groom: "" };
  if (!clientName) return fallback;

  const normalized = clientName.trim();
  const pair = normalized
    .split(/\s+(?:and|&|\+)\s+/i)
    .map((part) => part.trim())
    .filter(Boolean);

  if (pair.length >= 2) {
    return { bride: pair[0], groom: pair.slice(1).join(" ") };
  }

  const names = normalized.split(/\s+/).filter(Boolean);
  return {
    bride: names[0] ?? "",
    groom: names.slice(1).join(" "),
  };
}

function weddingTimeFromDate(value?: string | null) {
  if (!value) return "4:00 PM";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "4:00 PM";

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function WeddingInvitationBuilder({
  bookingId,
}: WeddingInvitationBuilderProps) {
  const router = useRouter();
  const [booking, setBooking] = useState<BookingRecord | null>(null);
  const [invitation, setInvitation] = useState<WeddingInvitationRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [brideName, setBrideName] = useState("");
  const [groomName, setGroomName] = useState("");
  const [slug, setSlug] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [weddingTime, setWeddingTime] = useState("4:00 PM");
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [dressCode, setDressCode] = useState("");
  const [mapUrl, setMapUrl] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [story, setStory] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [galleryImages, setGalleryImages] = useState("");
  const [theme, setTheme] = useState<InvitationTheme>(INVITATION_THEMES.FLORAL_LUXURY);
  const [templateKey, setTemplateKey] = useState<string>(INVITATION_THEMES.FLORAL_LUXURY);
  const [themeColor, setThemeColor] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [floralTopLeft, setFloralTopLeft] = useState("");
  const [floralTopRight, setFloralTopRight] = useState("");
  const [floralBottomLeft, setFloralBottomLeft] = useState("");
  const [floralBottomRight, setFloralBottomRight] = useState("");
  const [status, setStatus] = useState<InvitationStatus>(INVITATION_STATUS.DRAFT);
  const [allowRSVP, setAllowRSVP] = useState(true);
  const [allowGiftRegistry, setAllowGiftRegistry] = useState(true);
  const [isPublished, setIsPublished] = useState(false);
  const [gifts, setGifts] = useState<GiftDraft[]>([{ ...emptyGift }]);

  const canCreate =
    booking?.eventType === "WEDDING" &&
    ["CONFIRMED", "PLANNED"].includes(booking.status);
  const previewUrl = invitation?.slug ? `/wedding/${invitation.slug}` : `/wedding/${slug}`;

  function hydrateInvitation(item: WeddingInvitationRecord) {
    setBrideName(item.brideName);
    setGroomName(item.groomName);
    setSlug(item.slug);
    setWeddingDate(dateInputValue(item.weddingDate));
    setWeddingTime(item.weddingTime);
    setVenueName(item.venueName);
    setVenueAddress(item.venueAddress);
    setDressCode(item.dressCode ?? "");
    setMapUrl(item.mapUrl ?? "");
    setWelcomeMessage(item.welcomeMessage ?? "");
    setStory(item.story ?? "");
    setHeroImageUrl(item.heroImageUrl ?? "");
    setCoverImage(item.coverImage ?? "");
    setGalleryImages(item.galleryImages.join("\n"));
    setTheme(item.theme);
    setTemplateKey(item.templateKey ?? item.theme);
    setThemeColor(item.themeColor ?? "");
    setPrimaryColor(item.primaryColor ?? "");
    setSecondaryColor(item.secondaryColor ?? "");
    setCustomMessage(item.customMessage ?? "");
    setFloralTopLeft(item.floralTopLeft ?? "");
    setFloralTopRight(item.floralTopRight ?? "");
    setFloralBottomLeft(item.floralBottomLeft ?? "");
    setFloralBottomRight(item.floralBottomRight ?? "");
    setStatus(item.status ?? (item.isPublished ? INVITATION_STATUS.PUBLISHED : INVITATION_STATUS.DRAFT));
    setAllowRSVP(item.allowRSVP ?? true);
    setAllowGiftRegistry(item.allowGiftRegistry ?? true);
    setIsPublished(item.isPublished);
    setGifts(
      item.gifts.length > 0
        ? item.gifts.map((gift) => ({
            giftName: gift.giftName,
            description: gift.description ?? "",
            imageUrl: gift.imageUrl ?? "",
            priority: gift.priority,
            priorityLabel: gift.priorityLabel ?? GIFT_PRIORITIES.MEDIUM,
            allowDuplicates: gift.allowDuplicates ?? false,
            reservedMessage: gift.reservedMessage ?? "",
          }))
        : [{ ...emptyGift }]
    );
  }

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");

      try {
        const bookingResponse = await fetch(`/api/bookings?search=${bookingId}`);
        const bookingResult = await bookingResponse.json();
        if (!bookingResponse.ok) throw new Error(bookingResult.error || "Booking not found");

        const foundBooking = (bookingResult.data ?? []).find(
          (item: BookingRecord) => item.id === bookingId
        );
        if (!foundBooking) throw new Error("Booking not found");

        setBooking(foundBooking);

        const invitationId = foundBooking.invitations?.[0]?.id;
        if (invitationId) {
          const invitationResponse = await fetch(`/api/wedding-invitations/${invitationId}`);
          const invitationResult = await invitationResponse.json();
          if (!invitationResponse.ok) {
            throw new Error(invitationResult.error || "Invitation not found");
          }
          const item = invitationResult.data as WeddingInvitationRecord;
          setInvitation(item);
          hydrateInvitation(item);
        } else {
          const fallbackNames = splitCoupleNames(foundBooking.clientName);
          setBrideName(fallbackNames.bride);
          setGroomName(fallbackNames.groom);
          setWeddingDate(dateInputValue(foundBooking.eventDate));
          setWeddingTime(weddingTimeFromDate(foundBooking.eventDate));
          setVenueName(foundBooking.location || "Wedding venue");
          setVenueAddress(foundBooking.location ?? "");
          setStory(foundBooking.notes ?? "");
          setCustomMessage(
            foundBooking.notes
              ? "Together with their families, we invite you to celebrate this beautiful wedding."
              : ""
          );
          setWelcomeMessage("Together with their families");
          setSlug(
            slugify(
              [fallbackNames.bride, fallbackNames.groom].filter(Boolean).join(" and ") ||
                foundBooking.clientName ||
                "wedding"
            )
          );
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load builder");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [bookingId]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setNotice("");
    setError("");

    try {
      const payload = {
        bookingId,
        brideName,
        groomName,
        slug,
        weddingDate,
        weddingTime,
        venueName,
        venueAddress,
        dressCode,
        mapUrl,
        welcomeMessage,
        story,
        heroImageUrl,
        coverImage,
        galleryImages: galleryImages
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        theme,
        templateKey,
        themeColor,
        primaryColor,
        secondaryColor,
        customMessage,
        floralTopLeft,
        floralTopRight,
        floralBottomLeft,
        floralBottomRight,
        status: isPublished ? INVITATION_STATUS.PUBLISHED : status,
        allowRSVP,
        allowGiftRegistry,
        isPublished: isPublished || status === INVITATION_STATUS.PUBLISHED,
        gifts: gifts.filter((gift) => gift.giftName.trim()),
      };

      const response = await fetch(
        invitation ? `/api/wedding-invitations/${invitation.id}` : "/api/wedding-invitations",
        {
          method: invitation ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save invitation");

      setInvitation(result.data);
      setNotice(isPublished ? "Invitation saved and published." : "Invitation saved as draft.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save invitation");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#bf8f38]" />
      </div>
    );
  }

  if (error && !booking) {
    return (
      <div className="py-20 text-center">
        <p className="mb-4 text-red-600">{error}</p>
        <button
          onClick={() => router.push(`/admin/bookings/${bookingId}`)}
          className="text-[#bf8f38] underline"
        >
          Back to booking
        </button>
      </div>
    );
  }

  if (!canCreate) {
    return (
      <div className="mx-auto max-w-2xl rounded-none border border-[#ecd398] bg-[#fdf6e8] p-6">
        <h1 className="text-xl font-semibold text-gray-900">Wedding invitation unavailable</h1>
        <p className="mt-2 text-sm text-gray-700">
          This premium feature is available only when the event type is Wedding and
          the booking status is Confirmed or Planning.
        </p>
        <button
          onClick={() => router.push(`/admin/bookings/${bookingId}`)}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#a47a2a]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to booking
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => router.push(`/admin/bookings/${bookingId}`)}
            className="mb-3 inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to booking
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Wedding Experience Builder</h1>
          <p className="mt-1 text-sm text-gray-600">
            Booking details have been pulled into the invitation draft. Edit the card and watch the preview update live.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {invitation?.isPublished && (
            <a
              href={previewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-none border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700"
            >
              <Eye className="h-4 w-4" />
              View Live
            </a>
          )}
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-none bg-[#bf8f38] px-4 py-2 text-sm font-semibold text-white hover:bg-[#bf8f38] disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Experience
          </button>
        </div>
      </div>

      {(notice || error) && (
        <div
          className={cn(
            "rounded-none border px-4 py-3 text-sm",
            error ? "border-red-200 bg-red-50 text-red-700" : "border-green-200 bg-green-50 text-green-700"
          )}
        >
          {error || notice}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <section className="space-y-6">
          <Panel title="Couple & Event">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Bride name" value={brideName} onChange={setBrideName} required />
              <Field label="Groom name" value={groomName} onChange={setGroomName} required />
              <Field
                label="Public slug"
                value={slug}
                onChange={(value) => setSlug(slugify(value))}
                required
                helper={`/wedding/${slug || "your-slug"}`}
              />
              <Field label="Wedding time" value={weddingTime} onChange={setWeddingTime} required />
              <Field label="Wedding date" type="date" value={weddingDate} onChange={setWeddingDate} required />
              <Field label="Venue name" value={venueName} onChange={setVenueName} required />
            </div>
            <Field label="Venue address" value={venueAddress} onChange={setVenueAddress} required />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Dress code" value={dressCode} onChange={setDressCode} />
              <Field label="Map URL" value={mapUrl} onChange={setMapUrl} />
            </div>
          </Panel>

          <Panel title="Story & Media">
            <TextArea label="Welcome message" value={welcomeMessage} onChange={setWelcomeMessage} rows={3} />
            <TextArea label="Custom message" value={customMessage} onChange={setCustomMessage} rows={3} />
            <TextArea label="Wedding story" value={story} onChange={setStory} rows={6} />
            <Field label="Hero image URL" value={heroImageUrl} onChange={setHeroImageUrl} />
            <Field label="Cover image URL" value={coverImage} onChange={setCoverImage} />
            <TextArea
              label="Gallery image URLs"
              value={galleryImages}
              onChange={setGalleryImages}
              rows={5}
              helper="One image URL per line. Cloudinary and Supabase URLs work with the current image config."
            />
          </Panel>

          <Panel title="Gift Registry">
            <div className="space-y-4">
              {gifts.map((gift, index) => (
                <div key={index} className="rounded-none border border-gray-200 bg-gray-50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800">
                      <Gift className="h-4 w-4 text-[#bf8f38]" />
                      Gift {index + 1}
                    </div>
                    <button
                      type="button"
                      onClick={() => setGifts((current) => current.filter((_, i) => i !== index))}
                      className="rounded p-1 text-gray-500 hover:bg-white hover:text-red-600"
                      aria-label="Remove gift"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
                    <Field
                      label="Gift name"
                      value={gift.giftName}
                      onChange={(value) =>
                        setGifts((current) =>
                          current.map((item, i) => (i === index ? { ...item, giftName: value } : item))
                        )
                      }
                    />
                    <label className="block text-sm font-medium text-gray-700">
                      Priority
                      <select
                        value={gift.priorityLabel}
                        onChange={(event) =>
                          setGifts((current) =>
                            current.map((item, i) =>
                              i === index
                                ? {
                                    ...item,
                                    priorityLabel: event.target.value as GiftPriority,
                                    priority:
                                      event.target.value === GIFT_PRIORITIES.HIGH
                                        ? 3
                                        : event.target.value === GIFT_PRIORITIES.MEDIUM
                                          ? 2
                                          : 1,
                                  }
                                : item
                            )
                          )
                        }
                        className="mt-1 w-full rounded-none border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#bf8f38] focus:ring-2 focus:ring-[#ecd398]"
                      >
                        {Object.values(GIFT_PRIORITIES).map((priority) => (
                          <option key={priority} value={priority}>
                            {priority}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={gift.allowDuplicates}
                      onChange={(event) =>
                        setGifts((current) =>
                          current.map((item, i) =>
                            i === index ? { ...item, allowDuplicates: event.target.checked } : item
                          )
                        )
                      }
                      className="h-4 w-4 accent-[#bf8f38]"
                    />
                    Allow more than one guest to reserve this gift
                  </label>
                  <Field
                    label="Image URL"
                    value={gift.imageUrl}
                    onChange={(value) =>
                      setGifts((current) =>
                        current.map((item, i) => (i === index ? { ...item, imageUrl: value } : item))
                      )
                    }
                  />
                  <TextArea
                    label="Description"
                    value={gift.description}
                    onChange={(value) =>
                      setGifts((current) =>
                        current.map((item, i) => (i === index ? { ...item, description: value } : item))
                      )
                    }
                    rows={2}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setGifts((current) => [...current, { ...emptyGift }])}
              className="mt-4 inline-flex items-center gap-2 rounded-none border border-[#d9b665] px-4 py-2 text-sm font-semibold text-[#a47a2a] hover:bg-[#fdf6e8]"
            >
              <Plus className="h-4 w-4" />
              Add Gift
            </button>
          </Panel>
        </section>

        <aside className="space-y-6">
          <Panel title="Live Preview">
            <div className="overflow-hidden rounded-none border border-gray-200 bg-white">
              <div
                className="relative min-h-[460px] px-6 py-10 text-center"
                style={{
                  background:
                    heroImageUrl || coverImage
                      ? `linear-gradient(rgba(0,0,0,.42), rgba(0,0,0,.58)), url(${heroImageUrl || coverImage}) center/cover`
                      : secondaryColor || themeColor || "#fbf7ef",
                  color: heroImageUrl || coverImage ? "#fff" : "#1f2937",
                }}
              >
                {[floralTopLeft, floralTopRight, floralBottomLeft, floralBottomRight].map((asset, index) =>
                  asset ? (
                    <Image
                      key={`${asset}-${index}`}
                      src={asset}
                      alt=""
                      width={80}
                      height={80}
                      unoptimized
                      className={cn(
                        "pointer-events-none absolute h-20 w-20 object-contain opacity-80",
                        index === 0 && "left-2 top-2",
                        index === 1 && "right-2 top-2",
                        index === 2 && "bottom-2 left-2",
                        index === 3 && "bottom-2 right-2"
                      )}
                    />
                  ) : null
                )}
                <p className="text-xs uppercase tracking-[0.2em] opacity-80">
                  {welcomeMessage || "Together with their families"}
                </p>
                <h3 className="mt-8 text-5xl leading-none" style={{ color: primaryColor || themeColor || undefined }}>
                  {brideName || "Bride"}
                  <span className="my-3 block text-3xl">&</span>
                  {groomName || "Groom"}
                </h3>
                <p className="mx-auto mt-8 max-w-xs text-sm leading-6">
                  {customMessage || "A luxury Radiance wedding invitation preview."}
                </p>
                <div className="mt-8 text-sm">
                  <p>{weddingDate || "Wedding date"} at {weddingTime}</p>
                  <p className="mt-2 font-semibold">{venueName || "Venue name"}</p>
                  <p className="mt-1 opacity-80">{venueAddress || "Venue address"}</p>
                </div>
                <div className="mt-8 flex justify-center gap-2 text-xs">
                  {allowRSVP && <span className="rounded-full bg-white/20 px-3 py-1">RSVP</span>}
                  {allowGiftRegistry && <span className="rounded-full bg-white/20 px-3 py-1">Gifts</span>}
                </div>
              </div>
            </div>
          </Panel>

          <Panel title="Template">
            <label className="block text-sm font-medium text-gray-700">
              Design template
              <select
                value={theme}
                onChange={(event) => {
                  setTheme(event.target.value as InvitationTheme);
                  setTemplateKey(event.target.value);
                }}
                className="mt-1 w-full rounded-none border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#bf8f38] focus:ring-2 focus:ring-[#ecd398]"
              >
                {Object.values(INVITATION_THEMES).map((option) => (
                  <option key={option} value={option}>
                    {INVITATION_THEME_LABELS[option]}
                  </option>
                ))}
              </select>
            </label>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <ColorField label="Theme color" value={themeColor} onChange={setThemeColor} />
              <ColorField label="Primary color" value={primaryColor} onChange={setPrimaryColor} />
              <ColorField label="Secondary color" value={secondaryColor} onChange={setSecondaryColor} />
            </div>
          </Panel>

          <Panel title="Floral Assets">
            <Field label="Top left floral URL" value={floralTopLeft} onChange={setFloralTopLeft} />
            <Field label="Top right floral URL" value={floralTopRight} onChange={setFloralTopRight} />
            <Field label="Bottom left floral URL" value={floralBottomLeft} onChange={setFloralBottomLeft} />
            <Field label="Bottom right floral URL" value={floralBottomRight} onChange={setFloralBottomRight} />
          </Panel>

          <Panel title="Publishing">
            <label className="block text-sm font-medium text-gray-700">
              Workflow status
              <select
                value={status}
                onChange={(event) => {
                  const nextStatus = event.target.value as InvitationStatus;
                  setStatus(nextStatus);
                  setIsPublished(nextStatus === INVITATION_STATUS.PUBLISHED);
                }}
                className="mt-1 w-full rounded-none border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#bf8f38] focus:ring-2 focus:ring-[#ecd398]"
              >
                {Object.values(INVITATION_STATUS).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <ToggleField label="Allow RSVP" checked={allowRSVP} onChange={setAllowRSVP} />
              <ToggleField label="Allow gift registry" checked={allowGiftRegistry} onChange={setAllowGiftRegistry} />
            </div>
            <label className="flex items-start gap-3 rounded-none border border-gray-200 bg-gray-50 p-4">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(event) => {
                  setIsPublished(event.target.checked);
                  setStatus(event.target.checked ? INVITATION_STATUS.PUBLISHED : INVITATION_STATUS.DRAFT);
                }}
                className="mt-1 h-4 w-4 accent-[#bf8f38]"
              />
              <span>
                <span className="block text-sm font-semibold text-gray-900">Publish microsite</span>
                <span className="mt-1 block text-sm text-gray-600">
                  Guests can open the live URL, RSVP, and reserve gifts.
                </span>
              </span>
            </label>
            <div className="mt-4 rounded-none bg-gray-900 p-4 text-sm text-white">
              <p className="font-semibold">Public URL</p>
              <p className="mt-1 break-all text-gray-300">{previewUrl}</p>
            </div>
            {invitation?.isPublished && (
              <div className="mt-4 grid gap-2">
                <a
                  href={`/wedding/${invitation.slug}/print/a4`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-none border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Printable A4 Export
                </a>
                <a
                  href={`/wedding/${invitation.slug}/print/story`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-none border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Mobile Story Export
                </a>
                <a
                  href={`/wedding/${invitation.slug}/print/square`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-none border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Instagram Square Export
                </a>
              </div>
            )}
          </Panel>

          {invitation?.rsvps && (
            <Panel title="RSVP Responses">
              {invitation.rsvps.length === 0 ? (
                <p className="text-sm text-gray-600">No responses yet.</p>
              ) : (
                <div className="space-y-3">
                  {invitation.rsvps.slice(0, 8).map((rsvp) => (
                    <div key={rsvp.id} className="rounded-none border border-gray-200 p-3 text-sm">
                      <div className="flex justify-between gap-3">
                        <span className="font-semibold text-gray-900">{rsvp.guestName}</span>
                        <span className="text-xs text-[#a47a2a]">{rsvp.attendance.replace("_", " ")}</span>
                      </div>
                      {rsvp.message && <p className="mt-2 text-gray-600">{rsvp.message}</p>}
                    </div>
                  ))}
                </div>
              )}
            </Panel>
          )}
        </aside>
      </div>
    </form>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-none border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-900">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  helper,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  helper?: string;
}) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="mt-1 w-full rounded-none border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#bf8f38] focus:ring-2 focus:ring-[#ecd398]"
      />
      {helper && <span className="mt-1 block text-xs text-gray-500">{helper}</span>}
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows,
  helper,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
  helper?: string;
}) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        className="mt-1 w-full rounded-none border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#bf8f38] focus:ring-2 focus:ring-[#ecd398]"
      />
      {helper && <span className="mt-1 block text-xs text-gray-500">{helper}</span>}
    </label>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {label}
      <div className="mt-1 flex gap-2">
        <input
          type="color"
          value={value || "#b76e79"}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-12 rounded border border-gray-200 bg-white"
        />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="#b76e79"
          className="min-w-0 flex-1 rounded-none border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#bf8f38] focus:ring-2 focus:ring-[#ecd398]"
        />
      </div>
    </label>
  );
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-none border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
      {label}
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-[#bf8f38]"
      />
    </label>
  );
}
