import React, { useEffect } from "react";

export default function Products({ setRoute }) {
  
  // SEO Header Injection
  useEffect(() => {
    document.title = "B2B Pre-Roll Catalog & Packaging | SOL Manufacturing";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Browse the comprehensive B2B pre-roll product catalogue of SOL Manufacturing. Discover premium pre-rolled cones, filter tips, tubes, custom branding, and custom packaging solutions.";

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.origin + "/products";
  }, []);

  const categories = [
    {
      id: "pre-rolled-cones",
      title: "Pre-Rolled Cones",
      desc: "11 standard shapes from Dogwalker Mini to King Size XL. 70+ European papers, a 1mm gumline and minimal overlap — machine and knock-box compatible.",
      imageClass: "cones-showcase-bg",
      img: "/images/hero-products/cones.jpg",
      route: "products-pre-rolled-cones",
      metric: "MOQ from 4,800 Cones",
      bgText: "CONE"
    },
    {
      id: "blunt-wraps",
      title: "Blunt Cones & Hemp Wraps",
      desc: "Green and brown blunt cones in 100% natural leaf — THC & tobacco-free, with a slow even burn and knock-box compatibility for a smooth premium draw.",
      imageClass: "wholesale-showcase-bg",
      img: "/images/hero-products/blunts.jpg",
      route: "products-blunt-wraps",
      metric: "100% Natural Leaf",
      bgText: "BLUNT"
    },
    {
      id: "filter-tips",
      title: "Filter Tips & Crutches",
      desc: "Standard craft, glass, ceramic and wood filters. Five perforations for even airflow, 100–120 GSM European paper, chlorine-free and clinically approved.",
      imageClass: "tips-showcase-bg",
      img: "/images/hero-products/filters.jpg",
      route: "products-filter-tips",
      metric: "Glass · Ceramic · Wood",
      bgText: "TIPS"
    },
    {
      id: "pre-rolled-tubes",
      title: "Pre-Rolled Tubes",
      desc: "Ceramic-tipped tubes and airtight storage formats that preserve moisture, aroma, and structural integrity in transit and on shelf.",
      imageClass: "tubes-showcase-bg",
      img: "/images/hero-products/tubes.jpg",
      route: "products-pre-rolled-tubes",
      metric: "Ceramic-Tipped",
      bgText: "TUBE"
    }
  ];

  return (
    <div className="page-wrapper products-landing-page section-padding bg-darker">
      <div className="container">
        
        {/* Breadcrumb */}
        <nav className="breadcrumb-nav reveal-on-scroll" aria-label="Breadcrumb">
          <ul className="breadcrumb-list">
            <li>
              <button onClick={() => setRoute("home")}>Home</button>
            </li>
            <li className="separator">/</li>
            <li>
              <span className="current">Products</span>
            </li>
          </ul>
        </nav>

        {/* Page Editorial Header */}
        <div className="products-hero-header text-center-wrapper reveal-on-scroll reveal-scale reveal-blur">
          <span className="section-badge">SOL FRANCE · B2B CATALOG</span>
          <h1 className="section-title" style={{ fontSize: "64px", letterSpacing: "-0.04em" }}>THE CATALOG</h1>
          <p className="section-subtitle-center" style={{ fontSize: "18px", lineHeight: "1.6", opacity: 0.8 }}>
            Pre-rolled cones, premium LUXÉ, blunt wraps, filters, tubes, and custom branding — GMP-manufactured, lab-tested, and machine-compatible for pre-roll operators worldwide.
          </p>
        </div>

        {/* Cinematic Categories Showcase */}
        <div className="showcase-categories-list" style={{ gap: "160px", marginTop: "100px" }}>
          {categories.map((cat, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={cat.id} 
                className="showcase-category-section reveal-on-scroll reveal-scale reveal-blur"
                style={{ 
                  gridTemplateColumns: isEven ? "1.2fr 1fr" : "1fr 1.2fr",
                  gap: "80px",
                  transitionDuration: "1.4s"
                }}
              >
                {/* Visual Panel */}
                <div 
                  className="showcase-visual-panel floating-element"
                  onClick={() => setRoute(cat.route)}
                  style={{ 
                    order: isEven ? 0 : 1,
                    height: "460px",
                    animationDelay: `${idx * 0.4}s`,
                    animationDuration: "8s"
                  }}
                >
                  {cat.img ? (
                    <>
                      <div style={{ position: "absolute", inset: 0, background: "#ffffff" }} />
                      <img
                        src={cat.img}
                        alt={cat.title}
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", padding: "8px", boxSizing: "border-box", display: "block" }}
                      />
                    </>
                  ) : (
                    <>
                      <div className="hero-bg-typography font-mono" style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "14vw",
                        fontWeight: "900",
                        opacity: 0.02,
                        zIndex: 0,
                        pointerEvents: "none"
                      }}>
                        {cat.bgText}
                      </div>
                      <div className={`showcase-visual-bg ${cat.imageClass}`}>
                        <div className="showcase-visual-grid"></div>
                        <div className="showcase-visual-glow"></div>
                      </div>
                    </>
                  )}
                  <span
                    className="showcase-tag font-mono"
                    style={cat.img ? { color: "#1a1a1a", background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.12)" } : undefined}
                  >
                    {cat.metric}
                  </span>
                </div>

                {/* Info Panel */}
                <div className="showcase-info-panel" style={{ zIndex: 1 }}>
                  <span className="section-badge" style={{ paddingLeft: 0 }}>SEGMENT 0{idx + 1}</span>
                  <h2 className="showcase-title" style={{ fontSize: "40px", letterSpacing: "-0.03em" }}>{cat.title}</h2>
                  <p className="showcase-description" style={{ fontSize: "15px", opacity: 0.85 }}>{cat.desc}</p>
                  <button 
                    onClick={() => setRoute(cat.route)} 
                    className="btn btn-silver"
                    style={{ padding: "14px 28px" }}
                  >
                    EXPLORE COLLECTION &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
