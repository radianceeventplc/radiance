"use client";

import { useEffect, useRef } from "react";

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We sit down with you — whether in person or virtually — to understand your vision, preferences, and every detail that matters most to you.",
  },
  {
    number: "02",
    title: "Design & Planning",
    description:
      "Our creative team crafts a bespoke event plan tailored to your unique style, budget, and requirements, leaving no stone unturned.",
  },
  {
    number: "03",
    title: "Execution",
    description:
      "We coordinate every vendor, timeline, and logistics element so that on the big day, you can simply be present and enjoy every moment.",
  },
  {
    number: "04",
    title: "The Grand Reveal",
    description:
      "Watch as your dream event comes to life exactly as envisioned — and often beyond. We stay until the最后一刻 to ensure perfection.",
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
      { threshold: 0.1 }
    );

    const els = sectionRef.current?.querySelectorAll(".p-reveal");
    els?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        backgroundColor: "#ffffff",
        padding: "clamp(60px, 10vh, 100px) 24px",
      }}
    >
      <style>{`
        .proc-container {
          max-width: 1360px;
          margin: 0 auto;
        }

        .proc-header {
          text-align: center;
          margin-bottom: 4rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s, transform 0.6s;
        }

        .proc-header.vis {
          opacity: 1;
          transform: translateY(0);
        }

        .proc-label {
          font-family: "Montserrat", sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #bf8f38;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 0.8rem;
        }

        .proc-label::before,
        .proc-label::after {
          content: "";
          display: block;
          width: 30px;
          height: 1px;
          background: #bf8f38;
        }

        .proc-title {
          font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
          font-size: clamp(36px, 4.2vw, 54px);
          font-weight: 700;
          color: #182849;
          line-height: 1.12;
          margin-bottom: 16px;
        }

        .proc-title em {
          font-style: italic;
          color: #bf8f38;
        }

        .proc-sub {
          font-family: "Montserrat", sans-serif;
          font-size: 15px;
          font-weight: 300;
          color: rgba(24, 40, 73, 0.55);
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.85;
        }

        .proc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }

        .proc-card {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s, transform 0.6s;
        }

        .proc-card:nth-child(1) { transition-delay: 0.1s; }
        .proc-card:nth-child(2) { transition-delay: 0.2s; }
        .proc-card:nth-child(3) { transition-delay: 0.3s; }
        .proc-card:nth-child(4) { transition-delay: 0.4s; }

        .proc-card.vis {
          opacity: 1;
          transform: translateY(0);
        }

        .proc-number {
          font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
          font-size: 3rem;
          font-weight: 700;
          color: rgba(191, 143, 56, 0.2);
          line-height: 1;
          margin-bottom: 1rem;
        }

        .proc-card-title {
          font-family: "Montserrat", sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #182849;
          margin-bottom: 0.75rem;
          letter-spacing: 0.02em;
        }

        .proc-card-desc {
          font-family: "Montserrat", sans-serif;
          font-size: 0.88rem;
          font-weight: 300;
          color: rgba(24, 40, 73, 0.6);
          line-height: 1.75;
        }

        .proc-divider {
          width: 40px;
          height: 2px;
          background: #bf8f38;
          margin-bottom: 1.2rem;
        }

        @media (max-width: 1024px) {
          .proc-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
        }

        @media (max-width: 640px) {
          .proc-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }
      `}</style>

      <div className="proc-container">
        <div className="proc-header p-reveal">
          <p className="proc-label">How We Work</p>
          <h2 className="proc-title">
            Our <em>Process</em>
          </h2>
          <p className="proc-sub">
            From the very first conversation to the final flourish, we guide you
            through every step of crafting your perfect event.
          </p>
        </div>

        <div className="proc-grid">
          {steps.map((step) => (
            <div key={step.number} className="proc-card p-reveal">
              <div className="proc-number">{step.number}</div>
              <div className="proc-divider" />
              <h3 className="proc-card-title">{step.title}</h3>
              <p className="proc-card-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}