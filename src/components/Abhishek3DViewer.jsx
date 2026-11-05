import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RotateCw, Sparkles, Eye, Shield, Cpu, Trophy } from 'lucide-react';

/**
 * Abhishek3DViewer - WebGL 3D Canvas rendering abhishek_gaur.glb
 * 
 * Features:
 * - Direct GLTF loading of user's custom 3D model
 * - Cinematic three-point studio lighting + neon rim glow + pedestal underlight
 * - Smooth pointer parallax & interactive 360° drag orbit
 * - Floating ambient cyber particles
 * - Responsive viewport with tone mapping
 */
export default function Abhishek3DViewer({ className = "" }) {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [orbitAngle, setOrbitAngle] = useState(0);

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const characterRef = useRef(null);
  const particlesRef = useRef(null);

  // Mouse & drag tracking state
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseCurrentRef = useRef({ x: 0, y: 0 });
  const dragStartRef = useRef({ x: 0, rotY: 0 });
  const activeRotYRef = useRef(0);
  const autoRotateRef = useRef(true);

  // Reset to front view
  const handleResetFront = useCallback(() => {
    activeRotYRef.current = 0;
    autoRotateRef.current = false;
    setTimeout(() => { autoRotateRef.current = true; }, 3000);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.15, 3.8);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Studio Lighting
    // Key Light (Warm White from top-front)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(2.5, 4.0, 3.0);
    scene.add(keyLight);

    // Cyan Rim / Back Light (Creates strong cyan edge highlight)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 4.2);
    rimLight.position.set(-2.5, 3.0, -3.2);
    scene.add(rimLight);

    // Deep Blue Fill Light (Soft shadow tones)
    const fillLight = new THREE.DirectionalLight(0x60a5fa, 1.4);
    fillLight.position.set(-2.8, 1.8, 2.5);
    scene.add(fillLight);

    // Pedestal Uplight (Glowing cyan from base)
    const uplight = new THREE.PointLight(0x38bdf8, 3.5, 4.5);
    uplight.position.set(0, 0.05, 0);
    scene.add(uplight);

    // Ambient Fill
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.0);
    scene.add(ambientLight);

    // 5. Ambient Cyber Particles
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 3.5;
      positions[i * 3 + 1] = Math.random() * 2.8 - 0.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3.0;
      scales[i] = Math.random() * 0.03 + 0.01;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 6. Ground Specular Shadow / Reflection Ring
    const floorGeo = new THREE.RingGeometry(0.3, 1.4, 48);
    const floorMat = new THREE.MeshBasicMaterial({
      color: 0x060810,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = Math.PI / 2;
    floorMesh.position.y = -0.15;
    scene.add(floorMesh);

    // 7. Load Abhishek Gaur .GLB Model
    const loader = new GLTFLoader();
    loader.load(
      '/models/abhishek_gaur.glb',
      (gltf) => {
        const root = gltf.scene;
        root.position.set(0, -0.72, 0); // Position neatly on ground
        root.scale.set(1.05, 1.05, 1.05);

        // Enhance material reflections
        root.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
            if (node.material) {
              node.material.needsUpdate = true;
            }
          }
        });

        scene.add(root);
        characterRef.current = root;
        setLoading(false);
      },
      undefined,
      (err) => {
        console.error('Failed to load abhishek_gaur.glb:', err);
        setLoading(false);
      }
    );

    // 8. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseCurrentRef.current.x += (mouseTargetRef.current.x - mouseCurrentRef.current.x) * 0.06;
      mouseCurrentRef.current.y += (mouseTargetRef.current.y - mouseCurrentRef.current.y) * 0.06;

      // Subtle breathing / idle motion on character
      if (characterRef.current) {
        // Natural subtle chest breathing scale
        const breath = Math.sin(elapsedTime * 1.8) * 0.003;
        characterRef.current.scale.set(1.05 + breath, 1.05 + breath, 1.05);

        // Smooth rotation combining drag orbit, mouse tilt, and gentle auto-sway
        if (!isDragging && autoRotateRef.current) {
          activeRotYRef.current += Math.sin(elapsedTime * 0.6) * 0.0008;
        }

        const targetRotY = activeRotYRef.current + mouseCurrentRef.current.x * 0.28;
        const targetRotX = mouseCurrentRef.current.y * 0.12;

        characterRef.current.rotation.y += (targetRotY - characterRef.current.rotation.y) * 0.1;
        characterRef.current.rotation.x += (targetRotX - characterRef.current.rotation.x) * 0.1;
      }

      // Gentle drift for cyber particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.04;
        const pos = particlesRef.current.geometry.attributes.position.array;
        for (let i = 1; i < pos.length; i += 3) {
          pos[i] += Math.sin(elapsedTime + i) * 0.0006;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Mouse & Touch Parallax / Orbit Handlers
  const handlePointerDown = (e) => {
    setIsDragging(true);
    autoRotateRef.current = false;
    dragStartRef.current = {
      x: e.clientX,
      rotY: activeRotYRef.current
    };
  };

  const handlePointerMove = (e) => {
    const rect = mountRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Normalised mouse coordinates (-1 to 1) for camera parallax
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mouseTargetRef.current = { x: nx, y: ny };

    // Drag to orbit 360 degrees
    if (isDragging) {
      const deltaX = e.clientX - dragStartRef.current.x;
      activeRotYRef.current = dragStartRef.current.rotY + deltaX * 0.009;
      setOrbitAngle(Math.round(((activeRotYRef.current * 180) / Math.PI) % 360));
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setTimeout(() => {
      autoRotateRef.current = true;
    }, 4000);
  };

  return (
    <div
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Loading Skeleton Indicator */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#06080d]/80 backdrop-blur-sm z-20">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping" />
            <div className="absolute inset-0 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-cyan-400 border-l-transparent animate-spin" />
          </div>
          <span className="mt-4 text-xs font-mono tracking-widest text-cyan-300 uppercase">
            Loading Abhishek 3D Model...
          </span>
        </div>
      )}

      {/* Interactive HUD Overlay Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-[#0a0f1d]/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-cyan-500/30 shadow-[0_0_20px_rgba(56,189,248,0.2)] pointer-events-auto">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-300">
          <RotateCw className={`w-3.5 h-3.5 ${isDragging ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Drag to Orbit 360°</span>
          <span className="sm:hidden">Drag 360°</span>
        </div>

        <span className="text-white/20">|</span>

        <button
          onClick={handleResetFront}
          title="Reset to Front View"
          className="text-[11px] font-mono text-slate-300 hover:text-white flex items-center gap-1 hover:underline transition-colors"
        >
          <Eye className="w-3 h-3 text-cyan-400" />
          <span>Front View</span>
        </button>
      </div>

      {/* Ambient Cyber Corner Targeting Marks */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400/40 pointer-events-none" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400/40 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400/40 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400/40 pointer-events-none" />
    </div>
  );
}
