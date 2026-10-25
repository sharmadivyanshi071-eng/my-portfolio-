'use client';

// components/3d/HeroStation.tsx
// Section 1 (HERO): Renders the floating 3D holographic nameplate with the user's name
// alongside a composite multi-ring quantum beacon at the origin of the galaxy journey.

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createHeroNameplateTexture } from '@/lib/proceduralTextures';

interface HeroStationProps {
  name: string;
  role: string;
  position: [number, number, number];
}

export default function HeroStation({ name, role, position }: HeroStationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const nameplateRef = useRef<THREE.Group>(null);

  // Generate procedural 3D nameplate texture whenever name or role updates
  const nameplateTexture = useMemo(
    () => createHeroNameplateTexture(name, role),
    [name, role]
  );

  // Smooth floating & gyroscopic rotation animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 1.1) * 0.18;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = t * 0.22;
      outerRingRef.current.rotation.x = Math.sin(t * 0.4) * 0.25;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y = -t * 0.35;
      innerRingRef.current.rotation.x = Math.cos(t * 0.3) * 0.4;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.5;
      coreRef.current.rotation.z = t * 0.3;
    }
    if (nameplateRef.current) {
      nameplateRef.current.position.y = 2.35 + Math.sin(t * 1.6) * 0.08;
      nameplateRef.current.rotation.y = Math.sin(t * 0.6) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Local point light to illuminate the hero station */}
      <pointLight color="#22d3ee" intensity={18} distance={18} />
      <pointLight color="#a855f7" intensity={12} distance={15} position={[3, -2, 2]} />

      {/* 3D Floating Holographic Nameplate in Space */}
      <group ref={nameplateRef} position={[0, 2.35, 1.2]}>
        {/* Metallic 3D backing frame */}
        <mesh position={[0, 0, -0.08]}>
          <boxGeometry args={[7.4, 1.85, 0.08]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.85}
            roughness={0.2}
            emissive="#083344"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Left & right holographic emitter pylons */}
        <mesh position={[-3.75, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 2.0, 16]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#06b6d4"
            emissiveIntensity={1.5}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[3.75, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 2.0, 16]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#9333ea"
            emissiveIntensity={1.5}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>

        {/* 3D Floating Text Plane */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[7.2, 1.8]} />
          <meshBasicMaterial
            map={nameplateTexture}
            transparent
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Composite 6-Part Origin Astrolabe / Crystalline Core */}
      <group position={[0, -0.5, 0]}>
        {/* 1. Primary Faceted Core */}
        <mesh ref={coreRef}>
          <octahedronGeometry args={[1.15, 1]} />
          <meshPhysicalMaterial
            color="#06b6d4"
            emissive="#0891b2"
            emissiveIntensity={0.65}
            metalness={0.35}
            roughness={0.15}
            clearcoat={1}
            wireframe={false}
          />
        </mesh>

        {/* 2. Wireframe Energy Lattice */}
        <mesh scale={1.26}>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshBasicMaterial
            color="#67e8f9"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* 3. Inner Gyroscopic Ring */}
        <mesh ref={innerRingRef}>
          <torusGeometry args={[1.95, 0.045, 16, 96]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#9333ea"
            emissiveIntensity={1.2}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* 4. Outer Equatorial Ring */}
        <mesh ref={outerRingRef} rotation={[Math.PI / 3, 0.2, 0]}>
          <torusGeometry args={[2.65, 0.055, 16, 100]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#06b6d4"
            emissiveIntensity={1.1}
            metalness={0.85}
            roughness={0.18}
          />
        </mesh>

        {/* 5. North & South Polar Beacons */}
        <mesh position={[0, 1.65, 0]}>
          <coneGeometry args={[0.18, 0.45, 16]} />
          <meshStandardMaterial
            color="#e2e8f0"
            emissive="#38bdf8"
            emissiveIntensity={0.9}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
        <mesh position={[0, -1.65, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.18, 0.45, 16]} />
          <meshStandardMaterial
            color="#e2e8f0"
            emissive="#a855f7"
            emissiveIntensity={0.9}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      </group>
    </group>
  );
}
