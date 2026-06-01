import { z } from "zod";
import {
  BOOKING_STATUS,
  EVENT_TYPES,
  BUDGET_RANGES,
  INVITATION_THEMES,
  INVITATION_STATUS,
  GIFT_PRIORITIES,
  RSVP_STATUS,
} from "@/types";

export const bookingFormSchema = z.object({
  clientName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  clientEmail: z.string().email("Please enter a valid email address"),
  clientPhone: z.string().min(6, "Phone number is required"),
  eventType: z.enum([
    EVENT_TYPES.WEDDING,
    EVENT_TYPES.BIRTHDAY,
    EVENT_TYPES.CORPORATE,
    EVENT_TYPES.GRADUATION,
    EVENT_TYPES.ENGAGEMENT,
    EVENT_TYPES.ANNIVERSARY,
    EVENT_TYPES.CULTURAL,
    EVENT_TYPES.OTHER,
  ]),
  eventDate: z.string().refine(
    (val) => {
      if (!val) return false;
      const date = new Date(val);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return date >= now;
    },
    { message: "Event date must be today or in the future" }
  ),
  location: z.string().min(1, "Location is required"),
  guestCount: z.coerce.number().min(1, "Guest count must be at least 1").optional(),
  budgetRange: z.enum([
    BUDGET_RANGES.UNDER_50K,
    BUDGET_RANGES.RANGE_50K_100K,
    BUDGET_RANGES.RANGE_100K_200K,
    BUDGET_RANGES.RANGE_200K_500K,
    BUDGET_RANGES.ABOVE_500K,
  ]),
  notes: z.string().optional().default(""),
});

export const bookingStatusSchema = z.object({
  status: z.enum([
    BOOKING_STATUS.NEW_REQUEST,
    BOOKING_STATUS.CONTACTED,
    BOOKING_STATUS.CONFIRMED,
    BOOKING_STATUS.PLANNED,
    BOOKING_STATUS.COMPLETED,
    BOOKING_STATUS.CANCELLED,
  ]),
});

export const bookingMessageSchema = z.object({
  sender: z.enum(["ADMIN", "SYSTEM"]),
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(2000, "Message is too long"),
});

const optionalUrl = z
  .string()
  .trim()
  .url("Please enter a valid URL")
  .optional()
  .or(z.literal(""));

export const giftRegistryInputSchema = z.object({
  id: z.string().optional(),
  giftName: z.string().trim().min(1, "Gift name is required").max(120),
  description: z.string().trim().max(500).optional().default(""),
  imageUrl: optionalUrl,
  priority: z.coerce.number().int().min(1).max(5).optional().default(1),
  priorityLabel: z
    .enum([GIFT_PRIORITIES.LOW, GIFT_PRIORITIES.MEDIUM, GIFT_PRIORITIES.HIGH])
    .optional()
    .default(GIFT_PRIORITIES.MEDIUM),
  allowDuplicates: z.boolean().optional().default(false),
  reservedMessage: z.string().trim().max(500).optional().default(""),
});

export const weddingInvitationSchema = z.object({
  bookingId: z.string().min(1, "Booking is required"),
  brideName: z.string().trim().min(1, "Bride name is required").max(100),
  groomName: z.string().trim().min(1, "Groom name is required").max(100),
  slug: z
    .string()
    .trim()
    .min(3, "Slug must be at least 3 characters")
    .max(80, "Slug is too long")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens"),
  weddingDate: z.string().min(1, "Wedding date is required"),
  weddingTime: z.string().trim().min(1, "Wedding time is required").max(40),
  venueName: z.string().trim().min(1, "Venue name is required").max(160),
  venueAddress: z.string().trim().min(1, "Venue address is required").max(300),
  dressCode: z.string().trim().max(100).optional().default(""),
  mapUrl: optionalUrl,
  welcomeMessage: z.string().trim().max(1200).optional().default(""),
  story: z.string().trim().max(3000).optional().default(""),
  heroImageUrl: optionalUrl,
  coverImage: optionalUrl,
  galleryImages: z.array(z.string().trim().url()).max(12).optional().default([]),
  theme: z.enum([
    INVITATION_THEMES.FLORAL_LUXURY,
    INVITATION_THEMES.MODERN_MINIMAL,
    INVITATION_THEMES.ROYAL_GOLD,
    INVITATION_THEMES.TRADITIONAL_ETHIOPIAN,
    INVITATION_THEMES.ELEGANT_BLACK,
    INVITATION_THEMES.GARDEN_WEDDING,
    INVITATION_THEMES.LUXURY_WHITE,
    INVITATION_THEMES.CLASSIC_SERIF,
  ]),
  templateKey: z.string().trim().max(80).optional().default(""),
  themeColor: z.string().trim().max(20).optional().default(""),
  primaryColor: z.string().trim().max(20).optional().default(""),
  secondaryColor: z.string().trim().max(20).optional().default(""),
  customMessage: z.string().trim().max(1200).optional().default(""),
  floralTopLeft: optionalUrl,
  floralTopRight: optionalUrl,
  floralBottomLeft: optionalUrl,
  floralBottomRight: optionalUrl,
  status: z
    .enum([
      INVITATION_STATUS.DRAFT,
      INVITATION_STATUS.REVIEW,
      INVITATION_STATUS.APPROVED,
      INVITATION_STATUS.PUBLISHED,
      INVITATION_STATUS.ARCHIVED,
    ])
    .optional()
    .default(INVITATION_STATUS.DRAFT),
  allowRSVP: z.boolean().optional().default(true),
  allowGiftRegistry: z.boolean().optional().default(true),
  isPublished: z.boolean().optional().default(false),
  gifts: z.array(giftRegistryInputSchema).max(40).optional().default([]),
});

export const rsvpSchema = z.object({
  guestName: z.string().trim().min(2, "Please enter your name").max(100),
  guestPhone: z.string().trim().max(40).optional().default(""),
  attendance: z.enum([
    RSVP_STATUS.ACCEPTED,
    RSVP_STATUS.DECLINED,
    RSVP_STATUS.MAYBE,
  ]),
  message: z.string().trim().max(1000).optional().default(""),
});

export const giftReservationSchema = z.object({
  reservedBy: z.string().trim().min(2, "Please enter your name").max(100),
  reservedMessage: z.string().trim().max(500).optional().default(""),
});

export const packageCategorySchema = z.object({
  name: z.string().trim().min(2, "Category name is required").max(120),
  nameAm: z.string().trim().max(120).optional().nullable().default(null),
  slug: z
    .string()
    .trim()
    .min(2, "Slug is required")
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens"),
  description: z.string().trim().max(500).optional().default(""),
  coverImage: optionalUrl,
  sortOrder: z.coerce.number().int().min(0).optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const packageSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  name: z.string().trim().min(2, "Package name is required").max(140),
  nameAm: z.string().trim().max(140).optional().nullable().default(null),
  shortDesc: z.string().trim().min(2, "Short description is required").max(220),
  shortDescAm: z.string().trim().max(220).optional().nullable().default(null),
  description: z.string().trim().min(2, "Description is required").max(4000),
  price: z
    .union([z.coerce.number().min(0), z.literal("").transform(() => null)])
    .nullable()
    .optional(),
  priceLabel: z.string().trim().min(1, "Price label is required").max(120),
  features: z.array(z.string().trim().min(1).max(180)).max(80).default([]),
  exclusions: z.array(z.string().trim().min(1).max(180)).max(80).default([]),
  imageUrl: optionalUrl,
  galleryImages: z.array(z.string().trim().url()).max(12).optional().default([]),
  isPopular: z.boolean().optional().default(false),
  isFeatured: z.boolean().optional().default(false),
  isActive: z.boolean().optional().default(true),
  sortOrder: z.coerce.number().int().min(0).optional().default(0),
});

export type BookingFormInput = z.infer<typeof bookingFormSchema>;
export type BookingStatusInput = z.infer<typeof bookingStatusSchema>;
export type BookingMessageInput = z.infer<typeof bookingMessageSchema>;
export type WeddingInvitationInput = z.infer<typeof weddingInvitationSchema>;
export type RSVPInput = z.infer<typeof rsvpSchema>;
export type PackageCategoryInput = z.infer<typeof packageCategorySchema>;
export type PackageInput = z.infer<typeof packageSchema>;
