import React, { useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import Screen from '@/components/dom/Screen';
import { useStore } from '@/stores/useStore';

const Laptop: React.FC = () => {
  const setFocus = useStore((state) => state.setFocus);
  const viewMode = useStore((state) => state.viewMode);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered && viewMode === 'overview' ? 'pointer' : 'auto';
  }, [hovered, viewMode]);

  return (
    <group position={[0, 0, 0]}>
      {/* Laptop Base */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[1.2, 0.05, 0.8]} />
        <meshStandardMaterial color="#222" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Laptop Lid Group */}
      <group position={[0, 0.025, -0.4]} rotation={[Math.PI / 10, 0, 0]}>
        {/* Lid Casing */}
        <mesh position={[0, 0.4, 0]} receiveShadow castShadow>
          <boxGeometry args={[1.2, 0.8, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Screen Area */}
        <group 
          position={[0, 0.4, 0.026]} 
          onClick={(e) => {
            e.stopPropagation();
            if (viewMode === 'overview') setFocus();
          }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          {/* Bezel */}
          <mesh>
            <planeGeometry args={[1.15, 0.75]} />
            <meshBasicMaterial color="black" />
          </mesh>

          {/* HTML Screen */}
          <Html
            transform
            occlude
            position={[0, 0, 0.001]}
            style={{
              width: '800px',
              height: '500px',
              opacity: 1,
            }}
            scale={0.135} 
          >
            <Screen />
          </Html>
        </group>
      </group>
    </group>
  );
};

export default Laptop;