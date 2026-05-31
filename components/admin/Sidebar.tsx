"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  CalendarCheck,
  Image as ImageIcon,
  Package,
  Heart,
  Users,
  Menu,
  X,
  LogOut,
  FileText,
  PenSquare,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  { label: "Proposals", href: "/admin/proposals", icon: FileText },
  { label: "Weddings", href: "/admin/weddings", icon: Heart },
  { label: "Card Design", href: "/admin/card-design", icon: PenSquare },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Packages", href: "/admin/packages", icon: Package },
  { label: "Users", href: "/admin/users", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <style>{`
        .ad-sidebar {
          background: #182849;
          color: #ffffff;
          font-family: "Montserrat", sans-serif;
        }
        .ad-side-brand {
          padding: 28px 24px;
          border-bottom: 1px solid rgba(191, 143, 56, 0.18);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ad-side-brand img {
          height: 28px;
          width: auto;
          filter: brightness(0) invert(1);
        }
        .ad-side-tag {
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #bf8f38;
          padding-left: 12px;
          border-left: 1px solid rgba(191, 143, 56, 0.4);
        }

        .ad-side-eyebrow {
          padding: 22px 24px 10px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.35);
        }

        .ad-side-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 24px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.65);
          transition: color 0.25s ease, background 0.25s ease;
        }
        .ad-side-link:hover {
          color: #ffffff;
          background: rgba(191, 143, 56, 0.08);
        }
        .ad-side-link.active {
          color: #ffffff;
          background: rgba(191, 143, 56, 0.12);
        }
        .ad-side-link.active::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #bf8f38;
        }
        .ad-side-link svg {
          width: 18px;
          height: 18px;
          stroke-width: 1.5;
        }

        .ad-side-foot {
          margin-top: auto;
          padding: 16px 12px 20px;
          border-top: 1px solid rgba(191, 143, 56, 0.18);
        }
        .ad-side-logout {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.6);
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: color 0.25s ease, background 0.25s ease, border-color 0.25s ease;
        }
        .ad-side-logout:hover {
          color: #ffffff;
          background: rgba(191, 143, 56, 0.12);
          border-color: rgba(191, 143, 56, 0.5);
        }
        .ad-side-logout svg { width: 16px; height: 16px; }

        .ad-mobile-trigger {
          position: fixed;
          top: 14px;
          left: 14px;
          z-index: 50;
          width: 42px;
          height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #182849;
          color: #ffffff;
          border: 1px solid rgba(191, 143, 56, 0.4);
          cursor: pointer;
        }
        @media (min-width: 1024px) { .ad-mobile-trigger { display: none; } }
      `}</style>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="ad-mobile-trigger"
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "ad-sidebar fixed top-0 left-0 z-40 h-full w-64 transform transition-transform duration-200 ease-in-out overflow-y-auto",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Brand */}
          <Link href="/admin" className="ad-side-brand">
            <img
              src="/assets/Radiance_Logo_Horizontal.svg"
              alt="Radiance"
            />
            <span className="ad-side-tag">Admin</span>
          </Link>

          {/* Navigation */}
          <div>
            <div className="ad-side-eyebrow">Manage</div>
            <nav>
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/admin" && pathname.startsWith(item.href + "/")) ||
                  (item.href === "/admin" && pathname === "/admin");
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn("ad-side-link", isActive && "active")}
                  >
                    <Icon />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Logout */}
          <div className="ad-side-foot">
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="ad-side-logout"
            >
              <LogOut />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
