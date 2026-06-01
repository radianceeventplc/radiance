"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useLanguage } from "@/lib/languageContext";
import { t } from "@/lib/translations";

interface PackageItem {
  id: string;
  name: string;
  nameAm: string | null;
  shortDesc: string | null;
  shortDescAm: string | null;
  priceLabel: string | null;
  imageUrl: string | null;
  isPopular: boolean;
  category: { name: string; nameAm: string | null };
}

interface Props {
  packages: PackageItem[];
}

export function FeaturedPackagesClient({ packages }: Props) {
  const { lang } = useLanguage();
  const tr = t[lang].featuredPackages;

  return (
    <Section className="bg-radiance-cream/40">
      <Container>
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-radiance-navy/60">
              {tr.eyebrow}
            </p>
            <h2 className="text-3xl font-light tracking-tight text-radiance-navy md:text-4xl">
              {tr.heading}
            </h2>
          </div>
          <Link
            href="/packages"
            className="text-sm font-semibold text-amber-700 hover:text-amber-600"
          >
            {tr.viewAll}
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((item) => (
            <Link
              key={item.id}
              href="/packages"
              className="group overflow-hidden rounded-lg border border-radiance-navy/10 bg-white shadow-sm transition hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] bg-white">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-radiance-navy/35">
                    <Star className="h-10 w-10" />
                  </div>
                )}
                {item.isPopular && (
                  <span className="absolute left-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
                    {tr.mostPopular}
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-radiance-navy/50">
                  {(lang === "am" && item.category.nameAm) || item.category.name}
                </div>
                <h3 className="mt-2 text-xl font-semibold text-radiance-navy">
                  {(lang === "am" && item.nameAm) || item.name}
                </h3>
                <p className="mt-2 font-semibold text-amber-700">{item.priceLabel}</p>
                <p className="mt-3 text-sm leading-6 text-radiance-navy/65">
                  {(lang === "am" && item.shortDescAm) || item.shortDesc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
