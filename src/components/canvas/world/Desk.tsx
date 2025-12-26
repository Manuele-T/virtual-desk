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

      {/* ========== DESK ACCESSORIES ========== */}
      
      {/* ========== DESK PLANT (Right side) ========== */}
      <group position={[1.4, 0.08, -0.4]}>
        {/* Pot */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.06, 0.12, 16]} />
          <meshStandardMaterial color="#b45309" roughness={0.9} />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.02, 16]} />
          <meshStandardMaterial color="#3d2314" roughness={1} />
        </mesh>
        {/* Plant leaves - succulent style */}
        <group position={[0, 0.1, 0]}>
          {/* Center leaf */}
          <mesh castShadow>
            <sphereGeometry args={[0.04, 8, 6]} />
            <meshStandardMaterial color="#22c55e" roughness={0.7} />
          </mesh>
          {/* Surrounding leaves */}
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh 
              key={i}
              position={[
                Math.cos((i / 5) * Math.PI * 2) * 0.04,
                -0.02,
                Math.sin((i / 5) * Math.PI * 2) * 0.04
              ]}
              castShadow
            >
              <sphereGeometry args={[0.035, 8, 6]} />
              <meshStandardMaterial color="#16a34a" roughness={0.7} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ========== DESK LAMP (Left side) ========== */}
      <group position={[-1.4, 0.08, -0.3]}>
        {/* Lamp base */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.1, 0.12, 0.03, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Lamp stem */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.45, 8]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Lamp arm (angled) */}
        <group position={[0, 0.47, 0]} rotation={[0, 0, Math.PI / 6]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.012, 0.012, 0.35, 8]} />
            <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.7} />
          </mesh>
        </group>
        {/* Lamp head */}
        <group position={[0.15, 0.6, 0]} rotation={[0, 0, Math.PI / 4]}>
          <mesh castShadow>
            <coneGeometry args={[0.08, 0.12, 16, 1, true]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.7} side={2} />
          </mesh>
          {/* Light bulb glow */}
          <mesh position={[0, -0.02, 0]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial 
              color="#fff5e6" 
              emissive="#fff5e6" 
              emissiveIntensity={2}
            />
          </mesh>
          {/* Actual light source */}
          <pointLight
            position={[0, -0.05, 0]}
            intensity={0.8}
            distance={2}
            color="#fff5e6"
            castShadow
          />
        </group>
      </group>

      {/* ========== COFFEE MUG (Right of laptop) ========== */}
      <group position={[0.9, 0.08, 0.35]}>
        {/* Mug body */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.04, 0.035, 0.1, 16]} />
          <meshStandardMaterial color="#1e40af" roughness={0.5} />
        </mesh>
        {/* Mug handle */}
        <mesh position={[0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <torusGeometry args={[0.025, 0.008, 8, 12, Math.PI]} />
          <meshStandardMaterial color="#1e40af" roughness={0.5} />
        </mesh>
        {/* Coffee surface */}
        <mesh position={[0, 0.04, 0]}>
          <circleGeometry args={[0.035, 16]} rotation={[-Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#3d2314" roughness={0.3} />
        </mesh>
      </group>

      {/* ========== NOTEBOOK/NOTEPAD (Left of laptop) ========== */}
      <group position={[-0.85, 0.09, 0.25]} rotation={[0, -0.15, 0]}>
        {/* Notepad */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.18, 0.015, 0.24]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.9} />
        </mesh>
        {/* Notepad lines (decorative) */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <mesh key={i} position={[0, 0.008, -0.08 + i * 0.025]}>
            <boxGeometry args={[0.15, 0.001, 0.002]} />
            <meshStandardMaterial color="#93c5fd" />
          </mesh>
        ))}
        {/* Pen */}
        <group position={[0.12, 0.02, 0]} rotation={[0, 0.3, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.006, 0.006, 0.15, 8]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.5} />
          </mesh>
          {/* Pen tip */}
          <mesh position={[0.07, 0, 0]} castShadow>
            <coneGeometry args={[0.006, 0.02, 8]} rotation={[0, 0, -Math.PI / 2]} />
            <meshStandardMaterial color="#6b7280" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Pen clip */}
          <mesh position={[-0.05, 0.007, 0]} castShadow>
            <boxGeometry args={[0.04, 0.002, 0.008]} />
            <meshStandardMaterial color="#6b7280" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* ========== COASTER (for the mug) ========== */}
      <mesh position={[0.9, 0.082, 0.35]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[0.06, 24]} />
        <meshStandardMaterial color="#78350f" roughness={0.8} />
      </mesh>
    </group>
  );
};

export default Desk;
