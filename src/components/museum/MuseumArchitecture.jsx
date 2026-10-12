import React, { useMemo } from 'react';
import * as THREE from 'three';
import { VRHeadsetModel } from '../3d/VRHeadset3D';

export function MuseumArchitecture({ totalExhibits = 4, spacing = 16 }) {
  const corridorLength = (totalExhibits + 2) * spacing;
  const startZ = 16;
  const endZ = -corridorLength;

  // Architectural materials with visible, realistic tones
  const materials = useMemo(() => {
    return {
      floor: new THREE.MeshStandardMaterial({
        color: '#1a1824', // Polished dark terrazzo floor
        roughness: 0.25,
        metalness: 0.2,
      }),
      floorRunner: new THREE.MeshStandardMaterial({
        color: '#7c3aed', // Glowing violet architectural floor path
        emissive: '#6d28d9',
        emissiveIntensity: 0.7,
        roughness: 0.3,
      }),
      wall: new THREE.MeshStandardMaterial({
        color: '#282535', // Warm architectural plaster wall
        roughness: 0.75,
        metalness: 0.05,
      }),
      pillar: new THREE.MeshStandardMaterial({
        color: '#363246', // Dark concrete columns
        roughness: 0.65,
        metalness: 0.1,
      }),
      ceiling: new THREE.MeshStandardMaterial({
        color: '#181622',
        roughness: 0.9,
      }),
      baseboard: new THREE.MeshStandardMaterial({
        color: '#423d56',
        roughness: 0.3,
        metalness: 0.4,
      }),
      pedestal: new THREE.MeshStandardMaterial({
        color: '#262234',
        roughness: 0.3,
        metalness: 0.3,
      }),
    };
  }, []);

  return (
    <group>
      {/* 1. POLISHED MUSEUM FLOOR */}
      <mesh
        position={[0, 0, (startZ + endZ) / 2]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.floor}
        receiveShadow
      >
        <planeGeometry args={[18, corridorLength + 30]} />
      </mesh>

      {/* 2. GLOWING ARCHITECTURAL RUNNER PATH DOWN CENTER OF FLOOR */}
      <mesh
        position={[0, 0.015, (startZ + endZ) / 2]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.floorRunner}
      >
        <planeGeometry args={[0.35, corridorLength + 30]} />
      </mesh>

      {/* 3. ARCHITECTURAL CEILING */}
      <mesh
        position={[0, 5.4, (startZ + endZ) / 2]}
        rotation={[Math.PI / 2, 0, 0]}
        material={materials.ceiling}
      >
        <planeGeometry args={[18, corridorLength + 30]} />
      </mesh>

      {/* 4. MAIN GALLERY WALLS */}
      {/* Left Wall */}
      <mesh
        position={[-5.6, 2.7, (startZ + endZ) / 2]}
        rotation={[0, Math.PI / 2, 0]}
        material={materials.wall}
        receiveShadow
      >
        <planeGeometry args={[corridorLength + 30, 5.4]} />
      </mesh>

      {/* Right Wall */}
      <mesh
        position={[5.6, 2.7, (startZ + endZ) / 2]}
        rotation={[0, -Math.PI / 2, 0]}
        material={materials.wall}
        receiveShadow
      >
        <planeGeometry args={[corridorLength + 30, 5.4]} />
      </mesh>

      {/* Baseboards */}
      <mesh position={[-5.56, 0.1, (startZ + endZ) / 2]}>
        <boxGeometry args={[0.08, 0.2, corridorLength + 30]} />
        <primitive object={materials.baseboard} attach="material" />
      </mesh>
      <mesh position={[5.56, 0.1, (startZ + endZ) / 2]}>
        <boxGeometry args={[0.08, 0.2, corridorLength + 30]} />
        <primitive object={materials.baseboard} attach="material" />
      </mesh>

      {/* 5. ARCHITECTURAL COLUMNS, BEAMS & CEILING DOWNLIGHTS (Every 16 units) */}
      {Array.from({ length: totalExhibits + 3 }).map((_, idx) => {
        const z = -(idx - 1) * spacing;
        return (
          <group key={idx} position={[0, 0, z]}>
            {/* Left Column */}
            <mesh position={[-5.35, 2.7, 0]} material={materials.pillar}>
              <boxGeometry args={[0.5, 5.4, 0.7]} />
            </mesh>
            {/* Right Column */}
            <mesh position={[5.35, 2.7, 0]} material={materials.pillar}>
              <boxGeometry args={[0.5, 5.4, 0.7]} />
            </mesh>
            {/* Cross Beam */}
            <mesh position={[0, 5.15, 0]} material={materials.pillar}>
              <boxGeometry args={[11.2, 0.5, 0.7]} />
            </mesh>

            {/* Ceiling Gallery Recessed Downlight */}
            <pointLight
              position={[0, 4.8, 0]}
              intensity={20}
              decay={1}
              distance={16}
              color="#f3e8ff"
            />
          </group>
        );
      })}

      {/* 6. VESTIBULE ENTRANCE ALCOVE WITH CENTRAL 3D VR HEADSET HERO MONUMENT */}
      <group position={[0, 0, 6]}>
        {/* Entrance Portal Archway */}
        <mesh position={[0, 2.7, -4]} material={materials.pillar}>
          <boxGeometry args={[11.2, 5.4, 0.6]} />
        </mesh>

        {/* Central Stone Pedestal */}
        <mesh position={[0, 0.65, 0]} material={materials.pedestal}>
          <cylinderGeometry args={[1.0, 1.25, 1.3, 32]} />
        </mesh>

        {/* Illuminated Neon Pedestal Rim */}
        <mesh position={[0, 1.31, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.95, 1.05, 32]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>

        {/* THE MAIN INTERACTIVE 3D VR HEADSET HERO ARTIFACT */}
        <group position={[0, 1.85, 0]} scale={[1.2, 1.2, 1.2]}>
          <VRHeadsetModel pointerPos={{ x: 0, y: 0 }} />
        </group>

        {/* Dedicated High-Power Spotlights on Headset */}
        <spotLight
          position={[0, 5.0, 1.8]}
          target-position={[0, 1.8, 0]}
          intensity={45}
          decay={1}
          distance={12}
          angle={0.65}
          color="#ffffff"
        />
        <pointLight position={[-2.5, 2.5, 1]} intensity={20} decay={1} color="#38bdf8" />
        <pointLight position={[2.5, 2.5, 1]} intensity={22} decay={1} color="#ec4899" />
      </group>

      {/* 7. ROTUNDA / CONCLUDING HALL AT END */}
      <group position={[0, 0, -((totalExhibits + 1) * spacing)]}>
        {/* Rotunda Back Wall */}
        <mesh position={[0, 2.7, -10]} material={materials.pillar}>
          <boxGeometry args={[18, 5.4, 0.8]} />
        </mesh>
        {/* Memorial Plinth */}
        <mesh position={[0, 0.6, -4]} material={materials.pedestal}>
          <boxGeometry args={[3.6, 1.2, 2.0]} />
        </mesh>
        <spotLight
          position={[0, 5.0, -2]}
          target-position={[0, 1.2, -4]}
          intensity={50}
          decay={1}
          distance={16}
          angle={0.7}
          color="#ffedd5"
        />
      </group>
    </group>
  );
}
