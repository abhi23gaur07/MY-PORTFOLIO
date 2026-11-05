import React, { Suspense, useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Avatar - Programmatically Normalized 3D Character Model.
 * 
 * Implements exact bounding-box inspection and normalization:
 * 1. Inspects raw model using THREE.Box3().setFromObject()
 * 2. Normalizes modelHeight to exactly 2.1 units (75-80% viewport height)
 * 3. Centers model along X & Z and grounds feet at ground level (y = -1.15)
 * 4. Positions character on the RIGHT 40-45% of the viewport (x ≈ +1.4 to +1.8)
 * 5. Subtle idle breathing, natural weight sway, and mouse look-at tracking
 */
function Avatar({ mouse, scrollProgress }) {
  const outerGroupRef = useRef();
  const innerGroupRef = useRef();
  const { scene } = useGLTF('/models/abhishek-gaur.glb');
  const { viewport } = useThree();

  // Programmatically normalize the model using its exact bounding box
  const { normalizedScene, feetY, headY } = useMemo(() => {
    const clone = scene.clone();

    // 1. Calculate actual raw bounding box
    const rawBox = new THREE.Box3().setFromObject(clone);
    const rawSize = new THREE.Vector3();
    rawBox.getSize(rawSize);
    const rawCenter = new THREE.Vector3();
    rawBox.getCenter(rawCenter);

    // 2. Normalize to human height (2.1 units)
    const targetHeight = 2.1;
    const actualHeight = rawSize.y > 0 ? rawSize.y : 1;
    const normScale = targetHeight / actualHeight;
    clone.scale.set(normScale, normScale, normScale);

    // Center horizontally (X) and depth-wise (Z) relative to character anchor
    clone.position.x = -rawCenter.x * normScale;
    clone.position.z = -rawCenter.z * normScale;

    // 3. Ground the feet at target ground level (y = -1.15)
    clone.updateMatrixWorld(true);
    const scaledBox = new THREE.Box3().setFromObject(clone);
    const targetGroundY = -1.15;
    const offsetY = targetGroundY - scaledBox.min.y;
    clone.position.y += offsetY;

    clone.updateMatrixWorld(true);
    const finalBox = new THREE.Box3().setFromObject(clone);

    // Enhance PBR materials for cinematic dark studio lighting
    clone.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        if (node.material) {
          node.material.roughness = Math.max(0.35, node.material.roughness ?? 0.5);
          node.material.metalness = Math.min(0.85, node.material.metalness ?? 0.3);
          node.material.needsUpdate = true;
        }
      }
    });

    return {
      normalizedScene: clone,
      feetY: finalBox.min.y,
      headY: finalBox.max.y
    };
  }, [scene]);

  // Compute responsive right-side X placement based on camera frustum width
  // Desktop: places character at ~28% of total viewport width to the right (x ≈ 1.4 to 1.7)
  // Mobile/Tablet: shifts slightly closer to center so character remains fully framed
  const targetX = useMemo(() => {
    if (viewport.width > 4.2) {
      return viewport.width * 0.28; // desktop: right 40-45% zone
    } else if (viewport.width > 3.0) {
      return viewport.width * 0.22; // tablet
    } else {
      return viewport.width * 0.12; // mobile
    }
  }, [viewport.width]);

  useFrame((state) => {
    if (!innerGroupRef.current || !outerGroupRef.current) return;
    const t = state.clock.getElapsedTime();
    const p = scrollProgress.current;

    // 1. Natural idle breathing (subtle chest/body expansion)
    const breath = Math.sin(t * 1.5) * 0.0035;
    innerGroupRef.current.scale.set(1 + breath, 1 + breath, 1);

    // 2. Subtle weight shift (tiny idle vertical sway)
    const idleSwayY = Math.sin(t * 1.1) * 0.006;

    // 3. Scroll position transition: character shifts slightly toward center and forward
    const scrollShiftX = Math.sin(Math.min(1, p * 2.0) * Math.PI * 0.5) * -(targetX * 0.45);
    const scrollShiftY = -p * 0.35;

    outerGroupRef.current.position.x = targetX + scrollShiftX;
    outerGroupRef.current.position.y = idleSwayY + scrollShiftY;

    // 4. Rotation: Cinematic 3/4 angle facing camera/left towards typography
    const baseRotY = -0.16; // 3/4 pose facing slightly toward content
    const idleRotY = Math.sin(t * 0.45) * 0.025;
    const mouseRotY = mouse.current.x * 0.14; // smooth look-at tracking
    const scrollRotY = p * 0.42;

    const targetRotY = baseRotY + idleRotY + mouseRotY + scrollRotY;
    const targetRotX = mouse.current.y * 0.04;

    // Smooth damping / lerp
    innerGroupRef.current.rotation.y += (targetRotY - innerGroupRef.current.rotation.y) * 0.06;
    innerGroupRef.current.rotation.x += (targetRotX - innerGroupRef.current.rotation.x) * 0.06;
  });

  return (
    <group ref={outerGroupRef} position={[targetX, 0, 0]}>
      <group ref={innerGroupRef}>
        <primitive object={normalizedScene} />
      </group>

      {/* Realistic Soft Contact Shadow directly under feet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.148, 0]}>
        <circleGeometry args={[0.65, 48]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.7}
          depthWrite={false}
        />
      </mesh>

      {/* Diffuse Outer Ambient Shadow Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.149, 0]}>
        <circleGeometry args={[1.2, 48]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// Preload model
useGLTF.preload('/models/abhishek-gaur.glb');

/**
 * Camera Controller - Perspective Camera with Mouse Parallax & Scroll Zoom
 */
function CameraController({ mouse, scrollProgress }) {
  const currentLookAt = useRef(new THREE.Vector3(0, -0.08, 0));

  useFrame((state) => {
    const p = scrollProgress.current;

    // Base camera coordinates:
    // Z = 3.9 provides exact 78% viewport height framing of the 2.1-unit character
    // On scroll: pushes slowly toward character (3.9 -> 3.2)
    const baseCamZ = 3.9 - p * 0.7;
    const baseCamX = 0;
    const baseCamY = -0.05 + p * 0.12;

    // Subtle mouse parallax
    const parallaxX = mouse.current.x * 0.14;
    const parallaxY = -mouse.current.y * 0.1;

    const targetCamX = baseCamX + parallaxX;
    const targetCamY = baseCamY + parallaxY;
    const targetCamZ = baseCamZ;

    // Smooth camera damping
    state.camera.position.x += (targetCamX - state.camera.position.x) * 0.045;
    state.camera.position.y += (targetCamY - state.camera.position.y) * 0.045;
    state.camera.position.z += (targetCamZ - state.camera.position.z) * 0.045;

    // Target look-at: shifts smoothly as user scrolls
    const targetLookAtX = 0.35 - p * 0.25;
    const targetLookAtY = -0.08 + p * 0.1;
    const targetLookAt = new THREE.Vector3(targetLookAtX, targetLookAtY, 0);

    currentLookAt.current.lerp(targetLookAt, 0.05);
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}

/**
 * Studio Lighting & Grounding Plane
 */
function StudioLighting() {
  return (
    <>
      {/* Volumetric Studio Fog hugging lower ground */}
      <fog attach="fog" args={['#05070c', 3.6, 12]} />

      {/* Dark Blue/Cyan Ambient Fill */}
      <ambientLight intensity={0.65} color="#0c1424" />

      {/* Key Light from upper/front-left (sculpts facial features, shirt & trousers) */}
      <directionalLight
        position={[-2.0, 3.8, 3.5]}
        intensity={2.8}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Soft Fill Light (front-right) */}
      <directionalLight
        position={[3.0, 1.5, 2.5]}
        intensity={1.2}
        color="#93c5fd"
      />

      {/* Strong Subtle Rim Light from behind/right (carves hair, shoulder, and silhouette) */}
      <pointLight
        position={[3.2, 1.8, -2.0]}
        intensity={10.5}
        color="#8aa8ff"
        distance={12}
      />

      {/* Warm Accent Backlight */}
      <pointLight
        position={[-2.5, 1.2, -1.8]}
        intensity={4.5}
        color="#ffb56b"
        distance={9}
      />

      {/* Ground Floor Plane with dark metallic studio reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.155, 0]} receiveShadow>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial
          color="#06080e"
          roughness={0.48}
          metalness={0.68}
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

  useEffect(() => {
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
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, -0.05, 3.9], fov: 38 }}
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
          <CameraController mouse={mouse} scrollProgress={scrollProgress} />
          <StudioLighting />
          <Avatar mouse={mouse} scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
