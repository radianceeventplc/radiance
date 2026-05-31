"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function WhoWeAre() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const el = containerRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipped((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#f9f4ed", padding: "clamp(60px, 10vh, 100px) 0" }}
    >
      <style>{`
        .wwa-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: stretch;
        }

        .wwa-eyebrow {
          font-family: "Montserrat", sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #bf8f38;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .wwa-eyebrow::before {
          content: "";
          display: block;
          width: 30px;
          height: 1px;
          background: #bf8f38;
        }

        .wwa-title {
          font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
          font-size: clamp(32px, 3.6vw, 48px);
          font-weight: 700;
          line-height: 1.12;
          color: #182849;
          margin-bottom: 16px;
        }

        .wwa-title em {
          font-style: italic;
          color: #bf8f38;
        }

        .wwa-divider {
          width: 48px;
          height: 2px;
          background: #bf8f38;
          margin: 0 0 24px;
        }

        .wwa-body {
          font-family: "Montserrat", sans-serif;
          font-size: 14px;
          line-height: 1.75;
          color: #5a5a5a;
          margin-bottom: 14px;
        }

        .wwa-quote {
          font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
          font-size: clamp(18px, 1.6vw, 22px);
          font-style: italic;
          font-weight: 400;
          color: #182849;
          line-height: 1.5;
          border-left: 3px solid #bf8f38;
          padding-left: 24px;
          margin: 24px 0;
        }

        .wwa-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 36px;
          font-family: "Montserrat", sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s;
          cursor: pointer;
          background: #bf8f38;
          color: #182849;
          border: none;
          margin-top: 20px;
        }

        .wwa-btn:hover {
          background: #d4a85c;
          transform: translateY(-2px);
        }

        /* Single auto-flipping photo card */
        .wwa-visual {
          position: relative;
          width: 100%;
          max-width: 560px;
          aspect-ratio: 1 / 1;
          margin: 0 auto;
          align-self: center;
          perspective: 1600px;
        }

        .flip-card {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1);
          transform-style: preserve-3d;
        }
        .flip-card.flipped { transform: rotateY(180deg); }

        .flip-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          overflow: hidden;
          box-shadow: 0 24px 60px -20px rgba(24, 40, 73, 0.28);
          border: 1px solid rgba(191, 143, 56, 0.18);
        }
        .flip-face.back { transform: rotateY(180deg); }
        .flip-face img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Decorative gold frame offset behind the card */
        .wwa-visual::before {
          content: "";
          position: absolute;
          inset: 24px -24px -24px 24px;
          border: 1px solid #bf8f38;
          pointer-events: none;
          z-index: 0;
        }

        .wwa-visual-tag {
          position: absolute;
          bottom: 18px;
          left: 18px;
          z-index: 5;
          font-family: "Montserrat", sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #ffffff;
          background: rgba(24, 40, 73, 0.78);
          padding: 8px 16px;
          white-space: nowrap;
          pointer-events: none;
          backdrop-filter: blur(4px);
        }

        @media (max-width: 1024px) {
          .wwa-grid {
            grid-template-columns: 1fr;
            gap: 56px;
          }
          .wwa-visual {
            max-width: 480px;
          }
        }

        @media (max-width: 640px) {
          .wwa-visual {
            max-width: 360px;
          }
          .wwa-visual::before {
            inset: 14px -14px -14px 14px;
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12" ref={containerRef}>
        <div className="wwa-grid">
          {/* Left: Text Content */}
          <div>
            <p className="wwa-eyebrow">Who We Are</p>
            <h2 className="wwa-title">
              More Than Planning —<br />
              <em>An Experience</em>
            </h2>
            <div className="wwa-divider" />
            <p className="wwa-body">
              Radiance Events is Ethiopia&rsquo;s premier wedding and event planning company,
              built on a foundation of creativity, professionalism, and genuine passion
              for creating unforgettable celebrations.
            </p>
            <blockquote className="wwa-quote">
              &ldquo;Every event is more than a gathering — it is an experience, a memory,
              and a reflection of the people behind it.&rdquo;
            </blockquote>
            <p className="wwa-body">
              We specialize in complete 360&deg; event management — combining modern event
              styling, strategic planning, and meticulous coordination — handling every
              detail with precision and care.
            </p>
            <p className="wwa-body">
              Founded to bridge elegant experiences with professional management in Ethiopia,
              Radiance Events delivers world-class celebrations rooted in local culture,
              elevated by international standards.
            </p>
            <Link href="/contact" className="wwa-btn">
              Start Your Journey
            </Link>
          </div>

          {/* Right: Single auto-flipping photo card */}
          <div className="wwa-visual" style={{ position: "relative" }}>
            <div
              className={`flip-card${flipped ? " flipped" : ""}`}
              style={{ position: "relative", zIndex: 1 }}
            >
              <div className="flip-face front">
                <img
                  src="/assets/who-we-are-1.jpg"
                  alt="Radiance Events - Celebration"
                  loading="lazy"
                />
                <div className="wwa-visual-tag">
                  Radiance Events &mdash; Addis Ababa, Ethiopia
                </div>
              </div>
              <div className="flip-face back">
                <img
                  src="/assets/who-we-are-2.jpg"
                  alt="Radiance Events - Event Detail"
                  loading="lazy"
                />
                <div className="wwa-visual-tag">
                  Behind The Details
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}