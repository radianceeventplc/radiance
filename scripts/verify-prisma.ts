import "dotenv/config";
import { prisma } from "../lib/prisma.js";

async function main() {
  try {
    // Simple read query to verify connection
    const userCount = await prisma.user.count();
    console.log("✅ Connected to database");
    console.log(`📊 Found ${userCount} users in database`);
  } catch (error) {
    console.error("❌ Database connection failed:");
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();