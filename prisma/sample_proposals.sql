-- =============================================
-- SAMPLE PROPOSAL DATA FOR RADIANCE
-- =============================================
-- Run this AFTER running: npx prisma migrate dev
-- This ensures Proposal/ProposalItem/ProposalSection/ProposalContract tables exist
-- =============================================

-- 1. Sample Bookings (if you don't have them yet)
INSERT INTO "Booking" ("id", "clientName", "clientEmail", "clientPhone", "eventType", "eventDate", "location", "guestCount", "budgetRange", "status", "createdAt", "updatedAt")
VALUES 
('booking_prop_001', 'Helen & Michael Debebe', 'helen.debebe@email.com', '+251-911-123456', 'WEDDING', '2026-12-15 16:00:00+03', 'Sheraton Addis Hotel', 250, 'RANGE_200K_500K', 'CONTACTED', NOW(), NOW()),
('booking_prop_002', 'Tekle Berhanu Corp', 'info@tekleberhanu.com', '+251-911-789012', 'CORPORATE', '2026-09-20 18:00:00+03', 'Skylight Hotel', 500, 'ABOVE_500K', 'CONTACTED', NOW(), NOW()),
('booking_prop_003', 'Sara & Dawit Tadesse', 'sara.tadesse@email.com', '+251-922-345678', 'WEDDING', '2027-01-10 15:00:00+03', 'Entoto Mountain View', 180, 'RANGE_100K_200K', 'NEW_REQUEST', NOW(), NOW());

-- 2. Proposals
INSERT INTO "Proposal" ("id", "bookingId", "title", "proposalNumber", "introduction", "eventVision", "themeConcept", "totalAmount", "currency", "status", "validUntil", "publicToken", "createdById", "createdAt", "updatedAt")
VALUES 
-- Proposal 1: Luxury Wedding (DRAFT)
(
  'prop_sample_001',
  'booking_prop_001',
  'Luxury Wedding Proposal — Helen & Michael',
  'PRP-2026-10001',
  E'Dear Helen and Michael,\n\nThank you for choosing Radiance to bring your wedding vision to life. It has been a pleasure getting to know you both, and we are deeply honored to present this proposal for your special day.\n\nWith love and creativity,\nThe Radiance Team',
  E'We envision a wedding that embodies timeless elegance and understated luxury. The evening will unfold like a beautifully orchestrated symphony — from the intimate ceremony to the grand reception, every moment carefully curated to create an atmosphere of pure romance.\n\nOur goal is to create a sensory experience: the soft glow of candlelight, the fragrance of white gardenias, the sound of live strings during dinner, and the vibrant energy of Ethiopian music carrying guests onto the dance floor.',
  E'"Eternal Radiance" — A palette of ivory, blush, and gold inspired by the golden hour. The design draws from classic European elegance merged with Ethiopian cultural richness.',
  420000,
  'ETB',
  'DRAFT',
  '2026-08-15 00:00:00+03',
  'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0',
  (SELECT id FROM "User" LIMIT 1),
  NOW(),
  NOW()
),
-- Proposal 2: Corporate Gala (SENT)
(
  'prop_sample_002',
  'booking_prop_002',
  'Corporate Gala — Tekle Berhanu Annual Celebration',
  'PRP-2026-10002',
  E'Dear Tekle Berhanu Team,\n\nThank you for considering Radiance to produce your annual corporate celebration. We are excited to present a concept that reflects your company''s prestige.\n\nBest regards,\nThe Radiance Team',
  E'A sophisticated corporate gala that balances professionalism with celebration. The evening will feature a red-carpet welcome, gourmet dining, inspirational speeches, and entertainment.',
  E'"Platinum Excellence" — A sleek aesthetic using platinum, navy, and white. Clean lines, dramatic lighting, and premium materials.',
  685000,
  'ETB',
  'SENT',
  '2026-07-30 00:00:00+03',
  'b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1',
  (SELECT id FROM "User" LIMIT 1),
  NOW(),
  NOW()
),
-- Proposal 3: Garden Wedding (DRAFT)
(
  'prop_sample_003',
  'booking_prop_003',
  'Garden Wedding — Sara & Dawit',
  'PRP-2026-10003',
  E'Dear Sara and Dawit,\n\nIt has been a joy to hear your story. We are honored to present this proposal for your beautiful celebration of love.\n\nWith warmth,\nThe Radiance Team',
  E'An intimate garden wedding celebrating the natural beauty of Entoto Mountain. The day will feel personal, warm, and deeply meaningful — focused on their love story.',
  E'"Mountain Serenade" — Rustic-elegant in sage green, dusty rose, and cream. Natural textures combined with soft candles.',
  198500,
  'ETB',
  'DRAFT',
  '2026-11-01 00:00:00+03',
  'c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2',
  (SELECT id FROM "User" LIMIT 1),
  NOW(),
  NOW()
);

-- 3. Pricing Items for Proposal 1 (Wedding)
INSERT INTO "ProposalItem" ("id", "proposalId", "title", "description", "quantity", "unitPrice", "totalPrice", "category", "sortOrder", "createdAt")
VALUES
('item_sample_001', 'prop_sample_001', 'Premium Floral Arrangements', 'Bridal bouquet, ceremony arch, centerpieces x25', 1, 85000, 85000, 'FLORAL', 0, NOW()),
('item_sample_002', 'prop_sample_001', 'Photography & Videography', 'Full-day coverage with 2 photographers + 1 videographer', 1, 65000, 65000, 'PHOTOGRAPHY', 1, NOW()),
('item_sample_003', 'prop_sample_001', 'Venue Styling & Décor', 'Full venue transformation: ceremony, reception, lounge areas', 1, 120000, 120000, 'DECORATION', 2, NOW()),
('item_sample_004', 'prop_sample_001', 'Catering — Premium Package', '5-course plated dinner with premium beverages', 250, 450, 112500, 'CATERING', 3, NOW()),
('item_sample_005', 'prop_sample_001', 'Live Music — 6-Piece Band', 'Jazz during cocktail hour, party set', 1, 35000, 35000, 'ENTERTAINMENT', 4, NOW()),
('item_sample_006', 'prop_sample_001', 'Event Coordination', 'Lead planner + 2 assistants, 3 months leading to wedding', 1, 45000, 45000, 'COORDINATION', 5, NOW()),
('item_sample_007', 'prop_sample_001', 'Lighting Design', 'Ambient uplighting, dance floor, chandelier installation', 1, 28000, 28000, 'LIGHTING', 6, NOW()),
('item_sample_008', 'prop_sample_001', 'Guest Transportation', '2 luxury shuttle buses for guest transfers', 2, 15000, 30000, 'TRANSPORT', 7, NOW());

-- 4. Pricing Items for Proposal 2 (Corporate)
INSERT INTO "ProposalItem" ("id", "proposalId", "title", "description", "quantity", "unitPrice", "totalPrice", "category", "sortOrder", "createdAt")
VALUES
('item_sample_009', 'prop_sample_002', 'Venue Transformation & Branding', 'Full décor with branded stage, logo projection, photo wall', 1, 150000, 150000, 'DECORATION', 0, NOW()),
('item_sample_010', 'prop_sample_002', 'Premium Catering — Platinum Menu', '3-course dinner with wine pairing, premium bar', 500, 650, 325000, 'CATERING', 1, NOW()),
('item_sample_011', 'prop_sample_002', 'Professional Photography & Video', '3 photographers + 1 videographer, highlight reel', 1, 75000, 75000, 'PHOTOGRAPHY', 2, NOW()),
('item_sample_012', 'prop_sample_002', 'Entertainment — Live Band + DJ', 'Sophisticated jazz hour, high-energy party band', 1, 55000, 55000, 'ENTERTAINMENT', 3, NOW()),
('item_sample_013', 'prop_sample_002', 'Audio-Visual Production', 'Pro sound system, LED screens, wireless mics', 1, 45000, 45000, 'LIGHTING', 4, NOW()),
('item_sample_014', 'prop_sample_002', 'Event Coordination', 'Lead producer + stage manager + 3 coordinators', 1, 35000, 35000, 'COORDINATION', 5, NOW());

-- 5. Pricing Items for Proposal 3 (Garden Wedding)
INSERT INTO "ProposalItem" ("id", "proposalId", "title", "description", "quantity", "unitPrice", "totalPrice", "category", "sortOrder", "createdAt")
VALUES
('item_sample_015', 'prop_sample_003', 'Garden Ceremony Setup', 'Wooden arch with eucalyptus, aisle petals, rustic seating', 1, 45000, 45000, 'DECORATION', 0, NOW()),
('item_sample_016', 'prop_sample_003', 'Photography — Half Day', 'Single photographer, 6 hours, online gallery', 1, 25000, 25000, 'PHOTOGRAPHY', 1, NOW()),
('item_sample_017', 'prop_sample_003', 'Catering — Rustic Menu', 'Family-style Ethiopian-Italian fusion, dessert bar', 180, 350, 63000, 'CATERING', 2, NOW()),
('item_sample_018', 'prop_sample_003', 'Floral Design', 'Bridal bouquet, centerpieces x15, cake flowers', 1, 35000, 35000, 'FLORAL', 3, NOW()),
('item_sample_019', 'prop_sample_003', 'Acoustic Duo', 'Guitar and vocalist for ceremony and cocktail hour', 1, 12000, 12000, 'ENTERTAINMENT', 4, NOW()),
('item_sample_020', 'prop_sample_003', 'Day-of Coordination', 'Lead coordinator for month-of planning + day-of', 1, 18500, 18500, 'COORDINATION', 5, NOW());

-- 6. Proposal Sections (for Wedding proposal)
INSERT INTO "ProposalSection" ("id", "proposalId", "title", "content", "sortOrder", "createdAt")
VALUES
('section_sample_001', 'prop_sample_001', 'Event Story', E'The love story of Helen and Michael began five years ago in Addis Ababa. Their wedding will honor both their Ethiopian heritage and their modern sensibilities — from the traditional ketter ceremony to the lively reception.', 0, NOW()),
('section_sample_002', 'prop_sample_001', 'Design Direction', E'Color Palette:\n• Primary: Ivory, Blush Pink, Gold\n• Secondary: Sage Green, Champagne\n• Accents: Crystal, amber\n\nTextures: Silk linens, velvet, matte gold, fresh florals', 1, NOW()),
('section_sample_003', 'prop_sample_001', 'Guest Experience', E'4:00 PM — Ceremony under floral canopy\n5:00 PM — Cocktail hour with jazz trio\n6:30 PM — Grand dinner with wine pairings\n9:00 PM — Dancing until midnight\n12:00 AM — Late-night Ethiopian street food', 2, NOW()),
('section_sample_004', 'prop_sample_001', 'Timeline', E'Month 1: Final design, vendor confirmations, menu tasting\nMonth 2: Dress fittings, seating chart\nWeek Of: Venue build-out, rehearsal\nWedding Day: Ceremony → Reception', 3, NOW());

-- 7. Contract Terms (for Wedding proposal)
INSERT INTO "ProposalContract" ("id", "proposalId", "title", "content", "createdAt")
VALUES
('contract_sample_001', 'prop_sample_001', 'Payment Terms', E'50% deposit (ETB 210,000) upon signing.\nRemaining balance due 14 days before event.\n\nSchedule:\n• Signing: ETB 210,000 (50%)\n• 30 days before: ETB 105,000 (25%)\n• 14 days before: ETB 105,000 (25%)', NOW()),
('contract_sample_002', 'prop_sample_001', 'Cancellation Policy', E'• 60+ days before: Full refund minus 10% fee\n• 30-59 days: 50% refund\n• 14-29 days: 25% refund\n• Under 14 days: No refund', NOW()),
('contract_sample_003', 'prop_sample_001', 'Event Responsibility', E'Radiance handles setup, execution, takedown and vendor coordination.\n\nClient provides venue access and secures permits.', NOW()),
('contract_sample_004', 'prop_sample_001', 'Vendor Policy', E'External vendors must be approved in writing 21 days before the event. Change orders issued for added services.', NOW());

-- 8. Contract Terms (for Corporate proposal)
INSERT INTO "ProposalContract" ("id", "proposalId", "title", "content", "createdAt")
VALUES
('contract_sample_005', 'prop_sample_002', 'Payment Terms', E'50% deposit upon signing. Balance due 21 days before the event.', NOW()),
('contract_sample_006', 'prop_sample_002', 'Cancellation Policy', E'• 45+ days: Full refund minus 15%\n• 30-44 days: 50% refund\n• Under 30 days: No refund', NOW()),
('contract_sample_007', 'prop_sample_002', 'Event Responsibility', E'Radiance manages all production, AV, catering coordination and timeline management.', NOW());

-- =============================================
-- VERIFICATION QUERIES
-- =============================================
-- Run these separately to verify the data:

-- SELECT 
--   p."proposalNumber",
--   p."title",
--   p."status",
--   p."totalAmount" || ' ' || p."currency" AS "total",
--   b."clientName",
--   COUNT(pi."id") AS "items",
--   COUNT(ps."id") AS "sections",
--   COUNT(pc."id") AS "contracts"
-- FROM "Proposal" p
-- LEFT JOIN "Booking" b ON b."id" = p."bookingId"
-- LEFT JOIN "ProposalItem" pi ON pi."proposalId" = p."id"
-- LEFT JOIN "ProposalSection" ps ON ps."proposalId" = p."id"
-- LEFT JOIN "ProposalContract" pc ON pc."proposalId" = p."id"
-- GROUP BY p."id", p."proposalNumber", p."title", p."status", p."totalAmount", p."currency", b."clientName"
-- ORDER BY p."createdAt" DESC;

-- SELECT 
--   p."proposalNumber",
--   pi."category",
--   SUM(pi."totalPrice") AS "categoryTotal"
-- FROM "Proposal" p
-- JOIN "ProposalItem" pi ON pi."proposalId" = p."id"
-- GROUP BY p."proposalNumber", pi."category"
-- ORDER BY p."proposalNumber", pi."category";