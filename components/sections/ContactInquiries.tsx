"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function ContactInquiries() {
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

    const els = sectionRef.current?.querySelectorAll(".ci-reveal");
    els?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ backgroundColor: "#182849", padding: "clamp(60px, 10vh, 100px) 0" }}
    >
      <style>{`
        .ci-container {
          margin: 0 auto;
          width: 100%;
          max-width: 1440px;
          padding: 0 24px;
        }

        @media (min-width: 640px) { .ci-container { padding: 0 24px; } }
        @media (min-width: 1024px) { .ci-container { padding: 0 32px; } }
        @media (min-width: 1280px) { .ci-container { padding: 0 48px; } }

        .ci-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 6rem;
          align-items: start;
        }

        .ci-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s, transform 0.6s;
        }

        .ci-reveal.vis { opacity: 1; transform: translateY(0); }

        .ci-label {
          font-family: "Montserrat", sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #bf8f38;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ci-label::before {
          content: "";
          display: block;
          width: 30px;
          height: 1px;
          background: #bf8f38;
        }

        .ci-title {
          font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
          font-size: clamp(28px, 3.2vw, 38px);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.12;
          margin: 1.2rem 0 0.8rem;
        }

        .ci-title em {
          font-style: italic;
          color: #bf8f38;
        }

        .ci-desc {
          font-family: "Montserrat", sans-serif;
          font-size: 0.88rem;
          font-weight: 300;
          line-height: 1.85;
          color: rgba(255, 255, 255, 0.55);
          margin-bottom: 3rem;
        }

        .ci-items {
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
        }

        .ci-row {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .ci-icon {
          width: 38px;
          height: 38px;
          border: 1px solid #bf8f38;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          flex-shrink: 0;
          color: #bf8f38;
        }

        .ci-row .ci-lbl {
          font-family: "Montserrat", sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #bf8f38;
          margin-bottom: 0.2rem;
        }

        .ci-row .ci-val {
          font-family: "Montserrat", sans-serif;
          font-size: 0.88rem;
          color: #ffffff;
        }

        .ci-cta-btn {
          display: inline-block;
          background: #bf8f38;
          color: #182849;
          padding: 0.95rem 2.8rem;
          font-family: "Montserrat", sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 2.5rem;
        }

        .ci-cta-btn:hover {
          background: #d4a85c;
          transform: translateY(-2px);
        }

        .ci-form {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }

        .ci-frow {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.4rem;
        }

        .ci-fgrp {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .ci-fgrp label {
          font-family: "Montserrat", sans-serif;
          font-size: 0.66rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #bf8f38;
        }

        .ci-fgrp input,
        .ci-fgrp select,
        .ci-fgrp textarea {
          background: #1e3460;
          border: 1px solid rgba(191, 143, 56, 0.2);
          color: #ffffff;
          padding: 0.85rem 1.1rem;
          font-family: "Montserrat", sans-serif;
          font-size: 0.88rem;
          font-weight: 300;
          outline: none;
          transition: border-color 0.3s;
          width: 100%;
        }

        .ci-fgrp input::placeholder,
        .ci-fgrp textarea::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }

        .ci-fgrp input:focus,
        .ci-fgrp select:focus,
        .ci-fgrp textarea:focus {
          border-color: #bf8f38;
        }

        .ci-fgrp textarea {
          resize: vertical;
          min-height: 120px;
        }

        .ci-submit-btn {
          width: 100%;
          padding: 1.1rem;
          background: #bf8f38;
          color: #182849;
          font-family: "Montserrat", sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }

        .ci-submit-btn:hover {
          background: #d4a85c;
        }

        @media (max-width: 1024px) {
          .ci-grid { grid-template-columns: 1fr; gap: 3rem; }
          .ci-frow { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ci-container">
        <div className="ci-grid">
          <div className="ci-reveal">
            <p className="ci-label">Get In Touch</p>
            <h2 className="ci-title">
              Let's Start Planning<br />
              <em>Your Perfect Event</em>
            </h2>
            <p className="ci-desc">
              Whether you have a clear vision or are just beginning to dream,
              our team is ready to listen, advise, and bring your celebration
              to life. Reach out — your extraordinary event starts here.
            </p>

            <div className="ci-items">
              <div className="ci-row">
                <div className="ci-icon">✉</div>
                <div>
                  <div className="ci-lbl">Email Us</div>
                  <div className="ci-val">hello@radianceevents.com</div>
                </div>
              </div>
              <div className="ci-row">
                <div className="ci-icon">✆</div>
                <div>
                  <div className="ci-lbl">Call or WhatsApp</div>
                  <div className="ci-val">+251 93 053 3197</div>
                </div>
              </div>
              <div className="ci-row">
                <div className="ci-icon">◈</div>
                <div>
                  <div className="ci-lbl">Location</div>
                  <div className="ci-val">Addis Ababa, Ethiopia</div>
                </div>
              </div>
              <div className="ci-row">
                <div className="ci-icon">◎</div>
                <div>
                  <div className="ci-lbl">Social</div>
                  <div className="ci-val">@RadianceEvents</div>
                </div>
              </div>
            </div>

            <Link href="/contact" className="ci-cta-btn">
              Send an Inquiry
            </Link>
          </div>

          <div className="ci-reveal">
            <div className="ci-form">
              <div className="ci-frow">
                <div className="ci-fgrp">
                  <label>First Name</label>
                  <input type="text" placeholder="Your first name" />
                </div>
                <div className="ci-fgrp">
                  <label>Last Name</label>
                  <input type="text" placeholder="Your last name" />
                </div>
              </div>
              <div className="ci-frow">
                <div className="ci-fgrp">
                  <label>Email Address</label>
                  <input type="email" placeholder="your@email.com" />
                </div>
                <div className="ci-fgrp">
                  <label>Phone / WhatsApp</label>
                  <input type="tel" placeholder="+251 ..." />
                </div>
              </div>
              <div className="ci-fgrp">
                <label>Event Type</label>
                <select>
                  <option value="">Select your event type...</option>
                  <option>Wedding Planning</option>
                  <option>Social Event</option>
                  <option>Destination Event</option>
                  <option>Corporate Event</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="ci-fgrp">
                <label>Your Vision</label>
                <textarea placeholder="Describe your event dream, any inspiration you have, or specific requests..."></textarea>
              </div>
              <button className="ci-submit-btn" type="button">
                Send Inquiry &mdash; Let's Create Something Beautiful
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}