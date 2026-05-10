import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting comprehensive database seeding...\n");

  // ============================================================
  // 1. USERS
  // ============================================================
  console.log("👤 Seeding users...");
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@radiance.com" },
    update: {},
    create: {
      id: "user-admin-001",
      email: "admin@radiance.com",
      password: "$2b$10$FfArhqaqfM9ySZFRo2y9Su2TfWj2CY5NdOag8bo4jbFvrMi/YOmIm",
      name: "Radiance Admin",
      role: "SUPER_ADMIN",
      isActive: true,
      avatarUrl: "/images/avatars/admin.jpg",
    },
  });

  const staffUsers = [
    {
      id: "user-staff-001",
      email: "grace@radiance.com",
      password: "$2b$10$FfArhqaqfM9ySZFRo2y9Su2TfWj2CY5NdOag8bo4jbFvrMi/YOmIm",
      name: "Grace Muthoni",
      role: "ADMIN" as const,
      avatarUrl: "/images/avatars/grace.jpg",
    },
    {
      id: "user-staff-002",
      email: "john@radiance.com",
      password: "$2b$10$FfArhqaqfM9ySZFRo2y9Su2TfWj2CY5NdOag8bo4jbFvrMi/YOmIm",
      name: "John Kiprono",
      role: "STAFF" as const,
      avatarUrl: "/images/avatars/john.jpg",
    },
    {
      id: "user-staff-003",
      email: "sarah@radiance.com",
      password: "$2b$10$FfArhqaqfM9ySZFRo2y9Su2TfWj2CY5NdOag8bo4jbFvrMi/YOmIm",
      name: "Sarah Wanjiku",
      role: "STAFF" as const,
      avatarUrl: null,
    },
  ];

  for (const user of staffUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }
  console.log("✅ Users seeded:", 1 + staffUsers.length);

  // ============================================================
  // 2. BOOKINGS
  // ============================================================
  console.log("\n📅 Seeding bookings...");

  const bookings = [
    {
      id: "booking-001",
      clientName: "Sarah Wanjiku",
      clientEmail: "sarah.wanjiku@email.com",
      clientPhone: "+254 712 345 678",
      eventType: "WEDDING" as const,
      eventDate: new Date("2026-08-15T14:00:00+03:00"),
      location: "Radiance Gardens, Nairobi",
      guestCount: 250,
      budgetRange: "RANGE_200K_500K" as const,
      notes: "Outdoor garden wedding with gold and white theme. Bride wants peonies and eucalyptus arrangements.",
      status: "NEW_REQUEST" as const,
      assignedTo: null,
      createdAt: new Date("2026-05-01T10:30:00+03:00"),
    },
    {
      id: "booking-002",
      clientName: "James Ochieng",
      clientEmail: "james.o@email.com",
      clientPhone: "+254 723 456 789",
      eventType: "CORPORATE" as const,
      eventDate: new Date("2026-06-20T09:00:00+03:00"),
      location: "Radiance Conference Centre",
      guestCount: 150,
      budgetRange: "RANGE_100K_200K" as const,
      notes: 'Annual company gala — theme: "Innovation in Motion". Need stage, AV, and catering.',
      status: "CONTACTED" as const,
      assignedTo: "Grace",
      createdAt: new Date("2026-04-28T14:00:00+03:00"),
    },
    {
      id: "booking-003",
      clientName: "Mary & Peter Kamau",
      clientEmail: "mary.kamau@email.com",
      clientPhone: "+254 734 567 890",
      eventType: "ANNIVERSARY" as const,
      eventDate: new Date("2026-07-10T18:00:00+03:00"),
      location: "Radiance Rooftop Venue",
      guestCount: 80,
      budgetRange: "RANGE_50K_100K" as const,
      notes: "25th wedding anniversary celebration. Intimate dinner with family. Silver and blue theme.",
      status: "CONFIRMED" as const,
      assignedTo: "Grace",
      agreedAmount: 85000,
      depositAmount: 42500,
      depositPaid: true,
      depositDate: new Date("2026-04-25T14:00:00+03:00"),
      createdAt: new Date("2026-04-15T09:00:00+03:00"),
    },
    {
      id: "booking-004",
      clientName: "TechConnect Africa",
      clientEmail: "events@techconnect.africa",
      clientPhone: "+254 745 678 901",
      eventType: "CORPORATE" as const,
      eventDate: new Date("2026-05-30T08:00:00+03:00"),
      location: "Radiance Convention Hall",
      guestCount: 500,
      budgetRange: "ABOVE_500K" as const,
      notes: "Three-day tech conference with keynote speeches, breakout sessions, and networking dinner.",
      status: "PLANNED" as const,
      assignedTo: "John",
      agreedAmount: 750000,
      depositAmount: 375000,
      depositPaid: true,
      depositDate: new Date("2026-04-01T11:00:00+03:00"),
      createdAt: new Date("2026-03-20T11:00:00+03:00"),
    },
    {
      id: "booking-005",
      clientName: "Achieng Family",
      clientEmail: "mother.achieng@email.com",
      clientPhone: "+254 756 789 012",
      eventType: "BIRTHDAY" as const,
      eventDate: new Date("2026-05-05T16:00:00+03:00"),
      location: "Radiance Private Dining Room",
      guestCount: 40,
      budgetRange: "RANGE_50K_100K" as const,
      notes: "Surprise 60th birthday party for grandmother. Theme: Vintage elegance.",
      status: "COMPLETED" as const,
      assignedTo: "Grace",
      agreedAmount: 65000,
      depositAmount: 32500,
      depositPaid: true,
      depositDate: new Date("2026-04-10T10:00:00+03:00"),
      balancePaid: true,
      balanceDate: new Date("2026-05-06T10:00:00+03:00"),
      createdAt: new Date("2026-04-01T08:30:00+03:00"),
    },
    {
      id: "booking-006",
      clientName: "David Mwangi",
      clientEmail: "david.mwangi@email.com",
      clientPhone: "+254 767 890 123",
      eventType: "ENGAGEMENT" as const,
      eventDate: new Date("2026-09-12T17:00:00+03:00"),
      location: "Radiance Garden Terrace",
      guestCount: 60,
      budgetRange: "RANGE_100K_200K" as const,
      notes: "Engagement party with sunset cocktails and live acoustic set.",
      status: "NEW_REQUEST" as const,
      assignedTo: null,
      createdAt: new Date("2026-05-03T16:45:00+03:00"),
    },
    {
      id: "booking-007",
      clientName: "Nairobi Design Collective",
      clientEmail: "info@nairobidesign.co.ke",
      clientPhone: "+254 778 901 234",
      eventType: "CULTURAL" as const,
      eventDate: new Date("2026-08-01T10:00:00+03:00"),
      location: "Radiance Exhibition Hall",
      guestCount: 200,
      budgetRange: "RANGE_200K_500K" as const,
      notes: "Annual arts and culture festival featuring local artisans, fashion show, and live performances.",
      status: "CONTACTED" as const,
      assignedTo: "John",
      createdAt: new Date("2026-04-10T13:00:00+03:00"),
    },
    {
      id: "booking-008",
      clientName: "Elizabeth Nyambura",
      clientEmail: "eliz.nyambura@email.com",
      clientPhone: "+254 789 012 345",
      eventType: "GRADUATION" as const,
      eventDate: new Date("2026-07-25T14:00:00+03:00"),
      location: "Radiance Event Hall",
      guestCount: 100,
      budgetRange: "RANGE_50K_100K" as const,
      notes: "Graduation party for daughter. Buffet dinner and photo booth.",
      status: "NEW_REQUEST" as const,
      assignedTo: null,
      createdAt: new Date("2026-05-02T09:15:00+03:00"),
    },
    {
      id: "booking-009",
      clientName: "Lavender Gardens Estate",
      clientEmail: "mgmt@lavendergardens.co.ke",
      clientPhone: "+254 790 123 456",
      eventType: "OTHER" as const,
      eventDate: new Date("2026-08-20T08:00:00+03:00"),
      location: "Lavender Gardens Estate Clubhouse",
      guestCount: 300,
      budgetRange: "RANGE_200K_500K" as const,
      notes: "Annual residents' gala. Black tie event with live band, sit-down dinner, and awards ceremony.",
      status: "NEW_REQUEST" as const,
      assignedTo: null,
      createdAt: new Date("2026-05-05T10:00:00+03:00"),
    },
    {
      id: "booking-010",
      clientName: "Alma & Ben Kiprop",
      clientEmail: "alma.kiprop@email.com",
      clientPhone: "+254 701 234 567",
      eventType: "WEDDING" as const,
      eventDate: new Date("2026-10-24T15:00:00+03:00"),
      location: "Radiance Sky Garden",
      guestCount: 180,
      budgetRange: "RANGE_100K_200K" as const,
      notes: "Rustic-elegant wedding with sunflower and eucalyptus theme. Outdoor ceremony followed by reception.",
      status: "CONTACTED" as const,
      assignedTo: "Grace",
      createdAt: new Date("2026-04-20T08:00:00+03:00"),
    },
  ];

  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: booking,
    });
  }
  console.log("✅ Bookings seeded:", bookings.length);

  // ============================================================
  // 3. MESSAGES
  // ============================================================
  console.log("\n💬 Seeding messages...");

  const messages = [
    // Booking 001 (NEW_REQUEST)
    { bookingId: "booking-001", sender: "SYSTEM" as const, content: "New booking request received. Awaiting review.", createdAt: new Date("2026-05-01T10:30:00+03:00") },
    // Booking 002 (CONTACTED)
    { bookingId: "booking-002", sender: "SYSTEM" as const, content: "New booking request received. Awaiting review.", createdAt: new Date("2026-04-28T14:00:00+03:00") },
    { bookingId: "booking-002", sender: "ADMIN" as const, content: "Hello James, thank you for your booking! We have received your request and would love to discuss the details. Would you be available for a call this Friday?", createdAt: new Date("2026-04-29T10:00:00+03:00") },
    { bookingId: "booking-002", sender: "SYSTEM" as const, content: "Status changed to CONTACTED", createdAt: new Date("2026-04-29T10:00:00+03:00") },
    // Booking 003 (CONFIRMED)
    { bookingId: "booking-003", sender: "SYSTEM" as const, content: "New booking request received. Awaiting review.", createdAt: new Date("2026-04-15T09:00:00+03:00") },
    { bookingId: "booking-003", sender: "ADMIN" as const, content: "Dear Mary & Peter, we are thrilled to help you celebrate your 25th anniversary! We have some beautiful rooftop decor options to show you.", createdAt: new Date("2026-04-16T11:00:00+03:00") },
    { bookingId: "booking-003", sender: "SYSTEM" as const, content: "Status changed to CONTACTED", createdAt: new Date("2026-04-16T11:00:00+03:00") },
    { bookingId: "booking-003", sender: "ADMIN" as const, content: "Great news! The rooftop is available on July 10th. We have sent over the proposal and contract.", createdAt: new Date("2026-04-18T14:00:00+03:00") },
    { bookingId: "booking-003", sender: "SYSTEM" as const, content: "Status changed to CONFIRMED", createdAt: new Date("2026-04-20T09:00:00+03:00") },
    // Booking 004 (PLANNED)
    { bookingId: "booking-004", sender: "SYSTEM" as const, content: "New booking request received. Awaiting review.", createdAt: new Date("2026-03-20T11:00:00+03:00") },
    { bookingId: "booking-004", sender: "SYSTEM" as const, content: "Status changed to CONTACTED", createdAt: new Date("2026-03-21T10:00:00+03:00") },
    { bookingId: "booking-004", sender: "SYSTEM" as const, content: "Status changed to CONFIRMED", createdAt: new Date("2026-03-25T15:00:00+03:00") },
    { bookingId: "booking-004", sender: "ADMIN" as const, content: "The convention hall layout has been finalized. We are now working on stage design and AV setup.", createdAt: new Date("2026-04-01T09:00:00+03:00") },
    { bookingId: "booking-004", sender: "SYSTEM" as const, content: "Status changed to PLANNED", createdAt: new Date("2026-04-01T09:00:00+03:00") },
    { bookingId: "booking-004", sender: "ADMIN" as const, content: "Catering menu has been selected. We will do a tasting session next week.", createdAt: new Date("2026-04-15T11:30:00+03:00") },
    // Booking 005 (COMPLETED)
    { bookingId: "booking-005", sender: "SYSTEM" as const, content: "New booking request received. Awaiting review.", createdAt: new Date("2026-04-01T08:30:00+03:00") },
    { bookingId: "booking-005", sender: "SYSTEM" as const, content: "Status changed to CONTACTED", createdAt: new Date("2026-04-02T10:00:00+03:00") },
    { bookingId: "booking-005", sender: "SYSTEM" as const, content: "Status changed to CONFIRMED", createdAt: new Date("2026-04-05T14:00:00+03:00") },
    { bookingId: "booking-005", sender: "SYSTEM" as const, content: "Status changed to PLANNED", createdAt: new Date("2026-04-10T11:00:00+03:00") },
    { bookingId: "booking-005", sender: "ADMIN" as const, content: "The surprise went perfectly! Grandmother was overjoyed. Here are some photos from the event.", createdAt: new Date("2026-05-06T10:00:00+03:00") },
    { bookingId: "booking-005", sender: "SYSTEM" as const, content: "Status changed to COMPLETED", createdAt: new Date("2026-05-06T10:00:00+03:00") },
    // Booking 006 (NEW_REQUEST)
    { bookingId: "booking-006", sender: "SYSTEM" as const, content: "New booking request received. Awaiting review.", createdAt: new Date("2026-05-03T16:45:00+03:00") },
    // Booking 007 (CONTACTED)
    { bookingId: "booking-007", sender: "SYSTEM" as const, content: "New booking request received. Awaiting review.", createdAt: new Date("2026-04-10T13:00:00+03:00") },
    { bookingId: "booking-007", sender: "ADMIN" as const, content: "Hello! We're excited about the arts festival. We have some great ideas for the exhibition space. Let's schedule a walkthrough.", createdAt: new Date("2026-04-12T10:00:00+03:00") },
    { bookingId: "booking-007", sender: "SYSTEM" as const, content: "Status changed to CONTACTED", createdAt: new Date("2026-04-12T10:00:00+03:00") },
    // Booking 010 (CONTACTED)
    { bookingId: "booking-010", sender: "SYSTEM" as const, content: "New booking request received. Awaiting review.", createdAt: new Date("2026-04-20T08:00:00+03:00") },
    { bookingId: "booking-010", sender: "ADMIN" as const, content: "Dear Alma & Ben, congratulations on your engagement! We would love to show you our Sky Garden venue for your wedding.", createdAt: new Date("2026-04-22T09:00:00+03:00") },
    { bookingId: "booking-010", sender: "SYSTEM" as const, content: "Status changed to CONTACTED", createdAt: new Date("2026-04-22T09:00:00+03:00") },
  ];

  for (const msg of messages) {
    await prisma.message.create({ data: msg });
  }
  console.log("✅ Messages seeded:", messages.length);

  // ============================================================
  // 4. GALLERY IMAGES
  // ============================================================
  console.log("\n🖼️ Seeding gallery images...");

  const galleryImages = [
    { title: "Elegant Garden Wedding", description: "Beautiful outdoor wedding setup with floral arches and fairy lights", imageUrl: "/images/gallery/wedding-1.jpg", category: "WEDDINGS" as const, isFeatured: true, sortOrder: 1 },
    { title: "Corporate Gala Dinner", description: "Annual corporate awards dinner with elegant table settings", imageUrl: "/images/gallery/corporate-1.jpg", category: "CORPORATE" as const, isFeatured: true, sortOrder: 2 },
    { title: "Sunset Birthday Celebration", description: "Rooftop birthday party with stunning Nairobi sunset views", imageUrl: "/images/gallery/birthday-1.jpg", category: "BIRTHDAYS" as const, isFeatured: false, sortOrder: 3 },
    { title: "Gold and Ivory Decor", description: "Luxurious event decor featuring gold accents and ivory draping", imageUrl: "/images/gallery/decor-1.jpg", category: "DECORATIONS" as const, isFeatured: true, sortOrder: 4 },
    { title: "Behind the Scenes Setup", description: "Our team preparing the perfect event layout", imageUrl: "/images/gallery/bts-1.jpg", category: "BEHIND_THE_SCENES" as const, isFeatured: false, sortOrder: 5 },
    { title: "Intimate Anniversary Dinner", description: "Romantic candlelit dinner setup for two", imageUrl: "/images/gallery/wedding-2.jpg", category: "WEDDINGS" as const, isFeatured: false, sortOrder: 6 },
    { title: "Conference Stage Design", description: "Professional stage setup with LED screens and lighting", imageUrl: "/images/gallery/corporate-2.jpg", category: "CORPORATE" as const, isFeatured: false, sortOrder: 7 },
    { title: "Kids Birthday Wonderland", description: "Colorful and fun birthday setup for children", imageUrl: "/images/gallery/birthday-2.jpg", category: "BIRTHDAYS" as const, isFeatured: false, sortOrder: 8 },
    { title: "Floral Decoration Masterpiece", description: "Stunning floral ceiling installation with cascading blooms", imageUrl: "/images/gallery/decor-2.jpg", category: "DECORATIONS" as const, isFeatured: false, sortOrder: 9 },
    { title: "Cultural Festival Setup", description: "Vibrant decor for a traditional cultural festival", imageUrl: "/images/gallery/cultural-1.jpg", category: "BEHIND_THE_SCENES" as const, isFeatured: false, sortOrder: 10 },
    { title: "Before & After: Hall Transformation", description: "Complete venue transformation from empty hall to magical event space", imageUrl: "/images/gallery/before-after-1.jpg", category: "DECORATIONS" as const, isFeatured: true, isBeforeAfter: true, beforeImageUrl: "/images/gallery/before-1.jpg", afterImageUrl: "/images/gallery/after-1.jpg", sortOrder: 11 },
    { title: "Engagement Party Decor", description: "Romantic sunset engagement party setup", imageUrl: "/images/gallery/engagement-1.jpg", category: "WEDDINGS" as const, isFeatured: false, sortOrder: 12 },
    { title: "Graduation Celebration", description: "Elegant graduation party with photo booth and buffet", imageUrl: "/images/gallery/graduation-1.jpg", category: "BIRTHDAYS" as const, isFeatured: false, sortOrder: 13 },
    { title: "Team at Work", description: "Our dedicated team setting up for a major event", imageUrl: "/images/gallery/team-1.jpg", category: "BEHIND_THE_SCENES" as const, isFeatured: false, sortOrder: 14 },
    { title: "Luxury Wedding Reception", description: "Grand reception with chandeliers and gold accents", imageUrl: "/images/gallery/wedding-3.jpg", category: "WEDDINGS" as const, isFeatured: true, sortOrder: 15 },
  ];

  for (const img of galleryImages) {
    await prisma.galleryImage.create({ data: img });
  }
  console.log("✅ Gallery images seeded:", galleryImages.length);

  // ============================================================
  // 5. PACKAGE CATEGORIES & PACKAGES
  // ============================================================
  console.log("\n📦 Seeding package categories and packages...");

  const weddingCategory = await prisma.packageCategory.upsert({
    where: { slug: "weddings" },
    update: {},
    create: {
      id: "cat-wedding",
      name: "Weddings",
      slug: "weddings",
      description: "Comprehensive wedding packages from intimate ceremonies to grand celebrations",
      coverImage: "/images/categories/weddings.jpg",
      sortOrder: 1,
    },
  });

  const corporateCategory = await prisma.packageCategory.upsert({
    where: { slug: "corporate" },
    update: {},
    create: {
      id: "cat-corporate",
      name: "Corporate Events",
      slug: "corporate",
      description: "Professional corporate event solutions for conferences, galas, and team building",
      coverImage: "/images/categories/corporate.jpg",
      sortOrder: 2,
    },
  });

  const birthdayCategory = await prisma.packageCategory.upsert({
    where: { slug: "birthdays" },
    update: {},
    create: {
      id: "cat-birthday",
      name: "Birthdays & Celebrations",
      slug: "birthdays",
      description: "Fun and memorable birthday packages for all ages",
      coverImage: "/images/categories/birthdays.jpg",
      sortOrder: 3,
    },
  });

  const packages = [
    // Wedding Packages
    {
      categoryId: weddingCategory.id,
      name: "Essential Wedding",
      shortDesc: "Perfect for intimate ceremonies",
      description: "A beautiful and affordable package for couples who want a simple yet elegant wedding. Includes basic decor, coordination, and photography.",
      price: 50000,
      priceLabel: "Starting from ETB 50,000",
      features: ["Venue setup for up to 50 guests", "Basic decoration package", "Event coordinator on day-of", "Standard tables and chairs", "Basic sound system", "Wedding cake"],
      exclusions: ["Catering", "Videography", "Transport", "Floral arrangements"],
      isPopular: false,
      isFeatured: false,
      sortOrder: 1,
    },
    {
      categoryId: weddingCategory.id,
      name: "Standard Wedding",
      shortDesc: "Our most popular wedding package",
      description: "The perfect balance of elegance and value. Includes premium decor, full coordination, photography, and welcome drinks for your guests.",
      price: 150000,
      priceLabel: "Starting from ETB 150,000",
      features: ["Venue setup for up to 150 guests", "Premium decoration with floral arrangements", "Full event coordination (planning + day-of)", "Premium tables, chairs, and linen", "Professional sound system with microphone", "Photography package (4 hours)", "Welcome drinks for guests", "Wedding cake"],
      exclusions: ["Catering", "Videography", "Guest transport"],
      isPopular: true,
      isFeatured: true,
      sortOrder: 2,
    },
    {
      categoryId: weddingCategory.id,
      name: "Premium Wedding",
      shortDesc: "The ultimate wedding experience",
      description: "Our most luxurious package for couples who want nothing but the best. Every detail meticulously crafted for an unforgettable celebration.",
      price: 400000,
      priceLabel: "Starting from ETB 400,000",
      features: ["Venue setup for up to 300 guests", "Luxury decoration with custom floral design", "Dedicated event planner from start to finish", "Premium furniture and custom linen", "Full AV setup with LED screens and lighting", "Professional photography & videography (full day)", "Gourmet catering menu tasting session", "Custom welcome signage and stationery", "Wedding cake or custom dessert table", "Guest transport coordination"],
      exclusions: [],
      isPopular: false,
      isFeatured: true,
      sortOrder: 3,
    },
    // Corporate Packages
    {
      categoryId: corporateCategory.id,
      name: "Corporate Basic",
      shortDesc: "Essential corporate event setup",
      description: "A practical package for company meetings, small conferences, and team building events.",
      price: 80000,
      priceLabel: "Starting from ETB 80,000",
      features: ["Venue setup for up to 80 guests", "Standard AV equipment", "Basic stage setup", "Registration desk", "Coffee break service"],
      exclusions: ["Catering", "Full production", "Photography"],
      isPopular: false,
      isFeatured: false,
      sortOrder: 1,
    },
    {
      categoryId: corporateCategory.id,
      name: "Corporate Premium",
      shortDesc: "Professional conference & gala package",
      description: "Ideal for large conferences, product launches, and annual galas. Includes full production, branding, and premium catering.",
      price: 300000,
      priceLabel: "Starting from ETB 300,000",
      features: ["Venue setup for up to 300 guests", "Full AV production with LED screens", "Branded stage and photo wall", "Professional photography (full day)", "Gourmet catering with wine pairings", "Event coordination team", "Welcome signage and branding", "Red carpet welcome"],
      exclusions: [],
      isPopular: true,
      isFeatured: true,
      sortOrder: 2,
    },
    // Birthday Packages
    {
      categoryId: birthdayCategory.id,
      name: "Birthday Classic",
      shortDesc: "Simple and fun celebration",
      description: "A cheerful package for birthdays with essential decor, cake, and entertainment setup.",
      price: 35000,
      priceLabel: "Starting from ETB 35,000",
      features: ["Venue setup for up to 30 guests", "Birthday decoration package", "Birthday cake", "Balloon arch", "Basic sound system"],
      exclusions: ["Catering", "Photography", "Entertainment"],
      isPopular: false,
      isFeatured: false,
      sortOrder: 1,
    },
    {
      categoryId: birthdayCategory.id,
      name: "Birthday Deluxe",
      shortDesc: "Memorable party experience",
      description: "A complete birthday party package with premium decor, photo booth, entertainment, and full coordination.",
      price: 100000,
      priceLabel: "Starting from ETB 100,000",
      features: ["Venue setup for up to 100 guests", "Premium theme-based decoration", "Photo booth with props", "Professional photography (3 hours)", "DJ entertainment", "Birthday cake and dessert table", "Party favors for guests", "Full event coordination"],
      exclusions: ["Catering", "Videography"],
      isPopular: true,
      isFeatured: true,
      sortOrder: 2,
    },
  ];

  for (const pkg of packages) {
    await prisma.package.create({ data: pkg });
  }
  console.log("✅ Package categories seeded:", 3);
  console.log("✅ Packages seeded:", packages.length);

  // ============================================================
  // 6. WEDDING INVITATIONS
  // ============================================================
  console.log("\n💌 Seeding wedding invitations...");

  const invitations = [
    {
      id: "inv-001",
      bookingId: "booking-001",
      brideName: "Sarah",
      groomName: "David",
      slug: "sarah-and-david",
      weddingDate: new Date("2026-08-15T14:00:00+03:00"),
      weddingTime: "2:00 PM",
      venueName: "Radiance Gardens",
      venueAddress: "Westlands, Nairobi, Kenya",
      dressCode: "Cocktail Attire",
      mapUrl: "https://maps.google.com/?q=Radiance+Gardens+Nairobi",
      welcomeMessage: "Welcome to our wedding! We're so excited to have you join us on our special day.",
      story: "Sarah and David met during their university days and fell in love amidst the vibrant chaos of Nairobi's coffee shops. After years of building their dreams together, they're ready to celebrate their forever. Join us as we embark on this beautiful journey surrounded by the people who mean the most to us.",
      coverImage: "/images/weddings/sarah-david-cover.jpg",
      galleryImages: ["/images/weddings/sarah-david-1.jpg", "/images/weddings/sarah-david-2.jpg", "/images/weddings/sarah-david-3.jpg", "/images/weddings/sarah-david-4.jpg"],
      theme: "FLORAL_LUXURY" as const,
      primaryColor: "#D4AF37",
      secondaryColor: "#F5F5DC",
      customMessage: "We can't wait to celebrate with you! Please RSVP by July 15th.",
      isPublished: true,
      publishedAt: new Date("2026-05-09T14:00:00+03:00"),
      pdfUrl: "/pdfs/invitations/sarah-and-david.pdf",
    },
    {
      id: "inv-002",
      bookingId: "booking-003",
      brideName: "Mary",
      groomName: "Peter",
      slug: "mary-and-peter-25th",
      weddingDate: new Date("2026-07-10T18:00:00+03:00"),
      weddingTime: "6:00 PM",
      venueName: "Radiance Rooftop Venue",
      venueAddress: "Koinange Street, Nairobi CBD, Kenya",
      dressCode: "Semi-Formal",
      mapUrl: "https://maps.google.com/?q=Radiance+Rooftop+Nairobi",
      welcomeMessage: "Welcome to our 25th anniversary celebration! Thank you for being part of our journey.",
      story: "Twenty-five years ago, Mary and Peter said 'I do' in a small ceremony surrounded by family. Now, as they celebrate this incredible milestone, they want to share their joy with all of you who have been part of their journey. From raising children to building a home filled with love, their story is one of commitment, laughter, and unwavering support.",
      coverImage: "/images/weddings/mary-peter-cover.jpg",
      galleryImages: ["/images/weddings/mary-peter-1.jpg", "/images/weddings/mary-peter-2.jpg", "/images/weddings/mary-peter-3.jpg"],
      theme: "ROYAL_GOLD" as const,
      primaryColor: "#FFD700",
      secondaryColor: "#800080",
      customMessage: "Celebrating 25 wonderful years of love, laughter, and forever. Join us!",
      isPublished: true,
      publishedAt: new Date("2026-05-08T16:30:00+03:00"),
      pdfUrl: "/pdfs/invitations/mary-and-peter.pdf",
    },
    {
      id: "inv-003",
      bookingId: "booking-006",
      brideName: "Grace",
      groomName: "Michael",
      slug: "grace-and-michael",
      weddingDate: new Date("2026-09-12T17:00:00+03:00"),
      weddingTime: "5:00 PM",
      venueName: "Radiance Garden Terrace",
      venueAddress: "Karen, Nairobi, Kenya",
      dressCode: "Garden Party Chic",
      mapUrl: "https://maps.google.com/?q=Radiance+Garden+Terrace+Karen",
      welcomeMessage: "Welcome to our engagement celebration! We're thrilled to share this special moment with you.",
      story: "What started as a chance meeting at a mutual friend's barbecue has blossomed into the most beautiful love story. Grace and Michael share a passion for adventure, good food, and making memories. As they prepare to say 'I do,' they're filled with gratitude for the love and support that surrounds them.",
      coverImage: "/images/weddings/grace-michael-cover.jpg",
      galleryImages: ["/images/weddings/grace-michael-1.jpg", "/images/weddings/grace-michael-2.jpg"],
      theme: "MODERN_MINIMAL" as const,
      primaryColor: "#FFFFFF",
      secondaryColor: "#2C3E50",
      customMessage: "Love is not about how many days you've been together, but how much you love each other every day.",
      isPublished: false,
      publishedAt: null,
      pdfUrl: null,
    },
  ];

  for (const inv of invitations) {
    await prisma.weddingInvitation.upsert({
      where: { id: inv.id },
      update: {},
      create: inv,
    });
  }
  console.log("✅ Wedding invitations seeded:", invitations.length);

  // ============================================================
  // 7. RSVPs
  // ============================================================
  console.log("\n📋 Seeding RSVPs...");

  const rsvps = [
    { invitationId: "inv-001", guestName: "John & Mary Smith", guestPhone: "+254 712 345 678", attendance: "ATTENDING" as const, message: "Congratulations! We're so happy for you both. Looking forward to the celebration!", createdAt: new Date("2026-05-02T10:00:00+03:00") },
    { invitationId: "inv-001", guestName: "David Johnson", guestPhone: "+254 723 456 789", attendance: "ATTENDING" as const, message: null, createdAt: new Date("2026-05-03T14:30:00+03:00") },
    { invitationId: "inv-001", guestName: "Sarah's Aunt Margaret", guestPhone: "+254 734 567 890", attendance: "NOT_ATTENDING" as const, message: "So sorry I can't make it, but sending you both lots of love and congratulations!", createdAt: new Date("2026-05-04T09:15:00+03:00") },
    { invitationId: "inv-001", guestName: "James Kariuki", guestPhone: "+254 745 678 901", attendance: "MAYBE" as const, message: "I'll try my best to be there! Will confirm closer to the date.", createdAt: new Date("2026-05-05T16:00:00+03:00") },
    { invitationId: "inv-001", guestName: "Emily & Robert", guestPhone: "+254 756 789 012", attendance: "ATTENDING" as const, message: "Can't wait to celebrate with you both! 🎉", createdAt: new Date("2026-05-06T11:00:00+03:00") },
    { invitationId: "inv-002", guestName: "Family Friends", guestPhone: "+254 745 678 901", attendance: "ATTENDING" as const, message: "25 years! What a beautiful milestone. We wouldn't miss it for the world.", createdAt: new Date("2026-04-20T16:00:00+03:00") },
    { invitationId: "inv-002", guestName: "Work Colleagues", guestPhone: "+254 756 789 012", attendance: "MAYBE" as const, message: "We're trying to make it work with our schedule. Will confirm soon!", createdAt: new Date("2026-04-25T11:30:00+03:00") },
    { invitationId: "inv-002", guestName: "The Kimani Family", guestPhone: "+254 767 890 123", attendance: "ATTENDING" as const, message: "Congratulations on 25 years of marriage! What an inspiration.", createdAt: new Date("2026-04-28T09:00:00+03:00") },
    { invitationId: "inv-002", guestName: "Pastor Johnstone", guestPhone: "+254 778 901 234", attendance: "NOT_ATTENDING" as const, message: "I will be out of the country but will keep you in my prayers. God bless your union.", createdAt: new Date("2026-05-01T14:00:00+03:00") },
    { invitationId: "inv-003", guestName: "Best Man - Tom", guestPhone: "+254 789 012 345", attendance: "ATTENDING" as const, message: "Wouldn't miss it! So happy for you two!", createdAt: new Date("2026-05-04T12:00:00+03:00") },
    { invitationId: "inv-003", guestName: "Maid of Honor - Lisa", guestPhone: "+254 790 123 456", attendance: "ATTENDING" as const, message: "So excited for this next chapter! ❤️", createdAt: new Date("2026-05-05T15:30:00+03:00") },
  ];

  for (const rsvp of rsvps) {
    await prisma.rSVP.create({ data: rsvp });
  }
  console.log("✅ RSVPs seeded:", rsvps.length);

  // ============================================================
  // 8. GIFT REGISTRY
  // ============================================================
  console.log("\n🎁 Seeding gift registries...");

  const gifts = [
    { id: "gift-001", invitationId: "inv-001", giftName: "Stand Mixer", description: "KitchenAid 5-quart stand mixer in matte black - perfect for Sarah's baking adventures", imageUrl: "/images/gifts/kitchenaid-mixer.jpg", priority: 1, priorityLabel: "HIGH" as const, isReserved: false, reservedBy: null, createdAt: new Date("2026-05-01T12:00:00+03:00") },
    { id: "gift-002", invitationId: "inv-001", giftName: "Coffee Table", description: "Modern walnut coffee table - to complete our living room furniture set", imageUrl: "/images/gifts/coffee-table.jpg", priority: 2, priorityLabel: "MEDIUM" as const, isReserved: true, reservedBy: "John & Mary Smith", reservedMessage: "We'd love to get this for you!", createdAt: new Date("2026-05-01T12:00:00+03:00") },
    { id: "gift-003", invitationId: "inv-001", giftName: "Weekend Getaway", description: "Romantic weekend at a luxury lodge - for our honeymoon", imageUrl: "/images/gifts/weekend-getaway.jpg", priority: 1, priorityLabel: "HIGH" as const, isReserved: false, reservedBy: null, createdAt: new Date("2026-05-01T12:00:00+03:00") },
    { id: "gift-004", invitationId: "inv-001", giftName: "Dinnerware Set", description: "12-piece fine china dinnerware set in white and gold", imageUrl: "/images/gifts/dinnerware.jpg", priority: 3, priorityLabel: "MEDIUM" as const, isReserved: false, reservedBy: null, createdAt: new Date("2026-05-01T12:00:00+03:00") },
    { id: "gift-005", invitationId: "inv-001", giftName: "Smart Home Speaker", description: "Latest smart speaker with voice assistant - for our new home", imageUrl: "/images/gifts/speaker.jpg", priority: 3, priorityLabel: "LOW" as const, isReserved: false, reservedBy: null, createdAt: new Date("2026-05-01T12:00:00+03:00") },
    { id: "gift-006", invitationId: "inv-002", giftName: "Silver Picture Frame", description: "Elegant 8x10 silver picture frame - to display our 25th anniversary photo", imageUrl: "/images/gifts/silver-frame.jpg", priority: 3, priorityLabel: "LOW" as const, isReserved: false, reservedBy: null, createdAt: new Date("2026-04-15T10:00:00+03:00") },
    { id: "gift-007", invitationId: "inv-002", giftName: "Garden Bench", description: "Beautiful wrought iron garden bench - for our backyard sanctuary", imageUrl: "/images/gifts/garden-bench.jpg", priority: 2, priorityLabel: "MEDIUM" as const, isReserved: true, reservedBy: "Family Friends", reservedMessage: "A perfect gift for your beautiful garden!", createdAt: new Date("2026-04-15T10:00:00+03:00") },
    { id: "gift-008", invitationId: "inv-002", giftName: "Wine Collection", description: "Premium selection of 12 fine wines from around the world", imageUrl: "/images/gifts/wine-collection.jpg", priority: 1, priorityLabel: "HIGH" as const, isReserved: false, reservedBy: null, createdAt: new Date("2026-04-15T10:00:00+03:00") },
    { id: "gift-009", invitationId: "inv-002", giftName: "Spa Day Voucher", description: "A luxurious couples spa day experience", imageUrl: "/images/gifts/spa-voucher.jpg", priority: 2, priorityLabel: "MEDIUM" as const, isReserved: false, reservedBy: null, createdAt: new Date("2026-04-15T10:00:00+03:00") },
    { id: "gift-010", invitationId: "inv-003", giftName: "Engagement Photo Frame", description: "Beautiful silver frame for engagement photos", imageUrl: "/images/gifts/engagement-frame.jpg", priority: 3, priorityLabel: "LOW" as const, isReserved: false, reservedBy: null, createdAt: new Date("2026-05-04T12:00:00+03:00") },
    { id: "gift-011", invitationId: "inv-003", giftName: "Cookbook Collection", description: "Set of gourmet cookbooks for the foodie couple", imageUrl: "/images/gifts/cookbooks.jpg", priority: 2, priorityLabel: "MEDIUM" as const, isReserved: false, reservedBy: null, createdAt: new Date("2026-05-04T12:00:00+03:00") },
  ];

  for (const gift of gifts) {
    await prisma.giftRegistry.upsert({
      where: { id: gift.id },
      update: {},
      create: gift,
    });
  }
  console.log("✅ Gift registry seeded:", gifts.length);

  // ============================================================
  // 9. GIFT RESERVATIONS
  // ============================================================
  console.log("\n🔖 Seeding gift reservations...");

  const giftReservations = [
    { invitationId: "inv-001", giftId: "gift-002", reservedBy: "John & Mary Smith", reservedMessage: "We'd love to get this for you!", createdAt: new Date("2026-05-03T10:00:00+03:00") },
    { invitationId: "inv-002", giftId: "gift-007", reservedBy: "Family Friends", reservedMessage: "A perfect gift for your beautiful garden!", createdAt: new Date("2026-04-20T14:00:00+03:00") },
  ];

  for (const res of giftReservations) {
    await prisma.giftReservation.create({ data: res });
  }
  console.log("✅ Gift reservations seeded:", giftReservations.length);

  // ============================================================
  // 10. DESIGN ASSETS
  // ============================================================
  console.log("\n🎨 Seeding design assets...");

  const designAssets = [
    { name: "Floral Border Frame", imageUrl: "/images/design-assets/floral-border.png", category: "FRAME" as const, createdAt: new Date("2026-01-01T00:00:00+03:00") },
    { name: "Gold Ornament", imageUrl: "/images/design-assets/gold-ornament.png", category: "ORNAMENT" as const, createdAt: new Date("2026-01-01T00:00:00+03:00") },
    { name: "Rose Petal Texture", imageUrl: "/images/design-assets/rose-texture.jpg", category: "TEXTURE" as const, createdAt: new Date("2026-01-01T00:00:00+03:00") },
    { name: "Elegant Frame", imageUrl: "/images/design-assets/elegant-frame.png", category: "FRAME" as const, createdAt: new Date("2026-01-01T00:00:00+03:00") },
    { name: "Watercolor Florals", imageUrl: "/images/design-assets/watercolor-florals.png", category: "FLORAL" as const, createdAt: new Date("2026-01-01T00:00:00+03:00") },
    { name: "Diamond Pattern Frame", imageUrl: "/images/design-assets/diamond-frame.png", category: "FRAME" as const, createdAt: new Date("2026-01-01T00:00:00+03:00") },
    { name: "Ethiopian Cross Ornament", imageUrl: "/images/design-assets/ethiopian-cross.png", category: "ORNAMENT" as const, createdAt: new Date("2026-01-01T00:00:00+03:00") },
    { name: "Gold Foil Texture", imageUrl: "/images/design-assets/gold-foil.jpg", category: "TEXTURE" as const, createdAt: new Date("2026-01-01T00:00:00+03:00") },
    { name: "Bouquet Floral Set", imageUrl: "/images/design-assets/bouquet-florals.png", category: "FLORAL" as const, createdAt: new Date("2026-01-01T00:00:00+03:00") },
    { name: "Vintage Scroll Frame", imageUrl: "/images/design-assets/vintage-scroll.png", category: "FRAME" as const, createdAt: new Date("2026-01-01T00:00:00+03:00") },
  ];

  for (const asset of designAssets) {
    await prisma.designAsset.create({ data: asset });
  }
  console.log("✅ Design assets seeded:", designAssets.length);

  // ============================================================
  // 11. PROPOSAL TEMPLATES
  // ============================================================
  console.log("\n📄 Seeding proposal templates...");

  const proposalTemplates = [
    {
      name: "Standard Wedding Proposal",
      description: "A comprehensive wedding proposal template with sections for event story, design direction, guest experience, and timeline.",
      eventType: "WEDDING" as const,
      coverImage: "/images/proposals/wedding-template.jpg",
      sections: JSON.stringify([
        { title: "Event Story", content: "Describe the love story and vision for the day." },
        { title: "Design Direction", content: "Outline the color palette, textures, and overall aesthetic." },
        { title: "Guest Experience", content: "Detail the flow of the event and what guests will experience." },
        { title: "Timeline", content: "Key milestones leading up to and on the wedding day." },
      ]),
      contractTerms: "50% deposit upon signing. Remaining balance due 14 days before event. Cancellation: 60+ days full refund minus 10%, 30-59 days 50% refund, under 30 days no refund.",
      createdById: adminUser.id,
    },
    {
      name: "Corporate Event Proposal",
      description: "Professional template for corporate events including conferences, galas, and team building.",
      eventType: "CORPORATE" as const,
      coverImage: "/images/proposals/corporate-template.jpg",
      sections: JSON.stringify([
        { title: "Executive Summary", content: "Overview of the event concept and objectives." },
        { title: "Venue & Production", content: "Venue details, stage design, AV requirements." },
        { title: "Catering & Hospitality", content: "Menu options and guest experience details." },
        { title: "Budget Breakdown", content: "Itemized costs for all services." },
      ]),
      contractTerms: "50% deposit upon signing. Balance due 21 days before the event. Cancellation: 45+ days full refund minus 15%, 30-44 days 50% refund, under 30 days no refund.",
      createdById: adminUser.id,
    },
    {
      name: "Birthday Celebration Proposal",
      description: "Fun and creative template for birthday parties and personal celebrations.",
      eventType: "BIRTHDAY" as const,
      coverImage: "/images/proposals/birthday-template.jpg",
      sections: JSON.stringify([
        { title: "Party Vision", content: "Describe the theme and overall celebration vision." },
        { title: "Decor & Setup", content: "Decoration plan, color scheme, and layout." },
        { title: "Entertainment", content: "Music, activities, and entertainment details." },
        { title: "Menu & Catering", content: "Food and beverage options." },
      ]),
      contractTerms: "50% deposit upon signing. Balance due 7 days before event.",
      createdById: adminUser.id,
    },
  ];

  for (const template of proposalTemplates) {
    await prisma.proposalTemplate.create({ data: template });
  }
  console.log("✅ Proposal templates seeded:", proposalTemplates.length);

  // ============================================================
  // 12. PROPOSALS (with Items, Sections, Contracts, Comments)
  // ============================================================
  console.log("\n📑 Seeding proposals...");

  // Create proposal bookings first if they don't exist
  const proposalBookings = [
    {
      id: "booking_prop_001",
      clientName: "Helen & Michael Debebe",
      clientEmail: "helen.debebe@email.com",
      clientPhone: "+251-911-123456",
      eventType: "WEDDING" as const,
      eventDate: new Date("2026-12-15T16:00:00+03:00"),
      location: "Sheraton Addis Hotel",
      guestCount: 250,
      budgetRange: "RANGE_200K_500K" as const,
      status: "CONTACTED" as const,
      assignedTo: "Grace",
    },
    {
      id: "booking_prop_002",
      clientName: "Tekle Berhanu Corp",
      clientEmail: "info@tekleberhanu.com",
      clientPhone: "+251-911-789012",
      eventType: "CORPORATE" as const,
      eventDate: new Date("2026-09-20T18:00:00+03:00"),
      location: "Skylight Hotel",
      guestCount: 500,
      budgetRange: "ABOVE_500K" as const,
      status: "CONTACTED" as const,
      assignedTo: "John",
    },
    {
      id: "booking_prop_003",
      clientName: "Sara & Dawit Tadesse",
      clientEmail: "sara.tadesse@email.com",
      clientPhone: "+251-922-345678",
      eventType: "WEDDING" as const,
      eventDate: new Date("2027-01-10T15:00:00+03:00"),
      location: "Entoto Mountain View",
      guestCount: 180,
      budgetRange: "RANGE_100K_200K" as const,
      status: "NEW_REQUEST" as const,
      assignedTo: null,
    },
  ];

  for (const pb of proposalBookings) {
    await prisma.booking.upsert({
      where: { id: pb.id },
      update: {},
      create: pb,
    });
  }

  // Proposals
  const proposals = [
    {
      id: "prop_sample_001",
      bookingId: "booking_prop_001",
      title: "Luxury Wedding Proposal — Helen & Michael",
      proposalNumber: "PRP-2026-10001",
      introduction: `Dear Helen and Michael,

Thank you for choosing Radiance to bring your wedding vision to life. It has been a pleasure getting to know you both, and we are deeply honored to present this proposal for your special day.

With love and creativity,
The Radiance Team`,
      eventVision: "We envision a wedding that embodies timeless elegance and understated luxury. The evening will unfold like a beautifully orchestrated symphony — from the intimate ceremony to the grand reception, every moment carefully curated to create an atmosphere of pure romance.\n\nOur goal is to create a sensory experience: the soft glow of candlelight, the fragrance of white gardenias, the sound of live strings during dinner, and the vibrant energy of Ethiopian music carrying guests onto the dance floor.",
      themeConcept: '"Eternal Radiance" — A palette of ivory, blush, and gold inspired by the golden hour. The design draws from classic European elegance merged with Ethiopian cultural richness.',
      totalAmount: 420000,
      currency: "ETB",
      status: "DRAFT" as const,
      validUntil: new Date("2026-08-15T00:00:00+03:00"),
      publicToken: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
      createdById: adminUser.id,
    },
    {
      id: "prop_sample_002",
      bookingId: "booking_prop_002",
      title: "Corporate Gala — Tekle Berhanu Annual Celebration",
      proposalNumber: "PRP-2026-10002",
      introduction: `Dear Tekle Berhanu Team,

Thank you for considering Radiance to produce your annual corporate celebration. We are excited to present a concept that reflects your company's prestige.

Best regards,
The Radiance Team`,
      eventVision: "A sophisticated corporate gala that balances professionalism with celebration. The evening will feature a red-carpet welcome, gourmet dining, inspirational speeches, and entertainment.",
      themeConcept: '"Platinum Excellence" — A sleek aesthetic using platinum, navy, and white. Clean lines, dramatic lighting, and premium materials.',
      totalAmount: 685000,
      currency: "ETB",
      status: "SENT" as const,
      validUntil: new Date("2026-07-30T00:00:00+03:00"),
      publicToken: "b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1",
      createdById: adminUser.id,
    },
    {
      id: "prop_sample_003",
      bookingId: "booking_prop_003",
      title: "Garden Wedding — Sara & Dawit",
      proposalNumber: "PRP-2026-10003",
      introduction: `Dear Sara and Dawit,

It has been a joy to hear your story. We are honored to present this proposal for your beautiful celebration of love.

With warmth,
The Radiance Team`,
      eventVision: "An intimate garden wedding celebrating the natural beauty of Entoto Mountain. The day will feel personal, warm, and deeply meaningful — focused on their love story.",
      themeConcept: '"Mountain Serenade" — Rustic-elegant in sage green, dusty rose, and cream. Natural textures combined with soft candles.',
      totalAmount: 198500,
      currency: "ETB",
      status: "DRAFT" as const,
      validUntil: new Date("2026-11-01T00:00:00+03:00"),
      publicToken: "c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2",
      createdById: adminUser.id,
    },
  ];

  for (const prop of proposals) {
    await prisma.proposal.upsert({
      where: { id: prop.id },
      update: {},
      create: prop,
    });
  }
  console.log("✅ Proposals seeded:", proposals.length);

  // Proposal Items
  const proposalItems = [
    // Proposal 1 - Luxury Wedding
    { proposalId: "prop_sample_001", title: "Premium Floral Arrangements", description: "Bridal bouquet, ceremony arch, centerpieces x25", quantity: 1, unitPrice: 85000, totalPrice: 85000, category: "FLORAL" as const, sortOrder: 0 },
    { proposalId: "prop_sample_001", title: "Photography & Videography", description: "Full-day coverage with 2 photographers + 1 videographer", quantity: 1, unitPrice: 65000, totalPrice: 65000, category: "PHOTOGRAPHY" as const, sortOrder: 1 },
    { proposalId: "prop_sample_001", title: "Venue Styling & Décor", description: "Full venue transformation: ceremony, reception, lounge areas", quantity: 1, unitPrice: 120000, totalPrice: 120000, category: "DECORATION" as const, sortOrder: 2 },
    { proposalId: "prop_sample_001", title: "Catering — Premium Package", description: "5-course plated dinner with premium beverages", quantity: 250, unitPrice: 450, totalPrice: 112500, category: "CATERING" as const, sortOrder: 3 },
    { proposalId: "prop_sample_001", title: "Live Music — 6-Piece Band", description: "Jazz during cocktail hour, party set", quantity: 1, unitPrice: 35000, totalPrice: 35000, category: "ENTERTAINMENT" as const, sortOrder: 4 },
    { proposalId: "prop_sample_001", title: "Event Coordination", description: "Lead planner + 2 assistants, 3 months leading to wedding", quantity: 1, unitPrice: 45000, totalPrice: 45000, category: "COORDINATION" as const, sortOrder: 5 },
    { proposalId: "prop_sample_001", title: "Lighting Design", description: "Ambient uplighting, dance floor, chandelier installation", quantity: 1, unitPrice: 28000, totalPrice: 28000, category: "LIGHTING" as const, sortOrder: 6 },
    { proposalId: "prop_sample_001", title: "Guest Transportation", description: "2 luxury shuttle buses for guest transfers", quantity: 2, unitPrice: 15000, totalPrice: 30000, category: "TRANSPORT" as const, sortOrder: 7 },
    // Proposal 2 - Corporate Gala
    { proposalId: "prop_sample_002", title: "Venue Transformation & Branding", description: "Full décor with branded stage, logo projection, photo wall", quantity: 1, unitPrice: 150000, totalPrice: 150000, category: "DECORATION" as const, sortOrder: 0 },
    { proposalId: "prop_sample_002", title: "Premium Catering — Platinum Menu", description: "3-course dinner with wine pairing, premium bar", quantity: 500, unitPrice: 650, totalPrice: 325000, category: "CATERING" as const, sortOrder: 1 },
    { proposalId: "prop_sample_002", title: "Professional Photography & Video", description: "3 photographers + 1 videographer, highlight reel", quantity: 1, unitPrice: 75000, totalPrice: 75000, category: "PHOTOGRAPHY" as const, sortOrder: 2 },
    { proposalId: "prop_sample_002", title: "Entertainment — Live Band + DJ", description: "Sophisticated jazz hour, high-energy party band", quantity: 1, unitPrice: 55000, totalPrice: 55000, category: "ENTERTAINMENT" as const, sortOrder: 3 },
    { proposalId: "prop_sample_002", title: "Audio-Visual Production", description: "Pro sound system, LED screens, wireless mics", quantity: 1, unitPrice: 45000, totalPrice: 45000, category: "LIGHTING" as const, sortOrder: 4 },
    { proposalId: "prop_sample_002", title: "Event Coordination", description: "Lead producer + stage manager + 3 coordinators", quantity: 1, unitPrice: 35000, totalPrice: 35000, category: "COORDINATION" as const, sortOrder: 5 },
    // Proposal 3 - Garden Wedding
    { proposalId: "prop_sample_003", title: "Garden Ceremony Setup", description: "Wooden arch with eucalyptus, aisle petals, rustic seating", quantity: 1, unitPrice: 45000, totalPrice: 45000, category: "DECORATION" as const, sortOrder: 0 },
    { proposalId: "prop_sample_003", title: "Photography — Half Day", description: "Single photographer, 6 hours, online gallery", quantity: 1, unitPrice: 25000, totalPrice: 25000, category: "PHOTOGRAPHY" as const, sortOrder: 1 },
    { proposalId: "prop_sample_003", title: "Catering — Rustic Menu", description: "Family-style Ethiopian-Italian fusion, dessert bar", quantity: 180, unitPrice: 350, totalPrice: 63000, category: "CATERING" as const, sortOrder: 2 },
    { proposalId: "prop_sample_003", title: "Floral Design", description: "Bridal bouquet, centerpieces x15, cake flowers", quantity: 1, unitPrice: 35000, totalPrice: 35000, category: "FLORAL" as const, sortOrder: 3 },
    { proposalId: "prop_sample_003", title: "Acoustic Duo", description: "Guitar and vocalist for ceremony and cocktail hour", quantity: 1, unitPrice: 12000, totalPrice: 12000, category: "ENTERTAINMENT" as const, sortOrder: 4 },
    { proposalId: "prop_sample_003", title: "Day-of Coordination", description: "Lead coordinator for month-of planning + day-of", quantity: 1, unitPrice: 18500, totalPrice: 18500, category: "COORDINATION" as const, sortOrder: 5 },
  ];

  for (const item of proposalItems) {
    await prisma.proposalItem.create({ data: item });
  }
  console.log("✅ Proposal items seeded:", proposalItems.length);

  // Proposal Sections
  const proposalSections = [
    { proposalId: "prop_sample_001", title: "Event Story", content: "The love story of Helen and Michael began five years ago in Addis Ababa. Their wedding will honor both their Ethiopian heritage and their modern sensibilities — from the traditional ketter ceremony to the lively reception.", sortOrder: 0 },
    { proposalId: "prop_sample_001", title: "Design Direction", content: "Color Palette:\n• Primary: Ivory, Blush Pink, Gold\n• Secondary: Sage Green, Champagne\n• Accents: Crystal, amber\n\nTextures: Silk linens, velvet, matte gold, fresh florals", sortOrder: 1 },
    { proposalId: "prop_sample_001", title: "Guest Experience", content: "4:00 PM — Ceremony under floral canopy\n5:00 PM — Cocktail hour with jazz trio\n6:30 PM — Grand dinner with wine pairings\n9:00 PM — Dancing until midnight\n12:00 AM — Late-night Ethiopian street food", sortOrder: 2 },
    { proposalId: "prop_sample_001", title: "Timeline", content: "Month 1: Final design, vendor confirmations, menu tasting\nMonth 2: Dress fittings, seating chart\nWeek Of: Venue build-out, rehearsal\nWedding Day: Ceremony → Reception", sortOrder: 3 },
    { proposalId: "prop_sample_002", title: "Executive Summary", content: "Tekle Berhanu Corp's annual celebration will host 500 guests for an evening of recognition, inspiration, and celebration. The event will feature a red-carpet arrival, keynote addresses, awards ceremony, gourmet dinner, and entertainment.", sortOrder: 0 },
    { proposalId: "prop_sample_002", title: "Venue & Production", content: "The Skylight Hotel Grand Ballroom will be transformed with branded stage, custom lighting, and premium AV. A photo wall and welcome lounge will greet guests upon arrival.", sortOrder: 1 },
    { proposalId: "prop_sample_002", title: "Catering & Hospitality", content: "Platinum menu featuring international cuisine with Ethiopian fusion options. Premium bar with wine pairings selected by our sommelier.", sortOrder: 2 },
    { proposalId: "prop_sample_003", title: "Ceremony Vision", content: "An outdoor ceremony at Entoto Mountain with panoramic views of Addis Ababa. Rustic wooden arch adorned with eucalyptus and white blooms.", sortOrder: 0 },
    { proposalId: "prop_sample_003", title: "Reception Details", content: "Garden tent reception with fairy lights, family-style dining, and a dessert bar featuring traditional Ethiopian sweets and Italian pastries.", sortOrder: 1 },
  ];

  for (const section of proposalSections) {
    await prisma.proposalSection.create({ data: section });
  }
  console.log("✅ Proposal sections seeded:", proposalSections.length);

  // Proposal Contracts
  const proposalContracts = [
    { proposalId: "prop_sample_001", title: "Payment Terms", content: "50% deposit (ETB 210,000) upon signing.\nRemaining balance due 14 days before event.\n\nSchedule:\n• Signing: ETB 210,000 (50%)\n• 30 days before: ETB 105,000 (25%)\n• 14 days before: ETB 105,000 (25%)" },
    { proposalId: "prop_sample_001", title: "Cancellation Policy", content: "• 60+ days before: Full refund minus 10% fee\n• 30-59 days: 50% refund\n• 14-29 days: 25% refund\n• Under 14 days: No refund" },
    { proposalId: "prop_sample_001", title: "Event Responsibility", content: "Radiance handles setup, execution, takedown and vendor coordination.\n\nClient provides venue access and secures permits." },
    { proposalId: "prop_sample_001", title: "Vendor Policy", content: "External vendors must be approved in writing 21 days before the event. Change orders issued for added services." },
    { proposalId: "prop_sample_002", title: "Payment Terms", content: "50% deposit upon signing. Balance due 21 days before the event." },
    { proposalId: "prop_sample_002", title: "Cancellation Policy", content: "• 45+ days: Full refund minus 15%\n• 30-44 days: 50% refund\n• Under 30 days: No refund" },
    { proposalId: "prop_sample_002", title: "Event Responsibility", content: "Radiance manages all production, AV, catering coordination and timeline management." },
    { proposalId: "prop_sample_003", title: "Payment Terms", content: "50% deposit (ETB 99,250) upon signing.\nBalance due 14 days before event." },
    { proposalId: "prop_sample_003", title: "Cancellation Policy", content: "• 60+ days: Full refund minus 10%\n• 30-59 days: 50% refund\n• Under 30 days: No refund" },
  ];

  for (const contract of proposalContracts) {
    await prisma.proposalContract.create({ data: contract });
  }
  console.log("✅ Proposal contracts seeded:", proposalContracts.length);

  // Proposal Comments
  console.log("\n💬 Seeding proposal comments...");

  const proposalComments = [
    { proposalId: "prop_sample_001", authorName: "Grace Muthoni", content: "Created the initial proposal draft. Need to review floral arrangements pricing with vendor.", createdAt: new Date("2026-05-10T09:00:00+03:00") },
    { proposalId: "prop_sample_001", authorName: "Admin Review", content: "Overall concept looks strong. Let's add more details to the timeline section.", createdAt: new Date("2026-05-10T14:30:00+03:00") },
    { proposalId: "prop_sample_002", authorName: "John Kiprono", content: "Sent to client on May 8th. Awaiting their feedback on the platinum menu options.", createdAt: new Date("2026-05-08T11:00:00+03:00") },
    { proposalId: "prop_sample_002", authorName: "Grace Muthoni", content: "Client called - they want to increase the bar budget. Need to update the proposal.", createdAt: new Date("2026-05-12T15:00:00+03:00") },
    { proposalId: "prop_sample_003", authorName: "Sarah Wanjiku", content: "Initial draft created based on client consultation. Needs final pricing from floral team.", createdAt: new Date("2026-05-09T10:00:00+03:00") },
  ];

  for (const comment of proposalComments) {
    await prisma.proposalComment.create({ data: comment });
  }
  console.log("✅ Proposal comments seeded:", proposalComments.length);

  // ============================================================
  // SUMMARY
  // ============================================================
  console.log("\n" + "=".repeat(50));
  console.log("📊 SEEDING COMPLETE!");
  console.log("=".repeat(50));
  console.log(`
  Users:               ${1 + staffUsers.length}
  Bookings:            ${bookings.length}
  Messages:            ${messages.length}
  Gallery Images:      ${galleryImages.length}
  Package Categories:  3
  Packages:            ${packages.length}
  Wedding Invitations: ${invitations.length}
  RSVPs:               ${rsvps.length}
  Gifts:               ${gifts.length}
  Gift Reservations:   ${giftReservations.length}
  Design Assets:       ${designAssets.length}
  Proposal Templates:  ${proposalTemplates.length}
  Proposals:           ${proposals.length}
  Proposal Items:      ${proposalItems.length}
  Proposal Sections:   ${proposalSections.length}
  Proposal Contracts:  ${proposalContracts.length}
  Proposal Comments:   ${proposalComments.length}
  `);
  console.log("✅ Database seeding completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });

