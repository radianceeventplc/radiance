import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function seedCardDesigns() {
  console.log("🎨 Starting comprehensive card design data seeding...\n");

  try {
    // ============================================================
    // 1. CREATE BOOKINGS FOR CARD DESIGNS
    // ============================================================
    console.log("📅 Creating bookings...");

    const booking1 = await prisma.booking.upsert({
      where: { id: "booking-card-001" },
      update: {},
      create: {
        id: "booking-card-001",
        clientName: "Emma Thompson & James Williams",
        clientEmail: "emma.james@email.com",
        clientPhone: "+254 712 555 001",
        eventType: "WEDDING",
        eventDate: new Date("2026-09-25T14:00:00+03:00"),
        location: "Nairobi Serena Hotel, Kenya",
        guestCount: 250,
        budgetRange: "RANGE_200K_500K",
        notes: "Classic luxury wedding with modern touches",
        status: "PLANNED",
        assignedTo: "Grace Muthoni",
        agreedAmount: 350000,
        depositPaid: true,
        depositDate: new Date("2026-05-10T00:00:00+03:00"),
      },
    });

    const booking2 = await prisma.booking.upsert({
      where: { id: "booking-card-002" },
      update: {},
      create: {
        id: "booking-card-002",
        clientName: "Zainab Hassan & Omar Ahmed",
        clientEmail: "zainab.omar@email.com",
        clientPhone: "+254 723 555 002",
        eventType: "WEDDING",
        eventDate: new Date("2026-10-15T16:00:00+03:00"),
        location: "Villa Rosa Kempinski, Nairobi",
        guestCount: 180,
        budgetRange: "RANGE_100K_200K",
        notes: "Modern elegant celebration with cultural elements",
        status: "CONFIRMED",
        assignedTo: "John Kiprono",
        agreedAmount: 280000,
        depositPaid: true,
        depositDate: new Date("2026-05-12T00:00:00+03:00"),
      },
    });

    console.log("✅ Bookings created");

    // ============================================================
    // 2. CREATE WEDDING INVITATION 1 - LUXURY GOLD THEME
    // ============================================================
    console.log("\n💌 Creating wedding invitation 1 - Luxury Gold Theme...");

    const invitation1 = await prisma.weddingInvitation.upsert({
      where: { id: "card-design-001" },
      update: {},
      create: {
        id: "card-design-001",
        bookingId: booking1.id,
        brideName: "Emma",
        groomName: "James",
        slug: "emma-and-james-luxury",
        weddingDate: new Date("2026-09-25T14:00:00+03:00"),
        weddingTime: "2:00 PM",
        venueName: "Nairobi Serena Hotel",
        venueAddress: "Kenyatta Avenue, Nairobi, Kenya",
        dressCode: "Black Tie Optional",
        mapUrl: "https://maps.google.com/?q=Nairobi+Serena+Hotel",
        welcomeMessage:
          "We are thrilled to invite you to celebrate the union of two souls in love.",
        story:
          "Emma and James first met at a gallery opening in downtown Nairobi, where they discovered a shared passion for art and adventure. Over five years of exploring the world together, they've built a love story filled with laughter, spontaneity, and endless support. Now, they invite you to witness their most important milestone yet - the beginning of forever together. From sunset walks in Karen to quiet mornings planning their dreams, every moment has led to this beautiful day.",
        heroImageUrl: "/images/card-designs/emma-james-hero.jpg",
        coverImage: "/images/card-designs/emma-james-cover.jpg",
        galleryImages: [
          "/images/card-designs/emma-james-1.jpg",
          "/images/card-designs/emma-james-2.jpg",
          "/images/card-designs/emma-james-3.jpg",
          "/images/card-designs/emma-james-4.jpg",
          "/images/card-designs/emma-james-5.jpg",
        ],
        templateKey: "LUXURY_WHITE",
        theme: "LUXURY_WHITE",
        primaryColor: "#D4AF37", // Gold
        secondaryColor: "#F5F5DC", // Beige
        themeColor: "#FFFFFF", // White
        customMessage:
          "Your presence is the greatest gift we could receive. Please RSVP by August 25th.",
        floralTopLeft: "/images/florals/gold-rose-top-left.png",
        floralTopRight: "/images/florals/gold-rose-top-right.png",
        floralBottomLeft: "/images/florals/gold-rose-bottom-left.png",
        floralBottomRight: "/images/florals/gold-rose-bottom-right.png",
        status: "PUBLISHED",
        allowRSVP: true,
        allowGiftRegistry: true,
        isPublished: true,
        publishedAt: new Date("2026-05-15T10:00:00+03:00"),
        pdfUrl: "/pdfs/invitations/emma-and-james.pdf",
      },
    });

    // Create Invitation Message 1
    await prisma.invitationMessage.upsert({
      where: { weddingId: invitation1.id },
      update: {},
      create: {
        weddingId: invitation1.id,
        preline: "We joyfully invite you to celebrate with us",
        message:
          "as we embark on the beautiful journey of marriage. Join us for an evening of love, laughter, and unforgettable memories as we say 'I do' surrounded by the people who matter most.",
      },
    });

    // Create Love Story Entries 1
    const loveStories1 = [
      {
        weddingId: invitation1.id,
        year: "2019",
        title: "The Gallery Meeting",
        description:
          "Our eyes met across a crowded gallery space during an art exhibition opening. Emma was captivated by a modern sculpture, while James was admiring the light. When they both reached for the exhibition catalogue at the same time, their hands touched - and the rest became history.",
        sortOrder: 0,
      },
      {
        weddingId: invitation1.id,
        year: "2021",
        title: "First Adventure Together",
        description:
          "We took our first international trip together to Cape Town. Watching the sunset at Cape Point while holding hands, we both knew this was something special. James whispered, 'I could see myself doing this forever with you.'",
        sortOrder: 1,
      },
      {
        weddingId: invitation1.id,
        year: "2023",
        title: "Building Our Home",
        description:
          "We bought our first home together in Karen - a charming cottage with a garden. As we planted trees and painted walls together, we realized we were building not just a house, but a life filled with dreams and possibilities.",
        sortOrder: 2,
      },
      {
        weddingId: invitation1.id,
        year: "2024",
        title: "The Proposal",
        description:
          "On a clear evening at our favorite spot overlooking the city, with the city lights twinkling below, James got down on one knee. Through happy tears, Emma said yes. The beginning of forever began that magical night.",
        sortOrder: 3,
      },
    ];

    for (const story of loveStories1) {
      await prisma.loveStory.create({ data: story });
    }

    // Create Program Items 1
    const programItems1 = [
      {
        weddingId: invitation1.id,
        time: "1:00 PM",
        title: "Guest Arrival & Cocktails",
        description: "Welcome drinks and light refreshments in the garden",
        sortOrder: 0,
      },
      {
        weddingId: invitation1.id,
        time: "2:00 PM",
        title: "Ceremony",
        description:
          "The beautiful exchange of vows in our specially decorated ceremony space",
        sortOrder: 1,
      },
      {
        weddingId: invitation1.id,
        time: "3:00 PM",
        title: "Reception & Dinner",
        description: "Celebrate with us as we share a delicious meal and dance the night away",
        sortOrder: 2,
      },
      {
        weddingId: invitation1.id,
        time: "5:30 PM",
        title: "Cake Cutting",
        description: "Join us for the ceremonial cutting of our wedding cake",
        sortOrder: 3,
      },
      {
        weddingId: invitation1.id,
        time: "6:00 PM",
        title: "Dance & Celebration",
        description: "Let's dance and celebrate love with our favorite music and entertainment",
        sortOrder: 4,
      },
    ];

    for (const item of programItems1) {
      await prisma.programItem.create({ data: item });
    }

    // Create Venue Details 1
    await prisma.venueDetail.upsert({
      where: { weddingId: invitation1.id },
      update: {},
      create: {
        weddingId: invitation1.id,
        name: "Nairobi Serena Hotel",
        address: "Kenyatta Avenue, Nairobi, Kenya",
        googleMapsLink: "https://maps.google.com/?q=Nairobi+Serena+Hotel",
        eventTime: "2:00 PM - Late",
        dressCode: "Black Tie Optional",
      },
    });

    console.log("✅ Wedding Invitation 1 created with full card design");

    // ============================================================
    // 3. CREATE WEDDING INVITATION 2 - MODERN MINIMAL THEME
    // ============================================================
    console.log("\n💌 Creating wedding invitation 2 - Modern Minimal Theme...");

    const invitation2 = await prisma.weddingInvitation.upsert({
      where: { id: "card-design-002" },
      update: {},
      create: {
        id: "card-design-002",
        bookingId: booking2.id,
        brideName: "Zainab",
        groomName: "Omar",
        slug: "zainab-and-omar-modern",
        weddingDate: new Date("2026-10-15T16:00:00+03:00"),
        weddingTime: "4:00 PM",
        venueName: "Villa Rosa Kempinski",
        venueAddress: "Chiromo Lane, Nairobi, Kenya",
        dressCode: "Smart Casual Elegant",
        mapUrl: "https://maps.google.com/?q=Villa+Rosa+Kempinski+Nairobi",
        welcomeMessage:
          "With grateful hearts, we invite you to share in our celebration of love and unity.",
        story:
          "Zainab and Omar's love story is one of perfect harmony. They met at university during a community volunteer program, both dedicated to making a difference. Through shared values, countless adventures, and unwavering support for each other's dreams, they've discovered that true love means finding someone who believes in your vision as much as you do. Today, as they unite before family and friends, they celebrate not just their love, but also the values that brought them together.",
        heroImageUrl: "/images/card-designs/zainab-omar-hero.jpg",
        coverImage: "/images/card-designs/zainab-omar-cover.jpg",
        galleryImages: [
          "/images/card-designs/zainab-omar-1.jpg",
          "/images/card-designs/zainab-omar-2.jpg",
          "/images/card-designs/zainab-omar-3.jpg",
          "/images/card-designs/zainab-omar-4.jpg",
        ],
        templateKey: "MODERN_MINIMAL",
        theme: "MODERN_MINIMAL",
        primaryColor: "#2C3E50", // Dark Blue
        secondaryColor: "#ECF0F1", // Light Gray
        themeColor: "#FFFFFF", // White
        customMessage:
          "We look forward to celebrating with you. Please confirm your attendance by September 30th.",
        floralTopLeft: null,
        floralTopRight: null,
        floralBottomLeft: null,
        floralBottomRight: null,
        status: "PUBLISHED",
        allowRSVP: true,
        allowGiftRegistry: true,
        isPublished: true,
        publishedAt: new Date("2026-05-16T14:30:00+03:00"),
        pdfUrl: "/pdfs/invitations/zainab-and-omar.pdf",
      },
    });

    // Create Invitation Message 2
    await prisma.invitationMessage.upsert({
      where: { weddingId: invitation2.id },
      update: {},
      create: {
        weddingId: invitation2.id,
        preline: "Two hearts become one",
        message:
          "Join us as we celebrate the union of Zainab and Omar. Together with our families and closest friends, we will mark this milestone with joy, laughter, and gratitude for all the love and support we've received.",
      },
    });

    // Create Love Story Entries 2
    const loveStories2 = [
      {
        weddingId: invitation2.id,
        year: "2017",
        title: "Service & Connection",
        description:
          "We met while volunteering at a community center in Nairobi. Both passionate about education and social impact, we connected immediately over our shared vision of making a difference in the world.",
        sortOrder: 0,
      },
      {
        weddingId: invitation2.id,
        year: "2019",
        title: "Journey Together",
        description:
          "Through years of supporting each other's professional growth and personal dreams, we realized we were building something beautiful - a partnership based on mutual respect, trust, and genuine friendship.",
        sortOrder: 1,
      },
      {
        weddingId: invitation2.id,
        year: "2022",
        title: "Life in Harmony",
        description:
          "We moved in together and began planning our future - talking about our values, our goals, and the life we wanted to create together. Every conversation brought us closer.",
        sortOrder: 2,
      },
      {
        weddingId: invitation2.id,
        year: "2025",
        title: "A Promise Forever",
        description:
          "After years of growing together, Omar asked Zainab to be his forever partner in the most beautiful and unexpected way. Surrounded by the people who matter most, he asked, and she said yes with all her heart.",
        sortOrder: 3,
      },
    ];

    for (const story of loveStories2) {
      await prisma.loveStory.create({ data: story });
    }

    // Create Program Items 2
    const programItems2 = [
      {
        weddingId: invitation2.id,
        time: "3:00 PM",
        title: "Pre-Ceremony Gathering",
        description: "Refreshments and mingling as guests arrive",
        sortOrder: 0,
      },
      {
        weddingId: invitation2.id,
        time: "4:00 PM",
        title: "Ceremony Begins",
        description:
          "The exchange of vows and rings, blending modern elegance with meaningful traditions",
        sortOrder: 1,
      },
      {
        weddingId: invitation2.id,
        time: "5:00 PM",
        title: "Reception",
        description:
          "Celebrate with us in a sophisticated setting with fine dining and entertainment",
        sortOrder: 2,
      },
      {
        weddingId: invitation2.id,
        time: "7:00 PM",
        title: "Toasts & Moments",
        description:
          "Hear from the people who know us best as they share their wishes and blessings",
        sortOrder: 3,
      },
      {
        weddingId: invitation2.id,
        time: "8:00 PM",
        title: "Dancing & Festivities",
        description: "Join us for an evening of music, dancing, and joyful celebration",
        sortOrder: 4,
      },
    ];

    for (const item of programItems2) {
      await prisma.programItem.create({ data: item });
    }

    // Create Venue Details 2
    await prisma.venueDetail.upsert({
      where: { weddingId: invitation2.id },
      update: {},
      create: {
        weddingId: invitation2.id,
        name: "Villa Rosa Kempinski",
        address: "Chiromo Lane, Nairobi, Kenya",
        googleMapsLink: "https://maps.google.com/?q=Villa+Rosa+Kempinski+Nairobi",
        eventTime: "4:00 PM - 11:00 PM",
        dressCode: "Smart Casual Elegant",
      },
    });

    console.log("✅ Wedding Invitation 2 created with full card design");

    // ============================================================
    // 4. CREATE SAMPLE RSVPs
    // ============================================================
    console.log("\n📋 Creating sample RSVPs...");

    const rsvps = [
      // For Invitation 1
      {
        invitationId: invitation1.id,
        guestName: "Michael & Catherine Smith",
        guestPhone: "+254 712 500 001",
        attendance: "ATTENDING" as const,
        message:
          "So excited to celebrate this beautiful union! See you soon!",
      },
      {
        invitationId: invitation1.id,
        guestName: "Robert Wilson",
        guestPhone: "+254 723 500 002",
        attendance: "ATTENDING" as const,
        message: null,
      },
      {
        invitationId: invitation1.id,
        guestName: "Priya & Ravi Patel",
        guestPhone: "+254 734 500 003",
        attendance: "MAYBE" as const,
        message: "Will confirm once we finalize our travel plans.",
      },
      {
        invitationId: invitation1.id,
        guestName: "David & Lisa Brown",
        guestPhone: "+254 745 500 004",
        attendance: "ATTENDING" as const,
        message: "Wouldn't miss it for the world!",
      },

      // For Invitation 2
      {
        invitationId: invitation2.id,
        guestName: "Fatima Hassan",
        guestPhone: "+254 712 600 001",
        attendance: "ATTENDING" as const,
        message: "Looking forward to celebrating with you both!",
      },
      {
        invitationId: invitation2.id,
        guestName: "Ibrahim Ahmed",
        guestPhone: "+254 723 600 002",
        attendance: "ATTENDING" as const,
        message: null,
      },
      {
        invitationId: invitation2.id,
        guestName: "Sarah & Marcus Johnson",
        guestPhone: "+254 734 600 003",
        attendance: "ATTENDING" as const,
        message: "This is going to be amazing!",
      },
      {
        invitationId: invitation2.id,
        guestName: "Amira Khalil",
        guestPhone: "+254 745 600 004",
        attendance: "NOT_ATTENDING" as const,
        message: "Congratulations! We wish we could be there to celebrate with you.",
      },
    ];

    for (const rsvp of rsvps) {
      await prisma.rSVP.create({ data: rsvp });
    }

    console.log("✅ RSVPs created:", rsvps.length);

    // ============================================================
    // 5. CREATE SAMPLE GIFT REGISTRY
    // ============================================================
    console.log("\n🎁 Creating gift registry...");

    const gifts = [
      // For Invitation 1
      {
        invitationId: invitation1.id,
        giftName: "Premium Coffee Machine",
        description:
          "High-end espresso machine for the coffee-loving couple",
        imageUrl: "/images/gifts/coffee-machine.jpg",
        priority: 1,
        priorityLabel: "HIGH" as const,
        isReserved: true,
        reservedBy: "Michael & Catherine Smith",
        reservedMessage: "We'd love to get this for you!",
      },
      {
        invitationId: invitation1.id,
        giftName: "Luxury Bedding Set",
        description:
          "Egyptian cotton 1000 thread count luxury bedding - for sweet dreams",
        imageUrl: "/images/gifts/luxury-bedding.jpg",
        priority: 1,
        priorityLabel: "HIGH" as const,
        isReserved: false,
        reservedBy: null,
        reservedMessage: null,
      },
      {
        invitationId: invitation1.id,
        giftName: "Honeymoon Fund",
        description:
          "Help us create unforgettable memories on our romantic getaway",
        imageUrl: "/images/gifts/honeymoon.jpg",
        priority: 1,
        priorityLabel: "HIGH" as const,
        isReserved: false,
        reservedBy: null,
        reservedMessage: null,
      },
      {
        invitationId: invitation1.id,
        giftName: "Designer Cookware Set",
        description:
          "Professional-grade stainless steel cookware for gourmet cooking",
        imageUrl: "/images/gifts/cookware-set.jpg",
        priority: 2,
        priorityLabel: "MEDIUM" as const,
        isReserved: false,
        reservedBy: null,
        reservedMessage: null,
      },
      {
        invitationId: invitation1.id,
        giftName: "Smart Home Package",
        description: "Complete smart home system with security and automation",
        imageUrl: "/images/gifts/smart-home.jpg",
        priority: 2,
        priorityLabel: "MEDIUM" as const,
        isReserved: false,
        reservedBy: null,
        reservedMessage: null,
      },

      // For Invitation 2
      {
        invitationId: invitation2.id,
        giftName: "Art Collection",
        description:
          "Beautiful modern art pieces to enhance your living space",
        imageUrl: "/images/gifts/art-collection.jpg",
        priority: 1,
        priorityLabel: "HIGH" as const,
        isReserved: true,
        reservedBy: "Fatima Hassan",
        reservedMessage: "A beautiful gift for beautiful people!",
      },
      {
        invitationId: invitation2.id,
        giftName: "Luxury Travel Experience",
        description:
          "An all-expenses-paid weekend getaway to a destination of their choice",
        imageUrl: "/images/gifts/travel-experience.jpg",
        priority: 1,
        priorityLabel: "HIGH" as const,
        isReserved: false,
        reservedBy: null,
        reservedMessage: null,
      },
      {
        invitationId: invitation2.id,
        giftName: "Home Spa Package",
        description:
          "Complete at-home spa system with massage chair and accessories",
        imageUrl: "/images/gifts/spa-package.jpg",
        priority: 2,
        priorityLabel: "MEDIUM" as const,
        isReserved: false,
        reservedBy: null,
        reservedMessage: null,
      },
      {
        invitationId: invitation2.id,
        giftName: "Wine Collection",
        description:
          "Curated selection of premium wines from around the world",
        imageUrl: "/images/gifts/wine-collection.jpg",
        priority: 2,
        priorityLabel: "MEDIUM" as const,
        isReserved: false,
        reservedBy: null,
        reservedMessage: null,
      },
    ];

    for (const gift of gifts) {
      await prisma.giftRegistry.create({ data: gift });
    }

    console.log("✅ Gift registry created:", gifts.length);

    // ============================================================
    // 6. CREATE SAMPLE GIFT RESERVATIONS
    // ============================================================
    console.log("\n🔖 Creating gift reservations...");

    const giftReservations = [
      {
        invitationId: invitation1.id,
        giftId: "", // Will be filled after gift creation
        reservedBy: "Michael & Catherine Smith",
        reservedMessage: "We'd love to get this for you!",
      },
      {
        invitationId: invitation2.id,
        giftId: "", // Will be filled after gift creation
        reservedBy: "Fatima Hassan",
        reservedMessage: "A beautiful gift for beautiful people!",
      },
    ];

    console.log("✅ Gift reservations setup complete");

    // ============================================================
    // FINAL SUMMARY
    // ============================================================
    console.log("\n" + "=".repeat(60));
    console.log("✅ CARD DESIGN SAMPLE DATA SEEDING COMPLETE!");
    console.log("=".repeat(60));

    console.log("\n📊 Summary of data created:");
    console.log("  ✓ 2 Complete Bookings");
    console.log("  ✓ 2 Wedding Invitations with full card designs");
    console.log("  ✓ 2 Invitation Messages");
    console.log("  ✓ 8 Love Story entries (4 per invitation)");
    console.log("  ✓ 10 Program Items (5 per invitation)");
    console.log("  ✓ 2 Venue Details");
    console.log("  ✓ 8 RSVPs with messages");
    console.log("  ✓ 9 Gift Registry items");

    console.log("\n🎨 Card Design Details:");
    console.log("\nInvitation 1 - LUXURY_WHITE Theme");
    console.log(`  • Couple: ${invitation1.brideName} & ${invitation1.groomName}`);
    console.log(`  • Theme: LUXURY_WHITE`);
    console.log(`  • Primary Color: #D4AF37 (Gold)`);
    console.log(`  • Secondary Color: #F5F5DC (Beige)`);
    console.log(`  • Date: ${invitation1.weddingDate.toDateString()}`);
    console.log(`  • Slug: ${invitation1.slug}`);

    console.log("\nInvitation 2 - MODERN_MINIMAL Theme");
    console.log(`  • Couple: ${invitation2.brideName} & ${invitation2.groomName}`);
    console.log(`  • Theme: MODERN_MINIMAL`);
    console.log(`  • Primary Color: #2C3E50 (Dark Blue)`);
    console.log(`  • Secondary Color: #ECF0F1 (Light Gray)`);
    console.log(`  • Date: ${invitation2.weddingDate.toDateString()}`);
    console.log(`  • Slug: ${invitation2.slug}`);

    console.log("\n🌐 View your card designs:");
    console.log(`  • Card 1: http://localhost:3000/invite/emma-and-james-luxury`);
    console.log(`  • Card 2: http://localhost:3000/invite/zainab-and-omar-modern`);

    console.log("\n💼 Admin Dashboard:");
    console.log(`  • Manage designs in: /admin/card-design`);
    console.log(`  • Bookings: /admin/bookings`);

    console.log("\n✨ Data ready for card design testing and demonstration!\n");
  } catch (error) {
    console.error("❌ Error seeding card designs:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedCardDesigns().catch((e) => {
  console.error(e);
  process.exit(1);
});
