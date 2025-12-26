import React, { useMemo } from 'react';
import * as THREE from 'three';

// Create procedural wood grain texture
const createWoodTexture = (): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // 1. Base Wood Color (Warm Walnut/Mahogany)
  ctx.fillStyle = '#6b4423'; 
  ctx.fillRect(0, 0, 1024, 1024);

  // 2. Add Noise/Grain Texture
  for (let i = 0; i < 40000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    ctx.fillStyle = Math.random() > 0.5 ? '#54351b' : '#8a5a32';
    ctx.fillRect(x, y, 2, 2);
  }

  // 3. Strong Grain Lines
  for (let i = 0; i < 120; i++) {
    const y = Math.random() * 1024;
    const thickness = Math.random() * 4 + 1;
    const alpha = Math.random() * 0.4 + 0.2;
    
    ctx.strokeStyle = `rgba(50, 30, 15, ${alpha})`; // Dark brown grain
    ctx.lineWidth = thickness;
    
    ctx.beginPath();
    ctx.moveTo(0, y);
    
    // Organic wavy lines
    for (let x = 0; x < 1024; x += 15) {
      const wave = Math.sin(x * 0.01 + i) * 15 + Math.sin(x * 0.05) * 2;
      ctx.lineTo(x, y + wave);
    }
    ctx.stroke();
  }

  // 4. Wood Knots (Darker, organic shapes)
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const radius = Math.random() * 20 + 10;
    
    // Knot gradient
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(40, 20, 10, 0.9)');
    gradient.addColorStop(0.6, 'rgba(60, 35, 20, 0.6)');
    gradient.addColorStop(1, 'rgba(107, 68, 35, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    // Distorted circle for knot
    ctx.ellipse(x, y, radius, radius * 0.6, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
    
    // Grain flow around knot (simple approximation)
    ctx.strokeStyle = 'rgba(50, 30, 15, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(x, y, radius * 1.5, radius * 1.0, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 1); // Repeat more horizontally
  return texture;
};

const Desk: React.FC = () => {
  const legHeight = 0.8;
  const legWidth = 0.08;
  const tableWidth = 3.5;
  const tableDepth = 1.5;
  const legInset = 0.15; // How far legs are from edge
  const edgeThickness = 0.04;

  // Create wood grain texture procedurally
  const woodTexture = useMemo(() => createWoodTexture(), []);

  return (
    <group position={[0, 0, 0]}>
      {/* Tabletop - main surface */}
      <mesh position={[0, 0.04, 0]} receiveShadow castShadow>
        <boxGeometry args={[tableWidth, 0.08, tableDepth]} />
        <meshStandardMaterial 
          map={woodTexture}
          color="#8B5A2B" // Tint with a rich brown color
          roughness={0.6} 
          metalness={0.1}
        />
      </mesh>

      {/* Under-desk support beam */}
      <mesh position={[0, -0.08, 0]} receiveShadow castShadow>
        <boxGeometry args={[tableWidth - 0.4, 0.06, 0.1]} />
        <meshStandardMaterial color="#2a1a0a" roughness={0.6} metalness={0.15} />
      </mesh>

      {/* Legs with slight taper effect (thicker at top) */}
      {/* Front Left */}
      <group position={[-tableWidth / 2 + legInset, -legHeight / 2, tableDepth / 2 - legInset]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[legWidth, legHeight, legWidth]} />
          <meshStandardMaterial color="#2a1a0a" roughness={0.5} metalness={0.3} />
        </mesh>
        {/* Leg cap */}
        <mesh position={[0, legHeight / 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[legWidth + 0.02, 0.02, legWidth + 0.02]} />
          <meshStandardMaterial color="#1a0f05" roughness={0.4} metalness={0.4} />
        </mesh>
      </group>
      {/* Front Right */}
      <group position={[tableWidth / 2 - legInset, -legHeight / 2, tableDepth / 2 - legInset]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[legWidth, legHeight, legWidth]} />
          <meshStandardMaterial color="#2a1a0a" roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[0, legHeight / 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[legWidth + 0.02, 0.02, legWidth + 0.02]} />
          <meshStandardMaterial color="#1a0f05" roughness={0.4} metalness={0.4} />
        </mesh>
      </group>
      {/* Back Left */}
      <group position={[-tableWidth / 2 + legInset, -legHeight / 2, -tableDepth / 2 + legInset]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[legWidth, legHeight, legWidth]} />
          <meshStandardMaterial color="#2a1a0a" roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[0, legHeight / 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[legWidth + 0.02, 0.02, legWidth + 0.02]} />
          <meshStandardMaterial color="#1a0f05" roughness={0.4} metalness={0.4} />
        </mesh>
      </group>
      {/* Back Right */}
      <group position={[tableWidth / 2 - legInset, -legHeight / 2, -tableDepth / 2 + legInset]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[legWidth, legHeight, legWidth]} />
          <meshStandardMaterial color="#2a1a0a" roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[0, legHeight / 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[legWidth + 0.02, 0.02, legWidth + 0.02]} />
          <meshStandardMaterial color="#1a0f05" roughness={0.4} metalness={0.4} />
        </mesh>
      </group>
    </group>
  );
};

export default Desk;
