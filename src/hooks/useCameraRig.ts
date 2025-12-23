import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { useStore } from '../stores/useStore';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

export const useCameraRig = () => {
  const { camera, controls } = useThree();
  const viewMode = useStore((state) => state.viewMode);
  
  // Base positions
  const overviewPosition = new THREE.Vector3(3, 2, 4);
  const overviewTarget = new THREE.Vector3(0, 0, 0);
  
  // Focus position: Directly in front of the laptop screen
  // Assuming laptop screen is roughly at (0, 0.5, 0) and facing +Z or similar depending on model rotation
  // We align these numbers with the Laptop component geometry
  const focusPosition = new THREE.Vector3(0, 0.6, 1.2); 
  const focusTarget = new THREE.Vector3(0, 0.4, 0);

  useEffect(() => {
    const orbitControls = controls as unknown as OrbitControlsImpl;
    
    if (viewMode === 'focus') {
      // Disable controls during focus
      if (orbitControls) orbitControls.enabled = false;

      // Animate Position
      gsap.to(camera.position, {
        x: focusPosition.x,
        y: focusPosition.y,
        z: focusPosition.z,
        duration: 1.5,
        ease: 'power2.inOut',
      });

      // Animate Target (requires updating orbit controls target or manual lookAt if controls disabled)
      if (orbitControls) {
        gsap.to(orbitControls.target, {
          x: focusTarget.x,
          y: focusTarget.y,
          z: focusTarget.z,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => {
             // Keep camera looking at the tweening target
             camera.lookAt(orbitControls.target);
          }
        });
      }
    } else {
      // Return to Overview
      gsap.to(camera.position, {
        x: overviewPosition.x,
        y: overviewPosition.y,
        z: overviewPosition.z,
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
          if (orbitControls) orbitControls.enabled = true;
        }
      });

      if (orbitControls) {
        gsap.to(orbitControls.target, {
          x: overviewTarget.x,
          y: overviewTarget.y,
          z: overviewTarget.z,
          duration: 1.5,
          ease: 'power2.inOut',
        });
      }
    }
  }, [viewMode, camera, controls]);
};