import React, { useState } from "react";

export default function ProductDetail({ productDetailId, setRoute }) {
  const [selectedSize, setSelectedSize] = useState("109mm");
  const [quoteQty, setQuoteQty] = useState(50000);
  const [submittedQuote, setSubmittedQuote] = useState(false);
  const [quoteDetails, setQuoteDetails] = useState({
    name: "",
    company: "",
    email: "",
    customPrinted: "no",
    notes: ""
  });

  const productsDb = {
    "silk-flax-cone": {
      name: "SOL Silk Flax Cones",
      subtitle: "Ultra-Thin Organic Flax Pre-Roll",
      tagline: "The cleanest combustion, designed for high-end boutique pre-roll collections.",
      description: "Manufactured from pure, sustainably harvested flax fibers, our Silk Flax series is the pinnacle of B2B pre-roll supplies. With a thickness of only 12.5 gsm, it offers maximum transparency, allowing the natural color of the botanical blend to show through while maintaining high structural resilience.",
      materials: "100% Organic Flax Fiber, Natural Gum Arabic Adhesive",
      burnRate: "Extremely slow, uniform burn",
      specifications: {
        "84mm": { length: "84mm", tipLength: "26mm", topDiameter: "10.5mm", capacity: "0.5g", baseMoq: "20,000 Cones" },
        "98mm": { length: "98mm", tipLength: "26mm", topDiameter: "11.5mm", capacity: "0.75g", baseMoq: "20,000 Cones" },
        "109mm": { length: "109mm", tipLength: "26mm", topDiameter: "12.5mm", capacity: "1.0g", baseMoq: "20,000 Cones" },
      },
      highlights: [
        "Glueless filter tip binding (completely mechanical compression)",
        "Zero bleach, chlorine, or synthetic burning salts",
        "Laboratory tested for chemical purity & heavy metal clearance",
        "Anti-crinkle paper calibration for high-density auto-packers"
      ]
    },
    "organic-hemp-cone": {
      name: "SOL Organic Hemp Cones",
      subtitle: "Unbleached Natural Hemp Pre-Roll",
      tagline: "Authentic, earthy texture with superior structural durability.",
      description: "Our Organic Hemp series is made from unrefined, pesticide-free industrial hemp fibers. The light brown, textured paper provides a slightly sweet aroma profiles and an exceptionally even burn that brand purists love. Optimized for high-humidity packing environments.",
      materials: "100% Organic Hemp Fiber, Food-grade Gum Arabic",
      burnRate: "Slow, self-extinguishing combustion",
      specifications: {
        "84mm": { length: "84mm", tipLength: "26mm", topDiameter: "10.5mm", capacity: "0.5g", baseMoq: "20,000 Cones" },
        "98mm": { length: "98mm", tipLength: "26mm", topDiameter: "11.5mm", capacity: "0.75g", baseMoq: "20,000 Cones" },
        "109mm": { length: "109mm", tipLength: "26mm", topDiameter: "12.5mm", capacity: "1.0g", baseMoq: "20,000 Cones" },
      },
      highlights: [
        "Unbleached fiber structure (rich brown visual texture)",
        "Resilient under high compaction force packing lines",
        "Sustainably farmed, non-GMO verified crops",
        "Naturally textured for enhanced grip inside automated funnels"
      ]
    },
    "refined-wood-cone": {
      name: "SOL Classic Wood Pulp Cones",
      subtitle: "Refined White Wood Pulp Pre-Roll",
      tagline: "The industry workhorse, optimized for maximum speed and zero auto-packing failures.",
      description: "Our Classic Wood Pulp pre-rolled cones are fabricated from double-washed, refined cellulose wood fibers. Engineered to be rigid, dry, and slick, this paper minimizes friction inside packing machine cartridges, making it the default choice for high-volume automated production lines.",
      materials: "Double-Refined Cellulose Wood Pulp, Natural Gum Arabic",
      burnRate: "Medium-slow, steady burn rate",
      specifications: {
        "84mm": { length: "84mm", tipLength: "26mm", topDiameter: "10.2mm", capacity: "0.5g", baseMoq: "20,000 Cones" },
        "98mm": { length: "98mm", tipLength: "26mm", topDiameter: "11.2mm", capacity: "0.75g", baseMoq: "20,000 Cones" },
        "109mm": { length: "109mm", tipLength: "26mm", topDiameter: "12.2mm", capacity: "1.0g", baseMoq: "20,000 Cones" },
      },
      highlights: [
        "Double-refined pulp for a neutral, clean tasting experience",
        "Rigid design prevents tip-crushing under automated feed loaders",
        "Ultra-thin profile (14 gsm) despite structural strength",
        "Optimal 11.5% moisture calibration for long-shelf stable storage"
      ]
    },
    "borosilicate-glass-tip": {
      name: "Artisanal Borosilicate Glass Cones",
      subtitle: "Pre-Roll Fitted With Reusable Glass Tip",
      tagline: "The absolute peak of luxury pre-roll smoking experience.",
      description: "Combining our premium wood, hemp, or flax papers with a heavy, reusable borosilicate glass crutch, this product represents the luxury tier of smoking accessories. The glass tip cools smoke, filters particles, and provides a satisfying weight in the hand.",
      materials: "Borosilicate Glass, Organic Flax or Hemp paper",
      burnRate: "Slow, customized combustion",
      specifications: {
        "98mm": { length: "98mm", tipLength: "30mm (Glass)", topDiameter: "11.5mm", capacity: "0.8g", baseMoq: "10,000 Cones" },
        "109mm": { length: "109mm", tipLength: "30mm (Glass)", topDiameter: "12.5mm", capacity: "1.2g", baseMoq: "10,000 Cones" },
      },
      highlights: [
        "Indestructible, reusable borosilicate glass tips",
        "Perfect cylinder shape with restriction pinch to block herb particles",
        "Luxury branding ready (ceramic decals, laser etch, gold borders)",
        "Packaged in custom secure foam crates to prevent transit cracking"
      ]
    },
    "wooden-crutch-cones": {
      name: "Tapered Wooden Tip Cones",
      subtitle: "Pre-Roll Fitted With Birchwood Crutch",
      tagline: "Eco-friendly natural style with structural integrity.",
      description: "Made with authentic birchwood tip inserts, this range of cones offers an organic, luxurious smoking experience. Wood tips provide a firm mouth grip, absorb excess moisture, and give pre-rolls a distinct aesthetic appeal.",
      materials: "Food-Grade Birchwood Tip, Unbleached Flax/Hemp paper",
      burnRate: "Controlled, slow combustion",
      specifications: {
        "98mm": { length: "98mm", tipLength: "26mm (Wood)", topDiameter: "11.2mm", capacity: "0.75g", baseMoq: "10,000 Cones" },
        "109mm": { length: "109mm", tipLength: "26mm (Wood)", topDiameter: "12.2mm", capacity: "1.0g", baseMoq: "10,000 Cones" },
      },
      highlights: [
        "Natural birchwood inserts, cured without chemical lacquers",
        "Firm structure prevents tip collapse when wet",
        "Laser-branded logo option directly on the wooden crutch surface",
        "Sustainable wood source certification"
      ]
    },
    "cr-slider-box": {
      name: "Child-Resistant Drawer Boxes",
      subtitle: "Certified CR Slide Pack",
      tagline: "Compliant pre-roll packaging with premium rigid feel.",
      description: "Ensure your brand meets all state and federal child safety mandates without sacrificing packaging aesthetics. Our drawer boxes utilize a reinforced, dual-push safety lock mechanism that is certified child-resistant while presenting a clean, modern exterior canvas.",
      materials: "1200gsm Rigid Paperboard, Recycled Cardstock Lining",
      burnRate: "N/A (Packaging Product)",
      specifications: {
        "5-Pack": { length: "115mm (Outer)", tipLength: "Fits up to 109mm Cones", topDiameter: "N/A", capacity: "5 pre-rolls", baseMoq: "5,000 Boxes" },
        "10-Pack": { length: "115mm (Outer)", tipLength: "Fits up to 109mm Cones", topDiameter: "N/A", capacity: "10 pre-rolls", baseMoq: "5,000 Boxes" },
      },
      highlights: [
        "Certified CR compliance testing credentials provided",
        "Smooth push-button sliding mechanism",
        "Custom molded compostable paper pulp trays inside",
        "Highly customizable (foil, embossing, spot-UV, soft touch)"
      ]
    },
    "magnetic-display-chest": {
      name: "Rigid Magnetic Display Cases",
      subtitle: "Premium Flap Closure Chest",
      tagline: "Heavy-gauge collector boxes for elite product lines.",
      description: "Designed for premium multi-packs, sample kits, and high-end retail display environments. The lid snaps shut with high-force concealed magnets, providing a satisfying tactile lock. Velvet, satin, or custom paper inserts cradle the pre-rolls in place.",
      materials: "1500gsm Double-Lined Grayboard, Satin/EVA Foam Tray",
      burnRate: "N/A (Packaging Product)",
      specifications: {
        "Small": { length: "120mm", tipLength: "Custom Cavity Size", topDiameter: "N/A", capacity: "3-5 Pre-rolls", baseMoq: "2,500 Boxes" },
        "Large": { length: "180mm", tipLength: "Custom Cavity Size", topDiameter: "N/A", capacity: "10-20 Pre-rolls", baseMoq: "2,500 Boxes" },
      },
      highlights: [
        "Concealed high-force magnets for secure lock feel",
        "Premium rigid board construction feels solid and expensive",
        "Fully custom size configurations and insert materials",
        "Suitable for display counter point-of-sale branding"
      ]
    },
    "aluminum-airtight-tube": {
      name: "Hermetic Aluminum Single Tubes",
      subtitle: "Airtight Screw-Lid Metal Tubes",
      tagline: "Total protection against aroma loss and moisture contamination.",
      description: "Lightweight, unbreakable anodized aluminum tubes designed to fit single pre-rolled joints. Featuring an integrated silicone O-ring seal, it is completely smell-proof, water-resistant, and keeps the product fresh in any climate.",
      materials: "100% Anodized Aluminum, Food-Grade Silicone Ring",
      burnRate: "N/A (Packaging Product)",
      specifications: {
        "Standard": { length: "115mm", tipLength: "Fits 109mm Pre-roll", topDiameter: "15mm (Outer)", capacity: "1 Pre-roll", baseMoq: "10,000 Tubes" },
      },
      highlights: [
        "Integrated silicone O-ring ensures air-tightness",
        "Lightweight and indestructible (perfect for retail shelves)",
        "Anodized metallic finishes (matte black, graphite, silver, gold)",
        "Supports laser-etched logos for detailed branding"
      ]
    }
  };

  const product = productsDb[productDetailId] || productsDb["silk-flax-cone"];

  // Verify size exists in current database, default to first size in spec list
  const specSizes = Object.keys(product.specifications);
  const activeSize = specSizes.includes(selectedSize) ? selectedSize : specSizes[0];
  const spec = product.specifications[activeSize];

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    if (!quoteDetails.name || !quoteDetails.company || !quoteDetails.email) {
      alert("Please fill out required fields.");
      return;
    }
    setSubmittedQuote(true);
  };

  // Pricing math simulation for B2B engagement
  const calculateEstimate = () => {
    if (productDetailId.includes("box") || productDetailId.includes("tube")) {
      const basePrice = productDetailId.includes("magnetic") ? 1.45 : productDetailId.includes("slider") ? 0.65 : 0.35;
      const discount = quoteQty >= 100000 ? 0.75 : quoteQty >= 50000 ? 0.88 : 1.0;
      return (basePrice * quoteQty * discount).toLocaleString("en-US", { maximumFractionDigits: 0 });
    } else {
      const basePrice = productDetailId.includes("glass") ? 0.28 : productDetailId.includes("wooden") ? 0.18 : 0.065;
      const discount = quoteQty >= 200000 ? 0.75 : quoteQty >= 100000 ? 0.85 : quoteQty >= 50000 ? 0.92 : 1.0;
      return (basePrice * quoteQty * discount).toLocaleString("en-US", { maximumFractionDigits: 0 });
    }
  };

  const handleBackToCatalog = () => {
    setRoute("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="page-wrapper product-detail-page section-padding">
      <div className="container">
        {/* Navigation Breadcrumb */}
        <button onClick={handleBackToCatalog} className="back-catalog-btn reveal-on-scroll">
          &larr; BACK TO FULL CATALOG
        </button>

        <div className="product-spec-grid">
          {/* Visual blueprint Column */}
          <div className="detail-visual-column reveal-on-scroll">
            <div className="blueprint-wrapper">
              <div className="blueprint-grid-lines"></div>
              <div className="blueprint-header">
                <span>TECHNICAL SCHEMATIC DIAGRAM</span>
                <span className="font-mono">VER. 2.4 / AUTO-LADLE STATUS</span>
              </div>

              {/* Technical blueprint rendering */}
              <div className="schematic-display">
                <div className="drawing-box">
                  {/* Drawing of cone or package based on product ID */}
                  {productDetailId.includes("box") || productDetailId.includes("tube") ? (
                    <div className="schematic-package-vector">
                      {/* Stylized Box drawing */}
                      <svg viewBox="0 0 200 120" width="100%" height="100%">
                        <rect x="50" y="20" width="100" height="70" rx="3" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="3,3" />
                        <rect x="40" y="30" width="100" height="70" rx="3" fill="none" stroke="#ffffff" strokeWidth="1" />
                        <line x1="40" y1="30" x2="50" y2="20" stroke="#ffffff" strokeWidth="0.5" />
                        <line x1="140" y1="30" x2="150" y2="20" stroke="#ffffff" strokeWidth="0.5" />
                        <line x1="40" y1="100" x2="50" y2="90" stroke="#ffffff" strokeWidth="0.5" />
                        <line x1="140" y1="100" x2="150" y2="90" stroke="#ffffff" strokeWidth="0.5" />
                        {/* Dimensional lines */}
                        <line x1="40" y1="110" x2="140" y2="110" stroke="#a3a3a3" strokeWidth="0.5" />
                        <line x1="40" y1="107" x2="40" y2="113" stroke="#a3a3a3" strokeWidth="0.5" />
                        <line x1="140" y1="107" x2="140" y2="113" stroke="#a3a3a3" strokeWidth="0.5" />
                        <text x="90" y="118" fill="#a3a3a3" fontSize="6" textAnchor="middle" fontFamily="monospace">
                          {spec.length}
                        </text>
                      </svg>
                    </div>
                  ) : (
                    <div className="schematic-cone-vector">
                      {/* Stylized Pre-roll Cone drawing */}
                      <svg viewBox="0 0 200 100" width="100%" height="100%">
                        {/* Cone Outline */}
                        <path d="M 20,50 L 170,25 L 170,75 Z" fill="none" stroke="#ffffff" strokeWidth="1" />
                        {/* Crutch line */}
                        <path d="M 130,31 L 130,69" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="2,2" />
                        
                        {/* Top diameter line */}
                        <line x1="175" y1="25" x2="175" y2="75" stroke="#a3a3a3" strokeWidth="0.5" />
                        <line x1="172" y1="25" x2="178" y2="25" stroke="#a3a3a3" strokeWidth="0.5" />
                        <line x1="172" y1="75" x2="178" y2="75" stroke="#a3a3a3" strokeWidth="0.5" />
                        <text x="184" y="53" fill="#a3a3a3" fontSize="6" fontFamily="monospace">
                          {spec.topDiameter}
                        </text>

                        {/* Overall length line */}
                        <line x1="20" y1="85" x2="170" y2="85" stroke="#a3a3a3" strokeWidth="0.5" />
                        <line x1="20" y1="82" x2="20" y2="88" stroke="#a3a3a3" strokeWidth="0.5" />
                        <line x1="170" y1="82" x2="170" y2="88" stroke="#a3a3a3" strokeWidth="0.5" />
                        <text x="95" y="94" fill="#a3a3a3" fontSize="6" textAnchor="middle" fontFamily="monospace">
                          {spec.length}
                        </text>

                        {/* Filter length line */}
                        <line x1="130" y1="15" x2="170" y2="15" stroke="#a3a3a3" strokeWidth="0.5" />
                        <line x1="130" y1="12" x2="130" y2="18" stroke="#a3a3a3" strokeWidth="0.5" />
                        <line x1="170" y1="12" x2="170" y2="18" stroke="#a3a3a3" strokeWidth="0.5" />
                        <text x="150" y="10" fill="#a3a3a3" fontSize="6" textAnchor="middle" fontFamily="monospace">
                          {spec.tipLength}
                        </text>
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              <div className="blueprint-footer">
                <div className="b-spec-col">
                  <span>SCALE:</span>
                  <strong>1:1</strong>
                </div>
                <div className="b-spec-col">
                  <span>BURN INDEX:</span>
                  <strong>{product.burnRate.split(",")[0]}</strong>
                </div>
                <div className="b-spec-col">
                  <span>COMPOSITION:</span>
                  <strong>Certified Pure</strong>
                </div>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="detail-highlights">
              <h4>MANUFACTURING SAFEGUARDS</h4>
              <ul className="highlights-ul">
                {product.highlights.map((h, idx) => (
                  <li key={idx}>
                    <span className="dot-silver"></span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Description & B2B RFQ Form Column */}
          <div className="detail-info-column reveal-on-scroll">
            <span className="section-badge">{product.subtitle.toUpperCase()}</span>
            <h1 className="detail-name">{product.name}</h1>
            <p className="detail-tagline">{product.tagline}</p>
            <p className="detail-desc-paragraph">{product.description}</p>

            <div className="material-spec-block">
              <div className="m-spec-row">
                <span>Base Materials:</span>
                <strong>{product.materials}</strong>
              </div>
              <div className="m-spec-row">
                <span>Combustion Profile:</span>
                <strong>{product.burnRate}</strong>
              </div>
            </div>

            {/* Size Configuration Tabs */}
            <div className="detail-size-selector">
              <h5>Select Sizing Template:</h5>
              <div className="size-tab-row">
                {specSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`size-tab-btn ${activeSize === sz ? "active" : ""}`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Active size properties */}
            <div className="active-size-details">
              <div className="prop-grid">
                <div className="prop-item">
                  <span>Total Length</span>
                  <strong>{spec.length}</strong>
                </div>
                <div className="prop-item">
                  <span>Crutch Length</span>
                  <strong>{spec.tipLength}</strong>
                </div>
                {spec.topDiameter !== "N/A" && (
                  <div className="prop-item">
                    <span>Crown Diameter</span>
                    <strong>{spec.topDiameter}</strong>
                  </div>
                )}
                <div className="prop-item">
                  <span>Capacity Weight</span>
                  <strong>{spec.capacity}</strong>
                </div>
              </div>
              <div className="prop-moq-row">
                <span>Base Production MOQ:</span>
                <strong>{spec.baseMoq}</strong>
              </div>
            </div>

            {/* B2B RFQ Form */}
            <div className="rfq-form-card">
              <div className="rfq-card-header">
                <h4>B2B CONTRACT CALCULATION</h4>
                <p>Generate immediate wholesale estimate and reserve inventory blocks.</p>
              </div>

              {submittedQuote ? (
                <div className="rfq-success">
                  <div className="success-icon-sm">✓</div>
                  <h5>ESTIMATE LOGGED</h5>
                  <p>
                    An Account Director has been assigned to quote ID **RFQ-{Math.floor(Math.random() * 90000) + 10000}**. 
                    A official contract sheet will be emailed to **{quoteDetails.email}** within 2 hours.
                  </p>
                  <button onClick={() => setSubmittedQuote(false)} className="btn btn-silver btn-sm">
                    RECALCULATE ESTIMATE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="rfq-form">
                  <div className="rfq-qty-block">
                    <div className="qty-header-flex">
                      <label>PRODUCTION RUN SIZE</label>
                      <span className="qty-counter">{quoteQty.toLocaleString()} units</span>
                    </div>
                    <input
                      type="range"
                      min={20000}
                      max={500000}
                      step={10000}
                      className="qty-range-slider"
                      value={quoteQty}
                      onChange={(e) => setQuoteQty(Number(e.target.value))}
                    />
                    <div className="qty-labels-flex">
                      <span>20k (MOQ)</span>
                      <span>250k</span>
                      <span>500k+</span>
                    </div>
                  </div>

                  <div className="rfq-fields-grid">
                    <div className="rfq-field">
                      <label>YOUR NAME *</label>
                      <input
                        type="text"
                        required
                        className="mfg-input"
                        placeholder="Alexander Sterling"
                        value={quoteDetails.name}
                        onChange={(e) => setQuoteDetails({ ...quoteDetails, name: e.target.value })}
                      />
                    </div>
                    <div className="rfq-field">
                      <label>COMPANY NAME *</label>
                      <input
                        type="text"
                        required
                        className="mfg-input"
                        placeholder="Apex Brands LLC"
                        value={quoteDetails.company}
                        onChange={(e) => setQuoteDetails({ ...quoteDetails, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="rfq-field">
                    <label>BUSINESS EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      required
                      className="mfg-input"
                      placeholder="name@company.com"
                      value={quoteDetails.email}
                      onChange={(e) => setQuoteDetails({ ...quoteDetails, email: e.target.value })}
                    />
                  </div>

                  <div className="rfq-fields-grid">
                    <div className="rfq-field">
                      <label>CUSTOM LOGO EMBOSSING?</label>
                      <select
                        className="mfg-input"
                        value={quoteDetails.customPrinted}
                        onChange={(e) => setQuoteDetails({ ...quoteDetails, customPrinted: e.target.value })}
                      >
                        <option value="no">No / Plain White Crutch</option>
                        <option value="yes">Yes / Custom Crutch Wrapper</option>
                        <option value="gold-foil">Yes / Metallic Gold Accent Ring</option>
                      </select>
                    </div>
                    
                    <div className="price-estimate-display">
                      <span className="price-label">Projected Contract Range:</span>
                      <strong className="price-value">${calculateEstimate()} USD</strong>
                      <small className="price-terms">* Excludes freight. Subject to final review.</small>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-silver btn-full m-top-1">
                    SUBMIT TO ACCOUNT DIRECTOR
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
