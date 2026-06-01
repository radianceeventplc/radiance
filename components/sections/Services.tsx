"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import React from "react";
import Link from "next/link";
import {
  Heart,
  PartyPopper,
  Plane,
  Building2,
} from "lucide-react";
import { useLanguage } from "@/lib/languageContext";
import { t } from "@/lib/translations";

type TabId = "weddings" | "social" | "destination" | "corporate";

const tabIds: { id: TabId; icon: React.ElementType; link: string }[] = [
  { id: "weddings", icon: Heart, link: "#" },
  { id: "social", icon: PartyPopper, link: "#" },
  { id: "destination", icon: Plane, link: "#" },
  { id: "corporate", icon: Building2, link: "#" },
];

export function Services() {
  const { lang } = useLanguage();
  const tr = t[lang].services;

  const tabs = tabIds.map((tab) => ({
    ...tab,
    label: tr.tabs[tab.id].label,
    items: tr.tabs[tab.id].items,
    linkText: tr.tabs[tab.id].linkText,
  }));

  const [activeTab, setActiveTab] = useState<TabId>(tabIds[0].id);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const resetAutoTimer = useCallback(() => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    autoTimerRef.current = setTimeout(() => {
      setActiveTab((prev) => {
        const currentIndex = tabIds.findIndex((t) => t.id === prev);
        const nextIndex = (currentIndex + 1) % tabIds.length;
        return tabIds[nextIndex].id;
      });
    }, 10000);
  }, []);

  const handleTabClick = (id: TabId) => {
    setActiveTab(id);
    resetAutoTimer();
  };

  useEffect(() => {
    resetAutoTimer();
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    };
  }, [resetAutoTimer]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];
  const CurrentIcon = currentTab.icon;

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "#ffffff" }}
    >
      <style>{`
        .svc-intro {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: end;
          margin-bottom: 60px;
        }

        .svc-eyebrow {
          font-family: "Montserrat", sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #bf8f38;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .svc-eyebrow::before {
          content: "";
          display: block;
          width: 30px;
          height: 1px;
          background: #bf8f38;
        }

        .svc-title {
          font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
          font-size: clamp(36px, 4.2vw, 54px);
          font-weight: 700;
          line-height: 1.12;
          color: #182849;
        }

        .svc-title em {
          font-style: italic;
          color: #bf8f38;
        }

        .svc-lead {
          font-family: "Montserrat", sans-serif;
          font-size: 15px;
          font-weight: 300;
          line-height: 1.85;
          color: #6b6b6b;
        }

        /* Tabs */
        .svc-tabs {
          display: flex;
          gap: 0;
          border-bottom: 2px solid #e8e0d5;
          margin-bottom: 48px;
        }

        .svc-tab {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 18px 32px;
          font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
          font-size: 18px;
          font-weight: 700;
          color: #182849;
          background: none;
          border: none;
          cursor: pointer;
          position: relative;
          transition: color 0.3s;
          opacity: 0.5;
        }

        .svc-tab::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 3px;
          background: #bf8f38;
          transform: scaleX(0);
          transition: transform 0.3s;
        }

        .svc-tab.active {
          opacity: 1;
        }

        .svc-tab.active::after {
          transform: scaleX(1);
        }

        .svc-tab:hover {
          opacity: 0.8;
        }

        .svc-tab-icon {
          width: 22px;
          height: 22px;
          stroke-width: 1.5;
        }

        /* Tab content */
        .svc-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s, transform 0.5s;
        }

        .svc-content.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .svc-content-title {
          font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
          font-size: clamp(28px, 3.2vw, 38px);
          font-weight: 700;
          color: #182849;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .svc-content-title-icon {
          width: 32px;
          height: 32px;
          color: #bf8f38;
          stroke-width: 1.5;
        }

        .svc-content-desc {
          font-family: "Montserrat", sans-serif;
          font-size: 15px;
          line-height: 1.85;
          color: #6b6b6b;
          margin-bottom: 36px;
        }

        .svc-list-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border: 1px solid rgba(24, 40, 73, 0.1);
        }

        .svc-list-item {
          padding: 15px 20px;
          border-bottom: 1px solid rgba(24, 40, 73, 0.08);
          border-right: 1px solid rgba(24, 40, 73, 0.08);
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: "Montserrat", sans-serif;
          font-size: 14px;
          color: #252422;
          transition: background 0.3s, color 0.3s;
          cursor: default;
        }

        .svc-list-item:hover {
          background: rgba(191, 143, 56, 0.08);
          color: #182849;
        }

        .svc-list-item::before {
          content: "";
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #bf8f38;
          flex-shrink: 0;
        }

        .svc-list-item:nth-child(even) {
          border-right: none;
        }

        .svc-list-grid .svc-list-item:nth-last-child(-n+2) {
          border-bottom: none;
        }

        .svc-cta-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 36px;
          font-family: "Montserrat", sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #bf8f38;
          text-decoration: none;
          transition: color 0.3s;
          padding: 14px 36px;
          border: 2px solid #bf8f38;
        }

        .svc-cta-link::after {
          content: "→";
          transition: transform 0.3s;
        }

        .svc-cta-link:hover {
          color: #182849;
          border-color: #182849;
        }

        .svc-cta-link:hover::after {
          transform: translateX(5px);
        }

        @media (max-width: 1024px) {
          .svc-intro {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .svc-tabs {
            flex-wrap: wrap;
          }
          .svc-tab {
            padding: 14px 20px;
            font-size: 16px;
          }
          .svc-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .svc-list-grid {
            grid-template-columns: 1fr;
          }
          .svc-list-item {
            border-right: none;
          }
          .svc-list-item:nth-last-child(-n+2) {
            border-bottom: 1px solid rgba(24, 40, 73, 0.08);
          }
          .svc-list-item:last-child {
            border-bottom: none;
          }
        }

        @media (max-width: 640px) {
          .svc-tab {
            padding: 12px 16px;
            font-size: 14px;
          }
          .svc-tab-icon {
            width: 18px;
            height: 18px;
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="svc-intro">
          <div>
            <p className="svc-eyebrow">{tr.eyebrow}</p>
            <h2 className="svc-title">
              {tr.heading1}<br />
              <em>{tr.heading2}</em>
            </h2>
          </div>
          <p className="svc-lead" style={{ marginBottom: 0 }}>
            {tr.lead}
          </p>
        </div>

        {/* Tabs */}
        <div className="svc-tabs">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`svc-tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <TabIcon className="svc-tab-icon" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active Tab Content */}
        <div key={currentTab.id} className={`svc-content visible`}>
          <div>
            <h3 className="svc-content-title">
              <CurrentIcon className="svc-content-title-icon" />
              {currentTab.label}
            </h3>
            <p className="svc-content-desc">
              {tr.tabs[currentTab.id as keyof typeof tr.tabs].desc}
            </p>
            <Link href={currentTab.link} className="svc-cta-link">
              {currentTab.linkText}
            </Link>
          </div>

          <div>
            <div className="svc-list-grid">
              {currentTab.items.map((item) => (
                <div key={item} className="svc-list-item">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}