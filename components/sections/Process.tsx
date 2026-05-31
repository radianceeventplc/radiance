"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Consultation & Vision",
    description:
      "We begin by truly listening — understanding your vision, preferences, expectations, and budget. Every extraordinary event begins with this conversation.",
  },
  {
    number: "02",
    title: "Design & Coordination",
    description:
      "We curate every detail of the experience — from d\u00e9cor and ambiance to entertainment, guest flow, and vendor logistics — into a seamless event blueprint.",
  },
  {
    number: "03",
    title: "Flawless Execution",
    description:
      "Our team manages every element of event day with precision — ensuring a smooth, stress-free experience from setup to the final farewell moment.",
  },
  {
    number: "04",
    title: "Celebrate & Remember",
    description:
      "You enjoy every magical moment while we handle everything behind the scenes. Your only job? Be fully present and celebrate.",
  },
];

export function Process() {
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

    const cards = sectionRef.current?.querySelectorAll(".step, .prc-section-header");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="approach"
      ref={sectionRef}
      style={{ backgroundColor: "#f9f4ed", padding: "clamp(60px, 10vh, 100px) 0" }}
    >
      <style>{`
        .prc-container {
          margin: 0 auto;
          width: 100%;
          max-width: 1440px;
          padding: 0 24px;
        }

        @media (min-width: 640px) { .prc-container { padding: 0 24px; } }
        @media (min-width: 1024px) { .prc-container { padding: 0 32px; } }
        @media (min-width: 1280px) { .prc-container { padding: 0 48px; } }

        .prc-section-header {
          text-align: center;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s, transform 0.6s;
        }

        .prc-section-header.vis { opacity: 1; transform: translateY(0); }

        .prc-section-label {
          font-family: "Montserrat", sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #bf8f38;
        }

        .prc-divider {
          width: 40px;
          height: 2px;
          background: #bf8f38;
          margin: 14px auto;
        }

        .prc-display {
          font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
          font-size: clamp(32px, 3.6vw, 48px);
          font-weight: 700;
          color: #182849;
          line-height: 1.12;
          margin: 0;
        }

        .prc-sub {
          font-family: "Montserrat", sans-serif;
          font-size: 0.95rem;
          font-weight: 300;
          color: rgba(24, 40, 73, 0.55);
          max-width: 490px;
          margin: 1.5rem auto 0;
          line-height: 1.85;
        }

        .prc-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          margin-top: 60px;
        }

        .step {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s, transform 0.6s;
          padding: 0 32px;
          border-right: 1px solid rgba(191, 143, 56, 0.2);
        }

        .step:first-child { padding-left: 0; }
        .step:last-child { padding-right: 0; border-right: none; }

        .step.vis { opacity: 1; transform: translateY(0); }
        .step:nth-child(2) { transition-delay: 0.15s; }
        .step:nth-child(3) { transition-delay: 0.3s; }
        .step:nth-child(4) { transition-delay: 0.45s; }

        .step-num {
          font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
          font-size: clamp(44px, 4.8vw, 60px);
          font-weight: 700;
          color: rgba(191, 143, 56, 0.2);
          line-height: 1;
          margin-bottom: 16px;
        }

        .step h3 {
          font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
          font-size: clamp(18px, 1.6vw, 22px);
          font-weight: 700;
          color: #182849;
          margin: 0 0 12px;
          line-height: 1.3;
        }

        .step p {
          font-family: "Montserrat", sans-serif;
          font-size: 14px;
          line-height: 1.8;
          color: rgba(24, 40, 73, 0.55);
          margin: 0;
        }

        @media (max-width: 1024px) {
          .prc-steps { grid-template-columns: 1fr 1fr; gap: 36px 24px; }
          .step { border-right: none; padding: 0; }
        }

        @media (max-width: 640px) {
          .prc-steps { grid-template-columns: 1fr; gap: 32px; }
          .step { border-right: none; padding: 0; }
        }
      `}</style>

      <div className="prc-container">
        <div className="prc-section-header" data-animate>
          <span className="prc-section-label">How We Work</span>
          <div className="prc-divider"></div>
          <h2 className="prc-display">Our Planning Process</h2>
          <p className="prc-sub">
            From your first spark of an idea to the final unforgettable moment — every step handled with precision and care.
          </p>
        </div>

        <div className="prc-steps">
          {steps.map((step) => (
            <div key={step.number} className="step" data-animate>
              <div className="step-num">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}