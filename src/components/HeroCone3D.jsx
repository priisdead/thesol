import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Cinematic hero: an upright 3D pre-roll cone wrapped in a fiery aura — orange
 * flames climbing the sides, a molten ember core at the base, and warm smoke
 * curling up above it (an ambient effect around the cone, not emitted from it),
 * on a starfield with a glowing orbital base ring. The cone is built
 * procedurally (reusing the SOL cone recipe) — no model file needed.
 * Move the cursor to spin/tilt the cone; it gently auto-rotates when idle.
 *
 * Live-updatable props (no WebGL rebuild):
 *   paperColor  – rolling-paper color (hex)
 *   crutchColor – filter-tip color (hex)
 *   showLogo    – print the SOL logo on the crutch
 */
export const HERO_DIMS = { length: 3.95, rTop: 0.44, rBot: 0.14, filterH: 0.5 };

function srgbLuminance(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substr(0, 2), 16) / 255;
  const g = parseInt(h.substr(2, 2), 16) / 255;
  const b = parseInt(h.substr(4, 2), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const FLAME_VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FLAME_FRAG = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uIntensity;
  uniform vec3 uHot;
  uniform vec3 uMid;
  uniform vec3 uCool;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
  float noise(vec2 p){
    vec2 i=floor(p), f=fract(p);
    vec2 u=f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),u.x),
               mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x),u.y);
  }
  float fbm(vec2 p){
    float v=0.0, a=0.55;
    for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.03; a*=0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    float t = uTime;
    vec2 q = vec2(uv.x*3.0, uv.y*2.6 - t*1.5);
    float warp = fbm(q);
    float n = fbm(q + warp*0.9 + vec2(0.0, -t*0.6));

    // flatter vertical falloff so the fire climbs the cone instead of
    // dumping all its intensity at the base
    // even vertical envelope so the fire wraps the WHOLE cone height instead
    // of pooling at the base — soft ramp up from the bottom, soft fade at top
    float grad = smoothstep(0.0, 0.14, uv.y) * (1.0 - smoothstep(0.55, 1.0, uv.y));
    // keep plenty of width all the way up so flames flank the entire cone
    float width = mix(0.8, 0.45, pow(uv.y, 0.7));
    float dx = abs(uv.x - 0.5) * 2.0;
    // full width — the cone mesh itself (rendered in front) occludes the
    // centre, so the fire only ever shows AROUND the cone's silhouette
    float horiz = 1.0 - smoothstep(0.0, width, dx);

    float flame = horiz * grad * (0.5 + 1.2*n);
    flame *= smoothstep(1.5, 0.05, uv.y - n*0.5);
    flame = smoothstep(0.11, 0.80, flame);

    vec3 col = mix(uCool, uMid, smoothstep(0.03, 0.5, flame));
    // hot tips scattered along the height (not concentrated at the base)
    col = mix(col, uHot, smoothstep(0.9, 1.0, flame));

    float a = clamp(flame, 0.0, 1.0);
    gl_FragColor = vec4(col * a * uIntensity, a);
  }
`;

const SMOKE_FRAG = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uIntensity;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
  float noise(vec2 p){
    vec2 i=floor(p), f=fract(p);
    vec2 u=f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),u.x),
               mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x),u.y);
  }
  float fbm(vec2 p){
    float v=0.0, a=0.55;
    for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.03; a*=0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    float t = uTime;
    vec2 q = vec2(uv.x*2.0, uv.y*1.8 - t*0.85);
    float warp = fbm(q);
    float n = fbm(q*1.4 + warp*1.3 + vec2(0.0, -t*0.4));

    float dx = abs(uv.x - 0.5) * 2.0;
    float width = mix(0.55, 0.10, pow(uv.y, 0.6));  // wisps thin as they rise
    float horiz = 1.0 - smoothstep(0.0, width, dx);

    float smoke = horiz * n;
    smoke *= smoothstep(0.0, 0.3, uv.y) * (1.0 - smoothstep(0.62, 1.0, uv.y));
    smoke = smoothstep(0.4, 0.85, smoke);

    vec3 c = mix(vec3(0.45, 0.28, 0.14), vec3(0.9, 0.66, 0.42), n);
    float a = smoke * 0.5;
    gl_FragColor = vec4(c * a * uIntensity, a);
  }
`;

function radialGlowTexture(hex) {
  const s = 256;
  const cvs = document.createElement("canvas");
  cvs.width = cvs.height = s;
  const ctx = cvs.getContext("2d");
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0.0, hex);
  g.addColorStop(0.35, hex);
  g.addColorStop(1.0, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const t = new THREE.CanvasTexture(cvs);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export default function HeroCone3D({
  paperColor = "#141416",
  crutchColor = "#f3efe6",
  showLogo = true,
  paperTextureUrl = "/images/textures/cone-paper.png",
  logoUrl = "/images/textures/sol-logo.png",
}) {
  const mountRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth || 500;
    let height = mount.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 200);
    camera.position.set(0, 0.5, 9.2);
    camera.lookAt(0, 0.25, 0);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (err) {
      console.warn("HeroCone3D: WebGL unavailable.", err);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);

    // Studio environment — soft image-based lighting gives the paper realistic,
    // smooth highlights that wrap around the curved surface.
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;

    // Lighting (env supplies ambient/reflections; these add shape + a cool rim)
    scene.add(new THREE.AmbientLight(0x3a4a66, 0.1));
    const key = new THREE.DirectionalLight(0xffffff, 0.85);
    key.position.set(3.5, 6, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xbcd4ff, 0.75);
    rim.position.set(-5, 2.5, -4);
    scene.add(rim);
    const fill = new THREE.PointLight(0x9db8ff, 0.45, 22);
    fill.position.set(0, -1.2, 3.2);
    scene.add(fill);
    const flameLight = new THREE.PointLight(0xff7a2a, 1.1, 12);
    flameLight.position.set(0, -1.9, 1.2);
    scene.add(flameLight);

    const state = { paperColor, crutchColor, showLogo };

    // ---- Paper + crutch textures (reused SOL cone recipe) ----
    const texLoader = new THREE.TextureLoader();
    const paperTex = texLoader.load(paperTextureUrl);
    paperTex.colorSpace = THREE.SRGBColorSpace;
    paperTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const crutchCanvas = document.createElement("canvas");
    crutchCanvas.width = 1795;
    crutchCanvas.height = 1000;
    const crutchCtx = crutchCanvas.getContext("2d");
    const crutchTex = new THREE.CanvasTexture(crutchCanvas);
    crutchTex.colorSpace = THREE.SRGBColorSpace;
    crutchTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const logoImg = new Image();
    let logoLoaded = false;
    logoImg.onload = () => { logoLoaded = true; drawCrutch(); };
    logoImg.src = logoUrl;

    function drawCrutch() {
      const c = crutchCtx;
      const W = crutchCanvas.width, H = crutchCanvas.height;
      c.clearRect(0, 0, W, H);
      c.fillStyle = state.crutchColor;
      c.fillRect(0, 0, W, H);
      if (state.showLogo && logoLoaded) {
        const la = logoImg.width / logoImg.height;
        let lw = W * 0.9, lh = lw / la;
        if (lh > H * 0.82) { lh = H * 0.82; lw = lh * la; }
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

    const materials = {
      paper: new THREE.MeshStandardMaterial({
        color: new THREE.Color(state.paperColor),
        map: paperTex,
        roughness: 0.82,
        metalness: 0.0,
        envMapIntensity: 0.18,
        side: THREE.DoubleSide,
      }),
      mouth: new THREE.MeshStandardMaterial({ color: 0x161410, roughness: 1, side: THREE.DoubleSide }),
      side: new THREE.MeshPhysicalMaterial({
        color: 0xffffff, map: crutchTex, roughness: 0.72, clearcoat: 0.15, clearcoatRoughness: 0.5, envMapIntensity: 0.6,
      }),
      cap: new THREE.MeshStandardMaterial({ color: new THREE.Color(state.crutchColor), roughness: 0.82, envMapIntensity: 0.6 }),
    };

    // ---- Cone geometry ----
    const d = HERO_DIMS;
    const cone = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(d.rTop, d.rBot, d.length, 160, 1, true),
      materials.paper
    );
    body.position.y = d.length / 2;
    cone.add(body);
    const mouth = new THREE.Mesh(new THREE.CircleGeometry(d.rTop * 0.9, 96), materials.mouth);
    mouth.rotation.x = -Math.PI / 2;
    mouth.position.y = d.length - 0.28;
    cone.add(mouth);
    const filter = new THREE.Mesh(
      new THREE.CylinderGeometry(d.rBot, d.rBot, d.filterH, 96),
      [materials.side, materials.cap, materials.cap]
    );
    filter.position.y = -d.filterH / 2;
    cone.add(filter);
    cone.position.y = -(d.length - d.filterH) / 2;
    scene.add(cone);

    // ---- Blue flame aura (wraps AROUND the cone, not emitted from it) ----
    const flame = new THREE.Group();
    const flameUniforms = {
      uTime: { value: 0 },
      uIntensity: { value: 0.82 },
      uHot: { value: new THREE.Color(1.0, 0.92, 0.6) },
      uMid: { value: new THREE.Color(1.0, 0.46, 0.08) },
      uCool: { value: new THREE.Color(0.42, 0.07, 0.01) },
    };
    const flameMat = new THREE.ShaderMaterial({
      vertexShader: FLAME_VERT, fragmentShader: FLAME_FRAG, uniforms: flameUniforms,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    });
    // Single camera-facing flame layer placed BEHIND the cone. Because the
    // opaque cone (depth-tested) sits in front of it, the fire can only ever
    // appear in the space AROUND the cone's silhouette — never on its face.
    const flameGeo = new THREE.PlaneGeometry(3.8, 6.4, 1, 1);
    const flamePlane = new THREE.Mesh(flameGeo, flameMat);
    flamePlane.position.set(0, 0.7, -0.4);
    flame.add(flamePlane);
    // soft warm base glow (subtle — no bright cluster on the crutch)
    const glowTex = radialGlowTexture("#ff6a1a");
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    glow.scale.set(3.2, 3.2, 1);
    glow.position.set(0, -1.6, -0.35);
    flame.add(glow);
    const emberTex = radialGlowTexture("#ffcf7a");
    const ember = new THREE.Sprite(new THREE.SpriteMaterial({
      map: emberTex, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    ember.scale.set(1.3, 1.3, 1);
    ember.position.set(0, -1.8, -0.35);
    flame.add(ember);
    scene.add(flame);

    // ---- Rising smoke wisps (warm haze curling up above the flame) ----
    const smoke = new THREE.Group();
    const smokeUniforms = { uTime: { value: 0 }, uIntensity: { value: 1.0 } };
    const smokeMat = new THREE.ShaderMaterial({
      vertexShader: FLAME_VERT, fragmentShader: SMOKE_FRAG, uniforms: smokeUniforms,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    });
    const smokeGeo = new THREE.PlaneGeometry(3.2, 9.0, 1, 1);
    const smokePlane = new THREE.Mesh(smokeGeo, smokeMat);
    smokePlane.position.set(0, 2.4, -0.5);
    smoke.add(smokePlane);
    scene.add(smoke);

    // ---- Starfield ----
    const starCount = 900;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 22 + Math.random() * 42;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      starPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      starPos[i * 3 + 1] = (Math.random() - 0.4) * 58;
      starPos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th) - 12;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xbcd4ff, size: 0.12, sizeAttenuation: true, transparent: true, opacity: 0.85, depthWrite: false,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ---- Orbital base ring ----
    const ringGeo = new THREE.RingGeometry(2.7, 2.78, 96);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x3d7bd6, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide, depthWrite: false,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.scale.set(1.5, 1.0, 1.0);
    ring.position.y = -1.95;
    scene.add(ring);

    // ---- Pointer interaction ----
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (e) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove);

    // ---- Render loop (paused off-screen) ----
    let raf = null, visible = true, last = 0;
    let spin = 0, curRotY = 0, curRotX = 0.05, camX = 0;
    const io = new IntersectionObserver((en) => { visible = en[0].isIntersecting; }, { threshold: 0 });
    io.observe(mount);

    const animate = (ts) => {
      raf = requestAnimationFrame(animate);
      if (!visible) { last = ts; return; }
      const dt = Math.min(0.05, (ts - last) / 1000 || 0.016);
      last = ts;

      spin += dt * 0.28;
      const targetY = spin + pointer.x * 0.7;
      const targetX = 0.05 + pointer.y * 0.16;
      curRotY += (targetY - curRotY) * 0.08;
      curRotX += (targetX - curRotX) * 0.08;
      cone.rotation.y = curRotY;
      cone.rotation.x = curRotX;

      camX += (pointer.x * 0.5 - camX) * 0.04;
      camera.position.x = camX;
      camera.lookAt(0, 0.25, 0);

      stars.rotation.y += dt * 0.01;
      flameUniforms.uTime.value += dt;
      smokeUniforms.uTime.value += dt;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    const onResize = () => {
      width = mount.clientWidth || width;
      height = mount.clientHeight || height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    engineRef.current = { state, materials, drawCrutch };

    return () => {
      engineRef.current = null;
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      body.geometry.dispose();
      mouth.geometry.dispose();
      filter.geometry.dispose();
      flameGeo.dispose();
      smokeGeo.dispose();
      ringGeo.dispose();
      starGeo.dispose();
      glowTex.dispose();
      emberTex.dispose();
      paperTex.dispose();
      crutchTex.dispose();
      flameMat.dispose();
      smokeMat.dispose();
      glow.material.dispose();
      ember.material.dispose();
      ringMat.dispose();
      starMat.dispose();
      Object.values(materials).forEach((m) => m.dispose());
      scene.environment = null;
      envRT.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paperTextureUrl, logoUrl]);

  // Live color / logo updates
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

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        cursor: "crosshair",
        background:
          "radial-gradient(120% 90% at 50% 42%, #12294d 0%, #0b1830 45%, #060d1c 100%)",
      }}
    />
  );
}
