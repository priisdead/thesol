import React, { useState } from "react";
import PreRollCustomizer from "../components/PreRollCustomizer";

export default function CustomManufacturing({ setRoute }) {
  const [activeStep, setActiveStep] = useState(0);

  const processSteps = [
    {
      title: "Crop Selection & Fiber Harvesting",
      desc: "We source our raw wood pulp, organic flax, and organic hemp directly from certified agricultural partners in Western Europe. Only high-purity, long-fiber stalks are selected to ensure superior paper tensile strength."
    },
    {
      title: "Pulp Refining & Water Purification",
      desc: "Fibers are processed using clean, spring water loops and mechanical milling. We do not use chlorine bleach or synthetic chemical accelerators. This preserves the natural cellulose structure, delivering taste-free combustion."
    },
    {
      title: "Automated Precision Slitting",
      desc: "Refined paper sheets are slit into exact arcs with high-speed diamond blades. Precision cutting down to the micron ensures that when rolled, the taper angle is perfectly calibrated for standard automated packing cones."
    },
    {
      title: "GMP Cleanroom Hand-Rolling & Folding",
      desc: "Cones are rolled and crutches are nested inside class-100,000 cleanroom environments. A tiny droplet of organic food-grade gum arabic seals the seam, cured under humidity-monitored ovens to lock structural geometry."
    },
    {
      title: "Three-Tier Quality Control & Calibration",
      desc: "Completed batches undergo camera checks for diameter accuracy, manual weight tension pull tests to verify glue seams, and batch lab testing for heavy metals. Moisture content is strictly locked at 11.5%."
    },
    {
      title: "Hermetic Packaging & Dispatch",
      desc: "Cones are stacked into rigid cardboard inner cases and sealed inside moisture-barrier foil bags with desiccant packs. Outer crates are shipped to our LA or Rotterdam hubs for rapid regional distribution."
    }
  ];

  return (
    <div className="page-wrapper custom-mfg-page section-padding">
      <div className="container">
        {/* Page Header */}
        <div className="mfg-header text-center-wrapper reveal-on-scroll">
          <span className="section-badge">B2B CONTRACT SERVICES</span>
          <h1 className="section-title">CUSTOM MANUFACTURING & OEM</h1>
          <p className="section-subtitle-center">
            From custom watermarked fibers to bespoke Child-Resistant packaging layouts. 
            We build proprietary physical configurations at industrial scale.
          </p>
        </div>

        {/* OEM & Private Label Services Section */}
        <section className="mfg-oem-intro section-padding m-bottom-2">
          <div className="grid-2">
            <div className="oem-intro-text reveal-on-scroll">
              <h3>OEM Pre-Roll Supply Chain Partner</h3>
              <p>
                SOL acts as the invisible backend partner for some of the world's most recognizable brands. Whether you need custom printed crutches, colored papers, unique cone sizing (e.g. 1.5g king sizes), or FSC certified wood pulp, we provide end-to-end industrial capability.
              </p>
              <div className="capabilities-badges">
                <span className="c-badge">Custom Watermarks</span>
                <span className="c-badge">Custom Crutch Lengths</span>
                <span className="c-badge">Metallic Accent Bands</span>
                <span className="c-badge">Custom Outer Sleeves</span>
                <span className="c-badge">Glass tip logo decals</span>
              </div>
              <button onClick={() => { setRoute("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="btn btn-silver m-top-1">
                INQUIRE FOR PRIVATE LABEL CONTRACT
              </button>
            </div>
            
            <div className="oem-intro-stats reveal-on-scroll">
              <div className="oem-stat-box">
                <strong>4-6 Wks</strong>
                <span>Average lead time for custom production runs</span>
              </div>
              <div className="oem-stat-box">
                <strong>20,000</strong>
                <span>Custom cone MOQ (Industry lowest for certified GMP)</span>
              </div>
              <div className="oem-stat-box">
                <strong>10M+</strong>
                <span>Cones daily output capacity across facilities</span>
              </div>
            </div>
          </div>
        </section>

        {/* Live Configurator Section */}
        <section className="customizer-section-wrapper section-padding bg-darker m-bottom-2 reveal-on-scroll">
          <div className="text-center-wrapper">
            <span className="section-badge">DESIGN LAB</span>
            <h2 className="section-title">CONE CONFIGURATOR</h2>
            <p className="section-subtitle-center">
              Configure paper bases, sizes, crutch styles, and custom branding overlays in real-time.
            </p>
          </div>
          <PreRollCustomizer />
        </section>

        {/* Materials and Paper Catalog */}
        <section className="materials-catalog-section section-padding m-bottom-2">
          <div className="text-center-wrapper reveal-on-scroll">
            <span className="section-badge">FIBER INVENTORY</span>
            <h2 className="section-title">RAW PAPER SPECIFICATIONS</h2>
            <p className="section-subtitle-center">
              We process only high-purity, sustainably sourced crop fibers.
            </p>
          </div>

          <div className="materials-specs-grid">
            <div className="mat-spec-card reveal-on-scroll">
              <div className="mat-header">
                <h3>Organic Unrefined Hemp</h3>
                <span className="mat-weight">13.5 GSM</span>
              </div>
              <p>Natural unbleached hemp fibers. Rich brown color, visible plant fibers, providing a smooth organic visual style. Very resilient under high tension packing loaders.</p>
              <div className="mat-details">
                <div className="det-row"><span>Source:</span> <span>Northern France / Non-GMO</span></div>
                <div className="det-row"><span>Taste Index:</span> <span>Neutral, mild sweet aroma</span></div>
                <div className="det-row"><span>Burn Index:</span> <span>Slowest combustion rate</span></div>
              </div>
            </div>

            <div className="mat-spec-card reveal-on-scroll">
              <div className="mat-header">
                <h3>Ultra-Thin Organic Flax</h3>
                <span className="mat-weight">12.5 GSM</span>
              </div>
              <p>Made from refined linseed flax fibers. Highly translucent, elegant white paper that lets the green herbal contents shine. Highly clean combustion profile.</p>
              <div className="mat-details">
                <div className="det-row"><span>Source:</span> <span>Belgium / FSC Certified</span></div>
                <div className="det-row"><span>Taste Index:</span> <span>Zero flavor interference</span></div>
                <div className="det-row"><span>Burn Index:</span> <span>Steady, slow combustion</span></div>
              </div>
            </div>

            <div className="mat-spec-card reveal-on-scroll">
              <div className="mat-header">
                <h3>Classic White Wood Pulp</h3>
                <span className="mat-weight">14.0 GSM</span>
              </div>
              <p>Double-washed wood cellulose fibers. Bleached naturally using oxygen-based loops (100% chlorine free). Rigid structure prevents auto-pack loading crunches.</p>
              <div className="mat-details">
                <div className="det-row"><span>Source:</span> <span>Sweden / Sustainable Forestry</span></div>
                <div className="det-row"><span>Taste Index:</span> <span>Completely tasteless</span></div>
                <div className="det-row"><span>Burn Index:</span> <span>Steady, uniform combustion</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Manufacturing Process Walkthrough */}
        <section className="mfg-process-section section-padding bg-darker m-bottom-2">
          <div className="text-center-wrapper reveal-on-scroll">
            <span className="section-badge">PRODUCTION WORKFLOW</span>
            <h2 className="section-title">THE PATH TO THE PACKER</h2>
            <p className="section-subtitle-center">
              Follow our industrial process from raw agricultural fiber to shipping container.
            </p>
          </div>

          <div className="process-timeline-layout reveal-on-scroll">
            <div className="process-left-nav">
              {processSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`process-step-btn ${activeStep === idx ? "active" : ""}`}
                >
                  <span className="step-num">STAGE 0{idx + 1}</span>
                  <span className="step-title">{step.title}</span>
                </button>
              ))}
            </div>
            
            <div className="process-right-display fade-in">
              <div className="process-display-card">
                <div className="stage-indicator">STAGE 0{activeStep + 1}</div>
                <h3>{processSteps[activeStep].title}</h3>
                <p>{processSteps[activeStep].desc}</p>
                <div className="simulated-process-artwork">
                  <div className="artwork-lines"></div>
                  <div className="artwork-status font-mono">GMP SYSTEM CALIBRATION ACTIVE</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industries Served */}
        <section className="industries-served-section section-padding">
          <div className="text-center-wrapper reveal-on-scroll">
            <span className="section-badge">GLOBAL OUTREACH</span>
            <h2 className="section-title">INDUSTRIES WE SERVE</h2>
          </div>

          <div className="industries-grid">
            <div className="industry-card reveal-on-scroll">
              <h4>Licensed Producers (LPs)</h4>
              <p>High-volume commercial cultivators requiring million-cone shipping schedules, batch certificates, and compatibility with automated pre-roll packing platforms.</p>
            </div>
            <div className="industry-card reveal-on-scroll">
              <h4>Multi-State Operators (MSOs)</h4>
              <p>Muti-location brands needing absolute consistency in paper specs across different state borders, ensuring exact brand replication everywhere.</p>
            </div>
            <div className="industry-card reveal-on-scroll">
              <h4>Independent Brands</h4>
              <p>Boutique pre-roll companies looking for unique branding options (such as wood and glass tips, colored papers, and custom embossing) to stand out on dispensary shelves.</p>
            </div>
            <div className="industry-card reveal-on-scroll">
              <h4>Pre-Roll Co-Packers</h4>
              <p>Specialized co-packing partners who depend on zero-defect cones to keep their automated lines running and maximize daily production yield.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
