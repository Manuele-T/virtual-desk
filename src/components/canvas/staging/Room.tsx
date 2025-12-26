import React, { useMemo } from 'react';
import { useStore } from '@/stores/useStore';

const Room: React.FC = () => {
  const setOverview = useStore((state) => state.setOverview);
  const viewMode = useStore((state) => state.viewMode);

  // Generate a checkerboard tile pattern
  const tiles = useMemo(() => {
    const tileArray: { x: number; z: number; dark: boolean }[] = [];
    const tileSize = 1;
    const gridSize = 10; // 10x10 tiles = 20x20 units
    
    for (let i = -gridSize; i < gridSize; i++) {
      for (let j = -gridSize; j < gridSize; j++) {
        tileArray.push({
          x: i * tileSize + tileSize / 2,
          z: j * tileSize + tileSize / 2,
          dark: (i + j) % 2 === 0,
        });
      }
    }
    return tileArray;
  }, []);

  const handleFloorClick = (e: React.PointerEvent) => {
    if (viewMode === 'focus') {
      e.stopPropagation();
      setOverview();
    }
  };

  return (
    <group position={[0, -0.8, 0]}>
      {/* Tiled Floor */}
      {tiles.map((tile, index) => (
        <mesh
          key={index}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[tile.x, -0.05, tile.z]}
          receiveShadow
          onClick={handleFloorClick}
        >
          <planeGeometry args={[0.98, 0.98]} />
          <meshStandardMaterial
            color={tile.dark ? '#1a1a1f' : '#252530'}
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
      ))}
      
      {/* Subtle gap fill (grout lines) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.06, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0a0a0c" roughness={0.9} />
      </mesh>
    </group>
  );
};

export default Room;