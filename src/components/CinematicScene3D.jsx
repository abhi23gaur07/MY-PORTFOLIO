import React, { Suspense, useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * 3D Avatar Component
 * Loads /models/abhishek-gaur.glb and handles:
 * - Natural idle breathing
 * - Subtle body sway & weight shift
 * - Mouse-directed body tilt & rotation
 * - Scroll-driven orientation matching portfolio sections
 */
function Avatar({ mouse, scrollProgress, isDragging, dragRotY }) {
  const groupRef = useRef();
  const { scene } = useGLTF('/models/abhishek-gaur.glb');

  // Clone scene so multiple instances don't collide if any
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        if (node.material) {
          node.material.roughness = Math.max(0.35, node.material.roughness || 0.5);
          node.material.needsUpdate = true;
        }
      }
    });
    return clone;
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // 1. Natural idle breathing (subtle torso expansion)
    const breath = Math.sin(t * 1.6) * 0.006;
    const baseScale = 1.85;
    groupRef.current.scale.set(baseScale + breath, baseScale + breath, baseScale);

    // 2. Weight shift & subtle idle vertical float
    const floatY = Math.sin(t * 1.15) * 0.025;
    const basePosY = -1.45;
    groupRef.current.position.y = basePosY + floatY;

    // 3. Body rotation combining:
    // - User manual drag (when in hero)
    // - Idle subtle sway: Math.sin(t * 0.35) * 0.08
    // - Mouse horizontal tracking: mouse.x * 0.22
    // - Scroll progress rotation: turns to face content as user scrolls
    const idleSway = Math.sin(t * 0.4) * 0.06;
    const mouseTurn = mouse.current.x * 0.22;
    const scrollTurn = scrollProgress.current * Math.PI * 0.65;

    let targetRotY = scrollTurn + mouseTurn + idleSway;
    if (isDragging.current) {
      targetRotY = dragRotY.current;
    }

    // Subtle pitch tilt from mouse Y
    const targetRotX = mouse.current.y * 0.08;

    // Smooth lerp rotation for natural human physics
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.08;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, -1.45, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

// Preload the model for instantaneous display
useGLTF.preload('/models/abhishek-gaur.glb');

/**
 * Camera Controller linked with GSAP ScrollTrigger & Mouse Parallax
 */
function CameraController({ mouse, scrollProgress }) {
  // Key camera positions per section
  // Section 0 (Hero): Character on center-right, wide cinematic view
  // Section 1 (About): Pushes in closer, character on left-center, dramatic rim
  // Section 2 (Doors/Projects): Elevated framing showcasing the stage
  // Section 3 (Skills & Timeline): Balanced medium shot
  // Section 4 (Contact): Centered, heroic front view
  const targetCamPos = useRef(new THREE.Vector3(0.5, 1.25, 5.2));
  const targetLookAt = useRef(new THREE.Vector3(0.15, 0.9, 0));
  const currentLookAt = useRef(new THREE.Vector3(0.15, 0.9, 0));

  useFrame((state) => {
    const p = scrollProgress.current;

    // Interpolate camera path along scroll progress
    if (p < 0.22) {
      // Hero section: [0.5, 1.25, 5.2] -> framing character slightly to right
      const local = p / 0.22;
      targetCamPos.current.set(
        0.5 + local * 0.2,
        1.25 + local * 0.1,
        5.2 - local * 0.6
      );
      targetLookAt.current.set(0.15, 0.9, 0);
    } else if (p < 0.48) {
      // About Me section: Pushes in closer, shifts left to give room for About narrative
      const local = (p - 0.22) / 0.26;
      targetCamPos.current.set(
        0.7 - local * 1.4, // shifts from right to left
        1.35 + local * 0.1,
        4.6 - local * 0.8  // pushes in to 3.8 distance
      );
      targetLookAt.current.set(-0.15 + local * 0.1, 1.05, 0);
    } else if (p < 0.72) {
      // Doors & Projects: Pulls back to frame the interactive hallway
      const local = (p - 0.48) / 0.24;
      targetCamPos.current.set(
        -0.7 + local * 1.3,
        1.45 - local * 0.2,
        3.8 + local * 1.0
      );
      targetLookAt.current.set(0.2, 0.85, 0);
    } else {
      // Skills & Contact: Majestic front framing
      const local = (p - 0.72) / 0.28;
      targetCamPos.current.set(
        0.6 - local * 0.6,
        1.25,
        4.8 - local * 0.4
      );
      targetLookAt.current.set(0, 0.95, 0);
    }

    // Mouse parallax offset on camera
    const mouseOffsetX = mouse.current.x * 0.4;
    const mouseOffsetY = -mouse.current.y * 0.22;

    // Smooth camera damping
    state.camera.position.x += (targetCamPos.current.x + mouseOffsetX - state.camera.position.x) * 0.045;
    state.camera.position.y += (targetCamPos.current.y + mouseOffsetY - state.camera.position.y) * 0.045;
    state.camera.position.z += (targetCamPos.current.z - state.camera.position.z) * 0.045;

    currentLookAt.current.lerp(targetLookAt.current, 0.05);
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}

/**
 * Ambient Cyber Motes & Reflective Podium Stage
 */
function EnvironmentStage() {
  const particleCount = 65;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 1] = Math.random() * 3.5 - 1.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, []);

  const particlesRef = useRef();

  useFrame((state) => {
    if (particlesRef.current) {
      const t = state.clock.getElapsedTime();
      particlesRef.current.rotation.y = t * 0.025;
    }
  });

  return (
    <>
      {/* Volumetric Studio Fog */}
      <fog attach="fog" args={['#05070c', 4.5, 14]} />

      {/* Atmospheric Lighting */}
      <ambientLight intensity={0.65} color="#0d1424" />

      {/* Key Directional Light (Sculpts face & shoulders) */}
      <directionalLight
        position={[3.5, 5, 4]}
        intensity={2.3}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Dramatic Cool Cyan Rim Light (Left/Back) */}
      <pointLight position={[-3.2, 2.2, 2]} intensity={9.5} color="#8aa8ff" distance={14} />

      {/* Warm Accent Backlight (Right/Back) */}
      <pointLight position={[3.2, 1.2, -1.5]} intensity={6.5} color="#ffb56b" distance={12} />

      {/* Neon Floor Uplight radiating from circular stage */}
      <pointLight position={[0, -1.42, 0.3]} intensity={4.5} color="#38bdf8" distance={6} />

      {/* Floating Cyan Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.032}
          color="#8aa8ff"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Circular Reflective Titanium Stage Platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.52, 0]} receiveShadow>
        <circleGeometry args={[2.2, 64]} />
        <meshStandardMaterial color="#080a0f" roughness={0.45} metalness={0.7} />
      </mesh>

      {/* Neon Cyan Perimeter Ring on Stage */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.515, 0]}>
        <ringGeometry args={[2.14, 2.2, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}

/**
 * CinematicScene3D - Fullscreen Persistent 3D WebGL Canvas
 */
export default function CinematicScene3D({ onDragStart, onDragEnd }) {
  const mouse = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);
  const isDragging = useRef(false);
  const dragRotY = useRef(0);
  const dragStartX = useRef(0);

  // Global Pointer Tracking for Parallax
  useEffect(() => {
    const handlePointerMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;

      if (isDragging.current) {
        const deltaX = e.clientX - dragStartX.current;
        dragRotY.current += deltaX * 0.008;
        dragStartX.current = e.clientX;
      }
    };

    const handlePointerUp = () => {
      isDragging.current = false;
      if (onDragEnd) onDragEnd();
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Track Global Page Scroll Progress for GSAP ScrollTrigger
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollProgress.current = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onDragEnd]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0.5, 1.25, 5.2], fov: 35 }}
        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.35
        }}
      >
        <Suspense fallback={null}>
          <CameraController mouse={mouse} scrollProgress={scrollProgress} />
          <EnvironmentStage />
          <Avatar
            mouse={mouse}
            scrollProgress={scrollProgress}
            isDragging={isDragging}
            dragRotY={dragRotY}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
