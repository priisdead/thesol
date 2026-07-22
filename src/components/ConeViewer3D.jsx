import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Interactive, customizable 3D pre-roll cone (built procedurally, no model file).
 * Drag to rotate, scroll to zoom, gentle auto-spin when idle.
 *
 * Live-updatable props (no WebGL rebuild):
 *   paperColor  – rolling-paper color (hex string), tints the paper grain
 *   crutchColor – filter-tip color (hex string)
 *   showLogo    – print the SOL logo on the cylindrical crutch wall
 *   dims        – { length, rTop, rBot, filterH } cone proportions
 */
export const DEFAULT_DIMS = { length: 3.4, rTop: 0.62, rBot: 0.2, filterH: 0.7 };

function srgbLuminance(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substr(0, 2), 16) / 255;
  const g = parseInt(h.substr(2, 2), 16) / 255;
  const b = parseInt(h.substr(4, 2), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export default function ConeViewer3D({
  paperColor = "#f4f1ea",
  crutchColor = "#c19a5b",
  showLogo = true,
  dims = DEFAULT_DIMS,
  paperTextureUrl = "/images/textures/cone-paper.png",
  logoUrl = "/images/textures/sol-logo.png",
  autoRotate = true,
}) {
  const mountRef = useRef(null);
  const engineRef = useRef(null);

  // ---- Build the persistent scene ONCE -----------------------------------
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth || 400;
    let height = mount.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0.2, 0.6, 7);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (err) {
      console.warn("ConeViewer3D: WebGL unavailable, skipping 3D cone.", err);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    mount.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(4, 6, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xbcd4ff, 1.2);
    rim.position.set(-5, 2, -4);
    scene.add(rim);
    const fill = new THREE.PointLight(0xffffff, 0.5);
    fill.position.set(0, -3, 4);
    scene.add(fill);

    // Live state shared with the update effects
    const state = { paperColor, crutchColor, showLogo, dims };

    // Paper grain texture (tinted by material color)
    const texLoader = new THREE.TextureLoader();
    const paperTex = texLoader.load(paperTextureUrl);
    paperTex.colorSpace = THREE.SRGBColorSpace;
    paperTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // Crutch texture generated on a canvas (color fill + recolored logo)
    const crutchCanvas = document.createElement("canvas");
    crutchCanvas.width = 1795;
    crutchCanvas.height = 1000;
    const crutchCtx = crutchCanvas.getContext("2d");
    const crutchTex = new THREE.CanvasTexture(crutchCanvas);
    crutchTex.colorSpace = THREE.SRGBColorSpace;
    crutchTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const logoImg = new Image();
    let logoLoaded = false;
    logoImg.onload = () => {
      logoLoaded = true;
      drawCrutch();
    };
    logoImg.src = logoUrl;

    function drawCrutch() {
      const c = crutchCtx;
      const W = crutchCanvas.width;
      const H = crutchCanvas.height;
      c.clearRect(0, 0, W, H);
      c.fillStyle = state.crutchColor;
      c.fillRect(0, 0, W, H);
      if (state.showLogo && logoLoaded) {
        const la = logoImg.width / logoImg.height;
        let lw = W * 0.9;
        let lh = lw / la;
        if (lh > H * 0.82) {
          lh = H * 0.82;
          lw = lh * la;
        }
        // Recolor the (black) logo for contrast against the crutch color
        const tmp = document.createElement("canvas");
        tmp.width = Math.round(lw);
        tmp.height = Math.round(lh);
        const tc = tmp.getContext("2d");
        tc.drawImage(logoImg, 0, 0, tmp.width, tmp.height);
        tc.globalCompositeOperation = "source-in";
        tc.fillStyle = srgbLuminance(state.crutchColor) > 0.5 ? "#141414" : "#ffffff";
        tc.fillRect(0, 0, tmp.width, tmp.height);
        c.drawImage(tmp, (W - lw) / 2, (H - lh) / 2);
      }
      crutchTex.needsUpdate = true;
    }
    drawCrutch();

    // Materials
    const materials = {
      paper: new THREE.MeshStandardMaterial({
        color: new THREE.Color(state.paperColor),
        map: paperTex,
        roughness: 0.78,
        metalness: 0.0,
        side: THREE.DoubleSide,
      }),
      mouth: new THREE.MeshStandardMaterial({
        color: 0x2a2620,
        roughness: 1,
        side: THREE.DoubleSide,
      }),
      side: new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: crutchTex,
        roughness: 0.8,
        metalness: 0.0,
      }),
      cap: new THREE.MeshStandardMaterial({
        color: new THREE.Color(state.crutchColor),
        roughness: 0.85,
        metalness: 0.0,
      }),
    };

    // Cone group + geometry (rebuildable on size change)
    const cone = new THREE.Group();
    cone.rotation.z = 0.14;
    scene.add(cone);
    let body = null;
    let mouth = null;
    let filter = null;

    function buildGeometry(d) {
      if (body) {
        cone.remove(body);
        body.geometry.dispose();
      }
      if (mouth) {
        cone.remove(mouth);
        mouth.geometry.dispose();
      }
      if (filter) {
        cone.remove(filter);
        filter.geometry.dispose();
      }
      body = new THREE.Mesh(
        new THREE.CylinderGeometry(d.rTop, d.rBot, d.length, 72, 1, true),
        materials.paper
      );
      body.position.y = d.length / 2;
      cone.add(body);

      mouth = new THREE.Mesh(
        new THREE.CircleGeometry(d.rTop * 0.9, 48),
        materials.mouth
      );
      mouth.rotation.x = -Math.PI / 2;
      mouth.position.y = d.length - 0.28;
      cone.add(mouth);

      filter = new THREE.Mesh(
        new THREE.CylinderGeometry(d.rBot, d.rBot, d.filterH, 48),
        [materials.side, materials.cap, materials.cap]
      );
      filter.position.y = -d.filterH / 2;
      cone.add(filter);

      cone.position.y = -(d.length - d.filterH) / 2;
    }
    buildGeometry(state.dims);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.minDistance = 4.5;
    controls.maxDistance = 11;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.5;
    controls.minPolarAngle = Math.PI * 0.15;
    controls.maxPolarAngle = Math.PI * 0.85;
    controls.target.set(0, 0, 0);

    let resumeTimer = null;
    const onStart = () => {
      controls.autoRotate = false;
      if (resumeTimer) clearTimeout(resumeTimer);
    };
    const onEnd = () => {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        controls.autoRotate = autoRotate;
      }, 2500);
    };
    controls.addEventListener("start", onStart);
    controls.addEventListener("end", onEnd);

    // Render loop (paused off-screen)
    let raf = null;
    let visible = true;
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(mount);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      width = mount.clientWidth || width;
      height = mount.clientHeight || height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // Expose an API for the update effects
    engineRef.current = {
      state,
      materials,
      drawCrutch,
      buildGeometry,
    };

    // Cleanup
    return () => {
      engineRef.current = null;
      if (raf) cancelAnimationFrame(raf);
      if (resumeTimer) clearTimeout(resumeTimer);
      io.disconnect();
      ro.disconnect();
      controls.removeEventListener("start", onStart);
      controls.removeEventListener("end", onEnd);
      controls.dispose();
      if (body) body.geometry.dispose();
      if (mouth) mouth.geometry.dispose();
      if (filter) filter.geometry.dispose();
      paperTex.dispose();
      crutchTex.dispose();
      Object.values(materials).forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
    // Build once — dynamic props are applied by the effects below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paperTextureUrl, logoUrl, autoRotate]);

  // ---- Apply color / logo changes live -----------------------------------
  useEffect(() => {
    const e = engineRef.current;
    if (!e) return;
    e.state.paperColor = paperColor;
    e.state.crutchColor = crutchColor;
    e.state.showLogo = showLogo;
    e.materials.paper.color.set(paperColor);
    e.materials.cap.color.set(crutchColor);
    e.drawCrutch();
  }, [paperColor, crutchColor, showLogo]);

  // ---- Apply size changes live -------------------------------------------
  useEffect(() => {
    const e = engineRef.current;
    if (!e) return;
    e.state.dims = dims;
    e.buildGeometry(dims);
  }, [dims]);

  return (
    <div ref={mountRef} style={{ width: "100%", height: "100%", cursor: "grab" }} />
  );
}
