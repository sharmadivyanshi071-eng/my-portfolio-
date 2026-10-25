// lib/proceduralTextures.ts
// Generates procedural 2D Canvas textures for planets, stars, and Holographic 3D plaques.
// Zero external image or font files are needed — preventing any 404 errors.

import * as THREE from 'three';

/**
 * Detects software WebGL renderers (SwiftShader, llvmpipe, Basic Render)
 * so we can adapt pixelRatio, shadows, and antialiasing without changing scene content.
 */
export function detectSoftwareWebGL(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return false;
  }
}

/**
 * Generates a procedural banded planetary surface texture (albedo + bump detail).
 */
export function createPlanetTexture(
  primaryHex: string,
  secondaryHex: string,
  accentHex: string,
  seed = 1
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Base gradient from pole to pole
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, secondaryHex);
  grad.addColorStop(0.25, primaryHex);
  grad.addColorStop(0.5, accentHex);
  grad.addColorStop(0.75, primaryHex);
  grad.addColorStop(1, secondaryHex);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Procedural atmospheric bands and swirling storms
  for (let i = 0; i < 28; i++) {
    const y = ((i * 19 + seed * 37) % canvas.height);
    const h = 4 + ((i * 7) % 16);
    ctx.fillStyle = i % 2 === 0 ? primaryHex : secondaryHex;
    ctx.globalAlpha = 0.22 + ((i % 5) * 0.05);
    ctx.fillRect(0, y, canvas.width, h);
  }

  // Add subtle crater / storm ovals
  for (let i = 0; i < 18; i++) {
    const cx = ((i * 73 + seed * 41) % canvas.width);
    const cy = 24 + ((i * 43 + seed * 19) % (canvas.height - 48));
    const rx = 12 + ((i * 13) % 28);
    const ry = 5 + ((i * 7) % 12);

    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = i % 3 === 0 ? accentHex : primaryHex;
    ctx.globalAlpha = 0.35;
    ctx.fill();
    ctx.restore();
  }

  ctx.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates a glowing solar plasma texture for the central Sun in the Skills section.
 */
export function createSolarTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, '#06b6d4');
  grad.addColorStop(0.35, '#8b5cf6');
  grad.addColorStop(0.65, '#ec4899');
  grad.addColorStop(1, '#22d3ee');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Plasma cells
  for (let i = 0; i < 45; i++) {
    const x = (i * 59) % canvas.width;
    const y = (i * 37) % canvas.height;
    const r = 10 + (i % 24);
    const rad = ctx.createRadialGradient(x, y, 1, x, y, r);
    rad.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
    rad.addColorStop(0.5, 'rgba(34, 211, 238, 0.3)');
    rad.addColorStop(1, 'rgba(15, 23, 42, 0)');
    ctx.fillStyle = rad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates a high-resolution 3D Holographic Nameplate Texture for the Hero 3D floating text.
 * Using a procedural CanvasTexture avoids external font file 404s while rendering crisp 3D text in space.
 */
export function createHeroNameplateTexture(
  name: string,
  role: string
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Subtle translucent holographic plate background
  const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  bgGrad.addColorStop(0, 'rgba(6, 182, 212, 0.02)');
  bgGrad.addColorStop(0.2, 'rgba(6, 182, 212, 0.14)');
  bgGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.18)');
  bgGrad.addColorStop(0.8, 'rgba(6, 182, 212, 0.14)');
  bgGrad.addColorStop(1, 'rgba(6, 182, 212, 0.02)');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(16, 20, canvas.width - 32, canvas.height - 40);

  // Top & bottom neon hairline borders
  ctx.strokeStyle = 'rgba(34, 211, 238, 0.55)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(80, 24);
  ctx.lineTo(canvas.width - 80, 24);
  ctx.moveTo(140, canvas.height - 24);
  ctx.lineTo(canvas.width - 140, canvas.height - 24);
  ctx.stroke();

  // Main Name in 3D space
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = '#22d3ee';
  ctx.shadowBlur = 22;
  ctx.font = '700 68px Outfit, Plus Jakarta Sans, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(name, canvas.width / 2, canvas.height / 2 - 18);

  // Subtitle / Role
  ctx.shadowColor = '#a855f7';
  ctx.shadowBlur = 12;
  ctx.font = '500 26px Plus Jakarta Sans, sans-serif';
  ctx.fillStyle = '#67e8f9';
  ctx.fillText(role, canvas.width / 2, canvas.height / 2 + 48);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
