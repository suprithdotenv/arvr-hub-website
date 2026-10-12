import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { MuseumArchitecture } from './MuseumArchitecture';
import { MuseumFrame } from './MuseumFrame';
import { curatedExhibits } from '../../data/curatedExhibits';

const SPACING = 16;

function CameraRig({ progress, onActiveExhibitChange }) {
  const currentPos = useRef(new THREE.Vector3(0, 1.8, 10.2));
  const currentLookAt = useRef(new THREE.Vector3(0, 1.8, 6.0));

  const totalExhibits = curatedExhibits.length;

  useFrame((state, delta) => {
    // Progress spans from 0 (Entrance) to totalExhibits + 1 (Rotunda)
    const stepProgress = progress * (totalExhibits + 1);
    const activeIndex = Math.floor(stepProgress) - 1;
    onActiveExhibitChange(activeIndex);

    let targetX = 0;
    let targetY = 1.8;
    let targetZ = 10.2;

    let lookX = 0;
    let lookY = 1.8;
    let lookZ = 6.0;

    if (stepProgress <= 0.6) {
      // 1. Vestibule Entrance facing the 3D VR Headset
      targetX = 0;
      targetY = 1.8;
      targetZ = 10.2 - stepProgress * 5.2;
      lookX = 0;
      lookY = 1.8;
      lookZ = 6.0 - stepProgress * 6.5;
    } else if (stepProgress >= totalExhibits + 0.3) {
      // 2. Final Rotunda
      const rotundaZ = -(totalExhibits + 1) * SPACING;
      targetX = 0;
      targetY = 1.8;
      targetZ = rotundaZ + 3;
      lookX = 0;
      lookY = 1.2;
      lookZ = rotundaZ - 5;
    } else {
      // 3. Exhibition Hallway Camera Choreography (Only 4 exhibits)
      const idx = Math.min(Math.max(0, Math.round(stepProgress - 1)), totalExhibits - 1);
      const exhibitZ = -(idx + 1) * SPACING;
      const isEven = idx % 2 === 0;

      // Fraction within this exhibit step
      const localT = stepProgress - (idx + 0.5);
      const dwellFactor = Math.max(0, 1 - Math.abs(localT) * 2.2);

      if (isEven) {
        // Left wall exhibit
        targetX = THREE.MathUtils.lerp(0, 1.35, dwellFactor);
        targetY = 1.8;
        targetZ = exhibitZ + 3.4 - localT * 3.8;

        lookX = THREE.MathUtils.lerp(0, -4.8, dwellFactor);
        lookY = 1.9;
        lookZ = THREE.MathUtils.lerp(targetZ - 8, exhibitZ, dwellFactor);
      } else {
        // Right wall exhibit
        targetX = THREE.MathUtils.lerp(0, -1.35, dwellFactor);
        targetY = 1.8;
        targetZ = exhibitZ + 3.4 - localT * 3.8;

        lookX = THREE.MathUtils.lerp(0, 4.8, dwellFactor);
        lookY = 1.9;
        lookZ = THREE.MathUtils.lerp(targetZ - 8, exhibitZ, dwellFactor);
      }
    }

    // Smooth dampening interpolation
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetX, 0.08);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetY, 0.08);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetZ, 0.08);

    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, lookX, 0.08);
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, lookY, 0.08);
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, lookZ, 0.08);

    state.camera.position.copy(currentPos.current);
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}

export function MuseumScene({ progress = 0, onActiveExhibitChange = () => {} }) {
  const activeIndex = useMemo(() => {
    const stepProgress = progress * (curatedExhibits.length + 1);
    return Math.floor(stepProgress) - 1;
  }, [progress]);

  return (
    <div className="fixed inset-0 z-0 bg-[#07070a] select-none pointer-events-none">
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        <PerspectiveCamera makeDefault fov={50} near={0.1} far={140} />

        {/* Global Architectural Lighting */}
        <ambientLight intensity={1.6} color="#f8f7ff" />
        <hemisphereLight intensity={0.9} groundColor="#161420" color="#e9d5ff" />
        <directionalLight position={[0, 16, 0]} intensity={1.8} color="#ffffff" />

        {/* Camera Movement Rig */}
        <CameraRig
          progress={progress}
          onActiveExhibitChange={onActiveExhibitChange}
        />

        {/* Museum Architectural Structure */}
        <MuseumArchitecture
          totalExhibits={curatedExhibits.length}
          spacing={SPACING}
        />

        {/* 4 Flagship Physical Framed Exhibits */}
        {curatedExhibits.map((event, idx) => {
          const zPos = -(idx + 1) * SPACING;
          const isLeftWall = idx % 2 === 0;

          return (
            <MuseumFrame
              key={event.id}
              event={event}
              index={idx}
              position={[isLeftWall ? -5.35 : 5.35, 1.9, zPos]}
              rotation={[0, isLeftWall ? Math.PI / 2 : -Math.PI / 2, 0]}
              isLeftWall={isLeftWall}
              isActive={idx === activeIndex}
            />
          );
        })}
      </Canvas>
    </div>
  );
}
