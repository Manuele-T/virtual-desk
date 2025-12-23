import React, { useRef } from 'react';
import { Environment } from '@react-three/drei';

const Lights: React.FC = () => {
  return (
    <>
      <Environment preset="city" />
      
      {/* Key Light - Simulating a monitor or window glow from the side/front */}
      <rectAreaLight
        width={2.5}
        height={1.65}
        intensity={65}
        color={'#ffffff'}
        rotation={[-0.1, Math.PI, 0]}
        position={[0, 0.55, -1.15]}
      />

      {/* Subtle Fill */}
      <ambientLight intensity={0.2} />
    </>
  );
};

export default Lights;