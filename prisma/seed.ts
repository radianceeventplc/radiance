import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create a sample admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: "$2b$10$example.hash.here", // This would be a proper bcrypt hash
      name: "Admin User",
      role: "admin",
    },
  });

  console.log("✅ Admin user created:", admin);

  // Create a sample booking
  const booking = await prisma.booking.upsert({
    where: { id: "sample-booking-1" },
    update: {},
    create: {
      id: "sample-booking-1",
      clientName: "John Doe",
      clientEmail: "john@example.com",
      clientPhone: "+1234567890",
      eventType: "WEDDING",
      eventDate: new Date("2026-06-15T10:00:00Z"),
      location: "Sample Venue",
      guestCount: 100,
      budgetRange: "RANGE_100K_200K",
      notes: "Sample wedding booking",
      status: "NEW_REQUEST",
    },
  });

  console.log("✅ Sample booking created:", booking);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });