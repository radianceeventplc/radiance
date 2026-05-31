"use client";

import { useScrollHeader } from "@/hooks/useScrollHeader";
import { HeaderOverlay } from "./HeaderOverlay";
import { HeaderSolid } from "./HeaderSolid";
import { HeaderLight } from "./HeaderLight";

interface HeaderProps {
  /**
   * Style used while the page is at the top (before scroll).
   * - "overlay": transparent bg + white text + inverted logo. Use over a dark hero (homepage).
   * - "light":   transparent bg + navy text + color logo. Use on pages with light backgrounds.
   * Once the user scrolls past the threshold, both variants switch to the solid header.
   */
  topVariant?: "overlay" | "light";
}

export function Header({ topVariant = "overlay" }: HeaderProps) {
  const { isAtTop } = useScrollHeader(80);

  const TopHeader = topVariant === "light" ? HeaderLight : HeaderOverlay;

  return (
    <>
      {/* Top-of-page header (overlay or light) */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          isAtTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <TopHeader />
      </div>

      {/* Solid header after scroll */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          !isAtTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <HeaderSolid />
      </div>
    </>
  );
}
