"use client";

import Link from "next/link";
import { NavMenu } from "./NavMenu";
import { MobileMenu } from "./MobileMenu";
import { Container } from "@/components/ui/Container";

export function HeaderSolid() {
  return (
    <header className="bg-white shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/assets/Radiance_Logo_Horizontal.svg"
              alt="Radiance"
              className="h-10 w-auto"
            />
          </Link>

          {/* Center: Navigation */}
          <NavMenu variant="dark" />

          {/* Right: CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center font-semibold uppercase tracking-[0.12em] text-[11px] transition-all duration-300"
              style={{
                backgroundColor: "#bf8f38",
                color: "#182849",
                padding: "14px 36px",
                fontFamily: "'Montserrat', sans-serif",
                border: "none",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#d4a85c"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#bf8f38"; }}
            >
              Book Consultation
            </Link>
            <MobileMenu variant="dark" />
          </div>
        </div>
      </Container>
    </header>
  );
}