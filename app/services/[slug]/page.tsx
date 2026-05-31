import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getServiceBySlug, servicesContent } from "@/lib/servicesContent";
import { prisma } from "@/lib/prisma";
import { GalleryCategory } from "@/generated/prisma";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return servicesContent.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service | Radiance" };
  return {
    title: `${service.navLabel} | Radiance`,
    description: service.lead,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const otherServices = servicesContent.filter((s) => s.slug !== slug);

  const galleryImages =
    service.galleryCategories.length > 0
      ? await prisma.galleryImage.findMany({
          where: {
            category: { in: service.galleryCategories as GalleryCategory[] },
          },
          orderBy: [
            { isFeatured: "desc" },
            { sortOrder: "asc" },
            { createdAt: "desc" },
          ],
          take: 9,
        })
      : [];

  return (
    <>
      <Header topVariant="overlay" />
      <main style={{ backgroundColor: "#f9f4ed" }}>
        <style>{`
          .sv-eyebrow {
            font-family: "Montserrat", sans-serif;
            font-size: 11px;
            font-weight: 500;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #bf8f38;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
          }
          .sv-eyebrow::before {
            content: "";
            display: block;
            width: 30px;
            height: 1px;
            background: #bf8f38;
          }
          .sv-eyebrow.center { justify-content: center; }
          .sv-eyebrow.center::before { display: none; }
          .sv-eyebrow.center::after {
            content: "";
            display: block;
            width: 30px;
            height: 1px;
            background: #bf8f38;
            order: 1;
          }
          .sv-eyebrow.center > * { order: 0; }

          .sv-title {
            font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
            font-weight: 700;
            line-height: 1.08;
            color: #182849;
          }
          .sv-title em { font-style: italic; color: #bf8f38; }

          /* Hero */
          .sv-hero {
            position: relative;
            min-height: 80vh;
            display: flex;
            align-items: center;
            overflow: hidden;
            color: #ffffff;
          }
          .sv-hero-bg {
            position: absolute;
            inset: 0;
            background-size: cover;
            background-position: center;
            transform: scale(1.02);
          }
          .sv-hero-overlay {
            position: absolute;
            inset: 0;
            background:
              linear-gradient(180deg, rgba(13,22,45,0.55) 0%, rgba(24,40,73,0.7) 60%, rgba(24,40,73,0.85) 100%);
          }
          .sv-hero-inner {
            position: relative;
            z-index: 2;
            margin: 0 auto;
            width: 100%;
            max-width: 1440px;
            padding: 160px 24px 100px;
          }
          @media (min-width: 1024px) { .sv-hero-inner { padding: 180px 32px 120px; } }
          @media (min-width: 1280px) { .sv-hero-inner { padding: 200px 48px 140px; } }

          .sv-hero .sv-eyebrow { color: #d4a85c; }
          .sv-hero .sv-eyebrow::before { background: #d4a85c; }
          .sv-hero .sv-title {
            font-size: clamp(44px, 5.4vw, 76px);
            color: #ffffff;
            max-width: 920px;
          }
          .sv-hero .sv-lead {
            margin-top: 28px;
            font-family: "Montserrat", sans-serif;
            font-size: 16px;
            font-weight: 300;
            line-height: 1.85;
            color: rgba(255, 255, 255, 0.78);
            max-width: 620px;
          }
          .sv-hero-cta {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-top: 40px;
            padding: 16px 38px;
            background: #bf8f38;
            color: #182849;
            font-family: "Montserrat", sans-serif;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            text-decoration: none;
            transition: background 0.3s ease;
          }
          .sv-hero-cta:hover { background: #d4a85c; }

          /* Offerings */
          .sv-section {
            padding: clamp(80px, 12vh, 140px) 0;
          }
          .sv-container {
            margin: 0 auto;
            width: 100%;
            max-width: 1440px;
            padding: 0 24px;
          }
          @media (min-width: 1024px) { .sv-container { padding: 0 32px; } }
          @media (min-width: 1280px) { .sv-container { padding: 0 48px; } }

          .sv-section-head {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: end;
            margin-bottom: 64px;
          }
          @media (max-width: 1024px) {
            .sv-section-head { grid-template-columns: 1fr; gap: 32px; }
          }

          .sv-section .sv-title {
            font-size: clamp(32px, 3.6vw, 48px);
          }
          .sv-section-lead {
            font-family: "Montserrat", sans-serif;
            font-size: 15px;
            font-weight: 300;
            line-height: 1.85;
            color: rgba(24, 40, 73, 0.7);
            max-width: 520px;
          }

          .sv-cards {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4px;
            border: 1px solid rgba(24, 40, 73, 0.12);
          }
          @media (max-width: 768px) { .sv-cards { grid-template-columns: 1fr; } }

          .sv-card {
            background: #ffffff;
            padding: 36px 32px;
            border: 1px solid rgba(24, 40, 73, 0.08);
            position: relative;
            transition: background 0.3s ease, border-color 0.3s ease;
          }
          .sv-card:hover {
            background: #fffaf2;
            border-color: rgba(191, 143, 56, 0.4);
          }
          .sv-card-num {
            font-family: "Montserrat", sans-serif;
            font-size: 11px;
            font-weight: 500;
            letter-spacing: 0.22em;
            color: #bf8f38;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
          }
          .sv-card-num::before {
            content: "";
            display: block;
            width: 22px;
            height: 1px;
            background: #bf8f38;
          }
          .sv-card-title {
            font-family: "Kostic Serif", Georgia, serif;
            font-size: 24px;
            font-weight: 700;
            color: #182849;
            line-height: 1.2;
            margin: 0 0 22px;
          }
          .sv-card ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .sv-card li {
            font-family: "Montserrat", sans-serif;
            font-size: 14px;
            color: rgba(24, 40, 73, 0.8);
            display: flex;
            align-items: flex-start;
            gap: 12px;
            line-height: 1.55;
          }
          .sv-card li::before {
            content: "";
            display: block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #bf8f38;
            margin-top: 8px;
            flex-shrink: 0;
          }

          /* Gallery */
          .sv-gallery { background: #182849; }
          .sv-gallery .sv-eyebrow { color: #d4a85c; }
          .sv-gallery .sv-eyebrow::before { background: #d4a85c; }
          .sv-gallery .sv-title { color: #ffffff; }
          .sv-gallery .sv-section-lead { color: rgba(255, 255, 255, 0.65); }

          .sv-gal-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: 240px;
            gap: 4px;
            width: 100%;
          }
          .sv-gal-grid > .sv-gal-cell:nth-child(10n + 1) {
            grid-column: 1 / span 2;
            grid-row: span 2;
          }
          .sv-gal-grid > .sv-gal-cell:nth-child(10n + 6) {
            grid-column: 3 / span 2;
            grid-row: span 2;
          }
          @media (max-width: 1024px) {
            .sv-gal-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 200px; }
            .sv-gal-grid > .sv-gal-cell:nth-child(10n + 1),
            .sv-gal-grid > .sv-gal-cell:nth-child(10n + 6) {
              grid-column: 1 / span 2;
              grid-row: span 2;
            }
          }
          @media (max-width: 640px) {
            .sv-gal-grid { grid-template-columns: 1fr; grid-auto-rows: 220px; }
            .sv-gal-grid > .sv-gal-cell:nth-child(10n + 1),
            .sv-gal-grid > .sv-gal-cell:nth-child(10n + 6) {
              grid-column: 1;
              grid-row: span 1;
            }
          }

          .sv-gal-cell {
            position: relative;
            overflow: hidden;
            background: #1e3460;
          }
          .sv-gal-cell :global(img) {
            object-fit: cover;
            transition: transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1);
          }
          .sv-gal-cell:hover :global(img) { transform: scale(1.05); }
          .sv-gal-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(24, 40, 73, 0.88) 0%, rgba(24, 40, 73, 0.25) 55%, transparent 80%);
            display: flex;
            align-items: flex-end;
            padding: 24px;
            opacity: 0;
            transition: opacity 0.35s ease;
          }
          .sv-gal-cell:hover .sv-gal-overlay { opacity: 1; }
          .sv-gal-cap {
            font-family: "Kostic Serif", Georgia, serif;
            font-size: 18px;
            font-weight: 700;
            color: #ffffff;
            line-height: 1.2;
          }

          .sv-gal-link {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            margin-top: 40px;
            font-family: "Montserrat", sans-serif;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #bf8f38;
            text-decoration: none;
            border-bottom: 1px solid #bf8f38;
            padding: 10px 0 6px;
            transition: color 0.3s ease, border-bottom-color 0.3s ease;
          }
          .sv-gal-link:hover { color: #d4a85c; border-bottom-color: #d4a85c; }

          /* CTA band */
          .sv-cta {
            background: #182849;
            padding: clamp(80px, 12vh, 120px) 24px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          .sv-cta::before {
            content: "";
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 50% 0%, rgba(191,143,56,0.18) 0%, transparent 60%);
            pointer-events: none;
          }
          .sv-cta-inner { position: relative; max-width: 760px; margin: 0 auto; }
          .sv-cta .sv-eyebrow { color: #d4a85c; }
          .sv-cta .sv-eyebrow::before { background: #d4a85c; }
          .sv-cta-title {
            font-family: "Kostic Serif", Georgia, serif;
            font-size: clamp(32px, 4vw, 48px);
            font-weight: 700;
            color: #ffffff;
            line-height: 1.15;
            margin: 0 0 16px;
          }
          .sv-cta-title em { font-style: italic; color: #bf8f38; }
          .sv-cta-note {
            font-family: "Montserrat", sans-serif;
            font-size: 15px;
            font-weight: 300;
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 36px;
          }
          .sv-cta-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 17px 44px;
            background: #bf8f38;
            color: #182849;
            font-family: "Montserrat", sans-serif;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            text-decoration: none;
            transition: background 0.3s ease;
          }
          .sv-cta-btn:hover { background: #d4a85c; }

          /* Explore other services */
          .sv-other {
            background: #f9f4ed;
          }
          .sv-other-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 4px;
          }
          @media (max-width: 900px) { .sv-other-grid { grid-template-columns: 1fr; } }

          .sv-other-card {
            position: relative;
            padding: 36px 32px;
            background: #ffffff;
            border: 1px solid rgba(24, 40, 73, 0.1);
            text-decoration: none;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 200px;
            transition: background 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
          }
          .sv-other-card:hover {
            background: #182849;
            border-color: #bf8f38;
            transform: translateY(-3px);
          }
          .sv-other-eyebrow {
            font-family: "Montserrat", sans-serif;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #bf8f38;
            margin-bottom: 14px;
          }
          .sv-other-name {
            font-family: "Kostic Serif", Georgia, serif;
            font-size: 26px;
            font-weight: 700;
            color: #182849;
            line-height: 1.15;
            transition: color 0.3s ease;
          }
          .sv-other-card:hover .sv-other-name { color: #ffffff; }
          .sv-other-arrow {
            margin-top: 18px;
            font-family: "Montserrat", sans-serif;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #bf8f38;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            transition: gap 0.3s ease;
          }
          .sv-other-card:hover .sv-other-arrow { gap: 16px; color: #d4a85c; }
        `}</style>

        {/* HERO */}
        <section className="sv-hero">
          <div
            className="sv-hero-bg"
            style={{ backgroundImage: `url(${service.heroImage})` }}
            aria-hidden
          />
          <div className="sv-hero-overlay" aria-hidden />
          <div className="sv-hero-inner">
            <p className="sv-eyebrow">{service.eyebrow}</p>
            <h1 className="sv-title">
              {service.titleLine1}<br />
              <em>{service.titleLine2}</em>
            </h1>
            <p className="sv-lead">{service.lead}</p>
            <Link href="/contact" className="sv-hero-cta">
              {service.ctaLabel}
            </Link>
          </div>
        </section>

        {/* OFFERINGS */}
        <section className="sv-section">
          <div className="sv-container">
            <div className="sv-section-head">
              <div>
                <p className="sv-eyebrow">What We Offer</p>
                <h2 className="sv-title">
                  Complete Solutions,<br />
                  <em>Tailored To You</em>
                </h2>
              </div>
              <p className="sv-section-lead">{service.offeringsLead}</p>
            </div>

            <div className="sv-cards">
              {service.offerings.map((offering) => (
                <article key={offering.number} className="sv-card">
                  <div className="sv-card-num">{offering.number}</div>
                  <h3 className="sv-card-title">{offering.title}</h3>
                  <ul>
                    {offering.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY — category-specific */}
        {galleryImages.length > 0 && (
          <section className="sv-section sv-gallery">
            <div className="sv-container">
              <div className="sv-section-head" style={{ marginBottom: 48 }}>
                <div>
                  <p className="sv-eyebrow">From The Gallery</p>
                  <h2 className="sv-title">
                    {service.navLabel},<br />
                    <em>In Frame</em>
                  </h2>
                </div>
                <p className="sv-section-lead">
                  A glimpse into the {service.navLabel.toLowerCase()} we&apos;ve had the privilege of designing.
                </p>
              </div>

              <div className="sv-gal-grid">
                {galleryImages.map((image) => (
                  <div key={image.id} className="sv-gal-cell">
                    <Image
                      src={image.imageUrl}
                      alt={image.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                    <div className="sv-gal-overlay">
                      <div className="sv-gal-cap">{image.title}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/gallery" className="sv-gal-link">
                View Full Gallery <span aria-hidden>→</span>
              </Link>
            </div>
          </section>
        )}

        {/* CTA BAND */}
        <section className="sv-cta">
          <div className="sv-cta-inner">
            <p className="sv-eyebrow center" style={{ justifyContent: "center" }}>
              Ready To Begin?
            </p>
            <h2 className="sv-cta-title">
              {service.ctaNote.split("—")[0]?.trim() || "Let's Start Planning"}
              <br />
              <em>Your Perfect Event</em>
            </h2>
            <p className="sv-cta-note">{service.ctaNote}</p>
            <Link href="/contact" className="sv-cta-btn">
              {service.ctaLabel}
            </Link>
          </div>
        </section>

        {/* EXPLORE OTHER SERVICES */}
        <section className="sv-section sv-other">
          <div className="sv-container">
            <div className="sv-section-head" style={{ marginBottom: 48 }}>
              <div>
                <p className="sv-eyebrow">Continue Exploring</p>
                <h2 className="sv-title">
                  Other Ways<br />
                  <em>We Can Celebrate</em>
                </h2>
              </div>
            </div>

            <div className="sv-other-grid">
              {otherServices.map((other) => (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="sv-other-card"
                >
                  <div>
                    <div className="sv-other-eyebrow">{other.eyebrow}</div>
                    <h3 className="sv-other-name">
                      {other.titleLine1.replace(/,$/, "")}
                    </h3>
                  </div>
                  <span className="sv-other-arrow">
                    Discover <span aria-hidden>→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
