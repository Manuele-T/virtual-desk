import React from 'react';
import { Environment } from '@react-three/drei';

const Lights: React.FC = () => {
  return (
    <>
      <Environment preset="apartment" />
      
      {/* ========== SUNLIGHT THROUGH WINDOW ========== */}
      {/* Main directional sun light - warm golden hour feel */}
      <directionalLight
        position={[2, 6, -8]}
        intensity={2.5}
        color="#fff5e6"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0001}
      />
      
      {/* Secondary fill light from window - softer */}
      <directionalLight
        position={[-1, 4, -6]}
        intensity={0.8}
        color="#ffe4c4"
      />
      
      {/* Volumetric light shaft simulation - spotlight through window */}
      <spotLight
        position={[0, 5, -4]}
        angle={0.5}
        penumbra={0.8}
        intensity={1.5}
        color="#fff8dc"
        target-position={[1, -0.8, 1]}
        castShadow
      />

      {/* Key Light - Simulating monitor glow */}
      <rectAreaLight
        width={2.5}
        height={1.65}
        intensity={45}
        color={'#e0e8ff'}
        rotation={[-0.1, Math.PI, 0]}
        position={[0, 0.55, -1.15]}
      />

      {/* Ambient fill - slightly warm to match sunlight */}
      <ambientLight intensity={0.3} color="#ffeedd" />
      
      {/* Subtle bounce light from floor */}
      <hemisphereLight
        args={['#ffeedd', '#1a1a2e', 0.4]}
      />
    </>
  );
};

export default Lights;