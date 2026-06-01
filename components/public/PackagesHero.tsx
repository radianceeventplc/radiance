"use client";

import { useLanguage } from "@/lib/languageContext";
import { t } from "@/lib/translations";

export function PackagesHero() {
  const { lang } = useLanguage();
  const tr = t[lang].packages;

  return (
    <section className="pt-36 pb-16 md:pt-44 md:pb-20">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-12 items-end">
          <div>
            <p className="pkg-eyebrow">{tr.heroEyebrow}</p>
            <h1 className="pkg-title">
              {tr.heroHeading}
            </h1>
          </div>
          <p className="pkg-lead">{tr.heroLead}</p>
        </div>
      </div>
    </section>
  );
}
