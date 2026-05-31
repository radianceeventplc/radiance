"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { CustomCursor } from "@/components/ui/CustomCursor";
import Link from "next/link";

export function Hero() {
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setCursorVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5,
        rootMargin: "0px",
      }
    );

    const heroSection = document.getElementById("hero-section");
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, []);

  return (
    <>
      <section
        id="hero-section"
        className="sticky top-0 w-full h-screen z-0 flex items-center justify-center overflow-hidden bg-primary-navy cursor-none"
      >
        <CustomCursor isVisible={cursorVisible} />

        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/Hero-video-placeholder.jpg"
          aria-hidden="true"
        >
          <source src="/videos/Radiance Wedding Hero Video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Layered cinematic overlay for depth + legibility */}
        {/* 1. Base vertical gradient: navy → warm gold, multi-stop for richer transition */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,22,45,0.85) 0%, rgba(24,40,73,0.65) 30%, rgba(70,55,45,0.55) 60%, rgba(191,143,56,0.7) 100%)",
          }}
        />
        {/* 2. Radial vignette to focus attention on the headline */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.6) 100%)",
          }}
        />
        {/* 3. Subtle warm glow behind the text */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(191,143,56,0.18) 0%, rgba(191,143,56,0) 45%)",
            mixBlendMode: "screen",
          }}
        />
        {/* 4. Bottom fade to seamlessly meet the gold stats bar */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none h-40"
          style={{
            background:
              "linear-gradient(to bottom, rgba(201,168,76,0) 0%, rgba(201,168,76,0.55) 100%)",
          }}
        />
        {/* 5. Very faint film grain via layered noise gradient for texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 2px)",
          }}
        />

        <Container className="relative z-10 text-center">
          <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-secondary-white tracking-tight leading-[1.1]">
            Turning Moments Into<br />
            <span style={{ color: "#bf8f38", fontFamily: "'Kostic Serif', 'Times New Roman', Georgia, serif" }}>Timeless</span> Memories
          </h1>
          <p className="mt-6 md:mt-8 text-lg md:text-xl text-secondary-white max-w-3xl mx-auto leading-relaxed" style={{ color: "#ffffff" }}>
            From intimate celebrations to grand luxury weddings and high-profile corporate events — we design experiences that are as unique as your story.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <button
                className="inline-flex items-center justify-center rounded-none font-medium transition-all duration-300 cursor-pointer px-8 py-4 text-base tracking-wide uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  backgroundColor: "#bf8f38",
                  color: "#182849",
                  border: "none",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#d4a85c"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#bf8f38"; }}
              >
                Plan My Event
              </button>
            </Link>
            <Link href="/services">
              <button
                className="inline-flex items-center justify-center rounded-none font-medium transition-all duration-300 cursor-pointer px-8 py-4 text-base tracking-wide uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  backgroundColor: "#182849",
                  color: "#ffffff",
                  border: "none",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#2f497c"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#182849"; }}
              >
                Explore Services
              </button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Stats Bar – gold background matching reference design */}
      <div className="relative z-10" style={{ backgroundColor: "#C9A84C" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }}>
          <div style={{ textAlign: "center", padding: "32px 16px", borderRight: "1px solid rgba(27,47,94,0.2)" }}>
            <div style={{ fontFamily: "'Kostic Serif', 'Times New Roman', Georgia, serif", fontSize: "clamp(36px,4vw,48px)", fontWeight: 700, color: "#0D1B36", lineHeight: 1 }}>
              360°
            </div>
            <div style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(13,27,54,0.65)", marginTop: "6px", fontFamily: "'Montserrat', sans-serif" }}>
              Full Event Management
            </div>
          </div>
          <div style={{ textAlign: "center", padding: "32px 16px", borderRight: "1px solid rgba(27,47,94,0.2)" }}>
            <div style={{ fontFamily: "'Kostic Serif', 'Times New Roman', Georgia, serif", fontSize: "clamp(36px,4vw,48px)", fontWeight: 700, color: "#0D1B36", lineHeight: 1 }}>
              13+
            </div>
            <div style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(13,27,54,0.65)", marginTop: "6px", fontFamily: "'Montserrat', sans-serif" }}>
              Years Combined Experience
            </div>
          </div>
          <div style={{ textAlign: "center", padding: "32px 16px", borderRight: "1px solid rgba(27,47,94,0.2)" }}>
            <div style={{ fontFamily: "'Kostic Serif', 'Times New Roman', Georgia, serif", fontSize: "clamp(36px,4vw,48px)", fontWeight: 700, color: "#0D1B36", lineHeight: 1 }}>
              3+
            </div>
            <div style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(13,27,54,0.65)", marginTop: "6px", fontFamily: "'Montserrat', sans-serif" }}>
              Continents Served
            </div>
          </div>
          <div style={{ textAlign: "center", padding: "32px 16px" }}>
            <div style={{ fontFamily: "'Kostic Serif', 'Times New Roman', Georgia, serif", fontSize: "clamp(36px,4vw,48px)", fontWeight: 700, color: "#0D1B36", lineHeight: 1 }}>
              100%
            </div>
            <div style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(13,27,54,0.65)", marginTop: "6px", fontFamily: "'Montserrat', sans-serif" }}>
              Client-Focused Service
            </div>
          </div>
        </div>
      </div>
    </>
  );
}