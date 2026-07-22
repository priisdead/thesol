import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Reflector } from "three/addons/objects/Reflector.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { BokehPass } from "three/addons/postprocessing/BokehPass.js";

export default function ProductFilm() {
  const mountRef = useRef(null);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Container Specs ---
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#030303");
    // Deep cinematic fog
    scene.fog = new THREE.FogExp2("#030303", 0.08);

    // --- Camera Setup ---
    // Anamorphic look simulated by 16:9 ratio and shallow DOF
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    // Camera starting position: close to first cone for a macro dolly-in shot
    camera.position.set(-0.85, 0.75, 4.0);
    // Look at a target point along the row of cones
    const cameraTarget = new THREE.Vector3(0.0, 0.7, -1.0);
    camera.lookAt(cameraTarget);

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // --- Obsidian Mirror Surface ---
    // Procedural reflective plane at y=0 representing polished dark obsidian stone
    const mirrorGeometry = new THREE.PlaneGeometry(100, 100);
    const mirror = new Reflector(mirrorGeometry, {
      clipBias: 0.003,
      textureWidth: 512, // Lower resolution creates a soft, natural gloss blur and runs fast
      textureHeight: 512,
      color: 0x0a0a0a, // Very dark, deep black mirror
    });
    mirror.rotation.x = -Math.PI / 2;
    mirror.position.y = 0;
    scene.add(mirror);

    // --- Volumetric Light Shaft (Faked) ---
    // Tapered cylinder that represents a soft volumetric beam raking from the upper left
    const beamGeometry = new THREE.CylinderGeometry(0.8, 4.5, 20, 32, 1, true);
    // Canvas texture for fading beam gradient
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, "rgba(255, 255, 255, 0.15)");
    grad.addColorStop(0.3, "rgba(255, 255, 255, 0.08)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 256);
    const beamTexture = new THREE.CanvasTexture(canvas);

    const beamMaterial = new THREE.MeshBasicMaterial({
      color: 0xeef5ee,
      map: beamTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const lightBeam = new THREE.Mesh(beamGeometry, beamMaterial);
    // Position light shaft raking down from left
    lightBeam.position.set(-6, 5, -2);
    lightBeam.rotation.set(0, 0, -Math.PI / 4.5);
    scene.add(lightBeam);

    // --- Procedural Canvas Spiral Texture for Crutch ---
    const createSpiralTexture = () => {
      const texCanvas = document.createElement("canvas");
      texCanvas.width = 256;
      texCanvas.height = 256;
      const texCtx = texCanvas.getContext("2d");

      // Draw paper base color (off-white/cream)
      texCtx.fillStyle = "#ebdcc3";
      texCtx.fillRect(0, 0, 256, 256);

      // Draw spiral crutch folding lines
      texCtx.strokeStyle = "#4d4232";
      texCtx.lineWidth = 5;
      texCtx.lineCap = "round";
      texCtx.beginPath();
      const cx = 128;
      const cy = 128;
      texCtx.moveTo(cx, cy);

      const a = 2.2;
      for (let theta = 0; theta < Math.PI * 6.5; theta += 0.08) {
        const r = a * theta;
        const x = cx + r * Math.cos(theta);
        const y = cy + r * Math.sin(theta);
        texCtx.lineTo(x, y);
      }
      texCtx.stroke();

      // Add concentric shadows to simulate crutch paper thickness
      texCtx.strokeStyle = "rgba(0, 0, 0, 0.12)";
      texCtx.lineWidth = 3;
      for (let r = 12; r < 75; r += 16) {
        texCtx.beginPath();
        texCtx.arc(cx, cy, r, 0, Math.PI * 2);
        texCtx.stroke();
      }

      const texture = new THREE.CanvasTexture(texCanvas);
      texture.needsUpdate = true;
      return texture;
    };
    const spiralTexture = createSpiralTexture();

    // --- Procedural Flax Fiber Texture for Cones ---
    const createFlaxFiberTexture = (baseColor) => {
      const fiberCanvas = document.createElement("canvas");
      fiberCanvas.width = 512;
      fiberCanvas.height = 512;
      const fiberCtx = fiberCanvas.getContext("2d");

      fiberCtx.fillStyle = baseColor;
      fiberCtx.fillRect(0, 0, 512, 512);

      // Draw delicate flax paper fibers
      fiberCtx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      fiberCtx.lineWidth = 1;
      for (let i = 0; i < 400; i++) {
        const sx = Math.random() * 512;
        const sy = Math.random() * 512;
        const len = 10 + Math.random() * 30;
        const angle = Math.random() * Math.PI * 2;
        fiberCtx.beginPath();
        fiberCtx.moveTo(sx, sy);
        fiberCtx.lineTo(sx + len * Math.cos(angle), sy + len * Math.sin(angle));
        fiberCtx.stroke();
      }

      // Draw darker fibers
      fiberCtx.strokeStyle = "rgba(0, 0, 0, 0.06)";
      for (let i = 0; i < 200; i++) {
        const sx = Math.random() * 512;
        const sy = Math.random() * 512;
        const len = 8 + Math.random() * 20;
        const angle = Math.random() * Math.PI * 2;
        fiberCtx.beginPath();
        fiberCtx.moveTo(sx, sy);
        fiberCtx.lineTo(sx + len * Math.cos(angle), sy + len * Math.sin(angle));
        fiberCtx.stroke();
      }

      const texture = new THREE.CanvasTexture(fiberCanvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 4);
      return texture;
    };
    const whiteFiberTex = createFlaxFiberTexture("#f9f9f6");
    const brownFiberTex = createFlaxFiberTexture("#be9f77");

    // --- Shared Geometries and Materials for Performance ---
    const tubeGeometry = new THREE.CylinderGeometry(0.35, 0.18, 2.3, 48, 4, true);
    const crutchGeometry = new THREE.CylinderGeometry(0.18, 0.174, 0.6, 48, 1, false);

    const whitePaperMaterial = new THREE.MeshStandardMaterial({
      map: whiteFiberTex,
      roughness: 0.85,
      metalness: 0.04,
      side: THREE.DoubleSide,
    });

    const brownPaperMaterial = new THREE.MeshStandardMaterial({
      map: brownFiberTex,
      roughness: 0.85,
      metalness: 0.04,
      side: THREE.DoubleSide,
    });

    const whiteCrutchSideMat = new THREE.MeshStandardMaterial({
      color: "#ebdcc3",
      roughness: 0.9,
      metalness: 0.02,
    });

    const brownCrutchSideMat = new THREE.MeshStandardMaterial({
      color: "#aa8c64",
      roughness: 0.9,
      metalness: 0.02,
    });

    const crutchTopMat = new THREE.MeshStandardMaterial({
      color: "#ebdcc3",
      roughness: 0.9,
    });

    const crutchBottomMat = new THREE.MeshStandardMaterial({
      map: spiralTexture,
      roughness: 0.95,
    });

    // --- Procedural Cone Mesh Factory ---
    const createConeGroup = (isWhite) => {
      const coneGroup = new THREE.Group();

      const paperTube = new THREE.Mesh(tubeGeometry, isWhite ? whitePaperMaterial : brownPaperMaterial);
      paperTube.position.y = 1.45; // stands tall above ground
      paperTube.castShadow = true;
      paperTube.receiveShadow = true;
      coneGroup.add(paperTube);

      const crutch = new THREE.Mesh(crutchGeometry, [
        isWhite ? whiteCrutchSideMat : brownCrutchSideMat,
        crutchTopMat,
        crutchBottomMat,
      ]);
      crutch.position.y = 0.3; // resting bottom is y=0
      crutch.castShadow = true;
      crutch.receiveShadow = true;
      coneGroup.add(crutch);

      // Scale group for subtle vertical variance
      const scaleVariance = 0.95 + Math.random() * 0.1;
      coneGroup.scale.set(1, scaleVariance, 1);

      return coneGroup;
    };

    // --- Spawn Row of Cones ---
    const cones = [];
    const coneSpacing = 3.8;
    const numCones = 8;

    for (let i = 0; i < numCones; i++) {
      const isWhite = i % 2 === 0;
      const cone = createConeGroup(isWhite);
      // Position cones linearly along Z axis
      const coneZ = -i * coneSpacing;
      cone.position.set(0, 0, coneZ);
      // Stagger initial Y rotation
      cone.rotation.y = (i * Math.PI) / 3;
      scene.add(cone);
      cones.push(cone);
    }

    // --- Drifting Particles (Paper Dust) ---
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 180;
    const positions = new Float32Array(particleCount * 3);
    const driftSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 6; // X
      positions[i + 1] = Math.random() * 4;     // Y
      positions[i + 2] = (Math.random() - 0.5) * 20; // Z
      driftSpeeds[i / 3] = 0.1 + Math.random() * 0.3;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.024,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dustParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(dustParticles);

    // --- Cinematic Lights ---
    // Left Volumetric Main Light (gives organic paper texture raking definition)
    const mainLight = new THREE.DirectionalLight("#eef2ff", 3.2);
    mainLight.position.set(-8, 6, 2);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    mainLight.shadow.bias = -0.001;
    scene.add(mainLight);

    // Deep Emerald Green Rim Light from behind
    const emeraldRimLight1 = new THREE.PointLight("#078a48", 12.0, 16, 1.2);
    emeraldRimLight1.position.set(1.8, 0.8, -4);
    scene.add(emeraldRimLight1);

    const emeraldRimLight2 = new THREE.PointLight("#00602f", 9.0, 16, 1.2);
    emeraldRimLight2.position.set(1.8, 0.8, -12);
    scene.add(emeraldRimLight2);

    // Soft Ambient Fill Light
    const fillLight = new THREE.AmbientLight("#020302", 0.3);
    scene.add(fillLight);

    // --- Shallow Depth of Field Post Processing (Bokeh) ---
    let composer, bokehPass;
    const usePostProcessing = true;

    if (usePostProcessing) {
      try {
        composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        bokehPass = new BokehPass(scene, camera, {
          focus: 3.8, // focus on first cone
          aperture: 0.025, // shallow aperture
          maxblur: 0.018, // soft bokeh blurring
          width: width,
          height: height,
        });
        composer.addPass(bokehPass);
      } catch (err) {
        console.warn("Post-processing failed to initialize, falling back to basic renderer:", err);
        composer = null;
      }
    }

    // --- Animation Loop ---
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsInterval = lastTime;

    const dollySpeed = 0.0055; // buttery dolly-in speed
    const rotationSpeed = 0.003; // slow, elegant local rotation
    const loopZPeriod = coneSpacing * 2; // seamless loop spacing for 2 cones (white + brown alternating pattern)

    const animate = () => {
      const id = requestAnimationFrame(animate);
      const currentTime = performance.now();
      
      // Calculate Frame Rate for debugging & auto-scaling
      frameCount++;
      if (currentTime > fpsInterval + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - fpsInterval)));
        frameCount = 0;
        fpsInterval = currentTime;
      }

      // 1. Slow Local Y-rotation for all Cones
      cones.forEach((cone) => {
        cone.rotation.y += rotationSpeed;
      });

      // 2. Animate faked Volumetric light ray sways slightly
      lightBeam.rotation.y = Math.sin(currentTime * 0.0004) * 0.03;

      // 3. Drifting Specks / Paper Dust
      const posArr = dustParticles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        posArr[idx + 1] -= dollySpeed * driftSpeeds[i] * 0.5; // slow fall
        posArr[idx] += Math.sin(currentTime * 0.001 + i) * 0.0015; // horizontal sway
        
        // Wrap particles when falling below ground or behind camera
        if (posArr[idx + 1] < 0) posArr[idx + 1] = 4;
        // Float them around camera
      }
      dustParticles.geometry.attributes.position.needsUpdate = true;

      // 4. Dolly-In Camera Movement (pushing past cones infinitely)
      camera.position.z -= dollySpeed;
      
      // Keep targeting ahead to create gentle parallax tilt
      cameraTarget.z = camera.position.z - 5.0;
      camera.lookAt(cameraTarget);

      // Seamless Infinite Loop Wrapping
      // When camera translates past the alternating period (7.6 units), wrap it back.
      if (camera.position.z <= -loopZPeriod) {
        camera.position.z += loopZPeriod;
        cones.forEach((cone) => {
          cone.position.z += loopZPeriod;
        });
        // Shift rim lights as well
        emeraldRimLight1.position.z += loopZPeriod;
        emeraldRimLight2.position.z += loopZPeriod;
      }

      // Check wrapping offsets for cones. Wrap single cones back when they fall out of viewport
      cones.forEach((cone) => {
        // If a cone falls too far behind the camera, wrap it to the tail end of the loop line
        if (cone.position.z - 2.5 > camera.position.z) {
          cone.position.z -= numCones * coneSpacing;
        }
      });

      // Wrap rim lights individually to stay grouped with the closest active cones
      if (emeraldRimLight1.position.z - 4 > camera.position.z) {
        emeraldRimLight1.position.z -= numCones * coneSpacing;
      }
      if (emeraldRimLight2.position.z - 4 > camera.position.z) {
        emeraldRimLight2.position.z -= numCones * coneSpacing;
      }

      // 5. Render Pass
      if (composer) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
    };

    const rafId = requestAnimationFrame(animate);

    // --- Performance Scaling ---
    // If frame rate drops below 40 FPS, scale down resolution and disable postcomposer bokeh
    const checkPerformance = setTimeout(() => {
      if (fps < 40 && composer) {
        console.warn(`Low performance detected (${fps} FPS). Disabling shallow bokeh pass to scale performance.`);
        composer = null;
        renderer.setPixelRatio(1);
      }
    }, 4500);

    // --- Handle Resize ---
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (composer) {
        composer.setSize(w, h);
      }
    };
    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(checkPerformance);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      // dispose WebGL elements
      mirrorGeometry.dispose();
      beamGeometry.dispose();
      beamMaterial.dispose();
      tubeGeometry.dispose();
      crutchGeometry.dispose();
      whitePaperMaterial.dispose();
      brownPaperMaterial.dispose();
      whiteCrutchSideMat.dispose();
      brownCrutchSideMat.dispose();
      crutchTopMat.dispose();
      crutchBottomMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      whiteFiberTex.dispose();
      brownFiberTex.dispose();
      spiralTexture.dispose();
      beamTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="product-film-canvas-wrapper"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#030303",
        overflow: "hidden",
      }}
    />
  );
}
