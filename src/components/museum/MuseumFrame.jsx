import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

export function MuseumFrame({
  event,
  index,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  isLeftWall = true,
  isActive = false,
}) {
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loader = new THREE.TextureLoader();
    loader.load(
      event.image,
      (tex) => {
        if (!isMounted) return;
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.generateMipmaps = true;
        setTexture(tex);
      },
      undefined,
      (err) => {
        console.warn('Failed to load museum texture:', event.image, err);
      }
    );
    return () => {
      isMounted = false;
    };
  }, [event.image]);

  // Frame dimensions
  const outerWidth = 4.4;
  const outerHeight = 3.0;
  const frameDepth = 0.16;
  const borderWidth = 0.16;
  const matBorder = 0.1;

  const innerWidth = outerWidth - borderWidth * 2;
  const innerHeight = outerHeight - borderWidth * 2;
  const photoWidth = innerWidth - matBorder * 2;
  const photoHeight = innerHeight - matBorder * 2;

  return (
    <group position={position} rotation={rotation}>
      {/* 1. Dedicated Overhead Museum Gallery Spotlight */}
      <spotLight
        position={[0, 2.8, 2.2]}
        target-position={[0, 0, 0]}
        intensity={isActive ? 25 : 10}
        decay={1}
        distance={14}
        angle={0.7}
        penumbra={0.6}
        color="#fffbf0" // Warm gallery 3200K halogen spotlight
      />

      {/* Subtle Violet Accent Glow from floor rim */}
      <pointLight
        position={[0, -1.8, 1.0]}
        intensity={isActive ? 6 : 2}
        decay={1}
        distance={6}
        color="#8b5cf6"
      />

      {/* 2. Wall Mounting Backing Board */}
      <mesh position={[0, 0, -frameDepth / 2 - 0.02]}>
        <boxGeometry args={[outerWidth + 0.3, outerHeight + 0.3, 0.04]} />
        <meshStandardMaterial color="#22202c" roughness={0.8} />
      </mesh>

      {/* 3. Solid Beveled Outer Frame (Brushed Dark Graphite / Gunmetal) */}
      <mesh position={[0, outerHeight / 2 - borderWidth / 2, 0]}>
        <boxGeometry args={[outerWidth, borderWidth, frameDepth]} />
        <meshStandardMaterial color="#353342" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[0, -outerHeight / 2 + borderWidth / 2, 0]}>
        <boxGeometry args={[outerWidth, borderWidth, frameDepth]} />
        <meshStandardMaterial color="#353342" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[-outerWidth / 2 + borderWidth / 2, 0, 0]}>
        <boxGeometry args={[borderWidth, outerHeight, frameDepth]} />
        <meshStandardMaterial color="#353342" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[outerWidth / 2 - borderWidth / 2, 0, 0]}>
        <boxGeometry args={[borderWidth, outerHeight, frameDepth]} />
        <meshStandardMaterial color="#353342" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* 4. Archival White Museum Passe-Partout Mat */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[innerWidth, innerHeight]} />
        <meshStandardMaterial color="#fafaf8" roughness={0.9} />
      </mesh>

      {/* 5. Authentic Photograph Canvas Surface */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[photoWidth, photoHeight]} />
        {texture ? (
          <meshBasicMaterial map={texture} toneMapped={false} />
        ) : (
          <meshStandardMaterial color="#403c4f" />
        )}
      </mesh>

      {/* 6. Subtle Protective Gallery Glass Reflection */}
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[photoWidth, photoHeight]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.06}
          roughness={0.05}
          reflectivity={0.6}
          clearcoat={1.0}
        />
      </mesh>

      {/* 7. Brass / Metallic Exhibit Plaque Plate under frame */}
      <mesh position={[0, -outerHeight / 2 - 0.24, 0.03]}>
        <boxGeometry args={[1.2, 0.2, 0.02]} />
        <meshStandardMaterial color="#4a4233" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}
