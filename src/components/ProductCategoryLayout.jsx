import React, { useEffect } from "react";
import CircularGallery from "./CircularGallery";

const PCL_CSS = `
.pcl { --line: rgba(255,255,255,0.10); --line-2: rgba(255,255,255,0.06); --muted:#8b938c; --mono: ui-monospace,'SFMono-Regular',Menlo,monospace; overflow-x:hidden; }
.pcl-fullbleed { width:100vw; margin-left:calc(50% - 50vw); }
.pcl-drag-hint { text-align:center; margin-top:22px; font-family:var(--mono); font-size:11px; letter-spacing:0.16em; text-transform:uppercase; color:var(--muted); }
.pcl-highlights { display:grid; gap:0; border:1px solid var(--line); border-radius:6px; overflow:hidden; margin-top:56px; }
.pcl-highlights.cols-4 { grid-template-columns:repeat(4,1fr); }
.pcl-highlights.cols-3 { grid-template-columns:repeat(3,1fr); }
.pcl-highlights.cols-2 { grid-template-columns:repeat(2,1fr); }
.pcl-highlight { padding:30px 26px; border-right:1px solid var(--line); }
.pcl-highlight:last-child { border-right:none; }
.pcl-highlight .v { font-size:32px; font-weight:800; letter-spacing:-0.02em; color:#fff; }
.pcl-highlight .l { font-family:var(--mono); font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:var(--muted); margin-top:8px; }

.pcl-section { margin-top:88px; }
.pcl-section-head { display:flex; align-items:baseline; justify-content:space-between; gap:20px; padding-bottom:20px; border-bottom:1px solid var(--line); }
.pcl-section-head h2 { font-size:30px; font-weight:800; letter-spacing:-0.02em; color:#fff; margin:0; }
.pcl-section-head .kick { font-family:var(--mono); font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:var(--muted); }
.pcl-section-intro { font-size:15px; line-height:1.7; color:var(--muted); margin:22px 0 0; max-width:70ch; }

.pcl-table-wrap { overflow-x:auto; }
.pcl-table { width:100%; border-collapse:collapse; min-width:560px; }
.pcl-table th { text-align:left; font-family:var(--mono); font-size:10.5px; letter-spacing:0.16em; text-transform:uppercase; color:var(--muted); font-weight:500; padding:18px 16px; border-bottom:1px solid var(--line); }
.pcl-table td { padding:16px; border-bottom:1px solid var(--line-2); font-size:14px; color:#e9ece9; }
.pcl-table td:first-child { font-weight:600; color:#fff; }
.pcl-table td:not(:first-child) { font-family:var(--mono); font-size:13px; color:#c7ccc7; }
.pcl-table tr:hover td { background:rgba(255,255,255,0.03); }

.pcl-papers { display:grid; grid-template-columns:repeat(4,1fr); gap:18px; margin-top:32px; }
.pcl-paper { border:1px solid var(--line); border-radius:8px; overflow:hidden; background:rgba(255,255,255,0.02); transition:border-color .25s ease, transform .25s ease; }
.pcl-paper:hover { border-color:rgba(255,255,255,0.28); transform:translateY(-3px); }
.pcl-paper .sw { height:88px; width:100%; }
.pcl-paper .meta { padding:13px 15px; }
.pcl-paper .nm { font-size:14px; color:#fff; font-weight:600; }
.pcl-paper .nt { font-family:var(--mono); font-size:11px; color:var(--muted); margin-top:4px; letter-spacing:0.05em; }

.pcl-features { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:32px; }
.pcl-feature { border:1px solid var(--line); border-radius:8px; padding:26px 24px; background:rgba(255,255,255,0.02); }
.pcl-feature .fn { font-size:16px; font-weight:700; color:#fff; margin-bottom:10px; letter-spacing:-0.01em; }
.pcl-feature .fd { font-size:13.5px; line-height:1.65; color:var(--muted); }

.pcl-imgcards { display:grid; grid-template-columns:repeat(2,1fr); gap:22px; margin-top:32px; }
.pcl-imgcard { border:1px solid var(--line); border-radius:10px; overflow:hidden; background:rgba(255,255,255,0.02); transition:border-color .25s ease, transform .25s ease; }
.pcl-imgcard:hover { border-color:rgba(255,255,255,0.24); transform:translateY(-3px); }
.pcl-imgcard-img { background:#ffffff; height:300px; display:flex; align-items:center; justify-content:center; }
.pcl-imgcard-img img { width:100%; height:100%; object-fit:contain; padding:24px; box-sizing:border-box; display:block; }
.pcl-imgcard-body { padding:24px 26px; }
.pcl-imgcard-body .fn { font-size:18px; font-weight:700; color:#fff; margin-bottom:10px; letter-spacing:-0.01em; }
.pcl-imgcard-body .fd { font-size:14px; line-height:1.65; color:var(--muted); }
@media (max-width:760px){ .pcl-imgcards { grid-template-columns:1fr; } }

.pcl-gallery { display:grid; grid-template-columns:repeat(auto-fit, minmax(200px,1fr)); gap:18px; margin-top:32px; }
.pcl-gcard { border:1px solid var(--line); border-radius:10px; overflow:hidden; background:rgba(255,255,255,0.02); transition:border-color .25s ease, transform .25s ease; }
.pcl-gcard:hover { border-color:rgba(255,255,255,0.24); transform:translateY(-3px); }
.pcl-gimg { background:#ffffff; height:300px; display:flex; align-items:center; justify-content:center; }
.pcl-gimg img { width:100%; height:100%; object-fit:contain; padding:22px; box-sizing:border-box; display:block; }
.pcl-glabel { padding:14px 14px; font-size:13.5px; font-weight:600; color:#fff; text-align:center; letter-spacing:0.01em; }
@media (max-width:640px){ .pcl-gallery { grid-template-columns:repeat(2,1fr); } }

.pcl-list { list-style:none; margin:28px 0 0; padding:0; display:grid; grid-template-columns:repeat(2,1fr); gap:14px 40px; }
.pcl-list li { position:relative; padding-left:22px; font-size:14.5px; color:#e9ece9; }
.pcl-list li::before { content:""; position:absolute; left:0; top:9px; width:7px; height:7px; border-radius:50%; background:#e93d48; }

.pcl-skus { display:flex; flex-wrap:wrap; gap:12px; margin-top:28px; }
.pcl-sku { font-family:var(--mono); font-size:13px; letter-spacing:0.06em; color:#e9ece9; border:1px solid var(--line); border-radius:100px; padding:11px 22px; }

.pcl-cta { margin-top:96px; border:1px solid var(--line); border-radius:10px; padding:48px 44px; display:flex; align-items:center; justify-content:space-between; gap:30px; flex-wrap:wrap; background:linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0)); }
.pcl-cta h3 { font-size:26px; font-weight:800; letter-spacing:-0.02em; color:#fff; margin:0 0 8px; }
.pcl-cta p { font-size:14px; color:var(--muted); margin:0; max-width:52ch; }
.pcl-cta-actions { display:flex; gap:14px; flex-wrap:wrap; }

@media (max-width:900px) {
  .pcl-highlights.cols-4, .pcl-highlights.cols-3 { grid-template-columns:repeat(2,1fr); }
  .pcl-papers { grid-template-columns:repeat(2,1fr); }
  .pcl-features { grid-template-columns:1fr; }
  .pcl-list { grid-template-columns:1fr; }
  .pcl-highlight { border-right:none; border-bottom:1px solid var(--line); }
}
@media (max-width:560px){ .pcl-highlight .v{font-size:26px;} .pcl-section-head h2{font-size:24px;} }
`;

function Section({ s }) {
  return (
    <div className="pcl-section reveal-on-scroll">
      <div className="pcl-section-head">
        <h2>{s.title}</h2>
        {s.kicker && <span className="kick">{s.kicker}</span>}
      </div>
      {s.intro && <p className="pcl-section-intro">{s.intro}</p>}

      {s.type === "table" && (
        <div className="pcl-table-wrap">
          <table className="pcl-table">
            <thead>
              <tr>{s.columns.map((c, i) => <th key={i}>{c}</th>)}</tr>
            </thead>
            <tbody>
              {s.rows.map((r, ri) => (
                <tr key={ri}>{r.map((c, ci) => <td key={ci}>{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {s.type === "swatches" && (
        <div className="pcl-papers">
          {s.items.map((it, i) => (
            <div className="pcl-paper" key={i}>
              <div className="sw" style={{ background: it.color || "#2a2a2a" }} />
              <div className="meta">
                <div className="nm">{it.name}</div>
                {it.note && <div className="nt">{it.note}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {s.type === "features" && (
        <div className="pcl-features">
          {s.items.map((it, i) => (
            <div className="pcl-feature" key={i}>
              <div className="fn">{it.name}</div>
              {it.desc && <div className="fd">{it.desc}</div>}
            </div>
          ))}
        </div>
      )}

      {s.type === "imagecards" && (
        <div className="pcl-imgcards">
          {s.items.map((it, i) => (
            <div className="pcl-imgcard" key={i}>
              {it.img && (
                <div className="pcl-imgcard-img">
                  <img src={it.img} alt={it.name} loading="lazy" />
                </div>
              )}
              <div className="pcl-imgcard-body">
                <div className="fn">{it.name}</div>
                {it.desc && <div className="fd">{it.desc}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {s.type === "gallery" && (
        <div className="pcl-gallery">
          {s.items.map((it, i) => (
            <div className="pcl-gcard" key={i}>
              <div className="pcl-gimg"><img src={it.img} alt={it.name} loading="lazy" /></div>
              <div className="pcl-glabel">{it.name}</div>
            </div>
          ))}
        </div>
      )}

      {s.type === "circular" && (
        <>
          <div className="pcl-fullbleed" style={{ marginTop: "36px" }}>
            <CircularGallery
              items={s.items.map((it) => ({ image: it.img, text: it.name }))}
              cardWidth={s.cardWidth || 210}
              cardHeight={s.cardHeight || 440}
              height={s.galleryHeight || 560}
            />
          </div>
          <p className="pcl-drag-hint">Drag to explore · loops endlessly</p>
        </>
      )}

      {s.type === "list" && (
        <ul className="pcl-list">
          {s.items.map((it, i) => <li key={i}>{it}</li>)}
        </ul>
      )}

      {s.type === "chips" && (
        <div className="pcl-skus">
          {s.items.map((it, i) => <span className="pcl-sku" key={i}>{it}</span>)}
        </div>
      )}
    </div>
  );
}

export default function ProductCategoryLayout({
  setRoute,
  crumb,
  badge,
  title,
  subtitle,
  seoTitle,
  seoDesc,
  highlights = [],
  sections = [],
  ctaTitle,
  ctaText,
}) {
  useEffect(() => {
    document.title = seoTitle || `${crumb} | SOL France`;
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement("meta");
      m.name = "description";
      document.head.appendChild(m);
    }
    if (seoDesc) m.content = seoDesc;
  }, [seoTitle, seoDesc, crumb]);

  const goContact = () => setRoute("contact");
  const hlCols = Math.min(Math.max(highlights.length, 2), 4);

  return (
    <div className="pcl page-wrapper section-padding bg-darker">
      <style>{PCL_CSS}</style>
      <div className="container">
        <nav className="breadcrumb-nav reveal-on-scroll" aria-label="Breadcrumb">
          <ul className="breadcrumb-list">
            <li><button onClick={() => setRoute("home")}>Home</button></li>
            <li className="separator">/</li>
            <li><button onClick={() => setRoute("products")}>Products</button></li>
            <li className="separator">/</li>
            <li><span className="current">{crumb}</span></li>
          </ul>
        </nav>

        <div className="category-subpage-header text-center-wrapper reveal-on-scroll reveal-scale reveal-blur">
          {badge && <span className="section-badge">{badge}</span>}
          <h1 className="section-title" style={{ fontSize: "64px", letterSpacing: "-0.04em" }}>{title}</h1>
          {subtitle && (
            <p className="section-subtitle-center" style={{ fontSize: "18px", lineHeight: "1.6", opacity: 0.8 }}>
              {subtitle}
            </p>
          )}
        </div>

        {highlights.length > 0 && (
          <div className={`pcl-highlights cols-${hlCols} reveal-on-scroll`}>
            {highlights.map((h, i) => (
              <div className="pcl-highlight" key={i}>
                <div className="v">{h.value}</div>
                <div className="l">{h.label}</div>
              </div>
            ))}
          </div>
        )}

        {sections.map((s, i) => <Section key={i} s={s} />)}

        <div className="pcl-cta reveal-on-scroll">
          <div>
            <h3>{ctaTitle || "Request a sample box or a bulk quote"}</h3>
            {ctaText && <p>{ctaText}</p>}
          </div>
          <div className="pcl-cta-actions">
            <button onClick={goContact} className="btn btn-silver" style={{ padding: "16px 32px" }}>REQUEST SAMPLE</button>
            <button onClick={goContact} className="btn btn-outline" style={{ padding: "16px 32px" }}>GET A QUOTE</button>
          </div>
        </div>
      </div>
    </div>
  );
}
