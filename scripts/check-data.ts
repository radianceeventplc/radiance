import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function check() {
  const counts = {
    users: await prisma.user.count(),
    bookings: await prisma.booking.count(),
    messages: await prisma.message.count(),
    galleryImages: await prisma.galleryImage.count(),
    packages: await prisma.package.count(),
    packageCategories: await prisma.packageCategory.count(),
    weddingInvitations: await prisma.weddingInvitation.count(),
    rsvps: await prisma.rSVP.count(),
    giftRegistries: await prisma.giftRegistry.count(),
    giftReservations: await prisma.giftReservation.count(),
    designAssets: await prisma.designAsset.count(),
    proposals: await prisma.proposal.count(),
    proposalItems: await prisma.proposalItem.count(),
    proposalSections: await prisma.proposalSection.count(),
    proposalContracts: await prisma.proposalContract.count(),
    proposalComments: await prisma.proposalComment.count(),
    proposalTemplates: await prisma.proposalTemplate.count(),
  };
  console.log(JSON.stringify(counts, null, 2));
  await prisma.$disconnect();
}

check();
