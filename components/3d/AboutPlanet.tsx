'use client';

// components/3d/AboutPlanet.tsx
// Section 2 (ABOUT): Renders a glowing multi-part planet ("Aurelia Prime") that slowly rotates
// next to the glassmorphic About card.

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createPlanetTexture } from '@/lib/proceduralTextures';

interface AboutPlanetProps {
  position: [number, number, number];
}

export default function AboutPlanet({ position }: AboutPlanetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const moonPivotRef = useRef<THREE.Group>(null);

  // Create procedural surface texture once
  const planetTexture = useMemo(
    () => createPlanetTexture('#0891b2', '#1e1b4b', '#a855f7', 3),
    []
  );

  // Rotate the planet, atmosphere layer, rings, and orbiting moon every frame
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 0.85) * 0.22;
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.18;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y -= delta * 0.08;
      cloudsRef.current.rotation.z = Math.sin(t * 0.3) * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.12;
    }
    if (moonPivotRef.current) {
      moonPivotRef.current.rotation.y = t * 0.45;
      moonPivotRef.current.rotation.z = 0.25;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Local neon lighting for the About planet */}
      <pointLight color="#22d3ee" intensity={22} distance={20} position={[4, 3, 4]} />
      <pointLight color="#a855f7" intensity={15} distance={18} position={[-4, -2, 2]} />

      {/* 1. Primary Planet Sphere */}
      <mesh ref={planetRef} rotation={[0.15, 0, -0.2]}>
        <sphereGeometry args={[2.15, 64, 64]} />
        <meshStandardMaterial
          map={planetTexture}
          roughness={0.55}
          metalness={0.25}
          emissive="#0e7490"
          emissiveIntensity={0.28}
        />
      </mesh>

      {/* 2. Glowing Atmospheric Aura Shell (depthWrite false to prevent sorting flicker) */}
      <mesh ref={cloudsRef} scale={1.06}>
        <sphereGeometry args={[2.15, 32, 32]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#06b6d4"
          emissiveIntensity={0.7}
          transparent
          opacity={0.18}
          depthWrite={false}
          wireframe
        />
      </mesh>

      {/* 3. Outer Neon Rim Halo */}
      <mesh scale={1.14}>
        <sphereGeometry args={[2.15, 32, 32]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.09}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* 4. Inner Tilted Planetary Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.3, 0.25, 0]}>
        <torusGeometry args={[3.35, 0.08, 16, 120]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#06b6d4"
          emissiveIntensity={0.85}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* 5. Secondary Outer Ring */}
      <mesh rotation={[Math.PI / 2.3, 0.25, 0]}>
        <torusGeometry args={[3.85, 0.03, 16, 120]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#9333ea"
          emissiveIntensity={0.9}
          metalness={0.7}
          roughness={0.3}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* 6. Orbiting Moon with Relay Ring */}
      <group ref={moonPivotRef}>
        <group position={[4.6, 0.4, 0]}>
          <mesh>
            <sphereGeometry args={[0.36, 32, 32]} />
            <meshStandardMaterial
              color="#e2e8f0"
              emissive="#38bdf8"
              emissiveIntensity={0.4}
              roughness={0.4}
              metalness={0.6}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.56, 0.02, 12, 48]} />
            <meshBasicMaterial color="#67e8f9" />
          </mesh>
        </group>
      </group>
    </group>
  );
}
