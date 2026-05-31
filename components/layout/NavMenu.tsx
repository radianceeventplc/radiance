"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import type { NavItem } from "@/types";
import { cn } from "@/lib/utils";

const navItems: NavItem[] = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "What We Do",
    dropdown: [
      { label: "Weddings", href: "/services/weddings" },
      { label: "Social Events", href: "/services/social-events" },
      { label: "Destination Events", href: "/services/destination" },
      { label: "Corporate Events", href: "/services/corporate" },
    ],
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "Packages",
    href: "/packages",
  },
];

interface NavMenuProps {
  variant?: "light" | "dark";
  className?: string;
}

export function NavMenu({ variant = "dark", className }: NavMenuProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownClick = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const linkBase = cn(
    "nav-link relative inline-block px-4 py-2 text-[12px] font-medium uppercase transition-colors duration-300",
    {
      "text-white hover:text-[#bf8f38]": variant === "light",
      "text-[#182849] hover:text-[#bf8f38]": variant === "dark",
    }
  );

  return (
    <nav
      ref={dropdownRef}
      className={cn("hidden md:flex items-center gap-2", className)}
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <style>{`
        .nav-link {
          letter-spacing: 0.16em;
        }
        .nav-link::after {
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
        .nav-link:hover::after,
        .nav-link[data-open="true"]::after {
          transform: scaleX(1);
        }
      `}</style>
      {navItems.map((item) => {
        const isActive = openDropdown === item.label;
        const hasDropdown = !!item.dropdown;

        return (
          <div key={item.label} className="relative">
            {hasDropdown ? (
              <button
                onClick={() => handleDropdownClick(item.label)}
                onMouseEnter={() => setOpenDropdown(item.label)}
                data-open={isActive}
                className={linkBase}
              >
                {item.label}
              </button>
            ) : (
              <Link href={item.href!} className={linkBase}>
                {item.label}
              </Link>
            )}

            {/* Dropdown */}
            {hasDropdown && (
              <div
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
                className={cn(
                  "absolute top-full left-1/2 -translate-x-1/2 min-w-[220px] pt-2 transition-all duration-200",
                  isActive
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-1 pointer-events-none"
                )}
              >
                <div
                  className={cn(
                    "shadow-2xl border overflow-hidden",
                    {
                      "bg-[#182849]/95 backdrop-blur-md border-[#bf8f38]/25":
                        variant === "light",
                      "bg-white/95 backdrop-blur-md border-[#bf8f38]/25":
                        variant === "dark",
                    }
                  )}
                  style={{ borderRadius: 0 }}
                >
                  {item.dropdown!.map((dropItem) => (
                    <Link
                      key={dropItem.href}
                      href={dropItem.href}
                      onClick={() => setOpenDropdown(null)}
                      className={cn(
                        "block px-5 py-3 text-[11px] font-medium uppercase transition-colors duration-200",
                        {
                          "text-white hover:bg-[#bf8f38]/15 hover:text-[#bf8f38]":
                            variant === "light",
                          "text-[#182849] hover:bg-[#bf8f38]/10 hover:text-[#bf8f38]":
                            variant === "dark",
                        }
                      )}
                      style={{ letterSpacing: "0.14em", fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {dropItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
