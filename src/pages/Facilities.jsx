import React from "react";

export default function Facilities() {
  const qcSteps = [
    {
      title: "Incoming Fiber Audit",
      desc: "Before a single roll of paper is loaded onto our cutting lines, raw reels are tested for thickness uniformity, tensile strength, and relative humidity. Any reels showing moisture variance above 1% are immediately quarantined."
    },
    {
      title: "Automated Visual Inspection",
      desc: "Our automated rolling and folding lines are equipped with 4K camera arrays. These systems analyze the geometric taper, crown diameter, and seam seal lines of every single cone, rejecting any unit with a deviance greater than 0.1mm."
    },
    {
      title: "Third-Party Laboratory Testing",
      desc: "We pull random units from every hourly batch run and send them to ISO-17025 certified labs. These samples are tested for heavy metals (lead, arsenic, cadmium, mercury), pesticide residues, and microplastics. Batch certificates are logged in our database."
    }
  ];

  const floorShots = [
    {
      src: "/images/facility/facility-reels.jpg",
      tag: "MATERIAL INTAKE",
      caption: "Precision-tensioned paper reels feeding the line",
      area: "a"
    },
    {
      src: "/images/facility/facility-inspect.jpg",
      tag: "QUALITY CONTROL",
      caption: "Hand inspection of every folded cone",
      area: "b"
    },
    {
      src: "/images/facility/facility-rolling.jpg",
      tag: "PRODUCTION LINE",
      caption: "Cleanroom rolling & crutch-nesting stations",
      area: "c"
    },
    {
      src: "/images/facility/facility-floor.jpg",
      tag: "THE FACILITY",
      caption: "Our dedicated quality department floor",
      area: "d"
    },
    {
      src: "/images/facility/facility-machine.jpg",
      tag: "AUTOMATION",
      caption: "Calibrated, humidity-monitored machinery",
      area: "e"
    }
  ];

  const certifications = [
    {
      title: "Startup India Recognized",
      tag: "DPIIT RECOGNIZED",
      logo: "/images/certs/startupindia.png",
      desc: "Officially recognized under the Government of India's Startup India initiative for innovation and enterprise."
    },
    {
      title: "D-U-N-S® Registered",
      tag: "VERIFIED BUSINESS",
      logo: "/images/certs/duns.png",
      desc: "Registered with Dun & Bradstreet — the global mark of business trust and credibility."
    },
    {
      title: "FSSC 22000 Certified",
      tag: "FOOD SAFETY",
      logo: "/images/certs/fssc.png",
      desc: "Certified to the FSSC 22000 food safety management system, ensuring top-notch food safety standards."
    },
    {
      title: "HACCP Certified",
      tag: "FOOD SAFETY",
      logo: "/images/certs/haccp.png",
      desc: "Hazard Analysis & Critical Control Points certified — committed to risk-free food handling."
    },
    {
      title: "GMP Compliant",
      tag: "ACTIVE COMPLIANCE",
      logo: "/images/certs/gmp.png",
      desc: "Manufactured under Good Manufacturing Practices for consistent quality you can rely on."
    }
  ];

  return (
    <div className="page-wrapper facilities-page section-padding">
      <div className="container">
        {/* Cinematic Process Video Banner — muted, autoplaying, looping.
            Falls back to the poster image until /videos/sol-process.mp4 exists. */}
        <section
          className="process-video-hero reveal-on-scroll"
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            maxHeight: "72vh",
            borderRadius: "18px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.10)",
            marginBottom: "96px",
            background: "linear-gradient(135deg, #161616 0%, #050505 100%)",
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/hero/hero-cones.jpg"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          >
            <source src="/videos/SOL%20FRANCES.mp4" type="video/mp4" />
          </video>

          {/* Legibility gradient over the footage */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.05) 38%, rgba(0,0,0,0.78) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Overlay title */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              padding: "clamp(24px, 4vw, 56px)",
              zIndex: 2,
            }}
          >
            <span className="section-badge">INSIDE THE FACILITY</span>
            <h2
              className="section-title"
              style={{
                fontSize: "clamp(32px, 5vw, 60px)",
                marginTop: "14px",
                marginBottom: "12px",
              }}
            >
              THE SOL PROCESS
            </h2>
            <p
              style={{
                maxWidth: "580px",
                color: "rgba(255,255,255,0.82)",
                fontSize: "16px",
                lineHeight: 1.65,
              }}
            >
              From organic fiber to finished cone — an inside look at our
              GMP-certified cleanroom manufacturing.
            </p>
          </div>
        </section>

        {/* Quality Control Details */}
        <section className="qc-deep-dive section-padding m-bottom-2">
          <div className="text-center-wrapper reveal-on-scroll">
            <h2 className="section-title">THREE-TIER QUALITY INSPECTION</h2>
            <p className="section-subtitle-center">
              We monitor every pre-roll cone from raw pulp to completed container, leaving zero room for packing defects.
            </p>
          </div>

          <div className="qc-pipeline-flow">
            {qcSteps.map((step, idx) => (
              <div key={idx} className="qc-flow-step reveal-on-scroll">
                <div className="qc-number-wrap">
                  <span className="qc-num">0{idx + 1}</span>
                  <span className="qc-line-connector"></span>
                </div>
                <div className="qc-content-wrap">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cinematic Floor Gallery */}
        <section className="facility-gallery section-padding m-bottom-2">
          <style>{`
            .facility-gallery .fg-grid {
              display: grid;
              grid-template-columns: repeat(12, 1fr);
              gap: 16px;
              margin-top: 44px;
            }
            .facility-gallery .fg-tile {
              position: relative;
              overflow: hidden;
              border-radius: 16px;
              border: 1px solid rgba(255, 255, 255, 0.10);
              background: #0a0a0a;
              cursor: pointer;
            }
            .facility-gallery .fg-tile img {
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
              filter: saturate(0.92) contrast(1.06) brightness(0.82);
              transform: scale(1.02);
              transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), filter 0.7s ease;
            }
            .facility-gallery .fg-tile:hover img {
              transform: scale(1.09);
              filter: saturate(1.05) contrast(1.04) brightness(0.98);
            }
            .facility-gallery .fg-tile::after {
              content: "";
              position: absolute;
              inset: 0;
              background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.10) 45%, rgba(0,0,0,0.82) 100%);
              pointer-events: none;
            }
            .facility-gallery .fg-cap {
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              z-index: 2;
              padding: 22px 22px 20px;
            }
            .facility-gallery .fg-cap .fg-tag {
              display: inline-block;
              font-family: var(--font-mono, monospace);
              font-size: 10.5px;
              letter-spacing: 0.18em;
              color: #A5D6A7;
              margin-bottom: 8px;
              text-transform: uppercase;
            }
            .facility-gallery .fg-cap .fg-text {
              color: rgba(255, 255, 255, 0.94);
              font-size: 15px;
              line-height: 1.45;
              font-weight: 500;
              transform: translateY(6px);
              opacity: 0.9;
              transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
            }
            .facility-gallery .fg-tile:hover .fg-cap .fg-text {
              transform: translateY(0);
              opacity: 1;
            }
            .fg-a { grid-column: span 7; height: 380px; }
            .fg-b { grid-column: span 5; height: 380px; }
            .fg-c { grid-column: span 4; height: 280px; }
            .fg-d { grid-column: span 4; height: 280px; }
            .fg-e { grid-column: span 4; height: 280px; }
            @media (max-width: 900px) {
              .facility-gallery .fg-grid { gap: 12px; }
              .fg-a, .fg-b { grid-column: span 12; height: 300px; }
              .fg-c, .fg-d, .fg-e { grid-column: span 6; height: 220px; }
            }
            @media (max-width: 560px) {
              .fg-a, .fg-b, .fg-c, .fg-d, .fg-e { grid-column: span 12; height: 240px; }
            }
          `}</style>

          <div className="text-center-wrapper reveal-on-scroll">
            <span className="section-badge">ON THE GROUND</span>
            <h2 className="section-title">INSIDE OUR FLOOR</h2>
            <p className="section-subtitle-center">
              Real moments from the SOL facility — from raw paper reels to the hands and machines that shape every cone.
            </p>
          </div>

          <div className="fg-grid reveal-on-scroll">
            {floorShots.map((shot, i) => (
              <div key={i} className={`fg-tile fg-${shot.area}`}>
                <img src={shot.src} alt={shot.caption} loading="lazy" />
                <div className="fg-cap">
                  <span className="fg-tag">{shot.tag}</span>
                  <div className="fg-text">{shot.caption}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Register */}
        <section className="certs-register section-padding bg-darker m-bottom-2">
          <div className="text-center-wrapper reveal-on-scroll">
            <span className="section-badge">COMPLIANCE LEDGER</span>
            <h2 className="section-title">ENTERPRISE CERTIFICATIONS</h2>
            <p className="section-subtitle-center">
              Our facilities are audited yearly by accredited third-party certification bodies to ensure complete quality compliance.
            </p>
          </div>

          <div className="certs-full-grid">
            {certifications.map((c, i) => (
              <div key={i} className="cert-detail-card reveal-on-scroll">
                {c.logo && (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#ffffff",
                      borderRadius: "8px",
                      padding: "8px 14px",
                      marginBottom: "16px"
                    }}
                  >
                    <img
                      src={c.logo}
                      alt={c.title}
                      style={{ height: "40px", width: "auto", objectFit: "contain", display: "block" }}
                    />
                  </div>
                )}
                <h4>{c.title}</h4>
                <span className="cert-status-tag">{c.tag}</span>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
