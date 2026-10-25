'use client';

// components/3d/ContactSatellite.tsx
// Section 5 (CONTACT): Renders a composite 10-part procedural 3D Space Rocket & Relay Satellite
// built exclusively from basic Three.js geometries (cylinders, cones, spheres, boxes, torus rings).

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ContactSatelliteProps {
  position: [number, number, number];
}

export default function ContactSatellite({ position }: ContactSatelliteProps) {
  const craftGroupRef = useRef<THREE.Group>(null);
  const solarArrayRef = useRef<THREE.Group>(null);
  const radarRingRef = useRef<THREE.Mesh>(null);
  const plumeRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Smooth zero-gravity hover & gentle pitch/roll
    if (craftGroupRef.current) {
      craftGroupRef.current.position.y = position[1] + Math.sin(t * 1.3) * 0.25;
      craftGroupRef.current.rotation.y = -0.45 + Math.sin(t * 0.5) * 0.22;
      craftGroupRef.current.rotation.z = 0.22 + Math.cos(t * 0.7) * 0.08;
    }

    // Slowly rotate the solar panel wings to track starlight
    if (solarArrayRef.current) {
      solarArrayRef.current.rotation.x = Math.sin(t * 0.6) * 0.35;
    }

    // Spin telemetry radar ring
    if (radarRingRef.current) {
      radarRingRef.current.rotation.z += delta * 0.8;
    }

    // Flicker rocket thruster plasma plume
    if (plumeRef.current) {
      const flicker = 0.9 + Math.sin(t * 18) * 0.14;
      plumeRef.current.scale.set(1, flicker, 1);
    }
  });

  return (
    <group ref={craftGroupRef} position={position}>
      {/* Local cyan and purple thruster illumination */}
      <pointLight color="#22d3ee" intensity={24} distance={20} position={[-2, 2, 3]} />
      <pointLight color="#a855f7" intensity={18} distance={16} position={[2, -2, 2]} />

      {/* 1. Primary Rocket Fuselage Hull (Cylinder) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.58, 0.68, 2.5, 32]} />
        <meshStandardMaterial
          color="#e2e8f0"
          metalness={0.82}
          roughness={0.22}
        />
      </mesh>

      {/* 2. Secondary Upper Command Module Collar */}
      <mesh position={[0, 1.45, 0]}>
        <cylinderGeometry args={[0.45, 0.58, 0.5, 32]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.75}
          roughness={0.3}
          emissive="#0891b2"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* 3. Aerodynamic Nose Cone */}
      <mesh position={[0, 2.15, 0]}>
        <coneGeometry args={[0.45, 0.95, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={0.45}
          metalness={0.65}
          roughness={0.2}
        />
      </mesh>

      {/* 4. Communications Dish Spire on Nose */}
      <mesh position={[0, 2.8, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.55, 12]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[0, 3.1, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color="#22d3ee" />
      </mesh>

      {/* 5. Glowing Viewport Porthole (Front) */}
      <mesh position={[0, 0.55, 0.56]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.12, 24]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#22d3ee"
          emissiveIntensity={1.4}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {/* 6. Port & Starboard Solar Panel Wings (Satellite Array) */}
      <group ref={solarArrayRef} position={[0, 0.2, 0]}>
        {/* Support boom */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 5.2, 16]} />
          <meshStandardMaterial color="#64748b" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Left Solar Wing */}
        <mesh position={[-1.75, 0, 0]}>
          <boxGeometry args={[1.9, 0.65, 0.05]} />
          <meshStandardMaterial
            color="#1e1b4b"
            emissive="#4f46e5"
            emissiveIntensity={0.55}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>

        {/* Right Solar Wing */}
        <mesh position={[1.75, 0, 0]}>
          <boxGeometry args={[1.9, 0.65, 0.05]} />
          <meshStandardMaterial
            color="#1e1b4b"
            emissive="#4f46e5"
            emissiveIntensity={0.55}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* 7. Four Stabilizer Delta Fins around Base */}
      {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, i) => (
        <group key={i} rotation={[0, angle, 0]}>
          <mesh position={[0.72, -0.95, 0]} rotation={[0, 0, -0.25]}>
            <boxGeometry args={[0.42, 0.85, 0.08]} />
            <meshStandardMaterial
              color="#a855f7"
              emissive="#7e22ce"
              emissiveIntensity={0.45}
              metalness={0.7}
              roughness={0.25}
            />
          </mesh>
        </group>
      ))}

      {/* 8. Main Thruster Bell Nozzle */}
      <mesh position={[0, -1.48, 0]}>
        <cylinderGeometry args={[0.36, 0.52, 0.48, 24]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.25} />
      </mesh>

      {/* 9. Glowing Ion Engine Plume */}
      <mesh ref={plumeRef} position={[0, -2.15, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.42, 1.15, 24]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.78}
        />
      </mesh>

      {/* 10. Orbiting Telemetry Halo Ring */}
      <mesh ref={radarRingRef} rotation={[Math.PI / 2.2, 0.2, 0]}>
        <torusGeometry args={[2.35, 0.03, 16, 80]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}
