import React, { useState, useEffect } from 'react';
import * as THREE from 'three';

/**
 * Reusable physical 3D photographic exhibition frame.
 * Features real geometry, beveled frame depth, archival mat,
 * photograph texture, and dedicated warm gallery spot lighting.
 */
export function Exhibit3DFrame({
  event,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  isActive = false,
}) {
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    let active = true;
    const loader = new THREE.TextureLoader();
    loader.load(
      event.image,
      (tex) => {
        if (!active) return;
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.generateMipmaps = true;
        setTexture(tex);
      },
      undefined,
      (err) => console.warn('Texture load warning:', event.image, err)
    );
    return () => {
      active = false;
      if (texture) texture.dispose();
    };
  }, [event.image]);

  // Frame geometry proportions (width: 4.0, height: 2.7, depth: 0.12)
  const outerW = 4.2;
  const outerH = 2.8;
  const depth = 0.14;
  const border = 0.14;
  const matBorder = 0.08;

  const innerW = outerW - border * 2;
  const innerH = outerH - border * 2;
  const photoW = innerW - matBorder * 2;
  const photoH = innerH - matBorder * 2;

  return (
    <group position={position} rotation={rotation}>
      {/* 1. Dedicated Gallery Spotlight */}
      <spotLight
        position={[0, 2.5, 2.0]}
        target-position={[0, 0, 0]}
        intensity={isActive ? 22 : 8}
        distance={10}
        angle={0.65}
        penumbra={0.6}
        color="#fffbf2" // 3200K gallery halogen
      />

      {/* Subtle floor violet accent */}
      <pointLight
        position={[0, -1.8, 0.8]}
        intensity={isActive ? 4 : 1}
        distance={5}
        color="#8b5cf6"
      />

      {/* 2. Outer Beveled Frame Bars (Dark graphite/charcoal) */}
      {/* Top */}
      <mesh position={[0, outerH / 2 - border / 2, 0]}>
        <boxGeometry args={[outerW, border, depth]} />
        <meshStandardMaterial color="#222129" roughness={0.5} metalness={0.4} />
      </mesh>
      {/* Bottom */}
      <mesh position={[0, -outerH / 2 + border / 2, 0]}>
        <boxGeometry args={[outerW, border, depth]} />
        <meshStandardMaterial color="#222129" roughness={0.5} metalness={0.4} />
      </mesh>
      {/* Left */}
      <mesh position={[-outerW / 2 + border / 2, 0, 0]}>
        <boxGeometry args={[border, outerH, depth]} />
        <meshStandardMaterial color="#222129" roughness={0.5} metalness={0.4} />
      </mesh>
      {/* Right */}
      <mesh position={[outerW / 2 - border / 2, 0, 0]}>
        <boxGeometry args={[border, outerH, depth]} />
        <meshStandardMaterial color="#222129" roughness={0.5} metalness={0.4} />
      </mesh>

      {/* 3. Archival Passe-Partout Mat */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[innerW, innerH]} />
        <meshStandardMaterial color="#f8f8f5" roughness={0.95} />
      </mesh>

      {/* 4. Photographic Artwork Surface */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[photoW, photoH]} />
        {texture ? (
          <meshBasicMaterial map={texture} toneMapped={false} />
        ) : (
          <meshStandardMaterial color="#302d3a" roughness={0.8} />
        )}
      </mesh>

      {/* 5. Protective Museum Glass Sheen */}
      <mesh position={[0, 0, 0.025]}>
        <planeGeometry args={[photoW, photoH]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.06}
          roughness={0.05}
          reflectivity={0.5}
          clearcoat={1.0}
        />
      </mesh>

      {/* 6. Minimalist Dark Architectural Pedestal / Plinth Beneath */}
      <mesh position={[0, -outerH / 2 - 0.7, 0]}>
        <boxGeometry args={[1.6, 1.2, 0.5]} />
        <meshStandardMaterial color="#191822" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* 7. Brass Plaque under frame */}
      <mesh position={[0, -outerH / 2 - 0.18, 0.03]}>
        <boxGeometry args={[0.9, 0.14, 0.015]} />
        <meshStandardMaterial color="#3d372c" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}
