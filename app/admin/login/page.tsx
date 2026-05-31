import { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Radiance",
  description: "Sign in to the Radiance admin dashboard",
};

export default function AdminLoginPage() {
  return (
    <div
      className="min-h-screen grid grid-cols-1 lg:grid-cols-[0.75fr_1fr]"
      style={{ backgroundColor: "#f9f4ed" }}
    >
      <style>{`
        .ad-eyebrow {
          font-family: "Montserrat", sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #bf8f38;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }
        .ad-eyebrow::before {
          content: "";
          display: block;
          width: 30px;
          height: 1px;
          background: #bf8f38;
        }
        .ad-title {
          font-family: "Kostic Serif", "Times New Roman", Georgia, serif;
          font-size: clamp(32px, 3.6vw, 48px);
          font-weight: 700;
          line-height: 1.12;
          color: #182849;
          margin: 0 0 14px;
        }
        .ad-title em { font-style: italic; color: #bf8f38; }
        .ad-sub {
          font-family: "Montserrat", sans-serif;
          font-size: 14px;
          line-height: 1.7;
          color: rgba(24, 40, 73, 0.65);
          font-weight: 300;
          margin: 0;
        }
        .ad-aside {
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(180deg, rgba(13,22,45,0.55) 0%, rgba(24,40,73,0.85) 100%),
            url('/assets/who-we-are-1.jpg') center / cover no-repeat;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 56px 56px 48px;
          min-height: 100vh;
        }
        .ad-aside .ad-eyebrow { color: #d4a85c; }
        .ad-aside .ad-eyebrow::before { background: #d4a85c; }
        .ad-aside .ad-title {
          color: #ffffff;
          font-size: clamp(36px, 4vw, 56px);
          max-width: 440px;
        }
        .ad-aside .ad-sub {
          color: rgba(255, 255, 255, 0.7);
          max-width: 440px;
          margin-top: 12px;
        }
        .ad-aside-foot {
          font-family: "Montserrat", sans-serif;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.55);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ad-aside-foot::before {
          content: "";
          display: block;
          width: 22px;
          height: 1px;
          background: rgba(255, 255, 255, 0.4);
        }

        .ad-form-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 56px 24px;
        }
        .ad-form-inner {
          width: 100%;
          max-width: 440px;
        }
        .ad-logo {
          display: inline-flex;
          margin-bottom: 48px;
        }
        .ad-logo img { height: 88px; width: auto; }

        @media (max-width: 1024px) {
          .ad-aside {
            min-height: 280px;
            padding: 64px 32px 40px;
          }
          .ad-form-wrap { padding: 48px 24px; }
        }
        @media (max-width: 640px) {
          .ad-aside { padding: 56px 24px 32px; }
        }
      `}</style>

      {/* Brand aside */}
      <aside className="ad-aside">
        <div>
          <Link href="/" className="inline-flex">
            <img
              src="/assets/Radiance_Logo_Horizontal.svg"
              alt="Radiance"
              className="h-11 w-auto brightness-0 invert"
            />
          </Link>
        </div>
        <div>
          <p className="ad-eyebrow">Admin Console</p>
          <h1 className="ad-title">
            Welcome Back,<br />
            <em>To Radiance</em>
          </h1>
          <p className="ad-sub">
            Manage bookings, proposals, and every detail behind the celebrations
            you bring to life — all from one elegant dashboard.
          </p>
        </div>
        <div className="ad-aside-foot">Radiance Events &middot; Addis Ababa</div>
      </aside>

      {/* Form */}
      <div className="ad-form-wrap">
        <div className="ad-form-inner">
          <Link href="/" className="ad-logo lg:hidden">
            <img
              src="/assets/Radiance_Logo_Horizontal.svg"
              alt="Radiance"
            />
          </Link>

          <h2 className="ad-title">
            Access Your<br />
            <em>Dashboard</em>
          </h2>
          <p className="ad-sub" style={{ marginBottom: 36 }}>
            Access your admin dashboard.
          </p>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
