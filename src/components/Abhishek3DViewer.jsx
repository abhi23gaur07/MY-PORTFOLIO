import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RotateCw, Eye } from 'lucide-react';

/**
 * Abhishek3DViewer - WebGL 3D Canvas rendering the official abhishek-gaur.glb model
 * 
 * Implements the exact cinematic lighting, camera perspective, floating idle motion,
 * and mouse-tracking response from the reference video.
 */
export default function Abhishek3DViewer({ className = "" }) {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const characterRef = useRef(null);

  // Mouse & drag tracking state
  const mouseRef = useRef({ x: 0, y: 0 });
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

    // 2. Camera (FOV 35 matching reference video for cinematic portrait depth)
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 1.25, 5.4);
    cameraRef.current = camera;

    // 3. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Exact Studio Lighting from Reference Video
    // Ambient soft fill
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Key directional light (Front-top right)
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(3, 5, 4);
    scene.add(dirLight);

    // Cool cyan/blue rim point light (Front-left)
    const coolRimLight = new THREE.PointLight(0x8aa8ff, 8.5, 12);
    coolRimLight.position.set(-3, 2, 2);
    scene.add(coolRimLight);

    // Warm accent rim point light (Back-right)
    const warmRimLight = new THREE.PointLight(0xffb56b, 6.5, 12);
    warmRimLight.position.set(3, 1, -1);
    scene.add(warmRimLight);

    // Pedestal cyan glow uplight
    const floorGlow = new THREE.PointLight(0x38bdf8, 3.5, 5);
    floorGlow.position.set(0, -1.4, 0.2);
    scene.add(floorGlow);

    // 5. Circular Metallic Stage Platform (Matching reference video)
    const platformGeo = new THREE.CircleGeometry(2.1, 64);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x07080b,
      roughness: 0.55,
      metalness: 0.65
    });
    const platformMesh = new THREE.Mesh(platformGeo, platformMat);
    platformMesh.rotation.x = -Math.PI / 2;
    platformMesh.position.set(0, -1.52, 0);
    scene.add(platformMesh);

    // Outer cyan perimeter ring on platform
    const ringGeo = new THREE.RingGeometry(2.05, 2.12, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.set(0, -1.515, 0);
    scene.add(ringMesh);

    // 6. Ambient Cyber Dust Particles
    const particleCount = 50;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = Math.random() * 3 - 1.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x8aa8ff,
      size: 0.03,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Load User's abhishek-gaur.glb Model
    const loader = new GLTFLoader();
    loader.load(
      '/models/abhishek-gaur.glb',
      (gltf) => {
        const root = gltf.scene;
        // Scale 1.8 matching reference video
        root.scale.set(1.8, 1.8, 1.8);
        root.position.set(0, -1.45, 0);

        root.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
            if (node.material) {
              node.material.roughness = Math.max(0.3, node.material.roughness || 0.5);
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
        console.error('Failed to load abhishek-gaur.glb:', err);
        setLoading(false);
      }
    );

    // 8. Animation Loop matching reference video
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Camera parallax following mouse exactly like reference video:
      // state.camera.position.x += (mouse.current.x*.35-state.camera.position.x)*.025;
      // state.camera.position.y += (1.25-mouse.current.y*.18-state.camera.position.y)*.025;
      const targetCamX = mouseRef.current.x * 0.45;
      const targetCamY = 1.25 - mouseRef.current.y * 0.22;
      camera.position.x += (targetCamX - camera.position.x) * 0.03;
      camera.position.y += (targetCamY - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      // Character idle float & subtle sway
      if (characterRef.current) {
        // Float: position.y = -1.45 + Math.sin(t*1.15)*0.025
        characterRef.current.position.y = -1.45 + Math.sin(t * 1.15) * 0.025;

        // Auto sway or drag rotation
        if (!isDragging && autoRotateRef.current) {
          activeRotYRef.current = Math.sin(t * 0.35) * 0.14;
        }

        characterRef.current.rotation.y = activeRotYRef.current;
      }

      // Particles drift
      particles.rotation.y = t * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Listener
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

  // Mouse move parallax
  const handlePointerMove = (e) => {
    const rect = mountRef.current?.getBoundingClientRect();
    if (!rect) return;

    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseRef.current = { x: nx, y: ny };

    // Drag to orbit 360 degrees
    if (isDragging) {
      const deltaX = e.clientX - dragStartRef.current.x;
      activeRotYRef.current = dragStartRef.current.rotY + deltaX * 0.01;
    }
  };

  const handlePointerDown = (e) => {
    setIsDragging(true);
    autoRotateRef.current = false;
    dragStartRef.current = {
      x: e.clientX,
      rotY: activeRotYRef.current
    };
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
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Loading Skeleton */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050608]/80 backdrop-blur-sm z-20">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping" />
            <div className="absolute inset-0 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-cyan-400 border-l-transparent animate-spin" />
          </div>
          <span className="mt-4 text-xs font-mono tracking-widest text-cyan-300 uppercase">
            Loading Abhishek 3D Avatar...
          </span>
        </div>
      )}

      {/* Interactive HUD Orbit Control Bar */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-[#0a0f1d]/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-cyan-500/30 shadow-[0_0_20px_rgba(56,189,248,0.2)] pointer-events-auto">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-300">
          <RotateCw className={`w-3.5 h-3.5 ${isDragging ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Drag to Orbit 360°</span>
          <span className="sm:hidden">Drag 360°</span>
        </div>

        <span className="text-white/20">|</span>

        <button
          onClick={handleResetFront}
          title="Reset to Front View"
          className="text-[11px] font-mono text-slate-300 hover:text-white flex items-center gap-1 hover:underline transition-colors cursor-pointer"
        >
          <Eye className="w-3 h-3 text-cyan-400" />
          <span>Front View</span>
        </button>
      </div>
    </div>
  );
}
