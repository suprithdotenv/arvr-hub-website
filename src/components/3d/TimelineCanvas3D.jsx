import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, PerspectiveCamera, Text } from '@react-three/drei';
import * as THREE from 'three';
import { eventsData } from '../../data/eventsData';

// Individual Floating 3D Holographic Display in Three.js
function HolographicDisplayPlane({ event, index, activeIndex, onSelect }) {
  const meshRef = useRef();
  const frameRef = useRef();
  const isActive = index === activeIndex;

  // Calculate 3D position along a futuristic winding S-curve
  const spacing = 4.2;
  const xPos = (index - activeIndex) * spacing;
  const zPos = -Math.abs(index - activeIndex) * 2.2;
  const yPos = Math.sin(index * 0.8) * 0.5;
  const rotY = -(index - activeIndex) * 0.22;

  // Load texture safely
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(event.image);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [event.image]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    // Smooth lerp to target position
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, xPos, 0.08);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, zPos, 0.08);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, yPos + Math.sin(t * 1.5 + index) * 0.1, 0.08);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, rotY, 0.08);

    // Frame glow pulse
    if (frameRef.current) {
      const glow = isActive ? 1.5 + Math.sin(t * 4) * 0.5 : 0.4;
      frameRef.current.material.emissiveIntensity = glow;
    }
  });

  return (
    <group
      ref={meshRef}
      position={[xPos, yPos, zPos]}
      rotation={[0, rotY, 0]}
      onClick={() => onSelect(index)}
      cursor="pointer"
    >
      {/* 1. Holographic Beveled Outer Frame */}
      <mesh ref={frameRef} position={[0, 0, -0.05]}>
        <boxGeometry args={[3.2, 2.1, 0.08]} />
        <meshStandardMaterial
          color={isActive ? '#a855f7' : '#3b1d6e'}
          emissive={isActive ? '#c084fc' : '#4c1d95'}
          emissiveIntensity={isActive ? 1.2 : 0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* 2. Photograph Display Plane */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[3.0, 1.9]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* 3. Glowing Neon Rim Border */}
      <mesh position={[0, 0, 0.02]}>
        <ringGeometry args={[1.5, 1.55, 4]} />
      </mesh>

      {/* 4. Sci-Fi Floating Pedestal underneath */}
      <mesh position={[0, -1.3, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.5, 12]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#a855f7" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0, -1.55, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 0.1, 24]} />
        <meshStandardMaterial color="#1f0e3d" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 5. 3D Floating Year / Event Number Text */}
      <Text
        position={[0, 1.3, 0.05]}
        fontSize={0.22}
        color={isActive ? '#38bdf8' : '#e2e8f0'}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-g.woff"
      >
        {`${event.year} // ${event.category.toUpperCase()}`}
      </Text>
    </group>
  );
}

// Glowing Curvilinear Timeline Laser Track in 3D Space
function CurvedTimelineTrack({ activeIndex, totalCount }) {
  const lineRef = useRef();

  const points = useMemo(() => {
    const pts = [];
    const spacing = 4.2;
    for (let i = -5; i <= totalCount + 5; i++) {
      const x = (i - activeIndex) * spacing;
      const z = -Math.abs(i - activeIndex) * 2.2 - 0.5;
      const y = -1.6;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, [activeIndex, totalCount]);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(points);
  }, [points]);

  return (
    <group>
      {/* Laser line curve */}
      <mesh>
        <tubeGeometry args={[curve, 120, 0.035, 8, false]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>
      {/* Secondary outer glow tube */}
      <mesh>
        <tubeGeometry args={[curve, 80, 0.08, 8, false]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export function TimelineCanvas3D({ activeIndex, onSelectIndex }) {
  return (
    <div className="relative w-full h-[460px] sm:h-[560px] lg:h-[620px] select-none">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <PerspectiveCamera makeDefault position={[0, 0.2, 6.2]} fov={50} />

        {/* Ambient & Cyber Lights */}
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 8, 5]} intensity={2.5} color="#c084fc" angle={0.6} penumbra={0.8} />
        <pointLight position={[-6, 2, 2]} intensity={2.0} color="#06b6d4" />
        <pointLight position={[6, -2, 2]} intensity={2.5} color="#ec4899" />

        {/* Floating Cyber Dust / Stars */}
        <Sparkles count={120} scale={18} size={2.5} speed={0.4} color="#a855f7" opacity={0.6} />

        {/* Floating 3D Displays along curve */}
        {eventsData.map((event, idx) => (
          <HolographicDisplayPlane
            key={event.id}
            event={event}
            index={idx}
            activeIndex={activeIndex}
            onSelect={onSelectIndex}
          />
        ))}

        {/* Curving 3D Timeline Track */}
        <CurvedTimelineTrack activeIndex={activeIndex} totalCount={eventsData.length} />

        {/* Subtle Cyber Floor Grid */}
        <gridHelper
          args={[40, 40, '#a855f7', '#1f0d3d']}
          position={[0, -2.2, -5]}
          rotation={[0, 0, 0]}
        />
      </Canvas>

      {/* Dynamic 3D Mode Overlay Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-[11px] text-cyan-300 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>Live 3D Spline Navigation</span>
      </div>
    </div>
  );
}
