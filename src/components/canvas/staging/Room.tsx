import React from 'react';
import { useStore } from '@/stores/useStore';

const Room: React.FC = () => {
  const setOverview = useStore((state) => state.setOverview);
  const viewMode = useStore((state) => state.viewMode);

  return (
    <group position={[0, -0.8, 0]}>
      {/* Floor */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]} 
        receiveShadow
        onClick={(e) => {
          // Only zoom out if we are currently focused
          if (viewMode === 'focus') {
            e.stopPropagation();
            setOverview();
          }
        }}
      >
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