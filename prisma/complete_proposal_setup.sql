-- =============================================
-- COMPLETE PROPOSAL SYSTEM SETUP
-- =============================================
-- This file creates the Proposal tables AND inserts sample data.
-- Run this entire file in your database query tool (Supabase SQL Editor, psql, etc.)
-- =============================================

-- 1. Create Enums (if they don't exist)
DO $$ BEGIN
  CREATE TYPE "ProposalStatus" AS ENUM ('DRAFT', 'SENT', 'VIEWED', 'APPROVED', 'REJECTED', 'EXPIRED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "ProposalItemCategory" AS ENUM ('DECORATION', 'CATERING', 'PHOTOGRAPHY', 'VENUE', 'ENTERTAINMENT', 'FLORAL', 'LIGHTING', 'TRANSPORT', 'COORDINATION', 'CUSTOM');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Create Tables
CREATE TABLE IF NOT EXISTS "Proposal" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "bookingId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "proposalNumber" TEXT NOT NULL UNIQUE,
    "introduction" TEXT,
    "eventVision" TEXT,
    "themeConcept" TEXT,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'ETB',
    "status" "ProposalStatus" NOT NULL DEFAULT 'DRAFT',
    "validUntil" TIMESTAMPTZ,
    "pdfUrl" TEXT,
    "publicToken" TEXT NOT NULL UNIQUE,
    "clientApproved" BOOLEAN NOT NULL DEFAULT false,
    "clientApprovedAt" TIMESTAMPTZ,
    "clientRejected" BOOLEAN NOT NULL DEFAULT false,
    "rejectionReason" TEXT,
    "notes" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "ProposalItem" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "proposalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "category" "ProposalItemCategory" NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "ProposalSection" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "proposalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "ProposalContract" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "proposalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "ProposalComment" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "proposalId" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE CASCADE
);

-- 3. Create Indexes
CREATE INDEX IF NOT EXISTS idx_proposal_booking ON "Proposal"("bookingId");
CREATE INDEX IF NOT EXISTS idx_proposal_status ON "Proposal"("status");
CREATE INDEX IF NOT EXISTS idx_proposal_public_token ON "Proposal"("publicToken");
CREATE INDEX IF NOT EXISTS idx_proposal_item_proposal ON "ProposalItem"("proposalId");
CREATE INDEX IF NOT EXISTS idx_proposal_section_proposal ON "ProposalSection"("proposalId");
CREATE INDEX IF NOT EXISTS idx_proposal_contract_proposal ON "ProposalContract"("proposalId");

-- =============================================
-- SAMPLE DATA
-- =============================================

-- Sample Bookings (with enum casting)
INSERT INTO "Booking" ("id", "clientName", "clientEmail", "clientPhone", "eventType", "eventDate", "location", "guestCount", "budgetRange", "status", "createdAt", "updatedAt")
SELECT * FROM (VALUES
  ('booking_prop_001'::text, 'Helen & Michael Debebe'::text, 'helen.debebe@email.com'::text, '+251-911-123456'::text, 'WEDDING'::"EventType", '2026-12-15 16:00:00+03'::timestamptz, 'Sheraton Addis Hotel'::text, 250, 'RANGE_200K_500K'::"BudgetRange", 'CONTACTED'::"BookingStatus", NOW(), NOW()),
  ('booking_prop_002'::text, 'Tekle Berhanu Corp'::text, 'info@tekleberhanu.com'::text, '+251-911-789012'::text, 'CORPORATE'::"EventType", '2026-09-20 18:00:00+03'::timestamptz, 'Skylight Hotel'::text, 500, 'ABOVE_500K'::"BudgetRange", 'CONTACTED'::"BookingStatus", NOW(), NOW()),
  ('booking_prop_003'::text, 'Sara & Dawit Tadesse'::text, 'sara.tadesse@email.com'::text, '+251-922-345678'::text, 'WEDDING'::"EventType", '2027-01-10 15:00:00+03'::timestamptz, 'Entoto Mountain View'::text, 180, 'RANGE_100K_200K'::"BudgetRange", 'NEW_REQUEST'::"BookingStatus", NOW(), NOW())
) AS b("id","clientName","clientEmail","clientPhone","eventType","eventDate","location","guestCount","budgetRange","status","createdAt","updatedAt")
WHERE NOT EXISTS (SELECT 1 FROM "Booking" WHERE id = b.id);

-- Proposals (with enum casting)
INSERT INTO "Proposal" ("id", "bookingId", "title", "proposalNumber", "introduction", "eventVision", "themeConcept", "totalAmount", "currency", "status", "validUntil", "publicToken", "createdById", "createdAt", "updatedAt")
SELECT * FROM (VALUES
(
  'prop_sample_001'::text,
  'booking_prop_001'::text,
  'Luxury Wedding Proposal — Helen & Michael'::text,
  'PRP-2026-10001'::text,
  'Dear Helen and Michael,

Thank you for choosing Radiance to bring your wedding vision to life. It has been a pleasure getting to know you both, and we are deeply honored to present this proposal for your special day.

With love and creativity,
The Radiance Team'::text,
  'We envision a wedding that embodies timeless elegance and understated luxury. The evening will unfold like a beautifully orchestrated symphony — from the intimate ceremony to the grand reception, every moment carefully curated to create an atmosphere of pure romance.

Our goal is to create a sensory experience: the soft glow of candlelight, the fragrance of white gardenias, the sound of live strings during dinner, and the vibrant energy of Ethiopian music carrying guests onto the dance floor.'::text,
  '"Eternal Radiance" — A palette of ivory, blush, and gold inspired by the golden hour. The design draws from classic European elegance merged with Ethiopian cultural richness.'::text,
  420000,
  'ETB'::text,
  'DRAFT'::"ProposalStatus",
  '2026-08-15 00:00:00+03'::timestamptz,
  'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0'::text,
  (SELECT id FROM "User" LIMIT 1),
  NOW(),
  NOW()
),
(
  'prop_sample_002'::text,
  'booking_prop_002'::text,
  'Corporate Gala — Tekle Berhanu Annual Celebration'::text,
  'PRP-2026-10002'::text,
  'Dear Tekle Berhanu Team,

Thank you for considering Radiance to produce your annual corporate celebration. We are excited to present a concept that reflects your company''s prestige.

Best regards,
The Radiance Team'::text,
  'A sophisticated corporate gala that balances professionalism with celebration. The evening will feature a red-carpet welcome, gourmet dining, inspirational speeches, and entertainment.'::text,
  '"Platinum Excellence" — A sleek aesthetic using platinum, navy, and white. Clean lines, dramatic lighting, and premium materials.'::text,
  685000,
  'ETB'::text,
  'SENT'::"ProposalStatus",
  '2026-07-30 00:00:00+03'::timestamptz,
  'b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1'::text,
  (SELECT id FROM "User" LIMIT 1),
  NOW(),
  NOW()
),
(
  'prop_sample_003'::text,
  'booking_prop_003'::text,
  'Garden Wedding — Sara & Dawit'::text,
  'PRP-2026-10003'::text,
  'Dear Sara and Dawit,

It has been a joy to hear your story. We are honored to present this proposal for your beautiful celebration of love.

With warmth,
The Radiance Team'::text,
  'An intimate garden wedding celebrating the natural beauty of Entoto Mountain. The day will feel personal, warm, and deeply meaningful — focused on their love story.'::text,
  '"Mountain Serenade" — Rustic-elegant in sage green, dusty rose, and cream. Natural textures combined with soft candles.'::text,
  198500,
  'ETB'::text,
  'DRAFT'::"ProposalStatus",
  '2026-11-01 00:00:00+03'::timestamptz,
  'c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2'::text,
  (SELECT id FROM "User" LIMIT 1),
  NOW(),
  NOW()
)
) AS p("id","bookingId","title","proposalNumber","introduction","eventVision","themeConcept","totalAmount","currency","status","validUntil","publicToken","createdById","createdAt","updatedAt")
WHERE NOT EXISTS (SELECT 1 FROM "Proposal" WHERE id = p.id);

-- Pricing Items (with enum casting)
INSERT INTO "ProposalItem" ("id", "proposalId", "title", "description", "quantity", "unitPrice", "totalPrice", "category", "sortOrder", "createdAt")
SELECT * FROM (VALUES
  ('item_sample_001'::text, 'prop_sample_001'::text, 'Premium Floral Arrangements'::text, 'Bridal bouquet, ceremony arch, centerpieces x25'::text, 1, 85000, 85000, 'FLORAL'::"ProposalItemCategory", 0, NOW()),
  ('item_sample_002'::text, 'prop_sample_001'::text, 'Photography & Videography'::text, 'Full-day coverage with 2 photographers + 1 videographer'::text, 1, 65000, 65000, 'PHOTOGRAPHY'::"ProposalItemCategory", 1, NOW()),
  ('item_sample_003'::text, 'prop_sample_001'::text, 'Venue Styling & Décor'::text, 'Full venue transformation: ceremony, reception, lounge areas'::text, 1, 120000, 120000, 'DECORATION'::"ProposalItemCategory", 2, NOW()),
  ('item_sample_004'::text, 'prop_sample_001'::text, 'Catering — Premium Package'::text, '5-course plated dinner with premium beverages'::text, 250, 450, 112500, 'CATERING'::"ProposalItemCategory", 3, NOW()),
  ('item_sample_005'::text, 'prop_sample_001'::text, 'Live Music — 6-Piece Band'::text, 'Jazz during cocktail hour, party set'::text, 1, 35000, 35000, 'ENTERTAINMENT'::"ProposalItemCategory", 4, NOW()),
  ('item_sample_006'::text, 'prop_sample_001'::text, 'Event Coordination'::text, 'Lead planner + 2 assistants, 3 months leading to wedding'::text, 1, 45000, 45000, 'COORDINATION'::"ProposalItemCategory", 5, NOW()),
  ('item_sample_007'::text, 'prop_sample_001'::text, 'Lighting Design'::text, 'Ambient uplighting, dance floor, chandelier installation'::text, 1, 28000, 28000, 'LIGHTING'::"ProposalItemCategory", 6, NOW()),
  ('item_sample_008'::text, 'prop_sample_001'::text, 'Guest Transportation'::text, '2 luxury shuttle buses for guest transfers'::text, 2, 15000, 30000, 'TRANSPORT'::"ProposalItemCategory", 7, NOW()),
  ('item_sample_009'::text, 'prop_sample_002'::text, 'Venue Transformation & Branding'::text, 'Full décor with branded stage, logo projection, photo wall'::text, 1, 150000, 150000, 'DECORATION'::"ProposalItemCategory", 0, NOW()),
  ('item_sample_010'::text, 'prop_sample_002'::text, 'Premium Catering — Platinum Menu'::text, '3-course dinner with wine pairing, premium bar'::text, 500, 650, 325000, 'CATERING'::"ProposalItemCategory", 1, NOW()),
  ('item_sample_011'::text, 'prop_sample_002'::text, 'Professional Photography & Video'::text, '3 photographers + 1 videographer, highlight reel'::text, 1, 75000, 75000, 'PHOTOGRAPHY'::"ProposalItemCategory", 2, NOW()),
  ('item_sample_012'::text, 'prop_sample_002'::text, 'Entertainment — Live Band + DJ'::text, 'Sophisticated jazz hour, high-energy party band'::text, 1, 55000, 55000, 'ENTERTAINMENT'::"ProposalItemCategory", 3, NOW()),
  ('item_sample_013'::text, 'prop_sample_002'::text, 'Audio-Visual Production'::text, 'Pro sound system, LED screens, wireless mics'::text, 1, 45000, 45000, 'LIGHTING'::"ProposalItemCategory", 4, NOW()),
  ('item_sample_014'::text, 'prop_sample_002'::text, 'Event Coordination'::text, 'Lead producer + stage manager + 3 coordinators'::text, 1, 35000, 35000, 'COORDINATION'::"ProposalItemCategory", 5, NOW()),
  ('item_sample_015'::text, 'prop_sample_003'::text, 'Garden Ceremony Setup'::text, 'Wooden arch with eucalyptus, aisle petals, rustic seating'::text, 1, 45000, 45000, 'DECORATION'::"ProposalItemCategory", 0, NOW()),
  ('item_sample_016'::text, 'prop_sample_003'::text, 'Photography — Half Day'::text, 'Single photographer, 6 hours, online gallery'::text, 1, 25000, 25000, 'PHOTOGRAPHY'::"ProposalItemCategory", 1, NOW()),
  ('item_sample_017'::text, 'prop_sample_003'::text, 'Catering — Rustic Menu'::text, 'Family-style Ethiopian-Italian fusion, dessert bar'::text, 180, 350, 63000, 'CATERING'::"ProposalItemCategory", 2, NOW()),
  ('item_sample_018'::text, 'prop_sample_003'::text, 'Floral Design'::text, 'Bridal bouquet, centerpieces x15, cake flowers'::text, 1, 35000, 35000, 'FLORAL'::"ProposalItemCategory", 3, NOW()),
  ('item_sample_019'::text, 'prop_sample_003'::text, 'Acoustic Duo'::text, 'Guitar and vocalist for ceremony and cocktail hour'::text, 1, 12000, 12000, 'ENTERTAINMENT'::"ProposalItemCategory", 4, NOW()),
  ('item_sample_020'::text, 'prop_sample_003'::text, 'Day-of Coordination'::text, 'Lead coordinator for month-of planning + day-of'::text, 1, 18500, 18500, 'COORDINATION'::"ProposalItemCategory", 5, NOW())
) AS i("id","proposalId","title","description","quantity","unitPrice","totalPrice","category","sortOrder","createdAt")
WHERE NOT EXISTS (SELECT 1 FROM "ProposalItem" WHERE id = i.id);

-- Proposal Sections
INSERT INTO "ProposalSection" ("id", "proposalId", "title", "content", "sortOrder", "createdAt")
SELECT * FROM (VALUES
  ('section_sample_001'::text, 'prop_sample_001'::text, 'Event Story'::text, 'The love story of Helen and Michael began five years ago in Addis Ababa. Their wedding will honor both their Ethiopian heritage and their modern sensibilities — from the traditional ketter ceremony to the lively reception.'::text, 0, NOW()),
  ('section_sample_002'::text, 'prop_sample_001'::text, 'Design Direction'::text, 'Color Palette:
• Primary: Ivory, Blush Pink, Gold
• Secondary: Sage Green, Champagne
• Accents: Crystal, amber

Textures: Silk linens, velvet, matte gold, fresh florals'::text, 1, NOW()),
  ('section_sample_003'::text, 'prop_sample_001'::text, 'Guest Experience'::text, '4:00 PM — Ceremony under floral canopy
5:00 PM — Cocktail hour with jazz trio
6:30 PM — Grand dinner with wine pairings
9:00 PM — Dancing until midnight
12:00 AM — Late-night Ethiopian street food'::text, 2, NOW()),
  ('section_sample_004'::text, 'prop_sample_001'::text, 'Timeline'::text, 'Month 1: Final design, vendor confirmations, menu tasting
Month 2: Dress fittings, seating chart
Week Of: Venue build-out, rehearsal
Wedding Day: Ceremony → Reception'::text, 3, NOW())
) AS s("id","proposalId","title","content","sortOrder","createdAt")
WHERE NOT EXISTS (SELECT 1 FROM "ProposalSection" WHERE id = s.id);

-- Contract Terms
INSERT INTO "ProposalContract" ("id", "proposalId", "title", "content", "createdAt")
SELECT * FROM (VALUES
  ('contract_sample_001'::text, 'prop_sample_001'::text, 'Payment Terms'::text, '50% deposit (ETB 210,000) upon signing.
Remaining balance due 14 days before event.

Schedule:
• Signing: ETB 210,000 (50%)
• 30 days before: ETB 105,000 (25%)
• 14 days before: ETB 105,000 (25%)'::text, NOW()),
  ('contract_sample_002'::text, 'prop_sample_001'::text, 'Cancellation Policy'::text, '• 60+ days before: Full refund minus 10% fee
• 30-59 days: 50% refund
• 14-29 days: 25% refund
• Under 14 days: No refund'::text, NOW()),
  ('contract_sample_003'::text, 'prop_sample_001'::text, 'Event Responsibility'::text, 'Radiance handles setup, execution, takedown and vendor coordination.

Client provides venue access and secures permits.'::text, NOW()),
  ('contract_sample_004'::text, 'prop_sample_001'::text, 'Vendor Policy'::text, 'External vendors must be approved in writing 21 days before the event. Change orders issued for added services.'::text, NOW()),
  ('contract_sample_005'::text, 'prop_sample_002'::text, 'Payment Terms'::text, '50% deposit upon signing. Balance due 21 days before the event.'::text, NOW()),
  ('contract_sample_006'::text, 'prop_sample_002'::text, 'Cancellation Policy'::text, '• 45+ days: Full refund minus 15%
• 30-44 days: 50% refund
• Under 30 days: No refund'::text, NOW()),
  ('contract_sample_007'::text, 'prop_sample_002'::text, 'Event Responsibility'::text, 'Radiance manages all production, AV, catering coordination and timeline management.'::text, NOW())
) AS c("id","proposalId","title","content","createdAt")
WHERE NOT EXISTS (SELECT 1 FROM "ProposalContract" WHERE id = c.id);

-- =============================================
-- VERIFY DATA
-- =============================================
-- Run these separately in your SQL tool:

-- SELECT p."proposalNumber", p."title", p."status", p."totalAmount" || ' ' || p."currency" AS total, b."clientName"
-- FROM "Proposal" p
-- JOIN "Booking" b ON b."id" = p."bookingId";