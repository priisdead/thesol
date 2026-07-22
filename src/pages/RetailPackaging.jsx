import React, { useState, useEffect } from "react";
import ProductImage from "../components/ProductImage";

export default function RetailPackaging({ setRoute }) {
  const [selectedVariants, setSelectedVariants] = useState({});
  
  // SEO Header Injection
  useEffect(() => {
    document.title = "Retail Pre-Roll Packaging Solutions | SOL Manufacturing";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Explore authentic SOL retail pre-roll packaging formats, booklets, and roach filters. Configurations range from Pack of 3 to Pack of 100. Premium craftsmanship.";

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.origin + "/products/retail-packaging";
  }, []);

  const paperVariants = ["Bleached", "Unbleached", "Organic Hemp", "Pink", "Blue", "Green"];

  const retailProducts = [
    {
      id: "pack-3",
      name: "Pack of 3",
      moq: "5,000 Units",
      material: "Heavyweight Unbleached Kraft Board",
      size: "112mm x 32mm x 12mm",
      bgText: "TRIO"
    },
    {
      id: "pack-6",
      name: "Pack of 6",
      moq: "5,000 Units",
      material: "Reinforced Rigid Cardboard (CR Certified)",
      size: "115mm x 55mm x 14mm",
      bgText: "HEXA"
    },
    {
      id: "pack-20",
      name: "Pack of 20",
      moq: "5,000 Units",
      material: "1200gsm Premium Lined Grayboard",
      size: "118mm x 85mm x 18mm",
      bgText: "CROWN"
    },
    {
      id: "pack-50",
      name: "Pack of 50",
      moq: "2,500 Units",
      material: "Velvet-lined rigid paperboard",
      size: "150mm x 120mm x 45mm",
      bgText: "VAULT"
    },
    {
      id: "pack-100",
      name: "Pack of 100",
      moq: "1,000 Units",
      material: "Hardcover double-lined board with metallic trim",
      size: "220mm x 180mm x 60mm",
      bgText: "CENT"
    },
    {
      id: "booklet-32",
      name: "Booklet of 32",
      moq: "10,000 Booklets",
      material: "12.5gsm French Organic Flax Paper",
      size: "King Size Slim (110mm)",
      bgText: "PAPER"
    },
    {
      id: "booklet-with-roach",
      name: "Booklet with Roach",
      moq: "10,000 Booklets",
      material: "French Flax paper + 180gsm Cardstock tips",
      size: "King Size Slim with filters",
      bgText: "COMBO"
    },
    {
      id: "roach-book",
      name: "Roach Book",
      moq: "20,000 Booklets",
      material: "Unbleached natural cardstock tips",
      size: "60mm x 25mm per tip",
      bgText: "TIPS"
    }
  ];

  const handleSelectVariant = (productId, variant) => {
    setSelectedVariants(prev => ({
      ...prev,
      [productId]: variant
    }));
  };

  return (
    <div className="page-wrapper retail-packaging-page section-padding bg-darker">
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
              <span className="current">Retail Packaging</span>
            </li>
          </ul>
        </nav>

        {/* Cinematic Header */}
        <div className="category-subpage-header text-center-wrapper reveal-on-scroll reveal-scale reveal-blur">
          <span className="section-badge">SOL MANUFACTURING SPECIFICATIONS</span>
          <h1 className="section-title" style={{ fontSize: "64px", letterSpacing: "-0.04em" }}>RETAIL PACKAGING</h1>
          <p className="section-subtitle-center" style={{ fontSize: "18px", lineHeight: "1.6", opacity: 0.8 }}>
            Premium consumer presentation boxes, magnetic flip cases, and integrated paper booklets. Designed for retail brand launches and elite shelves.
          </p>
        </div>

        {/* Cinematic Showroom Alternating List */}
        <div className="subpage-products-grid" style={{ gap: "180px", marginTop: "120px" }}>
          {retailProducts.map((p, idx) => {
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
                    category="retail-packaging" 
                    productId={p.id} 
                    variant={currentVariant} 
                    bgText={p.bgText}
                    sketchClass="packaging-sketch"
                  />
                </div>

                {/* Info Column */}
                <div className="subpage-card-content" style={{ zIndex: 1 }}>
                  <span className="section-badge" style={{ paddingLeft: 0 }}>CATALOG ITEM SOL-{100 + idx}</span>
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
                      <span>Standard Size:</span>
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
                      INQUIRE FOR BULK PRICING &rarr;
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
