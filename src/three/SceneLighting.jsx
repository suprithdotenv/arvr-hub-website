import React from 'react';

/**
 * Museum studio lighting setup tailored for a balanced product exhibition.
 * Delivers crisp edge separation, volumetric contrast, and smooth highlights
 * across all 360 degrees of rotation.
 */
export function SceneLighting() {
  return (
    <group>
      {/* Balanced ambient fill preventing dark shadow clipping */}
      <ambientLight intensity={1.1} color="#ebe9f2" />

      {/* Primary Key Light: warm studio key revealing front & upper contours */}
      <directionalLight
        position={[3.5, 4.5, 3.5]}
        intensity={2.6}
        color="#fffbf5"
        castShadow={false}
      />

      {/* Fill Light: soft neutral fill revealing side details */}
      <directionalLight
        position={[-3.5, 3.0, 3.0]}
        intensity={1.4}
        color="#e8e7f0"
      />

      {/* Primary Rim Light: delicate antique-lavender edge halo along top & back straps */}
      <directionalLight
        position={[0, 4.5, -3.5]}
        intensity={2.4}
        color="#d4c7e8"
      />

      {/* Cross Rim Kicker: separates side audio arms and straps as model turns away */}
      <directionalLight
        position={[-3.5, -0.5, -2.5]}
        intensity={1.3}
        color="#baa9d4"
      />

      {/* Subtle floor bounce */}
      <directionalLight
        position={[0, -2.5, 1]}
        intensity={0.4}
        color="#2c2738"
      />
    </group>
  );
}
