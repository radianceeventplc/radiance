"use client";

import { useEffect, useState } from "react";
import {
  GalleryCategoryFilter,
  GalleryImageDto,
  formatGalleryCategory,
  galleryCategories,
} from "@/lib/gallery";
import { GalleryGrid } from "@/components/public/GalleryGrid";

type GalleryResponse = {
  success: boolean;
  data?: GalleryImageDto[];
  error?: string;
};

const tabCategories = galleryCategories.filter(
  (c) => c !== "ALL"
) as Exclude<GalleryCategoryFilter, "ALL">[];

export function GalleryClient() {
  const [images, setImages] = useState<GalleryImageDto[]>([]);
  const [active, setActive] = useState<Exclude<GalleryCategoryFilter, "ALL">>(
    tabCategories[0]
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(`/api/gallery?category=${active}`, { signal: controller.signal })
      .then((response) => response.json() as Promise<GalleryResponse>)
      .then((payload) => {
        if (!payload.success) {
          throw new Error(payload.error || "Failed to fetch gallery");
        }
        setImages(payload.data ?? []);
      })
      .catch((fetchError: Error) => {
        if (fetchError.name === "AbortError") return;
        setError(fetchError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [active]);

  function selectCategory(category: Exclude<GalleryCategoryFilter, "ALL">) {
    setActive(category);
    setError("");
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#f9f4ed" }}>
      <style>{`
        .gal-eyebrow {
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
        .gal-eyebrow::before {
          content: "";
          display: block;
          width: 30px;
          height: 1px;
          background: #bf8f38;
        }
        .gal-title {
          font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
          font-size: clamp(40px, 5vw, 68px);
          font-weight: 700;
          line-height: 1.08;
          color: #182849;
        }
        .gal-title em { font-style: italic; color: #bf8f38; }
        .gal-lead {
          font-family: "Montserrat", sans-serif;
          font-size: 16px;
          font-weight: 300;
          line-height: 1.85;
          color: rgba(24, 40, 73, 0.7);
          max-width: 640px;
        }

        .gal-tabs {
          display: flex;
          gap: 0;
          border-bottom: 2px solid rgba(24, 40, 73, 0.12);
          flex-wrap: wrap;
        }
        .gal-tab {
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
        }
        .gal-tab::after {
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
        .gal-tab:hover { opacity: 0.85; }
        .gal-tab.active { opacity: 1; }
        .gal-tab.active::after { transform: scaleX(1); }
        @media (max-width: 768px) {
          .gal-tabs { overflow-x: auto; flex-wrap: nowrap; }
          .gal-tab { padding: 14px 18px; font-size: 11px; letter-spacing: 0.14em; white-space: nowrap; }
        }
      `}</style>

      <section className="pt-36 pb-12 md:pt-44 md:pb-16">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-12 items-end">
            <div>
              <p className="gal-eyebrow">Portfolio</p>
              <h1 className="gal-title">
                Curated Moments,<br />
                <em>Crafted With Care</em>
              </h1>
            </div>
            <p className="gal-lead">
              A curated archive of celebrations designed with texture, timing,
              and a clear sense of occasion. A glimpse into the worlds we&apos;ve
              crafted for our clients.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="gal-tabs">
            {tabCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => selectCategory(category)}
                className={`gal-tab ${active === category ? "active" : ""}`}
              >
                {formatGalleryCategory(category)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-32 pt-12 md:pt-14">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12">
          {error && (
            <p
              className="text-center text-sm font-medium"
              style={{ color: "#a02828", fontFamily: "'Montserrat', sans-serif" }}
            >
              {error}
            </p>
          )}

          {loading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridAutoRows: "240px",
                gap: "4px",
              }}
            >
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse"
                  style={{
                    backgroundColor: "rgba(24,40,73,0.08)",
                    gridColumn: index === 0 ? "1 / span 2" : index === 5 ? "3 / span 2" : undefined,
                    gridRow: index === 0 || index === 5 ? "span 2" : undefined,
                  }}
                />
              ))}
            </div>
          ) : (
            <GalleryGrid images={images} />
          )}
        </div>
      </section>
    </main>
  );
}
