import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Exhibit3DFrame } from './Exhibit3DFrame';
import { VRHeadsetModel } from '../3d/VRHeadset3D';
import { threeEvents } from '../../data/threeEventsData';

// Subtle connecting 3D timeline path
function TimelineConnectingPath() {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -1.2, 4),
      new THREE.Vector3(-0.8, -1.2, -2),
      new THREE.Vector3(-2.4, -1.2, -8),
      new THREE.Vector3(0, -1.2, -15),
      new THREE.Vector3(2.4, -1.2, -22),
      new THREE.Vector3(0, -1.2, -29),
      new THREE.Vector3(-2.4, -1.2, -36),
      new THREE.Vector3(0, -1.2, -43),
    ]);
  }, []);

  return (
    <group>
      {/* Subtle minimalist charcoal tube */}
      <mesh>
        <tubeGeometry args={[curve, 90, 0.03, 8, false]} />
        <meshStandardMaterial color="#353142" roughness={0.6} />
      </mesh>
      {/* Restrained violet center core */}
      <mesh>
        <tubeGeometry args={[curve, 90, 0.012, 8, false]} />
        <meshBasicMaterial color="#8b5cf6" />
      </mesh>
    </group>
  );
}

// Cinematic scroll-driven camera controller
function CameraRig({ progress, onActiveChange }) {
  const currentPos = useRef(new THREE.Vector3(0, 1.2, 8.5));
  const currentLookAt = useRef(new THREE.Vector3(0, 1.2, 4.0));

  useFrame(() => {
    let targetX = 0;
    let targetY = 1.2;
    let targetZ = 8.5;

    let lookX = 0;
    let lookY = 1.2;
    let lookZ = 4.0;

    let activeIdx = -1;

    if (progress < 0.12) {
      // 0. Intro Hero
      targetX = 0;
      targetY = 1.2;
      targetZ = 8.5 - progress * 10;
      lookX = 0;
      lookY = 1.2;
      lookZ = 4.0;
      activeIdx = -1;
    } else if (progress < 0.40) {
      // 1. Exhibit 1 (Left wall: [-2.4, 0.4, -8])
      const t = (progress - 0.12) / (0.40 - 0.12); // 0 to 1
      const dwell = Math.sin(t * Math.PI); // Peak dwell in center

      targetX = THREE.MathUtils.lerp(0, 1.4, dwell);
      targetY = 0.4;
      targetZ = THREE.MathUtils.lerp(0.5, -4.5, t);

      lookX = THREE.MathUtils.lerp(0, -2.4, dwell);
      lookY = 0.4;
      lookZ = THREE.MathUtils.lerp(-8, -8, t);
      activeIdx = 0;
    } else if (progress < 0.68) {
      // 2. Exhibit 2 (Right wall: [2.4, 0.4, -22])
      const t = (progress - 0.40) / (0.68 - 0.40);
      const dwell = Math.sin(t * Math.PI);

      targetX = THREE.MathUtils.lerp(0, -1.4, dwell);
      targetY = 0.4;
      targetZ = THREE.MathUtils.lerp(-11, -18.5, t);

      lookX = THREE.MathUtils.lerp(0, 2.4, dwell);
      lookY = 0.4;
      lookZ = THREE.MathUtils.lerp(-22, -22, t);
      activeIdx = 1;
    } else if (progress < 0.90) {
      // 3. Exhibit 3 (Left wall: [-2.4, 0.4, -36])
      const t = (progress - 0.68) / (0.90 - 0.68);
      const dwell = Math.sin(t * Math.PI);

      targetX = THREE.MathUtils.lerp(0, 1.4, dwell);
      targetY = 0.4;
      targetZ = THREE.MathUtils.lerp(-25, -32.5, t);

      lookX = THREE.MathUtils.lerp(0, -2.4, dwell);
      lookY = 0.4;
      lookZ = THREE.MathUtils.lerp(-36, -36, t);
      activeIdx = 2;
    } else {
      // 4. Outro / Conclusion
      const t = (progress - 0.90) / 0.10;
      targetX = 0;
      targetY = 0.8;
      targetZ = THREE.MathUtils.lerp(-37, -42, t);

      lookX = 0;
      lookY = 0.8;
      lookZ = -46;
      activeIdx = 3;
    }

    onActiveChange(activeIdx);

    // Smooth dampening
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetX, 0.07);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetY, 0.07);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetZ, 0.07);

    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, lookX, 0.07);
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, lookY, 0.07);
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, lookZ, 0.07);

    state.camera.position.copy(currentPos.current);
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}

export function CinematicScene({ progress = 0, onActiveChange = () => {} }) {
  // 3 Exhibit frame positions
  const exhibitsConfig = [
    { pos: [-2.4, 0.4, -8], rot: [0, 0.14, 0] },
    { pos: [2.4, 0.4, -22], rot: [0, -0.14, 0] },
    { pos: [-2.4, 0.4, -36], rot: [0, 0.12, 0] },
  ];

  const activeIdx = useMemo(() => {
    if (progress < 0.12) return -1;
    if (progress < 0.40) return 0;
    if (progress < 0.68) return 1;
    if (progress < 0.90) return 2;
    return 3;
  }, [progress]);

  return (
    <div className="fixed inset-0 z-0 bg-[#0c0c10] select-none pointer-events-none">
      <Canvas
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <PerspectiveCamera makeDefault fov={45} near={0.1} far={90} />

        {/* Tasteful, Soft Gallery Lighting */}
        <ambientLight intensity={1.2} color="#f4f4fa" />
        <directionalLight position={[4, 12, 6]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-4, 4, -10]} intensity={6} distance={20} color="#7c3aed" />
        <pointLight position={[4, 4, -25]} intensity={6} distance={20} color="#8b5cf6" />

        {/* Camera Movement Rig */}
        <CameraRig progress={progress} onActiveChange={onActiveChange} />

        {/* Polished Dark Ground Plane */}
        <mesh position={[0, -1.8, -20]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[30, 80]} />
          <meshStandardMaterial color="#111116" roughness={0.35} metalness={0.15} />
        </mesh>

        {/* Intro Artifact: 3D VR Headset on Minimalist Plinth */}
        <group position={[0, 0.2, 4.0]}>
          <mesh position={[0, -0.85, 0]}>
            <cylinderGeometry args={[0.85, 0.95, 1.1, 32]} />
            <meshStandardMaterial color="#1b1a24" roughness={0.4} metalness={0.2} />
          </mesh>
          <mesh position={[0, -0.28, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.8, 0.86, 32]} />
            <meshBasicMaterial color="#8b5cf6" />
          </mesh>
          <group position={[0, 0.4, 0]} scale={[0.9, 0.9, 0.9]}>
            <VRHeadsetModel pointerPos={{ x: 0, y: 0 }} />
          </group>
          <spotLight
            position={[0, 4.0, 1.5]}
            target-position={[0, 0.4, 0]}
            intensity={30}
            distance={8}
            angle={0.6}
            color="#ffffff"
          />
        </group>

        {/* Subtle 3D Connecting Path */}
        <TimelineConnectingPath />

        {/* Exactly 3 Physical 3D Exhibition Frames */}
        {threeEvents.map((event, idx) => (
          <Exhibit3DFrame
            key={event.id}
            event={event}
            position={exhibitsConfig[idx].pos}
            rotation={exhibitsConfig[idx].rot}
            isActive={activeIdx === idx}
          />
        ))}

        {/* Outro Plinth at End */}
        <group position={[0, -0.8, -44]}>
          <mesh>
            <boxGeometry args={[3.2, 1.2, 1.6]} />
            <meshStandardMaterial color="#1b1a24" roughness={0.5} />
          </mesh>
        </group>
      </Canvas>
    </div>
  );
}
