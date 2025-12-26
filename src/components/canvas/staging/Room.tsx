import React, { useMemo } from 'react';
import { useStore } from '@/stores/useStore';

// Wall configuration
const WALL_HEIGHT = 4;
const WALL_THICKNESS = 0.1;
const ROOM_SIZE = 8;
const WALL_COLOR = '#e8e4df'; // Warm off-white
const BASEBOARD_HEIGHT = 0.15;
const BASEBOARD_COLOR = '#2a2a2a';

// Window configuration
const WINDOW_WIDTH = 2.5;
const WINDOW_HEIGHT = 2;
const WINDOW_Y = 1.5; // Height from floor
const WINDOW_FRAME_THICKNESS = 0.08;
const WINDOW_FRAME_COLOR = '#1a1a1a';

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

      {/* ========== BACK WALL (with window cutout effect) ========== */}
      <group position={[0, 0, -ROOM_SIZE / 2]}>
        {/* Wall section LEFT of window */}
        <mesh position={[-(WINDOW_WIDTH / 2 + (ROOM_SIZE / 2 - WINDOW_WIDTH / 2) / 2), WALL_HEIGHT / 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[(ROOM_SIZE / 2 - WINDOW_WIDTH / 2), WALL_HEIGHT, WALL_THICKNESS]} />
          <meshStandardMaterial color={WALL_COLOR} roughness={0.9} />
        </mesh>
        
        {/* Wall section RIGHT of window */}
        <mesh position={[(WINDOW_WIDTH / 2 + (ROOM_SIZE / 2 - WINDOW_WIDTH / 2) / 2), WALL_HEIGHT / 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[(ROOM_SIZE / 2 - WINDOW_WIDTH / 2), WALL_HEIGHT, WALL_THICKNESS]} />
          <meshStandardMaterial color={WALL_COLOR} roughness={0.9} />
        </mesh>
        
        {/* Wall section ABOVE window */}
        <mesh position={[0, WINDOW_Y + WINDOW_HEIGHT + (WALL_HEIGHT - WINDOW_Y - WINDOW_HEIGHT) / 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[WINDOW_WIDTH, WALL_HEIGHT - WINDOW_Y - WINDOW_HEIGHT, WALL_THICKNESS]} />
          <meshStandardMaterial color={WALL_COLOR} roughness={0.9} />
        </mesh>
        
        {/* Wall section BELOW window */}
        <mesh position={[0, WINDOW_Y / 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[WINDOW_WIDTH, WINDOW_Y, WALL_THICKNESS]} />
          <meshStandardMaterial color={WALL_COLOR} roughness={0.9} />
        </mesh>

        {/* ========== WINDOW FRAME ========== */}
        {/* Top frame */}
        <mesh position={[0, WINDOW_Y + WINDOW_HEIGHT + WINDOW_FRAME_THICKNESS / 2, WALL_THICKNESS / 2 + 0.01]}>
          <boxGeometry args={[WINDOW_WIDTH + WINDOW_FRAME_THICKNESS * 2, WINDOW_FRAME_THICKNESS, WINDOW_FRAME_THICKNESS]} />
          <meshStandardMaterial color={WINDOW_FRAME_COLOR} roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Bottom frame */}
        <mesh position={[0, WINDOW_Y - WINDOW_FRAME_THICKNESS / 2, WALL_THICKNESS / 2 + 0.01]}>
          <boxGeometry args={[WINDOW_WIDTH + WINDOW_FRAME_THICKNESS * 2, WINDOW_FRAME_THICKNESS, WINDOW_FRAME_THICKNESS]} />
          <meshStandardMaterial color={WINDOW_FRAME_COLOR} roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Left frame */}
        <mesh position={[-WINDOW_WIDTH / 2 - WINDOW_FRAME_THICKNESS / 2, WINDOW_Y + WINDOW_HEIGHT / 2, WALL_THICKNESS / 2 + 0.01]}>
          <boxGeometry args={[WINDOW_FRAME_THICKNESS, WINDOW_HEIGHT, WINDOW_FRAME_THICKNESS]} />
          <meshStandardMaterial color={WINDOW_FRAME_COLOR} roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Right frame */}
        <mesh position={[WINDOW_WIDTH / 2 + WINDOW_FRAME_THICKNESS / 2, WINDOW_Y + WINDOW_HEIGHT / 2, WALL_THICKNESS / 2 + 0.01]}>
          <boxGeometry args={[WINDOW_FRAME_THICKNESS, WINDOW_HEIGHT, WINDOW_FRAME_THICKNESS]} />
          <meshStandardMaterial color={WINDOW_FRAME_COLOR} roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Center vertical divider */}
        <mesh position={[0, WINDOW_Y + WINDOW_HEIGHT / 2, WALL_THICKNESS / 2 + 0.01]}>
          <boxGeometry args={[WINDOW_FRAME_THICKNESS / 2, WINDOW_HEIGHT, WINDOW_FRAME_THICKNESS / 2]} />
          <meshStandardMaterial color={WINDOW_FRAME_COLOR} roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Center horizontal divider */}
        <mesh position={[0, WINDOW_Y + WINDOW_HEIGHT / 2, WALL_THICKNESS / 2 + 0.01]}>
          <boxGeometry args={[WINDOW_WIDTH, WINDOW_FRAME_THICKNESS / 2, WINDOW_FRAME_THICKNESS / 2]} />
          <meshStandardMaterial color={WINDOW_FRAME_COLOR} roughness={0.3} metalness={0.1} />
        </mesh>

        {/* ========== WINDOW GLASS ========== */}
        <mesh position={[0, WINDOW_Y + WINDOW_HEIGHT / 2, 0]}>
          <planeGeometry args={[WINDOW_WIDTH, WINDOW_HEIGHT]} />
          <meshPhysicalMaterial 
            color="#87ceeb"
            transparent
            opacity={0.15}
            roughness={0}
            metalness={0.1}
            transmission={0.9}
            thickness={0.1}
          />
        </mesh>

        {/* Baseboard */}
        <mesh position={[0, BASEBOARD_HEIGHT / 2, WALL_THICKNESS / 2 + 0.01]}>
          <boxGeometry args={[ROOM_SIZE, BASEBOARD_HEIGHT, 0.02]} />
          <meshStandardMaterial color={BASEBOARD_COLOR} roughness={0.4} />
        </mesh>
      </group>

      {/* ========== LEFT WALL ========== */}
      <group position={[-ROOM_SIZE / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh position={[0, WALL_HEIGHT / 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[ROOM_SIZE, WALL_HEIGHT, WALL_THICKNESS]} />
          <meshStandardMaterial color={WALL_COLOR} roughness={0.9} />
        </mesh>
        {/* Baseboard */}
        <mesh position={[0, BASEBOARD_HEIGHT / 2, WALL_THICKNESS / 2 + 0.01]}>
          <boxGeometry args={[ROOM_SIZE, BASEBOARD_HEIGHT, 0.02]} />
          <meshStandardMaterial color={BASEBOARD_COLOR} roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
};

export default Room;