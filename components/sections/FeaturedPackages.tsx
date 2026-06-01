import { prisma } from "@/lib/prisma";
import { FeaturedPackagesClient } from "./FeaturedPackagesClient";

export async function FeaturedPackages() {
  const packages = await prisma.package.findMany({
    where: { isActive: true, isFeatured: true, category: { isActive: true } },
    include: { category: true },
    orderBy: [{ isPopular: "desc" }, { sortOrder: "asc" }, { updatedAt: "desc" }],
    take: 3,
  });

  if (packages.length === 0) return null;

  return <FeaturedPackagesClient packages={packages} />;
}
