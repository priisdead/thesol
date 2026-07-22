import React, { useState } from "react";

export default function PreRollCustomizer() {
  const [size, setSize] = useState("109mm"); // 109mm, 98mm, 84mm
  const [paper, setPaper] = useState("hemp"); // hemp, flax, wood, rice
  const [tipStyle, setTipStyle] = useState("spiral"); // spiral, w-tip, glass
  const [tipCustom, setTipCustom] = useState("silver-band"); // none, gold-band, silver-band, logo-print
  const [customLogoText, setCustomLogoText] = useState("SOL");
  const [logoUploaded, setLogoUploaded] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [quantity, setQuantity] = useState(50000);

  const sizes = {
    "109mm": { label: "King Size (109mm / 26mm tip)", capacity: "1.0 - 1.25g", width: 340, tipWidth: 80 },
    "98mm": { label: "Standard Size (98mm / 26mm tip)", capacity: "0.75 - 0.9g", width: 300, tipWidth: 80 },
    "84mm": { label: "1 1/4 Size (84mm / 26mm tip)", capacity: "0.5 - 0.6g", width: 260, tipWidth: 80 },
  };

  const papers = {
    hemp: { label: "Unrefined Organic Hemp", color: "#d2b48c", opacity: 0.85, texture: "hemp" },
    flax: { label: "Ultra-Thin Organic Flax", color: "#f8f9fa", opacity: 0.7, texture: "flax" },
    wood: { label: "Classic Unbleached Wood Pulp", color: "#e3d2be", opacity: 0.9, texture: "wood" },
  };

  const tips = {
    spiral: { label: "Spiral Paper Crutch", pattern: "spiral" },
    "w-tip": { label: "W-Shaped Fold Crutch", pattern: "w-tip" },
    glass: { label: "Premium Borosilicate Glass Tip", pattern: "glass" },
  };

  const customs = {
    none: { label: "Clean / No Branding" },
    "gold-band": { label: "Metallic Gold Accent Ring" },
    "silver-band": { label: "Metallic Silver Accent Ring" },
    "logo-print": { label: "Full Custom Logo Wrapper" },
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
    }, 4000);
  };

  return (
    <div className="customizer-container">
      <div className="customizer-grid">
        {/* Live Visualizer */}
        <div className="visualizer-panel">
          <div className="visualizer-header">
            <h3>REAL-TIME PROTOTYPE</h3>
            <span className="visualizer-status">Premium Specification</span>
          </div>

          <div className="cone-render-area">
            <div className="render-canvas-simulation">
              {/* Cone SVG representation */}
              <svg
                viewBox="0 0 400 120"
                width="100%"
                height="100%"
                style={{ overflow: "visible" }}
              >
                <defs>
                  {/* Hemp Paper Pattern / Gradient */}
                  <linearGradient id="hemp-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#bf9d70" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#d5b88c" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#ac8957" stopOpacity="0.95" />
                  </linearGradient>

                  {/* Flax Paper Gradient */}
                  <linearGradient id="flax-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d1d5db" stopOpacity="0.75" />
                    <stop offset="50%" stopColor="#ffffff" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#b9bec6" stopOpacity="0.8" />
                  </linearGradient>

                  {/* Wood Pulp Gradient */}
                  <linearGradient id="wood-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ccbaa6" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#e3d2bf" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#bca994" stopOpacity="0.95" />
                  </linearGradient>

                  {/* Glass Tip Gradient */}
                  <linearGradient id="glass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                    <stop offset="40%" stopColor="rgba(200,220,255,0.2)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
                  </linearGradient>

                  {/* Metallic Accents */}
                  <linearGradient id="gold-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffd700" />
                    <stop offset="50%" stopColor="#fff8dc" />
                    <stop offset="100%" stopColor="#daa520" />
                  </linearGradient>

                  <linearGradient id="silver-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e5e7eb" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#9ca3af" />
                  </linearGradient>

                  {/* Drop Shadow filter */}
                  <filter id="glow-shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.6" />
                  </filter>
                </defs>

                {/* Cone Shadow */}
                <path
                  d={`M 30,60 L ${30 + sizes[size].width},30 L ${30 + sizes[size].width},90 Z`}
                  fill="rgba(0,0,0,0.5)"
                  filter="url(#glow-shadow)"
                />

                {/* Pre-roll Cone Body */}
                <path
                  d={`M 30,60 L ${30 + sizes[size].width},35 L ${30 + sizes[size].width},85 Z`}
                  fill={`url(#${paper}-grad)`}
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="0.5"
                />

                {/* Filter Tip / Crutch */}
                <path
                  d={`M ${30 + sizes[size].width - sizes[size].tipWidth},43 L ${30 + sizes[size].width},35 L ${30 + sizes[size].width},85 L ${30 + sizes[size].width - sizes[size].tipWidth},77 Z`}
                  fill={tipStyle === "glass" ? "url(#glass-grad)" : "rgba(245, 240, 230, 0.95)"}
                  stroke={tipStyle === "glass" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.1)"}
                  strokeWidth="0.5"
                />

                {/* Filter Details (Visual representation of Spiral/W-Tip) */}
                {tipStyle === "spiral" && (
                  <>
                    <path d={`M ${30 + sizes[size].width - sizes[size].tipWidth + 15},43 L ${30 + sizes[size].width - sizes[size].tipWidth + 25},78`} stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
                    <path d={`M ${30 + sizes[size].width - sizes[size].tipWidth + 35},41 L ${30 + sizes[size].width - sizes[size].tipWidth + 45},80`} stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
                    <path d={`M ${30 + sizes[size].width - sizes[size].tipWidth + 55},39 L ${30 + sizes[size].width - sizes[size].tipWidth + 65},82`} stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
                  </>
                )}

                {tipStyle === "w-tip" && (
                  <path
                    d={`M ${30 + sizes[size].width - 15},40 L ${30 + sizes[size].width - 10},50 L ${30 + sizes[size].width - 12},60 L ${30 + sizes[size].width - 8},70 L ${30 + sizes[size].width - 15},80`}
                    fill="none"
                    stroke="rgba(0,0,0,0.25)"
                    strokeWidth="1"
                  />
                )}

                {/* Glass tip reflection lines */}
                {tipStyle === "glass" && (
                  <>
                    <line x1={30 + sizes[size].width - sizes[size].tipWidth + 10} y1={52} x2={30 + sizes[size].width - 10} y2={45} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                    <line x1={30 + sizes[size].width - sizes[size].tipWidth + 15} y1={70} x2={30 + sizes[size].width - 15} y2={67} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  </>
                )}

                {/* Custom Branding Overlays */}
                {tipCustom === "gold-band" && (
                  <rect
                    x={30 + sizes[size].width - sizes[size].tipWidth + 5}
                    y={42.5}
                    width="6"
                    height="35.5"
                    fill="url(#gold-grad)"
                  />
                )}

                {tipCustom === "silver-band" && (
                  <rect
                    x={30 + sizes[size].width - sizes[size].tipWidth + 5}
                    y={42.5}
                    width="6"
                    height="35.5"
                    fill="url(#silver-grad)"
                  />
                )}

                {tipCustom === "logo-print" && (
                  <g>
                    {/* Dark wrapper ring */}
                    <path
                      d={`M ${30 + sizes[size].width - sizes[size].tipWidth + 15},41 L ${30 + sizes[size].width - sizes[size].tipWidth + 50},38 L ${30 + sizes[size].width - sizes[size].tipWidth + 50},82 L ${30 + sizes[size].width - sizes[size].tipWidth + 15},79 Z`}
                      fill="#121212"
                      opacity="0.9"
                    />
                    {/* Logo Text on Crutch */}
                    <text
                      x={30 + sizes[size].width - sizes[size].tipWidth + 32}
                      y={62}
                      fill="#e5e7eb"
                      fontSize="6"
                      fontWeight="bold"
                      fontFamily="Outfit, sans-serif"
                      letterSpacing="0.8"
                      textAnchor="middle"
                      transform={`rotate(6, ${30 + sizes[size].width - sizes[size].tipWidth + 32}, 62)`}
                    >
                      {customLogoText}
                    </text>
                  </g>
                )}
              </svg>
            </div>

            <div className="specs-overlay">
              <div className="spec-item">
                <span className="spec-label">Format:</span>
                <span className="spec-value">{sizes[size].label}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Paper:</span>
                <span className="spec-value">{papers[paper].label}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Tip:</span>
                <span className="spec-value">{tips[tipStyle].label}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Capacity:</span>
                <span className="spec-value">~{sizes[size].capacity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="config-panel">
          <h2 className="section-title">CONE CONFIGURATOR</h2>
          <p className="section-subtitle">Define specifications for bulk enterprise manufacturing.</p>

          <form onSubmit={handleInquirySubmit} className="config-form">
            {/* Size Selector */}
            <div className="config-section">
              <label className="config-label">1. SELECT CONE SIZE</label>
              <div className="option-selectors">
                {Object.keys(sizes).map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`option-btn ${size === s ? "active" : ""}`}
                    onClick={() => setSize(s)}
                  >
                    <span className="opt-title">{s}</span>
                    <span className="opt-desc">{sizes[s].capacity}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Paper Material Selector */}
            <div className="config-section">
              <label className="config-label">2. SELECT RAW PAPER MATERIAL</label>
              <div className="option-selectors">
                {Object.keys(papers).map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`option-btn ${paper === p ? "active" : ""}`}
                    onClick={() => setPaper(p)}
                  >
                    <span className="opt-title">{papers[p].label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Tip Style */}
            <div className="config-section">
              <label className="config-label">3. FILTER CRUTCH STRUCTURE</label>
              <div className="option-selectors">
                {Object.keys(tips).map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`option-btn ${tipStyle === t ? "active" : ""}`}
                    onClick={() => setTipStyle(t)}
                  >
                    <span className="opt-title">{tips[t].label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Branding options */}
            <div className="config-section">
              <label className="config-label">4. EMBELLISHMENT & BRANDING</label>
              <div className="option-selectors">
                {Object.keys(customs).map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`option-btn ${tipCustom === c ? "active" : ""}`}
                    onClick={() => setTipCustom(c)}
                  >
                    <span className="opt-title">{customs[c].label}</span>
                  </button>
                ))}
              </div>

              {tipCustom === "logo-print" && (
                <div className="branding-subinput fade-in">
                  <label className="branding-sublabel">Enter Logo Mark Text</label>
                  <input
                    type="text"
                    className="mfg-input text-uppercase"
                    maxLength={10}
                    value={customLogoText}
                    onChange={(e) => setCustomLogoText(e.target.value.toUpperCase())}
                  />
                  <small className="branding-help">Maximum 10 characters for print definition.</small>
                </div>
              )}
            </div>

            {/* B2B Quantities */}
            <div className="config-section">
              <div className="config-quantity-row">
                <label className="config-label">5. TARGET PRODUCTION VOLUME</label>
                <span className="qty-value">{quantity.toLocaleString()} Cones</span>
              </div>
              <input
                type="range"
                className="qty-range-slider"
                min={20000}
                max={500000}
                step={10000}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <div className="range-labels">
                <span>20k (MOQ)</span>
                <span>250k</span>
                <span>500k+</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="config-action-area">
              {inquirySent ? (
                <div className="inquiry-success-msg fade-in">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>SPECIFICATIONS LOGGED. AN ACCOUNT DIRECTOR WILL CONTACT YOU WITH CONTRACT SAMPLES.</span>
                </div>
              ) : (
                <button type="submit" className="btn btn-silver btn-full">
                  REQUEST PRODUCTION SAMPLES WITH THESE SPECS
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
