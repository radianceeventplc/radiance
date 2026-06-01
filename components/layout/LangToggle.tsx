"use client";

import { useLanguage } from "@/lib/languageContext";

interface LangToggleProps {
  variant?: "light" | "dark";
}

export function LangToggle({ variant = "dark" }: LangToggleProps) {
  const { lang, toggleLang } = useLanguage();

  const isLight = variant === "light";
  const base = isLight ? "#ffffff" : "#182849";
  const active = "#bf8f38";

  return (
    <button
      onClick={toggleLang}
      aria-label={lang === "en" ? "Switch to Amharic" : "Switch to English"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0,
        border: `1.5px solid ${isLight ? "rgba(255,255,255,0.45)" : "rgba(24,40,73,0.25)"}`,
        borderRadius: 2,
        overflow: "hidden",
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.1em",
        cursor: "pointer",
        background: "transparent",
      }}
    >
      <span
        style={{
          padding: "6px 10px",
          background: lang === "en" ? active : "transparent",
          color: lang === "en" ? "#ffffff" : base,
          transition: "background 0.25s, color 0.25s",
        }}
      >
        EN
      </span>
      <span
        style={{
          width: 1,
          height: 24,
          background: isLight ? "rgba(255,255,255,0.3)" : "rgba(24,40,73,0.15)",
        }}
      />
      <span
        style={{
          padding: "6px 10px",
          background: lang === "am" ? active : "transparent",
          color: lang === "am" ? "#ffffff" : base,
          transition: "background 0.25s, color 0.25s",
        }}
      >
        አማ
      </span>
    </button>
  );
}
