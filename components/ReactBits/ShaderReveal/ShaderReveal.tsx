// @ts-nocheck
'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ShaderRevealProps {
  frontImage: string;
  backImage: string;
  mouseForce?: number;
  cursorSize?: number;
  resolution?: number;
  revealStrength?: number;
  revealSoftness?: number;
  isViscous?: boolean;
  viscousStrength?: number;
  autoDemo?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform sampler2D uDisp;
uniform float uRevealStrength;
uniform float uRevealSoftness;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uImageResolution1;
uniform vec2 uImageResolution2;
varying vec2 vUv;

// Simplex 2D noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  // Create organic turbulence
  float n1 = snoise(vUv * 4.0 + uTime * 0.2);
  float n2 = snoise(vUv * 7.0 - uTime * 0.15);
  
  // Warp the UVs used to sample the fluid trail
  // This gives the fluid body highly organic, liquid edges without fragmenting the interior mass
  vec2 warpedUv = vUv + vec2(n1, n2) * 0.035;
  
  vec4 disp = texture2D(uDisp, warpedUv);
  float intensity = disp.r;
  
  // Center-based UV for screen
  vec2 uv = vUv - 0.5;
  
  float rs = uResolution.x / uResolution.y;
  float ri1 = uImageResolution1.x / uImageResolution1.y;
  
  // Calculate shared physical coordinate system based on Image 1 (object-fit: cover)
  vec2 sharedUv;
  if (rs < ri1) {
      sharedUv = uv * vec2(rs / ri1, 1.0);
  } else {
      sharedUv = uv * vec2(1.0, ri1 / rs);
      // anchor to top vertically
      sharedUv.y += 0.5 - (0.5 * (ri1 / rs));
  }
  
  // Calculate slope/gradient of the displacement map using the warped UVs
  vec2 d = vec2(1.0 / uResolution.x, 1.0 / uResolution.y);
  float dx = texture2D(uDisp, warpedUv + vec2(d.x, 0.0)).r - texture2D(uDisp, warpedUv - vec2(d.x, 0.0)).r;
  float dy = texture2D(uDisp, warpedUv + vec2(0.0, d.y)).r - texture2D(uDisp, warpedUv - vec2(0.0, d.y)).r;
  vec2 fluidDir = vec2(dx, dy);
  
  // Distort the shared coordinates based on fluid gradient.
  // smoothstep ensures absolutely zero distortion outside the fluid influence.
  float distFactor = smoothstep(0.01, 0.1, intensity) * uRevealStrength * 0.25;
  vec2 sharedDistUv = sharedUv - fluidDir * distFactor;
  
  // Map shared physical coordinates back to each texture's normalized UV space
  vec2 finalUv1 = sharedDistUv + 0.5;
  vec2 finalUv2 = (sharedDistUv * uImageResolution1) / uImageResolution2 + 0.5;
  
  vec4 color1 = texture2D(uTex1, finalUv1);
  vec4 color2 = texture2D(uTex2, finalUv2);
  
  // Primary Reveal calculation - one coherent body
  float mixFactor = smoothstep(1.0 - uRevealSoftness, 1.0, intensity);
  
  // Secondary Material Layer (colored fluid/ink around the revealed image)
  // High value at the boundary transition, fading out inwards and outwards
  float materialMask = smoothstep(1.0 - uRevealSoftness - 0.2, 1.0, intensity) 
                     - smoothstep(1.0 - uRevealSoftness + 0.3, 1.0, intensity);
                     
  // Material Colors (Cyan / Violet / Deep Cobalt)
  vec3 colorCyan = vec3(0.0, 0.8, 1.0);
  vec3 colorViolet = vec3(0.4, 0.1, 1.0);
  vec3 colorDeep = vec3(0.0, 0.1, 0.25);
  
  // Blend colors using turbulence to create an ink marbled feel
  vec3 inkColor = mix(colorCyan, colorViolet, smoothstep(-0.5, 0.5, n2));
  inkColor = mix(inkColor, colorDeep, smoothstep(0.0, 1.0, n1));
  
  vec4 baseMix = mix(color1, color2, mixFactor);
  
  // Add the organic fluid layer (using Screen/Additive blending feel)
  vec3 finalRgb = mix(baseMix.rgb, inkColor, materialMask * 0.6 * intensity);
  
  // PRESERVE ALPHA to avoid black background!
  gl_FragColor = vec4(finalRgb, baseMix.a);
}
`;

// Represents a point in the mouse trail
interface TrailPoint {
  x: number;
  y: number;
  age: number;
  force: number;
}

function Scene({
  frontImage,
  backImage,
  mouseForce,
  cursorSize,
  revealStrength,
  revealSoftness,
  isViscous,
  viscousStrength,
  autoDemo
}: Omit<ShaderRevealProps, 'className' | 'style'>) {
  const { size, gl } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Textures
  const [tex1, setTex1] = React.useState<THREE.Texture | null>(null);
  const [tex2, setTex2] = React.useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(frontImage, (t) => setTex1(t));
    loader.load(backImage, (t) => setTex2(t));
  }, [frontImage, backImage]);

  // 2D Canvas for displacement trail
  const trailRef = useRef<{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    texture: THREE.CanvasTexture;
  } | null>(null);

  useEffect(() => {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 1024;
    const ctx = c.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, 1024, 1024);
      trailRef.current = {
        canvas: c,
        ctx: ctx,
        texture: new THREE.CanvasTexture(c)
      };
    }
  }, []);

  const pointsRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const timeRef = useRef(0);

  // Handle pointer events directly on the gl domElement
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = 1.0 - ((e.clientY - rect.top) / rect.height);
      mouseRef.current.isActive = true;
      
      pointsRef.current.push({
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        age: 0,
        force: mouseForce || 50
      });
    };
    
    const handlePointerLeave = () => {
      mouseRef.current.isActive = false;
    };

    gl.domElement.addEventListener('pointermove', handlePointerMove);
    gl.domElement.addEventListener('pointerleave', handlePointerLeave);
    
    return () => {
      gl.domElement.removeEventListener('pointermove', handlePointerMove);
      gl.domElement.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [gl, mouseForce]);

  useFrame((state, delta) => {
    timeRef.current += delta;
    
    // Auto Demo animation (e.g. figure-8 curve)
    if (autoDemo && !mouseRef.current.isActive) {
      const t = timeRef.current * 0.5;
      const ax = 0.5 + Math.sin(t) * 0.3;
      const ay = 0.5 + Math.sin(t * 2.0) * 0.2;
      pointsRef.current.push({
        x: ax,
        y: ay,
        age: 0,
        force: (mouseForce || 50) * 0.5
      });
    }

    if (trailRef.current) {
      const trail = trailRef.current;
      // Fade out previous frames (viscosity controls fade speed)
      // Slower fade = longer fluid memory
      const fadeSpeed = isViscous ? Math.max(0.005, 0.05 - (viscousStrength || 30) * 0.0005) : 0.05;
      trail.ctx.fillStyle = `rgba(0, 0, 0, ${fadeSpeed})`;
      trail.ctx.fillRect(0, 0, trail.canvas.width, trail.canvas.height);

      // Draw active points
      pointsRef.current.forEach((p, i) => {
        p.age += delta * 10;
        
        // Remove old points
        if (p.age > 10) {
          pointsRef.current.splice(i, 1);
          return;
        }

        const radius = (cursorSize || 180) * (1.0 - p.age / 10) * 0.5;
        const intensity = Math.min(1.0, Math.max(0, p.force * (1.0 - p.age / 10) / 100));

        const x = p.x * trail.canvas.width;
        const y = (1.0 - p.y) * trail.canvas.height;

        const gradient = trail.ctx!.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${intensity})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        trail.ctx!.beginPath();
        trail.ctx!.arc(x, y, radius, 0, Math.PI * 2);
        trail.ctx!.fillStyle = gradient;
        trail.ctx!.fill();
      });

      trail.texture.needsUpdate = true;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = timeRef.current;
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      
      if (trailRef.current) {
        materialRef.current.uniforms.uDisp.value = trailRef.current.texture;
      }
      
      if (tex1 && tex2) {
        materialRef.current.uniforms.uTex1.value = tex1;
        materialRef.current.uniforms.uTex2.value = tex2;
        
        // Pass exact physical pixel dimensions for both source images
        const img1 = tex1.image as HTMLImageElement | undefined;
        const img2 = tex2.image as HTMLImageElement | undefined;
        if (img1 && img1.width && img1.height) {
          materialRef.current.uniforms.uImageResolution1.value.set(img1.width, img1.height);
        }
        if (img2 && img2.width && img2.height) {
          materialRef.current.uniforms.uImageResolution2.value.set(img2.width, img2.height);
        }
      }
    }
  });

  const uniforms = useMemo(() => ({
    uTex1: { value: null },
    uTex2: { value: null },
    uDisp: { value: null },
    uRevealStrength: { value: revealStrength || 0.8 },
    uRevealSoftness: { value: revealSoftness || 0.9 },
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uImageResolution1: { value: new THREE.Vector2(1, 1) },
    uImageResolution2: { value: new THREE.Vector2(1, 1) }
  }), [revealStrength, revealSoftness]);

  if (!tex1 || !tex2) return null;

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export default function ShaderReveal({
  frontImage,
  backImage,
  mouseForce = 40,
  cursorSize = 200,
  resolution = 0.5,
  revealStrength = 0.8,
  revealSoftness = 0.9,
  isViscous = true,
  viscousStrength = 35,
  autoDemo = true,
  className = '',
  style
}: ShaderRevealProps) {
  // Determine pixel ratio based on resolution prop to optimize rendering
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio * resolution : 1;

  return (
    <div className={className} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', ...style }}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={dpr}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <Scene 
          frontImage={frontImage}
          backImage={backImage}
          mouseForce={mouseForce}
          cursorSize={cursorSize}
          revealStrength={revealStrength}
          revealSoftness={revealSoftness}
          isViscous={isViscous}
          viscousStrength={viscousStrength}
          autoDemo={autoDemo}
        />
      </Canvas>
    </div>
  );
}
