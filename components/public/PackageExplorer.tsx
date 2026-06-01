"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Sparkles, X } from "lucide-react";
import { PackageCategoryRecord, PackageRecord } from "@/types";
import { useLanguage } from "@/lib/languageContext";
import { t } from "@/lib/translations";

interface PackageExplorerProps {
  categories: PackageCategoryRecord[];
  packages: PackageRecord[];
}

export function PackageExplorer({ categories, packages }: PackageExplorerProps) {
  const { lang } = useLanguage();
  const tr = t[lang].packages;
  const [selectedPackage, setSelectedPackage] = useState<PackageRecord | null>(null);

  const tabCategories = useMemo(
    () => categories.filter((category) => category._count?.packages !== 0),
    [categories]
  );
  const [activeCategory, setActiveCategory] = useState<string>(
    tabCategories[0]?.slug ?? ""
  );

  const visiblePackages = useMemo(
    () => packages.filter((item) => item.category?.slug === activeCategory),
    [activeCategory, packages]
  );

  return (
    <>
      <style>{`
        .pe-tabs {
          display: flex;
          gap: 0;
          border-bottom: 2px solid rgba(24, 40, 73, 0.12);
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .pe-tab {
          position: relative;
          padding: 18px 28px;
          font-family: "Montserrat", sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #182849;
          background: none;
          border: none;
          cursor: pointer;
          opacity: 0.5;
          transition: opacity 0.3s ease;
          white-space: nowrap;
        }
        .pe-tab::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -2px;
          height: 3px;
          background: #bf8f38;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }
        .pe-tab:hover { opacity: 0.85; }
        .pe-tab.active { opacity: 1; }
        .pe-tab.active::after { transform: scaleX(1); }
        @media (max-width: 768px) {
          .pe-tabs { overflow-x: auto; flex-wrap: nowrap; }
          .pe-tab { padding: 14px 18px; font-size: 11px; letter-spacing: 0.14em; }
        }

        .pe-list {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .pe-card {
          position: relative;
          display: grid;
          grid-template-columns: 320px 1fr;
          background: #ffffff;
          border: 1px solid rgba(24, 40, 73, 0.1);
          overflow: hidden;
          transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease;
        }
        .pe-card:hover {
          border-color: rgba(191, 143, 56, 0.5);
          box-shadow: 0 24px 48px -24px rgba(24, 40, 73, 0.18);
          transform: translateY(-2px);
        }
        .pe-card.popular {
          border-color: #bf8f38;
          box-shadow: 0 24px 48px -24px rgba(191, 143, 56, 0.3);
        }
        @media (max-width: 900px) {
          .pe-card { grid-template-columns: 1fr; }
        }

        .pe-media {
          position: relative;
          background: #efe6d6;
          overflow: hidden;
          min-height: 240px;
        }
        @media (max-width: 900px) {
          .pe-media { aspect-ratio: 16 / 9; min-height: 0; }
        }
        .pe-media :global(img) {
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1);
        }
        .pe-card:hover .pe-media :global(img) { transform: scale(1.04); }
        .pe-empty {
          display: flex;
          height: 100%;
          align-items: center;
          justify-content: center;
          color: rgba(24, 40, 73, 0.35);
        }
        .pe-badge {
          position: absolute;
          left: 0;
          top: 18px;
          background: #bf8f38;
          color: #182849;
          padding: 7px 16px;
          font-family: "Montserrat", sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .pe-body {
          padding: 28px 32px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 28px;
          align-items: start;
        }
        @media (max-width: 1100px) {
          .pe-body { grid-template-columns: 1fr; gap: 24px; }
        }

        .pe-cat {
          font-family: "Montserrat", sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #bf8f38;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .pe-cat::before {
          content: "";
          display: block;
          width: 22px;
          height: 1px;
          background: #bf8f38;
        }

        .pe-name {
          font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
          font-size: 26px;
          font-weight: 700;
          color: #182849;
          line-height: 1.15;
          margin: 0 0 8px;
        }
        .pe-price {
          font-family: "Kostic Serif", Georgia, serif;
          font-size: 17px;
          font-style: italic;
          color: #bf8f38;
          margin-bottom: 14px;
        }
        .pe-desc {
          font-family: "Montserrat", sans-serif;
          font-size: 14px;
          line-height: 1.75;
          color: rgba(24, 40, 73, 0.7);
          font-weight: 300;
          margin-bottom: 18px;
        }
        .pe-features {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 18px;
        }
        @media (max-width: 600px) { .pe-features { grid-template-columns: 1fr; } }
        .pe-feature {
          font-family: "Montserrat", sans-serif;
          font-size: 13px;
          color: rgba(24, 40, 73, 0.8);
          display: flex;
          gap: 8px;
          align-items: flex-start;
        }
        .pe-feature :global(svg) { color: #bf8f38; margin-top: 3px; flex-shrink: 0; }

        .pe-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 180px;
          align-self: stretch;
          justify-content: center;
        }
        @media (max-width: 1100px) { .pe-actions { flex-direction: row; min-width: 0; } }
        @media (max-width: 480px) { .pe-actions { flex-direction: column; } .pe-actions > * { width: 100%; } }

        .pe-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 13px 22px;
          font-family: "Montserrat", sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.3s ease, color 0.3s ease;
          white-space: nowrap;
        }
        .pe-btn-outline {
          background: transparent;
          color: #182849;
          border: 1.5px solid #182849;
        }
        .pe-btn-outline:hover { background: #182849; color: #ffffff; }
        .pe-btn-primary {
          background: #bf8f38;
          color: #182849;
        }
        .pe-btn-primary:hover { background: #d4a85c; }

        .pe-empty-state {
          margin-top: 48px;
          border: 1px solid rgba(24, 40, 73, 0.12);
          background: #ffffff;
          padding: 56px 24px;
          text-align: center;
          font-family: "Montserrat", sans-serif;
          color: rgba(24, 40, 73, 0.65);
          font-size: 14px;
        }

        /* Modal */
        .pe-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 60;
          overflow-y: auto;
          background: rgba(13, 22, 45, 0.7);
          backdrop-filter: blur(6px);
          padding: 24px 16px;
        }
        .pe-modal {
          margin: 0 auto;
          max-width: 1000px;
          background: #ffffff;
          box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(191, 143, 56, 0.2);
        }
        .pe-modal-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 28px 32px;
          border-bottom: 1px solid rgba(24, 40, 73, 0.1);
        }
        .pe-modal-close {
          background: transparent;
          border: 1px solid rgba(24, 40, 73, 0.18);
          width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #182849;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .pe-modal-close:hover { background: #182849; color: #ffffff; }

        .pe-modal-body {
          display: grid;
          gap: 36px;
          padding: 32px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .pe-modal-body { grid-template-columns: 1.1fr 0.9fr; }
        }

        .pe-modal-image {
          position: relative;
          aspect-ratio: 4 / 3;
          background: #efe6d6;
          margin-bottom: 24px;
          overflow: hidden;
        }
        .pe-modal-image :global(img) { object-fit: cover; }
        .pe-modal-desc {
          font-family: "Montserrat", sans-serif;
          font-size: 14px;
          line-height: 1.8;
          color: rgba(24, 40, 73, 0.75);
          white-space: pre-wrap;
        }
        .pe-modal-section { margin-top: 8px; }
        .pe-modal-section-title {
          font-family: "Kostic Serif", Georgia, serif;
          font-size: 16px;
          font-weight: 700;
          color: #182849;
          margin-bottom: 14px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(191, 143, 56, 0.4);
        }
        .pe-modal-feature {
          font-family: "Montserrat", sans-serif;
          font-size: 13px;
          color: rgba(24, 40, 73, 0.8);
          display: flex;
          gap: 10px;
          align-items: flex-start;
          padding: 6px 0;
        }
        .pe-modal-feature :global(svg) { margin-top: 3px; flex-shrink: 0; }
        .pe-modal-feature.excl { color: rgba(24, 40, 73, 0.55); }
        .pe-modal-feature.excl :global(svg) { color: rgba(24, 40, 73, 0.35); }
        .pe-modal-feature.incl :global(svg) { color: #bf8f38; }

        .pe-modal-thumbs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-top: 24px;
        }
        .pe-modal-thumb {
          position: relative;
          aspect-ratio: 1 / 1;
          background: #efe6d6;
          overflow: hidden;
        }
        .pe-modal-thumb :global(img) { object-fit: cover; }
      `}</style>

      {/* Tabs */}
      <div className="pe-tabs">
        {tabCategories.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => setActiveCategory(category.slug)}
            className={`pe-tab ${activeCategory === category.slug ? "active" : ""}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="pe-list">
        {visiblePackages.map((item) => (
          <article key={item.id} className={`pe-card ${item.isPopular ? "popular" : ""}`}>
            <div className="pe-media">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="(min-width: 900px) 320px, 100vw"
                />
              ) : (
                <div className="pe-empty">
                  <Sparkles className="h-10 w-10" />
                </div>
              )}
              {item.isPopular && <div className="pe-badge">{tr.mostPopular}</div>}
            </div>

            <div className="pe-body">
              <div>
                <div className="pe-cat">
                  {(lang === "am" && item.category?.nameAm) || item.category?.name}
                </div>
                <h2 className="pe-name">
                  {(lang === "am" && item.nameAm) || item.name}
                </h2>
                <p className="pe-price">{item.priceLabel}</p>
                <p className="pe-desc">
                  {(lang === "am" && item.shortDescAm) || item.shortDesc}
                </p>

                <ul className="pe-features">
                  {item.features.slice(0, 6).map((feature) => (
                    <li key={feature} className="pe-feature">
                      <Check className="h-4 w-4" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pe-actions">
                <button
                  type="button"
                  onClick={() => setSelectedPackage(item)}
                  className="pe-btn pe-btn-outline"
                >
                  {tr.viewDetails}
                </button>
                <Link
                  href={`/book?package=${encodeURIComponent(item.name)}`}
                  className="pe-btn pe-btn-primary"
                >
                  {tr.bookNow}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {visiblePackages.length === 0 && (
        <div className="pe-empty-state">
          No active packages are available in this category yet.
        </div>
      )}

      {/* Detail modal */}
      {selectedPackage && (
        <div className="pe-modal-backdrop" onClick={() => setSelectedPackage(null)}>
          <div className="pe-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pe-modal-head">
              <div>
                <div className="pe-cat" style={{ marginBottom: 10 }}>
                  {(lang === "am" && selectedPackage.category?.nameAm) || selectedPackage.category?.name}
                </div>
                <h2 className="pe-name" style={{ fontSize: 32 }}>
                  {(lang === "am" && selectedPackage.nameAm) || selectedPackage.name}
                </h2>
                <p className="pe-price">{selectedPackage.priceLabel}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPackage(null)}
                className="pe-modal-close"
                aria-label={tr.close}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="pe-modal-body">
              <div>
                {selectedPackage.imageUrl && (
                  <div className="pe-modal-image">
                    <Image
                      src={selectedPackage.imageUrl}
                      alt={selectedPackage.name}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                )}
                <p className="pe-modal-desc">{selectedPackage.description}</p>
                {selectedPackage.galleryImages.length > 0 && (
                  <div className="pe-modal-thumbs">
                    {selectedPackage.galleryImages.map((imageUrl) => (
                      <div key={imageUrl} className="pe-modal-thumb">
                        <Image src={imageUrl} alt="" fill sizes="160px" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div className="pe-modal-section">
                  <h3 className="pe-modal-section-title">{tr.whatsIncluded}</h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {selectedPackage.features.map((feature) => (
                      <li key={feature} className="pe-modal-feature incl">
                        <Check className="h-4 w-4" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedPackage.exclusions.length > 0 && (
                  <div className="pe-modal-section" style={{ marginTop: 28 }}>
                    <h3 className="pe-modal-section-title">Not Included</h3>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {selectedPackage.exclusions.map((feature) => (
                        <li key={feature} className="pe-modal-feature excl">
                          <X className="h-4 w-4" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  href={`/book?package=${encodeURIComponent(selectedPackage.name)}`}
                  className="pe-btn pe-btn-primary"
                  style={{ width: "100%", marginTop: 32 }}
                >
                  {tr.bookNow}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
