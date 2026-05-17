"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Cake3D = dynamic(() => import("@/components/wedding/Cake3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <span className="text-3xl">🎂</span>
    </div>
  ),
});

interface InvitationMessageData {
  id?: string;
  preline: string;
  message: string;
}
interface LoveStoryData {
  id: string;
  year: string;
  title: string;
  description: string;
  sortOrder: number;
}
interface ProgramItemData {
  id: string;
  time: string;
  title: string;
  description: string;
  sortOrder: number;
}
interface GiftData {
  id: string;
  giftName: string;
  title: string | null;
  description: string | null;
  isReserved: boolean;
}
interface RSVPData {
  id: string;
  guestName: string;
  attendance: string;
  createdAt: string;
}
interface WeddingInvitationFull {
  id: string;
  slug: string;
  brideName: string;
  groomName: string;
  weddingDate: string;
  weddingTime: string;
  venueName: string;
  venueAddress: string;
  mapUrl: string | null;
  isPublished: boolean;
  invitationMessage: InvitationMessageData | null;
  loveStories: LoveStoryData[];
  programItems: ProgramItemData[];
  venueDetails: { name: string; address: string; googleMapsLink: string | null; eventTime: string } | null;
  gifts: GiftData[];
  rsvps: RSVPData[];
}
interface Props {
  invitation: WeddingInvitationFull;
}

function getCountdown(date: string) {
  const diff = Math.max(new Date(date).getTime() - Date.now(), 0);
  return { days: Math.floor(diff / 864e5), hours: Math.floor((diff / 36e5) % 24), minutes: Math.floor((diff / 6e4) % 60), seconds: Math.floor((diff / 1e3) % 60) };
}
function easeInOutCubic(t: number) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }
function clamp(v: number, a: number, b: number) { return Math.max(a, Math.min(b, v)); }
function phase(p: number, a: number, b: number) { return clamp((p - a) / (b - a), 0, 1); }

export default function WeddingCardClient({ invitation }: Props) {
  const { brideName, groomName } = invitation;
  const [countdown, setCountdown] = useState(() => getCountdown(invitation.weddingDate));
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpPhone, setRsvpPhone] = useState("");
  const [rsvpAttendance, setRsvpAttendance] = useState("accept");
  const [rsvpStatus, setRsvpStatus] = useState("");
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [showIban, setShowIban] = useState(false);

  const driverRef = useRef<HTMLDivElement>(null);
  const flapGroupRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const rpRef = useRef<HTMLParagraphElement>(null);
  const rnRef = useRef<HTMLHeadingElement>(null);
  const rdRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bgParallaxRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cakeIllustrationRef = useRef<HTMLDivElement>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  const openConfettiFiredRef = useRef(false);

  const fireConfetti = (originX?: number, originY?: number) => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.opacity = "1";
    const colors = ["#c9a96e", "#d4a08e", "#e8c4b8", "#b8944f", "#e0d3b8", "#fdfaf6"];
    const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string; rotation: number; spin: number }[] = [];
    const startX = originX ?? canvas.width / 2;
    const startY = originY ?? canvas.height * 0.6;
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: startX + (Math.random() - 0.5) * 220,
        y: startY + (Math.random() - 0.5) * 60,
        vx: (Math.random() - 0.5) * 12,
        vy: -Math.random() * 14 - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        spin: (Math.random() - 0.5) * 12,
      });
    }
    let frame = 0;
    const maxFrames = 120;
    function draw() {
      if (frame >= maxFrames || !ctx || !canvas) { if (canvas) canvas.style.opacity = "0"; return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx; p.vy += 0.25; p.y += p.vy; p.rotation += p.spin;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color; ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      }
      frame++; requestAnimationFrame(draw);
    }
    draw();
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else if (entry.target.classList.contains("gift-ring-stage")) {
          entry.target.classList.remove("visible");
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCountdown(getCountdown(invitation.weddingDate)), 1000);
    return () => clearInterval(interval);
  }, [invitation.weddingDate]);

  useEffect(() => {
    const driver = driverRef.current;
    if (!driver) return;
    function render() {
      const rect = driver!.getBoundingClientRect();
      const total = driver!.offsetHeight - window.innerHeight;
      const p = clamp(-rect.top / Math.max(total, 1), 0, 1);
      const flapT = easeInOutCubic(phase(p, 0.01, 0.58));
      if (flapGroupRef.current) flapGroupRef.current.style.transform = `translateY(${flapT * 6}px) rotateX(${flapT * -176}deg)`;
      if (flapT > 0.96 && !openConfettiFiredRef.current) {
        openConfettiFiredRef.current = true;
        fireConfetti(window.innerWidth / 2, window.innerHeight * 0.74);
      }
      if (flapT < 0.12) openConfettiFiredRef.current = false;
      if (badgeRef.current) {
        const peelPhase = phase(p, 0.18, 0.44);
        const peelEased = 1 - Math.pow(1 - peelPhase, 2);
        const opacity = 1 - peelEased;
        badgeRef.current.style.opacity = String(Math.max(0, opacity));
        badgeRef.current.style.transform = `translateX(-50%) translateY(${peelEased * -30}px) rotateX(${peelEased * -45}deg) rotateZ(${peelEased * 8}deg) scale(${1 + peelEased * 0.08})`;
        badgeRef.current.style.pointerEvents = opacity > 0.15 ? "auto" : "none";
      }
      const preT = easeOut(phase(p, 0.32, 0.58));
      const nameT = easeOut(phase(p, 0.40, 0.68));
      const dateT = easeOut(phase(p, 0.48, 0.76));
      if (rpRef.current) { rpRef.current.style.opacity = String(preT); rpRef.current.style.transform = `translateY(${(1 - preT) * 22}px)`; }
      if (rnRef.current) { rnRef.current.style.opacity = String(nameT); rnRef.current.style.transform = `translateY(${(1 - nameT) * 36}px) scale(${0.94 + nameT * 0.06})`; }
      if (rdRef.current) { rdRef.current.style.opacity = String(dateT); rdRef.current.style.transform = `translateY(${(1 - dateT) * 20}px)`; }
      if (cakeIllustrationRef.current) {
        const cakeT = easeOut(phase(p, 0.38, 0.72));
        cakeIllustrationRef.current.style.opacity = String(Math.max(0.15, cakeT));
        cakeIllustrationRef.current.style.transform = `translateY(${(1 - cakeT) * 28}px) scale(${0.82 + cakeT * 0.22})`;
      }
      const bgShift = p * -42;
      if (bgRef.current) bgRef.current.style.transform = `translateY(${bgShift}px)`;
      if (bgParallaxRef.current) bgParallaxRef.current.style.transform = `translateY(${bgShift * 0.55}px) scale(${1 + p * 0.04})`;
      if (stageRef.current) stageRef.current.style.opacity = String(Math.max(0.35, 1 - phase(p, 0.74, 0.94)));
    }
    window.addEventListener("scroll", render, { passive: true });
    window.addEventListener("resize", render);
    render();
    return () => { window.removeEventListener("scroll", render); window.removeEventListener("resize", render); };
  }, []);

  const submitRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;
    setRsvpLoading(true); setRsvpStatus("");
    try {
      const res = await fetch(`/api/wedding/${invitation.slug}/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guestName: rsvpName, guestPhone: rsvpPhone, attendance: rsvpAttendance === "accept" ? "ACCEPTED" : "DECLINED", message: "" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "RSVP failed");
      setRsvpStatus("Thank you! Your response has been received.");
      fireConfetti();
    } catch (err) { setRsvpStatus(err instanceof Error ? err.message : "Could not submit RSVP"); }
    finally { setRsvpLoading(false); }
  };

  const venueName = invitation.venueDetails?.name || invitation.venueName;
  const venueAddr = invitation.venueDetails?.address || invitation.venueAddress;
  const venueTime = invitation.venueDetails?.eventTime || invitation.weddingTime || "4:30 PM";
  const mapsUrl = invitation.venueDetails?.googleMapsLink || invitation.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(venueName + ", " + venueAddr)}`;
  const prelineText = invitation.invitationMessage?.preline || "We are getting married";
  const badgeInitials = brideName && groomName ? `${brideName.charAt(0)} & ${groomName.charAt(0)}`.toUpperCase() : "E & D";
  const weddingDateFormatted = new Date(invitation.weddingDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const rsvpDeadline = new Date(new Date(invitation.weddingDate).getTime() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="wedding-card-root" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Montserrat:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap');
        :root { --cream:#fdfaf6; --warm-cream:#f7f1e8; --gold:#c9a96e; --gold-dark:#b8944f; --gold-light:#e0d3b8; --blush:#e8c4b8; --blush-rose:#d4a08e; --text-dark:#2c2416; --text-medium:#5a4e3c; --text-light:#8a7d6b; --white:#ffffff; --border-subtle:#e8e0d5; --shadow-sm:0 2px 12px rgba(44,36,22,0.06); --shadow-md:0 8px 32px rgba(44,36,22,0.10); --shadow-lg:0 20px 60px rgba(44,36,22,0.15); --radius-sm:8px; --radius-md:16px; --radius-lg:24px; --radius-full:9999px; }
        *{box-sizing:border-box;margin:0;padding:0}
        html{font-size:16px}
        body{font-family:'Cormorant Garamond',serif;background:var(--cream);color:var(--text-dark);-webkit-font-smoothing:antialiased}
        .wedding-card-root #sd{height:240vh;position:relative}
        .wedding-card-root #stage{position:sticky;top:0;height:100vh;overflow:hidden;z-index:10;transform-style:preserve-3d}
        .wedding-card-root #bg{position:absolute;inset:0;padding-top:0!important;background:radial-gradient(ellipse 130% 100% at 50% 100%, #faf5ec, #f0e6d4 40%, #e8d9be 75%, #dfceb0);display:flex;flex-direction:column;align-items:center;z-index:1;will-change:transform;padding:0 20px clamp(10px,2vh,20px)}
        .wedding-card-root #bg::before{content:'';position:absolute;inset:0;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.03'/%3E%3C/svg%3E");opacity:0.7}
        .wedding-card-root #bg-parallax-layer{position:absolute;inset:-8%;pointer-events:none;z-index:0;will-change:transform}
        .bg-orb{position:absolute;border-radius:50%;filter:blur(48px);opacity:0.45;animation:orbFloat 14s ease-in-out infinite}
        .bg-orb--1{width:42vmin;height:42vmin;top:8%;left:-6%;background:radial-gradient(circle,rgba(232,196,184,0.55),transparent 70%)}
        .bg-orb--2{width:36vmin;height:36vmin;bottom:12%;right:-4%;background:radial-gradient(circle,rgba(201,169,110,0.4),transparent 70%);animation-delay:-5s}
        .bg-orb--3{width:28vmin;height:28vmin;top:42%;left:58%;background:radial-gradient(circle,rgba(255,248,235,0.5),transparent 70%);animation-delay:-9s}
        @keyframes orbFloat{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(12px,-18px) scale(1.06)}}
        .reveal-preline{font-family:'Montserrat',sans-serif;font-size:clamp(.55rem,.8vw,.75rem);letter-spacing:.38em;text-transform:uppercase;color:#9a8870}
        .reveal-names{font-family:'Great Vibes',cursive!important;font-size:clamp(3.2rem,9vw,7.5rem);color:#2c2416;font-weight:400;line-height:1.05;will-change:opacity,transform;position:relative;z-index:2;text-shadow:0 2px 30px rgba(44,36,22,.06)}
        .reveal-names .amp{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:.68em;color:#b8944f;display:inline-block;margin:0 4px}
        .reveal-date{font-family:'Montserrat',sans-serif;font-size:clamp(.55rem,.75vw,.7rem);letter-spacing:.3em;text-transform:uppercase;color:#8a7d6b;will-change:opacity,transform;position:relative;z-index:2}
        #rp,#rn,#rd{opacity:0;transform:translateY(16px)}
        #fp{position:absolute;inset:0;perspective:2200px;perspective-origin:50% 0%;pointer-events:none;z-index:5}
        #flap-group{position:absolute;inset:0;transform-origin:top center;transform-style:preserve-3d;will-change:transform;filter:drop-shadow(0 18px 40px rgba(44,36,22,.12))}
        #flap{position:absolute;inset:0;clip-path:url(#roundedTriangle);-webkit-clip-path:url(#roundedTriangle);background:linear-gradient(168deg,#fffefb,#faf6ef 10%,#f4eddd 28%,#ede3cc 52%,#e6d9bd 72%,#e0d1b2 92%,#d9c8a8);z-index:1}
        #flap-edge{position:absolute;inset:0;clip-path:url(#roundedTriangle);-webkit-clip-path:url(#roundedTriangle);pointer-events:none;z-index:3;background:transparent;box-shadow:inset 0 0 0 1px rgba(201,169,110,.22),inset 0 -2px 24px rgba(201,169,110,.08)}
        #flap-shimmer{position:absolute;inset:0;clip-path:url(#roundedTriangle);-webkit-clip-path:url(#roundedTriangle);pointer-events:none;z-index:4;background:linear-gradient(105deg,transparent 38%,rgba(255,255,255,.35) 50%,transparent 62%);background-size:220% 100%;animation:flapShimmer 6s ease-in-out infinite;opacity:.55}
        @keyframes flapShimmer{0%,100%{background-position:120% 0}50%{background-position:-20% 0}}
        #flap::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 900'%3E%3Cg fill='none' stroke='%23c9a96e' stroke-width='0.9' opacity='0.09' stroke-linecap='round'%3E%3Cellipse cx='400' cy='340' rx='130' ry='155'/%3E%3Cellipse cx='400' cy='340' rx='80' ry='100'/%3E%3Ccircle cx='400' cy='340' r='24'/%3E%3C/g%3E%3C/svg%3E");background-size:cover;background-position:center top;pointer-events:none}
        #flap::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.12),transparent 28%,rgba(44,30,10,.03) 58%,rgba(44,30,10,.09) 100%);pointer-events:none}
        .fold-left,.fold-right{position:absolute;bottom:0;height:100%;width:50%;border:none;pointer-events:none;z-index:2}
        .fold-left{left:0;background:linear-gradient(128deg,rgba(255,255,255,.08),transparent 48%);border-right:1px solid rgba(201,169,110,.14)}
        .fold-right{right:0;background:linear-gradient(232deg,rgba(255,255,255,.06),transparent 48%);border-left:1px solid rgba(180,150,110,.12)}
        .flap-tip-glow{position:absolute;left:50%;bottom:0;width:min(42vw,320px);height:min(18vw,140px);transform:translate(-50%,42%);background:radial-gradient(ellipse 80% 100% at 50% 0%,rgba(201,169,110,.2),transparent 72%);pointer-events:none;z-index:0;animation:tipPulse 4s ease-in-out infinite}
        @keyframes tipPulse{0%,100%{opacity:.5;transform:translate(-50%,42%) scale(1)}50%{opacity:.85;transform:translate(-50%,40%) scale(1.04)}}
        .reveal-names{font-family:'Great Vibes',cursive!important}
        #badge{position:absolute;bottom:clamp(10px,2vh,25px);left:50%;transform:translateX(-50%);width:clamp(120px,18vw,180px);height:clamp(120px,18vw,180px);border-radius:50%;background:radial-gradient(circle at 38% 32%,#fff4c8,#efd582 26%,#d4ad5b 55%,#ad7f31 82%,#8f6727);box-shadow:0 8px 24px rgba(120,82,32,.32),0 3px 10px rgba(80,48,12,.15),inset 0 2px 8px rgba(255,249,210,.75),inset 0 -5px 12px rgba(103,68,20,.22);display:flex;align-items:center;justify-content:center;z-index:20;will-change:transform,opacity;pointer-events:auto;cursor:default}
        #badge .mono{font-family:'Playfair Display','Cormorant Garamond',serif;font-size:clamp(1.4rem,2.5vw,2rem);font-weight:500;font-style:italic;color:rgba(255,252,235,.96);letter-spacing:.06em;text-shadow:0 1px 3px rgba(94,58,15,.38),0 0 16px rgba(255,235,150,.32);pointer-events:none;line-height:1;white-space:nowrap}
        .badge-ring-outer{position:absolute;inset:-6px;border-radius:50%;border:2px solid rgba(255,235,150,.48);animation:bPulse 2.8s ease-in-out infinite;pointer-events:none}
        .badge-ring-inner{position:absolute;inset:8px;border-radius:50%;border:1px solid rgba(255,246,185,.42);pointer-events:none}
        .badge-notch{position:absolute;inset:0;border-radius:50%;background:repeating-conic-gradient(rgba(255,250,205,.08) 0deg,transparent 8deg,transparent 16deg);pointer-events:none}
        @keyframes bPulse{0%,100%{transform:scale(1);opacity:.4}50%{transform:scale(1.22);opacity:.06}}
        .badge-scroll-label{position:absolute;top:clamp(-22px,-1vw,4px);left:50%;width:clamp(230px,32vw,330px);height:clamp(84px,10vw,122px);transform:translateX(-50%);pointer-events:none;z-index:3;animation:badgePromptFloat 3.4s ease-in-out infinite}
        .badge-scroll-label svg{display:block;width:100%;height:100%;overflow:visible}
        .badge-scroll-label text{font-family:'Montserrat',sans-serif;font-size:clamp(15px,2.1vw,21px);font-weight:500;letter-spacing:.12em;text-transform:uppercase;fill:rgba(118,96,62,.68)}
        .badge-scroll-orbit{fill:none;stroke:rgba(255,246,216,.72);stroke-width:1.1;stroke-dasharray:4 9}
        @keyframes badgePromptFloat{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(5px)}}
        #hint{position:absolute;bottom:34px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:5px;pointer-events:none;z-index:20;will-change:opacity}
        #hint span{font-family:'Montserrat',sans-serif;font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;color:rgba(140,120,90,.75)}
        .chevrons{display:flex;flex-direction:column;align-items:center;gap:-2px}
        .chev{width:18px;height:10px;opacity:0;animation:chevAnim 1.8s ease-in-out infinite}
        .chev:nth-child(1){animation-delay:0s}.chev:nth-child(2){animation-delay:.22s}.chev:nth-child(3){animation-delay:.44s}
        @keyframes chevAnim{0%{opacity:0;transform:translateY(-5px)}40%{opacity:.7}100%{opacity:0;transform:translateY(6px)}}
        .invitation-countdown{padding:90px 20px 80px;text-align:center;background:linear-gradient(180deg,#fdfaf6,#f9f2e8 30%,#f5ecdc);position:relative;overflow:hidden}
        .invitation-copy{max-width:750px;margin:0 auto 50px;font-size:1.5rem;font-weight:400;color:var(--text-dark);line-height:1.85;font-family:'Cormorant Garamond',serif;letter-spacing:.02em;text-shadow:0 1px 1px rgba(255,255,255,0.5)}
        .invitation-copy strong{font-weight:600;color:var(--gold-dark)}
        .countdown-wrapper{display:flex;justify-content:center;gap:24px;flex-wrap:wrap}
        .countdown-unit{background:var(--white);border-radius:var(--radius-lg);padding:28px 22px;min-width:100px;box-shadow:var(--shadow-sm);border:1px solid var(--border-subtle);transition:transform .3s,box-shadow .3s}
        .countdown-unit:hover{transform:translateY(-4px);box-shadow:var(--shadow-md)}
        .countdown-num{font-family:'Playfair Display',serif;font-size:3rem;font-weight:600;color:var(--gold-dark);line-height:1;display:block}
        .countdown-label{font-family:'Montserrat',sans-serif;font-size:.65rem;letter-spacing:.2em;text-transform:uppercase;color:var(--text-light);margin-top:8px;display:block}
        .love-story{padding:80px 20px;background:var(--cream);position:relative}
        .section-header{text-align:center;margin-bottom:60px}
        .section-header h2{font-family:'Playfair Display',serif;font-size:2.4rem;font-weight:500;color:var(--text-dark);letter-spacing:.04em}
        .section-header .ornament-line{display:block;width:60px;height:2px;background:var(--gold);margin:16px auto 0;border-radius:1px}
        .timeline{position:relative;max-width:700px;margin:0 auto;padding-left:40px}
        .timeline::before{content:'';position:absolute;left:18px;top:0;bottom:0;width:2px;background:linear-gradient(180deg,var(--gold-light),var(--gold),var(--gold-light));border-radius:1px}
        .timeline-item{position:relative;margin-bottom:48px;padding-left:30px}
        .timeline-item .tl-year,.timeline-item .tl-title,.timeline-item .tl-text{opacity:0;transform:translateY(20px);transition:opacity .7s,transform .7s}
        .timeline-item.visible .tl-year,.timeline-item.visible .tl-title,.timeline-item.visible .tl-text{opacity:1;transform:translateY(0)}
        .timeline-item::before{content:'';position:absolute;left:-27px;top:6px;width:14px;height:14px;background:var(--gold);border-radius:50%;border:3px solid var(--cream);box-shadow:0 0 0 3px var(--gold-light);z-index:1}
        .tl-year{font-family:'Montserrat',sans-serif;font-size:.7rem;letter-spacing:.25em;color:var(--gold-dark);text-transform:uppercase;margin-bottom:4px}
        .tl-title{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:500;color:var(--text-dark);margin-bottom:6px}
        .tl-text{color:var(--text-medium);font-size:1.05rem;line-height:1.8}
        .day-program{padding:80px 20px;background:var(--white)}
        .program-list{max-width:550px;margin:0 auto;position:relative;padding-left:50px}
        .program-list::before{content:'';position:absolute;left:22px;top:0;bottom:0;width:2px;background:var(--border-subtle);border-radius:1px}
        .program-item{position:relative;margin-bottom:36px}
        .program-item .pr-time,.program-item .pr-title,.program-item .pr-desc{opacity:0;transform:translateY(20px);transition:opacity .7s,transform .7s}
        .program-item.visible .pr-time,.program-item.visible .pr-title,.program-item.visible .pr-desc{opacity:1;transform:translateY(0)}
        .program-item::before{content:'';position:absolute;left:-34px;top:4px;width:10px;height:10px;background:var(--blush-rose);border-radius:50%;border:3px solid var(--white);box-shadow:0 0 0 3px var(--blush);z-index:1}
        .pr-time{display:inline-block;font-family:'Montserrat',sans-serif;font-size:.7rem;letter-spacing:.15em;background:var(--warm-cream);color:var(--gold-dark);padding:6px 16px;border-radius:var(--radius-full);margin-bottom:6px;font-weight:500}
        .pr-title{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:500;color:var(--text-dark);display:block}
        .pr-desc{color:var(--text-light);font-size:.95rem}
        .event-details{padding:80px 20px;background:var(--cream);text-align:center}
        .details-grid{max-width:600px;margin:0 auto 40px;display:grid;grid-template-columns:1fr 1fr;gap:20px;text-align:left}
        .detail-card{background:var(--white);padding:24px;border-radius:var(--radius-md);box-shadow:var(--shadow-sm);border:1px solid var(--border-subtle)}
        .detail-card h4{font-family:'Montserrat',sans-serif;font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold-dark);margin-bottom:8px}
        .detail-card p{color:var(--text-medium);font-size:1rem;line-height:1.6}
        .map-area{max-width:600px;margin:0 auto 30px;height:240px;background:linear-gradient(135deg,#f0e8d8,#e8dcc4 30%,#f2ece0 60%,#e5d8c0);border-radius:var(--radius-lg);position:relative;overflow:hidden;border:1px solid var(--border-subtle);box-shadow:var(--shadow-sm);cursor:pointer}
        .map-area::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 30% 40%,rgba(180,150,120,.15),transparent 60%),repeating-linear-gradient(0deg,transparent,transparent 20px,rgba(160,140,110,.06) 20px,rgba(160,140,110,.06) 21px);pointer-events:none}
        .map-area::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(200,180,155,.25) 70%,rgba(180,160,130,.35) 100%);pointer-events:none;z-index:1}
        .gift-heading{position:relative;margin-bottom:30px;text-align:center;overflow:hidden}
        .gift-heading .section-header{margin-bottom:0;position:relative;z-index:2}
        .gift-ring-stage{position:relative;height:118px;max-width:560px;margin:-18px auto 6px;display:flex;align-items:center;justify-content:center;pointer-events:none;perspective:760px}
        .wedding-ring{position:absolute;width:clamp(74px,16vw,112px);height:clamp(74px,16vw,112px);opacity:0;filter:drop-shadow(0 8px 12px rgba(118,84,36,.14))}
        .wedding-ring-left{transform:translateX(-230px) rotateY(58deg) rotateZ(-18deg) scale(.82)}
        .wedding-ring-right{transform:translateX(230px) rotateY(-58deg) rotateZ(18deg) scale(.82)}
        .gift-ring-stage.visible .wedding-ring-left{animation:ringJoinLeft 3.2s cubic-bezier(.18,.86,.23,1) forwards}
        .gift-ring-stage.visible .wedding-ring-right{animation:ringJoinRight 3.2s cubic-bezier(.18,.86,.23,1) forwards}
        .wedding-ring ellipse{fill:none;stroke:#d8bd72;stroke-width:10;stroke-linecap:round}
        .wedding-ring .ring-highlight{stroke:#fff1bd;stroke-width:3;opacity:.86}
        .wedding-ring .ring-shadow{stroke:#9c7130;stroke-width:2;opacity:.2}
        .wedding-ring .ring-gem{fill:#fff8e7;stroke:#c9a96e;stroke-width:2}
        @keyframes ringJoinLeft{0%{opacity:0;transform:translateX(-230px) rotateY(58deg) rotateZ(-18deg) scale(.82)}72%{opacity:1;transform:translateX(-28px) rotateY(-10deg) rotateZ(-13deg) scale(1.04)}100%{opacity:1;transform:translateX(-20px) rotateY(0deg) rotateZ(-12deg) scale(1)}}
        @keyframes ringJoinRight{0%{opacity:0;transform:translateX(230px) rotateY(-58deg) rotateZ(18deg) scale(.82)}72%{opacity:1;transform:translateX(28px) rotateY(10deg) rotateZ(13deg) scale(1.04)}100%{opacity:1;transform:translateX(20px) rotateY(0deg) rotateZ(12deg) scale(1)}}
        .map-pin{position:absolute;top:42%;left:48%;transform:translate(-50%,-50%);animation:pinBounce 2s ease-in-out infinite;pointer-events:none;z-index:2}
        @keyframes pinBounce{0%,100%{transform:translate(-50%,-50%) translateY(0)}50%{transform:translate(-50%,-50%) translateY(-12px)}}
        .map-address-overlay{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(255,255,255,.9);padding:8px 18px;border-radius:var(--radius-full);font-family:'Montserrat',sans-serif;font-size:.7rem;letter-spacing:.06em;color:var(--text-medium);z-index:3;pointer-events:none;box-shadow:var(--shadow-sm)}
        .action-buttons{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;max-width:500px;margin:0 auto}
        .btn{display:inline-flex;align-items:center;gap:8px;font-family:'Montserrat',sans-serif;font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;padding:14px 26px;border-radius:var(--radius-full);cursor:pointer;transition:all .3s;text-decoration:none;font-weight:500;background:transparent;color:var(--text-dark);border:none}
        .btn-primary{background:var(--gold-dark);color:white;box-shadow:0 4px 16px rgba(184,148,79,.35)}
        .btn-primary:hover{background:#a07d3a;transform:translateY(-2px)}
        .btn-outline{background:transparent;color:var(--gold-dark);border:2px solid var(--gold)}
        .btn-outline:hover{background:var(--warm-cream);border-color:var(--gold-dark);transform:translateY(-2px)}
        .gift-registry{padding:80px 20px;background:var(--white);text-align:center}
        .accordion{max-width:500px;margin:0 auto;border:1px solid var(--border-subtle);border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-sm)}
        .accordion-header{padding:18px 24px;cursor:pointer;font-family:'Montserrat',sans-serif;font-size:.8rem;letter-spacing:.15em;text-transform:uppercase;color:var(--text-medium);background:var(--warm-cream);display:flex;justify-content:space-between;align-items:center;transition:background .3s}
        .accordion-header:hover{background:#efe6d8}
        .accordion-arrow{transition:transform .4s;font-size:1.2rem;color:var(--gold-dark)}
        .accordion.open .accordion-arrow{transform:rotate(180deg)}
        .accordion-body{max-height:0;overflow:hidden;transition:max-height .5s,padding .5s;background:white;padding:0 24px}
        .accordion.open .accordion-body{max-height:300px;padding:20px 24px}
        .iban-reveal-area{background:var(--warm-cream);border-radius:var(--radius-md);padding:16px;margin-top:10px;font-family:'Montserrat',sans-serif;font-size:.7rem;word-break:break-all;display:none}
        .iban-reveal-area.show{display:block}
        .btn-iban{font-family:'Montserrat',sans-serif;font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;padding:10px 20px;border-radius:var(--radius-full);cursor:pointer;background:var(--text-dark);color:white;border:none;transition:all .3s}
        .btn-iban:hover{background:#3d3224}
        .rsvp-section{padding:80px 20px;background:var(--cream);text-align:center}
        .rsvp-deadline{font-family:'Montserrat',sans-serif;font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:var(--blush-rose);margin-bottom:30px;font-weight:500}
        .rsvp-form{max-width:480px;margin:0 auto;text-align:left}
        .form-group{margin-bottom:18px}
        .form-group label{display:block;font-family:'Montserrat',sans-serif;font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:var(--text-medium);margin-bottom:6px;font-weight:500}
        .form-group input,.form-group textarea{width:100%;padding:14px 18px;border:1px solid var(--border-subtle);border-radius:var(--radius-md);font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-style:italic;color:var(--text-dark);background:var(--white);outline:none;transition:border-color .3s,box-shadow .3s}
        .form-group input:focus,.form-group textarea:focus{border-color:var(--gold);box-shadow:0 0 0 4px rgba(201,169,110,.12)}
        .form-group input::placeholder,.form-group textarea::placeholder{font-style:italic;color:var(--text-light);opacity:0.7}
        .radio-group{display:flex;gap:12px;flex-wrap:wrap}
        .radio-option{position:relative;display:flex;align-items:center;gap:14px;cursor:pointer;padding:12px 20px 12px 46px;border:1px solid var(--border-subtle);border-radius:var(--radius-full);background:var(--white);transition:all .3s;font-family:'Cormorant Garamond',serif;font-size:1rem;font-style:italic}
        .radio-option input[type=radio]{position:absolute;opacity:0;width:0;height:0;pointer-events:none}
        .radio-option::before{content:'';position:absolute;left:18px;top:50%;transform:translateY(-50%);width:20px;height:20px;border-radius:50%;border:2px solid var(--border-subtle);background:var(--white);transition:all .3s;box-sizing:border-box}
        .radio-option:has(input:checked)::before{border-color:var(--gold-dark);background:var(--gold-dark)}
        .radio-option:has(input:checked)::after{content:'';position:absolute;left:24px;top:50%;transform:translateY(-50%);width:8px;height:8px;border-radius:50%;background:white}
        .radio-option:has(input:checked){border-color:var(--gold-dark);background:var(--warm-cream);font-weight:500}
        .btn-submit{width:100%;padding:16px;font-family:'Montserrat',sans-serif;font-size:.8rem;letter-spacing:.2em;text-transform:uppercase;background:var(--gold-dark);color:white;border:none;border-radius:var(--radius-full);cursor:pointer;transition:all .3s;margin-top:10px}
        .btn-submit:hover{background:#a07d3a;transform:translateY(-2px)}
        .btn-submit:disabled{opacity:.6;cursor:not-allowed;transform:none}
        .form-feedback{text-align:center;margin-top:16px;font-family:'Montserrat',sans-serif;font-size:.75rem;letter-spacing:.08em;color:#5a8a5a;display:none}
        .form-feedback.show{display:block}
        .footer{text-align:center;padding:40px 20px;font-family:'Montserrat',sans-serif;font-size:.65rem;letter-spacing:.15em;color:var(--text-light);background:var(--white);border-top:1px solid var(--border-subtle)}
        .cake-illustration{width:clamp(260px,40vw,460px);height:clamp(260px,40vw,460px);margin:0 auto;max-width:460px;max-height:460px;position:relative;z-index:2;will-change:transform,opacity}
        .cake-illustration::before{content:none}
        @keyframes cakeGlow{0%,100%{opacity:.7;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}
        #confetti-canvas{position:fixed;inset:0;z-index:99999;pointer-events:none;opacity:0;transition:opacity .2s}
        @media (max-width:768px){
          .wedding-card-root #sd{height:210vh}
          .wedding-card-root #bg{padding-inline:14px}
          .reveal-preline{font-size:.52rem;letter-spacing:.24em;text-align:center}
          .reveal-names{font-size:clamp(3rem,15vw,4.8rem);line-height:.98;text-align:center;max-width:96vw}
          .reveal-date{font-size:.52rem;letter-spacing:.16em;line-height:1.7;text-align:center;max-width:86vw}
          #badge{width:clamp(104px,32vw,132px);height:clamp(104px,32vw,132px);bottom:clamp(16px,5vh,42px)}
          #badge .mono{font-size:clamp(1.15rem,5.2vw,1.55rem)}
          .badge-scroll-label{top:clamp(-18px,-2vw,10px);width:clamp(190px,68vw,250px);height:clamp(76px,24vw,100px)}
          .badge-scroll-label text{font-size:clamp(13px,4.4vw,17px);letter-spacing:.09em}
          .main-content > div:first-child{margin-top:clamp(-280px,-66vw,-220px)!important;margin-bottom:clamp(-56px,-15vw,-34px)!important}
          .cake-illustration{width:clamp(250px,78vw,330px)!important;height:clamp(250px,78vw,330px)!important;max-width:330px;max-height:330px}
          #cake3dContainer{width:100%;height:100%;overflow:visible}
          .invitation-countdown,.love-story,.day-program,.event-details,.gift-registry,.rsvp-section{padding-block:64px}
          .section-header{margin-bottom:38px}
          .section-header h2{font-size:clamp(1.9rem,9vw,2.25rem)}
          .map-area{height:210px;border-radius:18px}
          .gift-heading{margin-bottom:18px}
          .gift-ring-stage{height:96px;margin:-14px auto 0;max-width:92vw}
          .wedding-ring{width:clamp(68px,24vw,92px);height:clamp(68px,24vw,92px)}
          .wedding-ring-left{transform:translateX(-160px) rotateY(58deg) rotateZ(-18deg) scale(.82)}
          .wedding-ring-right{transform:translateX(160px) rotateY(-58deg) rotateZ(18deg) scale(.82)}
          .countdown-wrapper{gap:12px}
          .countdown-unit{padding:18px 14px;min-width:70px}
          .countdown-num{font-size:2rem}
          .invitation-copy{font-size:1.2rem}
          .details-grid{grid-template-columns:1fr}
          .action-buttons{flex-direction:column;align-items:center}
          .btn{width:100%;justify-content:center;max-width:300px}
          .radio-group{flex-direction:column}
          .radio-option{width:100%}
          .timeline{padding-left:28px}.timeline::before{left:12px}.timeline-item::before{left:-22px}
          .program-list{padding-left:36px}.program-list::before{left:15px}.program-item::before{left:-26px}
        }
        @media (max-width:420px){
          .countdown-unit{min-width:64px;padding:16px 10px}
          .countdown-num{font-size:1.75rem}
          .countdown-label{font-size:.56rem;letter-spacing:.14em}
          .invitation-copy{font-size:1.08rem;line-height:1.75}
          .detail-card{padding:20px}
          .map-address-overlay{max-width:86%;white-space:normal;line-height:1.35}
          .footer{font-size:.58rem;line-height:1.8}
        }
      `}</style>

      <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }} aria-hidden="true">
        <defs>
          <clipPath id="roundedTriangle" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 1,0 L 1,0.7 Q 0.85,0.76 0.65,0.84 Q 0.5,0.89 0.35,0.84 Q 0.15,0.76 0,0.7 Z" />
          </clipPath>
        </defs>
      </svg>

      <div id="sd" ref={driverRef}>
        <div id="stage" ref={stageRef}>
          <div id="bg" ref={bgRef}>
            <div id="bg-parallax-layer" ref={bgParallaxRef} aria-hidden="true">
              <span className="bg-orb bg-orb--1"></span>
              <span className="bg-orb bg-orb--2"></span>
              <span className="bg-orb bg-orb--3"></span>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", minHeight: 0, padding: "clamp(40px,8vh,80px) 20px" }}>
              <p className="reveal-preline" id="rp" ref={rpRef}>{prelineText}</p>
              <h1 className="reveal-names" id="rn" ref={rnRef}>
                {brideName} <span className="amp">&</span> {groomName}
              </h1>
              <p className="reveal-date" id="rd" ref={rdRef}>
                {weddingDateFormatted} &nbsp;·&nbsp; {venueName}
              </p>
            </div>
          </div>
          <div id="fp">
            <div id="flap-group" ref={flapGroupRef}>
              <div className="flap-tip-glow" aria-hidden="true"></div>
              <div id="flap">
                <div className="fold-left"></div>
                <div className="fold-right"></div>
                <div id="flap-edge" aria-hidden="true"></div>
                <div id="flap-shimmer" aria-hidden="true"></div>
              </div>
              <div id="badge" ref={badgeRef}>
                <div className="badge-scroll-label" aria-hidden="true">
                  <svg viewBox="0 0 260 120">
                    <defs>
                      <path id="scrollArc" d="M 18,82 A 112,112 0 0,1 242,82" fill="none" />
                    </defs>
                    <path className="badge-scroll-orbit" d="M 18,82 A 112,112 0 0,1 242,82" />
                    <text textAnchor="middle">
                      <textPath href="#scrollArc" startOffset="50%">SCROLL TO OPEN</textPath>
                    </text>
                  </svg>
                </div>
                <div className="badge-notch"></div>
                <div className="badge-ring-outer"></div>
                <div className="badge-ring-inner"></div>
                <span className="mono">{badgeInitials}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main-content" id="mainContent">
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 5, marginTop: "clamp(-370px,-35vw,-500px)", marginBottom: "clamp(-80px,-10vw,-140px)", pointerEvents: "none" }}>
          <div className="cake-illustration" ref={cakeIllustrationRef} style={{ width: "clamp(250px,38vw,430px)", height: "clamp(250px,38vw,430px)", margin: 0, opacity: 0 }}>
            <div id="cake3dContainer"><Cake3D /></div>
          </div>
        </div>

        <section className="invitation-countdown parallax-section" id="invitationSection">
          <p className="invitation-copy">
            {invitation.invitationMessage?.message ? (
              invitation.invitationMessage.message.split("\n").map((line, i) => (<span key={i}>{line}<br /></span>))
            ) : (
              <>Together with their families,<br /><strong>{brideName}</strong> & <strong>{groomName}</strong><br />request the pleasure of your company<br />as they exchange vows and celebrate their union.</>
            )}
          </p>
          <div className="countdown-wrapper" id="countdown">
            <div className="countdown-unit"><span className="countdown-num">{String(countdown.days).padStart(2, "0")}</span><span className="countdown-label">Days</span></div>
            <div className="countdown-unit"><span className="countdown-num">{String(countdown.hours).padStart(2, "0")}</span><span className="countdown-label">Hours</span></div>
            <div className="countdown-unit"><span className="countdown-num">{String(countdown.minutes).padStart(2, "0")}</span><span className="countdown-label">Minutes</span></div>
            <div className="countdown-unit"><span className="countdown-num">{String(countdown.seconds).padStart(2, "0")}</span><span className="countdown-label">Seconds</span></div>
          </div>
        </section>

        {invitation.loveStories.length > 0 && (
          <section className="love-story parallax-section" id="loveStory">
            <div className="section-header"><h2>Our Love Story</h2><span className="ornament-line"></span></div>
            <div className="timeline">
              {invitation.loveStories.map((story) => (
                <div key={story.id} className="timeline-item" data-animate>
                  <div className="tl-year">{story.year}</div>
                  <div className="tl-title">{story.title}</div>
                  <p className="tl-text">{story.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {invitation.programItems.length > 0 && (
          <section className="day-program parallax-section" id="dayProgram">
            <div className="section-header"><h2>The Day's Program</h2><span className="ornament-line"></span></div>
            <div className="program-list">
              {invitation.programItems.map((item) => (
                <div key={item.id} className="program-item" data-animate>
                  <span className="pr-time">{item.time}</span>
                  <strong className="pr-title">{item.title}</strong>
                  {item.description && <p className="pr-desc">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="event-details parallax-section" id="eventDetails">
          <div className="section-header"><h2>Venue & Details</h2><span className="ornament-line"></span></div>
          <div className="details-grid">
            <div className="detail-card"><h4>Location</h4><p>{venueName}<br />{venueAddr}</p></div>
            <div className="detail-card"><h4>Date & Time</h4><p>{weddingDateFormatted}<br />{venueTime}</p></div>
          </div>
          <div className="map-area" onClick={() => { window.open(mapsUrl, "_blank"); fireConfetti(); }}>
            <div className="map-pin">
              <svg viewBox="0 0 44 56" width="36" height="46">
                <path d="M22 0C10 0 0 9.5 0 22c0 16 22 34 22 34s22-18 22-34C44 9.5 34 0 22 0z" fill="#c9a96e" stroke="#8b6f3a" strokeWidth="2" />
                <circle cx="22" cy="20" r="8" fill="white" />
              </svg>
            </div>
            <div className="map-address-overlay">{venueName}</div>
          </div>
          <div className="action-buttons">
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="btn btn-primary" onClick={() => fireConfetti()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><circle cx="12" cy="10" r="4" /><path d="M12 2v4M12 14v8M2 10h4M18 10h4" /></svg>
              Open in Maps
            </a>
            <a href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(brideName + " & " + groomName + " Wedding")}`} target="_blank" rel="noreferrer" className="btn btn-outline" onClick={() => fireConfetti()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><rect x="3" y="4" width="18" height="18" rx="3" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              Add to Calendar
            </a>
          </div>
        </section>

        <section className="gift-registry parallax-section" id="giftRegistry">
          <div className="gift-heading">
            <div className="section-header"><h2>Gift Registry</h2></div>
            <div className="gift-ring-stage" data-animate aria-hidden="true">
              <svg className="wedding-ring wedding-ring-left" viewBox="0 0 120 120">
                <ellipse cx="60" cy="66" rx="34" ry="42" />
                <ellipse className="ring-highlight" cx="54" cy="58" rx="25" ry="32" />
                <path className="ring-shadow" d="M34 86c12 13 40 17 56-7" fill="none" />
                <circle className="ring-gem" cx="60" cy="18" r="8" />
              </svg>
              <svg className="wedding-ring wedding-ring-right" viewBox="0 0 120 120">
                <ellipse cx="60" cy="66" rx="34" ry="42" />
                <ellipse className="ring-highlight" cx="66" cy="58" rx="25" ry="32" />
                <path className="ring-shadow" d="M30 80c16 22 52 20 62-4" fill="none" />
                <circle className="ring-gem" cx="60" cy="18" r="8" />
              </svg>
            </div>
          </div>
          <div className={`accordion ${accordionOpen ? "open" : ""}`}>
            <div className="accordion-header" onClick={() => { setAccordionOpen((p) => !p); if (!accordionOpen) fireConfetti(); }}>
              <span>Contribution</span><span className="accordion-arrow">▾</span>
            </div>
            <div className="accordion-body">
              <p style={{ marginBottom: 16, color: "#5a4e3c", fontSize: "1.05rem", lineHeight: 1.7 }}>
                Your presence is the greatest gift. Should you wish to contribute, details are below.
              </p>
              <button className="btn-iban" onClick={() => setShowIban((p) => !p)}>
                {showIban ? "Hide IBAN" : "Show IBAN"}
              </button>
              <div className={`iban-reveal-area ${showIban ? "show" : ""}`}>
                FR76 3000 4000 0100 0000 1234 567<br />BIC: BNPAFRPPXXX
              </div>
            </div>
          </div>
        </section>

        <section className="rsvp-section parallax-section" id="rsvpSection">
          <div className="section-header"><h2>R&eacute;pondez S'il Vous Pla&icirc;t</h2><span className="ornament-line"></span></div>
          <p className="rsvp-deadline">Kindly respond by {rsvpDeadline}</p>
          <form className="rsvp-form" id="rsvpForm" onSubmit={submitRsvp}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" placeholder="Your full name" required value={rsvpName} onChange={(e) => setRsvpName(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number (optional)</label>
              <input type="tel" id="phone" placeholder="Your phone number" value={rsvpPhone} onChange={(e) => setRsvpPhone(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Attendance</label>
              <div className="radio-group">
                <label className="radio-option"><input type="radio" name="attendance" value="accept" checked={rsvpAttendance === "accept"} onChange={() => setRsvpAttendance("accept")} />Joyfully Accept</label>
                <label className="radio-option"><input type="radio" name="attendance" value="decline" checked={rsvpAttendance === "decline"} onChange={() => setRsvpAttendance("decline")} />Regretfully Decline</label>
              </div>
            </div>
            <button type="submit" className="btn-submit" disabled={rsvpLoading}>{rsvpLoading ? "Sending..." : "Send Response"}</button>
            {rsvpStatus && <p className="form-feedback show" id="formFeedback">{rsvpStatus}</p>}
          </form>
        </section>

        <footer className="footer">
          <p>Radiance Event Planning &bull; Addis Ababa, Ethiopia &bull; 2026 &bull; Crafted with love</p>
        </footer>
      </div>

      <canvas id="confetti-canvas" ref={confettiCanvasRef}></canvas>
    </div>
  );
}
