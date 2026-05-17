"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface CakePart {
  id: string;
  type: "cylinder" | "torus" | "sphere";
  position: [number, number, number];
  radius: number;
  height?: number;
  tube?: number;
  color?: string;
  metalness?: number;
  roughness?: number;
  rotation?: [number, number, number];
  edgeRing?: boolean;
}

interface CakeData {
  name: string;
  description?: string;
  parts: CakePart[];
}

export default function Cake3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || loadedRef.current) return;
    loadedRef.current = true;

    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let animationId: number | null = null;
    let group: THREE.Group | null = null;

(() => {

      const w = container.clientWidth || 300;
      const h = container.clientHeight || 300;

camera = new THREE.PerspectiveCamera(34, w / h, 0.1, 10);
      camera.position.set(2.15, 2.0, 2.75);
      camera.lookAt(0, 0.55, 0);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      container.appendChild(renderer.domElement);

      const ambient = new THREE.AmbientLight(0xfff2df, 0.62);
      scene.add(ambient);

      const frontLight = new THREE.DirectionalLight(0xfffbf2, 1.18);
      frontLight.position.set(0, 2, 3);
      scene.add(frontLight);

      const sideLight = new THREE.DirectionalLight(0xf7dcc0, 0.42);
      sideLight.position.set(-2.4, 1.6, 1.2);
      scene.add(sideLight);

      const backLight = new THREE.DirectionalLight(0xd9b789, 0.28);
      backLight.position.set(0, 1, -3);
      scene.add(backLight);

      // Load JSON
      const response = await fetch("/animated/wedding-cake-3d.json");
      const cakeData: CakeData = await response.json();

      group = new THREE.Group();

      for (const part of cakeData.parts) {
        if (!part.color) continue;

        let geometry: THREE.BufferGeometry | null = null;

        switch (part.type) {
          case "cylinder":
            geometry = new THREE.CylinderGeometry(part.radius, part.radius, part.height || 0.5, 32);
            break;
          case "torus":
            geometry = new THREE.TorusGeometry(part.radius, part.tube || 0.05, 16, 32);
            break;
          case "sphere":
            geometry = new THREE.SphereGeometry(part.radius, 24, 24);
            break;
        }

        if (geometry) {
          // ── Warm baked look colors ──
          let fillColor: THREE.Color;
          if (part.id.includes("cakeStand") || part.id === "ribbon") {
            fillColor = new THREE.Color("#d2b36e");
          } else if (part.id.includes("topper") || part.id.includes("groom") || part.id.includes("bride")) {
            fillColor = new THREE.Color("#8f7a5d");
          } else if (part.id === "tier1") {
            fillColor = new THREE.Color("#fff7ea");
          } else if (part.id === "tier2") {
            fillColor = new THREE.Color("#f4dfc5");
          } else if (part.id === "tier3") {
            fillColor = new THREE.Color("#e9cdae");
          } else if (part.id.includes("tier1Frosting")) {
            fillColor = new THREE.Color("#fffdf8");
          } else if (part.id.includes("tier2Frosting")) {
            fillColor = new THREE.Color("#faead4");
          } else if (part.id.includes("tier3Frosting")) {
            fillColor = new THREE.Color("#efd4b8");
          } else if (part.id.includes("Frosting")) {
            fillColor = new THREE.Color("#ebd1b1");
          } else {
            fillColor = new THREE.Color("#d9bd94");
          }

          const fillMaterial = new THREE.MeshStandardMaterial({
            color: fillColor,
            roughness: part.id.includes("cakeStand") || part.id === "ribbon" ? 0.58 : 0.82,
            metalness: part.id.includes("cakeStand") || part.id === "ribbon" ? 0.12 : 0,
          });

          const mesh = new THREE.Mesh(geometry, fillMaterial);
          mesh.position.set(...part.position);
          if (part.rotation) {
            mesh.rotation.set(...part.rotation);
          }
          group.add(mesh);

          // ── Sketchy dark brown stroke outlines ──
          const edges = new THREE.EdgesGeometry(geometry);
          const edgeMaterial = new THREE.LineBasicMaterial({
            color: 0x755733,
            transparent: true,
            opacity: 0.62,
            linewidth: 1.4,
          });
          const lineSegments = new THREE.LineSegments(edges, edgeMaterial);
          lineSegments.position.copy(mesh.position);
          if (part.rotation) {
            lineSegments.rotation.set(...part.rotation);
          }
          group.add(lineSegments);
        }
      }

      scene.add(group);

      // ── 360° Continuous rotation ──
      function animate() {
        if (group && renderer && scene && camera) {
          group.rotation.y += 0.008;
          group.position.y = Math.sin(Date.now() * 0.001) * 0.03;
          renderer.render(scene, camera);
        }
        animationId = requestAnimationFrame(animate);
      }

      animate();
    })();

    function handleResize() {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 300;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer && container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer?.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        overflow: "visible",
        position: "relative",
      }}
    />
  );
}
