import React, { useEffect, useRef } from "react";

export default function SmokeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Motion accessibility check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Interactive mouse and scroll tracking
    const mouse = { x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 };
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();

    // Procedural Stretched Wisp class
    class HorizontalWisp {
      constructor(init = false) {
        this.reset(init);
      }

      reset(init = false) {
        // Alternating directions: 80% left-to-right, 20% right-to-left
        this.direction = Math.random() < 0.8 ? 1 : -1;
        
        // Spawn off-screen depending on direction
        if (this.direction === 1) {
          this.x = init ? Math.random() * (width + 600) - 300 : -350;
        } else {
          this.x = init ? Math.random() * (width + 600) - 300 : width + 350;
        }

        // Float in the middle of the viewport (30% to 70% height)
        this.baseY = height * (0.3 + Math.random() * 0.38);
        this.y = this.baseY;

        // Slow horizontal drift velocity
        const speed = Math.random() * 0.32 + 0.15;
        this.vx = speed * this.direction * (prefersReducedMotion ? 0.25 : 1.0);
        this.vy = (Math.random() - 0.5) * 0.08;

        // Wave turbulence offsets
        this.wobble = Math.random() * 100;
        this.wobbleSpeed = Math.random() * 0.008 + 0.003;
        this.waveFreq = Math.random() * 0.005 + 0.002;
        this.waveAmp = Math.random() * 25 + 15;

        // Highly stretched organic dimensions (prevents round particle/puff look)
        this.sizeX = Math.random() * 160 + 180; // wide width
        this.sizeY = Math.random() * 30 + 25;   // thin height
        this.growth = Math.random() * 0.04 + 0.02;

        this.angle = (Math.random() - 0.5) * 0.18; // slightly tilted
        this.spinSpeed = (Math.random() - 0.5) * 0.0004;

        // Subtle, atmospheric opacity bounds (boosted 95% for very strong white highlights)
        this.maxAlpha = Math.random() * 0.1 + 0.22;
        this.alpha = 0;
        
        // Lifespan
        this.life = Math.random() * 1200 + 800;
        this.maxLife = this.life;
      }

      update() {
        this.wobble += this.wobbleSpeed;
        this.angle += this.spinSpeed;

        // 1. Horizontal drift
        this.x += this.vx + mouse.vx * 0.015;

        // 2. Swirling vertical motion via sine wave turbulence
        const wave = Math.sin(this.x * this.waveFreq + this.wobble) * this.waveAmp;
        
        // 3. Mouse proximity deflection
        let mouseOffset = 0;
        if (mouse.x > -500) {
          const distX = Math.abs(mouse.x - this.x);
          if (distX < 240) {
            const distY = mouse.y - this.y;
            const influence = Math.exp(-(distX * distX + distY * distY) * 0.00004);
            mouseOffset = mouse.vy * influence * 0.45;
          }
        }

        // 4. Scroll lag translation
        const scrollOffset = scrollVelocity * Math.sin(this.x * 0.001) * 15;

        this.y = this.baseY + this.vy * (this.maxLife - this.life) + wave + mouseOffset + scrollOffset;

        // Slow natural expansion
        this.sizeX += this.growth * 2.0;
        this.sizeY += this.growth * 0.3;
        this.life--;

        // Boundaries reset
        if (
          this.life <= 0 ||
          (this.direction === 1 && this.x > width + 400) ||
          (this.direction === -1 && this.x < -400)
        ) {
          this.reset();
        }

        // Horizontal linear edge fading + age fade profile
        const borderFade = Math.min(1.0, (this.x + 300) / 300, (width + 300 - this.x) / 300);
        const ageRatio = this.life / this.maxLife;
        const baseAlpha = ageRatio > 0.8 ? ((1 - ageRatio) / 0.2) * this.maxAlpha : (ageRatio / 0.8) * this.maxAlpha;

        this.alpha = baseAlpha * borderFade;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Draw a highly stretched wisp ellipse with a soft radial gradient (95% boosted highlights)
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.sizeX);
        grad.addColorStop(0, `rgba(255, 255, 255, ${this.alpha * 1.6})`);
        grad.addColorStop(0.28, `rgba(255, 255, 255, ${this.alpha * 1.2})`);
        grad.addColorStop(0.6, `rgba(225, 225, 225, ${this.alpha * 0.55})`);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        // Scale vertical dimension dynamically to stretch the gradient ellipse
        ctx.scale(1, this.sizeY / this.sizeX);
        ctx.arc(0, 0, this.sizeX, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Fog segment array configuration
    const wispsCount = prefersReducedMotion ? 6 : 16;
    const wisps = [];

    // Initialize segments
    for (let i = 0; i < wispsCount; i++) {
      wisps.push(new HorizontalWisp(true));
    }

    // Animation Loop
    const loop = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(loop);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Matte dark room backdrop
      ctx.fillStyle = "#080808";
      ctx.fillRect(0, 0, width, height);

      // Damp mouse and scroll vectors
      mouse.vx *= 0.94;
      mouse.vy *= 0.94;
      scrollVelocity *= 0.92;

      // Update and draw segments
      wisps.forEach((wisp) => {
        wisp.update();
        wisp.draw();
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    // Resize Handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      wisps.forEach((w) => w.reset(true));
    };

    const handleMouseMove = (e) => {
      mouse.vx = e.clientX - mouse.lastX;
      mouse.vy = e.clientY - mouse.lastY;
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.vx = 0;
      mouse.vy = 0;
    };

    const handleScroll = () => {
      const now = Date.now();
      const currentScrollY = window.scrollY;
      const timeDiff = now - lastScrollY;
      if (timeDiff > 0) {
        scrollVelocity = (currentScrollY - lastScrollY) / timeDiff;
      }
      lastScrollY = currentScrollY;
      lastScrollTime = now;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -2, // strictly in the background behind all content
        pointerEvents: "none",
        filter: "blur(52px) translate3d(0, 0, 0)", // heavy soft blur to eradicate all edges
      }}
    />
  );
}
