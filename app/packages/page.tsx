import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PackageExplorer } from "@/components/public/PackageExplorer";
import { PackagesHero } from "@/components/public/PackagesHero";
import { prisma } from "@/lib/prisma";
import { PackageCategoryRecord, PackageRecord } from "@/types";

export const metadata: Metadata = {
  title: "Our Event Packages | Radiance",
  description: "Flexible Radiance event packages tailored to your celebration.",
};

export const dynamic = "force-dynamic";

export default async function PackagesPage() {
  const [categories, packages] = await Promise.all([
    prisma.packageCategory.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { packages: { where: { isActive: true } } },
        },
      },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    }),
    prisma.package.findMany({
      where: { isActive: true, category: { isActive: true } },
      include: { category: true },
      orderBy: [
        { isPopular: "desc" },
        { sortOrder: "asc" },
        { createdAt: "desc" },
      ],
    }),
  ]);

  return (
    <>
      <Header topVariant="light" />
      <main className="min-h-screen" style={{ backgroundColor: "#f9f4ed" }}>
        <style>{`
          .pkg-eyebrow {
            font-family: "Montserrat", sans-serif;
            font-size: 11px;
            font-weight: 500;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #bf8f38;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
          }
          .pkg-eyebrow::before {
            content: "";
            display: block;
            width: 30px;
            height: 1px;
            background: #bf8f38;
          }
          .pkg-title {
            font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
            font-size: clamp(40px, 5vw, 68px);
            font-weight: 700;
            line-height: 1.08;
            color: #182849;
          }
          .pkg-title em { font-style: italic; color: #bf8f38; }
          .pkg-lead {
            font-family: "Montserrat", sans-serif;
            font-size: 16px;
            font-weight: 300;
            line-height: 1.85;
            color: rgba(24, 40, 73, 0.7);
            max-width: 640px;
          }
        `}</style>

        {/* Hero */}
        <PackagesHero />

        {/* Packages grid */}
        <section className="pb-32">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12">
            <PackageExplorer
              categories={JSON.parse(JSON.stringify(categories)) as PackageCategoryRecord[]}
              packages={JSON.parse(JSON.stringify(packages)) as PackageRecord[]}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
