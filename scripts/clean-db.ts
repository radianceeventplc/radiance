import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function clean() {
  console.log("🧹 Cleaning database...");

  // Delete in reverse dependency order
  await prisma.proposalComment.deleteMany();
  await prisma.proposalContract.deleteMany();
  await prisma.proposalSection.deleteMany();
  await prisma.proposalItem.deleteMany();
  await prisma.proposal.deleteMany();
  await prisma.proposalTemplate.deleteMany();
  await prisma.giftReservation.deleteMany();
  await prisma.giftRegistry.deleteMany();
  await prisma.rSVP.deleteMany();
  await prisma.weddingInvitation.deleteMany();
  await prisma.package.deleteMany();
  await prisma.packageCategory.deleteMany();
  await prisma.designAsset.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.message.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.user.deleteMany();
  console.log("✅ Database cleaned!");
  await prisma.$disconnect();
}

clean();