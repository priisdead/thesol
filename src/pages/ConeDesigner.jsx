import React, { useState, useEffect } from "react";
import ConeViewer3D from "../components/ConeViewer3D";

const SIZES = [
  { id: "120", label: "120 / 26 Wide", note: "1.5 g", dims: { length: 3.9, rTop: 0.72, rBot: 0.22, filterH: 0.72 } },
  { id: "109", label: "109 / 26 King", note: "1.0 g", dims: { length: 3.5, rTop: 0.62, rBot: 0.2, filterH: 0.7 } },
  { id: "98", label: "98 / 26 Medium", note: "0.8 g", dims: { length: 3.15, rTop: 0.58, rBot: 0.2, filterH: 0.7 } },
  { id: "84", label: "84 / 26 Mini", note: "0.6 g", dims: { length: 2.7, rTop: 0.55, rBot: 0.2, filterH: 0.7 } },
  { id: "70", label: "70 / 26 Dogwalker", note: "0.4 g", dims: { length: 2.25, rTop: 0.5, rBot: 0.2, filterH: 0.7 } },
];

const PAPERS = [
  { name: "Refined White", color: "#f4f1ea" },
  { name: "Natural Brown", color: "#b98a5e" },
  { name: "Organic Hemp", color: "#c9b99a" },
  { name: "Blue", color: "#2f5fa8" },
  { name: "Green", color: "#3f8f5a" },
  { name: "Pink", color: "#e58fb0" },
  { name: "Purple", color: "#6a4b9c" },
  { name: "Black", color: "#1a1a1a" },
];

const CRUTCHES = [
  { name: "Tan", color: "#c19a5b" },
  { name: "Kraft", color: "#a9743f" },
  { name: "White", color: "#efe9dd" },
  { name: "Black", color: "#1c1c1c" },
];

const CD_CSS = `
.cd { --line: rgba(255,255,255,0.10); --line-2: rgba(255,255,255,0.06); --muted:#8b938c; --mono: ui-monospace,'SFMono-Regular',Menlo,monospace; }
.cd-grid { display:grid; grid-template-columns:1.1fr 0.9fr; gap:48px; margin-top:56px; align-items:start; }
.cd-stage { position:relative; height:600px; border:1px solid var(--line); border-radius:14px; background:radial-gradient(circle at 50% 40%, rgba(255,255,255,0.05), rgba(255,255,255,0) 60%); overflow:hidden; }
.cd-hint { position:absolute; left:50%; bottom:14px; transform:translateX(-50%); font-family:var(--mono); font-size:11px; letter-spacing:0.16em; text-transform:uppercase; color:rgba(255,255,255,0.5); pointer-events:none; white-space:nowrap; }
.cd-panel { display:flex; flex-direction:column; gap:34px; }
.cd-block .cd-block-head { display:flex; align-items:baseline; justify-content:space-between; margin-bottom:16px; }
.cd-block-head h3 { font-size:15px; font-weight:700; letter-spacing:0.02em; color:#fff; margin:0; text-transform:uppercase; }
.cd-block-head .cd-val { font-family:var(--mono); font-size:12px; color:var(--muted); }

.cd-sizes { display:flex; flex-wrap:wrap; gap:10px; }
.cd-size { font-family:var(--mono); font-size:12.5px; letter-spacing:0.03em; color:#e9ece9; border:1px solid var(--line); border-radius:100px; padding:10px 18px; background:none; cursor:pointer; transition:border-color .2s ease, background .2s ease, color .2s ease; }
.cd-size:hover { border-color:rgba(255,255,255,0.35); }
.cd-size.active { background:#fff; color:#0a0a0a; border-color:#fff; }
.cd-size .cd-size-note { opacity:0.55; margin-left:6px; }
.cd-size.active .cd-size-note { opacity:0.6; }

.cd-swatches { display:flex; flex-wrap:wrap; gap:12px; }
.cd-swatch { width:46px; height:46px; border-radius:50%; cursor:pointer; border:2px solid rgba(255,255,255,0.12); position:relative; transition:transform .15s ease, border-color .15s ease; }
.cd-swatch:hover { transform:scale(1.08); }
.cd-swatch.active { border-color:#fff; box-shadow:0 0 0 3px rgba(255,255,255,0.15); }

.cd-toggle-row { display:flex; align-items:center; gap:14px; }
.cd-toggle { position:relative; width:52px; height:28px; border-radius:100px; border:1px solid var(--line); background:rgba(255,255,255,0.06); cursor:pointer; transition:background .2s ease; padding:0; }
.cd-toggle.on { background:#fff; }
.cd-toggle .knob { position:absolute; top:3px; left:3px; width:20px; height:20px; border-radius:50%; background:#cfcfcf; transition:transform .2s ease, background .2s ease; }
.cd-toggle.on .knob { transform:translateX(24px); background:#0a0a0a; }
.cd-toggle-label { font-size:14px; color:#e9ece9; }

.cd-summary { border:1px solid var(--line); border-radius:10px; padding:18px 20px; background:rgba(255,255,255,0.02); }
.cd-summary .cd-sum-title { font-family:var(--mono); font-size:10.5px; letter-spacing:0.16em; text-transform:uppercase; color:var(--muted); margin-bottom:10px; }
.cd-summary .cd-sum-line { font-size:14px; color:#e9ece9; line-height:1.7; }
.cd-summary .cd-sum-line strong { color:#fff; }

@media (max-width:900px) {
  .cd-grid { grid-template-columns:1fr; gap:32px; }
  .cd-stage { height:440px; position:relative; }
}
`;

export default function ConeDesigner({ setRoute }) {
  const [sizeId, setSizeId] = useState("109");
  const [paper, setPaper] = useState(PAPERS[0]);
  const [crutch, setCrutch] = useState(CRUTCHES[0]);
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    document.title = "Design Your Cone | SOL France";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content =
      "Customize your SOL France pre-roll cone in 3D — pick the size, paper color, filter color, and branding, and see it come to life instantly.";
  }, []);

  const size = SIZES.find((s) => s.id === sizeId) || SIZES[1];

  return (
    <div className="cd page-wrapper section-padding bg-darker">
      <style>{CD_CSS}</style>
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb-nav reveal-on-scroll" aria-label="Breadcrumb">
          <ul className="breadcrumb-list">
            <li><button onClick={() => setRoute("home")}>Home</button></li>
            <li className="separator">/</li>
            <li><span className="current">Design Your Cone</span></li>
          </ul>
        </nav>

        {/* Header */}
        <div className="text-center-wrapper reveal-on-scroll reveal-scale reveal-blur">
          <span className="section-badge">3D CONE STUDIO</span>
          <h1 className="section-title" style={{ fontSize: "60px", letterSpacing: "-0.04em" }}>DESIGN YOUR CONE</h1>
          <p className="section-subtitle-center" style={{ fontSize: "17px", lineHeight: "1.6", opacity: 0.8 }}>
            Configure size, paper, filter, and branding — and watch it build in real time. A live preview of what we can manufacture for your brand.
          </p>
        </div>

        {/* Studio */}
        <div className="cd-grid">
          {/* 3D stage */}
          <div className="cd-stage reveal-on-scroll">
            <ConeViewer3D
              paperColor={paper.color}
              crutchColor={crutch.color}
              showLogo={showLogo}
              dims={size.dims}
            />
            <span className="cd-hint">Drag to rotate · Scroll to zoom</span>
          </div>

          {/* Controls */}
          <div className="cd-panel reveal-on-scroll">
            {/* Size */}
            <div className="cd-block">
              <div className="cd-block-head">
                <h3>Size</h3>
                <span className="cd-val">{size.label}</span>
              </div>
              <div className="cd-sizes">
                {SIZES.map((s) => (
                  <button
                    key={s.id}
                    className={`cd-size ${s.id === sizeId ? "active" : ""}`}
                    onClick={() => setSizeId(s.id)}
                  >
                    {s.label}
                    <span className="cd-size-note">{s.note}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Paper color */}
            <div className="cd-block">
              <div className="cd-block-head">
                <h3>Paper</h3>
                <span className="cd-val">{paper.name}</span>
              </div>
              <div className="cd-swatches">
                {PAPERS.map((p) => (
                  <button
                    key={p.name}
                    aria-label={p.name}
                    title={p.name}
                    className={`cd-swatch ${p.name === paper.name ? "active" : ""}`}
                    style={{ background: p.color }}
                    onClick={() => setPaper(p)}
                  />
                ))}
              </div>
            </div>

            {/* Crutch color */}
            <div className="cd-block">
              <div className="cd-block-head">
                <h3>Filter Tip</h3>
                <span className="cd-val">{crutch.name}</span>
              </div>
              <div className="cd-swatches">
                {CRUTCHES.map((cch) => (
                  <button
                    key={cch.name}
                    aria-label={cch.name}
                    title={cch.name}
                    className={`cd-swatch ${cch.name === crutch.name ? "active" : ""}`}
                    style={{ background: cch.color }}
                    onClick={() => setCrutch(cch)}
                  />
                ))}
              </div>
            </div>

            {/* Logo toggle */}
            <div className="cd-block">
              <div className="cd-block-head">
                <h3>Branding</h3>
                <span className="cd-val">{showLogo ? "Logo On" : "Blank"}</span>
              </div>
              <div className="cd-toggle-row">
                <button
                  className={`cd-toggle ${showLogo ? "on" : ""}`}
                  onClick={() => setShowLogo((v) => !v)}
                  aria-pressed={showLogo}
                  aria-label="Toggle logo"
                >
                  <span className="knob" />
                </button>
                <span className="cd-toggle-label">Print SOL logo on the crutch</span>
              </div>
            </div>

            {/* Summary */}
            <div className="cd-summary">
              <div className="cd-sum-title">Your Configuration</div>
              <div className="cd-sum-line">
                <strong>{size.label}</strong> · {paper.name} paper · {crutch.name} filter ·{" "}
                {showLogo ? "SOL branded" : "unbranded"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
