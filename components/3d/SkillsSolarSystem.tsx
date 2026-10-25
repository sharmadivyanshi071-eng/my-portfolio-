'use client';

// components/3d/SkillsSolarSystem.tsx
// Section 3 (SKILLS): Renders a glowing central sun surrounded by orbiting skill planets/orbs.
// Hovering over any orb makes it glow brighter, scale up smoothly, and display its skill label.

import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { SkillOrbData } from '@/types/portfolio';
import { createSolarTexture } from '@/lib/proceduralTextures';

interface SkillsSolarSystemProps {
  position: [number, number, number];
  skills: SkillOrbData[];
  hoveredSkill: string | null;
  onHoverSkill: (skillName: string | null) => void;
}

interface OrbitingSkillOrbProps {
  skill: SkillOrbData;
  isHovered: boolean;
  onHover: (name: string | null) => void;
}

function OrbitingSkillOrb({ skill, isHovered, onHover }: OrbitingSkillOrbProps) {
  const orbGroupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const currentScale = useRef(1);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    // Compute orbital position around the central sun
    const angle = skill.initialAngle + t * skill.orbitSpeed * (isHovered ? 0.35 : 1);
    const x = Math.cos(angle) * skill.orbitRadius;
    const z = Math.sin(angle) * skill.orbitRadius;
    const y = Math.sin(angle * 2) * 0.35;

    if (orbGroupRef.current) {
      orbGroupRef.current.position.set(x, y, z);
    }

    // Smoothly damp scale up when hovered (1.0 -> 1.45)
    const targetScale = isHovered ? 1.48 : 1.0;
    currentScale.current = THREE.MathUtils.damp(
      currentScale.current,
      targetScale,
      8,
      delta
    );

    if (meshRef.current) {
      meshRef.current.scale.setScalar(currentScale.current);
      meshRef.current.rotation.y += delta * (isHovered ? 2.2 : 0.8);
    }
    if (ringRef.current) {
      ringRef.current.scale.setScalar(currentScale.current);
      ringRef.current.rotation.z -= delta * 1.2;
    }
  });

  return (
    <group>
      {/* Subtle orbital path ring around the sun */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[skill.orbitRadius - 0.02, skill.orbitRadius + 0.02, 96]} />
        <meshBasicMaterial
          color={isHovered ? skill.color : '#334155'}
          transparent
          opacity={isHovered ? 0.55 : 0.22}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* The orbiting skill orb + ring + floating label */}
      <group ref={orbGroupRef}>
        <mesh
          ref={meshRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            onHover(skill.name);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            onHover(null);
            document.body.style.cursor = 'auto';
          }}
          onClick={(e) => {
            e.stopPropagation();
            onHover(isHovered ? null : skill.name);
          }}
        >
          <sphereGeometry args={[skill.size, 32, 32]} />
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.emissiveColor}
            emissiveIntensity={isHovered ? 2.2 : 0.65}
            roughness={0.25}
            metalness={0.5}
          />
        </mesh>

        {/* Mini equatorial ring on each skill orb */}
        <mesh ref={ringRef} rotation={[Math.PI / 2.4, 0.3, 0]}>
          <torusGeometry args={[skill.size * 1.45, 0.022, 12, 48]} />
          <meshBasicMaterial
            color={skill.color}
            transparent
            opacity={isHovered ? 0.95 : 0.45}
          />
        </mesh>

        {/* Skill Name Label attached to the 3D orb */}
        <Html
          position={[0, skill.size * 1.9, 0]}
          center
          distanceFactor={15}
          zIndexRange={[10, 0]}
        >
          <button
            type="button"
            onMouseEnter={() => onHover(skill.name)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onHover(isHovered ? null : skill.name)}
            className={`px-2.5 py-1 rounded text-xs font-mono tracking-wide whitespace-nowrap transition-transform duration-150 border ${
              isHovered
                ? 'bg-[#090d24] text-cyan-200 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.65)] scale-110'
                : 'bg-[#070a18]/90 text-slate-200 border-white/15 hover:border-cyan-400/60'
            }`}
          >
            {skill.name}
          </button>
        </Html>
      </group>
    </group>
  );
}

export default function SkillsSolarSystem({
  position,
  skills,
  hoveredSkill,
  onHoverSkill,
}: SkillsSolarSystemProps) {
  const sunRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const solarTexture = useMemo(() => createSolarTexture(), []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.25;
      sunRef.current.rotation.x = Math.sin(t * 0.4) * 0.1;
    }
    if (coronaRef.current) {
      const pulse = 1.12 + Math.sin(t * 2.2) * 0.04;
      coronaRef.current.scale.setScalar(pulse);
      coronaRef.current.rotation.z -= delta * 0.15;
    }
  });

  return (
    <group position={position} rotation={[0.18, 0, -0.06]}>
      {/* Central Sun light source */}
      <pointLight color="#22d3ee" intensity={35} distance={28} />
      <pointLight color="#a855f7" intensity={22} distance={24} position={[0, 3, 0]} />

      {/* Central Sun Core ("Helios Core") */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[1.55, 48, 48]} />
        <meshStandardMaterial
          map={solarTexture}
          emissive="#06b6d4"
          emissiveIntensity={1.25}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Sun Corona Wireframe Shell */}
      <mesh ref={coronaRef}>
        <icosahedronGeometry args={[1.65, 2]} />
        <meshBasicMaterial
          color="#67e8f9"
          wireframe
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </mesh>

      {/* Outer Solar Flare Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.15, 0.04, 16, 80]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
      </mesh>

      {/* Orbiting Skill Orbs */}
      {skills.map((skill) => (
        <OrbitingSkillOrb
          key={skill.name}
          skill={skill}
          isHovered={hoveredSkill === skill.name}
          onHover={onHoverSkill}
        />
      ))}
    </group>
  );
}
