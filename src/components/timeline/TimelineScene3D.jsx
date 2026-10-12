import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Exhibit3DFrame } from './Exhibit3DFrame';
import { threeEvents } from '../../data/threeEventsData';

/**
 * Subtle connecting timeline guideline running gracefully along the exhibition floor.
 */
function GalleryGuideline() {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -1.8, 4),
      new THREE.Vector3(0, -1.8, -4.5),
      new THREE.Vector3(0.8, -1.8, -10.0),
      new THREE.Vector3(1.8, -1.8, -15.5),
      new THREE.Vector3(0.2, -1.8, -21.0),
      new THREE.Vector3(-1.4, -1.8, -26.5),
      new THREE.Vector3(-1.4, -1.8, -32.0),
    ]);
  }, []);

  return (
    <group>
      {/* Muted dark stone conduit */}
      <mesh>
        <tubeGeometry args={[curve, 80, 0.025, 8, false]} />
        <meshStandardMaterial color="#1e1d26" roughness={0.7} />
      </mesh>
      {/* Restrained antique lavender core */}
      <mesh>
        <tubeGeometry args={[curve, 80, 0.008, 8, false]} />
        <meshBasicMaterial color="#9d85b5" />
      </mesh>
    </group>
  );
}

/**
 * Camera controller smoothly tracking the 3-event exhibition journey
 * based on scroll progress.
 */
function TimelineCameraRig({ progressRef, onActiveChange, isMobile = false }) {
  const currentPos = useRef(new THREE.Vector3(0, 0.3, 2.5));
  const currentLookAt = useRef(new THREE.Vector3(0, 0.2, -4.5));

  useFrame((state) => {
    const p = progressRef.current || 0;

    let targetX = 0;
    let targetY = isMobile ? 0.4 : 0.2;
    let targetZ = 2.5;

    let lookX = 0;
    let lookY = isMobile ? 0.3 : 0.2;
    let lookZ = -4.5;

    let activeIdx = 0;

    if (p < 0.33) {
      // 1. EXHIBIT 1: BUILD (Design of Industry Virtual Reality Application)
      const t = p / 0.33;
      targetX = THREE.MathUtils.lerp(0, 0, t);
      targetY = isMobile ? 0.35 : 0.2;
      targetZ = THREE.MathUtils.lerp(2.0, -0.6, t);

      lookX = 0;
      lookY = 0.2;
      lookZ = -4.5;
      activeIdx = 0;
    } else if (p < 0.67) {
      // 2. EXHIBIT 2: SHOWCASE (SRISHTI Exhibition 2024 — WONDERLENS)
      const t = (p - 0.33) / 0.34;
      targetX = THREE.MathUtils.lerp(0, 1.8, t);
      targetY = isMobile ? 0.35 : 0.2;
      targetZ = THREE.MathUtils.lerp(-0.6, -11.6, t);

      lookX = 1.8;
      lookY = 0.2;
      lookZ = -15.5;
      activeIdx = 1;
    } else {
      // 3. EXHIBIT 3: RECOGNITION (Technical Stall at Anveshana 2025)
      const t = (p - 0.67) / 0.33;
      targetX = THREE.MathUtils.lerp(1.8, -1.4, t);
      targetY = isMobile ? 0.35 : 0.2;
      targetZ = THREE.MathUtils.lerp(-11.6, -22.6, t);

      lookX = -1.4;
      lookY = 0.2;
      lookZ = -26.5;
      activeIdx = 2;
    }

    if (onActiveChange) {
      onActiveChange(activeIdx);
    }

    // Smooth cinematic damping
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetX, 0.065);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetY, 0.065);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetZ, 0.065);

    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, lookX, 0.065);
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, lookY, 0.065);
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, lookZ, 0.065);

    state.camera.position.copy(currentPos.current);
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}

export function TimelineScene3D({ progressRef, activeIndex = 0, isMobile = false }) {
  // Coordinates and subtle orientation for exactly the 3 events
  const exhibitsConfig = [
    { pos: [0, 0.2, -4.5], rot: [0, 0, 0] },
    { pos: [1.8, 0.2, -15.5], rot: [0, -0.15, 0] },
    { pos: [-1.4, 0.2, -26.5], rot: [0, 0.12, 0] },
  ];

  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
        className="w-full h-full"
      >
        <PerspectiveCamera makeDefault fov={isMobile ? 50 : 42} near={0.1} far={60} />

        {/* Ambient Gallery Studio Illumination */}
        <ambientLight intensity={0.8} color="#ecebf2" />
        <directionalLight position={[4, 10, 6]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-4, 8, -10]} intensity={1.0} color="#baa9d4" />

        {/* Camera Controller driven by vertical scroll */}
        <TimelineCameraRig
          progressRef={progressRef}
          isMobile={isMobile}
        />

        {/* Polished Dark Gallery Floor */}
        <mesh position={[0, -2.1, -15]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[35, 60]} />
          <meshStandardMaterial color="#0d0d12" roughness={0.35} metalness={0.18} />
        </mesh>

        {/* Connecting Timeline Floor Ribbon */}
        <GalleryGuideline />

        {/* Exactly 3 Physical 3D Exhibition Frames */}
        {threeEvents.map((event, idx) => {
          const isFocused = activeIndex === idx;
          return (
            <Exhibit3DFrame
              key={event.id}
              event={event}
              position={exhibitsConfig[idx].pos}
              rotation={exhibitsConfig[idx].rot}
              focusIntensity={isFocused ? 1 : 0.1}
            />
          );
        })}
      </Canvas>
    </div>
  );
}
