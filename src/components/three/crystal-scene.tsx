"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ── Individual crystal shard ── */
function CrystalShard({
  position,
  rotation,
  scale,
  speed,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    ref.current.rotation.x = rotation[0] + t * 0.3;
    ref.current.rotation.y = rotation[1] + t * 0.2;
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.4}
          chromaticAberration={0.15}
          anisotropy={0.2}
          distortion={0.3}
          distortionScale={0.2}
          temporalDistortion={0.1}
          ior={1.5}
          color="#2EB5AD"
          roughness={0.05}
          transmission={0.95}
        />
      </mesh>
    </Float>
  );
}

/* ── Floating particles ── */
function Particles({ count = 120 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, [count]);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 0.03 + 0.01;
    }
    return s;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.02;
    ref.current.rotation.x = Math.sin(t * 0.05) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#62B5A8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Lattice grid lines ── */
function LatticeGrid() {
  const ref = useRef<THREE.Group>(null!);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.015;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.05;
  });

  const lines = useMemo(() => {
    const segments: [THREE.Vector3, THREE.Vector3][] = [];
    const gridSize = 4;
    const spacing = 1.8;

    for (let x = -gridSize; x <= gridSize; x++) {
      for (let y = -gridSize; y <= gridSize; y++) {
        if (Math.random() > 0.6) {
          segments.push([
            new THREE.Vector3(x * spacing, y * spacing, -3),
            new THREE.Vector3(x * spacing, y * spacing, 3),
          ]);
        }
        if (Math.random() > 0.7) {
          segments.push([
            new THREE.Vector3(x * spacing, -gridSize * spacing, y * spacing * 0.6),
            new THREE.Vector3(x * spacing, gridSize * spacing, y * spacing * 0.6),
          ]);
        }
      }
    }
    return segments;
  }, []);

  return (
    <group ref={ref} position={[0, 0, -2]}>
      {lines.map((seg, i) => {
        const geom = new THREE.BufferGeometry().setFromPoints(seg);
        return (
          <lineSegments key={i} geometry={geom}>
            <lineBasicMaterial color="#1A857F" transparent opacity={0.08} />
          </lineSegments>
        );
      })}
    </group>
  );
}

/* ── Main scene ── */
function Scene() {
  const crystals = useMemo(
    () => [
      { position: [-2.5, 0.5, 0] as [number, number, number], rotation: [0.5, 0.3, 0.2] as [number, number, number], scale: 0.6, speed: 0.4 },
      { position: [2.2, -0.3, -1] as [number, number, number], rotation: [0.8, 1.2, 0] as [number, number, number], scale: 0.45, speed: 0.5 },
      { position: [0, 1.5, -0.5] as [number, number, number], rotation: [0.2, 0.7, 1] as [number, number, number], scale: 0.35, speed: 0.6 },
      { position: [-1, -1.2, 0.5] as [number, number, number], rotation: [1.5, 0.4, 0.8] as [number, number, number], scale: 0.3, speed: 0.45 },
      { position: [3.5, 1.2, -0.8] as [number, number, number], rotation: [0.3, 2, 0.5] as [number, number, number], scale: 0.25, speed: 0.55 },
      { position: [-3.2, -0.8, 0.3] as [number, number, number], rotation: [1, 0.5, 1.5] as [number, number, number], scale: 0.2, speed: 0.5 },
    ],
    [],
  );

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#2EB5AD" />
      <pointLight position={[0, 3, 2]} intensity={0.5} color="#62B5A8" />

      {crystals.map((c, i) => (
        <CrystalShard key={i} {...c} />
      ))}

      <Particles count={120} />
      <LatticeGrid />
    </>
  );
}

export function Crystal3DScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
