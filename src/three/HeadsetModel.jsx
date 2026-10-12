import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_PATH = '/models/vr-headset.glb';
const ROTATION_SPEED = 0.32; // Calm, museum-grade rotation
const INITIAL_ANGLE = -0.65; // ~-37 degrees: visually appealing three-quarter front view
const STABLE_PITCH = 0.08;   // ~4.5 degrees forward tilt for optimal top & visor presentation

/**
 * Premium 3D VR Headset Exhibition Turntable.
 * Scaled and balanced to complement editorial typography with ample negative space.
 * Features 360° continuous rotation, centered pivot, refined studio PBR shaders,
 * and high-contrast studio illumination.
 */
export function HeadsetModel({ isMobile = false }) {
  const turntableGroupRef = useRef();
  const modelPitchGroupRef = useRef();

  // Accumulate rotation angle purely via delta time for consistent speed
  const turntableAngle = useRef(0);
  const pointerYawOffset = useRef(0);
  const pointerPitchOffset = useRef(0);

  // Check prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Load GLB model
  const { scene } = useGLTF(MODEL_PATH);

  // Clone scene, center geometry, and apply refined studio PBR material
  const clonedScene = useMemo(() => {
    const cloned = scene.clone(true);

    // Deep graphite composite with balanced contrast and clearcoat highlights
    const studioMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#24232c'),
      metalness: 0.28,
      roughness: 0.32,
      clearcoat: 0.48,
      clearcoatRoughness: 0.22,
      reflectivity: 0.7,
      envMapIntensity: 1.0,
    });

    cloned.traverse((child) => {
      if (child.isMesh) {
        if (!child.geometry.attributes.normal) {
          child.geometry.computeVertexNormals();
        }
        // Center geometry around [0, 0, 0] to guarantee pivot is at exact model center
        child.geometry.center();
        child.material = studioMaterial;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return cloned;
  }, [scene]);

  // Soft studio contact shadow texture
  const shadowTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(8, 8, 10, 0.7)');
    gradient.addColorStop(0.45, 'rgba(8, 8, 10, 0.28)');
    gradient.addColorStop(1, 'rgba(8, 8, 10, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  // Turntable animation frame
  useFrame((state, delta) => {
    if (!turntableGroupRef.current || !modelPitchGroupRef.current) return;

    if (reducedMotion) {
      turntableGroupRef.current.rotation.y = INITIAL_ANGLE;
      modelPitchGroupRef.current.rotation.x = STABLE_PITCH;
      return;
    }

    // Advance 360-degree turntable rotation continuously using frame delta time
    turntableAngle.current += delta * ROTATION_SPEED;

    // Subtly blend horizontal pointer influence without disrupting automatic turntable
    const targetYaw = isMobile ? 0 : state.pointer.x * 0.4;
    pointerYawOffset.current = THREE.MathUtils.damp(
      pointerYawOffset.current,
      targetYaw,
      2.5,
      delta
    );

    // Apply continuous 360-degree rotation around model's vertical axis (Y)
    turntableGroupRef.current.rotation.y = INITIAL_ANGLE + turntableAngle.current + pointerYawOffset.current;

    // Stable forward pitch with subtle vertical pointer dampening
    const targetPitch = isMobile ? 0 : -state.pointer.y * 0.08;
    pointerPitchOffset.current = THREE.MathUtils.damp(
      pointerPitchOffset.current,
      targetPitch,
      2.5,
      delta
    );

    modelPitchGroupRef.current.rotation.x = STABLE_PITCH + pointerPitchOffset.current;
  });

  // Displayed size reduced by ~24% to create an elegant, balanced composition
  const modelScale = isMobile ? 1.85 : 2.35;

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Main Continuous Turntable Group (Rotates 360° around Y) */}
      <group ref={turntableGroupRef} position={[0, 0.05, 0]}>
        {/* 2. Stable Pitch Wrapper (Holds stable vertical orientation with zero wobble) */}
        <group ref={modelPitchGroupRef} rotation={[STABLE_PITCH, 0, 0]}>
          <group scale={[modelScale, modelScale, modelScale]}>
            <primitive object={clonedScene} />
          </group>
        </group>
      </group>

      {/* 3. Restrained Exhibition Display Plinth & Contact Shadow */}
      <group position={[0, -0.82, 0]}>
        {/* Soft Radial Contact Shadow */}
        {shadowTexture && (
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
            <planeGeometry args={[2.4, 2.4]} />
            <meshBasicMaterial
              map={shadowTexture}
              transparent
              opacity={0.85}
              depthWrite={false}
            />
          </mesh>
        )}

        {/* Minimalist Exhibition Pedestal Disc */}
        <mesh position={[0, -0.015, 0]}>
          <cylinderGeometry args={[1.02, 1.06, 0.03, 64]} />
          <meshStandardMaterial
            color="#131317"
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>

        {/* Refined Muted Rim Edge */}
        <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.0, 1.03, 64]} />
          <meshBasicMaterial
            color="#282630"
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
