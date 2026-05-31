"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface MenuItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
}

const menuItems: MenuItem[] = [
  {
    number: "01",
    title: "Weddings",
    subtitle: "Eternal Elegance",
    description:
      "Full-service wedding planning crafted to every couple's vision, culture, and love story.",
    image: "https://picsum.photos/id/98/600/450",
    href: "/services/weddings",
  },
  {
    number: "02",
    title: "Social Events",
    subtitle: "Authentic Connections",
    description:
      "Stylish private celebrations — from intimate gatherings to lavish luxury affairs.",
    image: "https://picsum.photos/id/106/600/450",
    href: "/services/social-events",
  },
  {
    number: "03",
    title: "Destination",
    subtitle: "Extraordinary Escapes",
    description:
      "Seamless destination event planning across Africa and beyond.",
    image: "https://picsum.photos/id/15/600/450",
    href: "/services/destination",
  },
  {
    number: "04",
    title: "Corporate",
    subtitle: "Professional Excellence",
    description:
      "Corporate event management that elevates your brand and engages your audience.",
    image: "https://picsum.photos/id/20/600/450",
    href: "/services/corporate",
  },
];

const topNavLinks = [
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Packages", href: "/packages" },
  { label: "Contact", href: "/contact" },
];

interface MobileMenuProps {
  variant?: "light" | "dark";
}

export function MobileMenu({ variant = "dark" }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openMenu = () => {
    setIsOpen(true);
    document.body.classList.add("menu-open");
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.classList.remove("menu-open");
  };

  // ESC to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeMenu();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  // Horizontal wheel scroll support
  useEffect(() => {
    const scrollWrap = scrollContainerRef.current;
    if (!scrollWrap) return;
    const handleWheel = (e: WheelEvent) => {
      if (
        Math.abs(e.deltaY) > Math.abs(e.deltaX) &&
        scrollWrap.scrollWidth > scrollWrap.clientWidth
      ) {
        e.preventDefault();
        scrollWrap.scrollLeft += e.deltaY;
      }
    };
    scrollWrap.addEventListener("wheel", handleWheel, { passive: false });
    return () => scrollWrap.removeEventListener("wheel", handleWheel);
  }, [isOpen]);

  // Focus trap + initial focus on close button
  useEffect(() => {
    if (!isOpen) return;

    // Move focus to close button when menu opens
    closeBtnRef.current?.focus();

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const overlay = document.getElementById("fullscreenMenu");
      if (!overlay) return;
      const focusable = overlay.querySelectorAll<HTMLElement>(
        'button, a, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
  }, [isOpen]);

  // Cleanup body class on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, []);

  return (
    <>
      {/* Hamburger trigger */}
      <button
        id="hamburgerTrigger"
        onClick={openMenu}
        className={`hamburger-btn ${variant === "light" ? "is-light" : "is-dark"}`}
        aria-label="Open menu"
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>

      {/* Fullscreen overlay menu */}
      <div
        id="fullscreenMenu"
        className={`menu-overlay${isOpen ? " open" : ""}`}
        aria-hidden={!isOpen}
        style={
          !mounted
            ? {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                transform: "translateY(-100%)",
                pointerEvents: "none",
                visibility: "hidden",
                zIndex: 2000,
              }
            : undefined
        }
      >
        <div className="menu-header">
          <nav className="header-nav" aria-label="Primary">
            {topNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="header-nav-link"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="header-right">
            <button
              ref={closeBtnRef}
              id="closeMenuBtn"
              onClick={closeMenu}
              className="close-btn"
              aria-label="Close menu"
            >
              <span className="close-line" />
              <span className="close-line" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="menu-items-container"
          id="menuScrollContainer"
        >
          {menuItems.map((item) => (
            <div className="menu-item" key={item.number}>
              <div className="item-top">
                <span className="item-number">{item.number}</span>
                <div className="image-wrapper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={`${item.title} event`}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="item-details">
                <div className="info-row">
                  <div className="title-group">
                    <h3>{item.title}</h3>
                    <p className="subtitle">{item.subtitle}</p>
                  </div>
                </div>
                <div className="hover-content">
                  <p className="description">{item.description}</p>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.22em",
                      textDecoration: "none",
                      color: "#bf8f38",
                      padding: "12px 0 6px",
                      borderBottom: "1px solid #bf8f38",
                      transition: "color 0.3s ease, border-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#d4a85c";
                      e.currentTarget.style.borderBottomColor = "#d4a85c";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#bf8f38";
                      e.currentTarget.style.borderBottomColor = "#bf8f38";
                    }}
                  >
                    Discover More <span aria-hidden style={{ color: "inherit" }}>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        /* Hamburger Button — minimal 2-line icon */
        .hamburger-btn {
          pointer-events: auto;
          background: transparent;
          border: none;
          cursor: pointer;
          width: 40px;
          height: 40px;
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 6px;
          padding: 0;
          transition: opacity 0.25s ease;
        }
        .hamburger-btn:hover .hamburger-line {
          background-color: #bf8f38;
        }
        .hamburger-btn:hover .hamburger-line:last-child {
          width: 24px;
        }
        .hamburger-line {
          width: 24px;
          height: 1.5px;
          transition: background-color 0.3s ease, width 0.3s ease;
          display: block;
        }
        .hamburger-line:last-child {
          width: 16px;
        }
        .is-light .hamburger-line {
          background-color: #ffffff;
        }
        .is-dark .hamburger-line {
          background-color: #182849;
        }

        /* Fullscreen overlay */
        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #182849;
          z-index: 2000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform: translateY(-100%);
          transition: transform 0.7s cubic-bezier(0.77, 0, 0.18, 1);
          pointer-events: none;
          font-family:
            "Montserrat", system-ui, -apple-system, "Segoe UI", Roboto,
            Helvetica, Arial, sans-serif;
        }
        .menu-overlay.open {
          transform: translateY(0);
          pointer-events: auto;
        }

        .menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 48px;
          border-bottom: 1px solid rgba(191, 143, 58, 0.25);
          background: #182849;
        }
        .header-nav {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
        }
        .header-nav :global(.header-nav-link) {
          font-family: "Montserrat", sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #ffffff;
          text-decoration: none;
          padding: 10px 16px;
          position: relative;
          transition: color 0.3s ease;
        }
        .header-nav :global(.header-nav-link)::after {
          content: "";
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 4px;
          height: 1px;
          background: #bf8f38;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .header-nav :global(.header-nav-link):hover {
          color: #bf8f38;
        }
        .header-nav :global(.header-nav-link):hover::after {
          transform: scaleX(1);
        }
        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          width: 40px;
          height: 40px;
          padding: 0;
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }
        .close-line {
          position: absolute;
          width: 22px;
          height: 1.5px;
          background-color: #f4f4f4;
          transition: background-color 0.3s ease;
        }
        .close-line:first-child {
          transform: rotate(45deg);
        }
        .close-line:last-child {
          transform: rotate(-45deg);
        }
        .close-btn:hover {
          transform: rotate(90deg);
        }
        .close-btn:hover .close-line {
          background-color: #bf8f3a;
        }

        /* Horizontal scroller */
        .menu-items-container {
          flex: 1 1 auto;
          min-height: 0;
          display: flex;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          scrollbar-width: thin;
          scrollbar-color: #bf8f3a rgba(255, 255, 255, 0.12);
          padding-bottom: 20px;
        }
        .menu-items-container::-webkit-scrollbar {
          height: 5px;
        }
        .menu-items-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px;
        }
        .menu-items-container::-webkit-scrollbar-thumb {
          background: #bf8f3a;
          border-radius: 10px;
        }

        /* Menu items */
        .menu-item {
          min-width: calc(100vw / 3.2);
          width: 440px;
          flex: 0 0 auto;
          scroll-snap-align: start;
          border-right: 1px solid rgba(191, 143, 58, 0.2);
          padding: 48px 40px;
          display: flex;
          flex-direction: column;
          transition:
            background 0.3s ease,
            border-right-color 0.2s;
          background: #182849;
        }
        @media (min-width: 1400px) {
          .menu-item {
            min-width: 480px;
          }
        }
        @media (max-width: 1100px) {
          .menu-item {
            min-width: 380px;
          }
        }
        .menu-item:hover {
          background: rgba(47, 73, 124, 0.5);
          border-right-color: #bf8f3a;
        }

        .item-top {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 28px;
        }
        .item-number {
          font-family: "Montserrat", sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          color: #bf8f38;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .item-number::after {
          content: "";
          display: block;
          flex: 1;
          height: 1px;
          background: rgba(191, 143, 58, 0.35);
        }
        .image-wrapper {
          width: 100%;
          overflow: hidden;
          border-radius: 0;
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.45);
          border: 1px solid rgba(191, 143, 58, 0.25);
        }
        .image-wrapper :global(img) {
          width: 100%;
          height: 320px;
          object-fit: cover;
          filter: grayscale(100%);
          transition:
            filter 0.45s cubic-bezier(0.2, 0.9, 0.4, 1.1),
            transform 0.5s ease;
          display: block;
          border-radius: 0;
        }
        .menu-item:hover .image-wrapper :global(img) {
          filter: grayscale(0%);
          transform: scale(1.02);
        }

        .item-details {
          margin-top: 8px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          border-bottom: 1px solid rgba(191, 143, 58, 0.3);
          padding-bottom: 18px;
          margin-bottom: 8px;
        }
        .title-group :global(h3) {
          font-family:
            "Kostic Serif", "Playfair Display", Georgia, "Times New Roman",
            serif;
          font-weight: 700;
          font-size: 2.2rem;
          letter-spacing: -0.5px;
          color: #ffffff;
          margin-bottom: 8px;
          line-height: 1.1;
        }
        .subtitle {
          font-family: "Montserrat", sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.04em;
          color: #bf8f38;
          font-style: italic;
          font-weight: 400;
        }
        .year {
          font-family: "Montserrat", sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          color: rgba(191, 143, 58, 0.7);
          font-weight: 400;
          text-transform: uppercase;
        }

        .hover-content {
          margin-top: 24px;
          opacity: 1;
        }
        .description {
          font-family: "Montserrat", sans-serif;
          font-size: 0.92rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 22px;
          font-weight: 300;
          border-left: 2px solid #bf8f38;
          padding-left: 18px;
        }
        .scroll-hint {
          position: absolute;
          bottom: 24px;
          right: 48px;
          font-family: "Montserrat", sans-serif;
          font-size: 10px;
          color: rgba(191, 143, 58, 0.85);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 500;
          pointer-events: none;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .scroll-hint::before,
        .scroll-hint::after {
          content: "";
          display: block;
          width: 20px;
          height: 1px;
          background: rgba(191, 143, 58, 0.6);
        }

        @media (max-width: 900px) {
          .menu-header {
            padding: 18px 20px;
            flex-wrap: nowrap;
            gap: 12px;
          }
          .header-nav {
            gap: 2px;
            overflow-x: auto;
            flex-wrap: nowrap;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .header-nav::-webkit-scrollbar { display: none; }
          .header-nav :global(.header-nav-link) {
            font-size: 10.5px;
            padding: 8px 10px;
            white-space: nowrap;
          }
          .menu-item {
            min-width: 88vw;
            padding: 28px 22px;
          }
          .image-wrapper :global(img) {
            height: 240px;
          }
          .title-group :global(h3) {
            font-size: 1.8rem;
          }
          .scroll-hint {
            bottom: 16px;
            right: 20px;
            font-size: 9px;
          }
        }

        @media (max-width: 600px) {
          .menu-header {
            padding: 14px 16px;
          }
          .header-nav :global(.header-nav-link) {
            font-size: 10px;
            letter-spacing: 0.12em;
            padding: 6px 8px;
          }
          .menu-item {
            min-width: 92vw;
            padding: 24px 20px;
          }
          .image-wrapper :global(img) {
            height: 220px;
          }
          .title-group :global(h3) {
            font-size: 1.6rem;
          }
        }
      `}</style>

      <style jsx global>{`
        body.menu-open {
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
