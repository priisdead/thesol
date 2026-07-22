import React, { useRef, useEffect } from "react";

/**
 * Dependency-free circular gallery — a draggable, momentum-scrolled row of
 * cards bent into a shallow arc, with infinite looping. No WebGL / no libs.
 *
 * Props:
 *   items      – [{ image, text }]
 *   cardWidth  – px width of each card
 *   cardHeight – px height of each card
 *   gap        – px gap between cards
 *   bend       – px vertical arc depth at the edges
 *   height     – px height of the gallery viewport
 */
export default function CircularGallery({
  items = [],
  cardWidth = 300,
  cardHeight = 380,
  gap = 28,
  bend = 55,
  height = 520,
}) {
  const wrapRef = useRef(null);
  const cardsRef = useRef([]);
  const state = useRef({ current: 0, target: 0, vel: 0, dragging: false, lastX: 0, cw: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const st = state.current;

    // Responsive sizing: on small screens shrink the cards so a side card
    // still peeks in (signalling the gallery is draggable) and nothing is
    // clipped. `sc` scales card, gap, arc and the geometry together.
    const measure = () => {
      st.cw = wrap.clientWidth || 1000;
      // Cap the card to ~80% of the viewport so side cards peek in on phones.
      st.sc = Math.min(1, (st.cw * 0.8) / cardWidth);
      st.cardW = cardWidth * st.sc;
      st.cardH = cardHeight * st.sc;
      st.gap = gap * st.sc;
      st.stride = st.cardW + st.gap;
      st.W = Math.max(1, items.length) * st.stride;
      cardsRef.current.forEach((el) => {
        if (!el) return;
        el.style.width = st.cardW + "px";
        el.style.height = st.cardH + "px";
        el.style.marginTop = -st.cardH / 2 + "px";
        if (el.firstChild) el.firstChild.style.height = st.cardH - 44 * st.sc + "px";
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);

    const render = () => {
      const center = st.cw / 2;
      const W = st.W;
      const half = W / 2;
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        let wrapped = ((i * st.stride - st.current) % W + W) % W;
        if (wrapped > half) wrapped -= W;
        const screenX = center + wrapped;
        const dxNorm = Math.max(-1.2, Math.min(1.2, wrapped / (center || 1)));
        const arcY = bend * st.sc * dxNorm * dxNorm;
        const scale = 1 - 0.16 * dxNorm * dxNorm;
        const opacity = 1 - 0.55 * Math.min(1, Math.abs(dxNorm));
        el.style.transform = `translate3d(${screenX - st.cardW / 2}px, ${arcY}px, 0) scale(${scale})`;
        el.style.opacity = String(Math.max(0, opacity));
        el.style.zIndex = String(1000 - Math.round(Math.abs(wrapped)));
      });
    };

    const tick = () => {
      if (st.dragging) {
        st.current += (st.target - st.current) * 0.22;
      } else {
        st.target += st.vel;
        st.vel *= 0.92;
        if (Math.abs(st.vel) < 0.03) st.vel = 0;
        st.current += (st.target - st.current) * 0.09;
      }
      render();
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    const getX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);
    const onDown = (e) => {
      st.dragging = true; st.vel = 0; st.lastX = getX(e);
      wrap.classList.add("cg-grabbing");
    };
    const onMove = (e) => {
      if (!st.dragging) return;
      const x = getX(e);
      const dx = x - st.lastX;
      st.lastX = x;
      st.target -= dx;
      st.vel = -dx * 0.55;
    };
    const onUp = () => {
      st.dragging = false;
      wrap.classList.remove("cg-grabbing");
    };
    const onWheel = (e) => {
      // Only capture horizontal intent; let vertical page scroll pass through.
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        st.target += e.deltaX;
        e.preventDefault();
      }
    };

    wrap.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    wrap.addEventListener("touchstart", onDown, { passive: true });
    wrap.addEventListener("touchmove", onMove, { passive: true });
    wrap.addEventListener("touchend", onUp);
    wrap.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      wrap.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      wrap.removeEventListener("touchstart", onDown);
      wrap.removeEventListener("touchmove", onMove);
      wrap.removeEventListener("touchend", onUp);
      wrap.removeEventListener("wheel", onWheel);
    };
  }, [items, cardWidth, cardHeight, gap, bend]);

  return (
    <div ref={wrapRef} className="cg-wrap" style={{ height }}>
      {items.map((it, i) => (
        <div
          key={i}
          ref={(el) => (cardsRef.current[i] = el)}
          className="cg-card"
          style={{ width: cardWidth, height: cardHeight, marginTop: -cardHeight / 2 }}
        >
          <div className="cg-img" style={{ height: cardHeight - 46 }}>
            <img src={it.image} alt={it.text} draggable="false" loading="lazy" />
          </div>
          <div className="cg-label">{it.text}</div>
        </div>
      ))}
      <style>{`
        .cg-wrap { position:relative; width:100%; overflow:hidden; cursor:grab; user-select:none; touch-action:pan-y; }
        .cg-wrap.cg-grabbing { cursor:grabbing; }
        .cg-card { position:absolute; top:50%; left:0; will-change:transform,opacity; }
        .cg-img { background:#fff; border-radius:16px; overflow:hidden; border:1px solid rgba(255,255,255,0.10); display:flex; align-items:center; justify-content:center; box-shadow:0 24px 60px rgba(0,0,0,0.45); }
        .cg-img img { width:100%; height:100%; object-fit:contain; padding:6px; box-sizing:border-box; display:block; pointer-events:none; }
        .cg-label { text-align:center; margin-top:16px; font-size:15px; font-weight:600; color:#fff; letter-spacing:0.02em; }
      `}</style>
    </div>
  );
}
