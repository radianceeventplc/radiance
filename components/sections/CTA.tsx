"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vis");
          }
        });
      },
      { threshold: 0.15 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section
      id="ctaband"
      ref={sectionRef}
      className="cta-section"
      style={{
        backgroundColor: "#bf8f38",
        padding: "clamp(60px, 10vh, 100px) 24px",
        textAlign: "center",
      }}
    >
      <style>{`
        .cta-section .cta-inner {
          max-width: 1360px;
          margin: 0 auto;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s, transform 0.6s;
        }
        .cta-section.vis .cta-inner {
          opacity: 1;
          transform: translateY(0);
        }
        .cta-lbl {
          font-family: "Montserrat", sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(24, 40, 73, 0.45);
          margin-bottom: 0.8rem;
        }
        .cta-title {
          font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
          font-size: clamp(36px, 4.5vw, 54px);
          font-weight: 700;
          color: #182849;
          line-height: 1.1;
          margin: 0 0 1rem;
        }
        .cta-title em {
          font-style: italic;
          color: #ffffff;
        }
        .cta-sub {
          font-family: "Montserrat", sans-serif;
          font-size: 0.98rem;
          font-weight: 300;
          color: rgba(24, 40, 73, 0.6);
          max-width: 480px;
          margin: 0 auto 3rem;
          line-height: 1.75;
        }
        .cta-btn {
          display: inline-block;
          background: #182849;
          color: #ffffff;
          padding: 0.95rem 2.8rem;
          font-family: "Montserrat", sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .cta-btn:hover {
          background: #1e3460;
          transform: translateY(-2px);
        }
      `}</style>

      <div className="cta-inner">
        <p className="cta-lbl">Ready to Begin?</p>
        <h2 className="cta-title">
          Your Dream Event Starts<br />
          <em>With One Conversation</em>
        </h2>
        <p className="cta-sub">
          Tell us your vision. We'll handle everything else — from the
          first idea to the final breathtaking moment of celebration.
        </p>
        <Link href="/contact" className="cta-btn">
          Book a Free Consultation
        </Link>
      </div>
    </section>
  );
}
