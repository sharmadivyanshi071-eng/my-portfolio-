'use client';

// components/3d/ProjectsGalaxy.tsx
// Section 4 (PROJECTS): Renders each portfolio project as an interactive floating planet.
// Hovering makes the planet glow and tilt slightly; clicking opens the animated project modal.

import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ProjectPlanetData } from '@/types/portfolio';
import { createPlanetTexture } from '@/lib/proceduralTextures';

interface ProjectsGalaxyProps {
  position: [number, number, number];
  projects: ProjectPlanetData[];
  onSelectProject: (project: ProjectPlanetData) => void;
}

interface SingleProjectPlanetProps {
  project: ProjectPlanetData;
  index: number;
  onSelect: (project: ProjectPlanetData) => void;
}

function SingleProjectPlanet({
  project,
  index,
  onSelect,
}: SingleProjectPlanetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const planetMeshRef = useRef<THREE.Mesh>(null);
  const ringMeshRef = useRef<THREE.Mesh>(null);
  const satelliteRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const currentScale = useRef(1);
  const currentTiltZ = useRef(0);

  // Generate a unique procedural planet surface texture for each project
  const texture = useMemo(
    () =>
      createPlanetTexture(
        project.planetColor,
        project.secondaryColor,
        project.ringColor,
        (index + 1) * 11
      ),
    [project.planetColor, project.secondaryColor, project.ringColor, index]
  );

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Gentle floating motion + hover tilt & scale damping
    if (groupRef.current) {
      groupRef.current.position.y =
        project.positionOffset[1] + Math.sin(t * 1.2 + index * 2) * 0.22;

      const targetTilt = hovered ? 0.28 : 0.05;
      currentTiltZ.current = THREE.MathUtils.damp(
        currentTiltZ.current,
        targetTilt,
        6,
        delta
      );
      groupRef.current.rotation.z = currentTiltZ.current;

      const targetScale = hovered ? 1.16 : 1.0;
      currentScale.current = THREE.MathUtils.damp(
        currentScale.current,
        targetScale,
        7,
        delta
      );
      groupRef.current.scale.setScalar(currentScale.current);
    }

    if (planetMeshRef.current) {
      planetMeshRef.current.rotation.y += delta * (hovered ? 0.65 : 0.24);
    }

    if (ringMeshRef.current) {
      ringMeshRef.current.rotation.z -= delta * (hovered ? 0.5 : 0.18);
    }

    if (satelliteRef.current) {
      satelliteRef.current.rotation.y = t * 0.9 + index;
    }
  });

  return (
    <group
      ref={groupRef}
      position={project.positionOffset}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(project);
      }}
    >
      {/* Dedicated glow light when hovered */}
      <pointLight
        color={project.ringColor}
        intensity={hovered ? 28 : 10}
        distance={14}
      />

      {/* 1. Main Project Planet Body */}
      <mesh ref={planetMeshRef}>
        <sphereGeometry args={[project.radius, 48, 48]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.4}
          metalness={0.3}
          emissive={project.planetColor}
          emissiveIntensity={hovered ? 0.85 : 0.25}
        />
      </mesh>

      {/* 2. Glowing Atmosphere Rim */}
      <mesh scale={1.08}>
        <sphereGeometry args={[project.radius, 32, 32]} />
        <meshBasicMaterial
          color={project.ringColor}
          transparent
          opacity={hovered ? 0.28 : 0.1}
          wireframe
          depthWrite={false}
        />
      </mesh>

      {/* 3. Planetary Ring System */}
      {project.hasRing && (
        <mesh ref={ringMeshRef} rotation={[Math.PI / 2.2, 0.2, 0]}>
          <torusGeometry args={[project.radius * 1.6, 0.06, 16, 96]} />
          <meshStandardMaterial
            color={project.ringColor}
            emissive={project.planetColor}
            emissiveIntensity={hovered ? 1.5 : 0.6}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      )}

      {/* 4. Orbiting Project Beacon Moon */}
      <group ref={satelliteRef}>
        <mesh position={[project.radius * 1.9, 0.3, 0]}>
          <octahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive={project.ringColor}
            emissiveIntensity={1.2}
          />
        </mesh>
      </group>

      {/* Interactive 3D Floating Label above each Project Planet */}
      <Html
        position={[0, project.radius + 1.15, 0]}
        center
        distanceFactor={14}
        zIndexRange={[10, 0]}
      >
        <button
          type="button"
          onClick={() => onSelect(project)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`text-left px-4 py-2.5 rounded-lg border transition-transform duration-150 min-w-[210px] ${
            hovered
              ? 'bg-[#0b102b] border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.55)] scale-105'
              : 'bg-[#070a1c]/95 border-white/15 hover:border-cyan-400/60'
          }`}
        >
          <div className="text-[11px] font-mono text-cyan-400 tracking-wider">
            0{index + 1}. PROJECT PLANET
          </div>
          <div className="text-sm font-semibold text-white whitespace-nowrap mt-0.5">
            {project.title}
          </div>
          <div className="text-xs text-slate-300 mt-0.5 line-clamp-1">
            {project.shortDescription}
          </div>
          <div className="text-[11px] font-mono text-purple-300 mt-1.5">
            Click planet to inspect →
          </div>
        </button>
      </Html>
    </group>
  );
}

export default function ProjectsGalaxy({
  position,
  projects,
  onSelectProject,
}: ProjectsGalaxyProps) {
  return (
    <group position={position}>
      {/* Central connecting nebula bridge light */}
      <pointLight color="#a855f7" intensity={18} distance={25} position={[0, 2, 2]} />

      {projects.map((project, idx) => (
        <SingleProjectPlanet
          key={project.id}
          project={project}
          index={idx}
          onSelect={onSelectProject}
        />
      ))}
    </group>
  );
}
