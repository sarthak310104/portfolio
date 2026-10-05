"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// One fixed WebGL canvas behind the whole page:
//  - a holographic "core" (wireframe icosahedron + glass shell + orbit rings
//    + satellites) that sits in the hero and drifts away as you scroll
//  - a deep particle field with parallax
//  - a perspective grid floor that fades into the horizon
export default function SpaceScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // no WebGL: the CSS background still carries the look
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.04);
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0, 12);

    const CYAN = new THREE.Color("#39ff6e");
    const VIOLET = new THREE.Color("#5a5a5a"); // neutral grey secondary
    const MAGENTA = new THREE.Color("#39ff6e");
    const WHITE = new THREE.Color("#d8d8d8");

    // ---------- core ----------
    const core = new THREE.Group();
    scene.add(core);

    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.35, 1),
      new THREE.MeshBasicMaterial({ color: CYAN, wireframe: true, transparent: true, opacity: 0.85 })
    );
    core.add(inner);

    const innerGlow = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.0, 3),
      new THREE.MeshBasicMaterial({ color: 0x0c0c0c, transparent: true, opacity: 0.6 })
    );
    core.add(innerGlow);

    // fresnel-ish glass shell
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(2.1, 64, 64),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uA: { value: CYAN }, uB: { value: VIOLET } },
        vertexShader: `
          varying vec3 vN; varying vec3 vV; varying vec3 vP;
          void main(){
            vec4 mv = modelViewMatrix * vec4(position,1.0);
            vN = normalize(normalMatrix * normal);
            vV = normalize(-mv.xyz);
            vP = position;
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: `
          uniform float uTime; uniform vec3 uA; uniform vec3 uB;
          varying vec3 vN; varying vec3 vV; varying vec3 vP;
          void main(){
            float f = pow(1.0 - max(dot(vN, vV), 0.0), 2.6);
            float bands = smoothstep(0.92, 1.0, sin(vP.y * 9.0 - uTime * 1.6) * 0.5 + 0.5) * 0.35;
            vec3 col = mix(uA, uB, vP.y * 0.25 + 0.5);
            gl_FragColor = vec4(col, f * 0.32 + bands * f * 0.4);
          }`,
      })
    );
    core.add(shell);

    // orbit rings with tick marks
    const rings: THREE.Object3D[] = [];
    const makeRing = (radius: number, color: THREE.Color, tilt: [number, number], dashed: boolean) => {
      const g = new THREE.Group();
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.008, 8, 220),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.7 })
      );
      g.add(ring);
      if (dashed) {
        const ticks = new THREE.Group();
        const tickGeo = new THREE.BoxGeometry(0.02, 0.14, 0.02);
        const tickMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 });
        for (let i = 0; i < 48; i++) {
          const a = (i / 48) * Math.PI * 2;
          const t = new THREE.Mesh(tickGeo, tickMat);
          t.position.set(Math.cos(a) * radius, Math.sin(a) * radius, 0);
          t.rotation.z = a;
          t.scale.y = i % 6 === 0 ? 2.2 : 1;
          ticks.add(t);
        }
        g.add(ticks);
      }
      g.rotation.x = tilt[0];
      g.rotation.y = tilt[1];
      core.add(g);
      rings.push(g);
      return g;
    };
    makeRing(2.7, CYAN, [Math.PI / 2.4, 0.2], true);
    makeRing(3.25, VIOLET, [Math.PI / 1.8, -0.5], false);
    makeRing(3.8, VIOLET, [Math.PI / 2.1, 0.9], false);

    // satellites riding the rings
    const sats: { mesh: THREE.Mesh; ring: THREE.Object3D; r: number; speed: number; phase: number }[] = [];
    const satGeo = new THREE.OctahedronGeometry(0.09, 0);
    [
      { ring: 0, r: 2.7, speed: 0.6, color: MAGENTA },
      { ring: 1, r: 3.25, speed: -0.4, color: CYAN },
      { ring: 2, r: 3.8, speed: 0.28, color: VIOLET },
      { ring: 0, r: 2.7, speed: 0.6, color: CYAN, phase: Math.PI },
    ].forEach((s) => {
      const m = new THREE.Mesh(satGeo, new THREE.MeshBasicMaterial({ color: s.color }));
      rings[s.ring].add(m);
      sats.push({ mesh: m, ring: rings[s.ring], r: s.r, speed: s.speed, phase: s.phase ?? 0 });
    });

    // ---------- particle field ----------
    const COUNT = window.innerWidth < 700 ? 900 : 2200;
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 70;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 70;
      pos[i * 3 + 2] = -Math.random() * 60 + 6;
      const c = Math.random() < 0.82 ? WHITE : CYAN;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        size: 0.06,
        vertexColors: true,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    scene.add(particles);

    // ---------- grid floor ----------
    const grid = new THREE.GridHelper(120, 80, 0x2a2a2a, 0x1a1a1a);
    const gMat = grid.material as THREE.Material;
    gMat.transparent = true;
    gMat.opacity = 0.5;
    grid.position.set(0, -5.5, -20);
    scene.add(grid);

    // ---------- interaction ----------
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    let scrollY = window.scrollY;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    const layoutCore = () => {
      const w = window.innerWidth;
      const scale = w < 760 ? 0.5 : w < 1100 ? 0.85 : 1;
      core.scale.setScalar(scale);
      core.userData.baseX = w < 760 ? 2.2 : 3.6;
      core.userData.baseY = w < 760 ? 4.6 : 0.4;
    };
    layoutCore();
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      layoutCore();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // pulse when the terminal runs a command
    let pulse = 0;
    const onPulse = () => {
      pulse = 1;
    };
    window.addEventListener("holo:pulse", onPulse);

    const clock = new THREE.Clock();
    let raf = 0;
    let visible = true;
    const onVis = () => {
      visible = document.visibilityState === "visible";
      if (visible) loop();
    };
    document.addEventListener("visibilitychange", onVis);

    function frame() {
      const t = clock.getElapsedTime();
      const speed = reduced ? 0.15 : 1;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      pulse *= 0.94;

      const vh = window.innerHeight;
      const progress = Math.min(scrollY / vh, 3);

      // core drifts up/back and spins faster as you scroll out of the hero
      core.position.x = core.userData.baseX + mouse.x * 0.35 + progress * 1.2;
      core.position.y = core.userData.baseY - mouse.y * 0.25 + progress * progress * 4.5 + progress * 2;
      core.position.z = -progress * 6;
      core.visible = progress < 2.2;
      core.rotation.y = t * 0.18 * speed + mouse.x * 0.5 + progress * 1.4;
      core.rotation.x = mouse.y * 0.3 + progress * 0.6;
      inner.rotation.x = t * 0.3 * speed;
      inner.rotation.z = t * 0.2 * speed;
      const s = 1 + Math.sin(t * 2) * 0.03 + pulse * 0.25;
      inner.scale.setScalar(s);
      innerGlow.scale.setScalar(1 + Math.sin(t * 1.3) * 0.08 + pulse * 0.4);
      (innerGlow.material as THREE.MeshBasicMaterial).opacity = 0.6;
      (shell.material as THREE.ShaderMaterial).uniforms.uTime.value = t;

      rings[0].rotation.z = t * 0.25 * speed;
      rings[1].rotation.z = -t * 0.15 * speed;
      rings[2].rotation.z = t * 0.08 * speed;
      sats.forEach((sat) => {
        const a = t * sat.speed * speed + sat.phase;
        sat.mesh.position.set(Math.cos(a) * sat.r, Math.sin(a) * sat.r, 0);
        sat.mesh.rotation.y = t * 2;
      });

      particles.rotation.y = mouse.x * 0.06 + t * 0.005 * speed;
      particles.rotation.x = mouse.y * 0.04;
      particles.position.y = progress * 2.5;

      grid.position.z = -20 + ((t * 1.2 * speed) % (120 / 80));
      grid.position.y = -5.5 - progress * 1.5;

      camera.position.x = mouse.x * 0.4;
      camera.position.y = -mouse.y * 0.25;
      camera.lookAt(0, 0, -4);

      renderer.render(scene, camera);
    }

    function loop() {
      if (!visible) return;
      frame();
      raf = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("holo:pulse", onPulse);
      document.removeEventListener("visibilitychange", onVis);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose?.();
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="space-scene" aria-hidden="true" />;
}