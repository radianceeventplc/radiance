"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { GalleryImageDto, formatGalleryCategory } from "@/lib/gallery";
import { Lightbox } from "@/components/public/Lightbox";

export function GalleryGrid({ images }: { images: GalleryImageDto[] }) {
  const [selected, setSelected] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <div
          className="flex min-h-72 flex-col items-center justify-center px-6 text-center"
          style={{
            border: "1px solid rgba(24,40,73,0.12)",
            backgroundColor: "rgba(255,255,255,0.55)",
          }}
        >
          <ImageIcon className="h-10 w-10" style={{ color: "rgba(24,40,73,0.35)" }} />
          <h2
            className="mt-5"
            style={{
              fontFamily: "'Kostic Serif', Georgia, serif",
              fontSize: 28,
              fontWeight: 700,
              color: "#182849",
            }}
          >
            No images yet
          </h2>
          <p
            className="mt-2 max-w-md"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 13,
              lineHeight: 1.6,
              color: "rgba(24,40,73,0.6)",
            }}
          >
            Gallery images uploaded from the admin dashboard will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .gg-mosaic {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 240px;
          gap: 4px;
          width: 100%;
        }
        /* Alternate big tiles: odd modules on the left, even modules on the right */
        .gg-mosaic > .gg-cell:nth-child(10n + 1) {
          grid-column: 1 / span 2;
          grid-row: span 2;
        }
        .gg-mosaic > .gg-cell:nth-child(10n + 6) {
          grid-column: 3 / span 2;
          grid-row: span 2;
        }
        @media (max-width: 1024px) {
          .gg-mosaic { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 200px; }
          .gg-mosaic > .gg-cell:nth-child(10n + 1),
          .gg-mosaic > .gg-cell:nth-child(10n + 6) {
            grid-column: 1 / span 2;
            grid-row: span 2;
          }
        }
        @media (max-width: 640px) {
          .gg-mosaic { grid-template-columns: 1fr; grid-auto-rows: 220px; }
          .gg-mosaic > .gg-cell:nth-child(10n + 1),
          .gg-mosaic > .gg-cell:nth-child(10n + 6) {
            grid-column: 1;
            grid-row: span 1;
          }
        }

        .gg-cell {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          background: #1e3460;
          border: none;
          padding: 0;
          width: 100%;
          height: 100%;
        }
        .gg-cell :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1);
        }
        .gg-cell:hover :global(img) { transform: scale(1.05); }

        .gg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(24, 40, 73, 0.88) 0%, rgba(24, 40, 73, 0.25) 55%, transparent 80%);
          display: flex;
          align-items: flex-end;
          padding: 1.5rem;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .gg-cell:hover .gg-overlay,
        .gg-cell:focus-visible .gg-overlay { opacity: 1; }

        .gg-cap-wrap { width: 100%; }
        .gg-cat {
          font-family: "Montserrat", sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #bf8f38;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .gg-cat::before {
          content: "";
          display: block;
          width: 20px;
          height: 1px;
          background: #bf8f38;
        }
        .gg-title {
          font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          margin: 0;
        }
        .gg-ba {
          margin-top: 6px;
          font-family: "Montserrat", sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.85);
          font-style: italic;
        }
      `}</style>

      <div className="gg-mosaic">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className="gg-cell"
            onClick={() => setSelected(index)}
          >
            <Image
              src={image.imageUrl}
              alt={image.title}
              fill
              sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
            />
            <div className="gg-overlay">
              <div className="gg-cap-wrap">
                <div className="gg-cat">{formatGalleryCategory(image.category)}</div>
                <h3 className="gg-title">{image.title}</h3>
                {image.isBeforeAfter && <p className="gg-ba">Before / After</p>}
              </div>
            </div>
          </button>
        ))}
      </div>

      {selected !== null && (
        <Lightbox
          images={images}
          selected={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
