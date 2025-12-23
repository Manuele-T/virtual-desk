import React from 'react';

const Room: React.FC = () => {
  return (
    <group position={[0, -0.05, 0]}>
      {/* Desk Surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial 
            color="#0a0a0a" 
            roughness={0.15} 
            metalness={0.5} 
        />
      </mesh>
    </group>
  );
};

export default Room;