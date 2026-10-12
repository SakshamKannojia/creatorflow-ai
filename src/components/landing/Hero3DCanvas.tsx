"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.028);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 22);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // STUDIO LIGHTING SETUP (Warm Key, Cool Rim, Ambient Fill)
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x818cf8, 2.5);
    keyLight.position.set(12, 16, 10);
    scene.add(keyLight);

    const warmRim = new THREE.PointLight(0xf97316, 3.2, 50);
    warmRim.position.set(-14, 8, -6);
    scene.add(warmRim);

    const coolFill = new THREE.PointLight(0x06b6d4, 3.5, 60);
    coolFill.position.set(16, -6, 4);
    scene.add(coolFill);

    // 1. PROCEDURAL 3D KINETIC RIBBON SURFACE (Simulating Audio/Video timeline waveform)
    const gridX = 70;
    const gridY = 32;
    const waveGeom = new THREE.PlaneGeometry(36, 16, gridX, gridY);
    waveGeom.rotateX(-Math.PI * 0.42);

    // Create custom wave mesh with rich studio material
    const waveMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: 0x1e1b4b,
      emissiveIntensity: 0.35,
      roughness: 0.35,
      metalness: 0.85,
      wireframe: false,
      flatShading: false,
    });
    const waveMesh = new THREE.Mesh(waveGeom, waveMat);
    waveMesh.position.set(0, -5, -4);
    scene.add(waveMesh);

    // Precision Wireframe overlay on the wave for engineering aesthetic
    const wireGeom = new THREE.WireframeGeometry(waveGeom);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });
    const wireMesh = new THREE.LineSegments(wireGeom, wireMat);
    waveMesh.add(wireMesh);

    // Save initial positions for organic wave calculations
    const posAttr = waveGeom.attributes.position;
    const initialZ = new Float32Array(posAttr.count);
    for (let i = 0; i < posAttr.count; i++) {
      initialZ[i] = posAttr.getZ(i);
    }

    // 2. FLOATING OPTICAL APERTURE & STUDIO CAMERA MONOLITHS
    const studioGroup = new THREE.Group();
    scene.add(studioGroup);

    // Cinematic Aperture / Lens Rings (Precision Machined Brass & Obsidian)
    const ringGroup = new THREE.Group();
    studioGroup.add(ringGroup);

    const apertureMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.95,
      roughness: 0.18,
      emissive: 0x312e81,
      emissiveIntensity: 0.25,
    });

    const lensAccentMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    // Primary Gimbal Outer Ring
    const mainRingGeom = new THREE.TorusGeometry(5.2, 0.08, 24, 120);
    const mainRing = new THREE.Mesh(mainRingGeom, apertureMat);
    ringGroup.add(mainRing);

    // Glowing Aperture Tick Ring
    const tickRingGeom = new THREE.TorusGeometry(5.0, 0.025, 16, 120);
    const tickRing = new THREE.Mesh(tickRingGeom, lensAccentMat);
    ringGroup.add(tickRing);

    // Secondary Gimbal Pitch Ring
    const innerRingGeom = new THREE.TorusGeometry(3.8, 0.06, 20, 100);
    const innerRing = new THREE.Mesh(innerRingGeom, apertureMat);
    innerRing.rotation.x = Math.PI / 3;
    ringGroup.add(innerRing);

    // Floating Glass Prism Core (Refractive Studio Prism)
    const prismGeom = new THREE.OctahedronGeometry(1.9, 0);
    const prismMat = new THREE.MeshPhysicalMaterial({
      color: 0x6366f1,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.4,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 1.8,
      transparent: true,
      opacity: 0.85,
      reflectivity: 0.9,
    });
    const prism = new THREE.Mesh(prismGeom, prismMat);
    studioGroup.add(prism);

    // 3. CINEMATIC FLOATING DATA BEACONS & TIME NODES
    const beaconCount = 20;
    const beacons: { mesh: THREE.Mesh; orbitRadius: number; speed: number; angle: number; y: number }[] = [];
    const beaconGeom = new THREE.BoxGeometry(0.12, 0.4, 0.12);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    for (let i = 0; i < beaconCount; i++) {
      const mesh = new THREE.Mesh(beaconGeom, beaconMat);
      const orbitRadius = 4.6 + (i % 4) * 0.9;
      const speed = (0.004 + (i % 3) * 0.002) * (i % 2 === 0 ? 1 : -1);
      const angle = (i / beaconCount) * Math.PI * 2;
      const y = ((i % 5) - 2) * 1.2;
      studioGroup.add(mesh);
      beacons.push({ mesh, orbitRadius, speed, angle, y });
    }

    // 4. SOFT ATMOSPHERIC CINEMATIC BOKEH DUST
    const bokehCount = 350;
    const bokehGeom = new THREE.BufferGeometry();
    const bokehPositions = new Float32Array(bokehCount * 3);
    const bokehColors = new Float32Array(bokehCount * 3);

    const palette = [
      new THREE.Color(0x818cf8),
      new THREE.Color(0x38bdf8),
      new THREE.Color(0xf97316),
      new THREE.Color(0xa78bfa),
    ];

    for (let i = 0; i < bokehCount; i++) {
      const x = (Math.random() - 0.5) * 45;
      const y = (Math.random() - 0.5) * 28;
      const z = (Math.random() - 0.5) * 35 - 5;

      bokehPositions[i * 3] = x;
      bokehPositions[i * 3 + 1] = y;
      bokehPositions[i * 3 + 2] = z;

      const col = palette[Math.floor(Math.random() * palette.length)];
      bokehColors[i * 3] = col.r;
      bokehColors[i * 3 + 1] = col.g;
      bokehColors[i * 3 + 2] = col.b;
    }

    bokehGeom.setAttribute("position", new THREE.BufferAttribute(bokehPositions, 3));
    bokehGeom.setAttribute("color", new THREE.BufferAttribute(bokehColors, 3));

    const bokehMat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const bokehParticles = new THREE.Points(bokehGeom, bokehMat);
    scene.add(bokehParticles);

    // MOUSE PARALLAX & FLUID CAMERA INTERPOLATION
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 2;
      mouseY = (e.clientY / innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // ANIMATION LOOP (Clock-based, zero frame drops)
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation (lerp)
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      camera.position.x = targetX * 4;
      camera.position.y = 2 + targetY * -2.5;
      camera.lookAt(0, -0.5, 0);

      // Studio Gimbal Rotation
      ringGroup.rotation.y = elapsedTime * 0.22;
      ringGroup.rotation.x = Math.sin(elapsedTime * 0.15) * 0.25;
      innerRing.rotation.y = -elapsedTime * 0.35;
      prism.rotation.y = elapsedTime * 0.45;
      prism.rotation.z = Math.sin(elapsedTime * 0.3) * 0.2;

      // Beacons orbital kinematics
      for (let i = 0; i < beacons.length; i++) {
        const b = beacons[i];
        b.angle += b.speed;
        b.mesh.position.x = Math.cos(b.angle) * b.orbitRadius;
        b.mesh.position.z = Math.sin(b.angle) * b.orbitRadius;
        b.mesh.position.y = b.y + Math.sin(elapsedTime * 1.5 + i) * 0.35;
        b.mesh.rotation.y = b.angle + Math.PI / 2;
      }

      // Procedural Wave Undulation (Simulating timeline dynamics & mouse ripple)
      const positions = waveGeom.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const u = positions.getX(i);
        const v = positions.getY(i);
        // Multiscale harmonic waves
        const wave1 = Math.sin(u * 0.28 + elapsedTime * 1.4) * 1.1;
        const wave2 = Math.cos(v * 0.45 + elapsedTime * 1.1) * 0.7;
        const wave3 = Math.sin((u + v) * 0.18 + elapsedTime * 0.8) * 0.5;
        // Interactive mouse disturbance
        const distFromCenter = Math.sqrt((u - targetX * 8) ** 2 + (v - targetY * 4) ** 2);
        const mouseRipple = Math.exp(-distFromCenter * 0.25) * 1.4 * Math.sin(distFromCenter * 1.2 - elapsedTime * 4);

        positions.setZ(i, initialZ[i] + wave1 + wave2 + wave3 + mouseRipple);
      }
      positions.needsUpdate = true;
      waveGeom.computeVertexNormals();

      // Atmospheric drift
      bokehParticles.rotation.y = elapsedTime * 0.03;
      bokehParticles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-20 overflow-hidden"
      style={{ opacity: 0.95 }}
    />
  );
}
