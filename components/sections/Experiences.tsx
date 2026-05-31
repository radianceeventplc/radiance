"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  category: string;
  isFeatured: boolean;
  sortOrder: number;
}

export function Experiences() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchGallery = useCallback(() => {
    setLoading(true);
    setError("");
    fetch("/api/gallery")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (json.success) {
          setImages(json.data);
        } else {
          setError("Failed to load gallery");
        }
      })
      .catch(() => setError("Failed to load gallery"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(images.length / itemsPerPage));

  const resetAutoTimer = useCallback(() => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (images.length > itemsPerPage) {
      autoTimerRef.current = setTimeout(() => {
        setPage((prev) => (prev + 1) % totalPages);
      }, 6000);
    }
  }, [images.length, totalPages]);

  useEffect(() => {
    resetAutoTimer();
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    };
  }, [page, resetAutoTimer]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vis");
          }
        });
      },
      { threshold: 0.1 }
    );

    const els = sectionRef.current?.querySelectorAll(".g-reveal");
    els?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const featured = images.filter((img) => img.isFeatured);
  const displayItems =
    featured.length > 0
      ? featured.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((img) => ({
          id: img.id,
          label: img.title,
          category: img.category
            .split("_")
            .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
            .join(" "),
          imageUrl: img.imageUrl,
        }))
      : images.length > 0
      ? images.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((img) => ({
          id: img.id,
          label: img.title,
          category: img.category
            .split("_")
            .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
            .join(" "),
          imageUrl: img.imageUrl,
        }))
      : [
          { id: "1", label: "Wedding Celebrations", category: "Weddings", imageUrl: "" },
          { id: "2", label: "Corporate Events", category: "Corporate", imageUrl: "" },
          { id: "3", label: "Event Styling", category: "Décor & Styling", imageUrl: "" },
          { id: "4", label: "Social Events", category: "Social Celebrations", imageUrl: "" },
          { id: "5", label: "Destination Weddings", category: "Destination", imageUrl: "" },
        ];

  return (
    <section
      id="gallery"
      ref={sectionRef}
      style={{
        backgroundColor: "#182849",
        padding: "clamp(60px, 10vh, 100px) 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <style>{`
        .gal-container {
          margin: 0 auto;
          width: 100%;
          max-width: 1440px;
          padding: 0 24px;
        }

        @media (min-width: 640px) { .gal-container { padding: 0 24px; } }
        @media (min-width: 1024px) { .gal-container { padding: 0 32px; } }
        @media (min-width: 1280px) { .gal-container { padding: 0 48px; } }

        .gal-header {
          margin-bottom: 3rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s, transform 0.6s;
        }

        .gal-header.vis { opacity: 1; transform: translateY(0); }

        .gal-label {
          font-family: "Montserrat", sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #bf8f38;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .gal-label::before {
          content: "";
          display: block;
          width: 30px;
          height: 1px;
          background: #bf8f38;
        }

        .gal-title {
          font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
          font-size: clamp(36px, 4.2vw, 54px);
          font-weight: 700;
          line-height: 1.12;
          color: #ffffff;
          margin-bottom: 16px;
        }

        .gal-title em {
          font-style: italic;
          color: #bf8f38;
        }

        .gal-sub {
          font-family: "Montserrat", sans-serif;
          font-size: 15px;
          font-weight: 300;
          line-height: 1.85;
          color: rgba(255, 255, 255, 0.55);
          max-width: 520px;
        }

        .gal-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 220px;
          gap: 4px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s, transform 0.6s;
        }

        .gal-grid.vis { opacity: 1; transform: translateY(0); }

        .gi {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          background: #1e3460;
        }

        .gi:first-child {
          grid-column: span 2;
          grid-row: span 2;
        }

        .gi img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .gi-fill {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background: linear-gradient(135deg, #1e3460, #182849);
        }

        .gi-fill .gi-icon {
          font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
          font-size: 1.8rem;
          color: rgba(191, 143, 56, 0.25);
        }

        .gi-fill span {
          font-family: "Montserrat", sans-serif;
          font-size: 0.63rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
        }

        .gi-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(24, 40, 73, 0.85), transparent);
          display: flex;
          align-items: flex-end;
          padding: 1.5rem;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .gi:hover .gi-overlay { opacity: 1; }

        .gi-overlay span {
          font-family: "Montserrat", sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #e8d5af;
        }

        .gal-error {
          text-align: center;
          padding: 4rem 2rem;
          font-family: "Montserrat", sans-serif;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.4);
          grid-column: 1 / -1;
        }

        @media (max-width: 1024px) {
          .gal-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 180px; }
          .gi:first-child { grid-column: span 2; }
        }

        @media (max-width: 640px) {
          .gal-grid { grid-template-columns: 1fr; grid-auto-rows: 160px; }
          .gi:first-child { grid-column: span 1; grid-row: span 1; }
        }
      `}</style>

      <div className="gal-container">
        <div className="gal-header g-reveal">
          <p className="gal-label">Our Work</p>
          <h2 className="gal-title">Portfolio & <em>Gallery</em></h2>
          <p className="gal-sub">
            A glimpse into the beautiful celebrations we have had the privilege
            of bringing to life.
          </p>
        </div>
      </div>

      <div className="gal-grid g-reveal">
        {loading ? (
          <div className="gal-error">Loading gallery...</div>
        ) : error ? (
          <div className="gal-error">
            {error}
            <button
              onClick={fetchGallery}
              style={{
                display: "block",
                margin: "12px auto 0",
                padding: "8px 24px",
                background: "rgba(191, 143, 56, 0.15)",
                border: "1px solid rgba(191, 143, 56, 0.4)",
                color: "#bf8f38",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </div>
        ) : (
          displayItems.map((item) => (
            <div key={item.id} className="gi">
              {item.imageUrl ? (
                <>
                  <img src={item.imageUrl} alt={item.label} loading="lazy" />
                  <div className="gi-overlay">
                    <span>{item.label}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="gi-fill">
                    <div className="gi-icon">✦</div>
                    <span>{item.category}</span>
                  </div>
                  <div className="gi-overlay">
                    <span>{item.label}</span>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}