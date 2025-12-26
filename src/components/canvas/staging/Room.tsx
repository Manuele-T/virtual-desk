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

        {/* ========== FLOATING SHELF ========== */}
        <group position={[-1.5, 2.2, WALL_THICKNESS / 2 + 0.15]}>
          {/* Shelf board */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.2, 0.04, 0.25]} />
            <meshStandardMaterial color="#3d2817" roughness={0.7} />
          </mesh>
          {/* Shelf bracket left */}
          <mesh position={[-0.45, -0.08, -0.08]} castShadow>
            <boxGeometry args={[0.04, 0.12, 0.04]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Shelf bracket right */}
          <mesh position={[0.45, -0.08, -0.08]} castShadow>
            <boxGeometry args={[0.04, 0.12, 0.04]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
          </mesh>

          {/* Books on shelf */}
          {/* Book 1 - tall blue */}
          <mesh position={[-0.35, 0.14, 0]} castShadow>
            <boxGeometry args={[0.08, 0.24, 0.16]} />
            <meshStandardMaterial color="#2563eb" roughness={0.8} />
          </mesh>
          {/* Book 2 - medium red */}
          <mesh position={[-0.24, 0.11, 0]} castShadow>
            <boxGeometry args={[0.06, 0.18, 0.16]} />
            <meshStandardMaterial color="#dc2626" roughness={0.8} />
          </mesh>
          {/* Book 3 - short green */}
          <mesh position={[-0.14, 0.09, 0]} castShadow>
            <boxGeometry args={[0.07, 0.14, 0.16]} />
            <meshStandardMaterial color="#16a34a" roughness={0.8} />
          </mesh>
          {/* Book 4 - tall orange */}
          <mesh position={[-0.04, 0.13, 0]} castShadow>
            <boxGeometry args={[0.06, 0.22, 0.16]} />
            <meshStandardMaterial color="#ea580c" roughness={0.8} />
          </mesh>
          {/* Book 5 - lying flat */}
          <mesh position={[0.15, 0.05, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <boxGeometry args={[0.06, 0.18, 0.14]} />
            <meshStandardMaterial color="#7c3aed" roughness={0.8} />
          </mesh>
          
          {/* Small decorative plant on shelf */}
          <group position={[0.4, 0.1, 0]}>
            {/* Tiny pot */}
            <mesh castShadow>
              <cylinderGeometry args={[0.04, 0.03, 0.06, 8]} />
              <meshStandardMaterial color="#d97706" roughness={0.9} />
            </mesh>
            {/* Mini succulent */}
            <mesh position={[0, 0.06, 0]} castShadow>
              <sphereGeometry args={[0.04, 8, 6]} />
              <meshStandardMaterial color="#22c55e" roughness={0.8} />
            </mesh>
          </group>
        </group>

        {/* ========== FRAMED ARTWORK 1 (Large) ========== */}
        <group position={[1, 2, WALL_THICKNESS / 2 + 0.02]}>
          {/* Frame */}
          <mesh castShadow>
            <boxGeometry args={[0.9, 0.7, 0.04]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.2} />
          </mesh>
          {/* Canvas/artwork */}
          <mesh position={[0, 0, 0.021]}>
            <planeGeometry args={[0.8, 0.6]} />
            <meshStandardMaterial color="#1e3a5f" roughness={0.9} />
          </mesh>
          {/* Abstract art detail - circle */}
          <mesh position={[-0.15, 0.05, 0.025]}>
            <circleGeometry args={[0.12, 24]} />
            <meshStandardMaterial color="#f97316" roughness={0.8} />
          </mesh>
          {/* Abstract art detail - smaller circle */}
          <mesh position={[0.18, -0.1, 0.025]}>
            <circleGeometry args={[0.08, 24]} />
            <meshStandardMaterial color="#fbbf24" roughness={0.8} />
          </mesh>
        </group>

        {/* ========== FRAMED ARTWORK 2 (Small) ========== */}
        <group position={[2.2, 2.3, WALL_THICKNESS / 2 + 0.02]}>
          {/* Frame */}
          <mesh castShadow>
            <boxGeometry args={[0.5, 0.5, 0.03]} />
            <meshStandardMaterial color="#8b4513" roughness={0.5} />
          </mesh>
          {/* Canvas */}
          <mesh position={[0, 0, 0.016]}>
            <planeGeometry args={[0.42, 0.42]} />
            <meshStandardMaterial color="#0f172a" roughness={0.9} />
          </mesh>
          {/* Minimalist art - lines */}
          <mesh position={[0, 0.08, 0.02]}>
            <boxGeometry args={[0.3, 0.02, 0.001]} />
            <meshStandardMaterial color="#f8fafc" emissive="#f8fafc" emissiveIntensity={0.1} />
          </mesh>
          <mesh position={[0, -0.08, 0.02]}>
            <boxGeometry args={[0.2, 0.02, 0.001]} />
            <meshStandardMaterial color="#f8fafc" emissive="#f8fafc" emissiveIntensity={0.1} />
          </mesh>
        </group>

        {/* ========== WALL CLOCK ========== */}
        <group position={[-2.5, 2.5, WALL_THICKNESS / 2 + 0.02]}>
          {/* Clock body */}
          <mesh castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.04, 32]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.5} />
          </mesh>
          {/* Clock face */}
          <mesh position={[0, 0, 0.021]} rotation={[0, 0, 0]}>
            <circleGeometry args={[0.22, 32]} />
            <meshStandardMaterial color="#fafafa" roughness={0.9} />
          </mesh>
          {/* Hour hand */}
          <mesh position={[0, 0.05, 0.025]} rotation={[0, 0, Math.PI / 6]}>
            <boxGeometry args={[0.015, 0.1, 0.005]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          {/* Minute hand */}
          <mesh position={[0.04, 0.02, 0.025]} rotation={[0, 0, -Math.PI / 3]}>
            <boxGeometry args={[0.01, 0.14, 0.005]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          {/* Center dot */}
          <mesh position={[0, 0, 0.028]}>
            <circleGeometry args={[0.015, 16]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export default Room;