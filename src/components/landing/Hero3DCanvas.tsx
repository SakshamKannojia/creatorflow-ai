"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070b14, 0.035);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 1. Central Core: Glowing 3D Icosahedron wireframe + inner glowing sphere
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Outer wireframe cage
    const icoGeom = new THREE.IcosahedronGeometry(4.2, 1);
    const icoWireframe = new THREE.WireframeGeometry(icoGeom);
    const icoLineMaterial = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const icoMesh = new THREE.LineSegments(icoWireframe, icoLineMaterial);
    coreGroup.add(icoMesh);

    // Inner subtle jewel core
    const innerGeom = new THREE.IcosahedronGeometry(2.6, 0);
    const innerMat = new THREE.MeshPhongMaterial({
      color: 0x1e1b4b,
      emissive: 0x4338ca,
      emissiveIntensity: 0.6,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const innerCore = new THREE.Mesh(innerGeom, innerMat);
    coreGroup.add(innerCore);

    // 2. Dual Concentric Orbit Rings (Gyroscopic 3D Rings)
    const ring1Geom = new THREE.TorusGeometry(6.4, 0.035, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(7.6, 0.03, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    coreGroup.add(ring2);

    // 3. Orbital Data Nodes (Spheres traversing along space)
    const nodeCount = 14;
    const nodeGroup = new THREE.Group();
    coreGroup.add(nodeGroup);
    const nodes: { mesh: THREE.Mesh; angle: number; radius: number; speed: number; yOffset: number }[] = [];

    const nodeGeom = new THREE.SphereGeometry(0.18, 12, 12);
    for (let i = 0; i < nodeCount; i++) {
      const isCyan = i % 2 === 0;
      const nodeMat = new THREE.MeshBasicMaterial({
        color: isCyan ? 0x06b6d4 : 0x3b82f6,
      });
      const nodeMesh = new THREE.Mesh(nodeGeom, nodeMat);
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 5.2 + (i % 3) * 1.4;
      const speed = 0.006 + (i % 4) * 0.003;
      const yOffset = ((i % 5) - 2) * 1.1;
      nodeGroup.add(nodeMesh);
      nodes.push({ mesh: nodeMesh, angle, radius, speed, yOffset });
    }

    // 4. Background Interactive Star/Particle Constellation
    const particleCount = 750;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0x6366f1),
      new THREE.Color(0x38bdf8),
      new THREE.Color(0x06b6d4),
      new THREE.Color(0x818cf8),
    ];

    for (let i = 0; i < particleCount; i++) {
      const r = 12 + Math.random() * 26;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) - 6;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particleGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLightIndigo = new THREE.PointLight(0x6366f1, 3, 40);
    pointLightIndigo.position.set(10, 8, 12);
    scene.add(pointLightIndigo);

    const pointLightCyan = new THREE.PointLight(0x06b6d4, 2.5, 40);
    pointLightCyan.position.set(-10, -6, 8);
    scene.add(pointLightCyan);

    const pointLightBlue = new THREE.PointLight(0x2563eb, 2.5, 30);
    pointLightBlue.position.set(0, 12, -5);
    scene.add(pointLightBlue);

    // Mouse Interaction Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (event.clientX / innerWidth) * 2 - 1;
      mouseY = -(event.clientY / innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Window Resize Handling
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse damping
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate central 3D core
      coreGroup.rotation.y += 0.005;
      coreGroup.rotation.x += 0.003;
      coreGroup.position.x = targetX * 1.5;
      coreGroup.position.y = targetY * 1.2;

      // Rotate individual rings
      ring1.rotation.z += 0.008;
      ring2.rotation.z -= 0.006;
      ring2.rotation.x += 0.004;

      // Animate orbital nodes
      nodes.forEach((n) => {
        n.angle += n.speed;
        n.mesh.position.x = Math.cos(n.angle) * n.radius;
        n.mesh.position.z = Math.sin(n.angle) * n.radius;
        n.mesh.position.y = n.yOffset + Math.sin(elapsed * 2 + n.angle) * 0.4;
      });

      // Slowly rotate particle field with parallax
      particleSystem.rotation.y = elapsed * 0.015 + targetX * 0.2;
      particleSystem.rotation.x = targetY * 0.15;

      // Pulsing point light
      pointLightCyan.intensity = 2.2 + Math.sin(elapsed * 2.5) * 0.6;
      pointLightIndigo.intensity = 2.8 + Math.cos(elapsed * 2.0) * 0.7;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      icoGeom.dispose();
      icoWireframe.dispose();
      icoLineMaterial.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      ring1Geom.dispose();
      ring1Mat.dispose();
      ring2Geom.dispose();
      ring2Mat.dispose();
      nodeGeom.dispose();
      particleGeom.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  );
}
