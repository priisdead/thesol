import React, { useState, useEffect } from "react";
import SampleKitRequest from "../components/SampleKitRequest";
import LogoLoop from "../components/LogoLoop/LogoLoop";
import HeroCone3D from "../components/HeroCone3D";

// Shared keyframes + placement styles for the cartoon cig illustrations
const ILL_KEYFRAMES = `
  @keyframes illFloat { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-6px) } }
  @keyframes illPulse { 0%,100%{ transform: scale(1); opacity: .9 } 50%{ transform: scale(1.05); opacity: 1 } }
  @keyframes wispRise { 0%{ opacity:0; transform: translate(0,4px) scale(.8) } 30%{ opacity:.8 } 100%{ opacity:0; transform: translate(4px,-10px) scale(1.25) } }
  .ill-accent { position: absolute; z-index: 1; pointer-events: none; opacity: 0.9; }
  .ill-accent svg { animation: illFloat 6s ease-in-out infinite; display: block; }
  .ill-accent .ill-cloud { transform-box: fill-box; transform-origin: center; animation: illPulse 5s ease-in-out infinite; }
  .ill-accent .wisp { transform-box: fill-box; transform-origin: bottom; animation: wispRise 3s ease-out infinite; }
  @media (max-width: 820px) { .ill-accent { display: none; } }
`;

// Lit cigarette blowing a fluffy smoke cloud
function CigCloud({ width = 150 }) {
  return (
    <svg width={width} viewBox="0 0 170 140" fill="none" aria-hidden="true">
      <g className="ill-cloud" opacity="0.95">
        <circle cx="96" cy="40" r="19" fill="#e9eef2" />
        <circle cx="120" cy="36" r="15" fill="#e9eef2" />
        <circle cx="134" cy="52" r="13" fill="#e3e9ee" />
        <circle cx="114" cy="56" r="16" fill="#e3e9ee" />
        <circle cx="92" cy="58" r="14" fill="#dbe3e8" />
        <circle cx="76" cy="47" r="12" fill="#dbe3e8" />
      </g>
      <path d="M70 96 C 78 82, 68 76, 78 66" stroke="#b9c2c8" strokeWidth="2.6" strokeLinecap="round" fill="none" opacity="0.75" />
      <g transform="rotate(-22 45 104)">
        <rect x="8" y="96" width="86" height="15" rx="7.5" fill="#f2f0ea" stroke="#c6ccd4" strokeWidth="1.5" />
        <path d="M8 103.5 a7.5 7.5 0 0 1 7.5 -7.5 h16 v15 h-16 a7.5 7.5 0 0 1 -7.5 -7.5 z" fill="#d8b26a" />
        <line x1="31.5" y1="96.5" x2="31.5" y2="110.5" stroke="#b98f4d" strokeWidth="1.3" />
        <rect x="88" y="96" width="6" height="15" rx="3" fill="#3a2f28" />
        <circle cx="94" cy="103.5" r="3.6" fill="#ff7a2a" />
        <circle cx="94" cy="103.5" r="1.7" fill="#ffd27a" />
      </g>
    </svg>
  );
}

// Cute cigarette character with a smiling face
function CigChar({ width = 74 }) {
  return (
    <svg width={width} viewBox="0 0 90 150" fill="none" aria-hidden="true">
      <g className="wisp">
        <circle cx="46" cy="26" r="4" fill="#dbe3e8" />
        <circle cx="51" cy="22" r="3" fill="#dbe3e8" />
        <circle cx="42" cy="22" r="2.6" fill="#dbe3e8" />
      </g>
      <path d="M45 44 C 50 36, 42 32, 48 26" stroke="#b9c2c8" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.7" />
      <rect x="33" y="42" width="24" height="92" rx="12" fill="#f2f0ea" stroke="#c6ccd4" strokeWidth="1.6" />
      <path d="M33 122 a12 12 0 0 0 12 12 h0 a12 12 0 0 0 12 -12 v-12 h-24 z" fill="#d8b26a" />
      <line x1="33" y1="110" x2="57" y2="110" stroke="#b98f4d" strokeWidth="1.4" />
      <rect x="33" y="42" width="24" height="7" rx="3.5" fill="#3a2f28" />
      <circle cx="40" cy="66" r="2.1" fill="#2a2f3a" />
      <circle cx="50" cy="66" r="2.1" fill="#2a2f3a" />
      <path d="M40 72 Q45 76 50 72" stroke="#2a2f3a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <circle cx="37" cy="71" r="2.2" fill="#ff9db0" opacity="0.6" />
      <circle cx="53" cy="71" r="2.2" fill="#ff9db0" opacity="0.6" />
    </svg>
  );
}

// Lit cigarette with a thin curling smoke wisp
function CigWisp({ width = 140 }) {
  return (
    <svg width={width} viewBox="0 0 160 120" fill="none" aria-hidden="true">
      <path d="M104 74 C 112 62, 100 56, 110 46 C 118 38, 108 32, 116 24" stroke="#b9c2c8" strokeWidth="2.6" strokeLinecap="round" fill="none" opacity="0.8" />
      <g transform="rotate(-8 80 88)">
        <rect x="14" y="82" width="90" height="15" rx="7.5" fill="#f2f0ea" stroke="#c6ccd4" strokeWidth="1.5" />
        <path d="M14 89.5 a7.5 7.5 0 0 1 7.5 -7.5 h18 v15 h-18 a7.5 7.5 0 0 1 -7.5 -7.5 z" fill="#d8b26a" />
        <line x1="39.5" y1="82.5" x2="39.5" y2="96.5" stroke="#b98f4d" strokeWidth="1.3" />
        <rect x="98" y="82" width="6" height="15" rx="3" fill="#3a2f28" />
        <circle cx="104" cy="89.5" r="3.6" fill="#ff7a2a" />
        <circle cx="104" cy="89.5" r="1.7" fill="#ffd27a" />
      </g>
    </svg>
  );
}

export default function Home({ setRoute, setProductDetailId }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  // Hero cone paper color options (shown as swatches on the 3D cone)
  const coneSwatches = [
    { name: "Black", paper: "#141416", crutch: "#f3efe6" },
  ];
  const [cone, setCone] = useState(coneSwatches[0]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) * 0.03;
    const y = (clientY - window.innerHeight / 2) * 0.03;
    setParallax({ x, y });
  };

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  const navigateTo = (route) => {
    setRoute(route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Partner/producer logos shown in the trusted-by logo loop.
  const partnerLogos = [
    { src: "/images/logos/acreage.png", alt: "Acreage" },
    { src: "/images/logos/awh.png", alt: "AWH" },
    { src: "/images/logos/cannapiece.png", alt: "CannaPiece" },
    { src: "/images/logos/cannara.jpg", alt: "Cannara" },
    { src: "/images/logos/cronos.jpg", alt: "Cronos" },
    { src: "/images/logos/evermore.jpg", alt: "Evermore" },
    { src: "/images/logos/gardengreens.png", alt: "Garden Greens" },
    { src: "/images/logos/hempsupply.jpg", alt: "Hemp Supply" },
    { src: "/images/logos/motif.png", alt: "Motif" },
    { src: "/images/logos/og.jpg", alt: "OG" },
    { src: "/images/logos/origine_nature.png", alt: "Origine Nature" },
    { src: "/images/logos/partake.png", alt: "Partake" },
    { src: "/images/logos/sitika.jpg", alt: "Sitika" },
    { src: "/images/logos/truro.jpg", alt: "Truro" },
    { src: "/images/logos/weedme.jpg", alt: "WeedMe" },
  ];

  const faqData = [
    {
      q: "What is your Minimum Order Quantity (MOQ) for custom-branded cones?",
      a: "Our standard MOQ for custom branded cones (logo printed on crutch or custom watermarked paper) is 20,000 cones per size/material option. For unbranded bulk cases, our MOQ starts at 5,000 cones.",
    },
    {
      q: "Are SOL papers tested for heavy metals and pesticides?",
      a: "Yes. Every single batch of raw paper and completed pre-rolled cones is third-party lab tested by ISO-17025 accredited facilities. We certify zero presence of heavy metals, pesticides, microplastics, and chlorine bleach. Comprehensive lab certificates are provided with every order.",
    },
    {
      q: "What are your standard manufacturing lead times?",
      a: "For in-stock bulk items, shipping occurs within 1-2 business days from our US or EU hubs. For custom OEM printing and custom packaging, lead times range from 4 to 6 weeks, which includes setup, printing, rolling, QA inspection, and customs clearance.",
    },
    {
      q: "Can you match custom sizes and custom paper watermarks?",
      a: "Absolutely. We can manufacture pre-rolled cones to exact proprietary specifications, including custom lengths, custom taper angles, and varying crutch sizes (e.g. 26mm vs 30mm). We can also apply custom embossed watermarks to the paper for premium brand identity.",
    },
    {
      q: "How do you control moisture content during transit?",
      a: "We calibrate all pre-rolled cones to an optimal 10%-12% relative moisture content during manufacturing to prevent paper splitting and crutch collapse. Shipments are packaged in hermetically sealed inner barriers with pharmaceutical-grade moisture control packets.",
    },
  ];

  return (
    <div className="page-wrapper home-page">
      <style>{ILL_KEYFRAMES}</style>
      {/* Immersive Cinematic Hero Section */}
      <section className="hero-section" onMouseMove={handleMouseMove}>
        {/* Volumetric ambient background rays */}
        <div className="hero-light-beams">
          <div className="beam beam-1"></div>
          <div className="beam beam-2"></div>
        </div>
        <div className="hero-glow-effect"></div>
        <div className="hero-container">
          <span className="hero-badge animate-glowing">GLOBAL B2B MANUFACTURING PARTNER</span>
          
          <div className="hero-content-wrapper">
            <h1 className="hero-title">
              MANUFACTURING, <br />
              MADE SEAMLESS.
            </h1>
            <p className="hero-subtitle">
              From sourcing and production to packaging and delivery, we simplify manufacturing so your brand can scale with confidence.
            </p>
          </div>

          {/* Cinematic Product Showcase — image with gradual blur */}
          <div className={`hero-product-showcase ${loaded ? "is-loaded" : ""}`}>
            <div className="hero-bg-typography">SOL</div>

            <div
              className="hero-cone-stage"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "640px",
                height: "clamp(420px, 56vh, 600px)",
                margin: "0 auto 24px",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid rgba(120,170,255,0.14)",
                boxShadow: "0 30px 90px rgba(10,40,90,0.45)"
              }}
            >
              <HeroCone3D paperColor={cone.paper} crutchColor={cone.crutch} showLogo />

              {/* Paper color swatches (only shown when there's a choice) */}
              {coneSwatches.length > 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "20px",
                    transform: "translateY(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    zIndex: 2
                  }}
                >
                  {coneSwatches.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => setCone(s)}
                      title={s.name}
                      aria-label={`${s.name} paper`}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        background: s.paper,
                        cursor: "pointer",
                        padding: 0,
                        border: cone.name === s.name ? "2px solid #bcd4ff" : "2px solid rgba(255,255,255,0.35)",
                        boxShadow: cone.name === s.name ? "0 0 0 4px rgba(120,170,255,0.22)" : "none",
                        transition: "all 0.2s ease"
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Interaction hint */}
              <span
                style={{
                  position: "absolute",
                  right: "20px",
                  bottom: "16px",
                  zIndex: 2,
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(188,212,255,0.6)",
                  fontFamily: "var(--font-mono, monospace)",
                  pointerEvents: "none"
                }}
              >
                Move cursor to interact
              </span>

              {/* Corner label */}
              <span
                style={{
                  position: "absolute",
                  left: "22px",
                  bottom: "16px",
                  zIndex: 2,
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#fff",
                  fontWeight: 600,
                  textShadow: "0 2px 12px rgba(0,0,0,0.6)"
                }}
              >
                SOL France · Pre-Rolled Cones
              </span>
            </div>
          </div>

          {/* Hero Metrics */}
          <div className="hero-metrics-grid">
            <div className="metric-card">
              <h3>2.5B+</h3>
              <p>Cones rolled since inception</p>
            </div>
            <div className="metric-card">
              <h3>GMP</h3>
              <p>Certified cleanroom environments</p>
            </div>
            <div className="metric-card">
              <h3>1★</h3>
              <p>Star Export House</p>
            </div>
            <div className="metric-card">
              <h3>DUNS</h3>
              <p>Certified</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="intro-section section-padding">
        <div className="container">
          <style>{`
            .intro-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 60px; align-items: center; max-width: 1180px; margin: 0 auto; }
            @media (max-width: 940px) {
              .intro-grid { grid-template-columns: 1fr; gap: 44px; }
              .intro-grid .intro-visual { max-width: 480px; }
            }
          `}</style>
          <div className="intro-grid">
            <div className="intro-text reveal-on-scroll reveal-scale reveal-blur" style={{ textAlign: "left" }}>
              <span className="section-badge">WHY SOL</span>
              <h2 className="section-title" style={{ fontSize: "52px", letterSpacing: "-0.03em", marginBottom: "32px" }}>PRECISION WITHOUT COMPROMISE</h2>
              <p className="section-desc" style={{ fontSize: "17px", lineHeight: "1.8", color: "var(--color-text-secondary)", marginBottom: "24px" }}>
                At SOL, we treat the pre-roll cone not as an afterthought, but as an engineered delivery system. A fraction of a millimeter difference in taper, paper weight, or crutch placement can cause auto-packing machines to fail and cones to run or canoe.
              </p>
              <p className="section-desc" style={{ fontSize: "17px", lineHeight: "1.8", color: "var(--color-text-secondary)", marginBottom: "36px" }}>
                We own and operate our entire supply chain—from raw organic crop sourcing in Western Europe to custom GMP-cleanroom hand-rolling and packaging. This vertical integration is why MSOs and independent operators trust SOL to represent their brand.
              </p>
              <div className="sol-process-cta" style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <style>{`
                  @keyframes puffBob { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-4px) } }
                  @keyframes puffRise {
                    0%   { opacity: 0; transform: translate(0px,0px) scale(0.4); }
                    22%  { opacity: 0.9; }
                    100% { opacity: 0; transform: translate(7px,-18px) scale(1.7); }
                  }
                  .puff-mascot { animation: puffBob 3s ease-in-out infinite; transform-origin: center bottom; overflow: visible; }
                  .puff-mascot .puff { transform-box: fill-box; transform-origin: center; animation: puffRise 2.6s ease-out infinite; }
                  .puff-mascot .puff.p2 { animation-delay: 1.3s; }
                `}</style>
                <svg className="puff-mascot" width="64" height="78" viewBox="0 0 72 88" fill="none" aria-hidden="true">
                  {/* legs */}
                  <path d="M31 58 L24 78" stroke="#dfe4ee" strokeWidth="2.6" strokeLinecap="round" />
                  <path d="M31 58 L38 78" stroke="#dfe4ee" strokeWidth="2.6" strokeLinecap="round" />
                  {/* body */}
                  <path d="M31 38 V59" stroke="#dfe4ee" strokeWidth="2.6" strokeLinecap="round" />
                  {/* left arm */}
                  <path d="M31 44 L20 51" stroke="#dfe4ee" strokeWidth="2.6" strokeLinecap="round" />
                  {/* right arm raised, holding the cone up to its mouth */}
                  <path d="M31 44 L44 34" stroke="#dfe4ee" strokeWidth="2.6" strokeLinecap="round" />
                  {/* little pre-roll cone in hand */}
                  <path d="M43 35 L50 26" stroke="#f3efe6" strokeWidth="4.2" strokeLinecap="round" />
                  <circle cx="50.5" cy="25.5" r="1.7" fill="#ff7a2a" />
                  {/* head */}
                  <circle cx="31" cy="24" r="12" fill="#12161d" stroke="#dfe4ee" strokeWidth="2.4" />
                  {/* eyes */}
                  <circle cx="27" cy="23" r="1.7" fill="#dfe4ee" />
                  <circle cx="35" cy="23" r="1.7" fill="#dfe4ee" />
                  {/* cheeks */}
                  <circle cx="24.5" cy="27.5" r="2.2" fill="#ff9db0" opacity="0.65" />
                  <circle cx="37.5" cy="27.5" r="2.2" fill="#ff9db0" opacity="0.65" />
                  {/* happy little smile */}
                  <path d="M28 28 Q31 31 34 28" stroke="#dfe4ee" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                  {/* cute puffs rising from the cone */}
                  <g className="puff">
                    <circle cx="52" cy="20" r="3.1" fill="#d6ead9" />
                    <circle cx="55" cy="18" r="2.3" fill="#d6ead9" />
                    <circle cx="49.5" cy="18.5" r="2.1" fill="#d6ead9" />
                  </g>
                  <g className="puff p2">
                    <circle cx="52" cy="20" r="2.6" fill="#c9e6cf" />
                    <circle cx="54.5" cy="18.5" r="2.0" fill="#c9e6cf" />
                    <circle cx="50" cy="18.5" r="1.8" fill="#c9e6cf" />
                  </g>
                </svg>
                <button onClick={() => navigateTo("facilities")} className="btn btn-silver" style={{ padding: "16px 36px" }}>
                  DISCOVER THE SOL PROCESS
                </button>
              </div>
            </div>

            {/* Company process visual */}
            <div className="intro-visual reveal-on-scroll" style={{ position: "relative" }}>
              <div
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: "0 34px 90px rgba(0,0,0,0.5)",
                  aspectRatio: "4 / 5"
                }}
              >
                <img
                  src="/images/facility/facility-rolling.jpg"
                  alt="SOL GMP-cleanroom hand-rolling process"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.78) 100%)",
                    pointerEvents: "none"
                  }}
                />
                <div style={{ position: "absolute", left: "22px", bottom: "20px" }}>
                  <span
                    style={{
                      display: "inline-block",
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "11px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#A5D6A7",
                      marginBottom: "8px"
                    }}
                  >
                    Our Process
                  </span>
                  <div style={{ color: "#fff", fontSize: "16px", fontWeight: 600, lineHeight: 1.4, maxWidth: "300px" }}>
                    Hand-rolled in GMP-certified cleanrooms
                  </div>
                </div>
              </div>

              {/* Floating stat badge */}
              <div
                style={{
                  position: "absolute",
                  top: "18px",
                  right: "18px",
                  background: "rgba(12,17,24,0.82)",
                  border: "1px solid rgba(120,170,255,0.18)",
                  borderRadius: "14px",
                  padding: "12px 18px",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)"
                }}
              >
                <div style={{ fontSize: "22px", fontWeight: 700, color: "#fff", lineHeight: 1 }}>2.5B+</div>
                <div style={{ fontSize: "10.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginTop: "4px" }}>
                  Cones rolled
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us section-padding bg-darker" style={{ position: "relative", overflow: "hidden" }}>
        <div className="ill-accent" style={{ top: "26px", right: "30px" }}><CigCloud width={150} /></div>
        <div className="container">
          <div className="text-center-wrapper reveal-on-scroll">
            <span className="section-badge">CRAFT DEFINTION</span>
            <h2 className="section-title">THE SOL ADVANTAGE</h2>
            <p className="section-subtitle-center">
              We design and manufacture to meet the stringent demands of commercial pre-roll operations.
            </p>
          </div>

          <div className="advantage-grid">
            <div className="advantage-card reveal-on-scroll">
              <div className="card-icon-wrap">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h4>Industrial-Grade Sorting</h4>
              <p>Every single pre-roll cone is camera-inspected for shape consistency, ensuring a 99.9% auto-packing machine compatibility rate.</p>
            </div>

            <div className="advantage-card reveal-on-scroll">
              <div className="card-icon-wrap">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h4>GMP Certified Cleanrooms</h4>
              <p>Our rolling, folding, and final packing lines operate under strict Class 100,000 cleanroom regulations to prevent dust and biological contamination.</p>
            </div>

            <div className="advantage-card reveal-on-scroll">
              <div className="card-icon-wrap">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h4>Chemical & Bleach Free</h4>
              <p>We use natural, chlorine-free wood pulp, organic hemp, and food-grade vegetable dyes. Zero chemical additives or artificial burn accelerators.</p>
            </div>

            <div className="advantage-card reveal-on-scroll">
              <div className="card-icon-wrap">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h4>Direct Supply Chain</h4>
              <p>By owning our production facilities, we bypass brokers and trading agents, ensuring consistent B2B pricing and secure lead times.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Kit Request Block */}
      <section className="sample-kit-cta section-padding" style={{ position: "relative", overflow: "hidden" }}>
        <div className="ill-accent" style={{ top: "28px", left: "34px" }}><CigChar width={70} /></div>
        <div className="container reveal-on-scroll">
          <div className="text-center-wrapper" style={{ marginBottom: "48px" }}>
            <span className="section-badge">SAMPLE PROGRAM</span>
            <h2 className="section-title">WANT OUR SAMPLES?</h2>
            <p className="section-subtitle-center">
              Request a complimentary evaluation kit and judge the craftsmanship firsthand — free for licensed operators and established brands worldwide.
            </p>
          </div>
          <SampleKitRequest />
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section section-padding bg-darker">
        <div className="container">
          <div className="text-center-wrapper reveal-on-scroll">
            <span className="section-badge">ENTERPRISE VOICES</span>
            <h2 className="section-title">TRUSTED BY LEADING PRODUCERS</h2>
          </div>

          <div style={{ position: "relative", marginTop: "56px" }}>
            <LogoLoop
              logos={partnerLogos}
              speed={70}
              direction="left"
              logoHeight={60}
              gap={36}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#080808"
              ariaLabel="Trusted by leading producers"
              renderItem={(item) => (
                <div
                  style={{
                    height: "60px",
                    padding: "0 22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#ffffff",
                    borderRadius: "10px"
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    style={{ height: "34px", width: "auto", objectFit: "contain", display: "block" }}
                  />
                </div>
              )}
            />
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="faq-section section-padding" style={{ position: "relative", overflow: "hidden" }}>
        <div className="ill-accent" style={{ bottom: "26px", right: "36px" }}><CigWisp width={140} /></div>
        <div className="container max-width-md">
          <div className="text-center-wrapper reveal-on-scroll">
            <span className="section-badge">SUPPORT CENTER</span>
            <h2 className="section-title">FREQUENTLY ASKED QUESTIONS</h2>
          </div>

          <div className="faq-accordion reveal-on-scroll">
            {faqData.map((faq, index) => (
              <div key={index} className={`faq-item ${activeFaq === index ? "active" : ""}`}>
                <button className="faq-trigger" onClick={() => toggleFaq(index)}>
                  <span>{faq.q}</span>
                  <span className="faq-icon-arrow">{activeFaq === index ? "−" : "+"}</span>
                </button>
                <div className="faq-content">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
