'use client';

// components/3d/Stars.tsx
// Renders thousands of twinkling stars along the entire galaxy corridor using InstancedMesh.
// Automatically reduces star count on mobile for smooth 60fps performance.

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarsProps {
  isMobile: boolean;
}

// Pre-allocated math helpers at module scope to prevent garbage collection in the frame loop
const _dummy = new THREE.Object3D();
const _color = new THREE.Color();

export default function Stars({ isMobile }: StarsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = isMobile ? 900 : 2600;

  // Generate random positions, base scales, and twinkle phases along the Z-corridor (from +30 to -180)
  const starData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const phases = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const palette = ['#ffffff', '#67e8f9', '#c084fc', '#93c5fd', '#f0abfc'];

    for (let i = 0; i < count; i++) {
      // Spread stars in a wide cylinder around the camera's travel path
      const radius = 8 + Math.random() * 65;
      const theta = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * radius;
      const y = (Math.random() - 0.5) * 70;
      const z = 25 - Math.random() * 205; // Covers Hero (z=0) to past Contact (z=-138)

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      scales[i] = 0.04 + Math.random() * 0.14;
      phases[i] = Math.random() * Math.PI * 2;

      _color.set(palette[i % palette.length]);
      colors[i * 3] = _color.r;
      colors[i * 3 + 1] = _color.g;
      colors[i * 3 + 2] = _color.b;
    }

    return { positions, scales, phases, colors };
  }, [count]);

  // Initialize instance matrices and colors once on mount
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    for (let i = 0; i < count; i++) {
      _dummy.position.set(
        starData.positions[i * 3],
        starData.positions[i * 3 + 1],
        starData.positions[i * 3 + 2]
      );
      const s = starData.scales[i];
      _dummy.scale.set(s, s, s);
      _dummy.updateMatrix();
      mesh.setMatrixAt(i, _dummy.matrix);

      _color.setRGB(
        starData.colors[i * 3],
        starData.colors[i * 3 + 1],
        starData.colors[i * 3 + 2]
      );
      mesh.setColorAt(i, _color);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [count, starData]);

  // Subtle twinkling animation by updating a subset of stars or gently rotating the starfield
  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.getElapsedTime();

    // Gentle galactic drift
    mesh.rotation.z = Math.sin(t * 0.03) * 0.04;

    // Twinkle a batch of stars every frame for a lively starfield without heavy CPU cost
    const batchSize = isMobile ? 60 : 160;
    const offset = Math.floor((t * 60) % count);

    for (let j = 0; j < batchSize; j++) {
      const i = (offset + j) % count;
      _dummy.position.set(
        starData.positions[i * 3],
        starData.positions[i * 3 + 1],
        starData.positions[i * 3 + 2]
      );
      const twinkle = 0.65 + 0.45 * Math.sin(t * 2.8 + starData.phases[i]);
      const s = starData.scales[i] * twinkle;
      _dummy.scale.set(s, s, s);
      _dummy.updateMatrix();
      mesh.setMatrixAt(i, _dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}
