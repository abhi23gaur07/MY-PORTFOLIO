import React, { Suspense, useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface HeroAvatarProps {
  onLoaded?: () => void;
  className?: string;
}

/**
 * Avatar Model with Idle/Walk Cross-fading, Mouse Parallax, and Entrance Animation
 */
function Model({ onLoaded }: { onLoaded?: () => void }) {
  const group = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Object3D | null>(null);

  // Load the created GLB asset
  const { scene, animations } = useGLTF('/abhishek.glb');
  const { actions, mixer } = useAnimations(animations, group);

  // Track scroll velocity for driving Walk animation
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const scrollVelocity = useRef(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isWalking = useRef(false);

  // Mouse tracking state
  const mouse = useRef({ x: 0, y: 0 });
  const reducedMotion = useRef(false);

  // Entrance animation progress (0 -> 1)
  const entranceProgress = useRef(0);

  // Find named "Head" node for subtle head turn
  useEffect(() => {
    let foundHead: THREE.Object3D | null = null;
    scene.traverse((node) => {
      if (node.name === 'Head') foundHead = node;
      if ((node as THREE.Mesh).isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    headRef.current = foundHead;

    // Signal parent that model has loaded
    if (onLoaded) onLoaded();
  }, [scene, onLoaded]);

  // Reduced motion detection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }, []);

  // Animation controller (Idle default -> Cross-fade to Walk on scroll)
  useEffect(() => {
    if (!actions || !actions.Idle) return;

    // Start with Idle looping
    actions.Idle.reset().fadeIn(0.4).play();

    // Scroll listener measuring speed and triggering Walk
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollY.current);
      lastScrollY.current = currentY;

      scrollVelocity.current = Math.min(2.5, Math.max(0.6, delta * 0.08));

      if (actions.Walk && !isWalking.current && !reducedMotion.current) {
        isWalking.current = true;
        actions.Idle.fadeOut(0.3);
        actions.Walk.reset().fadeIn(0.3).play();
      }

      if (actions.Walk) {
        actions.Walk.timeScale = scrollVelocity.current;
      }

      // Reset back to Idle after scrolling stops
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        if (actions.Walk && actions.Idle) {
          actions.Walk.fadeOut(0.35);
          actions.Idle.reset().fadeIn(0.35).play();
          isWalking.current = false;
        }
      }, 160);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [actions]);

  // Mouse tracking listener
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (reducedMotion.current) return;
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // Frame loop: Entrance interpolation, mouse-follow, and subtle head turn
  useFrame((_, delta) => {
    if (!group.current) return;

    // 1. Entrance animation: rise from y = -0.3 to 0.0 with gentle scale ease
    if (entranceProgress.current < 1) {
      entranceProgress.current = Math.min(1, entranceProgress.current + delta * 1.6);
      const ease = 1 - Math.pow(1 - entranceProgress.current, 3); // cubic ease-out
      group.current.position.y = -0.35 * (1 - ease);
      group.current.scale.setScalar(0.85 + 0.15 * ease);
    }

    // 2. Subtle mouse follow: rotate whole avatar max ±15° (±0.26 rad) on Y
    if (!reducedMotion.current) {
      const targetRotY = mouse.current.x * 0.26;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotY, 0.06);

      // 3. Slight head turn toward cursor
      if (headRef.current) {
        const targetHeadY = mouse.current.x * 0.12;
        const targetHeadX = -mouse.current.y * 0.08;
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetHeadY, 0.08);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetHeadX, 0.08);
      }
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]} dispose={null}>
      <primitive object={scene} />

      {/* Soft circular contact shadow directly under the feet (y = 0) */}
      <ContactShadows
        position={[0, 0.001, 0]}
        opacity={0.65}
        scale={1.8}
        blur={1.6}
        far={1.2}
      />

      {/* Subtle glowing floor rim ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <ringGeometry args={[0.7, 0.72, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Preload the GLB asset
useGLTF.preload('/abhishek.glb');

/**
 * Fallback Error Boundary Component
 */
class ErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: any) {
    console.error('HeroAvatar 3D Canvas error:', err);
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/**
 * HeroAvatar - 3D WebGL Canvas positioned over the right ~45% of the Hero.
 * 
 * Features:
 * - Transparent background (alpha)
 * - Camera framed full-body at fov 30 (fills ~75% of hero height)
 * - Cinematic three-point lighting + overhead spotlight cone + cool cyan rim
 * - Off-screen pause using IntersectionObserver
 * - Fully responsive (< 1024px shifts behind text at reduced opacity)
 */
export default function HeroAvatar({ onLoaded, className = '' }: HeroAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Pause rendering when hero is scrolled out of viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute top-0 right-0 w-full lg:w-[48%] h-full z-0 pointer-events-none select-none transition-opacity duration-700 ${
        className
      }`}
      style={{
        // On mobile/tablet, show at reduced opacity so text remains 100% readable
        opacity: undefined
      }}
    >
      <ErrorBoundary fallback={null}>
        <Canvas
          frameloop={isVisible ? 'always' : 'never'}
          camera={{ position: [0, 0.88, 4.4], fov: 30 }}
          dpr={[1, 1.5]}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.25
          }}
          className="w-full h-full pointer-events-none"
        >
          {/* Ambient Fill */}
          <ambientLight intensity={0.45} color="#0c1424" />

          {/* Soft Key Light from the front-right */}
          <directionalLight position={[2, 3, 3]} intensity={2.2} color="#ffffff" />

          {/* Cool Cyan/Blue Rim Light from behind-left */}
          <directionalLight position={[-3, 2, -2]} intensity={3.5} color="#38bdf8" />

          {/* Subtle Spotlight Cone from above matching dark navy theme */}
          <spotLight
            position={[0, 4.2, 1.2]}
            angle={0.42}
            penumbra={0.8}
            intensity={4.0}
            color="#e0f2fe"
            castShadow
          />

          <Suspense fallback={null}>
            <Model onLoaded={onLoaded} />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}

