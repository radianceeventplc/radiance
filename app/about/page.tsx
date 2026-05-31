"use client";

import { useEffect, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function AboutPage() {
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

    const els = sectionRef.current?.querySelectorAll(".ab-reveal");
    els?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header topVariant="light" />
      <main ref={sectionRef}>
        <style>{`
          .ab-container {
            margin: 0 auto;
            width: 100%;
            max-width: 1440px;
            padding: 0 24px;
          }
          @media (min-width: 640px) { .ab-container { padding: 0 24px; } }
          @media (min-width: 1024px) { .ab-container { padding: 0 32px; } }
          @media (min-width: 1280px) { .ab-container { padding: 0 48px; } }

          .ab-reveal {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s, transform 0.6s;
          }
          .ab-reveal.vis { opacity: 1; transform: translateY(0); }

          .ab-label {
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
          .ab-label::before {
            content: "";
            display: block;
            width: 30px;
            height: 1px;
            background: #bf8f38;
          }
          .ab-label-center { justify-content: center; }
          .ab-label-center::before { display: none; }

          .ab-title {
            font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
            font-size: clamp(36px, 4.2vw, 54px);
            font-weight: 700;
            line-height: 1.12;
            color: #182849;
            margin-bottom: 16px;
          }
          .ab-title em { font-style: italic; color: #bf8f38; }

          .ab-divider {
            width: 56px;
            height: 2px;
            background: #bf8f38;
            margin: 0 0 32px;
          }
          .ab-divider-center { margin: 14px auto; }

          .ab-body {
            font-family: "Montserrat", sans-serif;
            font-size: 15px;
            line-height: 1.9;
            color: #5a5a5a;
            margin-bottom: 22px;
          }

          .ab-quote {
            font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
            font-size: clamp(20px, 2vw, 26px);
            font-style: italic;
            font-weight: 400;
            color: #182849;
            line-height: 1.55;
            border-left: 3px solid #bf8f38;
            padding-left: 28px;
            margin: 36px 0;
          }

          .ab-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 16px 40px;
            font-family: "Montserrat", sans-serif;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            text-decoration: none;
            transition: all 0.3s;
            cursor: pointer;
            background: #bf8f38;
            color: #182849;
            border: none;
            margin-top: 36px;
          }
          .ab-btn:hover { background: #d4a85c; transform: translateY(-2px); }

          /* About grid – left text, right values */
          .ab-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: center;
          }

          /* Values – redesigned as bordered cards */
          .ab-vals {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .ab-val-card {
            padding: 1.4rem 1.6rem;
            border: 1px solid rgba(191, 143, 56, 0.18);
            transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
          }
          .ab-val-card:hover {
            border-color: #bf8f38;
            transform: translateY(-2px);
            box-shadow: 0 6px 24px rgba(191, 143, 56, 0.08);
          }
          .ab-val-card h4 {
            font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
            font-size: 1.1rem;
            font-weight: 700;
            color: #bf8f38;
            margin-bottom: 0.4rem;
          }
          .ab-val-card p {
            font-family: "Montserrat", sans-serif;
            font-size: 0.82rem;
            font-weight: 300;
            line-height: 1.7;
            color: #6b6b6b;
          }

          /* Eight Reasons grid */
          .ab-why-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
            margin-top: 60px;
          }
          .ab-why-item {
            padding: 36px 28px;
            border: 1px solid rgba(191, 143, 56, 0.12);
            transition: border-color 0.4s, transform 0.4s, box-shadow 0.4s;
          }
          .ab-why-item:hover {
            border-color: #bf8f38;
            transform: translateY(-5px);
            box-shadow: 0 12px 40px rgba(191, 143, 56, 0.1);
          }
          .ab-why-number {
            font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
            font-size: clamp(38px, 4vw, 52px);
            font-weight: 700;
            color: rgba(191, 143, 56, 0.15);
            line-height: 1;
            margin-bottom: 16px;
          }
          .ab-why-item:hover .ab-why-number {
            color: rgba(191, 143, 56, 0.25);
          }
          .ab-why-title {
            font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
            font-size: clamp(17px, 1.8vw, 22px);
            font-weight: 700;
            color: #182849;
            margin-bottom: 10px;
          }
          .ab-why-desc {
            font-family: "Montserrat", sans-serif;
            font-size: 13px;
            line-height: 1.8;
            color: #6b6b6b;
          }

          /* Founders – exact match to radiance-website.html design */
          .ab-team-header {
            text-align: center;
          }
          .ab-team-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            margin-top: 48px;
          }
          .ab-team-card {
            padding: 2.5rem;
            border: 1px solid rgba(191, 143, 56, 0.15);
            transition: border-color 0.3s;
          }
          .ab-team-card:hover { border-color: #bf8f38; }
          .ab-team-card .tc-label {
            font-family: "Montserrat", sans-serif;
            font-size: 0.68rem;
            letter-spacing: 0.26em;
            text-transform: uppercase;
            color: #bf8f38;
            margin-bottom: 0.8rem;
          }
          .ab-team-card h3 {
            font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
            font-size: 2rem;
            font-weight: 700;
            color: #182849;
            margin: 0 0 0.2rem;
          }
          .ab-team-card .tc-title {
            font-family: "Montserrat", sans-serif;
            font-size: 0.75rem;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: #6b6b6b;
            margin-bottom: 2rem;
          }
          .ab-team-card .tc-bio {
            font-family: "Montserrat", sans-serif;
            font-size: 0.88rem;
            font-weight: 300;
            line-height: 1.85;
            color: #5a5a5a;
            margin-bottom: 2rem;
          }
          .ab-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          .ab-tag {
            font-family: "Montserrat", sans-serif;
            font-size: 0.67rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #bf8f38;
            border: 1px solid rgba(191, 143, 56, 0.2);
            padding: 0.28rem 0.75rem;
          }

          @media (max-width: 1024px) {
            .ab-grid { grid-template-columns: 1fr; gap: 60px; }
            .ab-why-layout { grid-template-columns: 1fr; gap: 3rem; }
            .ab-team-grid { grid-template-columns: 1fr; }
          }
        `}</style>

        {/* ═══ SECTION 1: Who We Are ═══ */}
        <section style={{ backgroundColor: "#f9f4ed", padding: "clamp(140px, 18vh, 200px) 0", minHeight: "100vh", display: "flex", alignItems: "center" }}>
          <div className="ab-container">
            <div className="ab-grid">
              <div className="ab-reveal">
                <p className="ab-label">Who We Are</p>
                <h2 className="ab-title">More Than Planning —<br /><em>An Experience</em></h2>
                <div className="ab-divider" />
                <p className="ab-body">Radiance Events is Ethiopia&rsquo;s premier wedding and event planning company, built on a foundation of creativity, professionalism, and genuine passion for creating unforgettable celebrations.</p>
                <blockquote className="ab-quote">&ldquo;Every event is more than a gathering — it is an experience, a memory, and a reflection of the people behind it.&rdquo;</blockquote>
                <p className="ab-body">We specialize in complete 360&deg; event management — combining modern event styling, strategic planning, and meticulous coordination. From your first consultation to your final moment of celebration, we handle every detail with precision and care.</p>
                <p className="ab-body">Founded to bridge the gap between elegant event experiences and professional management in Ethiopia, Radiance Events delivers world-class celebrations — rooted in local culture, elevated by international standards.</p>
              </div>
              <div className="ab-vals ab-reveal">
                <div className="ab-val-card">
                  <h4>Excellence</h4>
                  <p>Committed to the highest quality service and professional standards in every project.</p>
                </div>
                <div className="ab-val-card">
                  <h4>Creativity</h4>
                  <p>Designing unique, memorable experiences tailored to each client&rsquo;s unique story and vision.</p>
                </div>
                <div className="ab-val-card">
                  <h4>Integrity</h4>
                  <p>Honesty, transparency, and professionalism in every interaction and relationship we build.</p>
                </div>
                <div className="ab-val-card">
                  <h4>Attention to Detail</h4>
                  <p>Exceptional events are created through thoughtful details and meticulous coordination.</p>
                </div>
                <div className="ab-val-card">
                  <h4>Client Satisfaction</h4>
                  <p>Our clients are the center of everything we do. Your peace of mind and happiness is our definition of a perfect event.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 2: Eight Reasons Clients Choose Us ═══ */}
        <section id="why" style={{ backgroundColor: "#ffffff", padding: "clamp(80px, 12vh, 140px) 0", minHeight: "100vh", display: "flex", alignItems: "center" }}>
          <div className="ab-container" style={{ width: "100%" }}>
            <div className="ab-reveal" style={{ maxWidth: 600 }}>
              <p className="ab-label">Why Radiance Events</p>
              <h2 className="ab-title">Eight Reasons Clients<br /><em>Choose Us</em></h2>
            </div>
            <div className="ab-why-grid g-reveal" style={{ marginTop: "60px" }}>
              <div className="ab-why-item">
                <div className="ab-why-number">01</div>
                <h4 className="ab-why-title">Personalized Experiences</h4>
                <p className="ab-why-desc">No two events are ever the same. Every celebration is designed around your unique story, vision, and personality.</p>
              </div>
              <div className="ab-why-item">
                <div className="ab-why-number">02</div>
                <h4 className="ab-why-title">Professional Planning</h4>
                <p className="ab-why-desc">Organized, detail-oriented, and completely stress-free planning from first consultation through to final execution.</p>
              </div>
              <div className="ab-why-item">
                <div className="ab-why-number">03</div>
                <h4 className="ab-why-title">Local & International Reach</h4>
                <p className="ab-why-desc">Strong exposure across Ethiopia, Africa, and internationally — bringing global standards to every event we produce.</p>
              </div>
              <div className="ab-why-item">
                <div className="ab-why-number">04</div>
                <h4 className="ab-why-title">Creative Event Styling</h4>
                <p className="ab-why-desc">Modern, imaginative styling and design that transforms any space into a breathtaking, memorable environment.</p>
              </div>
              <div className="ab-why-item">
                <div className="ab-why-number">05</div>
                <h4 className="ab-why-title">Trusted Vendor Network</h4>
                <p className="ab-why-desc">Reliable partnerships with Ethiopia&rsquo;s finest vendors — ensuring premium quality at every level of your event.</p>
              </div>
              <div className="ab-why-item">
                <div className="ab-why-number">06</div>
                <h4 className="ab-why-title">360° Management</h4>
                <p className="ab-why-desc">Complete end-to-end event management — every detail handled with care, nothing overlooked, nothing left to chance.</p>
              </div>
              <div className="ab-why-item">
                <div className="ab-why-number">07</div>
                <h4 className="ab-why-title">Client-First Service</h4>
                <p className="ab-why-desc">You are the center of everything we do. Your satisfaction, comfort, and joy are our highest priority — always.</p>
              </div>
              <div className="ab-why-item">
                <div className="ab-why-number">08</div>
                <h4 className="ab-why-title">Elegant Execution</h4>
                <p className="ab-why-desc">Sophisticated, seamless, and beautiful — every Radiance event leaves a lasting impression on you and your guests.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 3: Meet Our Founders – exact match to radiance-website.html design ═══ */}
        <section id="team" style={{ backgroundColor: "#f9f4ed", padding: "clamp(80px, 12vh, 140px) 0", minHeight: "100vh", display: "flex", alignItems: "center" }}>
          <div className="ab-container">
            <div className="ab-reveal ab-team-header">
              <p className="ab-label ab-label-center">The People Behind the Magic</p>
              <div className="ab-divider ab-divider-center"></div>
              <h2 className="ab-title" style={{ textAlign: "center" }}>Meet Our Founders</h2>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.95rem", fontWeight: 300, color: "#5a5a5a", maxWidth: 480, margin: "1.2rem auto 0", lineHeight: 1.85 }}>
                Two passionate professionals. One shared commitment to excellence.
              </p>
            </div>
            <div className="ab-team-grid">
              <div className="ab-team-card ab-reveal">
                <p className="tc-label">Co-Founder</p>
                <h3>Emnet Mulugeta</h3>
                <p className="tc-title">Creative Director</p>
                <p className="tc-bio">A certified wedding and party planner with extensive marketing experience both in Ethiopia and internationally. Emnet&rsquo;s passion for creating memorable experiences — combined with her deep understanding of modern trends and cultural traditions — allows Radiance Events to design celebrations that are elegant, meaningful, and timeless. Her creative vision is the heart and soul of every event we produce.</p>
                <div className="ab-tags">
                  <span className="ab-tag">Event Styling</span>
                  <span className="ab-tag">Concept Development</span>
                  <span className="ab-tag">Luxury Weddings</span>
                  <span className="ab-tag">Client Experience</span>
                  <span className="ab-tag">Brand & Marketing</span>
                  <span className="ab-tag">Vendor Coordination</span>
                </div>
              </div>
              <div className="ab-team-card ab-reveal">
                <p className="tc-label">Co-Founder</p>
                <h3>Meseret Alemu</h3>
                <p className="tc-title">Operations Director</p>
                <p className="tc-bio">With over 13 years of professional experience working across local and international companies, Meseret&rsquo;s expertise in operations management, budget planning, and organizational leadership ensures flawless event execution at every scale. Her structured, solution-oriented approach is the operational backbone behind every Radiance Events celebration — ensuring everything runs smoothly, on time, and to perfection.</p>
                <div className="ab-tags">
                  <span className="ab-tag">Operations</span>
                  <span className="ab-tag">Budget Management</span>
                  <span className="ab-tag">Corporate Relations</span>
                  <span className="ab-tag">Project Management</span>
                  <span className="ab-tag">Team Leadership</span>
                  <span className="ab-tag">Administration</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}