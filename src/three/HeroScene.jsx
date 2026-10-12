import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { SceneLighting } from './SceneLighting';
import { HeadsetModel } from './HeadsetModel';
import { CameraRig } from './CameraRig';

/**
 * Minimalist, elegant loading indicator inside WebGL canvas.
 */
function Model3DFallback() {
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 1.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.7, 0.73, 48]} />
        <meshBasicMaterial color="#9c9ca1" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/**
 * Hero 3D Scene container.
 * Studio-lit, clean canvas showcasing the 360-degree exhibition turntable.
 */
export function HeroScene() {
  const [isMobile, setIsMobile] = useState(false);
  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (webglError) {
    return (
      <div className="w-full h-full flex items-center justify-center p-6 text-center text-slate-400">
        <div className="p-6 rounded-2xl max-w-sm border border-white/10 bg-[#121216]">
          <p className="text-sm font-editorial text-[#e5e5dc]">Interactive 3D Exhibition</p>
          <p className="text-xs text-[#8a8a92] mt-2">
            WebGL acceleration running in static studio mode.
          </p>
        </div>
      </div>
    );
  }

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
        onError={() => setWebglError(true)}
        className="w-full h-full"
      >
        <PerspectiveCamera makeDefault fov={isMobile ? 46 : 38} near={0.1} far={40} position={[0, 0, isMobile ? 5.0 : 4.2]} />

        {/* Studio Gallery Lighting */}
        <SceneLighting />

        {/* Stable Camera Controller */}
        <CameraRig isMobile={isMobile} />

        {/* 360° Continuous Turntable Headset */}
        <Suspense fallback={<Model3DFallback />}>
          <HeadsetModel isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
