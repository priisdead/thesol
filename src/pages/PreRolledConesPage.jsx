import React, { useEffect } from "react";
import CircularGallery from "../components/CircularGallery";

const SPEC_HIGHLIGHTS = [
  { value: "1mm", label: "Precision Gumline" },
  { value: "3mm", label: "Minimum Overlap" },
  { value: "70+", label: "European Papers" },
  { value: "4,800", label: "MOQ From" },
];

// Real size chart — SOL France brochure, "Custom Cone & Filter Tip Sizes"
const SIZE_CHART = [
  { code: "120/26", name: "Wide", length: "120 mm", tip: "26 mm", mouth: "14.0 mm", base: "7.0 mm", weight: "1.5 g" },
  { code: "109/26", name: "King", length: "109 mm", tip: "26 mm", mouth: "12.5 mm", base: "5.5 mm", weight: "1.0 g" },
  { code: "109/21", name: "King 21", length: "109 mm", tip: "21 mm", mouth: "12.5 mm", base: "5.5 mm", weight: "1.0 g" },
  { code: "98/26", name: "Med 26", length: "98 mm", tip: "26 mm", mouth: "11.8 mm", base: "5.5 mm", weight: "0.8 g" },
  { code: "98/21", name: "Med 21", length: "98 mm", tip: "21 mm", mouth: "11.8 mm", base: "5.5 mm", weight: "0.9 g" },
  { code: "98/30", name: "Reefer 30", length: "98 mm", tip: "30 mm", mouth: "9.2 mm", base: "5.2 mm", weight: "0.45 g" },
  { code: "98/26", name: "Reefer", length: "98 mm", tip: "26 mm", mouth: "9.2 mm", base: "5.2 mm", weight: "0.5 g" },
  { code: "84/26", name: "One-D", length: "84 mm", tip: "26 mm", mouth: "9.0 mm", base: "7.8 mm", weight: "0.7 g" },
  { code: "84/26", name: "Mini", length: "84 mm", tip: "26 mm", mouth: "10.9 mm", base: "5.5 mm", weight: "0.6 g" },
  { code: "84/21", name: "Queen", length: "84 mm", tip: "21 mm", mouth: "10.9 mm", base: "5.5 mm", weight: "0.65 g" },
  { code: "84/30", name: "Quantum", length: "84 mm", tip: "30 mm", mouth: "10.9 mm", base: "5.5 mm", weight: "0.5 g" },
  { code: "70/26", name: "Dogwalker", length: "70 mm", tip: "26 mm", mouth: "10.0 mm", base: "5.5 mm", weight: "0.4 g" },
  { code: "60/26", name: "Shortee", length: "60 mm", tip: "26 mm", mouth: "9.35 mm", base: "5.5 mm", weight: "0.3 g" },
];

const PAPERS = [
  { name: "Refined White", note: "100% Wood", img: "/images/papers/refined-white.png" },
  { name: "Natural Brown", note: "100% Wood", img: "/images/papers/natural-brown.png" },
  { name: "Organic Hemp", note: "100% Hemp", img: "/images/papers/organic-hemp.png" },
  { name: "Blue", note: "100% Wood", img: "/images/papers/blue.png" },
  { name: "Green", note: "100% Wood", img: "/images/papers/green.png" },
  { name: "Pink", note: "100% Wood", img: "/images/papers/pink.png" },
  { name: "Purple", note: "100% Wood", img: "/images/papers/purple.png" },
  { name: "Black", note: "100% Wood", img: "/images/papers/black.png" },
];

const PACKS = [
  { name: "Pack of 1", note: "Single sleeve", img: "/images/packs/pack-1.jpg" },
  { name: "Pack of 3 / 6", note: "Retail multipack", img: "/images/packs/pack-6.jpg" },
  { name: "Pack of 20", note: "Display box", img: "/images/packs/pack-20.jpg" },
  { name: "Pack of 50", note: "Bulk tube", img: "/images/packs/pack-50-v3.jpg" },
  { name: "Tower Pack", note: "Vertical tower display", img: "/images/packs/tower.jpg" },
  { name: "Papers & Tips", note: "32 premium papers + tips", img: "/images/packs/papers-tips.jpg" },
  { name: "Roach Book", note: "50 filter tips", img: "/images/packs/roach-book-v2.jpg" },
];

const FEATURES = [
  { k: "01", t: "Least pass-through in the industry", d: "A 1mm gumline and 3mm minimum overlap mean the tightest seal we can engineer — barely any herb escapes through the seam." },
  { k: "02", t: "Machine & knock-box compatible", d: "Camera-sorted for shape consistency, so your auto-packing lines run at a 99.9% fill rate without jams or canoeing." },
  { k: "03", t: "Lab-tested every batch", d: "Third-party ISO-17025 certified — zero heavy metals, pesticides, microplastics, or chlorine bleach. Certificates with every order." },
];

const PCX_CSS = `
.pcx { --line: rgba(255,255,255,0.10); --line-2: rgba(255,255,255,0.06); --muted:#8b938c; --mono: ui-monospace,'SFMono-Regular',Menlo,monospace; overflow-x: hidden; }
.pcx .container { position: relative; z-index: 1; }

/* ---------- HERO ---------- */
.pcx-hero { display:grid; grid-template-columns:1.05fr 0.95fr; gap:64px; align-items:center; margin-top:8px; }
.pcx-hero-badge { display:inline-flex; align-items:center; gap:10px; font-family:var(--mono); font-size:11px; letter-spacing:0.16em; text-transform:uppercase; color:var(--muted); border:1px solid var(--line); border-radius:100px; padding:8px 16px; }
.pcx-hero-badge .dot { width:6px; height:6px; border-radius:50%; background:#5fbf7a; box-shadow:0 0 10px #5fbf7a; }
.pcx-hero h1 { font-size:clamp(40px,6vw,80px); line-height:0.98; letter-spacing:-0.04em; font-weight:800; color:#fff; margin:26px 0 0; text-transform:uppercase; }
.pcx-hero h1 .thin { display:block; color:var(--muted); font-weight:300; -webkit-text-fill-color:currentColor; }
.pcx-hero p.lead { font-size:17px; line-height:1.65; color:#c7ccc7; max-width:46ch; margin:26px 0 32px; }
.pcx-hero-actions { display:flex; gap:14px; flex-wrap:wrap; }
.pcx-strip { display:flex; gap:26px; flex-wrap:wrap; margin-top:34px; padding-top:26px; border-top:1px solid var(--line); }
.pcx-strip .s .v { font-size:22px; font-weight:800; color:#fff; letter-spacing:-0.01em; }
.pcx-strip .s .l { font-family:var(--mono); font-size:10.5px; letter-spacing:0.12em; text-transform:uppercase; color:var(--muted); margin-top:4px; }

.pcx-hero-visual { position:relative; }
.pcx-hero-frame { position:relative; border-radius:18px; overflow:hidden; border:1px solid var(--line); aspect-ratio:11/10; background:#fff; }
.pcx-hero-frame img { width:100%; height:100%; object-fit:cover; display:block; }
.pcx-hero-glow { position:absolute; inset:-40px; z-index:-1; background:radial-gradient(circle at 50% 40%, rgba(120,140,160,0.25), transparent 60%); filter:blur(30px); }
.pcx-float-tag { position:absolute; left:-18px; bottom:26px; background:#0c0c0c; border:1px solid var(--line); border-radius:12px; padding:16px 20px; box-shadow:0 20px 50px rgba(0,0,0,0.5); }
.pcx-float-tag .n { font-size:30px; font-weight:800; color:#fff; letter-spacing:-0.02em; }
.pcx-float-tag .c { font-family:var(--mono); font-size:10.5px; letter-spacing:0.12em; text-transform:uppercase; color:var(--muted); margin-top:2px; }

/* ---------- SECTION SHELL ---------- */
.pcx-section { margin-top:120px; }
.pcx-eyebrow { font-family:var(--mono); font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:var(--muted); }
.pcx-h2 { font-size:clamp(28px,4vw,44px); line-height:1.05; letter-spacing:-0.03em; font-weight:800; color:#fff; margin:14px 0 0; }
.pcx-lead2 { font-size:16px; line-height:1.7; color:#c7ccc7; max-width:58ch; margin-top:18px; }

/* ---------- FEATURES (editorial rows) ---------- */
.pcx-features { display:grid; grid-template-columns:repeat(3,1fr); gap:26px; margin-top:48px; }
.pcx-feature { border:1px solid var(--line); border-radius:14px; padding:34px 30px; background:linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0)); transition:border-color .25s ease, transform .25s ease; }
.pcx-feature:hover { border-color:rgba(255,255,255,0.24); transform:translateY(-4px); }
.pcx-feature .k { font-family:var(--mono); font-size:12px; color:var(--muted); letter-spacing:0.1em; }
.pcx-feature h3 { font-size:20px; line-height:1.2; letter-spacing:-0.01em; color:#fff; margin:18px 0 12px; font-weight:700; }
.pcx-feature p { font-size:14.5px; line-height:1.65; color:#aab0aa; margin:0; }

/* ---------- PAPERS ---------- */
.pcx-papers { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-top:44px; }
.pcx-paper { border:1px solid var(--line); border-radius:14px; overflow:hidden; background:rgba(255,255,255,0.02); transition:border-color .25s ease, transform .25s ease; }
.pcx-paper:hover { border-color:rgba(255,255,255,0.28); transform:translateY(-4px); }
.pcx-paper .im { height:230px; background:#fff; display:flex; align-items:center; justify-content:center; }
.pcx-paper .im img { width:100%; height:100%; object-fit:contain; padding:10px; box-sizing:border-box; display:block; }
.pcx-paper .mt { padding:16px 18px; display:flex; align-items:baseline; justify-content:space-between; gap:10px; }
.pcx-paper .nm { font-size:14.5px; color:#fff; font-weight:600; }
.pcx-paper .nt { font-family:var(--mono); font-size:10.5px; color:var(--muted); letter-spacing:0.06em; text-transform:uppercase; }

/* ---------- PACKS ---------- */
.pcx-packs { display:flex; flex-wrap:wrap; gap:20px; justify-content:center; margin-top:44px; }
.pcx-pack { flex:0 1 calc(25% - 15px); box-sizing:border-box; border:1px solid var(--line); border-radius:14px; overflow:hidden; background:rgba(255,255,255,0.02); transition:border-color .25s ease, transform .25s ease; }
.pcx-pack:hover { border-color:rgba(255,255,255,0.28); transform:translateY(-4px); }
.pcx-pack .im { height:270px; background:#fff; display:flex; align-items:center; justify-content:center; overflow:hidden; }
.pcx-pack .im img { width:100%; height:100%; object-fit:contain; padding:24px; box-sizing:border-box; display:block; }
.pcx-pack .im.ph { background:rgba(255,255,255,0.03); display:flex; align-items:center; justify-content:center; gap:10px; flex-direction:column; }
.pcx-pack .im.ph svg { width:34px; height:34px; stroke:var(--muted); opacity:0.7; }
.pcx-pack .im.ph .lbl { font-family:var(--mono); font-size:10.5px; letter-spacing:0.16em; text-transform:uppercase; color:var(--muted); }
.pcx-pack .mt { padding:16px 18px; }
.pcx-pack .nm { font-size:15px; color:#fff; font-weight:700; }
.pcx-pack .nt { font-family:var(--mono); font-size:11px; color:var(--muted); margin-top:4px; letter-spacing:0.05em; }
.pcx-drag-hint { text-align:center; margin-top:22px; font-family:var(--mono); font-size:11px; letter-spacing:0.16em; text-transform:uppercase; color:var(--muted); }
/* Break the gallery out of the padded container to full viewport width */
.pcx-fullbleed { width:100vw; margin-left:calc(50% - 50vw); }

/* ---------- SIZE TABLE ---------- */
.pcx-table-wrap { margin-top:44px; border:1px solid var(--line); border-radius:14px; overflow:hidden; }
.pcx-table-scroll { overflow-x:auto; }
.pcx-table { width:100%; border-collapse:collapse; min-width:680px; }
.pcx-table th { text-align:left; font-family:var(--mono); font-size:10.5px; letter-spacing:0.14em; text-transform:uppercase; color:var(--muted); font-weight:500; padding:18px 20px; background:rgba(255,255,255,0.03); border-bottom:1px solid var(--line); }
.pcx-table td { padding:16px 20px; border-bottom:1px solid var(--line-2); font-size:14px; color:#d6dad6; }
.pcx-table tr:last-child td { border-bottom:none; }
.pcx-table td.code { font-family:var(--mono); color:#fff; font-weight:600; }
.pcx-table td.name { color:#fff; font-weight:600; }
.pcx-table td.mono { font-family:var(--mono); font-size:13px; color:#b6bcb6; }
.pcx-table tbody tr:hover td { background:rgba(255,255,255,0.03); }

/* ---------- CTA ---------- */
.pcx-cta { margin-top:120px; border:1px solid var(--line); border-radius:18px; padding:60px 54px; text-align:center; background:radial-gradient(circle at 50% 0%, rgba(255,255,255,0.06), rgba(255,255,255,0) 70%); }
.pcx-cta h3 { font-size:clamp(26px,3.4vw,38px); letter-spacing:-0.03em; font-weight:800; color:#fff; margin:0 0 14px; }
.pcx-cta p { font-size:15px; color:var(--muted); margin:0 auto 30px; max-width:52ch; }
.pcx-cta-actions { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }

@media (max-width: 980px) {
  .pcx-hero { grid-template-columns:1fr; gap:44px; }
  .pcx-hero-visual { order:-1; }
  .pcx-features { grid-template-columns:1fr; }
  .pcx-papers { grid-template-columns:repeat(2,1fr); }
  .pcx-pack { flex-basis: calc(50% - 10px); }
  .pcx-section { margin-top:84px; }
  .pcx-cta { margin-top:84px; padding:44px 28px; }
}
@media (max-width: 520px) {
  .pcx-papers { grid-template-columns:1fr; }
  .pcx-pack { flex-basis: 100%; }
  .pcx-strip { gap:20px; }
  .pcx-float-tag { left:12px; }
}
`;

export default function PreRolledConesPage({ setRoute }) {
  useEffect(() => {
    document.title = "Pre-Rolled Cones — Sizes, Papers & Specs | SOL France";
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement("meta");
      m.name = "description";
      document.head.appendChild(m);
    }
    m.content =
      "SOL France pre-rolled cones: 13 standard sizes, 70+ European papers, 1mm gumline, machine-compatible, lab-tested. MOQ from 4,800. Custom branding available.";
  }, []);

  const goContact = () => setRoute("contact");

  return (
    <div className="pcx page-wrapper section-padding bg-darker">
      <style>{PCX_CSS}</style>
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb-nav reveal-on-scroll" aria-label="Breadcrumb">
          <ul className="breadcrumb-list">
            <li><button onClick={() => setRoute("home")}>Home</button></li>
            <li className="separator">/</li>
            <li><button onClick={() => setRoute("products")}>Products</button></li>
            <li className="separator">/</li>
            <li><span className="current">Pre-Rolled Cones</span></li>
          </ul>
        </nav>

        {/* HERO */}
        <section className="pcx-hero reveal-on-scroll reveal-blur">
          <div className="pcx-hero-copy">
            <span className="pcx-hero-badge"><span className="dot" />GMP · ISO 9001:2015 · HEAVY-METAL TESTED</span>
            <h1>Pre-Rolled<span className="thin">Cones</span></h1>
            <p className="lead">
              An engineered delivery system, not an afterthought. Tightest seal in the industry, machine-ready,
              and lab-tested on every batch — built to carry your brand at scale.
            </p>
            <div className="pcx-hero-actions">
              <button onClick={goContact} className="btn btn-silver" style={{ padding: "15px 30px" }}>REQUEST SAMPLE</button>
              <button onClick={goContact} className="btn btn-outline" style={{ padding: "15px 30px" }}>GET A QUOTE</button>
            </div>
            <div className="pcx-strip">
              {SPEC_HIGHLIGHTS.map((s, i) => (
                <div className="s" key={i}>
                  <div className="v">{s.value}</div>
                  <div className="l">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="pcx-hero-visual">
            <div className="pcx-hero-glow" />
            <div className="pcx-hero-frame">
              <img src="/images/hero-products/cones-hero.jpg" alt="SOL France pre-rolled cones" />
            </div>
            <div className="pcx-float-tag">
              <div className="n">13</div>
              <div className="c">Standard Sizes</div>
            </div>
          </div>
        </section>

        {/* PACK FORMATS (Retail Format) */}
        <section className="pcx-section reveal-on-scroll">
          <span className="pcx-eyebrow">Retail-Ready</span>
          <h2 className="pcx-h2">Retail formats.</h2>
          <p className="pcx-lead2">From single foil sleeves to bulk cartons — child-resistant and display options available for every SKU.</p>
          <div className="pcx-fullbleed" style={{ marginTop: "44px" }}>
            <CircularGallery items={PACKS.map((p) => ({ image: p.img, text: p.name }))} />
          </div>
          <p className="pcx-drag-hint">Drag to explore · loops endlessly</p>
        </section>

        {/* PAPER TYPES */}
        <section className="pcx-section reveal-on-scroll">
          <span className="pcx-eyebrow">70+ European Variants</span>
          <h2 className="pcx-h2">Paper types.</h2>
          <p className="pcx-lead2">Ultra-thin flax, organic hemp, and unbleached wood pulp — in refined white, natural, and a full run of food-grade colors.</p>
          <div className="pcx-fullbleed" style={{ marginTop: "44px" }}>
            <CircularGallery items={PAPERS.map((p) => ({ image: p.img, text: p.name }))} />
          </div>
          <p className="pcx-drag-hint">Drag to explore · loops endlessly</p>
        </section>

        {/* STANDARD SIZES */}
        <section className="pcx-section reveal-on-scroll">
          <span className="pcx-eyebrow">13 Shapes · 0.3g – 1.5g</span>
          <h2 className="pcx-h2">Standard sizes.</h2>
          <div className="pcx-table-wrap">
            <div className="pcx-table-scroll">
              <table className="pcx-table">
                <thead>
                  <tr>
                    <th>Size</th><th>Shape</th><th>Length</th><th>Tip</th><th>Mouth Ø</th><th>Tip Ø</th><th>Fill</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_CHART.map((r, i) => (
                    <tr key={i}>
                      <td className="code">{r.code}</td>
                      <td className="name">{r.name}</td>
                      <td className="mono">{r.length}</td>
                      <td className="mono">{r.tip}</td>
                      <td className="mono">{r.mouth}</td>
                      <td className="mono">{r.base}</td>
                      <td className="mono">{r.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* WHY SOL (Features) */}
        <section className="pcx-section reveal-on-scroll">
          <span className="pcx-eyebrow">Why SOL Cones</span>
          <h2 className="pcx-h2">Precision you can put your name on.</h2>
          <div className="pcx-features">
            {FEATURES.map((f) => (
              <div className="pcx-feature" key={f.k}>
                <div className="k">{f.k}</div>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pcx-cta reveal-on-scroll">
          <h3>Put SOL cones in your line.</h3>
          <p>Complimentary evaluation kits for licensed operators and established brands. MOQ from 4,800 cones — custom branding available.</p>
          <div className="pcx-cta-actions">
            <button onClick={goContact} className="btn btn-silver" style={{ padding: "16px 34px" }}>REQUEST SAMPLE BOX</button>
            <button onClick={goContact} className="btn btn-outline" style={{ padding: "16px 34px" }}>GET A QUOTE</button>
          </div>
        </section>
      </div>
    </div>
  );
}
