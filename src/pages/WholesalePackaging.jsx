import React, { useState, useEffect } from "react";
import ProductImage from "../components/ProductImage";

export default function WholesalePackaging({ setRoute }) {
  const [selectedVariants, setSelectedVariants] = useState({});
  
  // SEO Header Injection
  useEffect(() => {
    document.title = "Wholesale Pre-Roll Packaging | Bulk Shipping Cases | SOL Manufacturing";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Browse authentic SOL B2B wholesale pre-roll storage containers, packaging trays, and shipping chests. Formats range from Pack of 100 up to Pack of 900.";

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.origin + "/products/wholesale-packaging";
  }, []);

  const paperVariants = ["Bleached", "Unbleached", "Organic Hemp", "Pink", "Blue", "Green"];

  const wholesaleProducts = [
    {
      id: "bulk-100",
      name: "Pack of 100",
      moq: "10,000 Units",
      material: "High-density Corrugated Cardboard",
      size: "240mm x 160mm x 30mm",
      bgText: "HNDR"
    },
    {
      id: "bulk-200",
      name: "Pack of 200",
      moq: "10,000 Units",
      material: "380gsm Industrial Kraft Stock",
      size: "260mm x 180mm x 55mm",
      bgText: "DIST"
    },
    {
      id: "bulk-400",
      name: "Pack of 400",
      moq: "5,000 Units",
      material: "Double-walled reinforced corrugated board",
      size: "320mm x 240mm x 80mm",
      bgText: "FORT"
    },
    {
      id: "bulk-800",
      name: "Pack of 800",
      moq: "5,000 Units",
      material: "Triple-reinforced double-wall kraft cases",
      size: "350mm x 280mm x 120mm",
      bgText: "OCTO"
    },
    {
      id: "bulk-900",
      name: "Pack of 900",
      moq: "2,500 Units",
      material: "Triple-wall industrial fiberboard",
      size: "380mm x 300mm x 140mm",
      bgText: "LOGI"
    },
    {
      id: "bulk-custom",
      name: "Custom Bulk Packaging",
      moq: "1,000 Units",
      material: "Corrugated, rigid, or fiberboard variants",
      size: "Tailored to client machinery specification",
      bgText: "SPEC"
    }
  ];

  const handleSelectVariant = (productId, variant) => {
    setSelectedVariants(prev => ({
      ...prev,
      [productId]: variant
    }));
  };

  return (
    <div className="page-wrapper wholesale-packaging-page section-padding bg-darker">
      <div className="container">
        
        {/* Breadcrumbs */}
        <nav className="breadcrumb-nav reveal-on-scroll" aria-label="Breadcrumb">
          <ul className="breadcrumb-list">
            <li>
              <button onClick={() => setRoute("home")}>Home</button>
            </li>
            <li className="separator">/</li>
            <li>
              <button onClick={() => setRoute("products")}>Products</button>
            </li>
            <li className="separator">/</li>
            <li>
              <span className="current">Wholesale Packaging</span>
            </li>
          </ul>
        </nav>

        {/* Cinematic Header */}
        <div className="category-subpage-header text-center-wrapper reveal-on-scroll reveal-scale reveal-blur">
          <span className="section-badge">COMMERCIAL LOGISTICS SPECIFICATION</span>
          <h1 className="section-title" style={{ fontSize: "64px", letterSpacing: "-0.04em" }}>WHOLESALE PACKAGING</h1>
          <p className="section-subtitle-center" style={{ fontSize: "18px", lineHeight: "1.6", opacity: 0.8 }}>
            Heavy-gauge bulk shipping boxes, segmented separator trays, and customized cargo chests. Built for commercial pre-roll operations.
          </p>
        </div>

        {/* Cinematic Alternating List */}
        <div className="subpage-products-grid" style={{ gap: "180px", marginTop: "120px" }}>
          {wholesaleProducts.map((p, idx) => {
            const isEven = idx % 2 === 0;
            const currentVariant = selectedVariants[p.id] || "Bleached";
            
            return (
              <section 
                key={p.id} 
                className="subpage-product-card reveal-on-scroll reveal-scale reveal-blur"
                style={{ 
                  gridTemplateColumns: isEven ? "1.2fr 1fr" : "1fr 1.2fr",
                  gap: "100px",
                  transitionDuration: "1.4s"
                }}
              >
                {/* Visual Column */}
                <div 
                  className="subpage-card-visual floating-element"
                  style={{ 
                    order: isEven ? 0 : 1,
                    height: "500px",
                    animationDelay: `${idx * 0.5}s`,
                    animationDuration: "8s"
                  }}
                >
                  <span className="specs-moq-badge font-mono">{p.moq}</span>
                  <ProductImage 
                    category="wholesale-packaging" 
                    productId={p.id} 
                    variant={currentVariant} 
                    bgText={p.bgText}
                    sketchClass="wholesale-sketch"
                  />
                </div>

                {/* Info Column */}
                <div className="subpage-card-content" style={{ zIndex: 1 }}>
                  <span className="section-badge" style={{ paddingLeft: 0 }}>LOGISTICS ITEM SOL-{200 + idx}</span>
                  <h2 style={{ fontSize: "44px", letterSpacing: "-0.03em", marginBottom: "28px" }}>{p.name}</h2>
                  
                  {/* Paper Variant Selection Chips */}
                  <div className="paper-variants-wrapper" style={{ marginBottom: "32px" }}>
                    <h4 style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--color-text-muted)", marginBottom: "12px", textTransform: "uppercase" }}>Available Paper Variants</h4>
                    <div className="variants-chips-row" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                      {paperVariants.map((variant) => {
                        const isActive = currentVariant === variant;
                        return (
                          <button
                            key={variant}
                            onClick={() => handleSelectVariant(p.id, variant)}
                            className={`variant-chip ${isActive ? "active" : ""}`}
                          >
                            {variant}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="subpage-specs-table">
                    <div className="table-row">
                      <span>Base Material:</span>
                      <strong>{p.material}</strong>
                    </div>
                    <div className="table-row">
                      <span>Outer Dimensions:</span>
                      <span>{p.size}</span>
                    </div>
                    <div className="table-row">
                      <span>Selected Option:</span>
                      <strong style={{ color: "var(--accent-silver)" }}>{currentVariant}</strong>
                    </div>
                  </div>

                  <div className="subpage-card-actions" style={{ marginTop: "32px" }}>
                    <button 
                      onClick={() => setRoute("contact")} 
                      className="btn btn-silver"
                      style={{ padding: "16px 36px" }}
                    >
                      INQUIRE FOR BULK QUOTE &rarr;
                    </button>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

      </div>
    </div>
  );
}
