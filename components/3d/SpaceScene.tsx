'use client';

// components/3d/SpaceScene.tsx
// Main 3D Canvas wrapper and smooth camera flight controller.
// Interpolates camera position and lookAt target along the 5 galaxy stations as the user scrolls.

import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  GALAXY_STATIONS,
  PortfolioData,
  ProjectPlanetData,
} from '@/types/portfolio';
import { detectSoftwareWebGL } from '@/lib/proceduralTextures';
import Stars from './Stars';
import HeroStation from './HeroStation';
import AboutPlanet from './AboutPlanet';
import SkillsSolarSystem from './SkillsSolarSystem';
import ProjectsGalaxy from './ProjectsGalaxy';
import ContactSatellite from './ContactSatellite';

interface SpaceSceneProps {
  scrollProgressRef: React.MutableRefObject<number>;
  portfolioData: PortfolioData;
  hoveredSkill: string | null;
  onHoverSkill: (skillName: string | null) => void;
  onSelectProject: (project: ProjectPlanetData) => void;
  onSceneReady: () => void;
}

// Pre-allocated vectors at module scope so the camera loop produces zero garbage collection
const _camTargetPos = new THREE.Vector3();
const _lookAtTargetPos = new THREE.Vector3();
const _currentLookAt = new THREE.Vector3(0, 0.2, 0);
const _posA = new THREE.Vector3();
const _posB = new THREE.Vector3();
const _lookA = new THREE.Vector3();
const _lookB = new THREE.Vector3();

/**
 * Configures studio PBR environment map (RoomEnvironment) + exponential deep-space fog.
 */
function StudioEnvironmentAndReady({ onReady }: { onReady: () => void }) {
  const { gl, scene } = useThree();

  useEffect(() => {
    // Set up procedural studio environment map for metallic & clearcoat reflections
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    scene.fog = new THREE.FogExp2('#050510', 0.012);
    pmremGenerator.dispose();

    // Notify parent that the 3D scene is initialized
    const timer = window.setTimeout(() => {
      onReady();
    }, 150);

    return () => {
      window.clearTimeout(timer);
      envTexture.dispose();
    };
  }, [gl, scene, onReady]);

  return null;
}

/**
 * Smoothly moves and rotates the camera between the 5 planetary sections
 * based on the normalized scroll progress (0.0 to 1.0).
 */
function GalaxyCameraController({
  scrollProgressRef,
}: {
  scrollProgressRef: React.MutableRefObject<number>;
}) {
  const { camera, pointer } = useThree();

  useFrame((_, delta) => {
    const totalSegments = GALAXY_STATIONS.length - 1; // 4 segments between 5 stations
    const clampedProgress = THREE.MathUtils.clamp(
      scrollProgressRef.current,
      0,
      1
    );
    const scaled = clampedProgress * totalSegments;
    const segmentIndex = Math.min(Math.floor(scaled), totalSegments - 1);
    const localT = scaled - segmentIndex;

    // Smoothstep easing within each segment for graceful planetary arrivals
    const smoothT = THREE.MathUtils.smoothstep(localT, 0, 1);

    const stationA = GALAXY_STATIONS[segmentIndex];
    const stationB = GALAXY_STATIONS[segmentIndex + 1];

    _posA.set(...stationA.cameraPos);
    _posB.set(...stationB.cameraPos);
    _camTargetPos.lerpVectors(_posA, _posB, smoothT);

    // Add subtle mouse parallax so the space scene feels alive
    _camTargetPos.x += pointer.x * 0.45;
    _camTargetPos.y += pointer.y * 0.3;

    _lookA.set(...stationA.lookAtPos);
    _lookB.set(...stationB.lookAtPos);
    _lookAtTargetPos.lerpVectors(_lookA, _lookB, smoothT);

    // Frame-rate independent exponential damping for silky camera travel
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      _camTargetPos.x,
      4.5,
      delta
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      _camTargetPos.y,
      4.5,
      delta
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      _camTargetPos.z,
      4.5,
      delta
    );

    _currentLookAt.x = THREE.MathUtils.damp(
      _currentLookAt.x,
      _lookAtTargetPos.x,
      5.5,
      delta
    );
    _currentLookAt.y = THREE.MathUtils.damp(
      _currentLookAt.y,
      _lookAtTargetPos.y,
      5.5,
      delta
    );
    _currentLookAt.z = THREE.MathUtils.damp(
      _currentLookAt.z,
      _lookAtTargetPos.z,
      5.5,
      delta
    );

    camera.lookAt(_currentLookAt);
  });

  return null;
}

export default function SpaceScene({
  scrollProgressRef,
  portfolioData,
  hoveredSkill,
  onHoverSkill,
  onSelectProject,
  onSceneReady,
}: SpaceSceneProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSoftwareGl, setIsSoftwareGl] = useState(false);

  useEffect(() => {
    setIsSoftwareGl(detectSoftwareWebGL());
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-auto z-0 bg-[#050510]">
      <Canvas
        dpr={isSoftwareGl ? 1 : [1, 2]}
        gl={{
          antialias: !isSoftwareGl,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.12,
        }}
        camera={{
          fov: isMobile ? 60 : 50,
          near: 0.1,
          far: 220,
          position: [0, 0.8, 12],
        }}
      >
        <color attach="background" args={['#050510']} />

        {/* Studio Environment & Fog */}
        <StudioEnvironmentAndReady onReady={onSceneReady} />

        {/* Balanced Warm/Cool Three-Point Galactic Lighting */}
        <hemisphereLight
          color="#38bdf8"
          groundColor="#1e1b4b"
          intensity={0.65}
        />
        <directionalLight
          position={[15, 25, 15]}
          intensity={1.4}
          color="#f8fafc"
        />
        <directionalLight
          position={[-18, -10, -20]}
          intensity={0.8}
          color="#a855f7"
        />

        {/* Smooth Scroll Camera Controller */}
        <GalaxyCameraController scrollProgressRef={scrollProgressRef} />

        {/* Background Twinkling Galaxy Starfield */}
        <Stars isMobile={isMobile} />

        {/* Section 1: HERO (z = 0) */}
        <HeroStation
          name={portfolioData.name}
          role={portfolioData.role}
          position={GALAXY_STATIONS[0].objectPos}
        />

        {/* Section 2: ABOUT PLANET (z = -32) */}
        <AboutPlanet position={GALAXY_STATIONS[1].objectPos} />

        {/* Section 3: SKILLS SOLAR SYSTEM (z = -68) */}
        <SkillsSolarSystem
          position={GALAXY_STATIONS[2].objectPos}
          skills={portfolioData.skills}
          hoveredSkill={hoveredSkill}
          onHoverSkill={onHoverSkill}
        />

        {/* Section 4: PROJECTS GALAXY (z = -104) */}
        <ProjectsGalaxy
          position={GALAXY_STATIONS[3].objectPos}
          projects={portfolioData.projects}
          onSelectProject={onSelectProject}
        />

        {/* Section 5: CONTACT SATELLITE / ROCKET (z = -138) */}
        <ContactSatellite position={GALAXY_STATIONS[4].objectPos} />
      </Canvas>
    </div>
  );
}
