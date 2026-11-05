import React, { Suspense, useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Avatar Component - Renders abhishek-gaur.glb on the RIGHT 45% of the viewport.
 * 
 * Specifications:
 * - Positioned on the RIGHT (x ≈ 1.35 on desktop)
 * - Large scale (75%–90% viewport height, extending near bottom of hero)
 * - Head around upper-middle, below navbar, not cropped
 * - Grounded on subtle floor with soft contact shadow
 * - Subtle 3/4 angle facing camera/user
 * - Natural idle breathing & gentle sway (no continuous spinning)
 * - Mouse look-at response with smooth damping
 * - Scroll-driven push-in and gentle rotation
 */
function Avatar({ mouse, scrollProgress, isMobile }) {
  const groupRef = useRef();
  const { scene } = useGLTF('/models/abhishek-gaur.glb');

  // Clone scene to prevent re-render collisions and tune materials
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        if (node.material) {
          // Enhance PBR lighting response against dark studio backdrop
          node.material.roughness = Math.max(0.35, node.material.roughness ?? 0.5);
          node.material.metalness = Math.min(0.85, node.material.metalness ?? 0.3);
          node.material.needsUpdate = true;
        }
      }
    });
    return clone;
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const p = scrollProgress.current;

    // 1. Scale: Large, 75–90% viewport height
    // Desktop scale ~0.62; mobile scale ~0.48
    const baseScale = isMobile ? 0.48 : 0.62;
    // Tiny natural breathing movement (subtle chest/body expansion)
    const breath = Math.sin(t * 1.5) * 0.0035;
    groupRef.current.scale.set(baseScale + breath, baseScale + breath, baseScale + breath);

    // 2. Position: Right 40-45% of screen on desktop, center-right on mobile
    // Feet grounded at y = -1.5, head around y = +1.12
    const basePosX = isMobile ? 0.25 : 1.38;
    const basePosY = 0.72; // positions feet at y = -1.5

    // Subtle idle body float/sway (tiny, human weight shifting)
    const subtleSwayY = Math.sin(t * 1.1) * 0.008;

    // Scroll interpolation: as user scrolls down, character smoothly shifts slightly toward center
    // and camera moves toward character
    const scrollShiftX = Math.sin(Math.min(1, p * 2.2) * Math.PI * 0.5) * -0.55;
    const scrollShiftY = -p * 0.4;

    groupRef.current.position.x = basePosX + scrollShiftX;
    groupRef.current.position.y = basePosY + subtleSwayY + scrollShiftY;

    // 3. Rotation: Cinematic 3/4 angle, mostly facing camera
    // Default 3/4 angle: -0.15 rad (facing slightly left toward the typography)
    const baseRotY = -0.18;
    // Idle subtle sway
    const idleRotY = Math.sin(t * 0.45) * 0.035;
    // Mouse look-at response (subtle, clamped between -0.3 and +0.3)
    const mouseRotY = mouse.current.x * 0.15;
    // Scroll rotation: subtly turns as user scrolls down
    const scrollRotY = p * 0.45;

    const targetRotY = baseRotY + idleRotY + mouseRotY + scrollRotY;
    // Subtle pitch response from vertical mouse
    const targetRotX = mouse.current.y * 0.05;

    // Smooth damping / lerp
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.06;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.06;
  });

  return (
    <group ref={groupRef} position={[isMobile ? 0.25 : 1.38, 0.72, 0]}>
      <primitive object={clonedScene} />

      {/* Soft Contact Shadow directly beneath feet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.62, 0]}>
        <planeGeometry args={[1.8, 1.2]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// Preload the GLB so it displays without hesitation
useGLTF.preload('/models/abhishek-gaur.glb');

/**
 * Camera Controller with Mouse Parallax & Scroll Pushing
 */
function CameraController({ mouse, scrollProgress, isMobile }) {
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    const p = scrollProgress.current;

    // Base camera coordinates
    // Desktop: Z = 4.8, Y = 0.05, X = 0 (looking at center, character on right at X = 1.38)
    let baseCamZ = 4.8 - p * 0.9; // pushes slowly toward character on scroll
    let baseCamX = isMobile ? 0 : 0.05;
    let baseCamY = 0.02 + p * 0.15;

    // Subtle mouse parallax (camera moves very slightly opposite/with mouse)
    const parallaxX = mouse.current.x * 0.18;
    const parallaxY = -mouse.current.y * 0.12;

    const targetCamX = baseCamX + parallaxX;
    const targetCamY = baseCamY + parallaxY;
    const targetCamZ = baseCamZ;

    // Smooth lerp damping
    state.camera.position.x += (targetCamX - state.camera.position.x) * 0.045;
    state.camera.position.y += (targetCamY - state.camera.position.y) * 0.045;
    state.camera.position.z += (targetCamZ - state.camera.position.z) * 0.045;

    // Target look-at: shifts smoothly as user scrolls
    const targetLookAtX = (isMobile ? 0.1 : 0.45) - p * 0.2;
    const targetLookAtY = 0.0 + p * 0.1;
    const targetLookAt = new THREE.Vector3(targetLookAtX, targetLookAtY, 0);

    currentLookAt.current.lerp(targetLookAt, 0.05);
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}

/**
 * Cinematic Studio Environment: Lighting, Grounding, and Atmospheric Depth
 */
function StudioEnvironment({ isMobile }) {
  const charX = isMobile ? 0.25 : 1.38;

  return (
    <>
      {/* Subtle Studio Atmospheric Fog around lower body */}
      <fog attach="fog" args={['#05070c', 3.8, 14]} />

      {/* Dark Blue/Cyan Ambient Environment Light */}
      <ambientLight intensity={0.55} color="#0c1322" />

      {/* Key Light from upper/front-left (sculpts face, chest, and arms) */}
      <directionalLight
        position={[-1.5, 4.0, 3.8]}
        intensity={2.6}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Soft Fill Light (front-right) */}
      <directionalLight
        position={[3.0, 1.8, 2.8]}
        intensity={1.1}
        color="#93c5fd"
      />

      {/* Strong Subtle Rim Light from behind/right (carves hair, shoulder, and silhouette) */}
      <pointLight
        position={[charX + 1.8, 2.2, -2.2]}
        intensity={9.5}
        color="#8aa8ff"
        distance={10}
      />

      {/* Warm Accent Backlight (subtle Hollywood color contrast) */}
      <pointLight
        position={[charX - 2.0, 1.2, -1.8]}
        intensity={4.5}
        color="#ffb56b"
        distance={8}
      />

      {/* Subtle Neon Floor Uplight radiating beneath character */}
      <pointLight
        position={[charX, -1.48, 0.3]}
        intensity={3.8}
        color="#38bdf8"
        distance={5}
      />

      {/* Ground Floor Plane with subtle dark metallic reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.52, 0]} receiveShadow>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial
          color="#06080d"
          roughness={0.5}
          metalness={0.65}
        />
      </mesh>

      {/* Circular Stage Rim under character on the right */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[charX, -1.515, 0]}>
        <ringGeometry args={[1.5, 1.54, 64]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.45}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

/**
 * CinematicScene3D - Fullscreen WebGL Canvas mounting abhishek-gaur.glb on the RIGHT.
 */
export default function CinematicScene3D() {
  const mouse = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Mouse movement parallax tracker
    const handlePointerMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Scroll progress tracker
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollProgress.current = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0.05, 4.8], fov: 35 }}
        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3
        }}
      >
        <Suspense fallback={null}>
          <CameraController mouse={mouse} scrollProgress={scrollProgress} isMobile={isMobile} />
          <StudioEnvironment isMobile={isMobile} />
          <Avatar mouse={mouse} scrollProgress={scrollProgress} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
