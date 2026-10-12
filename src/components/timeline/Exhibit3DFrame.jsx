import React, { useState, useEffect } from 'react';
import * as THREE from 'three';

/**
 * Physical 3D Exhibition Frame for authentic event photographs.
 * Features beveled dark graphite outer frame, archival passe-partout mat,
 * protective museum glass sheen, brass identification plate, and dedicated gallery spotlight.
 */
export function Exhibit3DFrame({
  event,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  focusIntensity = 0, // 0 to 1
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
      (err) => console.warn('Texture load fallback for:', event.image, err)
    );
    return () => {
      active = false;
    };
  }, [event.image]);

  // Frame proportions (proportional width & height)
  const outerW = 4.2;
  const outerH = 2.85;
  const depth = 0.12;
  const border = 0.12;
  const matBorder = 0.08;

  const innerW = outerW - border * 2;
  const innerH = outerH - border * 2;
  const photoW = innerW - matBorder * 2;
  const photoH = innerH - matBorder * 2;

  // Spotlight intensity scales with focus
  const spotIntensity = 6 + focusIntensity * 22;

  return (
    <group position={position} rotation={rotation}>
      {/* 1. Dedicated Gallery Spotlight */}
      <spotLight
        position={[0, 3.2, 2.4]}
        target-position={[0, 0, 0]}
        intensity={spotIntensity}
        distance={12}
        angle={0.65}
        penumbra={0.6}
        color="#fffbf2" // 3200K gallery halogen
      />

      {/* Subtle floor / edge violet accent */}
      <pointLight
        position={[0, -2.0, 0.8]}
        intensity={1 + focusIntensity * 3}
        distance={6}
        color="#9d85b5"
      />

      {/* 2. Outer Beveled Frame Bars (Dark graphite / charcoal) */}
      {/* Top Bar */}
      <mesh position={[0, outerH / 2 - border / 2, 0]}>
        <boxGeometry args={[outerW, border, depth]} />
        <meshStandardMaterial color="#1a1920" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Bottom Bar */}
      <mesh position={[0, -outerH / 2 + border / 2, 0]}>
        <boxGeometry args={[outerW, border, depth]} />
        <meshStandardMaterial color="#1a1920" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Left Bar */}
      <mesh position={[-outerW / 2 + border / 2, 0, 0]}>
        <boxGeometry args={[border, outerH, depth]} />
        <meshStandardMaterial color="#1a1920" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Right Bar */}
      <mesh position={[outerW / 2 - border / 2, 0, 0]}>
        <boxGeometry args={[border, outerH, depth]} />
        <meshStandardMaterial color="#1a1920" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* 3. Archival Passe-Partout Mat */}
      <mesh position={[0, 0, -0.005]}>
        <planeGeometry args={[innerW, innerH]} />
        <meshStandardMaterial color="#f7f7f4" roughness={0.92} />
      </mesh>

      {/* 4. Photographic Artwork Surface */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[photoW, photoH]} />
        {texture ? (
          <meshBasicMaterial map={texture} toneMapped={false} />
        ) : (
          <meshStandardMaterial color="#2a2933" roughness={0.8} />
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
          reflectivity={0.6}
          clearcoat={1.0}
        />
      </mesh>

      {/* 6. Minimalist Dark Architectural Pedestal Base */}
      <mesh position={[0, -outerH / 2 - 0.65, 0]}>
        <boxGeometry args={[1.5, 1.1, 0.45]} />
        <meshStandardMaterial color="#121217" roughness={0.65} metalness={0.2} />
      </mesh>

      {/* 7. Brass Placard identifying the exhibit */}
      <mesh position={[0, -outerH / 2 - 0.16, 0.035]}>
        <boxGeometry args={[1.2, 0.16, 0.02]} />
        <meshStandardMaterial color="#423b2e" metalness={0.75} roughness={0.35} />
      </mesh>
    </group>
  );
}
