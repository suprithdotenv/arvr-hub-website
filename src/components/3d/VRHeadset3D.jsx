import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * A detailed, recognizable 3D VR Headset model created with procedural geometry,
 * PBR materials, sensor lenses, headstraps, audio arms, and glowing indicators.
 */
export function VRHeadsetModel({ isHovered = false, pointerPos = { x: 0, y: 0 }, exploded = false }) {
  const groupRef = useRef();
  const innerRef = useRef();
  const ledRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  // Pre-configured materials for high visual fidelity
  const materials = useMemo(() => {
    return {
      bodyWhite: new THREE.MeshStandardMaterial({
        color: '#f8fafc',
        roughness: 0.28,
        metalness: 0.12,
      }),
      bodyDark: new THREE.MeshStandardMaterial({
        color: '#0f0a1c',
        roughness: 0.45,
        metalness: 0.2,
      }),
      visorGlass: new THREE.MeshPhysicalMaterial({
        color: '#090514',
        roughness: 0.1,
        metalness: 0.85,
        reflectivity: 0.9,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
      }),
      sensorBezel: new THREE.MeshStandardMaterial({
        color: '#2d1b4e',
        metalness: 0.8,
        roughness: 0.3,
      }),
      sensorLens: new THREE.MeshPhysicalMaterial({
        color: '#00f2fe',
        roughness: 0.05,
        metalness: 0.9,
        transmission: 0.3,
        ior: 1.5,
      }),
      internalLens: new THREE.MeshPhysicalMaterial({
        color: '#8b5cf6',
        emissive: '#4c1d95',
        emissiveIntensity: 0.6,
        roughness: 0.1,
        metalness: 0.5,
        clearcoat: 1,
      }),
      strapFabric: new THREE.MeshStandardMaterial({
        color: '#e2e8f0',
        roughness: 0.8,
        metalness: 0.05,
      }),
      cushionFoam: new THREE.MeshStandardMaterial({
        color: '#18181b',
        roughness: 0.95,
        metalness: 0.0,
      }),
      neonPurple: new THREE.MeshBasicMaterial({
        color: '#a855f7',
        transparent: true,
        opacity: 0.85,
      }),
      neonMagenta: new THREE.MeshBasicMaterial({
        color: '#ec4899',
        transparent: true,
        opacity: 0.7,
      }),
      accentChrome: new THREE.MeshStandardMaterial({
        color: '#ffffff',
        metalness: 0.95,
        roughness: 0.15,
      }),
      glowLed: new THREE.MeshStandardMaterial({
        color: '#38bdf8',
        emissive: '#38bdf8',
        emissiveIntensity: 2.0,
        toneMapped: false,
      }),
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Subtle floating bob
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.08;

    // Smooth baseline auto-rotation blended with pointer parallax
    const targetRotY = t * 0.45 + (pointerPos.x * 0.65);
    const targetRotX = (pointerPos.y * 0.35) + (Math.sin(t * 0.8) * 0.05);

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);

    // Subtle pulsing LED
    if (ledRef.current) {
      const pulse = 1.5 + Math.sin(t * 3.5) * 0.8;
      ledRef.current.material.emissiveIntensity = pulse;
    }

    // Holographic rings rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.3;
      ring1Ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.25;
      ring2Ref.current.rotation.y = Math.cos(t * 0.4) * 0.15;
    }
  });

  const explodeOffset = exploded ? 0.4 : 0.0;

  return (
    <group ref={groupRef} scale={[1.15, 1.15, 1.15]}>
      {/* ========================================================
          1. MAIN HEADSET CHASSIS (Rounded Front Body & Bevel)
          ======================================================== */}
      <group position={[0, 0, explodeOffset * 0.2]}>
        {/* Front White Casing */}
        <mesh material={materials.bodyWhite} position={[0, 0, 0.2]}>
          <boxGeometry args={[1.7, 0.95, 0.9, 10, 10, 10]} />
        </mesh>

        {/* Visor Front Faceplate (Sleek dark curved visor plate) */}
        <mesh material={materials.visorGlass} position={[0, 0, 0.66]}>
          <boxGeometry args={[1.62, 0.88, 0.08, 8, 8, 4]} />
        </mesh>

        {/* Brand Accent Trim Line across top of visor */}
        <mesh material={materials.neonPurple} position={[0, 0.42, 0.67]}>
          <boxGeometry args={[1.5, 0.02, 0.02]} />
        </mesh>

        {/* Power / Status Breathing LED */}
        <mesh ref={ledRef} material={materials.glowLed} position={[0.65, 0.32, 0.68]}>
          <sphereGeometry args={[0.025, 16, 16]} />
        </mesh>

        {/* ========================================================
            2. OPTICAL TRACKING SENSORS (4-Corner Passthrough Cameras)
            ======================================================== */}
        {[
          { pos: [-0.68, 0.32, 0.67] }, // Top-Left
          { pos: [0.68, 0.32, 0.67] },  // Top-Right (near LED)
          { pos: [-0.68, -0.32, 0.67] },// Bottom-Left
          { pos: [0.68, -0.32, 0.67] }, // Bottom-Right
        ].map((sensor, idx) => (
          <group key={idx} position={sensor.pos}>
            {/* Bezel Ring */}
            <mesh material={materials.sensorBezel} rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.065, 0.065, 0.04, 24]} rotation={[Math.PI / 2, 0, 0]} />
            </mesh>
            {/* Sensor Glass Lens */}
            <mesh material={materials.sensorLens} position={[0, 0, 0.025]}>
              <sphereGeometry args={[0.048, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            </mesh>
          </group>
        ))}

        {/* Center Stereo Depth Sensor Bar */}
        <mesh material={materials.bodyDark} position={[0, -0.32, 0.67]}>
          <capsuleGeometry args={[0.035, 0.22, 10, 16]} rotation={[0, 0, Math.PI / 2]} />
        </mesh>
      </group>

      {/* ========================================================
          3. FACIAL INTERFACE & CUSHION (Dark foam ergonomic gasket)
          ======================================================== */}
      <group position={[0, 0, -0.32 - explodeOffset * 0.3]}>
        <mesh material={materials.cushionFoam}>
          <torusGeometry args={[0.72, 0.18, 16, 32]} />
        </mesh>
        {/* Nose bridge recess block */}
        <mesh material={materials.bodyDark} position={[0, -0.38, 0.05]}>
          <boxGeometry args={[0.3, 0.2, 0.2]} />
        </mesh>
      </group>

      {/* ========================================================
          4. INTERNAL OPTICAL LENSES (Dual Fresnel Eyepieces)
          ======================================================== */}
      <group position={[0, 0, -0.15 - explodeOffset * 0.15]}>
        {/* Left Eye Lens */}
        <mesh material={materials.internalLens} position={[-0.34, 0.02, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.08, 32]} rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
        {/* Left Lens Bezel Ring */}
        <mesh material={materials.bodyDark} position={[-0.34, 0.02, -0.02]}>
          <torusGeometry args={[0.27, 0.025, 12, 32]} />
        </mesh>

        {/* Right Eye Lens */}
        <mesh material={materials.internalLens} position={[0.34, 0.02, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.08, 32]} rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
        {/* Right Lens Bezel Ring */}
        <mesh material={materials.bodyDark} position={[0.34, 0.02, -0.02]}>
          <torusGeometry args={[0.27, 0.025, 12, 32]} />
        </mesh>
      </group>

      {/* ========================================================
          5. SIDE RIGID AUDIO ARMS & PIVOT JOINTS
          ======================================================== */}
      {/* Left Pivot & Arm */}
      <group position={[-0.86 - explodeOffset * 0.2, 0, 0]}>
        {/* Hinge Disc */}
        <mesh material={materials.accentChrome} position={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.11, 0.11, 0.05, 24]} rotation={[0, 0, Math.PI / 2]} />
        </mesh>
        {/* Rigid Arm */}
        <mesh material={materials.bodyWhite} position={[-0.02, 0, -0.5]}>
          <boxGeometry args={[0.07, 0.16, 1.2]} />
        </mesh>
        {/* Spatial Audio Speaker Grille */}
        <mesh material={materials.bodyDark} position={[-0.045, 0, -0.3]}>
          <capsuleGeometry args={[0.02, 0.14, 8, 12]} rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
        {/* USB-C Port */}
        <mesh material={materials.bodyDark} position={[-0.05, -0.03, -0.7]}>
          <boxGeometry args={[0.02, 0.03, 0.08]} />
        </mesh>
      </group>

      {/* Right Pivot & Arm */}
      <group position={[0.86 + explodeOffset * 0.2, 0, 0]}>
        {/* Hinge Disc */}
        <mesh material={materials.accentChrome} position={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.11, 0.11, 0.05, 24]} rotation={[0, 0, Math.PI / 2]} />
        </mesh>
        {/* Rigid Arm */}
        <mesh material={materials.bodyWhite} position={[0.02, 0, -0.5]}>
          <boxGeometry args={[0.07, 0.16, 1.2]} />
        </mesh>
        {/* Spatial Audio Speaker Grille */}
        <mesh material={materials.bodyDark} position={[0.045, 0, -0.3]}>
          <capsuleGeometry args={[0.02, 0.14, 8, 12]} rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
      </group>

      {/* ========================================================
          6. HEAD STRAP ASSEMBLY (Flexible Top & Rear Tension Pad)
          ======================================================== */}
      {/* Top Ergonomic Crown Strap */}
      <group position={[0, 0.58 + explodeOffset * 0.2, -0.4]}>
        <mesh material={materials.strapFabric} rotation={[Math.PI / 6, 0, 0]}>
          <boxGeometry args={[0.26, 0.03, 1.35]} />
        </mesh>
      </group>

      {/* Rear Ergonomic Tension Dial & Cushion */}
      <group position={[0, 0, -1.15 - explodeOffset * 0.4]}>
        {/* Rear Head Support Cup */}
        <mesh material={materials.bodyWhite}>
          <boxGeometry args={[0.92, 0.32, 0.08]} />
        </mesh>
        {/* Rear Inner Cushion */}
        <mesh material={materials.cushionFoam} position={[0, 0, 0.04]}>
          <boxGeometry args={[0.86, 0.26, 0.04]} />
        </mesh>
        {/* Fit Dial Knob */}
        <mesh material={materials.accentChrome} position={[0, 0, -0.06]}>
          <cylinderGeometry args={[0.13, 0.13, 0.05, 32]} rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
        {/* Neon Dial Accent Ring */}
        <mesh material={materials.neonMagenta} position={[0, 0, -0.09]}>
          <torusGeometry args={[0.09, 0.015, 8, 24]} />
        </mesh>
      </group>

      {/* ========================================================
          7. HOLOGRAPHIC SURROUNDING RINGS & GLOW ELEMENTS
          ======================================================== */}
      {/* Ring 1 - Purple orbital ring */}
      <mesh ref={ring1Ref} position={[0, 0, 0]}>
        <torusGeometry args={[1.85, 0.015, 16, 80]} />
        <primitive object={materials.neonPurple} attach="material" />
      </mesh>

      {/* Ring 2 - Magenta tilted ring */}
      <mesh ref={ring2Ref} position={[0, 0, 0]}>
        <torusGeometry args={[1.6, 0.012, 16, 70]} />
        <primitive object={materials.neonMagenta} attach="material" />
      </mesh>

      {/* Ambient Pedestal Light Disc underneath */}
      <mesh position={[0, -1.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.4, 32]} />
        <meshStandardMaterial
          color="#3b0764"
          emissive="#6b21a8"
          emissiveIntensity={0.8}
          roughness={0.4}
        />
      </mesh>

      {/* Glowing Pedestal Outer Ring */}
      <mesh position={[0, -1.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.35, 1.42, 48]} />
        <primitive object={materials.neonPurple} attach="material" />
      </mesh>
    </group>
  );
}
