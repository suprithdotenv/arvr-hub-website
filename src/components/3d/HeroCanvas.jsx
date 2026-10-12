import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, PerspectiveCamera } from '@react-three/drei';
import { VRHeadsetModel } from './VRHeadset3D';
import { Eye, RotateCw, Layers, Sparkles as SparklesIcon } from 'lucide-react';

export function HeroCanvas() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [exploded, setExploded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  // Parallax pointer tracking
  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setPointer({ x, y });
  };

  return (
    <div
      className="relative w-full h-[550px] md:h-[650px] lg:h-[700px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      onPointerMove={handlePointerMove}
    >
      {/* 3D Canvas */}
      <Canvas
        className="w-full h-full"
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0.2, 4.4]} fov={45} />

        {/* Ambient & Key Lighting */}
        <ambientLight intensity={0.4} />
        
        {/* Key Spotlight (Cyan/White highlight) */}
        <spotLight
          position={[4, 5, 4]}
          angle={0.45}
          penumbra={0.9}
          intensity={2.2}
          color="#e0f2fe"
          castShadow
        />

        {/* Violet Fill Light from left */}
        <pointLight position={[-4, 2, -1]} intensity={2.0} color="#a855f7" />

        {/* Neon Magenta Rim Light from back */}
        <pointLight position={[0, -2, -3]} intensity={3.0} color="#ec4899" />

        {/* Subtle Spatial Dust / Cyber Stars */}
        <Sparkles
          count={70}
          scale={6}
          size={2.2}
          speed={0.4}
          color="#c084fc"
          opacity={0.65}
        />

        <Suspense fallback={null}>
          <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.3}>
            <VRHeadsetModel pointerPos={pointer} exploded={exploded} />
          </Float>
        </Suspense>

        {/* Intuitive Orbit Controls for direct drag-to-inspect */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={0.8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>

      {/* Floating 3D Interaction Badges & Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 backdrop-blur-md text-xs text-purple-200 shadow-lg">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all ${
            autoRotate ? 'bg-purple-600/40 text-white border border-purple-400/30' : 'text-purple-300 hover:text-white'
          }`}
          title="Toggle rotation"
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span>{autoRotate ? 'Rotating' : 'Paused'}</span>
        </button>

        <span className="w-px h-3 bg-purple-500/30" />

        <button
          onClick={() => setExploded(!exploded)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all ${
            exploded ? 'bg-pink-600/50 text-white border border-pink-400/40' : 'text-purple-300 hover:text-white'
          }`}
          title="Toggle Exploded Components View"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{exploded ? 'Assembled' : 'Explode Parts'}</span>
        </button>

        <span className="hidden sm:inline w-px h-3 bg-purple-500/30" />

        <span className="hidden sm:flex items-center gap-1 text-[11px] text-purple-300/70 pl-1">
          <Eye className="w-3 h-3 text-cyan-400" /> Drag to rotate 360°
        </span>
      </div>
    </div>
  );
}
