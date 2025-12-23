import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Lights from '@/components/canvas/staging/Lights';
import Room from '@/components/canvas/staging/Room';
import Laptop from '@/components/canvas/world/Laptop';
import { useCameraRig } from '@/hooks/useCameraRig';

const SceneContent = () => {
  useCameraRig();
  return (
    <>
      <Lights />
      <Room />
      <Laptop />
    </>
  );
};

const Experience: React.FC = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [3, 2, 4], fov: 45 }}
      dpr={[1, 2]}
    >
      <SceneContent />
      <OrbitControls 
        makeDefault 
        minPolarAngle={0} 
        maxPolarAngle={Math.PI / 2.2} 
        enablePan={false}
        enableZoom={true}
        minDistance={2}
        maxDistance={8}
      />
    </Canvas>
  );
};

export default Experience;